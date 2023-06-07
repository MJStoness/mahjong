const levels = document.querySelectorAll('.level');

const opacityMultiplier = 0.08;
const shift = '-6';

let i = levels.length - 1;
let j = 0;
levels.forEach(level => {
    const tiles = level.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.querySelector('img').style.filter = 'brightness(' + ( 1 - (i * opacityMultiplier) ) + ')';
    });
    //level.style.filter = 'brightness(' + ( 1 - (i * opacityMultiplier) ) + ')';
    level.style.transform = 'translate(' + j * shift + 'px, ' + j * shift + 'px)';
    i--;
    j++;
});