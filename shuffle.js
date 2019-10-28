/**
 * JS Lucky Numbers 
 * 
 * Possible todo list:
 * TODO: replace alerts with inner html 
 * TODO: show "generated N number(s)" once the numbers are ready
 * TODO: show "i of N number(s) shown" counter
 *  */ 
 
function randomizer(){
shuffleBtn = document.getElementById('shuffle');
showOneBtn = document.getElementById('show-one');
showAllBtn = document.getElementById('show-all');
resetClearBtn = document.getElementById('reset-clear');

showOneBtn.disabled = true;
showAllBtn.disabled = true;

shuffleBtn.onclick = function(){

  let min = document.getElementById('from').value;
  let max = document.getElementById('to').value;

  if((min <1 || min == "") || (max <1 || max == "")){
    showOneBtn.disabled = true;
    showAllBtn.disabled = true;
    alert("Please provide 'from' and 'to' with natural numbers\n (1, 50, 4, 37 etc)");
    return;
  }

  // swap min and max if they are in a wrong order
  min = Math.ceil(min);
  max = Math.floor(max);
  let swap = 0;

  if (max < min){
    swap = max;
    max = min;
    min = swap;
  };

  let numbers = [];
  let randomNumber = 0;
  
  // Generate an array of unique random numbers within the given range (min, max)
  for (let i = min; i > 0; i++){
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (numbers.indexOf(randomNumber) === -1)
    numbers.push(randomNumber);
    
    if (numbers.length === (max - min) + 1)
    break;
  };

  if(numbers.length >0){
    showOneBtn.disabled = false;
    showAllBtn.disabled = false;
  };

  console.log(`Generated * ${numbers.length} * numbers`);

  const h1 = document.createElement('h1');

  let sNumbers = numbers;

  // Randomly select and show a single number from the previously generated array
  showOneBtn.onclick = function(){
    let num = sNumbers[Math.floor(Math.random() * sNumbers.length)];

    h1.appendChild(document.createTextNode(num + '\t'));
    document.querySelector('div#output').appendChild(h1);

    console.log(num);
    sNumbers.splice(sNumbers.indexOf(num),1);

    if (sNumbers.length === 0){
      showOneBtn.disabled = true;
      showAllBtn.disabled = true;
      console.log('All numbers shown');
    }
  }

  // Randomly select and show all numbers from the previously generated array
  showAllBtn.onclick = function(){
    
    while (sNumbers.length > 0){
      let num = sNumbers[Math.floor(Math.random() * sNumbers.length)];

      h1.appendChild(document.createTextNode(num + '\t'));
      document.querySelector('div#output').appendChild(h1);

    console.log(num);
    sNumbers.splice(sNumbers.indexOf(num),1);
    }

    if (sNumbers.length === 0){
      showOneBtn.disabled = true;
      showAllBtn.disabled = true;
      console.log('Showed all');
    }
    }
}

// Clear the page and restore settings
resetClearBtn.onclick = function (){
  numbers = [];
  document.getElementById('from').value="1";
  document.getElementById('to').value="10";
  showOneBtn.disabled = true;
  showAllBtn.disabled = true;
  console.clear();

  // remove and recreate "output" div
  document.body.removeChild(document.getElementById('output'));
  const outputDiv = document.createElement('div');
  outputDiv.setAttribute("id", "output");
  document.body.appendChild(outputDiv);
}

} 