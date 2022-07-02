function handleClick() {
  document.getElementById("colors-area").innerHTML = "";
  // -----------------------------------------------------------VARIABLES
  const pickedColor = document
    .getElementById("pickedColorInput")
    .value.slice(1);
  const modeSelected = document
    .getElementById("modeSelected")
    .value.toLowerCase();
  //
  // -----------------------------------------------------COLOR SCHEME API
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${pickedColor}&mode=${modeSelected}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      data.colors.map((item) => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color-container");
        const color = document.createElement("div");
        color.classList.add("color");
        const hex = document.createElement("input");
        hex.classList.add("hex");
        hex.setAttribute("id", "hex");
        hex.setAttribute("type", "text");
        hex.setAttribute("disabled", "true");
        hex.value = item.hex.value;
        colorDiv.appendChild(color);
        colorDiv.appendChild(hex);
        document.getElementById("colors-area").appendChild(colorDiv);
        color.style.backgroundColor = item.hex.value;
        hex.addEventListener("click", function () {
          console.log(hex.text);
        });
      });
    });
}

document
  .getElementById("get-color-scheme")
  .addEventListener("click", handleClick);
