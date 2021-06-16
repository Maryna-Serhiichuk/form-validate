let username = document.querySelector('.form-input__username');
let password = document.querySelector('.form-input__password');
let passwordCon = document.querySelector('.form-input__con-password');
let email = document.querySelector('.form-input__email');

let btnCreateAccount = document.querySelector('.form-btn__create-account');

let inputsVal = document.querySelectorAll('.form__input');

let usernameVal;
let passwordVal;
let passwordConVal;
let emailVal;

let errorMessage = document.querySelectorAll('.form__error-message');
let numMessage;

let selectedInput = [];

let preferredLodgingsBlock = document.querySelector('.form__inputs');
let preferredLodgings = ['Fire Cabins', 'Horseshoe Cabins', 'Spruce Cabins', 'Ursa Major Cabins', 'Bear Meadow Campground', 'Lakeside Campground', 'Leadfoot Campground', 'Talus Campground'];

for(let i = 0; i < preferredLodgings.length; i++){
	preferredLodgingsBlock.innerHTML += addPreferredLodgings(preferredLodgings[i],);
}

function addPreferredLodgings(text){
	return `<label>
				<input type="checkbox" name="${text}">
				<span>${text}</span>
			</label>`
}

let item = document.querySelectorAll('.form__inputs label input');

btnCreateAccount.addEventListener('click', createAccount);

function createAccount(){
	numMessage = 0;

	usernameVal = username.value.trim();
	passwordVal = password.value.trim();
	passwordConVal = passwordCon.value.trim();
	emailVal = email.value.trim();

	if(usernameVal == '' || usernameVal.length < 3){
		inputFalse(username, 'Name cannot be blank');
		return false
	} else {
		inputTrue(username);
	}

	if(passwordVal == ''){
		inputFalse(password, "Password cannot be blank");
		return false
	} else if (passwordVal.length < 8){
		inputFalse(password, "Password is not valid");
		return false
	} else {
		inputTrue(password);
	}

	if(passwordConVal == ''){
		inputFalse(passwordCon, "Password cannot be blank");
		return false
	} else if (passwordConVal != passwordVal){
		inputFalse(passwordCon, "Password does not match");
		return false
	} else {
		inputTrue(passwordCon);
	}

	if(emailVal == ''){ 
		inputFalse(email, "Email cannot be blank");
	} else if ( !validateEmaiFormula(emailVal) ){
		inputFalse(email, "Email is not valid");
	} else {
		inputTrue(email);
	}

	for (let i = 0; i < item.length; i++){
		if(item[i].checked){
			selectedInput.push(preferredLodgings[i]);
		}
	}
	
	setLocalStorage();

	location.replace('page.html');
}

function setLocalStorage(){
	let setLocalStorageArray = [];

	setLocalStorageArray.push(usernameVal);
	setLocalStorageArray.push(emailVal);
	
	setLocalStorageArray.push(selectedInput);

	localStorage.setItem("data", JSON.stringify(setLocalStorageArray));
}

function inputFalse(input, message){
	input.classList.add('page__error');

	errorMessage[numMessage].textContent = message;
}

function inputTrue(input){
	input.classList.remove('page__error');

	errorMessage[numMessage].textContent = "";
	numMessage++;
}

function validateEmaiFormula(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}