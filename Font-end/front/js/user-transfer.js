document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.getElementById("btn-submit1");
    var buyerName = document.forms['transfer-form']['buyerAccount'];
    var message = document.forms['transfer-form']['message'];
    var transferAmount = document.forms['transfer-form']['amount'];

    btnSubmit.onclick = function (){
        var buyerValue = buyerName.value;
        var messageValue = message.value;
        var transferValue = transferAmount.value;
        var datatoSend = {
            "buyerAccount": buyerValue,
            "message": messageValue,
            "amount": transferValue,
        }

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function (){
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 201) {
                var data = JSON.parse(xmlHttpRequest.responseText)
                localStorage.getItem("access_token")
                alert("Chuyển tiền thành công")
                var balance = localStorage.getItem("balance") - transferValue;
                localStorage.setItem("balance",  balance);
                window.location.replace("http://localhost:63342/front/user-profile.html?_ijt=45iilh3dmr5pis28mcn219jpbm&_ij_reload")
            }
        }
        xmlHttpRequest.open('post','http://localhost:8088/api/v1/transactions/create', false);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.setRequestHeader('Accept', 'application/json')
        xmlHttpRequest.setRequestHeader('Authorization', localStorage.getItem("access_token"))
        xmlHttpRequest.send(JSON.stringify(datatoSend));
    }
})