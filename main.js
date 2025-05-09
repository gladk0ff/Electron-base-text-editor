const { app, BrowserWindow, Menu, Notification } = require('electron');
const path = require('path');
const fs = require('fs');
require('./events')


const template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Ctrl+Shift+I',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.openDevTools({
            mode: 'detach'
          });
        }
      }
    ]
  }
];


function createWindow() {
  const window = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true // Безопасность: изолировать preload от кода страницы
    }
  });

  // Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  Menu.setApplicationMenu(null);
  window.webContents.openDevTools({
    mode: 'detach'
  });
  window.loadFile('./src/index.html');
}

app.whenReady().then(createWindow);

try {
  require('electron-reloader')(module, {
    // Опции (если нужны)
    watchRenderer: true, // Не перезагружать рендерер
    ignore: ['node_modules/**'], // Игнорируемые пути
  });
} catch (error) {
  console.log('Electron-reloader error:', error);
}
