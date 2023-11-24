const global={
    currentPage:window.location.pathname,
    search:{
        term:'',
        type:'',
        page:1,
        totalPage:1
    },
    // Enregistrez votre clé sur https://www.themoviedb.org/settings/api et entrez-la ici. 
    // Utilisez ceci uniquement pour le développement ou des projets très petits. Vous devriez stocker votre clé et effectuer des requêtes depuis un serveur pour des cas plus importants.
    api:{
        API_KEY:'',
        API_URL:'https://api.themoviedb.org/3/'
    }
}
// Display 20 most popular movie Show
async function displayPopularMovie(){
    const {results} = await fetchAPIData('movie/popular');

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
    const {results} = await fetchAPIData('tv/popular');
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
    const results = await fetchAPIData(`movie/${movieId}`);

    // Overlay for background  image

    displayBackgroundImage('movie',results.backdrop_path);
    
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
            <li><span class="text-secondary">Budget:</span>  $${addCommaToNumber(results.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommaToNumber(results.revenue)} </li>
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
    const results = await fetchAPIData(`tv/${movieId}`);
    displayBackgroundImage('shows',results.backdrop_path);

    const div=document.createElement('div');
    div.innerHTML=`
    <div class="details-top">
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
    </div>
     </div>
   <div class="details-bottom">
        <h2>Show Info</h2>
          <ul>
                <li><span class="text-secondary">Number Of Episodes:</span> ${results.number_of_episodes}</li>
                <li>
                    <span class="text-secondary">Last Episode To Air:</span> ${results.last_air_date}
                </li>
                <li><span class="text-secondary">Status:</span> ${results.status} </li>
          </ul>
          <h4>Production Companies</h4>
           <div class="list-group"> 
                ${results.production_companies
                    .map(companie=>companie.name).join(", ")}
            </div>
    </div>`
    document.querySelector('#show-details').appendChild(div);
    
}


// Display Backdrop On details Pages
function displayBackgroundImage(type, backgroundPath){

    const overlayDiv=document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.3';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}


// Search Movie/Search

async function search(){
    const urlParams=new URLSearchParams(window.location.search);
    global.search.type=urlParams.get('type');
    global.search.term=urlParams.get('search-term');

    if(global.search.term!=='' &&global.search.term !==null){
        const {results, total_pages,page,total_results}= await searchAPIData();

        global.search.page=page;
        global.search.totalPage=total_pages;
        global.search.totalResults=total_results;
        document.querySelector('#search-term').value=`${global.search.term}`;
        if(results.length===0){
            showAlert('Not found ');
            `${global.search.type==='movie' 
                    ?displayPopularMovieSearch()
                    :displayPopularShowSearch()
            }`;
            return;

        }

        showAlert('Success', 'alert-success');
        displayResult(results);

    }else{
        showAlert('Please enter a search term');
        displayPopularMovieSearch();
    }
   
}

function displayResult(results){

    // clear previous resluts

    document.querySelector('#serach-results').innerHTML='';
    document.querySelector('#serach-results-heading').innerHTML='';
    document.querySelector('#pagination').innerHTML='';

     results.forEach((movie)=>{
                const div= document.createElement('div');
                div.classList.add('card');
    
                div.innerHTML=
                
                `
                <a href="${global.search.type}-details.html?id=${movie.id}">
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
                            alt="
                            ${
                            global.search.type === 'movie' ? movie.title : movie.name
                        }
                            "
                            />`
                    }
                    <div class="card-body">
                        <h5 class="card-title">${
                            global.search.type === 'movie' ? movie.title : movie.name
                        }
                        </h5>
                        <p class="card-text">
                        <small class="text-muted">Release:
                            ${
                                global.search.type === 'movie'
                                ? movie.release_date
                                : movie.first_air_date
                            }
                        </small>
                        </p>
                    </div>
                </a>
                `

            document.querySelector('#search-results-heading').innerHTML=`
                            <h2>${results.length} of  ${global.search.totalResults} Results for ${global.search.term}</h2>
            `
            document.querySelector('#search-results').appendChild(div);
        });
        displayPagination();
}

// Create display pagination for search

function displayPagination(){
    const div=document.createElement('div');
    div.classList.add('pagination');

    div.innerHTML=
        `<button class="btn btn-primary" id="prev">Prev</button>
            <button class="btn btn-primary" id="next">Next</button>
            <div class="page-counter">Page ${global.search.page} of ${global.search.totalPage}</div>
        `;

    document.querySelector('#pagination').appendChild(div);

    // Disable prev button if on first page
    if(global.search.page===1){
        document.querySelector('#prev').disabled=true;

    }

    // Disable prev button if on first page
    if(global.search.page===global.search.totalPage){
         document.querySelector('#next').disabled=true;
    }

    // Next Page

    document.querySelector('#next').addEventListener('click', async ()=>{

        global.search.page++;
          const {results, total_pages}= await searchAPIData();
          displayResult(results);
    })
    // Preview Page 
    document.querySelector('#prev').addEventListener('click', async ()=>{

        global.search.page--;
          const {results, total_pages}= await searchAPIData();
          displayResult(results);
    })
}

// display show if we don't find result for search

async function displayPopularShowSearch(){
    const {results} = await fetchAPIData('tv/popular');
    results.forEach(movie=>{
       
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
        document.querySelector('#search-results').appendChild(div);
    })

}

// Display popular movie if we don't for search

async function displayPopularMovieSearch(){
    const {results} = await fetchAPIData('movie/popular');

    results.forEach(movie=>{
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
        document.querySelector('#search-results').appendChild(div);
    })
   
}
// Display Slider movies

async function displayMovieSlider(){
    const {results}= await fetchAPIData('movie/now_playing');
    results.forEach((movie)=>{
        const div= document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML=
        `
            <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
          initSwiper();
    });
}
// Display Slider Show

async function displayShowSlider(){
    const {results}= await fetchAPIData('tv/on_the_air');
    results.forEach((movie)=>{
        const div= document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML=
        `
            <a href="tv-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}
function initSwiper() {
    const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
// Fetching Data from API
async function fetchAPIData(endPoint){
    const API_KEY=global.api.API_KEY;
    const API_URL=global.api.API_URL;
    showSpinner();
    const response = await fetch(`${API_URL}${endPoint}?api_key=${API_KEY}&language=en-US`);
    const data = await  response.json();
    hideSpinner();
    return data;
}
// Make Request To Search

async function searchAPIData(endPoint){
    const API_KEY=global.api.API_KEY;
    const API_URL=global.api.API_URL;

    showSpinner();

    const response = await fetch( `${API_URL}search/${global.search.type}?api_key=${API_KEY}
    &language=en-US&query=${global.search.term}&page=${global.search.page}`);
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

//  Show Alert 

function showAlert(message,className='alert-error'){
    const alertEl=document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(()=>alertEl.remove(),3000);
}
function addCommaToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



// Init App

function init(){
    switch (global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovie();
            displayMovieSlider();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/shows.html':
            displayPopularShow();
            displayShowSlider();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search();
            break;
    }
    highlightActiveLink();
}


document.addEventListener('DOMContentLoaded',init());