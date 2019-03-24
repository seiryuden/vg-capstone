

// YOUTUBE


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
        $("#youtube-error").html(`Something went wrong. Be sure to read the <span class="notes-redir">app's info.</span>`)
      });

      unhide(document.getElementById("youtube-container"));
  }


