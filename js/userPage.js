import { loggedUser } from "./global.js";
console.log(loggedUser);

const namePlaceholder = document.querySelector('#userName');
const bdayPlaceholder = document.querySelector('.birthDate');
const phonePlaceholder = document.querySelector('.phoneNumber');
const emailPlaceholder = document.querySelector('.email');

namePlaceholder.innerText = loggedUser.Name;
bdayPlaceholder.innerText = loggedUser.BirthDate;
phonePlaceholder.innerText = loggedUser.phoneNumber;
emailPlaceholder.innerText = loggedUser.Email;