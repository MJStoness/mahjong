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

function generateBoard(board) {
    boardEl.innerHTML = '';
    if ( board.tileCount%2 != 0 ) return false;

    const chosenTiles = [];
    for( let i = 0; i < board.tileCount/2; i++ ) {
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
    board.layout.forEach(level => {
        let levelEl = document.createElement('div');
        levelEl.classList.add('level');
        level.forEach(tile => {
            let tileEl = document.createElement('div');
            tileEl.classList.add('tile');
            tileEl.setAttribute('data-level', levelIndex)
            tileEl.setAttribute('data-pattern-id', chosenTiles[tileIndex][1])
            tileEl.innerHTML = '<img src=' + chosenTiles[tileIndex][0] + '>';
            /* tileEl.innerHTML += '<div class="tile-clickable">'+chosenTiles[tileIndex][1]+'</div>'; */
            tileEl.innerHTML += '<div class="tile-clickable"></div>';
            tileEl.innerHTML += '<div class="tile-border"></div>';
            tileEl.innerHTML += '<div class="tile-hitbox-left"></div>';
            tileEl.innerHTML += '<div class="tile-hitbox-right"></div>';
            tileEl.style.top = tile[1] * tileTop + '%';
            tileEl.style.left = tile[0] * tileLeft + '%';
            tileIndex++;
            levelEl.appendChild(tileEl);
        });
        boardEl.appendChild(levelEl);
        levelIndex++;
    });

    /* let delay = 0;
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => {
        tile.style.animation = 'tile-in 0.02s ease-out ' + delay + 's 1 forwards';
        setTimeout(() => {
            tile.style.animation = '';
        }, 20 + delay * 1000);
        delay += 0.01;
    }); */
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