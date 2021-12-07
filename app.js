const renderBooks = function () {
  const table = document.querySelector('.table-books');
  table.innerHTML = '';

  for (let book = 0; book < localStorage.length; book++) {
    const bookData = JSON.parse(localStorage.getItem(book));
    const tr = document.createElement('tr');
    for (data in bookData) {
      const td = document.createElement('td');
      td.innerHTML = bookData[data];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
};

window.onload = () => {
  renderBooks();
};

const submitBtn = document.querySelector('#btn-submit');

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();

  let error = false;
  const errors = document.querySelectorAll('.form__error');
  errors.forEach((error) => {
    error.innerHTML = '';
  });

  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  const bookPriority = document.querySelector('#book-priority');
  const bookCategory = document.querySelector('#book-category');

  const priorityValue = bookPriority.options[bookPriority.selectedIndex].value;

  const checkErrors = function () {
    let error = false;
    if (bookTitle.value.length < 1) {
      const titleError = document.querySelector('#book-title-error');
      titleError.innerHTML = 'Tytuł musi zawierać co najmniej jeden znak';
      error = true;
    }

    if (bookAuthor.value.length < 3) {
      const authorError = document.querySelector('#book-author-error');
      authorError.innerHTML = 'Autor musi zawierac co najmniej trzy znaki';
      error = true;
    }

    if (bookCategory.value == '') {
      const categoryError = document.querySelector('#book-category-error');
      categoryError.innerHTML = 'Wybierz kategorię';
      error = true;
    }
    return error;
  };

  error = checkErrors();

  if (error == false) {
    const book = {
      title: bookTitle.value,
      author: bookAuthor.value,
      priority: priorityValue,
      category: bookCategory.value,
    };
    localStorage.setItem(localStorage.length, JSON.stringify(book));
    renderBooks();
  }
});
