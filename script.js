const URL = 'https://newsapi.org/v2/everything?query=';
const API_KEY = '38644f50d73844c38f0dd8a807225d44';

window.addEventListener('load', () => {
    fetchNews('India');
})

const form = document.querySelector('.myform');
form.addEventListener('submit' , () => {
    let query = form.search.value;
    fetchNews(query);
})

const fetchLatestDate = () => {
    const dateInMs = new Date().getTime();
    let yesterdayInMs = dateInMs - 86400000;

    let year = new Date(yesterdayInMs).getFullYear();
    let month = new Date(yesterdayInMs).getMonth() + 1;
    let day = new Date(yesterdayInMs).getDate();

    if((month / 10) < 1){
        month = '0' + month;
    }

    return `${year}-${month}-${day}`;
}

async function fetchNews(query) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${fetchLatestDate()}&sortBy=publishedAt&language=en&apiKey=38644f50d73844c38f0dd8a807225d44`);
    let data = await response.json();

    document.querySelector('.category').innerText = query;

    fillNewsCards(data);
}

function fillNewsCards(data) {
    let cardsContainer = document.getElementById('news-cards-container');
    let cardTemplate = document.querySelector('.news-card-template');
    let articles = data.articles;

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (article.urlToImage === null) {
            return
        }

        const cardClone = cardTemplate.content.cloneNode(true);

        fillCard(cardClone, article);

        cardsContainer.appendChild(cardClone)

    })
}

function fillCard(card, article) {
    let img = card.querySelector('#news-img');
    let newsTitle = card.querySelector('#news-title');
    let author = card.querySelector('#author-name');
    let date = card.querySelector('#post-date');
    let desc = card.querySelector('#news-desc');
    let link = card.querySelector('#news-link');

    img.setAttribute('src', article.urlToImage);

    newsTitle.innerText = article.title;

    author.innerText = article.author;

    date.innerText = article.publishedAt;

    desc.innerText = article.description;

    link.setAttribute('href', article.url);
}