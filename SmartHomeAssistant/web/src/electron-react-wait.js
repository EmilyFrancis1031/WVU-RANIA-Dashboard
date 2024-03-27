const net = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

console.log(process.env.PORT);

process.env.ELECTRON_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;

const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();

    if (!startedElectron) {
      console.log("starting electron");
      startedElectron = true;

      const exec = require("child_process").exec;

      exec("npm run electron-dev");
    }
  });

tryConnection();

client.on("error", (err) => {
  setTimeout(tryConnection, 1000);
});
