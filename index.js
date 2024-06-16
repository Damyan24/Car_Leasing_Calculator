const interestForNewCar = 2.99;
const interestForUsedCar = (Math.round(3.7 * 100) / 100).toFixed(2);

let carValueStatus = 0;
let downPaymentStatus = 0;

document.addEventListener("DOMContentLoaded", function () {
  let carSelect = document.getElementById("carType");

  //set default interestRate
  updateInterestRate();

  //checking for changes in the type of car
  carSelect.addEventListener("change", function () {
    updateInterestRate();
    checkInputs();
  });

  // checking if the value input is right
  carValueInput = document.getElementById("carValue");

  leaseLength = document.getElementById("leasePeriod");

  leaseLength.addEventListener("change", function () {
    checkInputs();
  });
  carValueInput.addEventListener("input", function () {
    validateCarValue(carValueInput.value.trim());
    checkInputs();
  });

  //checking if the down payment is right

  downPayInput = document.getElementById("downPay");

  downPayInput.addEventListener("input", function () {
    validateDownPayment(downPayInput.value.trim());
    checkInputs();
  });

  // car price validation using the slider

  let rangeInput = document.getElementById("carValRange");

  rangeInput.addEventListener("input", function () {
    document.getElementById("carValue").value = rangeInput.value;
    validateCarValue(rangeInput.value.trim());
  });

  // down payment validation using the slider

  let rangeInputForDownPayment = document.getElementById("downPayRange");

  rangeInputForDownPayment.addEventListener("input", function () {
    document.getElementById("downPay").value = rangeInputForDownPayment.value;
    validateDownPayment(rangeInputForDownPayment.value.trim());
  });

  //////////////////////////////////////////////////////////////////////////////////////

  function updateInterestRate() {
    let carType = carSelect.options[carSelect.selectedIndex].text;

    if (carType === "Brand New") {
      document.getElementById("interestRate").innerHTML = interestForNewCar;
    } else {
      document.getElementById("interestRate").innerHTML = interestForUsedCar;
    }
  }

  function validateCarValue(inputValue) {
    const number = parseInt(inputValue);

    if (isNaN(number) || number < 10000 || number > 200000) {
      document.getElementById("carValueError").innerHTML =
        "Invalid input, please enter a number in the given range!";
      document.getElementById("carValue").style.borderColor = "red";

      carValueStatus = 0;
    } else {
      document.getElementById("carValueError").innerHTML = "";
      document.getElementById("carValue").style.borderColor = "gray";
      document.getElementById("carValRange").value = number;

      carValueStatus = 1;
    }
  }

  function validateDownPayment(inputValue) {
    const number = parseInt(inputValue);

    if (isNaN(number) || number < 10 || number > 50) {
      document.getElementById("downPaymentError").innerHTML =
        "Invalid input, plese enter a number in the given range!";
      document.getElementById("downPay").style.borderColor = "red";

      downPaymentStatus = 0;
    } else {
      document.getElementById("downPaymentError").innerHTML = "";
      document.getElementById("downPay").style.borderColor = "gray";
      document.getElementById("downPayRange").value = number;

      downPaymentStatus = 1;
    }
  }

  function checkInputs() {
    if (carValueStatus === 1 && downPaymentStatus === 1) {
      console.log("You can calculate now");
      calculate();
    } else {
      console.log("laina");
    }
  }

  function calculate() {
    let priceOfTheCar = document.getElementById("carValue").value;

    let interest = document.getElementById("interestRate").innerHTML / 100;

    let leasePeriod =
      document.getElementById("leasePeriod").options[
        document.getElementById("leasePeriod").selectedIndex
      ].text;

    let downPayment =
      Math.round(
        ((priceOfTheCar * document.getElementById("downPay").value) / 100) * 100
      ) / 100;

    let loanAmount = priceOfTheCar - downPayment;

    let monthlyInterestRate = interest / 12;

    let monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));

    let totalLeasingCost = leasePeriod * monthlyPayment + downPayment;

    document.getElementById("monthlyPayment").innerHTML =
      monthlyPayment.toFixed(2);

    document.getElementById("downPayment").innerHTML = downPayment.toFixed(2);

    document.getElementById("totalLeasingCost").innerHTML =
      totalLeasingCost.toFixed(2);
  }
});
