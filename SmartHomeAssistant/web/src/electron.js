const url = require("url");
const path = require("path");

const { app, globalShortcut, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    kiosk: process.env.PROD,
  });

  if (!process.env.PROD) {
    win.webContents.openDevTools();
  }

  const startUrl =
    process.env.ELECTRON_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  win.loadURL(startUrl);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  globalShortcut.register("CommandOrControl+Q", () => {
    app.quit();
  });
});
