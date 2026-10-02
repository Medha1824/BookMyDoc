import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

const getCookie = (cookieHeader, name) => {
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
};

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = getCookie(socket.handshake.headers.cookie || "", "token");

      if (!token) return next(new Error("No token provided"));

      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(String(socket.user.id));
  });

  return io;
};

export const notifyUser = (userId) => {
  if (io) io.to(String(userId)).emit("notification");
};
