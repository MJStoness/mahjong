const tilesClickables = document.querySelectorAll('.tile-clickable');

tilesClickables.forEach(tilesClickable => {
    const checkSides = (tile) => {
        let collisions = 0;
        const row = tilesClickable.parentElement.parentElement;
        const tiles = row.querySelectorAll('.tile')
        tiles.forEach(tile2 => {
            if (overlap(tile, tile2)) {
                collisions++;
            }
        })
        if ( collisions > 2 ) return false;
        else return true;
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
        tile1.style.animation = 'lift ' + duration / 1000 + 's ease-out 0.01s 1';
        tile2.style.animation = 'lift ' + duration / 1000 + 's ease-out 0.01s 1';
        setTimeout(() => {
            board.style.pointerEvents = 'auto';
            tile1.remove();
            tile2.remove();
        }, duration);
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
                    lift(tile, selectedTile)
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