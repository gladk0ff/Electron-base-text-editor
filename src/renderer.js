
const editor = document.querySelector('editor');
const saveBtn = document.querySelector('actions__save-btn');
const cancelBtn = document.querySelector('actions__cancel-btn');

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