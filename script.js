const styles = [
  t => t.toUpperCase(),
  t => t.toLowerCase(),
  t => [...t].reverse().join(''),
  t => t.split('').join('✨'),
  t => '★ ' + t + ' ★',
  t => '♡ ' + t + ' ♡',
  t => '『' + t + '』',
  t => '➤ ' + t + ' ➤',
  t => '☁️ ' + t + ' ☁️',
  t => '⛧ ' + t + ' ⛧',
  t => '✿ ' + t + ' ✿',
  t => '✧ ' + t + ' ✧',
  t => '𓆩 ' + t + ' 𓆪',
  t => '➶ ' + t + ' ➷',
  t => '☠ ' + t + ' ☠',
  t => '⚡ ' + t + ' ⚡',
  t => '🔥 ' + t + ' 🔥',
  t => '🎀 ' + t + ' 🎀',
  t => '💎 ' + t + ' 💎',
  t => '🌈 ' + t + ' 🌈',
  t => '🎉 ' + t + ' 🎉',
  t => '🧃 ' + t + ' 🧃',
  t => '🎃 ' + t + ' 🎃',
  t => '💣 ' + t + ' 💣',
  t => '👑 ' + t + ' 👑',
  t => '💀 ' + t + ' 💀',
  t => '🕷 ' + t + ' 🕷',
  t => '🎧 ' + t + ' 🎧',
  t => '🚀 ' + t + ' 🚀',
  t => '🎈 ' + t + ' 🎈',
  t => '🧸 ' + t + ' 🧸',
  t => '🌸 ' + t + ' 🌸',
  t => '🍁 ' + t + ' 🍁',
  t => '🪐 ' + t + ' 🪐',
  t => '🔮 ' + t + ' 🔮',
  t => '🖤 ' + t + ' 🖤',
  t => '😈 ' + t + ' 😈',
  t => '👻 ' + t + ' 👻',
  t => '🧠 ' + t + ' 🧠',
  t => '🫀 ' + t + ' 🫀',
  t => '📀 ' + t + ' 📀',
  t => '📚 ' + t + ' 📚',
  t => '🧃 ' + t + ' 🧃',
  t => '🧋 ' + t + ' 🧋',
  t => '🧊 ' + t + ' 🧊',
  t => '🧿 ' + t + ' 🧿',
  t => '🛸 ' + t + ' 🛸',
  t => '🪅 ' + t + ' 🪅',
  t => '🪄 ' + t + ' 🪄',
  t => '🔫 ' + t + ' 🔫',
  t => '🛡 ' + t + ' 🛡',
  t => '🧱 ' + t + ' 🧱',
  t => '🗡 ' + t + ' 🗡',
  t => '💤 ' + t + ' 💤',
  t => '⚔ ' + t + ' ⚔',
  t => '🪓 ' + t + ' 🪓',
  t => '🧨 ' + t + ' 🧨',
  t => '📜 ' + t + ' 📜',
  t => '📝 ' + t + ' 📝',
  t => '🖋️ ' + t + ' 🖋️',
  t => '✏️ ' + t + ' ✏️',
  t => '💌 ' + t + ' 💌',
  t => '📖 ' + t + ' 📖',
  t => '🪙 ' + t + ' 🪙',
  t => '💍 ' + t + ' 💍',
  t => '🌙 ' + t + ' 🌙',
  t => '🌟 ' + t + ' 🌟',
  t => '⭐ ' + t + ' ⭐',
  t => '🔔 ' + t + ' 🔔',
  t => '🎵 ' + t + ' 🎵',
  t => '🎶 ' + t + ' 🎶',
  t => '💬 ' + t + ' 💬',
  t => '🗯 ' + t + ' 🗯',
  t => '🌀 ' + t + ' 🌀',
  t => '☃ ' + t + ' ☃',
  t => '🌌 ' + t + ' 🌌',
  t => '🛠 ' + t + ' 🛠',
  t => '🧰 ' + t + ' 🧰',
  t => '🗃 ' + t + ' 🗃',
  t => '🗂 ' + t + ' 🗂',
  t => '🖥 ' + t + ' 🖥',
  t => '📱 ' + t + ' 📱',
  t => '🕹 ' + t + ' 🕹',
  t => '⌨️ ' + t + ' ⌨️',
  t => '💡 ' + t + ' 💡',
  t => '🧬 ' + t + ' 🧬',
  t => '📡 ' + t + ' 📡',
  t => '⚙ ' + t + ' ⚙',
  t => '⛓ ' + t + ' ⛓',
  t => '🔩 ' + t + ' 🔩',
  t => '🔧 ' + t + ' 🔧',
  t => '🧲 ' + t + ' 🧲',
  t => '🔗 ' + t + ' 🔗',
];

const input = document.getElementById("input");
const results = document.getElementById("results");

input.addEventListener("input", () => {
  const value = input.value.trim();
  results.innerHTML = "";
  if (!value) return;

  styles.forEach(fn => {
    const styled = fn(value);
    const container = document.createElement("div");
    container.className = "output";

    const textDiv = document.createElement("div");
    textDiv.className = "decorated";
    textDiv.textContent = styled;

    const button = document.createElement("button");
    button.textContent = "Copiar";
    button.onclick = () => {
      navigator.clipboard.writeText(styled).then(() => {
        button.textContent = "✔ Copiado";
        button.style.backgroundColor = "#2ecc71";
        setTimeout(() => {
          button.textContent = "Copiar";
          button.style.backgroundColor = "#3498db";
        }, 1500);
      });
    };

    container.appendChild(textDiv);
    container.appendChild(button);
    results.appendChild(container);
  });
});



