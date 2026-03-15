/* ===== CSS ===== */
const css = `
body {
    margin: 50px;
    font-family: Arial, Helvetica, sans-serif;
    background: white;
    color: black;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.image-grid img {
    height: 120px;
    width: auto;
    cursor: pointer;
    display: block;
}

/* lightbox */
#lightbox {
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.9);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:1000;
}

#lightbox img{
    max-width:90%;
    max-height:90%;
}
`;

const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

/* ===== LIGHTBOX ===== */

const images = document.querySelectorAll(".image-grid img");

let current = 0;

let lightbox = document.createElement("div");
lightbox.id = "lightbox";

let lightboxImg = document.createElement("img");

lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

/* apri immagine */
images.forEach((img,i)=>{
    img.addEventListener("click", ()=>{
        current = i;
        showImage();
        lightbox.style.display = "flex";
    });
});

/* mostra immagine corrente */
function showImage(){
    lightboxImg.src = images[current].src;
}

/* frecce tastiera */
document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display !== "flex") return;

    if(e.key === "ArrowRight"){
        current = (current + 1) % images.length;
        showImage();
    }

    if(e.key === "ArrowLeft"){
        current = (current - 1 + images.length) % images.length;
        showImage();
    }

    if(e.key === "Escape"){
        lightbox.style.display = "none";
    }

});

/* chiudi cliccando fuori */
lightbox.addEventListener("click",(e)=>{
    if(e.target !== lightboxImg){
        lightbox.style.display="none";
    }
});
