function login () {
  let email = document.getElementById('email_input').value
  let password = document.getElementById('password_input').value
  console.log(email, password)

  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/api/login', true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(`email=${email}&password=${password}`)

  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
      console.log(this.status)
      console.log(typeof (this.status))
      console.log(this.responseText)
      if (this.status === 403) {
        let error_div = document.getElementById('error_div')
        error_div.textContent = this.responseText
        error_div.classList.remove('fade')
        console.log('Unfaded')
      }
    }
  }
}

document.getElementById('loginbtn').addEventListener('click', login)
