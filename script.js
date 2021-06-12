let header = document.querySelector("header");
let homepage = document.querySelector(".homepage");
let Services = document.querySelectorAll(".service");
let project1 = document.querySelector(".project1");
let project2 = document.querySelector(".project2");
let project3 = document.querySelector(".project3");
let parentWhiteboard = document.querySelector(".parent-whiteboard");
let googleSearchInput = document.querySelector(".buscar-txt");
let googleSearchBtn = document.querySelector(".buscar-btn");
let readMoreBtn = document.querySelector(".service div button");
let closebutton = document.querySelector(".project1 .div-cross-btn");
let newtabopen = document.querySelector(".newtabopen");


// let service = document.querySelector('seric')
document.querySelector(".homepage-right").addEventListener("mousemove", eyeball);
function eyeball(event) {
  let border = document.querySelector(".homepage-right").getBoundingClientRect();
  let left = border.left;
  let right = border.right;
  let topofsset = border.top;
  let bottom = border.bottom;

  let x = event.clientX;
  let y = event.clientY;
  // console.log(topofsset,bottom,y);

  if (x > left && x < right && y > topofsset && y < bottom) {
    var eye = document.querySelectorAll(".inner");
    eye.forEach(function (eye) {
      let x = eye.getBoundingClientRect().left;
      let y = eye.getBoundingClientRect().top;
      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rot = radian * (180 / Math.PI) * -1 + 90;

      eye.style.transform = "rotate(" + rot + "deg)";
    });
  } else if (x < left) {
    let inner = document.querySelectorAll(".inner");
    for (let i = 0; i < inner.length; i++) {
      inner[i].style.height = "5px";
      inner[i].style.width = "18px";
    }
  }
}

////////////////////////////////////////////////////////////////////
Services.forEach((service) => {
  service.addEventListener("click", () => {
    let myId = service.getAttribute("myId");
    console.log(myId);
    if (myId == 1) {
      project1.style.display = "block";
      project2.style.display = "none";
      project3.style.display = "none";
      
      let atag = document.querySelector(".colorATag");
      atag.click();
      atag.remove();
      
    }

    if (myId == 2) {
      project1.style.display = "none";
      project2.style.display = "block";
      project3.style.display = "none";
      
      let atag = document.querySelector(".photonATag");
      atag.click();
      atag.remove();
      
      
      
    } else if (myId == 3) {
      project1.style.display = "none";
      project2.style.display = "none";  
      let atag = document.querySelector(".moverATag");
      setTimeout(() => {
        project3.style.display = "block";
        atag.click();
        
        
        document.body.setAttribute("scroll", "no");
        document.body.style.overflow = "hidden";
        atag.remove();
      }, 500);
      
    }
  });
});

window.addEventListener("scroll", function () {
  let { bottom } = homepage.getBoundingClientRect();
  console.log(bottom);
  if (bottom <= 200 && bottom >= -1100) {
    header.classList.add("fixed");
    header.classList.remove("not-fixed");
  } else if (bottom >= -1200) {
    header.classList.add("not-fixed");
    header.classList.remove("fixed");
  } else {
    if (header.classList.contains("fixed")) {
      header.classList.remove("fixed");
      header.classList.remove("not-fixed");
    }
  }
});


window.onload = () =>{
    setTimeout(() => {
        document.body.setAttribute("scroll", "yes");
        document.body.style.overflow = "visible";
    }, 5000);
    window.scrollTo(0, 0);
    // document.body.top = 0;
    document.body.setAttribute("scroll", "no");
    document.body.style.overflow = "hidden";
}


let names = ["Creative" , "Innovative" , "Positive" , "Out Of The Box"];
let idx = 0;
let word = names[idx];
let text = "";
let isDeleting = false;

let changingText = document.querySelector("#changing-text");

function typeWords(){
  if(isDeleting && text.length == 0){
      idx = (idx+1) % names.length;
      word = names[idx];
      isDeleting = false;
  }

  if(text.length == word.length){
      isDeleting = true;
  }
    
  text = isDeleting ? word.substring(0 , text.length-1) : word.substring(0 , text.length+1);
  changingText.innerHTML = text;
  setTimeout(typeWords ,  text.length == word.length ? 1000 : 100);
}
typeWords();

googleSearchBtn.addEventListener("click",()=>{
  let url = 'https://www.google.com/search?q=' + googleSearchInput.value;
  window.open(url);
  googleSearchInput.value = "";
})

googleSearchInput.addEventListener("keydown",(e)=>{
  if(e.key == "Enter"){
    let url = 'https://www.google.com/search?q=' + googleSearchInput.value;
    window.open(url);
    googleSearchInput.value = "";
  }
})

function crossbtn(){

  project1.style.display = "none";
  project2.style.display = "none";
  project3.style.display = "none";
  document.body.setAttribute("scroll", "yes");
  document.body.style.overflow = "visible";
}


newtabopen.addEventListener("click",() =>{
  setTimeout(()=>{
    crossbtn();
  },1000)
})