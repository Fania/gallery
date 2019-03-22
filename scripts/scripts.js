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

  // initial image
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


// console.log("test");

const change = (dir) => {
  console.log("change triggered");
  // need local server
  // const st = document.styleSheets[0].cssRules;
  const originImg = document.querySelector("a.current");
  const originImgId = document.querySelector("a.current img").id;
  const originDiv = document.querySelector("div.current");
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
  originImg.classList.remove("current");
  originDiv.classList.remove("current");
  document.getElementById(`img_${c}`).parentElement.classList.add("current");
  document.getElementById(`get_${c}`).classList.add("current");
	// manipulating CSSOM does not work via Codepen
  // document.styleSheets[0].cssRules[0].style.left = `calc(var(--offset) - (var(--image_width)*${mult}) - (var(--spacebetween)*${mult}))`;
	extra_style.innerHTML = `.gallery .img_row {left: calc(var(--offset) - (var(--image_width)*${mult}) - (var(--spacebetween)*${mult}))}`;
}


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
    const num = event.target.id[4];
    const max = imgs.children.length;
    const mult = (num == 0) ? max : num - 1;
    document.querySelector("a.current").classList.remove("current");
    document.querySelector("div.current").classList.remove("current");
    document.getElementById(`img_${num}`).parentElement.classList.add("current");
    document.getElementById(`get_${num}`).classList.add("current");
		// manipulating CSSOM does not work via Codepen
    // document.styleSheets[0].cssRules[0].style.left = `calc(var(--offset) - (var(--image_width)*${mult}) - (var(--spacebetween)*${mult}))`;
		extra_style.innerHTML = `.gallery .img_row {left: calc(var(--offset) - (var(--image_width)*${mult}) - (var(--spacebetween)*${mult}))}`;
  });
}