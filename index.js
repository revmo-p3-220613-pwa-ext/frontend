console.log("index.js")
let loginBlock = document.getElementById('login-box');

window.addEventListener('load', (e) => {
    if(sessionStorage.getItem("userId") != null){
        loginBlock.remove();
    }
})

let emailLoginInput = document.getElementById("email-login-input");
let passwordLoginInput = document.getElementById("password-login-input");
let loginButton2 = document.getElementById('login-btn-2');
let confirmation = document.getElementById('error-messages');

loginButton2.addEventListener('click', async (e) => {
    console.log("In event listener");
    e.preventDefault()
    let res = await fetch(`http://${url}:8080/login`, {
        'credentials': 'include',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
        },
        'body': JSON.stringify({
            'email': emailLoginInput.value,
            'password': passwordLoginInput.value
        })
    })
    
    if (res.status == 200) {
        let data = await res.json();
        console.log("Logged in!")
        console.log(data);
        sessionStorage.setItem("userRole", data.userRole)
        sessionStorage.setItem("email", data.email)
        sessionStorage.setItem("userId", data.userId)
        let role = sessionStorage.getItem('userRole')
        console.log(role)
        if (sessionStorage.getItem("userRole") == '1') {
            
            window.location.href="./user-page.html"
        }
        else if (sessionStorage.getItem("userRole") == ('2')) {
            window.location.href="./employee.html"
        }
    } else if (res.status == 400) {
        window.location.href="./login.html";
    }

});