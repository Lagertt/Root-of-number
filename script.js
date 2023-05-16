const isComplex = document.querySelector('.complex__input');

isComplex.addEventListener('click', () => {
  const forms = document.querySelectorAll('form');
  forms[0].hidden = Boolean(isComplex.checked);
  forms[1].hidden = Boolean(!isComplex.checked);
});
