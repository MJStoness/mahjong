let userData = {};
let foundFriends = {};
let friends = {};
let friendsData = []
let friendData = []
const notificationTime = 4000;

function login() {
    const username = document.querySelector('input#username').value;
    const passwd = document.querySelector('input#passwd').value;

    const data = new FormData();
    data.append('username', username);
    data.append('passwd', passwd);

    fetch('php_scripts/login.php', {
        method: 'POST',
        body: data})
    .then( response => {
        return response.text()
    }).then( data => {
        let response = JSON.parse(data);
        document.querySelector('#loginErrorMsg').innerText = response.error.loginerror || '';

        if ( response.success && response.data ) {
            hideUi();
            userData = response.data;
        }

        if ( response.notification ) {
            iziToast.show({
                title: response.notification.title,
                message: response.notification.msg,
                color: response.notification.color || 'red',
                position: 'topRight',
                timeout: notificationTime
            });
        }

    }).catch( (err) => {
        
    });
}

function signup() {
    const email = document.querySelector('input#email').value;
    const username = document.querySelector('input#username').value;
    const passwd1 = document.querySelector('input#passwd').value;
    const passwd2 = document.querySelector('input#passwd-r').value;

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('passwd1', passwd1);
    data.append('passwd2', passwd2);

    fetch('php_scripts/signup.php', {
        method: 'POST',
        body: data})
    .then( response => {
        return response.text()
    }).then( data => {
        let response = JSON.parse(data);
        document.querySelector('#emailErrorMsg').innerText = response.error.emailerror || '';
        document.querySelector('#usernameErrorMsg').innerText = response.error.usernameerror || '';
        document.querySelector('#passwdErrorMsg').innerText = response.error.passwderror || '';

        if ( response.success ) {
            showLoginForm();
        }

        if ( response.notification ) {
            iziToast.show({
                title: response.notification.title,
                message: response.notification.msg,
                color: response.notification.color || 'red',
                position: 'topRight',
                timeout: notificationTime
            });
        }

    }).catch( (err) => {
        
    });
}

function logOut() {
    fetch('php_scripts/logout.php', {
        method: 'POST',
    }).then( response => {
        return response.text()
    }).then( data => {
        let response = JSON.parse(data);

        if ( response.success ) {
            hideUi();
            userData = {};
        }

        if ( response.notification ) {
            iziToast.show({
                title: response.notification.title,
                message: response.notification.msg,
                color: response.notification.color || 'red',
                position: 'topRight',
                timeout: notificationTime
            });
        }

    }).catch( (err) => {
        
    });
}

function updateGames(win) {
    const data = new FormData();
    data.append('win', win);

    fetch('php_scripts/updateGames.php', {
        method: 'POST',
        body: data})
    .then( response => {
        return response.text()
    }).then( data => {
        let response = JSON.parse(data);


        if ( response.notification ) {
            iziToast.show({
                title: response.notification.title,
                message: response.notification.msg,
                color: response.notification.color || 'red',
                position: 'topRight',
                timeout: notificationTime
            });
        }

    }).catch( (err) => {
        
    });
}

async function getUserData() {
    return new Promise((resolve) => {
        fetch('php_scripts/getUserData.php', {
            method: 'POST',
        }).then( response => {
            return response.text()
        }).then( data => {
            let response = JSON.parse(data);
        
            if ( response.success && response.data ) {
                userData = response.data;
                resolve(true);
            }
            
            if ( response.notification ) {
                iziToast.show({
                    title: response.notification.title,
                    message: response.notification.msg,
                    color: response.notification.color || 'red',
                    position: 'topRight',
                    timeout: notificationTime
                });
            }
        
        }).catch( (err) => {
            
        });
    })
}

async function getFriendData(fid) {
    const data = new FormData();
    data.append('fid', fid);

    return new Promise((resolve) => {
        fetch('php_scripts/getFriendData.php', {
            method: 'POST',
            body: data
        }).then( response => {
            return response.text()
        }).then( data => {
            let response = JSON.parse(data);
        
            if ( response.success && response.data ) {
                friendData = response.data;
                resolve(true);
            }
            
            if ( response.notification ) {
                iziToast.show({
                    title: response.notification.title,
                    message: response.notification.msg,
                    color: response.notification.color || 'red',
                    position: 'topRight',
                    timeout: notificationTime
                });
            }
        
        }).catch( (err) => {
            
        });
    })
}

async function getFriends() {
    return new Promise((resolve) => {
        fetch('php_scripts/getFriends.php', {
            method: 'POST',
        }).then( response => {
            return response.text()
        }).then( data => {
            let response = JSON.parse(data);
        
            if ( response.success ) {
                friendsData = response.data;
                resolve(true);
            }
            
            if ( response.notification ) {
                iziToast.show({
                    title: response.notification.title,
                    message: response.notification.msg,
                    color: response.notification.color || 'red',
                    position: 'topRight',
                    timeout: notificationTime
                });
            }
        
        }).catch( (err) => {
            
        });
    })
}

async function removeFriend(id) {
    const data = new FormData();
    data.append('fid', id)

    return new Promise((resolve) => {
        fetch('php_scripts/removeFriend.php', {
            method: 'POST',
            body: data
        }).then( response => {
            return response.text()
        }).then( data => {
            let response = JSON.parse(data);
    
            
            if ( response.notification ) {
                iziToast.show({
                    title: response.notification.title,
                    message: response.notification.msg,
                    color: response.notification.color || 'red',
                    position: 'topRight',
                    timeout: notificationTime
                });
            }

            resolve(true);
        
        }).catch( (err) => {
            
        });
    })
}

async function findFriends(query) {
    const data = new FormData();
    data.append('query', query)

    return new Promise((resolve) => {
        fetch('php_scripts/findFriends.php', {
            method: 'POST',
            body: data
        }).then( response => {
            return response.text()
        }).then( data => {
            let response = JSON.parse(data);

            if ( response.success ) {
                foundFriends = response.data;
            }

            resolve(true);
        
        }).catch( (err) => {
            
        });
    })
}

async function inviteFriend(fid) {
    console.log(fid)
    const data = new FormData();
    data.append('fid', fid)

    return new Promise((resolve) => {
        fetch('php_scripts/inviteFriend.php', {
            method: 'POST',
            body: data
        }).then( response => {
            return response.text()
        }).then( data => {
            let response = JSON.parse(data);

            if ( response.notification ) {
                iziToast.show({
                    title: response.notification.title,
                    message: response.notification.msg,
                    color: response.notification.color || 'red',
                    position: 'topRight',
                    timeout: notificationTime
                });
            }

            resolve(true);
        
        }).catch( (err) => {
            
        });
    })
}