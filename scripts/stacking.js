const levels = document.querySelectorAll('.level');

const opacityMultiplier = 0.08;
const tileSize = parseInt(getComputedStyle(document.querySelector('.tile')).height);
const shift = -0.0857 * tileSize;


const recalculateBrightness = () => {
    const levels = document.querySelectorAll('.level');
    let i = 0;
    levels.forEach(level => {
        if ( level.querySelector('.tile') ) i++
    });
    //let i = levels.length - 1;

    console.log('rec: ' + i)
    levels.forEach(level => {
        const tiles = level.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.querySelector('img').style.filter = 'brightness(' + ( 1 - (i * opacityMultiplier) ) + ')';
        });
        i--;
    });
}

recalculateBrightness();

let j = 0;
levels.forEach(level => {
    level.style.transform = 'translate(' + j * shift + 'px, ' + j * shift + 'px)';
    j++;
});