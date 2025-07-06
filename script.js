let isBold = false;
let isItalic = false;

function toggleStyle(style) {
  if (style === "bold") isBold = !isBold;
  if (style === "italic") isItalic = !isItalic;
}

function applyFormat() {
  const text = document.getElementById("userText").value;
  const color = document.getElementById("colorPicker").value;
  const emoji = document.getElementById("emojiSelect").value;

  const span = document.createElement("span");
  span.textContent = emoji ? `${emoji} ${text} ${emoji}` : text;
  span.style.color = color;

  span.classList.toggle("bold", isBold);
  span.classList.toggle("italic", isItalic);

  const result = document.getElementById("result");
  result.innerHTML = "";
  result.appendChild(span);
}

function copyResult() {
  const resultText = document.getElementById("result").innerText;
  navigator.clipboard.writeText(resultText)
    .then(() => alert("¡Texto copiado!"))
    .catch(() => alert("Error al copiar."));
}

