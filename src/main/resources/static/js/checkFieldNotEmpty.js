document.getElementById('continueButton').addEventListener('click', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var forText = document.getElementById('textik');
    if (email.trim() === '') {
        alert('Email field cannot be empty');
        return;
    }

    var captchaResponse = grecaptcha.getResponse(); // Получаем ответ капчи

    // Проверяем, что капча была успешно заполнена
    if (captchaResponse === "") {
        alert('Please complete the captcha');
        return;
    }

    var url = '/auth/reset';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url + '?email=' + encodeURIComponent(email) + '&recaptchaResponse=' + encodeURIComponent(captchaResponse), true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            forText.textContent = xhr.responseText;
            if(xhr.responseText === "A link to change your password has been sent to your email!"){
                $('#textik').css('background-color', 'rgba(0, 255, 0, 0.1)');
            } else {
                $('#textik').css('background-color', 'rgba(255, 0, 0, 0.1)');
            }

            grecaptcha.reset();

        }
    };

    xhr.send();
});
