const { app, BrowserWindow,Menu } = require('electron');


const template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Ctrl+Shift+I',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.openDevTools();
        }
      }
    ]
  }
];



function createWindow() {
  const window = new BrowserWindow({
    width: 500,
    height: 600,
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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