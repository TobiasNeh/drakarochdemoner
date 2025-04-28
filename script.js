const canvas = document.getElementById('dungeonCanvas');
const ctx = canvas.getContext('2d');
const toolSelector = document.getElementById('tool');
const clearButton = document.getElementById('clearButton');
const cellSize = 20; // Storlek på varje ruta (20px per cell)

// A4-sidans storlek i pixel (baserat på en 72dpi utskriftsupplösning)
const A4Width = 595; // 21 cm
const A4Height = 842; // 29.7 cm

canvas.width = A4Width;
canvas.height = A4Height;

let isMouseDown = false;
let currentTool = 'wall'; // Starta med "Vägg"

const dungeon = [];

// Skapa dungeon-strukturen (vi använder ett 2D-array för att hålla koll på rita objekten)
function createDungeon() {
    const columns = Math.floor(A4Width / cellSize);
    const rows = Math.floor(A4Height / cellSize);
    
    // Skapa dungeon med tomma celler (0 är golv)
    for (let y = 0; y < rows; y++) {
        dungeon[y] = [];
        for (let x = 0; x < columns; x++) {
            dungeon[y][x] = 0; // Starta alla celler som golv
        }
    }
}

// Uppdatera canvasen med dungeon-objekt
function renderDungeon() {
    for (let y = 0; y < dungeon.length; y++) {
        for (let x = 0; x < dungeon[y].length; x++) {
            const value = dungeon[y][x];
            ctx.fillStyle = getColorForTool(value);
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Färger för olika typer av objekt
function getColorForTool(value) {
    switch (value) {
        case 2: return '#c4b39b'; // Vägg
        case 1: return '#d8c4b4'; // Golv
        case 5: return '#ffd700'; // Skatt
        case 6: return '#444444'; // Fälla
        case 7: return '#ff4500'; // Monster
        case 8: return '#9b8a6d'; // Sarkofag
        case 9: return '#8da6b6'; // Sjö
        case 10: return '#98fb98'; // Trädgård
        case 11: return '#a9a9a9'; // Cell
        default: return '#d8c4b4'; // Standard: Golv
    }
}

// Lägg till verktygsval
toolSelector.addEventListener('change', (e) => {
    currentTool = e.target.value;
});

// Dra och rita på canvasen
canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    drawCell(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        drawCell(e);
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Rita en cell
function drawCell(e) {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);

    let newValue = getToolValue(currentTool);

    if (dungeon[y] && dungeon[y][x] !== newValue) {
        dungeon[y][x] = newValue;
        renderDungeon();
    }
}

// Få värdet för det valda verktyget
function getToolValue(tool) {
    switch (tool) {
        case 'wall': return 2;
        case 'floor': return 1;
        case 'treasure': return 5;
        case 'trap': return 6;
        case 'monster': return 7;
        case 'sarcophagus': return 8;
        case 'lake': return 9;
        case 'garden': return 10;
        case 'cellar': return 11;
        default: return 1;
    }
}

// Rensa kartan
clearButton.addEventListener('click', () => {
    createDungeon();
    renderDungeon();
});

// Initialisera dungeon och rendera
createDungeon();
renderDungeon();
