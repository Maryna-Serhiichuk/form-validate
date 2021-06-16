let lodgings = document.querySelector('.page__lodgings');

let info = document.querySelectorAll('.page-info__item');

let getLocalStorage = localStorage.getItem("data");
getLocalStorage = JSON.parse(getLocalStorage);

for(let i = 0; i < getLocalStorage.length-1; i++){
	info[i].textContent = getLocalStorage[i];
}

for(let i = 0; i < getLocalStorage[getLocalStorage.length-1].length; i++){
	lodgings.innerHTML += addInfo(getLocalStorage[getLocalStorage.length-1][i]);
}

function addInfo(text){
	return `<div>${text}</div>`
}