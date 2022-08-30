console.log("index.js")
let loginBlock = document.getElementById('login-box');

window.addEventListener('load', (e) => {
    if(sessionStorage.getItem("userId") != null){
        loginBlock.remove();
    }
})