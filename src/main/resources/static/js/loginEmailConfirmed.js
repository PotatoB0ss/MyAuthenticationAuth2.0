function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Пример использования:
const tokenValue = getUrlParam("em");
if (tokenValue) {
    const text1Element = document.querySelector(".text-1");
    const text2Element = document.querySelector(".text-2");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");
    const iconElement = document.getElementById('checkIcon');
    iconElement.className = 'fas fa-solid fa-check check';


    let timer1, timer2;


    text1Element.textContent = "Успешно";
    text2Element.textContent = "Вы успешно подтвердили свою почту, теперь войдите в ваш аккаунт";

    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 15000); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 15300);

    closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");

        setTimeout(() => {
            progress.classList.remove("active");
        }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
    });

}
