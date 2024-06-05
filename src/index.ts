import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const port = 3001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (client) => {
  console.log("a user connected");
  console.log(client.id);
  io.emit("common message", `User ${client.id} connected`);

  client.on("game start", () => {
    // gameInfo event
    client.emit("gameInfo", {
      status: 0,
      status_code: 0,
      gameInfo: {
        start_time: new Date().getTime(),
        end_time: new Date().getTime() + 10000,
        duration: 10000,
        session_status: 0,
        session_id: 0,
        remaining_time: 10000,
        server_current_time: new Date().getTime(),
      },
    });

    // gameStatus event
    client.emit("gameStatus", {
      status: 0,
      status_code: 0,
      gameStatus: 0,
    });

    io.emit("remainingUntilShuffle", {
      remaining: 0,
    });

    // game simulation
    io.emit("showScreen", {
      status: 0,
      status_code: 0,
      screenStatus: "A",
      message: "Game is starting",
    });

    setTimeout(() => {
      io.emit("showScreen", {
        status: 0,
        status_code: 0,
        screenStatus: "B",
        message: "Game result",
      });

      // ゲーム結果
      io.emit("winningNo", {
        status: 0,
        status_code: 0,
        results: {
          winner: 0,
          player_result: 0,
          banker_result: 0,
          player_cards: [{ mark: 0, number: 0 }],
          banker_cards: [{ mark: 0, number: 0 }],
        },
        winners_info: {
          winner: 0,
          player_count: 0,
          total_amount: 0,
          details: [{ player_name: "winner", amount: 0 }],
        },
      });

      // if win
      client.emit("winner", {
        status: 0,
        status_code: 0,
        message: "You win",
        amount: 100,
        currency: "USD",
        currency_Symbol: "$",
      });

      // point
      client.emit("pointReceive", {
        status: 0,
        status_code: 0,
        totalPoints: 100,
      });

      client.emit("verticalHistory", [
        {
          winner: 0,
          player_result: 0,
          banker_result: 0,
          player_cards: [{ mark: 0, number: 0 }],
          banker_cards: [{ mark: 0, number: 0 }],
        },
      ]);
    }, 3000);
  });

  client.on("gameInfo", () => {
    // gameInfo event
    client.emit("gameInfo", {
      status: 0,
      status_code: 0,
      gameInfo: {
        start_time: new Date().getTime(),
        end_time: new Date().getTime() + 10000,
        duration: 10000,
        session_status: 0,
        session_id: 0,
        remaining_time: 10000,
        server_current_time: new Date().getTime(),
      },
    });
  });

  client.on("betData", (data) => {
    console.log("betData: ", data);

    client.emit("betMessage", {
      status: 0,
      status_code: 0,
      message: "Bet is accepted",
      betData: {
        player_id: 0,
        operator_name: "operator",
        operator_player_id: 0,
        session_id: 0,
        game_code: "game_code",
        balance: 100,
        currency: "USD",
      },
    });

    // 全体に通知
    io.emit("betStatus", {
      player: {
        betCount: 10,
        betAmount: 100,
      },
      banker: {
        betCount: 10,
        betAmount: 100,
      },
    });
  });

  client.on("verticalHistory", () => {
    client.emit("verticalHistory", [
      {
        winner: 0,
        player_result: 0,
        banker_result: 0,
        player_cards: [{ mark: 0, number: 0 }],
        banker_cards: [{ mark: 0, number: 0 }],
      },
    ]);
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
