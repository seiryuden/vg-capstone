

// NEWS API General news sources


function fetchNews(query, dateFrom, dateTo, maxResults) {
   
  
    
  
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
          $("#news-error").html(`Something went wrong. Be sure to read the <span class="notes-redir">app's info.</span>`)
        });
  
        unhide(document.getElementById("news-container"));
    }
  