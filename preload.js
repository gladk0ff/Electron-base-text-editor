const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadText: () => ipcRenderer.invoke('load-text'),
  saveText: (text) => ipcRenderer.invoke('save-text', text),
  onSaveAs: (callback) => ipcRenderer.on('save-as', callback)
});