"use strict";

let platform = {selected: ""};



// I - PAGE NAVIGATION


function displayIntro(){

  $("main").append(htmlIntro());

}

function displayNotes(){
  

  $(".visit-notes").click(function(){

    $(".intro").replaceWith(htmlNotes());

  })

  $("main").on("click", ".notes-redir", function(){
    
    $(".content").replaceWith(htmlNotes());

  })
}



function dropDown(){
 
  $(".js-dropbtn").click(function(event){
    document.getElementById("dropdown-content").classList.toggle("show");
  })
}



function closeDropDown(){
  
  window.onclick = function(event) {
  if (!event.target.matches(".js-dropbtn" )) {
    document.getElementById("dropdown-content").classList.remove('show');
  }
}
}



function goToSource(){
    

    $("main").on("click",".list-item", function(event){
      
      let url = $("a", this).attr("href");
     
      window.open(url);

    })
}



function htmlIntro(){

  return `
  
  <div class="content js-content" role="container">

    <div id="intro" class="intro show" role="container">
      <h1>Welcome to VGP Monitor. Select your platform above.</h1>
      <p class="visit-notes js-visit-notes"><sp>Click here for information about this app</sp></p>
    </div>
            
  </div>
  
  `
}



function htmlNotes(){

  return `
  
  <div class="content js-content" role="container">
    <div class="notes-container">
      <h3>A few notes:</h3> 
        <ul class="notes-list">
          <li class="notes-item">- This app retrieves and displays content related to major gaming platforms, from different online sources.</li>
          <li class="notes-item">- Sources set limits on how far back information can be retrieved: 
            <ul class="sublist">
              
              <li> Gamespot: as far as 1996. </li>
              <li> Youtube: no limit specified.</li>
              <li> General news sources: 1 month limit.</li> 
            </ul>
          </li>

          <li class="notes-item">- Sources cap the amount of information apps can retrieve. An error message will be shown when the request is refused. 
          <li class="notes-item">- RSS section is bonus content, only showing what is currently on the company's feed (Eurogamer magazine, in the case of PC).</li>
        </ul>
    </div>
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
            <div id="date-picker"></div>
            
          </fieldset>

          <fieldset class="source-menu">
            <legend>Select sources</legend>
            <div>
            
              <label for="gamespot">Gamespot</label><input type="checkbox" class="source-input" id="js-checkbox-gamespot" name="gamespot" value="gamespot" checked>

              <label for="news">Other news sources</label><input type="checkbox" class="source-input" id="js-checkbox-news" name="news" value="news" checked>

            </div>
            <div>

              <label for ="youtube">Youtube</label><input type="checkbox" class="source-input" id="js-checkbox-youtube" name="youtube" value="youtube" checked>
               
              <label for="rss">RSS</label><input type="checkbox" class="source-input" id="js-checkbox-rss" name="rss" value="rss" checked>  

            </div>
          </fieldset>
                    
          <label for="max-results" class="results-input-label">Max results</label>
          <input type="number" id="max-results" class="max-results-input" name="max-results" value="12" min="1" max="25">

          <input type="submit" value="Get content" class="submit js-submit" id="submit">
        </form>
      </section>

    </div>

  `
}



function htmlResults(){

  return `
  
  <section class="results-section js-results-section" aria-live="polite">
      
    <div id="gamespot-container" class="list-container hidden">
      <h1 class="list-header">Gamespot news</h1>
      <ul id="gamespot-list" class="gamespot-list list js-gamespot-list">
      </ul>
      <p id="gamespot-error" class="error hidden"></p>

    </div>

    <div id="news-container" class="list-container hidden">
      <h1 class="list-header">Other News Sources</h1>
      <ul id="news-list" class="news-list list js-news-list">
      </ul>

      <p id="news-error" class="error hidden"></p>
    </div>

    

    <div id="youtube-container" class="list-container hidden"> 
      <h1 class="list-header">Popular on Youtube</h1>
      <ul id="youtube-list" class="youtube-list list js-youtube-list">
      </ul>
      <p id="youtube-error" class="error hidden"></p>

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
  

  $(".js-dropdown-content").click(function(event){


    if (event.target.matches(".js-ps4")) {
      
      platform.selected = "PS4";
      document.body.style.background = `url('img/ps47.jpg') repeat fixed 100%`
     
    }

    else if (event.target.matches(".js-nintendo")) {

      platform.selected = "Nintendo";
      document.body.style.background = `url(img/peach.jpg) repeat fixed`; 
     

    }
    
    else if (event.target.matches(".js-xbox")) {
      
      platform.selected = "Xbox";
      document.body.style.background = `url(img/xbox4light.jpg) repeat fixed`; 
      
    }
    else if (event.target.matches(".js-pc")) {
      
      platform.selected = "PC games";
      document.body.style.background = `url(img/pc4.jpg) repeat fixed`;
      
    }

    $(".js-content").replaceWith(htmlFrame);
    $("#date-picker").datepicker({
      maxDate: '0',
      dateFormat:"yy-mm-dd",
      
     
    });
    
  })
}




// II - FETCHING AND DISPLAYING CONTENT


function formatResults(title, lead, description, thumbnail, url){


  if(!lead & !description & !thumbnail){

    return `
    
    <li class="list-item">
        
      <h3><a href="${url}" class="link" target="_blank">"${title}"</a></h3>
                      
    </li>
    `
  }

  let trimmedDesc = `${description.substring(0,145)}...`;
  

  if(!lead){

    return `
          
        <li class="list-item">
        <img class="thumbnail" src="${thumbnail}"> 
        <h3><a href="${url}" class="link" target="_blank">${title}</a></h3>
        <p>${trimmedDesc}</p>
              
        </li>
        
  `} else{
    
      return `
          
        <li class="list-item">
        <img class="thumbnail" src="${thumbnail}"> 
        <h3><a href="${url}" class="link" target="_blank">${title}</a></h3>
        <p>${lead}</p>
        <p>${trimmedDesc}</p>              
        </li>
        
  `
}
}



function formatQueryParams(params){
  

  let queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}



function unhide(container){

  if(container.classList.contains("hidden")){
  
    container.classList.remove("hidden");
  }
}



function displayResults(responseJson, source, maxResults){

  if(source == "news-api"){

    for(let i = 0; i < responseJson.articles.length & i < maxResults; i++){
      
      $(".js-news-list").append(formatResults(responseJson.articles[i].title, responseJson.articles[i].source.name, responseJson.articles[i].description, responseJson.articles[i].urlToImage, responseJson.articles[i].url))
    }
    
  } 

  else if(source == "gamespot"){

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



//III. WATCH AND HANDLERS

function watchSearch(){

  $("main").on("submit", function(event){ 
    

      event.preventDefault();
      $(".js-results-section").remove();
      $(".js-content").append(htmlResults);

      
      let dateFrom = $("#date-picker").datepicker({dateFormat: "yyyy-mm-dd"}).val();
      let dateTo = $("#date-picker").datepicker({dateFormat: "yyyy-mm-dd"}).val();
      let maxResults = $("#max-results").val();
      
      


      if(document.getElementById("js-checkbox-news").checked){
        

        fetchNews(platform.selected, dateFrom, dateTo, maxResults);

      }

      if(document.getElementById("js-checkbox-gamespot").checked){
        
                  
        fetchGamespotHandler(dateFrom, dateTo, maxResults)

      }
      
      if(document.getElementById("js-checkbox-youtube").checked){
       

        fetchYoutube(platform.selected, dateFrom, dateTo, maxResults);

      }

      if(document.getElementById("js-checkbox-rss").checked){
        

        fetchRSS();

      }

  })

}



function handleRender(){
  displayIntro();
  displayNotes();
  displayPlatformSection();
  dropDown();
  closeDropDown();
  watchSearch();
  goToSource();
}

$(handleRender)

