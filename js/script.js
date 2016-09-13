function login(username, password) {
    var cUsername = readCookie("username");
    var cPassword = readCookie("password");
    var result = !!(cUsername != "" && cUsername == username && cPassword == password);
    if (result){
        writeCookie("login", "true", 1);
    }
    return result;
}

function signOut(){
    writeCookie("login", "", 0);
    location.reload();
}

function signUp(username, password, email, firstName, lastName) {
    writeCookie("username", username, 10);
    writeCookie("password", password, 10);
    writeCookie("email", email, 10);
    writeCookie("firstName", firstName, 10);
    writeCookie("lastName", lastName, 10);
}

function readCookie(name) {
    var cookieList = document.cookie.split(';');
    for(var i = 0; i <cookieList.length; i++) {
        var cookie = cookieList[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if(cookie.split("=")[0]==name){
            return cookie.split("=")[1];
        }
    }
    return "";
}

function writeCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*3600000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

function setUpNavBar() {
    if (readCookie("login")=="true"){
        var signUpAnchor = document.getElementById("user-sign-up");
        var loginAnchor = document.getElementById("user-login");
        loginAnchor.innerText = "Welcome, " + readCookie("username") + "!";
        loginAnchor.href = "#";
        signUpAnchor.innerText = "Sign out";
        signUpAnchor.href = "javascript: signOut();";
    }
}


function loginForm() {
    var form = document.forms["form-login"];
    var result = login(form["username"].value, form["password"].value);
    if (result){
        window.location = "index.html";
    } else {
        alert("Username or password is wrong, please try again.");
    }
    return false;
}


function signUpForm() {
    var form = document.forms["form-sign-up"];
    if (form["password"].value != form["verify-password"].value){
        alert("Two passwords are not the same, please enter again.");
        return false;
    }
    window.location = "login.html";
    signUp(form["username"].value, form["password"].value, form["e-mail"].value, form["first-name"].value, form["last-name"].value);
    alert("Sign up successful, please log in!");
    return false;
}

setUpNavBar();