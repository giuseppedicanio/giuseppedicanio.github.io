/* ===== CSS dinamico ===== */
const css = `
/* MENU */
nav a {
    margin-right: 25px;
    text-decoration: none;
    color: black;
}
nav a:hover {
    text-decoration: underline;
}

/* GRIGLIA IMMAGINI */
.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.image-grid img {
    width: calc(20% - 20px);
    cursor: pointer;
    height: auto;
    transition: transform 0.2s;
}
.image-grid img:hover {
    transform: scale(1.05);
}

/* LIGHTBOX */
#lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
#lightbox img {
    max-width: 90%;
    max-height: 90%;
    box-shadow: 0 0 20px black;
    border-radius: 8px;
}
`;

// Crea e inserisce il CSS nella pagina
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ===== JavaScript Lightbox ===== */
let lightbox = document.getElementById('lightbox');

// Se non esiste, crealo
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

lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
