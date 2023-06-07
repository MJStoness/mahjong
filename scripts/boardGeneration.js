const boardEl = document.querySelector('.board');
const textures = [
    'tiles/mahjong-autumn-tile-by-Vexels.svg',
    'tiles/mahjong-east-wind-tile-by-Vexels.svg',
    'tiles/mahjong-eight-of-characters-tile-by-Vexels.svg',
    'tiles/mahjong-eight-of-dots-tile-by-Vexels.svg',
    'tiles/mahjong-five-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-four-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-four-of-characters-card-by-Vexels.svg',
    'tiles/mahjong-green-dragon-card-by-Vexels.svg',
    'tiles/mahjong-nine-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-nine-of-characters-tile-by-Vexels.svg',
    'tiles/mahjong-north-wind-tile-by-Vexels.svg',
    'tiles/mahjong-one-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-one-of-dots-tile-by-Vexels.svg',
    'tiles/mahjong-red-dragon-tile-by-Vexels.svg',
    'tiles/mahjong-seven-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-seven-of-characters-tile-by-Vexels.svg',
    'tiles/mahjong-six-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-six-of-characters-card-by-Vexels.svg',
    'tiles/mahjong-south-wind-tile-by-Vexels.svg',
    'tiles/mahjong-spring-tile-by-Vexels.svg',
    'tiles/mahjong-three-of-characters-tile-by-Vexels.svg',
    'tiles/mahjong-two-of-bamboo-tile-by-Vexels.svg',
    'tiles/mahjong-white-dragon-tile-by-Vexels.svg',
    'tiles/mahjong-winter-tile-by-Vexels.svg'
];

const board = [
    [12, 8, 10, 12, 12, 10, 8, 12, 1],
    [0, 6, 6, 6, 6, 6, 6, 0, 0],
    [0, 0, 4, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
]

function generateBoard(board) {
    let tileCount = 0;
    board.forEach(level => {
        level.forEach(row => {
            tileCount += row;
        });
    });
    if ( tileCount%2 != 0 ) return false;

    const chosenTiles = [];
    for( let i = 0; i < tileCount/2; i++ ) {
        let index = Math.floor(Math.random() * textures.length)
        let randomTexture = textures[ index ]
        chosenTiles.push([randomTexture, index]);
        chosenTiles.push([randomTexture, index]);
    }

    console.log(chosenTiles)
    shuffle(chosenTiles);
    console.log(chosenTiles)

    let tileIndex = 0;
    let levelIndex = 0;
    board.forEach(level => {
        let levelEl = document.createElement('div');
        levelEl.classList.add('level');
        level.forEach(row => {
            let rowEl = document.createElement('div');
            rowEl.classList.add('row');
            for(let i = 0; i < row; i++ ) {
                let tileEl = document.createElement('div');
                tileEl.classList.add('tile');
                tileEl.setAttribute('data-level', levelIndex)
                tileEl.setAttribute('data-pattern-id', chosenTiles[tileIndex][1])
                tileEl.innerHTML = '<img src=' + chosenTiles[tileIndex][0] + '>';
                tileEl.innerHTML += '<div class="tile-clickable">';
                tileEl.innerHTML += '<div class="tile-border">';
                tileIndex++;
                rowEl.appendChild(tileEl);
            }
            levelEl.appendChild(rowEl);
            
        });
        boardEl.appendChild(levelEl);
        levelIndex++;
    })
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

generateBoard(board)