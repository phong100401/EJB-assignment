document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.getElementById("btn-login");
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
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("username",data.username)
                localStorage.setItem("phone", data.phone)
                localStorage.setItem("email", data.email)
                localStorage.setItem("balance", data.balance)
                localStorage.setItem("accountNumber", data.accountNumber)
                localStorage.setItem("id", data.id)
                window.location.replace("http://localhost:63342/front/user-profile.html?_ijt=45iilh3dmr5pis28mcn219jpbm&_ij_reload")
            }
        }
        xmlHttpRequest.open('post', 'http://localhost:8088/api/v1/accounts/login', true);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(dataToSend));
    }

})
