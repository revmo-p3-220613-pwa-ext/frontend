let firstNameInput = document.getElementById('first-regis-input');
let lastNameInput = document.getElementById('last-regis-input');
let passwordInput = document.getElementById('password-regis-input');
let emailInput = document.getElementById('email-regis-input');
let phoneInput = document.getElementById('phone-regis-input');
let submitButton = document.getElementById('redis-btn-2');
let confirmation = document.getElementById('error-messages');
console.log('registration.js')

submitButton.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log(firstNameInput.value)
    console.log(lastNameInput.value)
    console.log(emailInput.value)
    console.log(passwordInput.value)
    console.log(phoneInput.value)

    let res = await fetch(`http://${url}:8080/registration`, {
        'credentials': 'include',
        'method': 'POST',
        // 'headers': {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json'
        // },
        'body': JSON.stringify({
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value,
            "password": passwordInput.value,
            "email": emailInput.value,
            "phoneNumber": phoneInput.value
        })
    })

    console.log(res)

    if (res.status == 201) {

        window.location.href = '/login.html'
    
    } else {
        confirmation.innerHTML = "Invalid Registration"
        let data = await res.json();
        for (const msg of data) {
          let errorElement = document.createElement('p');
          errorElement.innerHTML = msg;
          errorElement.style.color = 'red';
          errorElement.style.fontWeight = 'bold';
          confirmation.appendChild(errorElement);
    } 
    }
});


