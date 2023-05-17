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
  if (event.target.nodeName != 'path' && event.target.nodeName != 'svg') return;
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
    en: '["Enter Number:", "Calculate Root", "Enter number:", "Real part", "Imaginary part", "Calculate Root", "Result", "Number of decimal places:", "Complex number:"]',
    ru: '["Введите число:","Вычислить корень", "Введите число:", "Действительная часть", "Мнимая часть", "Вычислить корень", "Результат", "Кол-во знаков после запятой:", "Комплексное число:"]',
    es: '["Introduzca un número:", "calcular raíz", " Introduzca un número:", "parte Real", "parte Imaginaria", "Calcular raíz", "Resultado", "número de decimales:", " número Complejo:"]',
    fr: '["Entrer un nombre:", "calculer la racine", " Entrer un nombre:", "partie Réelle", "partie Imaginaire", "Calculer la racine", "Résultat", "nombre décimal:", " nombre Complexe:"]',
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

////////////////////////calc///////////////////////////
const forms = document.querySelectorAll('.form');
forms.forEach((form) => {
  form.addEventListener('submit', calcRoot);
});

function calcRoot(event) {
  event.preventDefault();
  let data = serializeForm();

  const resultInput = document.getElementById('result');

  let a = 0,
    b = 0,
    accur = Number(data[4].value);

  if (data[data.length - 1].value) {
    a = Number(data[1].value);
    b = Number(data[2].value);

    let res = complexRoot(a, b, accur);
    resultInput.value = res.toString();
  } else {
    a = Number(data[0].value);
    resultInput.value = Math.sqrt(a).toFixed(accur);
  }
}

function toComplex(a) {}

function complexRoot(x, y, accur) {
  let r = Math.sqrt(x * x + y * y);
  let arg = x == 0 ? Math.PI : Math.atan(y / x);
  if (x < 0 && y > 0) arg += Math.PI;
  if (x < 0 && y < 0) arg -= Math.PI;
  let result = [];
  let rn = Math.pow(r, 1 / 2);
  result.push({
    x: (rn * Math.cos((arg + 2 * Math.PI * 0) / 2)).toFixed(accur),
    y: (rn * Math.sin((arg + 2 * Math.PI * 0) / 2)).toFixed(accur),
    toString() {
      return `${this.x} + ${this.y}i`;
    },
  });
  return result;
}

function serializeForm() {
  const elements = document.getElementsByTagName('input');

  let data = Array.from(elements)
    .map((element) => {
      const { name, type } = element;
      const value = type === 'checkbox' ? element.checked : element.value;
      return { name, value };
    })
    .filter((item) => !!item.name);

  return data;
}

//////////////////input-check/////////////////////

const accurInput = document.querySelector('.accuracy__input');
accurInput.addEventListener('input', (e) => {
  min = 0;
  max = 15;

  const value = +accurInput.value;
  if (value > max) {
    accurInput.value = max;
  } else if (value < min) {
    accurInput.value = min;
  }
});

let numberInputs = document.querySelectorAll('.form__input--num');
numberInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    min = 0;
    max = 9007199254740990;

    const value = +input.value;
    if (value > max) {
      input.value = max;
    } else if (value < min) {
      input.value = min;
    }
  });
});

let complInput = document.querySelectorAll('.form__input--compl');
complInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    min = -9007199254740990;
    max = 9007199254740990;

    const value = +input.value;
    if (value > max) {
      input.value = max;
    } else if (value < min) {
      input.value = min;
    }
  });
});
