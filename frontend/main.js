const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
}

ipcMain.handle("select-file", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"]
  });
  return result.filePaths[0];
});

ipcMain.handle("run-unzip", async (event, filePath) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["main.py", "unzip", filePath]);

    py.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    py.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
});

app.whenReady().then(createWindow);