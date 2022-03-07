document.addEventListener('DOMContentLoaded', function () {
    var tableBody = document.getElementById('my-table-data');
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            console.log(data);
            var newContent = '';
            for (let i = 0; i < data.length; i++) {
                newContent += `<tr>
            <td>${data[i].createdAt}</td>
            <td>${data[i].message}</td>
            <td>${data[i].transactionAmount}</td>
            <td>${data[i].balance}</td>
            <tr>`;
            }
            tableBody.innerHTML = newContent;
        }
    }

    xmlHttpRequest.open('get', 'http://localhost:8088/api/v1/transactions/get', false);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
    xmlHttpRequest.send();
})