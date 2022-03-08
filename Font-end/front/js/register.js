document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.getElementById("btn-register")
    var userName = document.forms['form-register']['username']
    var password = document.forms['form-register']['password']
    var email = document.forms['form-register']['email']
    var phone = document.forms['form-register']['phone']
    var accountNumber = document.forms['form-register']['accountNumber']

    btnSubmit.onclick = function (){
        var userNameValue = userName.value;
        var passwordValue = password.value;
        var emailValue = email.value;
        var phoneValue = phone.value;
        var accountNumberValue = accountNumber.value;
        var dataToSend = {
            "username": userNameValue,
            "password": passwordValue,
            "email": emailValue,
            "phone": phoneValue,
            "accountNumber": accountNumberValue,
        }

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function (){
            if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
                var data = JSON.parse(xmlHttpRequest.responseText)
                alert("Register success")
                window.location.replace("http://localhost:63343/front/Login.html?_ijt=pat8toj2bra47uhmlcke00n01l&_ij_reload")
            }
        }
        xmlHttpRequest.open('post', 'http://localhost:8088/api/v1/accounts/register', false)
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(dataToSend));
    }
})