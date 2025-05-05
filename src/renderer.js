
const editor = document.querySelector('editor');
const saveBtn = document.querySelector('actions__save-btn');
const cancelBtn = document.querySelector('actions__cancel-btn');
const uploadBtn = document.querySelector('actions__upoad-btn');
const inputFile = document.querySelector('input-file');

const invokeUpload = () => {
    const inputFile = document.querySelector('input-file');
    console.log("invokeUpload",inputFile)
    inputFile && inputFile.click();
}

function loadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        editor.value = e.target.result;
    };
    reader.readAsText(file);
}

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