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
     artApp.getArt('bears');
     artApp.eventListenerSetup();
};

artApp.eventListenerSetup = function(){
     //first event lsitener on select element- when user selects different option, take the chosen animal and get art related that animal
     const selectElement = document.querySelector('#animal')
     //when user selects different animal option, get art related to new animal
     selectElement.addEventListener('change', function(){
          //inside the eventListener, 'this' refers to the selectElement- this is the thing that is changing!- so when you console.log(this), it will show you over and over the the select element - with an event listener, the select element will store information (because it has an event listener assigned to it), in this case, the value
          console.log(this);
          console.log(this.value);
          const userChoice = this.value;
          artApp.getArt(userChoice) ;
          artApp.updateH1(userChoice);
     })
}

//create a method which will update the heading on the page (this comes after we've built out displaying things on pages, and after we built out a select function to get userChoice)
artApp.updateH1 = function(animal){
     const span = document.querySelector('span');
     span.textContent = animal;
}

//create a method which will make the api call and get data back
     //we added a select with options at the end --> so here we made the final step of adding in a parameter, so that we can reassign the value of q:''
artApp.getArt = function(chosenAnimal){
     //build out the url with url constructors for the api call
     const url = new URL(artApp.rijksURL);
          // console.log(url)


     url.search = new URLSearchParams({
          key: artApp.apiKey,
          imgonly: true,
          q: chosenAnimal
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
     //clear gallery before adding new art to the page- create UL element variable, and clear anything inside of it (think as well that displayArt is being called in the init function as well, with a hard code of 'monkeys' to get something on page)
     const ulElement = document.getElementById('artwork');
     ulElement.innerHTML = "";
     
     //create a for each loop to loop through all the information
     apiArray.forEach(function(i){
          // console.log(i);

          //extract data from API (title, principalOrFirstMaker, webImage.url and longTitle)
          const artworkTitle = i.title;
          const artworkImage = i.webImage.url;
          const artist = i.principalOrFirstMaker;
          const altText = i.longTitle;

          // console.log(artworkTitle, artworkImage, artist, altText);

          //creat an li (with class of "piece" to which this information will be added
          const liElement= document.createElement('li');
          liElement.classList.add('piece');

          //create the elements to hold the information, WITHIN the <li> - h2 for title, img for url, and p for artist
          const heading = document.createElement('h2');
          heading.textContent = artworkTitle;

          const image = document.createElement('img');
          //this element has src and alt properties, which we can use
          image.alt=altText;
          image.src=artworkImage;

          const paragraph = document.createElement('p');
          paragraph.classList.add('artist');
          paragraph.textContent = artist;

          //append these to the li element
               //if you were to chain these- the image would be a child of the paragraph, which would be a child of the heading- need to be separate

               //now you can do 3 different lines of code... or ONE append() to pass multiple items
          // liElement.appendChild(heading);
          // liElement.appendChild(paragraph);
          // liElement.appendChild(image);
          liElement.append(heading, paragraph, image);
          
          //append li to the ul
          ulElement.appendChild(liElement);

          //WHAT I DID ON MY OWN BEFORE:
          // //assign variables element holding all our information
          // const gallery = document.getElementById('artwork');
          // //assign variable to element we are creating to hold image
          // const artContainer = document.createElement('div');
          // artContainer.classList.add('piece');
          // //in each div, we want to add this information:
          // artContainer.innerHTML = `<h2>${i.title}</h2><p>${i.principalOrFirstMaker}</p><img src="${i.webImage.url}" alt="${i.longTitle}">`

          // //append the artContainers to the page
          // gallery.appendChild(artContainer);
     })          
}




//call init method @ end of code
artApp.init();