const ADMIN_USERNAME =
"KLadmin";

const ADMIN_PASSWORD =
"KLascend";

function login(){

const username =
document.getElementById(
"username"
).value;

const password =
document.getElementById(
"password"
).value;

if(
username === ADMIN_USERNAME &&
password === ADMIN_PASSWORD
){

localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"admin.html";

}
else{

alert(
"Invalid Credentials"
);

}

}
