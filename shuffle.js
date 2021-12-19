/**
 * JS Randomizer
 * Outputs random numbers from specified range
 * 
 * source: https://github.com/andrei-z/js-randomizer
 *  */

function randomizer() {
  shuffleBtn = document.getElementById('shuffle');
  showLuckyBtn = document.getElementById('lucky-one');
  showAllBtn = document.getElementById('show-all');
  resetClearBtn = document.getElementById('reset-clear');

  showLuckyBtn.disabled = true;
  showAllBtn.disabled = true;

  shuffleAndShow()
  resetAndClear()
}

function shuffleAndShow() {
  shuffleBtn.onclick = () => {

    const min = document.getElementById('from').value;
    const max = document.getElementById('to').value;

    validateInput(min, max);
    const numbers = generate(min, max);
    showNumbers(numbers);
  }
}

function validateInput(min, max) {
  if (min == "" || max == "") {
    showLuckyBtn.disabled = true;
    showAllBtn.disabled = true;
    alert("Enter numbers in \'from\' and \'to\'");
    return;
  }

  if ((min < 0 || min > 999) || (max < 0) || (max > 999)) {
    showLuckyBtn.disabled = true;
    showAllBtn.disabled = true;
    alert("Out of range\nvalid range 0-999");
    return;
  }
}

function generate(min, max) {
  // swap min and max if they are in a wrong order
  min = Math.ceil(min);
  max = Math.floor(max);
  let swap = 0;

  if (max < min) {
    swap = max;
    max = min;
    min = swap;
  };
  // Generate an array of unique random numbers within the given range
  let numbers = [];
  let randomNumber = 0;

  for (let i = min; i > -1; i++) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (numbers.indexOf(randomNumber) === -1)
      numbers.push(randomNumber);

    if (numbers.length === (max - min) + 1)
      break;
  };

  if (numbers.length > 0) {
    showLuckyBtn.disabled = false;
    showAllBtn.disabled = false;
  };

  console.log(`Generated * ${numbers.length} * numbers`);
  return numbers;
}

function showNumbers(arr) {
  const el = document.createElement('h1')

  function showAll(showAll) {
    let count = showAll ? arr.length : 1;

    for (let i = count; i > 0; i--) {
      let num = arr[Math.floor(Math.random() * arr.length)];

      el.appendChild(document.createTextNode(num + '\t'));
      document.querySelector('div#output').appendChild(el);

      console.log(num);
      arr.splice(arr.indexOf(num), 1);
    }

    if (arr.length === 0) {
      showLuckyBtn.disabled = true;
      showAllBtn.disabled = true;
      console.log('Showed all');
    }
  }

  // Show one random number (Lucky One)
  showLuckyBtn.onclick = () => {
    showAll(false);
  }

  // Show all random numbers (Show All)
  showAllBtn.onclick = () => {
    showAll(true);
  }
}

function resetAndClear() {
  // Clear the page and restore settings (Reset & Clear)
  resetClearBtn.onclick = () => {
    numbers = [];
    document.getElementById('from').value = "1";
    document.getElementById('to').value = "10";
    showLuckyBtn.disabled = true;
    showAllBtn.disabled = true;
    console.clear();

    // remove and recreate "output" div
    document.body.removeChild(document.getElementById('output'));
    const outputDiv = document.createElement('div');
    outputDiv.setAttribute("id", "output");
    document.body.appendChild(outputDiv);
  }
}