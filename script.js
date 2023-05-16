//////////////////////from-style//////////////////////////////
const isComplex = document.querySelector('.complex__input');
isComplex.addEventListener('click', () => {
  const forms = document.querySelectorAll('form');
  forms[0].hidden = Boolean(isComplex.checked);
  forms[1].hidden = Boolean(!isComplex.checked);
});

//////////////////////lang-open//////////////////////////////
const langBtn = document.querySelector('.lang');
const langItem = document.querySelectorAll('.lang__item');

langBtn.addEventListener('click', (event) => {
  if (event.target.nodeName != 'svg') return;
  openLang();
});

function openLang() {
  langBtn.classList.add('lang--active');
  langItem.forEach((lang) => {
    lang.hidden = false;
    lang.addEventListener('click', (curItem) => selectLang(curItem));
  });
}

function selectLang(curItem) {
  const langActiv = document.querySelector('.lang__item--active');
  langActiv.classList.remove('lang__item--active');

  curItem.srcElement.classList.add('lang__item--active');

  changeLanguage(curItem.srcElement.textContent.trim());

  langItem.forEach((lang) => {
    lang.hidden = true;
  });
  curItem.srcElement.hidden = false;

  langBtn.classList.remove('lang--active');
}

//////////////////////lang-change//////////////////////////////

function changeLanguage(lang) {
  let allTextNode = document.querySelectorAll('.changesLang');
  let allText = [];
  allTextNode.forEach((elem, index) => {
    allText[index] = elem.textContent;
  });

  const langs = {
    en: '["Enter Number:", "Calculate Root", "Enter number:", "Real part", "Imaginary part", "Calculate Root", "Number of decimal places:", "Complex number:"]',
    ru: '["Введите число:","Вычислить корень", "Введите число:", "Действительная часть", "Мнимая часть", "Вычислить корень", "Кол-во знаков после запятой:", "Комплексное число:"]',
    es: '["Introduzca un número:", "calcular raíz", " Introduzca un número:", "parte Real", "parte Imaginaria", "Calcular raíz", "número de decimales:", " número Complejo:"]',
    fr: '["Entrer un nombre:", "calculer la racine", " Entrer un nombre:", "partie Réelle", "partie Imaginaire", "Calculer la racine", "nombre décimal:", " nombre Complexe:"]',
  };

  for (let i = 0; i < allText.length; i++) {
    for (let itemLang in langs) {
      if (itemLang === lang) {
        const arrayStrs = JSON.parse(langs[itemLang]);
        allText[i] = arrayStrs[i];
      }
    }
  }

  allTextNode.forEach((elem, index) => {
    elem.textContent = allText[index];
  });
}
