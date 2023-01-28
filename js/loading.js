const $loadingDiv = document.getElementById("loading");
function showLoading() {
  $loadingDiv.style.display = "block";
}

function hideLoading() {
  $loadingDiv.style.display = "none";
}

export { showLoading, hideLoading };
