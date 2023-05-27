const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    { id: 1, text: 'flower', amount: -20},
    { id: 2, text: 'salary', amount: 300},
    { id: 3, text: 'book', amount: -10},
    { id: 4, text: 'cameras', amount: 150}
];
let transactions = dummyTransactions;
//add transaction to dom list
function addTransactionDom(transaction) {
    //get sign 
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}
     <button class="delete-btn">x</button>
    </span>`;
    list.appendChild(item);
}
//init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDom);
}
init();
