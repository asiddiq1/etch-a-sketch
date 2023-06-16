
function createGrid(){
    // standard grid 16x16

    let value = document.querySelector('#value');
    let input = document.querySelector('#gridSize');
    let grid = document.querySelector('#grid');

    gridSize(16, grid);


    input.addEventListener("input", (event) => { //changed size of grid
        value.textContent = `${event.target.value} x ${event.target.value}`;
        let grid = document.querySelector('#grid');
        grid.style["grid-template-columns"] = `repeat(${event.target.value}, 1fr)`;
        grid.style["grid-template-rows"] = `repeat(${event.target.value}, 1fr)`;
        grid.innerHTML = '';
        let size = event.target.value;
        gridSize(size, grid);

        
      });

      
}

function gridSize(size, grid){
    let gridSize = size * size; 
    let gap = size - 1; 
    for (let i = 0; i < gridSize; i++){
        let cell = document.createElement("div");
        cell.id = "cell";
        cell.offsetWidth = (grid.offsetWidth - gap)/size;  //remove gap and divide by of cols
        cell.offsetHeight = (grid.offsetHeight - gap)/size;
        grid.appendChild(cell);
    
    }
    sketchColor();

}


//onclick enable mouseover

function sketchColor(iseraser = false, isretro = false){
    let drag = false; 
    let color = document.querySelector('#color_mode');

    let cells = Array.from(document.querySelectorAll('#cell'));
    for (let cell of cells){

        cell.addEventListener("mousedown", (event) => {
        drag = true;
        if (isretro){
            event.target.style["background-color"] = getRandomColor();
        }
        else if (iseraser){
            event.target.style["background-color"] = "#DADBDB";
        }
        else{
            event.target.style["background-color"] = color.value;
        }
        });

        cell.addEventListener("mouseover", (event) => {
            if (!drag){
                return;
            }
            if (isretro){
                event.target.style["background-color"] = getRandomColor();
            }
            else if (iseraser){
                event.target.style["background-color"] = "#DADBDB";
            }
            else{
                event.target.style["background-color"] = color.value;
            }
        });

        cell.addEventListener("mouseup", () => {
            drag = false;
            if (drag){
                return;
            }
        });

    }
    changeColor();
    clearGrid();

}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

function changeColor() {

    let colors = Array.from(document.querySelectorAll('.color'));
    colors.forEach((color) => { 
        color.addEventListener('click', (event) => {
            colors.forEach((color) => {
                color.style["background-color"] = "white";
            });
            event.target.style["background-color"] = "#FFED6C";
            if (event.target.id == "retro") {
                sketchColor(false, true);
            } else if (event.target.id == "eraser") {
                sketchColor(true, false);
            }
            else{
                sketchColor(false, false);
            }
        });
    });

}


function clearGrid(){
    clearBtn = document.querySelector('.clear');
    let cells = Array.from(document.querySelectorAll('#cell'));
    clearBtn.addEventListener('click', () => {
        for (let cell of cells){
            cell.style["background-color"] = "#DADBDB";
        }

    }); 
}

window.onload = () => {
    createGrid();
}