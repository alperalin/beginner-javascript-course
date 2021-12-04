const textarea = document.querySelector('textarea');
const showText = document.querySelector('.showText');
const radioButtons = Array.from(
  document.querySelectorAll('input[name=textGeneratorRadio]')
);

/* eslint-disable */
const funkyLetters = {
    '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
  };
/* eslint-enable */

// Filter functions. Collected inside an object
const filters = {
  sarcastic(letter, index) {
    if (index % 2) return letter.toUpperCase();
    return letter;
  },
  funky(letter) {
    if (funkyLetters[letter]) return funkyLetters[letter];
    if (funkyLetters[letter.toUpperCase()])
      return funkyLetters[letter.toUpperCase()];
    return letter;
  },
  unable(letter) {
    const rn = Math.floor(Math.random() * 3);
    if (letter === ' ' && rn === 2) return '...';
    return letter;
  },
};

// Text handle function
const handleTextTransform = (text) => {
  const selectedRadio = radioButtons.find((radio) => radio.checked);
  const transformedText = Array.from(text)
    .map(filters[selectedRadio.id])
    .join('');
  showText.textContent = transformedText;
};

// Textarea events
textarea.addEventListener('input', (e) => handleTextTransform(e.target.value));

// Button events
radioButtons.forEach((button) =>
  button.addEventListener('input', () => handleTextTransform(textarea.value))
);
