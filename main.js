const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
const filePath = path.join(app.getPath('userData'), 'saved-text.txt');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
  setupMenu();
}

// Загрузка текста из файла при запуске
ipcMain.handle('load-text', async () => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
});

// Сохранение текста
ipcMain.handle('save-text', (event, text) => {
  fs.writeFileSync(filePath, text);
});

app.whenReady().then(createWindow);

// Настройка меню
function setupMenu() {
  const template = [
    {
      label: 'Файл',
      submenu: [
        { 
          label: 'Сохранить как...',
          click: () => mainWindow.webContents.send('save-as')
        },
        { role: 'quit' }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}