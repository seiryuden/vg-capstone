

// RSS FEEDS

function fetchRSS(){

    console.log("fetchRss ran")

    const proxyUrl = "http://cors-anywhere.herokuapp.com/";
    const url = {
      
      PS4 : `${proxyUrl}https://www.youtube.com/feeds/videos.xml?user=PlayStation`,
      Nintendo : `${proxyUrl}https://www.nintendo.co.jp/ir/en/news/news.xml`,
      Xbox : `${proxyUrl}https://news.xbox.com/en-us/feed/`,
      "PC games": `${proxyUrl}https://www.pcmag.com/Rss.aspx/SectionArticles?sectionId=26589`

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
      $('#rss-error').text(`Something went wrong. ${err.message}`)});

      unhide(document.getElementById("rss-container"));

  }
