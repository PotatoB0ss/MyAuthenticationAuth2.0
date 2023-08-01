document.getElementById("changePasswordButton").addEventListener("click", function(event) {
    event.preventDefault();

    const text1Element = document.querySelector(".text-1");
    const text2Element = document.querySelector(".text-2");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");
    const iconElement = document.getElementById('checkIcon');

    let timer1, timer2;


    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    function isPasswordValid(password) {
        // Регулярное выражение для проверки отсутствия специальных символов
        var specialChars = /[$&+,:;=?@#|'<>.^*()%!-]/;

        // Проверяем, что в пароле нет специальных символов
        return !specialChars.test(password);
    }

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {


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

    if (confirmPassword.length < 5 || confirmPassword.length > 32) {

        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Новерная длинна пароля";

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

    if (!isPasswordValid(newPassword)) {

        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Пароль содержит недопустимые символы";

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



    if (newPassword !== confirmPassword) {

        text1Element.textContent = "Ошибка";
        text2Element.textContent = "Новый пароль введён неверно в подтверждении";

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
        oldPassword: oldPassword,
        newPassword: newPassword
    };


    $.ajax({
        url: "/user/password-change",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {

            const input1 = document.getElementById("oldPassword");
            const input2 = document.getElementById("newPassword");
            const input3 = document.getElementById("confirmPassword");

            input1.value = "";
            input2.value = "";
            input3.value = "";

            iconElement.className = 'fas fa-solid fa-check check';

            text1Element.textContent = "Успешно";
            text2Element.textContent = "Ваш пароль был успешно изменён";

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
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        },

        error: function(xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;

            if(errorMessage === "Bad credentials"){
                text1Element.textContent = "Ошибка";
                text2Element.textContent = "Неверный старый пароль";
            } else {
                text1Element.textContent = "Ошибка";
                text2Element.textContent = errorMessage;
            }

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
