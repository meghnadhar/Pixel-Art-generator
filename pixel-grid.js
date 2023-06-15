//Initial references
let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

//Events Object
let events={
    mouse:{
        down:"mousedown",
        move:"mousemove",
        up:"mouseup"
    },
    touch:{
        down:"touchstart",
        move:"touchmove",
        up:"touchend"
    }
}

//Detect if device touch-enabled
let deviceType="";

const isTouchDevice = () =>{
    try{
        document.createEvent("TouchEvent");
        deviceType="touch"
        return true;
    }catch(e){
        deviceType="mouse";
        return false;
    }
}

isTouchDevice();

//Read and write width and height input values
gridWidth.addEventListener("input",()=>{
    widthValue.innerHTML= gridWidth.value<=9? `0${gridWidth.value}`: gridWidth.value;
})
gridHeight.addEventListener("input",()=>{
    heightValue.innerHTML = gridHeight.value<=9 ? `0${gridHeight.value}` : gridHeight.value;
    
})

//Creating grid container for art
let draw=false; erase=false;

gridButton.addEventListener("click",()=>{
    container.innerHTML="";
    let container_span= document.createElement("span");
    container_span.classList.add("error-msg")
    container_span.innerText="";
    let count=0;

    if(gridHeight.value<=0 && gridWidth.value<=0){
        container_span.innerText='Oh no ! Did you forget to select the width and height for your grid?'
        container.appendChild(container_span);
    }
    else if(gridHeight.value<=0){
        container_span.innerText='You need to select the height of the grid too!';
        container.appendChild(container_span);
    }
    else if(gridWidth.value<=0){
        container_span.innerText='You need to select the width of the grid !';
        container.appendChild(container_span);
    }

    for(let i=1;i<=gridHeight.value;i++){
        //create rows without id
        let div= document.createElement("div");
        div.classList.add("gridRow");

        //create columns for each row with unique id
        for(let j=1;j<=gridWidth.value;j++){
            count++;
            let col= document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id",`gridCol${count}`);
            //user event to draw
            col.addEventListener(events[deviceType].down,()=>{
                draw=true;
                if(erase){
                    col.style.backgroundColor="transparent";
                }
                else{
                    col.style.background=colorButton.value;
                }
            })
            //needs work
            col.addEventListener(events[deviceType].move, (e) => {
                /* elementFromPoint returns the element at x,y position of mouse */
                let elementId = document.elementFromPoint(
                  !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                  !isTouchDevice() ? e.clientY : e.touches[0].clientY
                )?.id;
                //checker
                checker(elementId);
              });
            //user event to stop drawing
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
              });
            div.appendChild(col)
        }
        container.appendChild(div)
    }
})
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    //loop through all boxes
    gridColumns.forEach((element) => {
      //if id matches then color
      if (elementId == element.id) {
        if (!erase) {
          element.style.backgroundColor = colorButton.value;
        } else if (erase) {
          element.style.backgroundColor = "transparent";
        }
      }
    });
  }

//clear grid
clearGridButton.addEventListener("click",()=>{
    container.innerHTML=""
})
//erase paint
eraseBtn.addEventListener("click",()=>{
    erase=true;
})
//Paint button
paintBtn.addEventListener("click",()=>{
    erase=false;
})
window.onload=()=>{
    gridWidth.value=0;
    gridHeight.value=0;
}