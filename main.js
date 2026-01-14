/* ===== CSS dinamico corretto ===== */
const css = `
body {
    margin: 50px;
    font-family: Arial, Helvetica, sans-serif;
    background: white;  /* sfondo bianco */
    color: black;       /* testo nero */
}

nav a {
    margin-right: 25px; /* distanza tra i link del menu */
    text-decoration: none; /* rimuove sottolineatura */
    color: black;       /* colore link */
}

nav a:hover {
    text-decoration: underline; /* sottolinea link quando ci passi sopra */
}

p {
    max-width: 600px;
}

footer {
    margin-top: 100px;
    font-size: 14px;
}

/* Griglia immagini */
.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.image-grid img {
    width: 180px; /* dimensione fissa e realistica */
    height: auto;
    cursor: pointer;
    /* NIENTE hover scale */
}

/* Lightbox minimal */
#lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

#lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 0;  /* niente smussatura */
    box-shadow: none;  /* niente ombra */
}
`;

// Inserisce il CSS nella pagina
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ===== JS Lightbox ===== */
let lightbox = document.getElementById('lightbox');
if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    const img = document.createElement('img');
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');
const images = document.querySelectorAll('.image-grid img');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    });
});

// Chiudi lightbox cliccando fuori dall'immagine
lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
