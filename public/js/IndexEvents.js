window.onload=()=>{
    let btnAd=document.getElementById("AdCancel");
    btnAd.onclick=(event)=>{
        event.preventDefault();
        let ad=document.getElementById("ad");
       ad.remove("add");
    } 
let btn1=document.getElementById("btn1");
btn1.onclick=(event)=>{
    event.preventDefault();
    let top=document.getElementById("top");
    top.remove("remove");
}

let heart = document.getElementById("heart");
let person = document.getElementById("user");
let bag = document.getElementById("bag");

let array = [];
array.push(heart);
array.push(person);
array.push(bag);

for (let index = 0; index < array.length; index++) {
    const element = array[index];

    element.onmouseenter = (event) => {
        element.classList.remove("bg-white");
        element.classList.add("bg-light");
    };
    
    element.onmouseleave = (event) => {
        element.classList.remove("bg-light");
        element.classList.add("bg-white");
    };


}
let ham=document.getElementById("ham");
ham.onclick=dropdown;

let dropCancel=document.getElementById("drop-cancel");
dropCancel.onclick=()=>{
    let body=document.body;
    drop.style.transform="translateX(-100%)";
    body.style.overflowY="auto";
}

let lanDp=document.getElementById("lan-dp");
let lan=document.getElementById("lan");

lan.onclick=()=>{
  lanDp.style.transform="translateX(0%)"
  let body=document.body;
  body.style.overflowY="hidden";
}

let lanCancel = document.getElementById("lan-cancel");
lanCancel.onclick=()=>{
    lanDp.style.transform="translateX(200%)";
    let body=document.body;
    body.style.overflowY="auto";
}
}

let dropdown=()=>{
    ham.onclick=()=>{
        let drop=document.getElementById("drop");
        drop.style.transform="translateX(0%)";
        let body=document.body;
        body.style.overflowY="hidden";
    }
}

