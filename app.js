//PSEUDO CODE//

//create a namespace object
//save information which will be re-used (appKey and URL) in app object
//make api call to get back data for the page
     //take data and put on page 
//create an initialization method 


//always good to use namespacing and store everything inside it - things floating in the global scope will slow down the loading of your site, and you lose control of when things are uploaded (namespacing allows for much more control)
const artApp = {}

artApp.rijksURL = 'https://www.rijksmuseum.nl/api/en/collection';
artApp.apiKey = '8N1r7uUq';

//create init method
artApp.init = function(){
     console.log('initialized');
     artApp.getArt();
}

//create a method which will make the api call and get data back
artApp.getArt = function(){
     //build out the url with url constructors for the api call
     const url = new URL(artApp.rijksURL);
          // console.log(url)
     url.search = new URLSearchParams({
          key: artApp.apiKey,
          imgonly: true,
          q:'monkey'
     })
     // console.log(url)
     fetch(url)
          .then(function(response){
               //when response is returned, parse it into json
               return response.json();
          })
          .then(function(jsonResponse){
               console.log(jsonResponse.artObjects);
               //this will help pull just the relevant stuff we are looking for
               artApp.displayArt(jsonResponse.artObjects)
          })
}

artApp.displayArt = function(apiArray){
     //assign variables element holding all our information
     const gallery = document.getElementById('artwork');
     
     
     //create a for each loop to loop through all the information
     apiArray.forEach(function(i){
          console.log(i);
          //assign variable to element we are creating to hold image
          const artContainer = document.createElement('div');
          artContainer.classList.add('piece');
          //in each div, we want to add this information:
          artContainer.innerHTML = `<h2>${i.title}</h2><p>${i.principalOrFirstMaker}</p><img src="${i.webImage.url}" alt="something">`

          //append the artContainers to the page
          gallery.appendChild(artContainer);
     })          
}


//call init method @ end of code
artApp.init();