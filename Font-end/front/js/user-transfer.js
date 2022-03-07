document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.getElementById("btn-submit1");
    var accountSender = document.forms['transfer-form']['account'];
    var accountReceiver = document.forms['transfer-form']['beneficiary'];
    var transferAmount = document.forms['transfer-form']['transfer'];

    btnSubmit.onclick = function (){
        var senderValue = accountSender.value;
        var receiverValue = accountReceiver.value;
        var transferValue = transferAmount.value;
        var datatoSend = {
            "account": senderValue,
            "beneficiary": receiverValue,
            "transfer": transferValue,
        }

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function (){
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 201) {
                var data = JSON.parse(xmlHttpRequest.responseText)
                alert(`<h1>Transfer Success: ${data}</h1>`)
            } else {
                alert(`<h1>Invalid Input!</h1>`)
            }
        }
        xmlHttpRequest.open('post','http://localhost:8088/api/v1/transactions/create', false);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(datatoSend));
    }
})