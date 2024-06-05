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

https://socket.io/　公式ドキュメント参考してもいい。

```tsx
socket.emit("game start");
```
