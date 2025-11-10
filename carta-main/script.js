/* script.js */
const cartinha = document.getElementById('cartinha');
const poema = document.getElementById('poema');
const audio = document.getElementById('audio');
const hint = document.getElementById('hint');


let activated = false;


async function abrirCartinha() {
if (activated) return;
activated = true;


try {
await audio.play();
audio.volume = 0.9;
} catch (err) {
console.warn('Erro ao tocar áudio:', err);
}


// anima: envelope desaparece e carta aparece por cima
cartinha.classList.add('hidden');
setTimeout(() => {
poema.classList.add('visible');
poema.setAttribute('aria-hidden', 'false');
hint.textContent = 'Tocando...';
setTimeout(() => { hint.style.opacity = '0'; }, 1200);
}, 300);
}


cartinha.addEventListener('click', abrirCartinha);


// acessibilidade: permite abrir com Enter/Space
cartinha.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
abrirCartinha();
}
});


// clicar na carta pausa/retoma
poema.addEventListener('click', () => {
if (audio.paused) {
audio.play();
hint.textContent = 'Tocando...';
hint.style.opacity = '1';
} else {
audio.pause();
hint.textContent = 'Pausado (clique na carta para retomar)';
hint.style.opacity = '1';
}
});