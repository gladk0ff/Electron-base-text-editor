const { app, BrowserWindow, ipcMain, Menu,Notification } = require('electron');
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
        contextIsolation: true,
        devTools: true
    }
  });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();

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

// Обработчик для показа уведомлений
ipcMain.handle('show-notification', (event, title, body) => {
    new Notification({ 
      title: title || "Текстовый редактор", 
      body: body || "Файл успешно сохранен!" 
    }).show();
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

