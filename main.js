/* ===== CSS dinamico ===== */
const css = `
body {
    margin: 50px;
    font-family: Arial, Helvetica, sans-serif;
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

p {
    max-width: 600px;
}

footer {
    margin-top: 100px;
    font-size: 14px;
}

/* ===== Griglia immagini ===== */
.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

/* contenitore immagine */
.image-grid .img-wrap {
    width: auto;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* immagine */
.image-grid img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;   /* <-- mantiene proporzioni */
    cursor: pointer;
    border: none;
    outline: none;
}

/* ===== Lightbox ===== */
#lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

#lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border: none;
    outline: none;
}
`;

// inserisce CSS
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

/* ===== WRAP automatico immagini ===== */
document.querySelectorAll('.image-grid img').forEach(img => {
    const wrapper = document.createElement('div');
    wrapper.className = 'img-wrap';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
});

/* ===== Lightbox ===== */
let lightbox = document.getElementById('lightbox');

if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    const lbImg = document.createElement('img');
    lightbox.appendChild(lbImg);
    document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.image-grid img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.style.display = 'flex';
    });
});

// chiudi cliccando fuori
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
