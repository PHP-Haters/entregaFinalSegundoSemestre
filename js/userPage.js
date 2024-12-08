import { loggedUser } from "./global.js";

const namePlaceholder = document.querySelector('#userName');
const bdayPlaceholder = document.querySelector('.birthDate');
const phonePlaceholder = document.querySelector('.phoneNumber');
const emailPlaceholder = document.querySelector('.email');

namePlaceholder.innerText = loggedUser.Name;
bdayPlaceholder.innerText = loggedUser.BirthDate;
phonePlaceholder.innerText = loggedUser.PhoneNumber;
emailPlaceholder.innerText = loggedUser.Email;