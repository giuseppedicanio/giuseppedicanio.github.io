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
    margin-bottom: 40px;
}

footer {
    font-size: 14px;
}

/* ===== Griglia immagini ===== */
.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* contenitore immagine - QUADRATO */
.image-grid .img-wrap {
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
}

/* immagine - RITAGLIATA */
.image-grid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    transition: none;
}

/* frecce */
.lightbox-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 50px;
    color: white;
    cursor: pointer;
    user-select: none;
    opacity: 0;
    transition: opacity 0.2s;
}

#lightbox:hover .lightbox-arrow {
    opacity: 1;
}

.lightbox-prev { left: 40px; }
.lightbox-next { right: 40px; }
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);


/* ===== LIGHTBOX ===== */
let lightbox = document.getElementById('lightbox');

if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';

    const lbImg = document.createElement('img');
    lightbox.appendChild(lbImg);
    document.body.appendChild(lightbox);
}

const lightboxImg = lightbox.querySelector('img');


/* ===== GRIGLIA ===== */
const grid = document.getElementById("grid");

if (!grid) {
    throw new Error("Manca <div id='grid' class='image-grid'></div> nell'HTML");
}

/* immagini da GitHub Actions */
const imageFiles = window.IMAGES || [];

/* stato */
let images = [];
let currentIndex = 0;

/* crea griglia */
imageFiles.forEach((file, index) => {

    const wrapper = document.createElement("div");
    wrapper.className = "img-wrap";

    const img = document.createElement("img");
    img.src = "./images/" + file;

    wrapper.appendChild(img);
    grid.appendChild(wrapper);

    images.push(img);

    img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox();
    });
});


/* ===== LIGHTBOX LOGIC ===== */
function openLightbox() {
    lightbox.style.display = "flex";
    showImage(currentIndex);
}

function showImage(index) {

    if (images.length === 0) return;

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;

    lightboxImg.src = images[currentIndex].src;
}


/* chiudi cliccando fuori */
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


/* ===== FRECCE ===== */
const prev = document.createElement("div");
const next = document.createElement("div");

prev.className = "lightbox-arrow lightbox-prev";
next.className = "lightbox-arrow lightbox-next";

prev.innerHTML = "←";
next.innerHTML = "→";

lightbox.appendChild(prev);
lightbox.appendChild(next);

prev.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
};

next.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
};


/* ===== TASTIERA ===== */
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
});


/* ===== SWIPE MOBILE ===== */
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {

    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            showImage(currentIndex + 1);
        } else {
            showImage(currentIndex - 1);
        }
    }
});
