import { co2 } from "@tgwf/co2";

const co2Emission = new co2({ model: "swd" });
const GREEN_HOST = false;

export const totals = { requests: 0, bytes: 0, grams: 0 };

const carbonFootprint = (req, res, next) => {
  res.setHeader("Timing-Allow-Origin", "*");

  const requestBytes =
    Number(req.headers["content-length"] || 0) +
    Buffer.byteLength(req.originalUrl) +
    Buffer.byteLength(JSON.stringify(req.headers));

  res.on("finish", () => {
    const responseBytes =
      Number(res.getHeader("content-length") || 0) +
      Buffer.byteLength(JSON.stringify(res.getHeaders()));

    const totalBytes = requestBytes + responseBytes;
    const grams = co2Emission.perByte(totalBytes, GREEN_HOST);

    totals.requests += 1;
    totals.bytes += totalBytes;
    totals.grams += grams;

    console.log(
      `${req.method} ${req.originalUrl} -> ${totalBytes} bytes, ${grams.toFixed(4)} g CO2`,
    );
  });

  next();
};

export default carbonFootprint;