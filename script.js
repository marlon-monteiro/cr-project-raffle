const form = document.querySelector('form');


const input1 = document.getElementById('input-1');
const labelInput1 = input1.parentElement;
const h2Input1 = document.querySelector('.column-1 h2')

const input2 = document.getElementById('input-2');
const labelInput2 = input2.parentElement;

const input3 = document.getElementById('input-3');
const labelInput3 = input3.parentElement;

const imgOnOff = document.querySelector('.form-on-off img');

input1.addEventListener('focus', () => {
  labelInput1.classList.add('active-label');
  h2Input1.classList.add('active-h2');
  console.log('add class focus')
  console.log('h2Input1 add ===', h2Input1)
});

input1.addEventListener('blur', () => {
  labelInput1.classList.remove('active-label');
  console.log('remove class focus')
  console.log("h2Input1remove ===", h2Input1)
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

  const quantity = parseInt(input1.value);
  const min = parseInt(input2.value);
  const max = parseInt(input3.value);
  let allowRepeats = false;

  if (min > max) {
    alert('intervalo inválido');
  }

  console.log('imgOnOff no SUBMIT', imgOnOff);

  if (imgOnOff.classList.contains('repeat')) {
    console.log('repeat');
    allowRepeats = true;
  } else {
    console.log('no repeat');
    allowRepeats = false;
  }

  console.log('allowRepeats ====', allowRepeats);

  const numbers = generateRandomNumbers(quantity, min, max, allowRepeats);

  const numberFormated = formatNumber(numbers);

  console.log('numero formatado ====', numberFormated);

  // numberFormated.forEach((eachNumber) => {
  //   console.log(eachNumber);
  // });
};

function generateRandomNumbers(quantity, min, max, allowRepeats) {
  if (allowRepeats === true) {
    let numbers = [];
    for (let i = 0; i < quantity; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('randomNum ==== ', randomNum);
      numbers.push(randomNum);
    }
    console.log('PODE REPETIR ===', numbers);
    return numbers;
  } else {
    const numbersBefore = new Set();
    while (numbersBefore.size < quantity) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      numbersBefore.add(randomNum);
    }
    const numbersAfter = Array.from(numbersBefore);
    console.log('NÃO PODE REPETIR ===', numbersAfter);
    return numbersAfter;
  }
}

function formatNumber(numbers) {
  let formatNumbers = [];

  console.log('numbers que vamos iniciar forEach', numbers);
  numbers.forEach((number) => {
    const result = String(number).padStart(2, '0');
    console.log('result ==== ', result);
    formatNumbers.push(result);
  });
  console.log('finalNumbers ====', formatNumbers);
  return formatNumbers;
}
