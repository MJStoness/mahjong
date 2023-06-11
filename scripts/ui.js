const ui = document.querySelector('#ui');
const coverEl = document.querySelector('#cover');

function WinScreen({score}) {
    let scoreTitle = 'Score: '
    return (
        <>
            <h1>You Won!</h1>
            <p>{ score && scoreTitle + score }</p>
            <button id='resetGame' >Play again!</button>
        </>
    )
}

function LoseScreen({score}) {
    let scoreTitle = 'Score: '
    return (
        <>
            <h1>You Lost!</h1>
            <p>{ score && scoreTitle + score }</p>
            <button id='resetGame' >Try again!</button>
        </>
    )
}

const win = (score) => {
    showUi();
    ReactDOM.render(<WinScreen score={score}/>, ui);
    document.querySelector('#resetGame').onclick = () => {
        resetGame();
    };
}
const lose = () => {
    showUi();
    ReactDOM.render(<LoseScreen/>, ui);
    document.querySelector('#resetGame').onclick = () => {
        resetGame();
    }
}

const cover = () => {
    coverEl.style.visibility = 'visible';
    coverEl.style.pointerEvents = 'all';
    coverEl.style.opacity = 1;
}
const uncover = () => {
    coverEl.style.opacity = 0;
    setTimeout(() => {
        coverEl.style.visibility = 'hidden';
        coverEl.style.pointerEvents = 'none';
    }, 1000);
}

const showUi = () => {
    cover();
    ui.style.visibility = 'visible';
    ui.style.pointerEvents = 'all';
    ui.style.top = '50%';
}
const hideUi = () => {
    uncover();
    ui.style.top = '-100%';
    setTimeout(() => {
        ui.style.visibility = 'hidden';
        ui.style.pointerEvents = 'none';
    }, 1000);
}