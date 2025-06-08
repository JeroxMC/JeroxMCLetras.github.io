const input = document.getElementById('input');
const container = document.getElementById('resultados');

const fuentes = [
  {
    nombre: "𝓛𝓮𝓽𝓻𝓪 cursiva",
    convertir: (texto) => texto.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 97 && code <= 122) ? String.fromCharCode(0x1D4B6 + code - 97) :
             (code >= 65 && code <= 90) ? String.fromCharCode(0x1D4AE + code - 65) : c;
    }).join('')
  },
  {
    nombre: "𝔏𝔢𝔱𝔯𝔞 gótica",
    convertir: (texto) => texto.split('').map(c => {
      const gothic = {
        A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊',
        H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑',
        O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘',
        V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ',
        a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤',
        h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫',
        o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲',
        v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷'
      };
      return gothic[c] || c;
    }).join('')
  }
];

input.addEventListener('input', () => {
  const texto = input.value;
  container.innerHTML = '';
  fuentes.forEach(fuente => {
    const resultado = fuente.convertir(texto);
    const div = document.createElement('div');
    div.className = 'result';
    div.textContent = resultado;
    div.title = 'Haz clic para copiar';
    div.onclick = () => {
      navigator.clipboard.writeText(resultado);
      div.textContent = '¡Copiado! ' + resultado;
      setTimeout(() => div.textContent = resultado, 1000);
    };
    container.appendChild(div);
  });
});
