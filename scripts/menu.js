const boardsBtn = document.querySelector('#boards-btn');
const userBtn = document.querySelector('#user-btn');

boardsBtn.onclick = () => {
    showBoards();
    const boardList = document.querySelectorAll('.board-list li');

    boardList.forEach(board => {
        board.onclick = () => {
            chosenBoard = parseInt(board.dataset.id);
            document.querySelector('.board-list li.chosen').classList.remove('chosen');
            board.classList.add('chosen');
            resetGame();
        }
    })
}

userBtn.onclick = () => {
    if ( !Object.keys(userData).length ) {
        showLoginForm();
    } else {
        showUserAccount();
    }
}

function recalculateForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const label = document.querySelector('label[for="'+input.id+'"]');
        input.addEventListener('focus', () => {
            if ( label ) label.classList.add('focused');
        })

        input.addEventListener('blur', () => {
            if ( label ) label.classList.remove('focused');
        })
    })
}

function closeBtn() {
    const btn = document.querySelector('.close-btn')
    if ( btn ) {
        btn.onclick = () => {
            hideUi()
        };
    }
}