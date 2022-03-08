document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.length < 0){
        window.location.href = "../Login.html"
    }
    if (localStorage.length > 0){
        var name = document.getElementById("username");
        var balance = document.getElementById("balance");
        var email = document.getElementById("email");
        var phone = document.getElementById("phone");
        var accountNumber = document.getElementById("accountNumber")

        var nameValue = localStorage.getItem("username");
        var emailValue = localStorage.getItem("email");
        var balanceValue = localStorage.getItem("balance");
        var accountNumberValue = localStorage.getItem("accountNumber");
        var phoneValue = localStorage.getItem("phone");

        name.innerHTML = nameValue
        balance.innerHTML = balanceValue
        email.innerHTML = emailValue
        phone.innerHTML = phoneValue
        accountNumber.innerHTML = accountNumberValue
    }
})