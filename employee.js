let submitButton = document.getElementById("submit-btn"); 
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');
let confirmation = document.getElementById('error-messages');
let idButtons = document.querySelectorAll('input[name="account-type-id"]');
let removeButton = document.getElementById("remove-btn"); 
let accountId = document.getElementById("account-id");
let accountIdInput = document.getElementById("account-id-input");
let emailInput = document.getElementById("email-input"); 
let searchEmailButton = document.getElementById('search-email-btn');
let accountsList = document.getElementById('accounts-tbody');
let unlinkButton = document.getElementById('unlink-btn');


// Set active user

searchEmailButton.addEventListener("click", async () => {
  
  sessionStorage.setItem("email", emailInput.value);
  let email = sessionStorage.getItem("email");

  document.getElementById("accounts-title").innerHTML = "Accounts for " + email;
  document.getElementById("th-1").innerHTML = "ID";
  document.getElementById("th-2").innerHTML = "Balance";
  document.getElementById("th-3").innerHTML = "Type";
  document.getElementById("th-4").innerHTML = "";
  
  console.log('in window load block load-test.js');
      try {
          console.log("in try load-test.js");
          let res = await fetch(`http://${url}:8080/${email}/accounts`, {
          
          'credentials': 'include',
          'method': 'GET',
          'headers': {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
  
          }});
  
          let data = await res.json();
          console.log(data);
          // hello.innerHTML = "";
          // hello.innerHTML = `Hello, ${data.firstName}`;
          // nameDiv.innerHTML = `${data.firstName} ${data.lastName}` 
          // emailDiv.innerHTML = data.email; 
          // phoneDiv.innerHTML = data.phoneNumber; 
          // console.log(data.accounts);
  
          addAccounts(data);

  }
  
  catch(err) {

    accountsList.innerHTML = "";
    accountsList.innerHTML = "You are not logged in!";
    console.log(err);
}


})


function addAccounts(accounts){
  
  let acctsTable = document.getElementById('accounts-tbody');
  acctsTable.innerHTML = '';
  

  for (account of accounts) {
      console.log(account);

      let row = document.createElement('tr');
      let accountId = document.createElement('td');
      accountId.innerHTML = account.accountId;
      // accountId.classList.add("is-success");
      accountId.style.color = 'blue';
      accountId.style.textDecoration = 'underline';

// change table to transactions

      accountId.addEventListener('click', async (e) => {
        sessionStorage.setItem("accountId", e.target.innerHTML)
        let accountId = sessionStorage.getItem("accountId");
        console.log(accountId);
        
        document.getElementById("th-1").innerHTML = "Date";
        document.getElementById("th-2").innerHTML = "Status";
        document.getElementById("th-3").innerHTML = "Amount";
        document.getElementById("th-4").innerHTML = "Description";
        document.getElementById("accounts-title").innerHTML = "Transactions for Account " + accountId;

        try {
          
          let res = await fetch(`http://${url}:8080/trx/account/${accountId}`, {
          
          'credentials': 'include',
          'method': 'GET',
          'headers': {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
  
          }});
  
          let data = await res.json();
          console.log(data);

          addTrx(data);


  }
  
  catch(err) {

    accountsList.innerHTML = "";
    accountsList.innerHTML = "You are not logged in!";
    console.log(err);
}

        

      })
      
      
      
      let type = document.createElement('td');
      type.innerHTML = account.typeName;
      let amount = document.createElement('td');
      amount.innerHTML = `$${(account.balance/100).toFixed(2)}`
      
      row.appendChild(accountId);
      row.appendChild(amount);
      row.appendChild(type);

      acctsTable.appendChild(row);

  }
}


function addTrx(trxs){
  
  let acctsTable = document.getElementById('accounts-tbody');
  acctsTable.innerHTML = '';
  

  for (trx of trxs) {
      console.log(trx);

      let row = document.createElement('tr');
      
      let resolveTime = document.createElement('td');
      resolveTime.innerHTML = trx.resolveTime;

      let type = document.createElement('td');
      type.innerHTML = trx.typeName;
      
      let amount = document.createElement('td');
      amount.innerHTML = `$${(trx.amount).toFixed(2)}`

      let description = document.createElement('td');
      description.innerHTML = trx.description;

      row.appendChild(resolveTime);
      row.appendChild(type);
      row.appendChild(amount);
      row.appendChild(description);
      

      acctsTable.appendChild(row);

  }
}




removeButton.addEventListener('click', async (e) => {
accountId = accountId.value;
let email = localStorage.getItem(email)

let res = await fetch(`http://${url}:8080/accounts/${accountId}`, {
  'credentials': 'include',
  'method': 'DELETE',
  'headers': {
    'Content-Type': 'application/json'
  }
})

if (res.status == 200) {
  confirmation.innerHTML = ""
  let confirmationMessage = document.createElement('p');
  confirmationMessage.innerHTML = "Account deleted successfully!";
  confirmationMessage.style.color = 'green';
  confirmationMessage.style.fontWeight = 'bold';
  confirmation.appendChild(confirmationMessage);

} else if (res.status == 400) {
  confirmation.innerHTML = ""
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


