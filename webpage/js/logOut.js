function logOut() {
    sessionStorage.removeItem('userKey');
    location.href = 'login.html';
}