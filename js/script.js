
// import { API_KEY } from "./api_key.js";
// const api=new API_KEY();
// const apiKey = api.API_KEY;

// console.log("test");

const global={
    currentPage:window.location.pathname,
}



async function displayPopularMovie(){
    const results =await fetchApiData('movie/popular');
    console.log(results);
}

async function fetchApiData(endpoint){
    const API_KEY=;
    const API_URL=;

    const response =await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US
    `);
    
    const data=await response.json();
    return data;
}
// Hightlight active link

function hightlightActiveLink(){
    const elements = document.querySelector(`a[href="${global.currentPage}"]`);
    elements.classList.add('active');
}



// Init App

function init(){
    switch (global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovie();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/tv-details.html':
            console.log('détails');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    hightlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init());