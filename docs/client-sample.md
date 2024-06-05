## install socket.io-client

```shell
npm i socket.io-client
```

## 説明

listen on some event

```tsx
// client  <----- server
socket.on("event name", (data) => {
  // dataの処理
});
```

emit event

```tsx
// client -----> server
socket.emit("event name", your_data);
```

## sample code

```tsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("common message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("common message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("common message", message);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
```
