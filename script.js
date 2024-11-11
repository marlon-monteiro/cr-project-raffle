import seedrandom from 'https://cdn.skypack.dev/seedrandom';

const form = document.querySelector('form');
const raffle = document.getElementById('raffle');
const result = document.getElementById('result');
const resultTitle = document.querySelector('.result-title');
const resultNumbers = document.querySelector('.result-numbers');
const resultImage = document.querySelector(
  '.result-numbers-container .result-image',
);
const resultNumber = document.querySelector(
  '.result-numbers-container .result-number',
);
const resultButton = document.querySelector('.result-button');

const input1 = document.getElementById('input-1');
const labelInput1 = input1.parentElement;
const h2Input1 = document.querySelector('.column-1 h2');

const input2 = document.getElementById('input-2');
const labelInput2 = input2.parentElement;

const input3 = document.getElementById('input-3');
const labelInput3 = input3.parentElement;

const imgOnOff = document.querySelector('.form-on-off img');

input1.addEventListener('focus', () => {
  labelInput1.classList.add('active-label');
  h2Input1.classList.add('active-h2');
});

input1.addEventListener('blur', () => {
  labelInput1.classList.remove('active-label');
});

imgOnOff.addEventListener('click', (event) => {
  event.preventDefault();
  if (imgOnOff.src.includes('icon-off')) {
    imgOnOff.src = 'assets/icons/icon-on.png';
    imgOnOff.classList.remove('repeat');
    imgOnOff.classList.add('no-repeat');
  } else {
    imgOnOff.src = 'assets/icons/icon-off.png';
    imgOnOff.classList.remove('no-repeat');
    imgOnOff.classList.add('repeat');
  }
});

form.onsubmit = (event) => {
  event.preventDefault();
  console.clear();
  console.log('Form submit triggered');

  const quantity = parseInt(input1.value);
  const min = parseInt(input2.value);
  const max = parseInt(input3.value);
  let allowRepeats = false;

  if (min > max) {
    alert('intervalo inválido');
  }

  if (imgOnOff.classList.contains('repeat')) {
    allowRepeats = true;
  } else {
    allowRepeats = false;
  }

  console.log(quantity, min, max);

  const numbers = generateRandomNumbers(quantity, min, max, allowRepeats);

  const numberFormated = formatNumber(numbers);

  console.log('numero formatado ====', numberFormated);

  numberFormated.forEach((number) => {
    console.log('number dentro do forEach', number);

    const newDivContainer = document.createElement('div');
    newDivContainer.classList.add('result-numbers-container');

    const newBackgroundNumber = document.createElement('img');
    newBackgroundNumber.classList.add('result-image');
    newBackgroundNumber.src = 'assets/background-number-1.png';

    newBackgroundNumber.classList.remove('grow-rotate');
    console.log(
      'newBackgroundNumber verificar class grow rotate na image====',
      newBackgroundNumber,
    );

    const newNumber = document.createElement('p');
    newNumber.classList.add('result-number');
    newNumber.textContent = number;
    console.log('newNumber dentro do forEach', newNumber);

    newDivContainer.append(newBackgroundNumber, newNumber);

    resultNumbers.append(newDivContainer);
    console.log('resultNumbers dentro do forEach', resultNumbers);
  });

  raffle.classList.add('display-none');
  result.classList.remove('display-none');

  resultTitle.classList.add('fade-in');

  const allNumberContainers = document.querySelectorAll(
    '.result-numbers-container',
  );

  console.log(
    'allNumberContainers, verificar se tem a class grow rotate no image====',
    allNumberContainers,
  );

  allNumberContainers.forEach((containerNumber, index) => {
    const imageContainerResult = containerNumber.querySelector('.result-image');
    const numberContainerResult =
      containerNumber.querySelector('.result-number');
    numberContainerResult.style.visibility = 'hidden';
    resultButton.style.visibility = 'hidden';

    const delay = index * 4500;
    console.log(
      'numberContainerResult no inicio do foreach sem class fade in',
      numberContainerResult,
    );

    console.log(
      'imageContainerResult antes da class grow rotate',
      imageContainerResult,
    );

    setTimeout(() => {
      imageContainerResult.classList.add('grow-rotate');
      console.log(
        'imageContainerResult depois da class grow rotate',
        imageContainerResult,
      );

      imageContainerResult.addEventListener(
        'animationend',
        (event) => {
          console.log('animationend triggered');

          if (event.animationName === 'growRotate') {
            // setTimeout(() => {
            numberContainerResult.style.visibility = 'visible';
            numberContainerResult.classList.add('fade-in');
            console.log('numero apareceu com fade-in');
            // }, 100);

            setTimeout(() => {
              imageContainerResult.classList.add('display-none');
              console.log('display none na image');
              numberContainerResult.classList.add('change-color-brand');
            }, 1000);
          }
        },
        { once: true },
      );
    }, delay);
    console.log('numberContainerResult ===', numberContainerResult);
  });

  setTimeout(() => {
    resultButton.style.visibility = 'visible';
    resultButton.classList.add('fade-in');
  }, 8000);
};

function generateRandomNumbers(quantity, min, max, allowRepeats) {
  console.log('generateRandomNumbers chamado com:', quantity, min, max);

  const rng = seedrandom('fixed-seed');

  if (allowRepeats === true) {
    let numbers = [];
    for (let i = 0; i < quantity; i++) {
      const randomNum = Math.floor(rng() * (max - min + 1)) + min;
      numbers.push(randomNum);
    }
    console.log('if no generate ==', numbers);
    return numbers;
  } else {
    const numbersBefore = new Set();
    while (numbersBefore.size < quantity) {
      const randomNum = Math.floor(rng() * (max - min + 1)) + min;
      numbersBefore.add(randomNum);
    }
    const numbersAfter = Array.from(numbersBefore);
    console.log('else no generate ==', numbersAfter);
    return numbersAfter;
  }
}

function formatNumber(numbers) {
  let formatNumbers = [];

  numbers.forEach((number) => {
    const result = String(number).padStart(2, '0');
    formatNumbers.push(result);
  });
  return formatNumbers;
}
