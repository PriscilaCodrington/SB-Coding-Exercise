const limit = 150;
const limit2 = 30;

async function getNewsIds(limit) {
    return fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?limitToFirst=${limit}&orderBy="$key"`)
      .then(response => response.json())
  }
const getNewById = async (id) =>
       fetch(`https:hacker-news.firebaseio.com/v0/item/${id}.json`)
         .then(response => response.json())
 
  