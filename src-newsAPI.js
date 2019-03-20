

// NEWS API General news sources


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
  