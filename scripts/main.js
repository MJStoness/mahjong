generateBoard(board);
recalculateBrightness();
recalculateShift();

const tilesClickables = document.querySelectorAll('.tile-clickable');
let moves = 0;

const checkSides = (tile) => {
    let collisionsLeft = -1;
    let collisionsRight = -1;
    const left = tile.querySelector('.tile-hitbox-left');
    const right = tile.querySelector('.tile-hitbox-right');
    const level = tile.parentElement;
    const tiles = level.querySelectorAll('.tile')
    tiles.forEach(tile2 => {
        if (overlap(left, tile2)) {
            collisionsLeft++;
        }
    })
    tiles.forEach(tile2 => {
        if (overlap(right, tile2)) {
            collisionsRight++;
        }
    })
    if ( collisionsLeft == 0 || collisionsRight == 0 ) return true;
    else return false;
}

const checkTop = (tile) => {
    let collisions = 0;
    const levelPosition = parseInt(tile.getAttribute('data-level'));
    const level = document.querySelectorAll('.level')[levelPosition + 1];
    if ( level ) {
        const tiles = level.querySelectorAll('.tile .tile-clickable')
        tile = tile.querySelector('.tile-clickable');
        tiles.forEach(tile2 => {
            if (overlap(tile, tile2)) {
                collisions++;
            }
        })
        if ( collisions > 0 ) return false;
        else return true;
    } else {
        return true;
    }
}

const calculateAvailableMoves = () => {
    const display = document.querySelector('#display span');
    const tiles = document.querySelectorAll('.tile');
    const freeTiles = [];
    tiles.forEach(tile => {
        //tile.classList.remove('debug');
        if ( checkSides(tile) && checkTop(tile) ) { 
            freeTiles.push(tile.getAttribute('data-pattern-id'));
            //tile.classList.add('debug')
        }
    });
    var count = {};
        freeTiles.forEach(i => {
            count[i] = (count[i]||0) + 1;
        });

    moves = 0;
    for ( let key in count ) {
        if ( count[key] > 1 ) {
            /* console.log(key + ":")
            console.log(count[key])
            console.log(factorial(count[key]) / ( 2 * factorial( count[key] - 2 ))); */
            moves += factorial(count[key]) / ( 2 * factorial( count[key] - 2 ) );
            //console.log('=================')
        }
    }
    //console.log('=================')
    display.innerText = moves;
}

const lose = () => {
    alert('you lost!');
}

const win = () => {
    alert('you won!');
}

const checkState = () => {
    const tileCount = document.querySelectorAll('.tile')?document.querySelectorAll('.tile').length:0;
    if ( moves == 0 && tileCount > 0 ) lose();
    else if ( moves == 0 && tileCount == 0 ) win();
}

calculateAvailableMoves();

tilesClickables.forEach(tilesClickable => {
    const selectTile = (tile) => {
        tile.classList.add('selected');
    }
    const resetTiles = () => {
        const tile = document.querySelector('.tile.selected');
        tile.classList.remove('selected');
    }
    const lift = (tile1, tile2) => {
        const duration = 500 //(ms);
        const board = document.querySelector('.board');
        board.style.pointerEvents = 'none';
        tile1.style.animation = 'lift ' + duration / 1000 + 's ease-out 0.01s 1 forwards';
        tile2.style.animation = 'lift ' + duration / 1000 + 's ease-out 0.01s 1 forwards';
        setTimeout(() => {
            board.style.pointerEvents = 'auto';
            tile1.remove();
            tile2.remove();
            recalculateBrightness();
            calculateAvailableMoves();
            checkState();
        }, duration + 10);
    }
    
    const tile = tilesClickable.parentElement;
    tilesClickable.onclick = () => {
        if ( checkSides(tile) && checkTop(tile) ) {
            if ( !document.querySelector('.tile.selected') ) {
                selectTile(tile);
            } else {
                let selectedTile = document.querySelector('.tile.selected');
                if ( selectedTile.getAttribute('data-pattern-id') == tile.getAttribute('data-pattern-id') && selectedTile != tile ) {
                    resetTiles();
                    lift(tile, selectedTile);
                    
                } else {
                    resetTiles();
                    selectTile(tile);
                }
            }
        } else {

        }
        
    }
});

function overlap(tile1, tile2) {
    const tileRect1 = tile1.getBoundingClientRect();
    const tileRect2 = tile2.getBoundingClientRect();

    return !(
        tileRect1.top > tileRect2.bottom ||
        tileRect1.right < tileRect2.left ||
        tileRect1.bottom < tileRect2.top ||
        tileRect1.left > tileRect2.right
    );
}

function factorial(n) {
    if ( n < 0 )
        return false;
    else if ( n == 0 || n == 1 )
        return 1;
    else {
        let result = 1;
        for ( let i = 1; i <= n; i++ ) {
            result *= i;
        }
        return result;
    }
}