document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault();

    const text1Element = document.querySelector(".text-1");
    const text2Element = document.querySelector(".text-2");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");

    let timer1, timer2;


    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;

    if (email === "" || password === "") {
        text1Element.textContent = "Error";
        text2Element.textContent = "Input email and password";

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

                const txt1 = document.querySelector(".text-1");
                const txt2 = document.querySelector(".text-2");
                const toas = document.querySelector(".toast");
                const closeIcon = document.querySelector(".close");
                const prog = document.querySelector(".progress");

                let tm1, tm2;

                txt1.textContent = "Success";
                txt2.textContent = "You have been successfully authorized";

                toas.classList.add("active");
                prog.classList.add("active");

                tm1 = setTimeout(() => {
                    toas.classList.remove("active");
                }, 5000); //1s = 1000 milliseconds

                tm2 = setTimeout(() => {
                    prog.classList.remove("active");
                }, 5300);

            closeIcon.addEventListener("click", () => {
                toas.classList.remove("active");

                setTimeout(() => {
                    prog.classList.remove("active");
                }, 300);

                clearTimeout(tm1);
                clearTimeout(tm2);
            });

        },

        error: function(xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;

                text1Element.textContent = "Error";
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
