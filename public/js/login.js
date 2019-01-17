
function login() {
	let email = document.getElementById("emailinput").innerText
	let password = document.getElementById("pwdinput").innerText
	console.log(email,password)
	fetch("/api/login/",{
		method: "POST",
		body: {
			email: email,
			password: password
		}

	}).then(data => {
		console.log(data)
		// window.location.href = "/"
	}).catch(error => {
		console.error(error)
	})
}




document.getElementById("loginbtn").addEventListener("click", login())
