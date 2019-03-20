

// GAMESPOT


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