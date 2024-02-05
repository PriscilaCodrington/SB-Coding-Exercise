const limit = 150;
const limit2 = 30;

async function getNewsIds(limit= 30) {
    return fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?limitToFirst=${limit}&orderBy="$key"`)
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
  }
  async function renderNewHtml(report) {
    const container = document.querySelector('.container-grid');
    const { title, score, descendants, id, by } = report
  
    container.innerHTML += `
      <div class="card-body">
          <h4 class="card-title">${title}</h4>
          <p class="card-comments">${descendants} Comments</p>
          <p class="card-points">${score} Comments</p>
          <p class="card-order">${id} Comments</p>
          <p class="card-user">Written by: ${by} Comments</p>
      </div>`
  }
  async function renderNewsHtml(newsArray) {
    for (const New of newsArray) {
      renderNewHtml(New)
   }
 }
  

  getNews();