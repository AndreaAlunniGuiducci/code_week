// selector-----------------------------------------------------
const today = document.querySelector('#today');
const future = document.querySelector('#futureWeek');
const past = document.querySelector('#pastWeek');
const noToday = document.querySelector('#noToday');
const noFuture = document.querySelector('#noFuture');

let d = new Date();

let appoint = [
    new Date('11 29 2021'),
    new Date('11 30 2021'),
    new Date('12 01 2021'),
    new Date('12 03 2021'),
    new Date('12 03 2021'),
    new Date('12 04 2021'),
    new Date('12 05 2021')
];

const renderDate = (dateCard) => {
    dateCard.map((date) => {
        createCard(
            date.title,
            date.priority = Math.floor(Math.random() * 4) + 1,
            date.day = appoint[Math.floor(Math.random() * 6)],
        )
    });
}


// chiamata fetch ------------------------------------------------------------------
const getDate = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    dateList = data;

    return renderDate(data);
};
let dateList = [];

// render card appuntamento -----------------------------------------------------------------------------
const createCard = (dateTitle, datePriority, dateDay) => {
    const card = document.createElement('div');
    card.className = 'card';

    // cambio colore in base alle priorità -------------------------------------------------------------------
    switch (datePriority) {
        case 1:
            card.style.backgroundColor = 'red';
            break;

        case 2:
            card.style.backgroundColor = 'yellow';
            break;

        case 3:
            card.style.backgroundColor = 'green';
            break;

        case 4:
            card.style.backgroundColor = 'white';
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

    if (dateDay.getDate() === d.getDate() && dateDay.getMonth() === d.getMonth() && dateDay.getFullYear() === d.getFullYear()) {
        today.append(card);
        noToday.style.display = 'none';
    } else if (dateDay > d) {
        future.append(card);
        noFuture.style.display = 'none';
    } else if (dateDay < d) {
        past.style.display = 'flex';
        past.append(card);
    }

}

getDate();