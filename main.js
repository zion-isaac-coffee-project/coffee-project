"use strict"


let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];


let coffeeDisplay = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit1');
let roastSelection = document.querySelector('#roast-selection');
let roastSearch = document.querySelector('#roast-search');


function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

if (coffees.length < 15) {
    updateCoffees();
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let storedCoffees = JSON.parse(localStorage.getItem('coffees')) || coffees;
    storedCoffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } if (selectedRoast === 'all') {
            filteredCoffees.push(coffee);
        }
    });
    coffeeDisplay.innerHTML = renderCoffees(filteredCoffees);

}
// listener for change in select box

roastSelection.addEventListener("change", e => {
    updateCoffees(e);
});


// search bar
function searchCoffee() {
    let selectedRoast = roastSearch.value.toLowerCase();
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.name.toLowerCase().includes(selectedRoast)) {
            filteredCoffees.push(coffee);
            console.log(filteredCoffees);
        }
    });
    coffeeDisplay.innerHTML = renderCoffees(filteredCoffees);
}
roastSearch.addEventListener('keyup', searchCoffee);

let nameAdd = document.querySelector('#name-add');
let coffeeAdd = document.querySelector('#coffee-add');

function addCoffee() {
    let name = nameAdd.value;
    let roast = coffeeAdd.value;
    let id = coffees.length + 1;
    let coffeeObj = {'id': id, 'name':name, 'roast': roast};
    coffees.push(coffeeObj);
    localStorage.setItem('coffees', JSON.stringify(coffees));
}

submitButton.addEventListener('click', function(e){
    e.preventDefault();
    addCoffee();
    updateCoffees();
});


let clearButton = document.querySelector('#submit2');
clearButton.addEventListener('click', function (e){
    e.preventDefault();
    localStorage.clear();
    updateCoffees();
})










