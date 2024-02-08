

async function getNewsIds(limit= 30) {
    return fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=${limit}&orderBy="$key"`)
      .then(response => response.json())
  }
const getNewById = async (id) =>
       fetch(`https:hacker-news.firebaseio.com/v0/item/${id}.json`)
         .then(response => response.json())


async function getNewsArray(newsIds){
    const news = [];

    for(const newId of newsIds){
        const notice = await getNewById(newId);
        news.push(notice);
    }
    
    return news;
}
  async function getNews(){
    const newsIds = await getNewsIds();
    const allNews = await getNewsArray(newsIds);

    console.log(allNews);
    renderNewsHtml(allNews);

    filterMoreThan5words(allNews);
    filterLessThan5words(allNews);
  }
  async function renderNewHtml(report) {
    const container = document.querySelector('.container-grid');
    const { title, score, descendants, id, by, url } = report
  
    container.innerHTML += `
      <div class="card-body">
         <a href="${url}"> <h4 class="card-title">${title}</h4> </a>
          <p class="card-comments">${descendants} Comments</p>
          <p class="card-points">${score} Points</p>
          <p class="card-order">ID: ${id}</p>
          <p class="card-user">Written by: <b>${by}</b></p>
      </div>`
  }
  async function renderNewsHtml(newsArray) {
    for (const New of newsArray) {
      renderNewHtml(New)
   }
 }
  
 async function filterMoreThan5words(newsArray) {
    const filteredNews = newsArray.filter((news) => news.title.split(' ').length > 5);
    const sortedFilteredNews = filteredNews.sort((a, b) => b.descendants - a.descendants);
    console.log(sortedFilteredNews);

  return sortedFilteredNews;
}
document.getElementById('filterMorethan5').addEventListener('click', async () => {
  const newsIds = await getNewsIds();
  const allNews = await getNewsArray(newsIds);
  const filteredNews = await filterMoreThan5words(allNews);
  renderFilteredNews(filteredNews);
});

async function filterLessThan5words(newsArray) {
    const filteredNews = newsArray.filter((news)=> news.title.split(' ').length <= 5);
    const sortedFilteredNews = filteredNews.sort((a, b) => b.score - a.score);
    console.log(sortedFilteredNews);
    return sortedFilteredNews;
  
}
document.getElementById('filterLessthan5').addEventListener('click', async () => {
  const newsIds = await getNewsIds();
  const allNews = await getNewsArray(newsIds);
  const filteredNews = await filterLessThan5words(allNews);
  renderFilteredNews(filteredNews);
});

async function renderFilteredNews(filteredNews) {
  const container = document.querySelector('.container-grid');
  container.innerHTML = ''; // Limpiar contenido anterior
  for (const news of filteredNews) {
      await renderNewHtml(news); // Renderizar cada noticia
  }
}

getNews(); 