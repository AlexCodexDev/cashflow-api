import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001",
        credentials: true
    }
});

io.on("connection", (socket: any) => {
    console.log("Client Connected : ", socket.id);

    socket.on("disconnect", () => {
        console.log("Disconnected : ", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});