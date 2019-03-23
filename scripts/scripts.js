/* customise this list of images if required */

const image_list = [
  ["imgs/img1.jpg", ""],
  ["imgs/img2.jpg", ""],
  ["imgs/img3.jpg", ""],
  ["imgs/img4.jpg", ""],
  ["imgs/img5.jpg", ""]
];

const gallery = document.querySelector(".gallery");
const imgs = document.querySelector(".gallery .img_row");
const mids = document.querySelector(".gallery .mid");
const prev = document.querySelector(".gallery .prev");
const next = document.querySelector(".gallery .next");


// generate HTML from image list
for ( i in image_list ) {
  const img_num = parseInt(i) + 1;  // start from 1, not 0
  let img_tag = `<a href="${image_list[i][1]}"><img id="img_${img_num}" src="${image_list[i][0]}"></a>`;
  let midnav_tag = `<div id="get_${img_num}"></div>`;
  // set initial image
  if (img_num == 2) {
    img_tag = `<a class="current" href="${image_list[i][1]}">
                <img id="img_${img_num}" src="${image_list[i][0]}"></a>`;
    midnav_tag = `<div id="get_${img_num}" class="current"></div>`;
  }
  imgs.insertAdjacentHTML("beforeend", img_tag);
  mids.insertAdjacentHTML("beforeend", midnav_tag);
}
// initial position
// manipulating CSSOM does not work via Codepen
// document.styleSheets[0].insertRule(`.gallery .img_row {left: calc(var(--offset) - (var(--image_width)*${1}) - (var(--spacebetween)*${1}))}`);
// const extra_style = document.getElementById('extra_style');
// const script_tag = document.querySelector('script');
//   script_tag.parentNode.insertBefore(extra_style, script_tag);
const extra_style = document.getElementById('extra_style');
extra_style.innerHTML = `.gallery .img_row {left: calc(var(--offset) - (var(--image_width)*${1}) - (var(--spacebetween)*${1}))}`;




// TOUCH FUNCTIONALITY
const hammertime = new Hammer(gallery);
hammertime.on("swipeleft", ()=> change("next"));
hammertime.on("swiperight", ()=> change("prev"));

// PREV / NEXT BUTTONS
prev.addEventListener("click", ()=> change("prev"));
next.addEventListener("click", ()=> change("next"));

// MIDDLE BUTTONS
for (let i=0; i< mids.children.length; i++) {
  mids.children[i].addEventListener("click", ()=> {
		// console.log("change triggered");
    const num = i + 1;
    const max = imgs.children.length;
    const mult = (num == 0) ? max : num - 1;
    moveImgRow(num, mult);
  });
}




const change = (dir) => {
  // console.log("change triggered");
  const originImgId = document.querySelector("a.current img").id;
  const max = imgs.children.length;
  const o = parseInt(originImgId[4]);
  let c = 2;
  let mult = 1;
  if(dir == "next"){
    c = (o == max) ? 1 : (o + 1);
    mult = (c == 1) ? 0 : o;
  }
  if(dir == "prev"){
    c = (o == 1) ? max : (o - 1);
    mult = (c == max) ? (max - 1) : (c - 1);
  }
  moveImgRow(c, mult);
}


const moveImgRow = (num, mult) => {
  document.querySelector("a.current").classList.remove("current");
  document.querySelector("div.current").classList.remove("current");
  document.getElementById(`img_${num}`).parentElement.classList.add("current");
  document.getElementById(`get_${num}`).classList.add("current");
  // CSSOM needs local server
  // const st = document.styleSheets[0].cssRules;
  // manipulating CSSOM does not work via Codepen
  // document.styleSheets[0].cssRules[0].style.left = `calc(var(--offset) - (var(--image_width)*${mult}) - (var(--spacebetween)*${mult}))`;
  extra_style.innerHTML = `.gallery .img_row {left: calc(var(--offset) - (var(--image_width)*${mult}) - (var(--spacebetween)*${mult}))}`;
}



// USER INPUT AND PREVIEW CODE STUFF

const preview = document.getElementById("code_preview");
const input_style = document.getElementById('input_style');
const form = document.getElementById("settings");
const gw = document.getElementById("gall_width");
const iw = document.getElementById("img_width");
const ih = document.getElementById("img_height");
const sb = document.getElementById("space_between");
const gh = document.getElementById("gall_high");


form.addEventListener("submit", ()=> {

  const code = `
  :root {
    --spacebetween: ${!sb.value=="" ? sb.value : "10px"};
    --image_height: ${!ih.value=="" ? ih.value : "300px"};
    --image_width: ${!iw.value=="" ? iw.value : "30vw"};
    --gallery_width: ${!gw.value=="" ? gw.value : "90vw"};
    --gallery_highlight: ${gh.value};
  }`;

  preview.innerText = code;
  preview.parentElement.style.width = "100%";
  // preview.parentElement.style.width = "50%";

  input_style.innerHTML = code;
  event.preventDefault();
});

