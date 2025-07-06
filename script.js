function generateHex() {
  const hex = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  const userText = document.getElementById("userText").value;
  document.getElementById("result").innerHTML = `<span style="color:${hex}">${userText}</span>`;
}

function applyFontStyle(style) {
  const text = document.getElementById("userText").value;
  const styleMap = {
    bold: { A: "𝗔", a: "𝗮" },
    italic: { A: "𝘈", a: "𝘢" },
    bubble: { A: "Ⓐ", a: "ⓐ" },
  };
  
  const convert = (ch) => {
    const code = ch.charCodeAt(0);
    if (style === "bold") {
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1d400 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1d41a + code - 97);
    }
    if (style === "italic") {
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1d434 + code - 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1d44e + code - 97);
    }
    if (style === "bubble") {
      const bubbles = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
      if (code >= 97 && code <= 122) return bubbles[code - 97];
      return ch;
    }
    return ch;
  };

  const converted = text.split("").map(convert).join("");
  document.getElementById("result").innerText = converted;
}

function addEmojis() {
  const emojis = ["✨", "🔥", "😂", "🚀", "🌈", "💯", "🎉", "🥳", "😎"];
  const text = document.getElementById("userText").value;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  document.getElementById("result").innerText = `${emoji} ${text} ${emoji}`;
}

function copyResult() {
  const result = document.getElementById("result").innerText;
  navigator.clipboard.writeText(result)
    .then(() => alert("Texto copiado al portapapeles!"))
    .catch(() => alert("Error al copiar."));
}
