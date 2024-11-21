//define your variables
const unreadMessages = document.querySelectorAll(".unread");
const unread = document.getElementById("notifs");
const markAll = document.getElementById("mark-all");

unread.innerHTML = unreadMessages.length;

//unread messages event
unreadMessages.forEach((msg) => {
    msg.addEventListener("click", () => {
        msg.classList.remove("unread");
        const newunreadMessages = document.querySelectorAll(".unread");
        unread.innerHTML = newunreadMessages.length;
    })
})

//mark all event
markAll.addEventListener("click", () => {
    unreadMessages.forEach((msg) => {
        msg.classList.remove("unread");
    })

    const newunreadMessages = document.querySelectorAll(".unread");
    unread.innerText = newunreadMessages.length;
})