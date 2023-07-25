document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault();

    const text1Element = document.querySelector(".text-1");
    const text2Element = document.querySelector(".text-2");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");
    // JavaScript
    const passwordInput = document.getElementById("passwordLogin");

    const iconElement = document.getElementById('checkIcon');




    let timer1, timer2;


    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;

    if (email === "" || password === "") {


        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Заполните все поля";


        toast.classList.add("active");
        progress.classList.add("active");

        timer1 = setTimeout(() => {
            toast.classList.remove("active");
        }, 5000); //1s = 1000 milliseconds

        timer2 = setTimeout(() => {
            progress.classList.remove("active");
        }, 5300);

        closeIcon.addEventListener("click", () => {
            toast.classList.remove("active");

            setTimeout(() => {
                progress.classList.remove("active");
            }, 300);

            clearTimeout(timer1);
            clearTimeout(timer2);
        });
        return
    }

    var formData = {
        email: email,
        password: password
    };


    $.ajax({
        url: "/auth/login",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {

            iconElement.className = 'fas fa-solid fa-check check';

            text1Element.textContent = "Успешно";
            text2Element.textContent = "Вы успешно авторизовались";

            toast.classList.add("active");
            progress.classList.add("active");

            timer1 = setTimeout(() => {
                toast.classList.remove("active");
            }, 5000); //1s = 1000 milliseconds

            timer2 = setTimeout(() => {
                progress.classList.remove("active");
            }, 5300);

            closeIcon.addEventListener("click", () => {
                toast.classList.remove("active");

                setTimeout(() => {
                    progress.classList.remove("active");
                }, 300);

                clearTimeout(timer1);
                clearTimeout(timer2);
            });

        },

        error: function(xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;

                text1Element.textContent = "Ошибка";
                text2Element.textContent = "Неверный логин или пароль";

                passwordInput.value = "";

                toast.classList.add("active");
                progress.classList.add("active");

                timer1 = setTimeout(() => {
                    toast.classList.remove("active");
                }, 5000); //1s = 1000 milliseconds

                timer2 = setTimeout(() => {
                    progress.classList.remove("active");
                }, 5300);

            closeIcon.addEventListener("click", () => {
                toast.classList.remove("active");

                setTimeout(() => {
                    progress.classList.remove("active");
                }, 300);

                clearTimeout(timer1);
                clearTimeout(timer2);
            });
        }
    });
});
