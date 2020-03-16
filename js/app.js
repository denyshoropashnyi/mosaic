'use strict';

const USER_ROW_TEMPLATE = document.getElementById('template').innerHTML;
const URL = 'json/json.txt';
const userTableBody = document.getElementsByClassName('table__body')[0];
const userTableRow = userTableBody.getElementsByTagName('tr');
const userTableFooter = document.getElementsByClassName('table__footer')[0];
const selectDay = document.getElementById('select--day');
const selectMonth = document.getElementById('select--month');
const dateOfBirth = document.getElementsByClassName('template__dob');

init();

function init() {
    fetchUsers();
}

function fetchUsers() {
    return fetch(URL)
        .then(resp => resp.json())
        .then(renderUsers)
        .then(addEvents);
}

function renderUsers(data) {
    userTableBody.innerHTML = data
        .map(user => {
            return USER_ROW_TEMPLATE
                .replace('{{firstname}}', user.firstname)
                .replace('{{lastname}}', user.lastname)
                .replace('{{email}}', user.email)
                .replace('{{phonenumber}}', user.phonenumber)
                .replace('{{dob}}', user.birthday_contact)
                .replace('{{company}}', user.company);
        })
        .join('\n');
}

function addEvents() {
    selectMonth.addEventListener('change', filterData);
    selectDay.addEventListener('change', filterData);
}

function filterData() {
    for (let i = 0; i < userTableRow.length; i++) {
        if (
            dateOfBirth[i].innerText.split('-')[2] == selectDay.value &&
            dateOfBirth[i].innerText.split('-')[1] == selectMonth.value
        ) {
            userTableRow[i].style.display = '';
            userTableRow[i].classList.add('shown');
        } else {
            userTableRow[i].style.display = 'none';
            userTableRow[i].classList.remove('shown');
        }
    }
    toggleWarningState();
}

function toggleWarningState() {
    let userArr = Array.from(userTableRow);
    const elemFound = userArr.find(e => e.classList.contains('shown'));
    elemFound ? userTableFooter.classList.add('hidden') : userTableFooter.classList.remove('hidden'), selectDay.focus();
}