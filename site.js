const grid = document.getElementById("grid");
let enable = false;

const inputGridSize = document.getElementById("input-grid-size");
const renderSizeEle = document.getElementById("grid-size");

grid.addEventListener("click", () => {
    enable = !enable;
});

function resetGrid() {
    grid.innerHTML = "";
    createGrid(+inputGridSize.value);
    setCellsPaintable();
}

// Click create new grid
document.getElementById("btn-create-grid").addEventListener("click", resetGrid);

// Click button clear
document.getElementById("btn-clear").addEventListener("click", resetGrid);

const radioBtnCustomColor = document.getElementById("choose-own-color");
const radioBtnRandom = document.getElementById("random");

let color = "#000000";
let updateColorFunc;

radioBtnCustomColor.addEventListener("change", () => {
    if (radioBtnCustomColor.checked) {
        updateColorFunc = () => {
            color = inputColor.value;
        };
    }
});

radioBtnRandom.addEventListener("change", () => {
    if (radioBtnRandom.checked) {
        updateColorFunc = () => {
            color = randomColor();
        };
    }
});

const inputColor = document.getElementById("input-color");
inputColor.addEventListener("change", (e) => {
    if (radioBtnCustomColor.checked) {
        color = e.target.value; 
    }     
});

// default create a grid size 10x10
createGrid(10);
setCellsPaintable();

function setCellsPaintable() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((element) => {
        element.addEventListener("mouseenter", (e) => {
            if (!enable) return;

            if (!e.target.style.backgroundColor) {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            }
        });
        element.addEventListener("mouseleave", (e) => {
            if (!enable) return;

            const cell = e.target;
            if (cell.style.backgroundColor != "" 
                && cell.style.backgroundColor != "rgba(0, 0, 0, 0.2)") {
                return;
            }
            cell.style.backgroundColor = color;

            updateColorFunc();
        });
    });
}

// Random number
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Random Color
function randomColor() {
    let red = randomRange(0, 255);
    let green = randomRange(0, 255);
    let blue = randomRange(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

// Handle event change on input grid size
inputGridSize.addEventListener("change", (e) => {
    const value = e.target.value;
    renderSizeEle.textContent = value + "x" + value; 
});

// Create a grid of cell : n x n
function createGrid(n) {
    const sizeOfCell = grid.clientHeight / n;
    for(let i = 1; i <= n*n; ++i) {
        grid.appendChild(createCell(sizeOfCell));
    }
}

// Create a cell with width and height equal sizeInPx
function createCell(sizeOfCell) {
    const divEle = document.createElement("div");
    divEle.style.height = sizeOfCell + "px";
    divEle.style.width = sizeOfCell + "px";
    divEle.classList.add("cell");
    
    return divEle;
}