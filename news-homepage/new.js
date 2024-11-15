const menuButton = document.querySelector('.menu');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-btn');

menuButton.addEventListener("click", (e) => {
    document.body.classList.add("lock");
    backdrop.style.display = "block";
    backdrop.classList.add("show");
});

closeButton.addEventListener("click", (e) => {
    document.body.classList.remove("lock");
    backdrop.style.display = "none";
    backdrop.classList.remove("show");
});

