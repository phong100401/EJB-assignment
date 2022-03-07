document.addEventListener('DOMContentLoaded', function (){
    var btnSubmit = document.getElementById("btn-submit2");
    var loanAmount = document.forms['loan-form']['loan'];
    var rate = document.forms['loan-form']['rate'];
    var tenure = document.forms['loan-form']['tenure'];

    btnSubmit.onclick = function (){
        var loanValue = loanAmount.value;
        var rateValue = rate.value;
        var tenureValue = tenure.value;
        var dataToSend = {
            "loan": loanValue,
            "rate": rateValue,
            "tenure": tenureValue,
        }

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function (){
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 201) {
                var data = JSON.parse(xmlHttpRequest.responseText)
                alert(`<h1>Loan Amount: ${data}</h1>`)
            } else {
                alert(`<h1>INVALID INPUT</h1>`)
            }
        }
        xmlHttpRequest.open('post','http://localhost:8088/api/v1/loans/create', false);
        xmlHttpRequest.setRequestHeader('Content-Type','application/json');
        xmlHttpRequest.send(JSON.stringify(dataToSend));
    }
})