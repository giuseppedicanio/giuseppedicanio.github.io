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
    gap: 10px;
}

/* contenitore immagine */
.image-grid .img-wrap {
    width: auto;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* immagine */
.image-grid img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
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


/* ===== AGGIUNTA: navigazione immagini ===== */

const images = Array.from(document.querySelectorAll('.image-grid img'));
let currentIndex = 0;

// aggiorna indice quando apri immagine
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
    });
});

// funzione cambio immagine
function showImage(index) {

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
}


/* ===== frecce ===== */

const prev = document.createElement("div");
const next = document.createElement("div");

prev.innerHTML = "←";
next.innerHTML = "→";

prev.style.position = "fixed";
prev.style.left = "30px";
prev.style.top = "50%";
prev.style.transform = "translateY(-50%)";
prev.style.fontSize = "40px";
prev.style.color = "white";
prev.style.cursor = "pointer";
prev.style.userSelect = "none";

next.style.position = "fixed";
next.style.right = "30px";
next.style.top = "50%";
next.style.transform = "translateY(-50%)";
next.style.fontSize = "40px";
next.style.color = "white";
next.style.cursor = "pointer";
next.style.userSelect = "none";

document.body.appendChild(prev);
document.body.appendChild(next);

prev.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
};

next.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
};


/* ===== tastiera ===== */

document.addEventListener("keydown", (e) => {

    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);

});
