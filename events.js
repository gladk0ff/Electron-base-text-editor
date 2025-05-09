const { app , ipcMain, dialog, Notification } = require('electron');
const path = require('path');
const fs = require('fs');


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
  
  ipcMain.handle('show-notification', (event,message) => {
    new Notification({ 
      title: "Текстовый редактор", 
      body: message || "Файл успешно сохранен!" 
    }).show();
  });
  