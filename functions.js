async function getNewsIds(limit = 30) {
    return fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?limitToFirst=${limit}&orderBy="$key"`)
      .then(response => response.json())
  }
