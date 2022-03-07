document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.getElementById("btn-submit");
    var username = document.forms['form-login']['username'];
    var password = document.forms['form-login']['password'];

    btnSubmit.onclick = function (){
        var userValue = username.value;
        var passwordValue = password.value;
        var dataToSend = {
            "username": userValue,
            "password": passwordValue
        }
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function (){
            if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
                var data = JSON.parse(xmlHttpRequest.responseText)
                console.log(data)
                localStorage.setItem("access_token", data.accessToken)
                localStorage.getItem("access_token")
                window.location.href = "../user-profile.html"
            }
        }
        xmlHttpRequest.open('post', 'http://localhost:8088/api/v1/accounts/login', true);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(dataToSend));
    }

})
