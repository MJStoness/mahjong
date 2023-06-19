const boardsBtn = document.querySelector('#boards-btn')

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