const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  selectFile: () => ipcRenderer.invoke("select-file"),
  runUnzip: (filePath) => ipcRenderer.invoke("run-unzip", filePath),
  getAvatar: () => ipcRenderer.invoke("get-avatar"),
  parseData: () => ipcRenderer.invoke("parse-data")
});