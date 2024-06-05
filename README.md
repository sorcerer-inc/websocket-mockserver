# websocket mock server

```shell
npm i

npm run dev
```

url:
`ws://localhost:3001`

## サーバー接続のテスト

クライアントで`game start`のイベントを emit すると、ゲームのモックデータをサーバーから返す。

socket.io の使う例は `/docs/client-sample`に書いてある。

公式ドキュメント参考してもいい。 https://socket.io/

```tsx
socket.emit("game start");
```

## 実装完了のイベント

### socket.on イベント

- gameInfo
- gameStatus
- remainingUntilShuffle
- showScreen
- winningNo
- winner
- pointReceive
- verticalHistory
- betStatus
- betMessage

### socket.emit イベント

- game start
- gameInfo
- betData
- verticalHistory
