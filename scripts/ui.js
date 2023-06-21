const ui = document.querySelector('#ui');
const coverEl = document.querySelector('#cover');

const loggedIn = false;

function WinScreen({score}) {
    let scoreTitle = 'Score: '
    return (
        <>
            <h1>You Won!</h1>
            <p>{ score && scoreTitle + score }</p>
            <button id='resetGame' className='btn-sound'>Play again!</button>
        </>
    )
}

function LoseScreen({score}) {
    let scoreTitle = 'Score: '
    return (
        <>
            <h1>You Lost!</h1>
            <p>{ score && scoreTitle + score }</p>
            <button id='resetGame' className='btn-sound'>Try again!</button>
        </>
    )
}

function Close() {
    return (
        <>
            <div className='spacer'></div>
            <div className='close-btn btn-sound'>
                <i class="fa-solid fa-xmark"></i>
            </div>
        </>
    )
}

function BoardPreview({board, index}) {
    return (
        index == chosenBoard?<li className='chosen btn-sound' data-id={`${index}`}>{board.name}</li>:<li className='btn-sound' data-id={`${index}`}>{board.name}</li>
    )
}

function Boards({boards}) {
    return (
        <>
            <Close />

            <h1>Choose a board:</h1>
            <div id='stock-boards' className='board-list'>
                <h2>Stock Layouts:</h2>
                <ul className='interactive-list'>
                    { boards.map((board, index) => 
                        <BoardPreview board={board} index={index}/>)}
                </ul>
            </div>
        </>
    )
}

function SignUpScreen() {
    return (
        <>
            <Close />

            <h1>Sign up:</h1>
            <form id='signup-form'>
                <label for='email' className='btn-sound'>email: </label>
                <input id='email' type='email' className='btn-sound'></input>
                <p className='errorMsg' id='emailErrorMsg'></p>

                <label for='username' className='btn-sound'>username: </label>
                <input id='username' type='text' className='btn-sound'></input>
                <p className='errorMsg' id='usernameErrorMsg'></p>

                <label for='passwd' className='btn-sound'>password: </label>
                <input id='passwd' type='password' className='btn-sound'></input>
                <p className='errorMsg' id='passwdErrorMsg'></p>

                <label for='passwd-r' className='btn-sound'>repeat password: </label>
                <input id='passwd-r' type='password' className='btn-sound'></input>

                <button className='btn-sound' type='button' id='signup-btn'>Sign Up!</button>
            </form>

            <p id='log-in-btn' className='tiny-btn btn-sound'>Log In!</p>
        </>
    )
}

function LogInScreen() {
    return (
        <>
            <Close />

            <h1>Log in:</h1>

            <form>
                <label for='username' className='btn-sound'>username (or email): </label>
                <input id='username' type='text' className='btn-sound'></input>

                <label for='passwd' className='btn-sound'>password: </label>
                <input id='passwd' type='password' className='btn-sound'></input>
                <p className='errorMsg' id='loginErrorMsg'></p>

                <button className='btn-sound' type='button' id='login-btn'>Log In!</button>
            </form>

            <p id='sign-up-btn' className='tiny-btn btn-sound' >Sign Up!</p>
        </>
    )
}

function UserAccount() {
    return (
        <>
            <Close />

            <h1>Profile:</h1>
            <div id='userDataDisplay'>
                <div className='row'>
                    <img className='pfpDisplay' src={userData.pfp}></img>
                    <div>
                        <p className='usernameDisplay'>{userData.username}</p>
                        <p className='userDateDisplay'>Joined: <br/> {userData.joined}</p>
                    </div>
                </div>
                <table>
                    <tr>
                        <td colspan='2'>Games played: {userData.gamesPlayed}</td>
                    </tr>
                    <tr>
                        <td id='winsDisplay'><i class="fa-solid fa-trophy"></i>: {userData.wins}</td>
                        <td id='losesDisplay'><i class="fa-solid fa-skull"></i>: {userData.loses}</td>
                    </tr>
                    <tr>
                        <td colspan='2'>Efficiency: {userData.gamesPlayed == 0 ? 0 : Math.round(userData.wins / userData.gamesPlayed * 100)}%</td>
                    </tr>
                </table>
            </div>

            <p className='tiny-btn' id='logout-btn'>Log out</p>
        </>
    )
}

const showLoginForm = () => {
    ReactDOM.render(<LogInScreen/>, ui);
    showUi();
    recalculateForm();
    document.querySelector('#login-btn').onclick = () => {
        login();
    }
    document.querySelector('#sign-up-btn').onclick = () => {
        showSignupForm();
    }
}

const showSignupForm = () => {
    ReactDOM.render(<SignUpScreen/>, ui);
    showUi();
    recalculateForm();
    document.querySelector('#signup-btn').onclick = () => {
        signup();
    }
    document.querySelector('#login-btn').onclick = () => {
        showLoginForm();
    }
}

const showUserAccount = () => {
    getUserData();
    setTimeout(() => {
        ReactDOM.render(<UserAccount/>, ui);
        document.querySelector('#logout-btn').onclick = () => {
            logOut();
        }
        showUi();
    }, 10);
}

const showBoards = () => {
    ReactDOM.render(<Boards boards={boards}/>, ui);
    showUi();
}

const win = (score) => {
    ReactDOM.render(<WinScreen score={score}/>, ui);
    document.querySelector('#resetGame').onclick = () => {
        resetGame();
    };
    showUi();
    updateGames(1);
}
const lose = () => {
    ReactDOM.render(<LoseScreen/>, ui);
    document.querySelector('#resetGame').onclick = () => {
        resetGame();
    };
    showUi();
    updateGames(0);
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
    updateBtnSounds();
    closeBtn();
}
const hideUi = () => {
    uncover();
    ui.style.top = '-100%';
    setTimeout(() => {
        ui.style.visibility = 'hidden';
        ui.style.pointerEvents = 'none';
    }, 1000);
}