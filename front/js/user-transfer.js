document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.getElementById("btn-submit1");
    var buyerName = document.forms['transfer-form']['name'];
    var message = document.forms['transfer-form']['message'];
    var transferAmount = document.forms['transfer-form']['transfer'];

    btnSubmit.onclick = function (){
        var buyerValue = buyerName.value;
        var messageValue = message.value;
        var transferValue = transferAmount.value;
        var datatoSend = {
            "name": buyerValue,
            "message": messageValue,
            "transfer": transferValue,
        }

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function (){
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 201) {
                var data = JSON.parse(xmlHttpRequest.responseText)
                alert(`<h1>Transfer Success: ${data}</h1>`)
            } else {
                alert(`<h1>INVALID INPUT</h1>`)
            }
        }
        xmlHttpRequest.open('post','http://localhost:8088/api/v1/transactions/create', false);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
        xmlHttpRequest.send(JSON.stringify(datatoSend));
    }
})