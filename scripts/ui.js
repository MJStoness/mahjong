const ui = document.querySelector('#ui');
const coverEl = document.querySelector('#cover');

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

function Back() {
    return (
        <>
            <div className='back-btn btn-sound'>
                <i class="fa-solid fa-chevron-left"></i>
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

                <p id='friendsDisplay' className='btn-sound'><i class="fa-solid fa-user-group"></i>: {userData.friendCount}</p>
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

            <p className='tiny-btn btn-sound' id='logout-btn'>Log out</p>
        </>
    )
}

function FriendAccount() {
    return (
        <>
            <Close />
            <Back />

            <h1>Profile:</h1>
            <div id='userDataDisplay'>
                <div className='row'>
                    <img className='pfpDisplay' src={friendData.pfp}></img>
                    <div>
                        <p className='usernameDisplay'>{friendData.username}</p>
                        <p className='userDateDisplay'>Joined: <br/> {friendData.joined}</p>
                    </div>
                </div>

                <p id='friendsDisplay'><i class="fa-solid fa-user-group"></i>: {friendData.friendCount}</p>
                <table>
                    <tr>
                        <td colspan='2'>Games played: {friendData.gamesPlayed}</td>
                    </tr>
                    <tr>
                        <td id='winsDisplay'><i class="fa-solid fa-trophy"></i>: {friendData.wins}</td>
                        <td id='losesDisplay'><i class="fa-solid fa-skull"></i>: {friendData.loses}</td>
                    </tr>
                    <tr>
                        <td colspan='2'>Efficiency: {friendData.gamesPlayed == 0 ? 0 : Math.round(friendData.wins / friendData.gamesPlayed * 100)}%</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

function Friend({friend}) {
    return (
        <li data-fid={`${friend.id}`}>
            <img src={`userData/profile_pictures/${friend.profilePicture}`} className='friendPfp' />
            {friend.username}
            <div class='friend-menu'>
                <div className='icon-btn delete-btn'>
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div className='icon-btn confirm-btn hidden' data-fid={`${friend.id}`}>
                    <i class="fa-solid fa-check"></i>
                </div>
                <div className='icon-btn cancel-btn hidden'>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </li>
    )
}

function AddFriend({friend}) {
    return (
        <li>
            <img src={`userData/profile_pictures/${friend.profilePicture}`} className='friendPfp' />
            {friend.username}
            <div class='friend-menu'>
                <div className='icon-btn invite-btn' data-fid={`${friend.user_id}`}>
                    <i class="fa-solid fa-user-plus"></i>
                </div>
            </div>
        </li>
    )
}

function NoFriends() {
    return (
        <p>You have no friends! <br /><i class="fa-solid fa-face-sad-tear"></i></p>
    )
}

function FriendsScreen({friends}) {
    return (
        <>
            <Close />
            <Back />

            <h1>Friends: </h1>

            <ul id='friend-list'>
                {friends.length ? friends.map(friend => 
                    <Friend friend={friend} />
                ) : <NoFriends />}
            </ul>
            <div id='add-friends'>
                <i class="fa-solid fa-user-plus"></i>
                {friends.length ? '' : 'Add some!' }
            </div>
        </>
    )
}

function SearchBar() {
    return (
        <div className='search-bar'>
            <input type='text'/>
            <div id='search-btn'>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}

function AddFriends() {
    return (
        <>
            <Close />
            <Back />

            <h1>Find friends: </h1>
            <SearchBar />

            <ul id='friend-list'>
            {foundFriends.length ? foundFriends.map(friend => 
                    <AddFriend friend={friend}/>
                ) : ''}
            </ul>
        </>
    )
}

const toggleFriendMenu = (el) => {
    const btns = [
        el.parentNode.querySelector('.confirm-btn'),
        el.parentNode.querySelector('.cancel-btn'),
        el.parentNode.querySelector('.delete-btn')
    ]

    btns.map(btn => {btn.classList.toggle('hidden')})
}

const showFriends = async () => {
    await getFriends();
    ReactDOM.render(<FriendsScreen friends={friendsData}/>, ui);
    showUi();
    document.querySelector('#ui .back-btn').onclick = () => {showUserAccount()}
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => {toggleFriendMenu(btn)}
    })
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.onclick = () => {toggleFriendMenu(btn)}
    })
    document.querySelectorAll('.confirm-btn').forEach(btn => {
        btn.onclick = async () => {
            await removeFriend(btn.dataset.fid);
            showFriends();
        }
    })
    document.querySelectorAll('#friend-list li').forEach(btn => {
        btn.onclick = () => {showFriendAccount(btn.dataset.fid)}
    })
    document.querySelector('#add-friends').onclick = () => {showAddFriends()}
}

const showAddFriends = async () => {
    if ( !foundFriends.length ) {
        await findFriends('');
    }
    ReactDOM.render(<AddFriends />, ui);
    showUi();
    document.querySelector('#ui .back-btn').onclick = () => {showFriends()}
    document.querySelectorAll('.invite-btn').forEach(btn => {
        btn.onclick = () => {inviteFriend(btn.dataset.fid)}
    })
    document.querySelector('#search-btn').onclick = async () => {
        await findFriends(document.querySelector('#search-btn').parentNode.querySelector('input').value);
        showAddFriends();
    }
}

const showLoginForm = () => {
    ReactDOM.render(<LogInScreen/>, ui);
    showUi();
    recalculateForm();
    document.querySelector('#login-btn').onclick = () => {login()}
    document.querySelector('#sign-up-btn').onclick = () => {showSignupForm()}
}

const showSignupForm = () => {
    ReactDOM.render(<SignUpScreen/>, ui);
    showUi();
    recalculateForm();
    console.log(document.querySelector('#signup-btn'))
    document.querySelector('#signup-btn').onclick = () => {signup()}
    document.querySelector('#log-in-btn').onclick = () => {showLoginForm()}
}

const showUserAccount = async () => {
    await getUserData();
    ReactDOM.render(<UserAccount/>, ui);
    document.querySelector('#logout-btn').onclick = () => {logOut()}
    document.querySelector('#friendsDisplay').onclick = () => {showFriends()}
    showUi();
}

const showFriendAccount = async (fid) => {
    await getFriendData(fid);
    ReactDOM.render(<FriendAccount/>, ui);
    showUi();
    document.querySelector('#ui .back-btn').onclick = () => {showFriends()}
}

const showBoards = () => {
    ReactDOM.render(<Boards boards={boards}/>, ui);
    showUi();
}

const win = (score) => {
    ReactDOM.render(<WinScreen score={score}/>, ui);
    document.querySelector('#resetGame').onclick = () => {resetGame()}
    showUi();
    updateGames(1);
}
const lose = () => {
    ReactDOM.render(<LoseScreen/>, ui);
    document.querySelector('#resetGame').onclick = () => {resetGame()}
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

showAddFriends()