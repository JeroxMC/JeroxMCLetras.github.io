const text = "JeroxMC"; // Puedes cambiar este texto base

const styles = [
  { name: "𝒥𝑒𝓇𝑜𝓍𝑀𝒞", transform: str => str.replace(/./g, c => {
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const fancy = "𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏";
    return map.includes(c) ? fancy[map.indexOf(c)] : c;
  })},

  { name: "𝓙𝓮𝓻𝓸𝔁𝓜𝓒", transform: str => str.replace(/./g, c => {
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const fancy = "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃";
    return map.includes(c) ? fancy[map.indexOf(c)] : c;
  })},

  { name: "ⒿⒺⓇⓄⓍⓂⒸ", transform: str => str.replace(/./g, c => {
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const fancy = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
    return map.includes(c) ? fancy[map.indexOf(c)] : c;
  })},

  { name: "🅹🅴🆁🅾🆇🅼🅲", transform: str => str.replace(/./g, c => {
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fancy = "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉";
    c = c.toUpperCase();
    return map.includes(c) ? fancy[map.indexOf(c)] : c;
  })},

  { name: "🇯🇪🇷🇴🇽🇲🇨", transform: str => str.replace(/./g, c => {
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    c = c.toUpperCase();
    return map.includes(c) ? String.fromCodePoint(0x1F1E6 + (c.charCodeAt(0) - 65)) : c;
  })},

  { name: "🄹🄴🅁🄾🅇🄼🄲", transform: str => str.replace(/./g, c => {
    const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fancy = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉";
    c = c.toUpperCase();
    return map.includes(c) ? fancy[map.indexOf(c)] : c;
  })},

  { name: "⟦ᴊᴇʀᴏxᴍᴄ⟧", transform: str => `⟦${str.toLowerCase().split('').map(c => "abcdefghijklmnopqrstuvwxyz".includes(c) ? "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ"["abcdefghijklmnopqrstuvwxyz".indexOf(c)] : c).join('')}⟧` },
];

const output = document.getElementById("output");

styles.forEach(style => {
  const styledText = style.transform(text);

  const box = document.createElement("div");
  box.className = "style-box";
  box.innerText = styledText;

  const label = document.createElement("div");
  label.className = "style-label";
  label.innerText = style.name;

  box.appendChild(label);
  box.addEventListener("click", () => {
    navigator.clipboard.writeText(styledText);
    box.style.background = "#4caf50";
    setTimeout(() => box.style.background = "#2c2c2c", 500);
  });

  output.appendChild(box);
});

