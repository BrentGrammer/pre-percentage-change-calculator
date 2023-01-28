document.addEventListener("DOMContentLoaded", function (_) {
  const $rateInput = document.getElementById("rate-input");
  const $afterRateInput = document.getElementById("after-rate-amount-input");
  const $result = document.getElementById("result");
  const $resultSection = document.getElementById("result-section");

  const showResultSection = () => ($resultSection.style.visibility = "visible");
  const hideResultSection = () => ($resultSection.style.visibility = "hidden");

  const clearResult = () => {
    hideResultSection();
    $result.innerText = "";
  };

  /**
   * formula is amount / 1.[percent-rate-decimal]
   *
   * Ex: 34/1.2 yields the original amount that had a 20% (0.2 in decimal) increase to result in 34.
   */
  const calculatePrePercentAmount = (amount, rate) => {
    const decimalRate = rate / 100;

    const divisor = 1 + decimalRate;

    return (amount / divisor).toFixed(2);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      clearResult();
      let rate = $rateInput.value;
      let afterRateAmount = $afterRateInput.value;

      if (rate.includes(".") && rate.indexOf(".") === 0) {
        rate = "0" + rate;
      }

      rate = parseInt(rate);
      afterRateAmount = parseInt(afterRateAmount);

      if (
        (!rate && rate !== 0) ||
        (!afterRateAmount && afterRateAmount !== 0)
      ) {
        alert("Invalid input.  You must enter a number.");
        return;
      }

      const result = calculatePrePercentAmount(afterRateAmount, rate);
      $result.innerText = result;

      showResultSection();
    } catch (e) {
      console.error(e);
      alert("something went wrong.");
    }
  };

  const $form = document.getElementById("form");
  $form.addEventListener("submit", onSubmit);
});
