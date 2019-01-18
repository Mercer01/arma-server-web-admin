function login () {
  let email = document.getElementById('email_input').value
  let password = document.getElementById('password_input').value
  let login_form = document.getElementById("login-form")
  if(!login_form.checkValidity()){
    return
  }
  console.log(email, password)

  const data = { 'email': email, 'password': password };
  (async () => {
    const rawResponse = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await rawResponse.json()
    console.log(json)
    if (rawResponse.status === 403) {
      let error_div = document.getElementById('error_div')
      error_div.textContent = json.msg
      error_div.classList.remove('fade')
      console.log('Unfaded')
    }
  })();
}

document.getElementById('loginbtn').addEventListener('click', login)
