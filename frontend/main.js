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
    const py = spawn("python", ["../backend/main.py", "unzip", filePath]);

    let output = "";
    let error = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0 || error) {
        console.log("PY EXIT CODE:", code);
        console.log("PY STDERR RAW:", error);
        console.log("PY STDOUT RAW:", output);
        reject(error);
      } else {
        resolve(JSON.parse(output));
      }
    });
  });
});

ipcMain.handle("get-avatar", async (event) => { 
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["../backend/main.py", "avatar", process.cwd()]);

    let output = "";
    let error = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0 || error) {
        console.log("PY EXIT CODE:", code);
        console.log("PY STDERR RAW:", error);
        console.log("PY STDOUT RAW:", output);
        reject(error);
      } else {
        resolve(JSON.parse(output));
      }
    });
  });
});




app.whenReady().then(createWindow);