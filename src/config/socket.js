import socketIO from "socket.io";

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Chat event handling
    socket.on("sendMessage", (data) => {
      const { to, message } = data;
      io.to(to).emit("receiveMessage", { from: socket.id, message });
    });

    // Notification event handling
    socket.on("sendNotification", (data) => {
      const { to, notification } = data;
      io.to(to).emit("receiveNotification", { notification });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export { setupSocket };
