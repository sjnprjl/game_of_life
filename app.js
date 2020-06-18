//helper function
const _ = el => {
    return document.querySelector(el);
}
const random = (min , max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const makeGrid = (rows , cols) => {
      return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
        .map(() => random(0 , 1)));
}

let width = window.innerWidth;
let height = window.innerHeight;

const size = 8;

let rows = Math.floor(height / size);
let cols = Math.floor(width / size);


const c = _("canvas");
const ctx = c.getContext("2d");
c.width = width;
c.height = height;

function create() {
    ctx.beginPath();
    ctx.rect(0,0,c.width,c.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
let grid = makeGrid(rows , cols);

function generate(grid) {
    let nextGen = grid.map(arr => [...arr]);
    for(let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            let sum = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(i === 0 && j === 0) {
                        continue;
                    }
                    const x = col + i;
                    const y = row + j;

                    if(x >= 0 && y >= 0 && x < cols && y < rows) {
                        const cN = grid[x][y]
                        sum += cN;
                    }
                }

            }
          if(cell === 1 && sum < 2) nextGen[col][row] = 0;
          else if(cell === 1 && sum > 3) nextGen[col][row] = 0;
          else if(cell === 0 && sum === 3) nextGen[col][row] = 1;
        }

    }
    return nextGen;
}
function draw(grid){
    for(let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            let cell = grid[col][row];
            ctx.beginPath();
            ctx.rect(col * size , row * size , size , size);
            ctx.fillStyle = cell ? '#000' : '#fff';
            ctx.fill();
            ctx.stroke();
        }

    }

}

function update() {
    create();
    grid = generate(grid);
    draw(grid);
}
let animate = new AnimationFrame(20 ,update)
animate.start()
