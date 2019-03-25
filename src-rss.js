

// RSS FEEDS

function fetchRSS(){

    console.log("fetchRss ran")

    const proxyUrl = "http://cors-anywhere.herokuapp.com/";
    const url = {
      
      PS4 : `${proxyUrl}https://www.youtube.com/feeds/videos.xml?user=PlayStation`,
      Nintendo : `${proxyUrl}https://www.nintendo.co.jp/ir/en/news/news.xml`,
      Xbox : `${proxyUrl}https://news.xbox.com/en-us/feed/`,
      "PC games": `${proxyUrl}https://www.eurogamer.net/?format=rss&platform=PC`

    }

    console.log(url[platform.selected]);
  fetch(url[platform.selected])
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(response.statusText);
    })
    .then((xmlTxt) => {
          var domParser = new DOMParser()
          let doc = domParser.parseFromString(xmlTxt, 'text/xml')
          displayResults(doc, "RSS");
         })   
    .catch(err => {
      unhide(document.getElementById("rss-error"));
      $('#rss-error').html(`Something went wrong. Be sure to read the <span class="notes-redir">app's info.</span>`)});

      unhide(document.getElementById("rss-container"));

  }
  