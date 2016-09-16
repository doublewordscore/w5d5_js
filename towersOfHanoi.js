const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// reader.close();

class Game {
  constructor() {
    this.stacks = [[1, 2, 3], [], []];
  }

  promptMove(callback) {
    console.log(" ");
    console.log(this.isWon());
    this.print();

    reader.question("Stack to move from?", (start_stack) => {

      reader.question("Stack to place to?", (end_stack) => {

          if (this.isValidMove(start_stack,end_stack)) {
            this.move(start_stack, end_stack);
          } else {
            console.log("Invalid move! Try again.");
          }
          callback();

      });
    });
  }


  isValidMove(start_idx, end_idx) {
    if ((start_idx > 2) || (end_idx > 2) || (start_idx < 0) || (end_idx < 0)) {
      return false;
    }
    if(this.stacks[end_idx].length === 0) {
      return true;
    }
    return this.stacks[end_idx] > this.stacks[start_idx];
  }

  move(start_stack, end_stack) {
    this.stacks[end_stack].push(this.stacks[start_stack].shift());
  }

  print() {
    console.log(" ");
    console.log(`Stack 0: ` + JSON.stringify(this.stacks[0]));
    console.log(`Stack 1: ` + JSON.stringify(this.stacks[1]));
    console.log(`Stack 2: ` + JSON.stringify(this.stacks[2]));
  }

  isWon() {
    return this.stacks[0].length === 0 &&
    (this.stacks[1].length === 0 || this.stacks[2].length === 0);
  }

  run(completionCallback) {



    if (this.isWon()) {
      completionCallback();
    } else {
      this.promptMove(() => {
      this.run(completionCallback);
    });
    }
  }
}

const game = new Game();
game.run(() => console.log("Congratulations!"));
reader.close();
