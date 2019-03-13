"use strict";

let platform = {selected: ""};



// I - Page navigation//



function displayNotes(){
  console.log("displayNotes listening");
  $(".visit-notes").click(function(){

    $(".intro").replaceWith(htmlNotes());

  })
}



function dropDown(){
  console.log("dropDown listening");
  $(".js-dropbtn").click(function(event){
    document.getElementById("dropdown-content").classList.toggle("show");
  })
}



function closeDropDown(){
  console.log("closeDropDown listening");
  window.onclick = function(event) {
  if (!event.target.matches(".js-dropbtn" )) {
    document.getElementById("dropdown-content").classList.remove('show');
  }
}
}




function htmlNotes(){

  return `
  
  <div class="notes-container">
    <h3>A few notes:</h3> 
      <ul class="notes-list">
        <li class="notes-item">- This app retrieves and displays content related to major gaming platforms, from different online sources.</li>
        <li class="notes-item">- Sources set limits on how far back information can be retrieved: 
          <ul>
             
            <li> Gamespot: as far as 1996. </li>
            <li> Youtube: no limit specified.</li>
            <li> General news sources: 1 month limit.</li> 
          </ul>
            </li>
        <li class="notes-item">- RSS section is bonus content, only showing what is currently on the company/magazine's feed.</li>
      </ul>
  </div>
  
  `
  
}

function htmlFrame(){

  return `
  
    <div class="content js-content">
      <section class="search-menu">
        <form class="search-form js-search-form" role="search">
          <fieldset class="date-menu">
            <legend>Choose a date</legend>
            <label for="from">Date:</label>
            <input type="date" id="from" class="date-input js-date-from" required>
            
          </fieldset>

          <fieldset class="source-menu">
            <legend>Select sources</legend>
            <div>
              <label for="gamespot">Gamespot</label><input type="checkbox" class="source-input" id="js-checkbox-gamespot" name="gamespot" value="gamespot" checked>
              <label for ="youtube">Youtube</label><input type="checkbox" class="source-input" id="js-checkbox-youtube" name="youtube" value="youtube" checked>
            </div>
            <div>
              <label for="news">General news sources</label><input type="checkbox" class="source-input" id="js-checkbox-news" name="news" value="news" checked>  
              <label for="rss">RSS</label><input type="checkbox" class="source-input" id="js-checkbox-rss" name="rss" value="rss" checked>  
            </div>
          </fieldset>
                    
          <label for="max-results" class="results-input-label">Max results</label>
<<<<<<< HEAD
          <input type="number" id="max-results" class="max-results-input" name="max-results" value="15" min="1" max="50">
=======
          <input type="number" id="max-results" class="max-results-input" name="max-results" value="12" min="1" max="20">
>>>>>>> 8ba13aaabf6ac99dfe30df5ef5311cf533def038
          <input type="submit" value="Get content" class="submit js-submit" id="submit">
        </form>
      </section>

    </div>

  `
}



function htmlResults(){

  return `
  
  <section class="results-section js-results-section">
      
    <div id="gamespot-container" class="list-container hidden">
      <h1 class="list-header">Gamespot</h1>
      <ul id="gamespot-list" class="gamespot-list list js-gamespot-list">
      </ul>
      <p id="gamespot-error" class="error hidden"></p>

    </div>
    

    <div id="youtube-container" class="list-container hidden"> 
      <h1 class="list-header">Youtube</h1>
      <ul id="youtube-list" class="youtube-list list js-youtube-list">
      </ul>
      <p id="youtube-error" class="error hidden"></p>

    </div>
    

    <div id="news-container" class="list-container hidden" >
      <h1 class="list-header">General News Sources</h1>
      <ul id="news-list" class="news-list list js-news-list">
      </ul>

      <p id="news-error" class="error hidden"></p>
    </div>
    

    <div id="rss-container" class="list-container hidden">
      <h1 class="list-header">${platform.selected} RSS (current)</h1>
      <ul id="rss-list" class="rss-list list js-rss-list">
      </ul>
      <p id="rss-error" class="error hidden"></p>
    </div>
  

  </section>
  
  `
}



function displayPlatformSection(){
  console.log("displayPlatformSection listening");

  $(".js-dropdown-content").click(function(event){


    if (event.target.matches(".js-ps4")) {
      
      platform.selected = "PS4";
      document.body.style.background = "#3F54D6" 
      console.log(platform.selected);
    }

    else if (event.target.matches(".js-nintendo")) {

      platform.selected = "Nintendo";
      document.body.style.background = "#FF615F" 
      console.log(platform.selected);

    }
    
    else if (event.target.matches(".js-xbox")) {
      
      platform.selected = "Xbox";
      document.body.style.background = "#3DD607" 
      console.log(platform.selected);
    }
    else if (event.target.matches(".js-pc")) {
      
      platform.selected = "PC games";
      document.body.style.background = "#B6B3D6" 
      console.log(platform.selected);
    }

    $(".js-content").replaceWith(htmlFrame);
    
    
  })
}





// II - Fetching and displaying content


//II.1 Common Use


function formatResults(title, lead, description, thumbnail, url){

  console.log(`formatResults ran`);

  if(!lead & !description & !thumbnail){

    return `
    
    <li>
        
      <h3><a href="${url}" class="link" target="_blank">"${title}"</a></h3>
                      
    </li>
    
    `
  }
  if(!lead){

    return `
          
        <li>
        <img class="thumbnail" src="${thumbnail}">  
        <h3><a href="${url}" class="link" target="_blank">${title}</a></h3>
        <p>${description}</p>
              
        </li>
        
  `} else{
    
      return `
          
        <li>
        <img class="thumbnail" src="${thumbnail}">  
        <h3><a href="${url}" class="link" target="_blank">${title}</a></h3>
        <p>${lead}</p>
        <p>${description}</p>              
        </li>
        
  `
}
}



function formatQueryParams(params){
  console.log(`formatQueryParams ran`);

  let queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}



function unhide(container){

  if(container.classList.contains("hidden")){
  
    container.classList.remove("hidden");
  }
}



function displayResults(responseJson, source, maxResults){

  console.log(`displayResults ran`);
  

  if(source == "gamespot"){

    let gamespotResults = filterGamespotResults(responseJson);
    
    for (let i=0; i< gamespotResults.length; i++){
      $(".js-gamespot-list").append(formatResults(gamespotResults[i].title, gamespotResults[i].lede, gamespotResults[i].deck,
        gamespotResults[i].image.original, gamespotResults[i].site_detail_url))
    } 

  } 

  else if (source == "youtube"){

    for(let i = 0; i< responseJson.items.length; i++){
      $(".js-youtube-list").append(formatResults(responseJson.items[i].snippet.title, undefined, responseJson.items[i].snippet.description, responseJson.items[i].snippet.thumbnails.medium.url, "https://www.youtube.com/watch?v=" + responseJson.items[i].id.videoId))
 
    }
  }

  else if(source == "news-api"){

    for(let i = 0; i < responseJson.articles.length & i < maxResults; i++){
      
      $(".js-news-list").append(formatResults(responseJson.articles[i].title, responseJson.articles[i].source.name, responseJson.articles[i].description, responseJson.articles[i].urlToImage, responseJson.articles[i].url))
    }
    
  } 
  
  else if(source == "RSS"){

    let key = "";
    if(platform.selected != "PS4"){
      key = "item";

    } else {
      key = "entry"
    }

    responseJson.querySelectorAll(`${key}`).forEach((item) => {
      
      let a = item.querySelector('title').textContent;
      
      let url = item.querySelector('link').textContent;

      if(platform.selected == "PS4"){
        url = item.querySelector('link').getAttribute("href");
      }
      
       $('.js-rss-list').append(formatResults(a,undefined, undefined, undefined,url))
     })
  }
  
}




// II.2 GameSpot


function formatQueryGamespot(params){

  console.log(`formatQueryGamespot ran`);

  let queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  let formatFilter = "filter="+queryItems[3].replace("=",":");
  queryItems[3] = formatFilter;
 
  return queryItems.join('&');

}



function filterGamespotResults(responseJson){
  console.log(`filterGamespotResults ran`);

  let gamespotQueryTerm = platform.selected;
  
  if (platform.selected.includes("PC games")){
    gamespotQueryTerm = "PC";
  }

  var filteredResults = [];

  for( var i=0; i < responseJson.results.length; i++){
    
      let title = responseJson.results[i].title;
      let deck = responseJson.results[i].deck;
      let lede = responseJson.results[i].lede;
          
      if(title.indexOf(gamespotQueryTerm) != -1 || deck.indexOf(gamespotQueryTerm) != -1){
        
        filteredResults.push(responseJson.results[i]);
  
    }
  }
  console.log(filteredResults);
  return filteredResults;
}



function fetchGamespotHandler(dateFrom, dateTo, maxResults){
  console.log(`fetchGamespotHandler ran`);
  
  let gamespotParams ={
    
    api_key: "6d688d5fbafaba05b884c174077e96b62997c1a9",
    format: "json",
    field_list: "",
    publish_date: `${dateFrom}|${dateTo}`,
    limit: `${maxResults}`
  }


  let mainFieldList = "id,title,deck,lede,body,image,game,publish_date,site_detail_url";
  let videosFieldList = "id,title,image,deck,hd_url,publish_date,site_detail_url,categories";

  // Note: more field lists can be added to fetch additional content from other endpoints. The filterGamespotResults and displayResults functions would have to be adapted.
  

  
  const baseUrl = `https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/`;


  gamespotParams.field_list = mainFieldList;

  let mainQueryString = formatQueryGamespot(gamespotParams);
  
  const articlesUrl = `${baseUrl}articles/?${mainQueryString}`;
  
  fetchingGamespot(articlesUrl);


  const reviewsUrl = `${baseUrl}reviews/?${mainQueryString}`;
  
  fetchingGamespot(reviewsUrl);



  gamespotParams.field_list = videosFieldList;

  const videosQueryString = formatQueryGamespot(gamespotParams);
  const videosUrl = `${baseUrl}videos/?${videosQueryString}`
  fetchingGamespot(videosUrl);
  

}



function fetchingGamespot(url){

  console.log(`fetchingGamespot ran on ${url}`);

  fetch(url, { method: "GET", mode: "cors", credentials: "same-origin", headers:{ origin: "same-origin"}})
  .then(response =>{
    if (response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson, "gamespot"))
  .catch(err => {  
    unhide(document.getElementById("gamespot-error"));
    $("#gamespot-error").text(`Something went wrong. ${err.message}`);
  });
  unhide(document.getElementById("gamespot-container"));
}




// II.3 Youtube


  function fetchYoutube(query, dateFrom, dateTo, maxResults){

    console.log(`fetchYoutube ran`);

    

    let youtubeParams = {
      key: "AIzaSyDTmUpkAHabtNw5ITDo10GusfQiQt9i_a8",
      q: query,
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      relevanceLanguage: "en",
      maxResults: `${maxResults}`,
      publishedAfter: dateFrom + "T00:00:00Z",
      publishedBefore: dateTo + "T23:59:59Z"
    }

    let queryString = formatQueryParams(youtubeParams); 
    const url = `https://www.googleapis.com/youtube/v3/search?${queryString}`
    console.log(url);
    
    fetch(url)
      .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, "youtube"))
      .catch(err=>{
        unhide(document.getElementById("youtube-error"));
        $("#youtube-error").text(`Something went wrong. ${err.message}`)
      });

      unhide(document.getElementById("youtube-container"));
  }

  


//II.4 General news sources


function fetchNews(query, dateFrom, dateTo, maxResults) {
  console.log("fetchNews ran");

  

  const params = {
    apiKey: "84da1007d1164e07ba3be84d8e82b48e",
    q: query,
    language: "en",
    sortBy: "relevancy",
    from: dateFrom,
    to: dateTo
  };

  const queryString = formatQueryParams(params);
  const url = 'https://newsapi.org/v2/everything?' + queryString;

  console.log(url);

  

  fetch(url)
    .then(response => {

      if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, "news-api", maxResults))
    .catch(err=>{
        unhide(document.getElementById("news-error"));
        $("#news-error").text(`Something went wrong. ${err.message}`)
      });

      unhide(document.getElementById("news-container"));
  }




// II.5 RSS

function fetchRSS(){

    console.log("fetchRss ran")

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
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

 

//III. Watch and handlers

function watchSearch(){

  console.log("watchSearch listening");

  $("main").on("submit", function(){ 
    console.log("listener ran");

      event.preventDefault();
      $(".js-results-section").remove();
      $(".js-content").append(htmlResults);

      let dateFrom = $("#from").val();
      let dateTo = $("#from").val();
      let maxResults = $("#max-results").val();
      console.log(`Date selected: ${dateFrom} to ${dateTo}`);
      console.log(`maxResults is ${maxResults}`);

      if(document.getElementById("js-checkbox-gamespot").checked){
        console.log("Gamespot checkbox checked");
                  
        fetchGamespotHandler(dateFrom, dateTo, maxResults)

      }
      
      if(document.getElementById("js-checkbox-youtube").checked){
        console.log("Youtube checkbox checked");

        fetchYoutube(platform.selected, dateFrom, dateTo, maxResults);

      }

      if(document.getElementById("js-checkbox-news").checked){
        console.log("News checkbox checked");

        fetchNews(platform.selected, dateFrom, dateTo, maxResults);

      }

      if(document.getElementById("js-checkbox-rss").checked){
        console.log("RSS checkbox checked");

        fetchRSS();

      }

  })

}


function handleRender(){
  
  displayNotes();
  displayPlatformSection();
  dropDown();
  closeDropDown();
  watchSearch();
}

$(handleRender)

