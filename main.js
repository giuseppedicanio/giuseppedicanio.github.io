/* ===== CSS dinamico corretto ===== */
const css = `
body {
    margin: 50px;
    font-family: "Arial", "Helvetica", sans-serif;
    background: white;
    color: black;
}

nav a {
    margin-right: 25px;
    text-decoration: none;
    color: black;
}

nav a:hover {
    text-decoration: underline;
}

h1 {
    margin-bottom: 30px;
}

/* Griglia immagini */
.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.image-grid img {
    width: 180px; /* dimensione più realistica */
    height: auto;
    cursor: pointer;
    transition: transform 0.2s;
}

.image-grid img:hover {
    transform: scale(1.05);
}

/* Lightbox overlay */
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

// Inserisce il CSS nella pagina
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ===== JS Lightbox dinamico ===== */
let lightbox = document.getElementById('lightbox');

// Se non esiste, crea il div lightbox
if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    const img = document.createElement('img');
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');
const images = document.querySelectorAll('.image-grid img');

// Mostra immagine al clic
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
