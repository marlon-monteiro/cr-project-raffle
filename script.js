import seedrandom from 'https://cdn.skypack.dev/seedrandom';

const form = document.querySelector('form');
const raffle = document.getElementById('raffle');
const result = document.getElementById('result');
const resultNumbers = document.querySelector('.result-numbers');

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
    console.log(number);
    const newDivNumber = document.createElement('div');
    newDivNumber.classList.add('result-number');
    newDivNumber.textContent = number;
    resultNumbers.append(newDivNumber);
    console.log(resultNumbers);
  });

  raffle.classList.add('display-none');
  result.classList.remove('display-none');
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
