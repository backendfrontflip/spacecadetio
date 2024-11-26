const NavigationLinks = document.querySelectorAll(".nav-links li");
const MenuButton = document.querySelector(".mobile-menu-btn");
const MobileMenu= document.querySelector(".mobile-menu");
const Overflow = document.querySelector(".overflow");
const MobileLinks = document.querySelectorAll(".mobile-links li");

MenuButton.addEventListener("click", () => {
    const icon = document.querySelector(".mobile-menu-btn img");
    MenuButton.classList.toggle("active-btn");
    MobileMenu.classList.toggle("active-menu");
    Overflow.classList.toggle("active-menu");
    if (MenuButton.classList.contains("active-btn")) {
        icon.src = "./images/icon-menu.svg";
    }
});

NavigationLinks.forEach((link) => {
    const subMenu = link.querySelector(".menu");
    link.addEventListener("click", () => {
        link.classList.toggle("active");
        subMenu.classList.toggle("active-menu")
    })
})

MobileLinks.forEach((link) => {
    const subMenu = link.querySelector(".mobile-sub");
    link.addEventListener("click", () => {
        link.classList.toggle("active");
        subMenu.classList.toggle("active-menu")
    })
})