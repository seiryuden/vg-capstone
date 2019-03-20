

// IGDB 

function fetchIGDB(query){

    console.log(`fetchIGDB ran`);
  
    
    
    //let queryString = formatQueryParams(IGDBparams); 
    //const baseUrl = "https://api-v3.igdb.com/search?";
  
    let url = "http://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/search";
  
  
    fetch(url, {
      url: "https://api-v3.igdb.com/search",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'user-key': "e59626d220ac74991205b06ba9a8bfe2"
      },
      data: "search 'PS4'; fields alternative_name,character,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;"
    })
  
      .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, "igdb"))
      .catch(err=>{
        unhide(document.getElementById("igdb-error"));
        $("#igdb-error").text(`Something went wrong. ${err.message}`)
      });
  
      unhide(document.getElementById("igdb-container"));
  
  }