// http://127.0.0.1:5500/index.html
// 563492ad6f91700001000001575262f2f7ab441080645212d973fca9


const auth = "563492ad6f91700001000001575262f2f7ab441080645212d973fca9";
let gallery = document.querySelector(".gallery");
let searchInput = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let searchValue;
let more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currectSearch;

// sbwkjfhsakhfaslkhklfsdsdkladj

searchInput.addEventListener("input", updateInput);
form.addEventListener('submit',function(e){
    e.preventDefault();
    currectSearch = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click",loadMore);

function updateInput(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function generatePictures(data){
    data.photos.forEach((photo) => {
        // console.log(photo);
        let galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
            <div class = "gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}> </img>
            `;
        gallery.appendChild(galleryImg);
      });
}

async function curatedPhotos() {
    let fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink)
    generatePictures(data);
  
}


async function searchPhotos(query){
    clear();
    let fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    // console.log(data);
    generatePictures(data);
}

function clear(){
    gallery.innerHTML = "";
    searchValue.value = "";
}

async function loadMore(){
    page++;
    if(currectSearch){
        fetchLink =  `https://api.pexels.com/v1/search?query=${currectSearch}+query&per_page=15&page=${page}`;
    }
    else{
        fetchLink =  `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();