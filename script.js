const textInput = document.getElementById("textInput");
const outputContainer = document.getElementById("outputContainer");

const styles = [
  // Ejemplos principales
  "𝔩𝔢𝔱𝔯𝔞𝔰𝔟𝔬𝔫𝔦𝔱𝔞𝔰",
  "𝖑𝖊𝖙𝖗𝖆𝖘𝖇𝖔𝖓𝖎𝖙𝖆𝖘",
  "𝓵𝓮𝓽𝓻𝓪𝓼𝓫𝓸𝓷𝓲𝓽𝓪𝓼",
  "𝓁𝑒𝓉𝓇𝒶𝓈𝒷𝑜𝓃𝒾𝓉𝒶𝓈",
  "𝕝𝕖𝕥𝕣𝕒𝕤𝕓𝕠𝕟𝕚𝕥𝕒𝕤",
  "𝘭𝘦𝘵𝘳𝘢𝘴𝘣𝘰𝘯𝘪𝘵𝘢𝘴",
  "𝙡𝙚𝙩𝙧𝙖𝙨𝙗𝙤𝙣𝙞𝙩𝙖𝙨",
  "𝚕𝚎𝚝𝚛𝚊𝚜𝚋𝚘𝚗𝚒𝚝𝚊𝚜",
  "ⓛⓔⓣⓡⓐⓢⓑⓞⓝⓘⓣⓐⓢ",
  "🅻🅴🆃🆁🅰🆂🅱🅾🅽🅸🆃🅰🆂",
  "🄻🄴🅃🅁🄰🅂🄱🄾🄽🄸🅃🄰🅂",
  "ᒪᗴ丅ᖇᗩᔕᗷᗝᑎᎥ丅ᗩᔕ",
  "ｌｅｔｒａｓｂｏｎｉｔａｓ",
  "𝐥𝐞𝐭𝐫𝐚𝐬𝐛𝐨𝐧𝐢𝐭𝐚𝐬",
  "sɐʇıuoqsɐɹʇǝl",
  "lǝʇɹɐsqouᴉʇɐs",
  "ㄥ乇ㄒ尺卂丂 乃ㄖ几丨ㄒ卂丂",
  "ﾚ乇ｲ尺ﾑ丂 乃の刀ﾉｲﾑ丂",
  "Lê†rå§ ßðñï†å§",
  "ⱠɆ₮Ɽ₳₴ ฿Ø₦ł₮₳₴",
  "ℓєтяαѕ вσηιтαѕ",
  "Ն૯੮Րคς ც૦Ոɿ੮คς",
  "Гётяа$ Бѳпїта$",
  "LΞΓЯДS БФИIΓДS",
  "꒒ꍟ꓅꒓ꋫꌚ ꃃꆂꁹꂑ꓅ꋫꌚ",
  "꒒ꍟ꓄ꋪꍏꌗ ꌃꂦꈤꀤ꓄ꍏꌗ",
  "ﾚε†rαš ß⊕ηï†αš",
  "Ł€ŦŘΔŞ βØŇƗŦΔŞ",
  // Repite con más variantes de letras aquí
];

// Rellenamos hasta 100 estilos variando mayúsculas/minúsculas/symbols
while (styles.length < 100) {
  const base = "letrasbonitas";
  let variation = "";
  for (const c of base) {
    variation += Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase();
  }
  styles.push(variation);
}

textInput.addEventListener("input", () => {
  const value = textInput.value;
  outputContainer.innerHTML = "";

  styles.forEach((styleExample) => {
    const transformed = styleExample.replace(/letrasbonitas/gi, value || "letrasbonitas");
    const div = document.createElement("div");
    div.className = "output";
    div.textContent = transformed;

    const copied = document.createElement("span");
    copied.className = "copied";
    copied.textContent = "¡Copiado!";
    div.appendChild(copied);

    div.addEventListener("click", () => {
      navigator.clipboard.writeText(transformed);
      div.classList.add("copied-anim");
      setTimeout(() => div.classList.remove("copied-anim"), 1000);
    });

    outputContainer.appendChild(div);
  });
});




