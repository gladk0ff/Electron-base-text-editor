const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content, defaultName) => 
    ipcRenderer.invoke('save-file', { content, defaultName }),
  showNotification: (message) => ipcRenderer.invoke('show-notification', message),
});