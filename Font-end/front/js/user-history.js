document.addEventListener('DOMContentLoaded', function () {
    var tableBody = document.getElementById('my-table-data');
    var xmlHttpRequest = new XMLHttpRequest();
    localStorage.getItem("access_token")
    console.log(localStorage.getItem("access_token"))
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 201){
            var data = JSON.parse(xmlHttpRequest.responseText);
            console.log(data);
            localStorage.getItem("access_token")
            console.log(localStorage.getItem("access_token"))
            var newContent = '';
            for (let i = 0; i < data.length; i++) {
                newContent += `<tr>
            <td>${data[i].createdAt}</td>
            <td>${data[i].message}</td>
            <td>${data[i].amount}</td>
            <td>${data[i].receiverId}</td>
            <tr>`;
            }
            tableBody.innerHTML = newContent;
        }
    }

    xmlHttpRequest.open('get', 'http://localhost:8088/api/v1/transactions/get', false);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
    xmlHttpRequest.setRequestHeader('Accept', 'application/json')
    xmlHttpRequest.setRequestHeader('Authorization', localStorage.getItem("access_token"))
    xmlHttpRequest.send();
})