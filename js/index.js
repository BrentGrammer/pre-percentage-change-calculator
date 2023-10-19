document.addEventListener("DOMContentLoaded", function (_) {
  const $takeHomeRateInput = document.getElementById("rate-input");
  const $preTaxIncomeInput = document.getElementById("pre-tax-income-input");
  const $takeHomeResult = document.getElementById("result");
  const $takeHomeResultSection = document.getElementById("result-section");
  const showResultSection = () =>
    ($takeHomeResultSection.style.visibility = "visible");
  const hideResultSection = () =>
    ($takeHomeResultSection.style.visibility = "hidden");

  const $preTaxRateInput = document.getElementById("pre-tax-form-rate-input");
  const $takeHomePayInput = document.getElementById(
    "pre-tax-form-take-home-input"
  );
  const $preTaxResult = document.getElementById("pre-tax-form-result");
  const $preTaxResultSection = document.getElementById(
    "pre-tax-form-result-section"
  );
  const showPreTaxResultSection = () =>
    ($preTaxResultSection.style.visibility = "visible");
  const hidePreTaxResultSection = () =>
    ($preTaxResultSection.style.visibility = "hidden");

  const clearResult = (forForm) => {
    if (forForm === "pre-tax") {
      hidePreTaxResultSection();
      $preTaxResult.innerText = "";
    } else {
      hideResultSection();
      $takeHomeResult.innerText = "";
    }
  };

  const calculateTakeHomeAmount = (amount, rate) => {
    const decimalRate = rate / 100;
    const percentAfterTax = 1 - decimalRate;
    const result = amount * percentAfterTax;
    return result.toFixed(2);
  };

  /**
   * formula is take home pay / 1 - [percent-rate-decimal]
   * Ex: 34/0.80 yields the original amount that had a 20% (0.2 in decimal) increase to result in 34.
   */
  const calculatePreTaxAmount = (takeHome, rate) => {
    const decimalRate = rate / 100;
    const divisor = 1 - decimalRate;
    return (takeHome / divisor).toFixed(2);
  };

  const prepareInput = (input) => {
    if (input.includes(".")) {
      if (input.indexOf(".") === 0) {
        input = "0" + input;
      }

      return parseFloat(input);
    } else {
      return parseInt(input);
    }
  };

  const onTakeHomeFormSubmit = (event) => {
    event.preventDefault();

    try {
      clearResult("take-home");
      const rate = prepareInput($takeHomeRateInput.value);
      const preTaxIncome = prepareInput($preTaxIncomeInput.value);

      if ((!rate && rate !== 0) || (!preTaxIncome && preTaxIncome !== 0)) {
        alert("Invalid input.  You must enter a number.");
        return;
      }

      const takeHomePay = calculateTakeHomeAmount(preTaxIncome, rate);
      $takeHomeResult.innerText = `$${takeHomePay}`;

      showResultSection();
    } catch (e) {
      console.error(e);
      alert("something went wrong.");
    }
  };

  const onPreTaxFormSubmit = (event) => {
    event.preventDefault();

    try {
      clearResult("pre-tax");
      const rate = prepareInput($preTaxRateInput.value);
      const takeHomePay = prepareInput($takeHomePayInput.value);

      if ((!rate && rate !== 0) || (!takeHomePay && takeHomePay !== 0)) {
        alert("Invalid input.  You must enter a number.");
        return;
      }

      const preTaxPay = calculatePreTaxAmount(takeHomePay, rate);
      $preTaxResult.innerText = `$${preTaxPay}`;

      showPreTaxResultSection();
    } catch (e) {
      console.error(e);
      alert("something went wrong.");
    }
  };

  const $takeHomeForm = document.getElementById("take-home-form");
  $takeHomeForm.addEventListener("submit", onTakeHomeFormSubmit);

  const $preTaxForm = document.getElementById("pre-tax-form");
  $preTaxForm.addEventListener("submit", onPreTaxFormSubmit);
});
