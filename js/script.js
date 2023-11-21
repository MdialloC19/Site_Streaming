const global={
    currentPage:window.location.pathname,
}
// Display 20 most popular movie Show
async function displayPopularMovie(){
    const {results} = await fetchApiData('movie/popular');
    console.log(results);
    results.forEach(movie=>{
        const  populars= document.getElementById("popular-movies");
        const div= document.createElement("div");
        div.classList.add('card');
        div.innerHTML=
              `<a href="movie-details.html?id=${movie.id}">
                ${
                    movie.poster_path
                    ? `<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.original_title}"
                        />`
                    : `<img
                        src="/images/no-image.jpg"
                        class="card-img-top"
                        alt="${movie.original_title}"
                        />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title"> ${movie.original_title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
              </div>

            `;
        populars.appendChild(div);
    })
   

}

// Display 20 most popular tv show
async function displayPopularShow(){
    const {results} = await fetchApiData('tv/popular');
    console.log(results);
    results.forEach(movie=>{
        const  populars= document.getElementById("popular-shows");
        const div= document.createElement("div");
        div.classList.add('card');
        div.innerHTML=
              `<a href="tv-details.html?id=${movie.id}">
                ${
                    movie.poster_path
                    ? `<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.original_name}"
                        />`
                    : `<img
                        src="/images/no-image.jpg"
                        class="card-img-top"
                        alt="${movie.original_name}"
                        />`
                }
              </a>
              <div class="card-body">
                <h5 class="card-title"> ${movie.original_name}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${movie.first_air_date}</small>
                </p>
              </div>

            `;
        populars.appendChild(div);
    })
   

}

// display movie detail 

async function displayMovieDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const results = await fetchApiData(`movie/${movieId}`);

    const elt= document.querySelector('#movie-details')

    const div=document.createElement('div');
    div.classList.add('details-top');
    const div1=document.createElement('div');
    div1.classList.add('details-bottom');

    div.innerHTML=`
    <div>
        ${
            results.poster_path
            ? `<img
                src="https://image.tmdb.org/t/p/w500${results.poster_path}"
                class="card-img-top"
                alt="${results.original_title}"
                />`
            : `<img
                src="/images/no-image.jpg"
                class="card-img-top"
                alt="${results.original_title}"
                />`
        }
    </div>
    <div>
        <h2>${results.original_title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${results.vote_average} / 10
        </p>
        <p class="text-muted">Release Date : ${results.release_date}</p>
        <p>
            ${results.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${results.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        </ul>
       <a href="${results.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>`;
    div1.innerHTML=` 
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>  ${results.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${results.revenue} </li>
            <li><span class="text-secondary">Runtime:</span> ${results.runtime}</li>
            <li><span class="text-secondary">Status:</span>  ${results.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${results.production_companies.map(companie=>companie.name).join(", ")}</div>
        `;
    
    elt.appendChild(div);
    elt.appendChild(div1);

}
// Tv show details
async function displayShowDetails(){
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const results = await fetchApiData(`tv/${movieId}`);

    const elt= document.querySelector('#show-details')

    const div=document.createElement('div');
    div.classList.add('details-top');
    const div1=document.createElement('div');
    div1.classList.add('details-bottom');

    div.innerHTML=`
    <div>
        ${
            results.poster_path
            ? `<img
                src="https://image.tmdb.org/t/p/w500${results.poster_path}"
                class="card-img-top"
                alt="${results.original_name}"
                />`
            : `<img
                src="/images/no-image.jpg"
                class="card-img-top"
                alt="${results.original_name}"
                />`
        }
    </div>
    <div>
        <h2>${results.original_name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${results.vote_average} / 10
        </p>
        <p class="text-muted">Release Date: ${results.first_air_date}</p>
        <p>
            ${results.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${results.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        </ul>
       <a href="${results.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>`;

    div1.innerHTML=`
        <h2>Show Info</h2>
          <ul>
                <li><span class="text-secondary">Number Of Episodes:</span> ${results.number_of_episodes}</li>
                <li>
                    <span class="text-secondary">Last Episode To Air:</span> ${results.last_air_date}
                </li>
                <li><span class="text-secondary">Status:</span> ${results.status} </li>
          </ul>
          <h4>Production Companies</h4>
           <div class="list-group"> ${results.production_companies.map(companie=>companie.name).join(", ")}</div>`

     
   
    
    elt.appendChild(div);
    elt.appendChild(div1);

}


// Fetching Data from API
async function fetchApiData(endPoint){
    const API_KEY='6f1f1570d82067fb22a853295b16bc8d';
    const API_URL='https://api.themoviedb.org/3/';
    showSpinner();
    const response = await fetch(`${API_URL}${endPoint}?api_key=${API_KEY}&language=en-US`);
    const data = await  response.json();
    hideSpinner();
    return data;
}

// Function Show Spinner

function showSpinner(){
    const spinner=document.querySelector('.spinner');
    spinner.classList.add('show');

}
// Hide Spinner

function hideSpinner(){
    const spinner=document.querySelector('.spinner');
    spinner.classList.remove('show');

}
// Hightlight active link

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}



// Init App

function init(){
    switch (global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovie();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/shows.html':
            displayPopularShow();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init());