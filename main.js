const { app, BrowserWindow,  Menu,ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');


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

// Обработчик сохранения файла
ipcMain.handle('save-file', async (event, { content, defaultName }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Сохранить файл',
    defaultPath: path.join(app.getPath('documents'), defaultName),
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!canceled && filePath) {
    try {
      await fs.promises.writeFile(filePath, content);
      return { success: true, path: filePath };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
  return { success: false, error: 'Отменено пользователем' };
});