const limit = 150;
const limit2 = 30;

async function getNewsIds(limit) {
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

  getNews();