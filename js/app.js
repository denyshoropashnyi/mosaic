'use strict';

const USER_ROW_TEMPLATE = document.getElementById('template').innerHTML;
const URL = 'json/json.txt';

const userTableBody = document.getElementsByClassName('table__body')[0];
const userTableRow = document.getElementsByClassName('template-row');

init();

function init() {
    fetchUsers();
}

function fetchUsers() {
    return fetch(URL)
        .then((resp) => resp.json())
        .then(renderUsers)
        .then(filterData)
}

function renderUsers(data) {
    userTableBody.innerHTML = data.map((user) => {
        return USER_ROW_TEMPLATE
            .replace('{{firstname}}', user.firstname)
            .replace('{{lastname}}', user.lastname)
            .replace('{{email}}', user.email)
            .replace('{{phonenumber}}', user.phonenumber)
            .replace('{{dob}}', user.birthday_contact)
            .replace('{{company}}', user.company)
    }).join('\n');
}

const selectDay = document.getElementById("selectDay");
const selectMonth = document.getElementById("selectMonth");
const dateOfBirth = document.getElementsByClassName('template__dob');
const tr = userTableBody.getElementsByTagName('tr');
// 
selectMonth.addEventListener('change', filterData);
selectDay.addEventListener('change', filterData);

function filterData() {

    for (let i = 0; i < tr.length; i++) {
        if (dateOfBirth[i].innerText.split('-')[2] == selectDay.value && dateOfBirth[i].innerText.split('-')[1] == selectMonth.value) {
            tr[i].style.display = "";
        } else {
            console.log('99');
            tr[i].style.display = "none";
        }
    }
}