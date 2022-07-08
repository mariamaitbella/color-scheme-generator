function handleClick() {
  document.getElementById("colors-area").innerHTML = "";
  const pickedColor = document
    .getElementById("pickedColorInput")
    .value.slice(1);
  const modeSelected = document
    .getElementById("modeSelected")
    .value.toLowerCase();
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
        const hex = document.createElement("div");
        hex.setAttribute("id", item.hex.value.slice(1));
        hex.classList.add("hex");
        hex.innerText = item.hex.value;
        colorDiv.appendChild(color);
        colorDiv.appendChild(hex);
        const copied = document.createElement("div");
        copied.innerText = "Copied";
        copied.style.position = "absolute";
        copied.style.backgroundColor = "white";
        copied.style.padding = "5px";
        copied.style.borderRadius = "20px";
        copied.style.top = "73%";
        copied.style.opacity = "0";
        copied.style.marginLeft = "40px";
        const after = document.createElement("div");
        after.setAttribute("id", "copied" + item.hex.value.slice(1));
        after.style.position = "absolute";
        after.style.width = "10px";
        after.style.height = "10px";
        after.style.backgroundColor = "white";
        after.style.transform = "rotate(45deg)";
        after.style.top = "75%";
        after.style.left = "45%";
        after.style.opacity = "0";

        colorDiv.appendChild(copied);

        copied.appendChild(after);

        document.getElementById("colors-area").appendChild(colorDiv);

        color.style.backgroundColor = item.hex.value;
        document
          .getElementById(item.hex.value.slice(1))
          .addEventListener("click", function (e) {
            after.style.opacity = "1";
            copied.style.opacity = "1";
            console.log(item.hex.value.slice(1));
            navigator.clipboard.writeText("#" + item.hex.value.slice(1));
            document
              .getElementById(item.hex.value.slice(1))
              .addEventListener("mouseout", () => {
                after.style.opacity = "0";
                copied.style.opacity = "0";
              });
          });
      });
    });
}

document
  .getElementById("get-color-scheme")
  .addEventListener("click", handleClick);
