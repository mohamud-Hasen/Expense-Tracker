const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'flower', amount: -20},
//     { id: 2, text: 'salary', amount: 300},
//     { id: 3, text: 'book', amount: -10},
//     { id: 4, text: 'cameras', amount: 150}
// ];
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim === '' || amount.value.trim === '') {
        alert('please add text or amount');
}else {
    const transaction = {
        id: generteID(),
        text: text.value,
        amount: +amount.value

    }
   transactions.push(transaction);

   addTransactionDom(transaction);

   updateValues();

   updateLocalStorage();

   text.value = '';

   amount.value = '';
}
}
function generteID() {
    return Math.floor(Math.random() * 100000000);
} 
//add transaction to dom list
function addTransactionDom(transaction) {
    //get sign 
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}
     <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    </span>`;
    list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount );

    console.log(amounts);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
     .filter(item => item > 0)
     .reduce((acc, item) => (acc += item), 0)
     .toFixed(2);
     const expense = (amounts.filter(item => item < 0)
     .reduce((acc, item) => (acc += item), 0) * -1)
     .toFixed(2);
     balance.innerHTML = `${total}`
     money_plus.innerHTML = `${income}`;
     money_minus.innerHTML = `${expense}`;
}
// remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// updatge the localStorage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions)); 
}

//init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDom);
    updateValues();
}


init();

form.addEventListener('submit', addTransaction)
