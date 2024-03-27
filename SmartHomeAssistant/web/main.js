const { app, globalShortcut, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({ kiosk: true });

  win.loadFile("./index.html");
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // Linux and Windows
    app.quit();
  }
});
