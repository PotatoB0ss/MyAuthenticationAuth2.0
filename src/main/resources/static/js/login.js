document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault(); // Предотвращение отправки формы по умолчанию

    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;

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
            console.log(response.message)
        },
        error: function(xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;
            console.log(errorMessage);
        }
    });
});
