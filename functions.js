let news = [];

function getNewsIds(limit = 30) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=${limit}&orderBy="$key"`
  ).then((response) => response.json());
}
function getNewById(id) {
  return fetch(`https:hacker-news.firebaseio.com/v0/item/${id}.json`)
  .then((response) => response.json());
}
function getNewsArray(newsIds) {
  const promises = [];
  
  for (const newId of newsIds) {
    promises.push(getNewById(newId));
  }

  return Promise.all(promises);
}
async function getNews() {
  const newsIds = await getNewsIds();
  news = await getNewsArray(newsIds);

  renderNewsHtml(news);
}
function renderNewHtml(report) {
  const container = document.querySelector(".container-grid");
  const { title, score, descendants, id, by, url } = report;

  container.innerHTML += `
      <div class="card-body">
         <a href="${url}"> <h4 class="card-title">${title}</h4> </a>
          <p class="card-comments">${descendants} Comments</p>
          <p class="card-points">${score} Points</p>
          <p class="card-order">ID: ${id}</p>
          <p class="card-user">Written by: <b>${by}</b></p>
      </div>`;
}

async function renderNewsHtml(newsArray) {
  const container = document.querySelector(".container-grid");
  container.innerHTML = "";

  for (const New of newsArray) {
    renderNewHtml(New);
  }
}

async function filterMoreThan5words(newsArray) {
  const filteredNews = newsArray
    .filter((news) => news.title.split(" ").length > 5)
    .sort((a, b) => b.descendants - a.descendants);

  return filteredNews;
}
async function filterLessThan5words(newsArray) {
  const filteredNews = newsArray
    .filter((news) => news.title.split(" ").length <= 5)
    .sort((a, b) => b.score - a.score);

  return filteredNews;
}

document
  .getElementById("filterMorethan5")
  .addEventListener("click", async () => {
    const filteredNews = await filterMoreThan5words(news);
    renderNewsHtml(filteredNews);
  });
document
  .getElementById("filterLessthan5")
  .addEventListener("click", async () => {
    const filteredNews = await filterLessThan5words(news);
    renderNewsHtml(filteredNews);
  });

getNews();
