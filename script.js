let url = 'https://admin-panel-data-edyoda-sourav.herokuapp.com/admin/data';

let responseDataMap = new Map();

const xhttp = new XMLHttpRequest();

xhttp.onload = function() {
    if (this.status === 200){
        showDataOnTable(JSON.parse(this.responseText));
    }else{
        alert('something went wrong on the server');
    }
}

xhttp.open('GET', url, true);

xhttp.send();

const createNewRow = (data) => {
    let dataRow = document.createElement('tr');
    dataRow.className = 'data-row';
    let column1 = document.createElement('td');
    column1.className = 'column1';
    let column2 = document.createElement('td');
    column2.className = 'column2';
    let column3 = document.createElement('td');
    column3.className = 'column3';
    let column4 = document.createElement('td');
    column4.className = 'column4';
    let column5 = document.createElement('td');
    column5.className = 'column5';

    column1.innerText = data.id;
    column2.innerText = data.firstName;
    column3.innerText = data.lastName;
    column4.innerText = data.email;
    column5.innerText = data.phone;

    dataRow.appendChild(column1);
    dataRow.appendChild(column2);
    dataRow.appendChild(column3);
    dataRow.appendChild(column4);
    dataRow.appendChild(column5);

    return dataRow;
}

const showDetails = (data) => {
    document.querySelector('#info-content').innerHTML = `
    <div><b>User selected:</b> ${data.firstName} ${data.lastName}</div>
    <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>
            ${data.description}
        </textarea>
    </div>
    <div><b>Address:</b> ${data.address.streetAddress}</div>
    <div><b>City:</b> ${data.address.city}</div>
    <div><b>State:</b> ${data.address.state}</div>
    <div><b>Zip:</b> ${data.address.zip}</div>
    `;
    document.querySelector('#info-content').style.display = 'block';
}

const clickOnRowEvent = () => {
    let tableDataRows = document.querySelectorAll('.data-row');
    for(let index = 0; index < tableDataRows.length; ++index){
        tableDataRows[index].addEventListener('click', () => {
            let active = document.querySelectorAll('.active')[0];
            if(active){
                active.classList.toggle('active');
            }
            tableDataRows[index].classList.toggle('active');
            let id = Number(tableDataRows[index].childNodes[0].childNodes[0].data);
            showDetails(responseDataMap.get(id));
        });
    }
}

const showDataOnTable = (data) => {
    data.sort((a,b) => {return a.id - b.id});
    data.map( data => {responseDataMap.set(data.id,data)});
    let tBody = document.querySelector('#table-data').childNodes[1].childNodes[1];
    tBody.innerHTML = '';
    data.map( data => {tBody.appendChild(createNewRow(data))});
    clickOnRowEvent();

    document.querySelector('#search-box').addEventListener('input', (e) => {
        tBody.innerHTML = '';
        if(e.target.value === ''){
            data.map( data => {tBody.appendChild(createNewRow(data))});
            clickOnRowEvent();
        }else{
            document.querySelector('#info-content').style.display = 'none';
            data.map(data => {
                if(data.firstName.toLowerCase().includes(e.target.value.toLowerCase())){
                    tBody.appendChild(createNewRow(data));
                }
            });
            clickOnRowEvent();
        }
    });
}
