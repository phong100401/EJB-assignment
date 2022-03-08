document.addEventListener('DOMContentLoaded', function (){
    var btnSubmit = document.getElementById("btn-submit2");
    var loanAmount = document.forms['loan-form']['amount'];
    var rate = document.forms['loan-form']['rate'];
    var tenure = document.forms['loan-form']['tenure'];

    btnSubmit.onclick = function (){
        var loanValue = loanAmount.value;
        var rateValue = rate.value;
        var tenureValue = tenure.value;
        var dataToSend = {
            "amount": loanValue,
            "rate": rateValue,
            "tenure": tenureValue,
        }
        var xmlHttpRequest = new XMLHttpRequest();
        console.log(localStorage.getItem("access_token"))
        xmlHttpRequest.onreadystatechange = function (){
            if (xmlHttpRequest.readyState == 4 ) {
                var data = JSON.parse(xmlHttpRequest.responseText)
                localStorage.getItem("access_token")
                alert("Vay thành công vui lòng chờ 3 ngày để được chấp nhận khoản vay")
                window.location.replace("http://localhost:63342/front/user-profile.html?_ijt=45iilh3dmr5pis28mcn219jpbm&_ij_reload")
            }
        }
        xmlHttpRequest.open('post','http://localhost:8088/api/v1/loans/create', false);
        xmlHttpRequest.setRequestHeader('Content-Type','application/json');
        xmlHttpRequest.setRequestHeader('Accept', 'application/json')
        xmlHttpRequest.setRequestHeader('Authorization', localStorage.getItem("access_token"))
        xmlHttpRequest.send(JSON.stringify(dataToSend));
    }
})