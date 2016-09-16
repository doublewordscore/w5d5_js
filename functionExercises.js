class Clock {
  constructor() {
    const time = new Date();
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    this.seconds = time.getSeconds();

    this.printTime();

    setInterval(this._tick.bind(this),1000);
  }

  printTime() {
    const format = `${this.hours}:${this.minutes}:${this.seconds}`;
    console.log(format);
  }

  _tick() {
    this.seconds += 1;
    this.printTime();
  }
}

// const clock = new Clock();

//addNumbers
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter a number: ", (num) => {
      sum += parseFloat(num);
      completionCallback(sum);
      addNumbers(sum, (numsLeft - 1), completionCallback);
    });
  } else {
  console.log(`Final sum: ${sum}`);
  reader.close();
  }
}

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}?`, (answer) => {
    if (answer === "yes") {
      callback(true);
    } else {
      callback(false);
      }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if( i === arr.length-1 ) {
    outerBubbleSortLoop(madeAnySwaps);
    return;
  } else {

    askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
      if(isGreaterThan) {
        console.log("totally");
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {

  function outerBubbleSortLoop(madeAnySwaps) {
    if(madeAnySwaps) { innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });


Function.prototype.myBind = function(context) {
  return () => this.apply(context);
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
