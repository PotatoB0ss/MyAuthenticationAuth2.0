document.getElementById("registerButton").addEventListener("click", function(event) {
    event.preventDefault();

    const text1Element = document.querySelector(".text-1");
    const text2Element = document.querySelector(".text-2");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");
    const iconElement = document.getElementById('checkIcon');


    let timer1, timer2;

    var name = document.getElementById("nameRegister").value;
    var email = document.getElementById("emailRegister").value;
    var password1 = document.getElementById("password1Register").value;
    var password2 = document.getElementById("password2Register").value;

    if (name === "" || email === "" || password1 === "" || password2 === "") {

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

    if (name.length < 5 || password1.length < 5){

        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Слишком короткое имя или пароль";

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

    if (!email.includes("@")){

        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Некорректный адрес электронной почты";

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

    if (password1 !== password2) {
        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Пароли не совпадают";

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
        name: name,
        email: email,
        password: password2
    };

    $.ajax({
        url: "/auth/signup",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {

            iconElement.className = 'fas fa-solid fa-check check';

            text1Element.textContent = "Успешно";
            text2Element.textContent = "Проверьте почту чтобы завершить регистрацию!";

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

        },

        error: function(xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;



            text1Element.textContent = "Ошибка";
            text2Element.textContent = errorMessage;


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
