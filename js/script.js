// selector-----------------------------------------------------
const today = document.querySelector('#today');
const future = document.querySelector('#futureWeek');
const past = document.querySelector('#pastWeek');
const noToday = document.querySelector('#noToday');
const noFuture = document.querySelector('#noFuture');
const todayBtn = document.querySelector('#__today');
const futureBtn = document.querySelector('#__future');
const pastBtn = document.querySelector('#__past');
const goTop = document.querySelector('#goTop');
const wrapToday = document.querySelector('#wrapToday');
const wrapFuture = document.querySelector('#wrapFuture');
const wrapPast = document.querySelector('#wrapPast');

// data di oggi ----------------------------------------------------------------------------------
let d = new Date();
// lista provvissoria appuntamenti ---------------------------------------------------------------
let appoint = [
    new Date('11 29 2021'),
    new Date('11 30 2021'),
    new Date('12 01 2021'),
    new Date('12 02 2021'),
    new Date('12 03 2021'),
    new Date('12 04 2021'),
    new Date('12 05 2021')
];

// chiamata fetch ------------------------------------------------------------------
const getDate = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    dateList = data;

    return renderDate(data);
};
let dateList = [];

// aggiunta chiavi a oggetti della chiamata API ---------------------------------------------------
const renderDate = (dateCard) => {

    dateCard.map((date) => {
        createCard(
            date.title,
            date.priority = Math.floor(Math.random() * 4) + 1,
            date.day = appoint[Math.floor(Math.random() * 6)],
        )
    })
}

// render card appuntamento -----------------------------------------------------------------------------
const createCard = (dateTitle, datePriority, dateDay) => {
    const card = document.createElement('div');
    card.className = 'card';

    // cambio colore in base alle priorità -------------------------------------------------------------------
    switch (datePriority) {
        case 1:
            card.style.backgroundColor = '#cb604e';
            break;

        case 2:
            card.style.backgroundColor = '#e89a6a';
            break;

        case 3:
            card.style.backgroundColor = '#6dab87';
            break;

        case 4:
            card.style.backgroundColor = '#edd094';
            break;

    }

    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = dateTitle;
    card.append(title);

    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = `${dateDay.getDate()}/${dateDay.getMonth() + 1}/${dateDay.getFullYear()}`;
    card.append(date);

    // inserire le card appuntamenti in base alle priorità ---------------------------------------------------------------------------
    if (dateDay.getDate() === d.getDate() && dateDay.getMonth() === d.getMonth() && dateDay.getFullYear() === d.getFullYear()) {
        today.append(card);
        noToday.style.display = 'none';
    } else if (dateDay > d) {
        future.append(card);
        noFuture.style.display = 'none';
    } else if (dateDay < d) {
        past.append(card);
    }

}


document.addEventListener('DOMContentLoaded', () => {
    location.hash = '#home'
    getDate();
})

// mostra solo area in visita -----------------------------------------------------------------------
window.addEventListener('hashchange', () => {

    switch (location.hash) {
        case '#today':
            wrapToday.style.display = 'block';
            wrapFuture.style.display = 'none';
            wrapPast.style.display = 'none';
            break;
        case '#futureWeek':
            wrapFuture.style.display = 'block';
            wrapToday.style.display = 'none';
            wrapPast.style.display = 'none';
            break;
        case '#pastWeek':
            wrapPast.style.display = 'block';
            wrapFuture.style.display = 'none';
            wrapToday.style.display = 'none';
            break;
    }
})
// selezione area da visitare -------------------------------------------------------------------------
todayBtn.addEventListener('click', () => {
    location.href = '#today';
})

futureBtn.addEventListener('click', () => {
    location.href = '#futureWeek';
})

pastBtn.addEventListener('click', () => {
    location.href = '#pastWeek';
})

goTop.addEventListener('click', () => {
    location.href = '#top'
})
