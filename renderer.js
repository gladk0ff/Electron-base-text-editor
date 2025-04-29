const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');

// Загрузка текста при запуске
window.api.loadText().then(text => {
  editor.value = text;
});

// Автосохранение при изменении текста
editor.addEventListener('input', () => {
  window.api.saveText(editor.value);
});

// Ручное сохранение
saveBtn.addEventListener('click', () => {
  window.api.saveText(editor.value);
});

// Обработка меню "Сохранить как..."
window.api.onSaveAs(() => {
  const newText = prompt('Новый текст:', editor.value);
  if (newText !== null) window.api.saveText(newText);
});