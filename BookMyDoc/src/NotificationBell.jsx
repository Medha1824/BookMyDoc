import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { io } from "socket.io-client";
import "./NotificationBell.css";

const API = import.meta.env.VITE_API_URL;
const DOCTOR_REQUESTS_PATH = "/doctor-appointments";
const PATIENT_APPOINTMENTS_PATH = "/appointments";

const timeAgo = (dateString) => {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000,
  );

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
};

const describe = (item, role) => {
  const slot = `for ${item.date} at ${item.time}`;

  if (role === "doctor") {
    return `${item.patient?.name || "A patient"} requested an appointment ${slot}.`;
  }

  const action = item.status === "Confirmed" ? "accepted" : "declined";

  return `Dr. ${item.doctor?.name || ""} ${action} your appointment request ${slot}.`;
};

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(`${API}/appointments/notifications`, {
        credentials: "include",
      });

      if (!response.ok) return;

      const data = await response.json();

      setRole(data.role);
      setItems(data.items || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(() => {
      if (!document.hidden) fetchNotifications();
    }, 30000);

    const handleVisibility = () => {
      if (!document.hidden) fetchNotifications();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchNotifications]);

  useEffect(() => {
    const socket = io(API, { withCredentials: true });

    socket.on("notification", fetchNotifications);

    return () => {
      socket.off("notification", fetchNotifications);
      socket.disconnect();
    };
  }, [fetchNotifications]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleOpen = () => {
    if (!open) fetchNotifications();
    setOpen(!open);
  };

  const isUnread = (item) => role === "doctor" || !item.patientSeen;

  const handleItemClick = (item) => {
    setOpen(false);

    if (role === "doctor") {
      navigate(DOCTOR_REQUESTS_PATH);
      return;
    }

    if (!item.patientSeen) {
      setItems((current) =>
        current.map((i) =>
          i._id === item._id ? { ...i, patientSeen: true } : i,
        ),
      );
      setUnreadCount((count) => Math.max(0, count - 1));

      fetch(`${API}/appointments/${item._id}/seen`, {
        method: "PUT",
        credentials: "include",
      }).catch((error) => console.error("Failed to mark as seen:", error));
    }

    navigate(PATIENT_APPOINTMENTS_PATH);
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();

    setItems((current) => current.map((i) => ({ ...i, patientSeen: true })));
    setUnreadCount(0);

    fetch(`${API}/appointments/seen-all`, {
      method: "PUT",
      credentials: "include",
    }).catch((error) => console.error("Failed to mark all as seen:", error));
  };

  return (
    <li className="notification-container" ref={wrapperRef}>
      <button
        type="button"
        className="notification-button"
        onClick={toggleOpen}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={22} strokeWidth={1.8} fill="currentColor" />

        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>

            {role !== "doctor" && unreadCount > 0 && (
              <button
                type="button"
                className="mark-read-btn"
                onClick={handleMarkAllRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="notification-empty">No notifications yet</p>
          ) : (
            <div className="notification-list">
              {items.map((item) => (
                <button
                  type="button"
                  key={item._id}
                  className={
                    isUnread(item)
                      ? "notification-item unread"
                      : "notification-item"
                  }
                  onClick={() => handleItemClick(item)}
                >
                  <p className="notification-text">{describe(item, role)}</p>
                  <span className="notification-time">
                    {timeAgo(item.updatedAt)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default NotificationBell;
