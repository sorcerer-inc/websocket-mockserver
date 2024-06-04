## create server

```shell
npm init -y

npm i express

npm i typescript @types/node @types/express -D
npm i tsc-watch -D
```

## set typescript

```shell
npx tsc --init
```

```tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist",
  },
  "include": ["src/**/*"]
}
```

```package.json
"dev": "tsc-watch --onSuccess \"node dist/index.js\"",
```

## socket.io
```shell
npm i socket.io
```

## cors
```shell
npm install cors
```
