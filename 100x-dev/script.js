class Calculator {
  constructor(initialValue) {
    this.result = initialValue ?? 0;
  }

  sum(value) {
    this.result += value;
    return this;
  }

  rest(value) {
    this.result -= value;
    return this;
  }

  multiply(value) {
    this.result *= value;
    return this;
  }

  div(value) {
    this.result /= value;
    return this;
  }

  getResult() {
    return this.result;
  }
}

const myCalc = new Calculator();
const result = myCalc.sum(500).div(10).multiply(2).getResult();
console.log(result);
