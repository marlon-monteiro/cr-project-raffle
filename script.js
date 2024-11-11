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

let quantity, min, max, allowRepeats;

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

  quantity = parseInt(input1.value);
  min = parseInt(input2.value);
  max = parseInt(input3.value);
  allowRepeats = false;

  if (min > max) {
    alert('intervalo inválido');
    return;
  }

  runRaffle();
};

function runRaffle() {
  resetResults();
  if (imgOnOff.classList.contains('repeat')) {
    allowRepeats = true;
  } else {
    allowRepeats = false;
  }

  const numbers = generateRandomNumbers(quantity, min, max, allowRepeats);

  const numberFormated = formatNumber(numbers);

  numberFormated.forEach((number) => {
    const newDivContainer = document.createElement('div');
    newDivContainer.classList.add('result-numbers-container');

    const newBackgroundNumber = document.createElement('img');
    newBackgroundNumber.classList.add('result-image');
    newBackgroundNumber.src = 'assets/background-number-1.png';

    newBackgroundNumber.classList.remove('grow-rotate');

    const newNumber = document.createElement('p');
    newNumber.classList.add('result-number');
    newNumber.textContent = number;

    newDivContainer.append(newBackgroundNumber, newNumber);

    resultNumbers.append(newDivContainer);
  });

  raffle.classList.add('display-none');
  result.classList.remove('display-none');

  resultTitle.classList.add('fade-in');

  const allNumberContainers = document.querySelectorAll(
    '.result-numbers-container',
  );

  allNumberContainers.forEach((containerNumber, index) => {
    const imageContainerResult = containerNumber.querySelector('.result-image');
    const numberContainerResult =
      containerNumber.querySelector('.result-number');
    numberContainerResult.style.visibility = 'hidden';
    resultButton.style.visibility = 'hidden';

    const delay = index * 4500;

    setTimeout(() => {
      imageContainerResult.classList.add('grow-rotate');

      imageContainerResult.addEventListener(
        'animationend',
        (event) => {
          if (event.animationName === 'growRotate') {
            numberContainerResult.style.visibility = 'visible';
            numberContainerResult.classList.add('fade-in');

            setTimeout(() => {
              imageContainerResult.classList.add('display-none');
              numberContainerResult.classList.add('change-color-brand');
            }, 1000);
          }
        },
        { once: true },
      );
    }, delay);
  });

  setTimeout(() => {
    resultButton.style.visibility = 'visible';
    resultButton.classList.add('fade-in');
  }, 8000);
}

function generateRandomNumbers(quantity, min, max, allowRepeats) {
  const rng = seedrandom('fixed-seed');

  if (allowRepeats === true) {
    let numbers = [];
    for (let i = 0; i < quantity; i++) {
      const randomNum = Math.floor(rng() * (max - min + 1)) + min;
      numbers.push(randomNum);
    }
    return numbers;
  } else {
    const numbersBefore = new Set();
    while (numbersBefore.size < quantity) {
      const randomNum = Math.floor(rng() * (max - min + 1)) + min;
      numbersBefore.add(randomNum);
    }
    const numbersAfter = Array.from(numbersBefore);
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

function resetResults() {
  resultNumbers.innerHTML = '';
  resultButton.style.visibility = 'hidden';
  resultTitle.classList.remove('fade-in');
}

resultButton.addEventListener('click', ()=>{
  runRaffle()
})
