document.addEventListener("DOMContentLoaded", function (_) {
  const $rateInput = document.getElementById("rate-input");
  const $afterRateInput = document.getElementById("after-rate-amount-input");

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      const rate = parseInt($rateInput.value);
      const afterRateAmount = parseInt($afterRateInput.value);

      if (
        (!rate && rate !== 0) ||
        (!afterRateAmount && afterRateAmount !== 0)
      ) {
        alert("Invalid input.  You must enter a number.");
        return;
      }

      console.log({ rate, afterRateAmount });
    } catch (e) {
      console.error(e);
      alert("something went wrong.");
    }
  };

  const $form = document.getElementById("form");
  $form.addEventListener("submit", onSubmit);
});
