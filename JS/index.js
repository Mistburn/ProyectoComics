// Function to load a test user in the storage
function loadUsers(){
	if(localStorage.getItem('Users')){
		return true;
	}
	var userTemp={
		FirstName:'David',
		LastName:'Villanueva',
		UserName:'test',
		Email:'david@gmail.com',
		Password:'mistburn',
		Admin:true,
		Visitor:false,
		Position:0
	};
	var users=[userTemp];
	localStorage.setItem('Users',JSON.stringify(users));
}

// Function for make te LogIn
function submitLogIn(){
	var userName=document.getElementById('userName_L').value;
	var password=document.getElementById('password_L').value;
	if(existUser(userName,password,true)){
		window.location.href = "Main.html";
	}else{
		alert('Wrong data, please verify your credentials.')
	}
}

// Function for check if the user and its password match with the storage, also
// verifies if an user already exists
function existUser(user,pass,logIn){
	var users=JSON.parse(localStorage.getItem('Users'));
	if(logIn){
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].UserName==user && users[i].Password==pass){
				localStorage.setItem("CurrentUser",JSON.stringify(users[i]));
				return true;
			}
		};

	}else{
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].UserName==user){
				return true;
			}
		};
	}
	return false;
}

// Function for register the user like a visitor and redirect to Main page
function enterVisitor(){
	var userTemp={
		FirstName:'Visitor',
		LastName:'Visitor',
		UserName:'isitor',
		Email:'visitor@visitor.com',
		Password:'visitor',
		Admin:true,
		Visitor:true,
		Position:-1
	};
	localStorage.setItem("CurrentUser",JSON.stringify(userTemp));
	window.location.href = "Main.html";
}

// Function to show the Sign Up widget
function signUpPage(){
	document.getElementById('signUp').className = "container";
	document.getElementById('logIn').className = "hide container";
}

// Function to show the Log In widget
function logInPage(){
	document.getElementById('logIn').className = "container";
	document.getElementById('signUp').className = "hide container";
}

// Function to register a new user in the storage
function registerUser(){

	if(document.getElementById('password').value === document.getElementById('password_confirmation').value){

		if(existUser(document.getElementById('userName').value,"",false)){
			alert("The user already exists!");	
			return false;
		}
		var users=JSON.parse(localStorage.getItem('Users'));
		var userTemp={
			FirstName:document.getElementById('first_name').value,
			LastName:document.getElementById('last_name').value,
			UserName:document.getElementById('userName').value,
			Email:document.getElementById('email').value,
			Password:document.getElementById('password').value,
			Admin:document.getElementById('box').checked,
			Visitor:false,
			Position:users.length
		};
		users.push(userTemp);
		localStorage.removeItem('Users');
		localStorage.setItem('Users',JSON.stringify(users));
		alert("The user was created correctly");
		logInPage();
	}else{
		alert("The password doesn't match");
	}
	return false;
}