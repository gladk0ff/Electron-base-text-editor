
const editor = document.querySelector('.editor');
const saveBtn = document.querySelector('.actions__save-btn');
const cancelBtn = document.querySelector('.actions__cancel-btn');
const uploadBtn = document.querySelector('.actions__upoad-btn');
const inputFile = document.querySelector('.input-file');

uploadBtn.addEventListener('click', () => { 
    inputFile && inputFile.click();
});


inputFile.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {return;}
    
    const reader = new FileReader();
    reader.onload = function (e) {
        editor.value = e.target.result;
    };
    reader.readAsText(file);
});

saveBtn.addEventListener('click', async () => {
    const text = editor.value;
    const isContinue = !text ? window.confirm('Сохранить пустой файл?') : true;
    const fileName = inputFile.files[0] && inputFile.files[0].name || 'Новый документ.txt';
    
    if (isContinue) {
        // const blob = new Blob([text], { type: 'text/plain' });
        // const url = window.URL.createObjectURL(blob);
    
        // const link = document.createElement('a');
        // link.setAttribute('href', url);
        // link.download = inputFile.files[0] && inputFile.files[0].name || 'Новый документ.txt';
        // link.click();
    
        //  // Освобождение памяти
        // window.URL.revokeObjectURL(url);
        
        const result = await window.electronAPI.saveFile(text, fileName);
    
        if (result.success) {
          console.log('Файл сохранен:', result.path);
        } else {
          console.error('Ошибка:', result.error);
        }
    }


})


// // Загрузка текста при запуске
// window.api.loadText().then(text => {
//   editor.value = text;
// });

// // Ручное сохранение
// saveBtn.addEventListener('click', async () => {
//   await window.api.saveText(editor.value);
//   window.api.showNotification(); // Используем значения по умолчанию
// });

// // Обработка меню "Сохранить как..."
// window.api.onSaveAs(() => {
//   const newText = prompt('Новый текст:', editor.value);
//   if (newText !== null) window.api.saveText(newText);
// });