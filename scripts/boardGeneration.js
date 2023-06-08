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
    [15, 8, 10, 12, 12, 10, 8, 15, 1],
    [0, 6, 6, 6, 6, 6, 6, 0, 0],
    [0, 0, 4, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
]

const board1 = [
    [ 
        [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],
        [3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],
        [2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
        [0, 3.5],
        [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],
        [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],
        [13, 3.5], [14, 3.5],
        [2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],
        [3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
        [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7]
    ],
    [
        [4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
        [4,2],[5,2],[6,2],[7,2],[8,2],[9,2],
        [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],
        [4,4],[5,4],[6,4],[7,4],[8,4],[9,4],
        [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],
        [4,6],[5,6],[6,6],[7,6],[8,6],[9,6],
    ],
    [
        [5,2],[6,2],[7,2],[8,2],
        [5,3],[6,3],[7,3],[8,3],
        [5,4],[6,4],[7,4],[8,4],
        [5,5],[6,5],[7,5],[8,5],
    ],
    [
        [6,3],[7,3],
        [6,4],[7,4],
    ],
    [
        [6.5, 3.5]
    ]
]


function generateBoard(board) {
    let tileCount = 0;
    board.forEach(level => {
        tileCount += level.length;
    });
    if ( tileCount%2 != 0 ) return false;

    const chosenTiles = [];
    for( let i = 0; i < tileCount/2; i++ ) {
        let index = Math.floor(Math.random() * textures.length)
        let randomTexture = textures[ index ]
        chosenTiles.push([randomTexture, index]);
        chosenTiles.push([randomTexture, index]);
    }
    shuffle(chosenTiles);

    const tileLeft = 6.666; //(%)
    const tileTop = 11.111; //(%)

    let tileIndex = 0;
    let levelIndex = 0;
    board.forEach(level => {
        console.log(level)
        let levelEl = document.createElement('div');
        levelEl.classList.add('level');
        level.forEach(tile => {
            let tileEl = document.createElement('div');
            tileEl.classList.add('tile');
            tileEl.setAttribute('data-level', levelIndex)
            tileEl.setAttribute('data-pattern-id', chosenTiles[tileIndex][1])
            tileEl.innerHTML = '<img src=' + chosenTiles[tileIndex][0] + '>';
            tileEl.innerHTML += '<div class="tile-clickable">';
            tileEl.innerHTML += '<div class="tile-border">';
            tileEl.innerHTML += '<div class="tile-hitbox-left">';
            tileEl.innerHTML += '<div class="tile-hitbox-right">';
            tileEl.style.top = tile[1] * tileTop + '%';
            tileEl.style.left = tile[0] * tileLeft + '%';
            tileIndex++;
            levelEl.appendChild(tileEl);
        });
        boardEl.appendChild(levelEl);
        levelIndex++;
    });
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