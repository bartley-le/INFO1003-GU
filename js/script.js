$("nav").load("nav.html", null, setUp);
$("footer").load("footer.html");

function signOut(){
    writeCookie("login", "", 0);
    location.reload();
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

function setUp() {
    var username = readCookie("username");
    if (username) {
        var signUpAnchor = $("#user-sign-up");
        var loginAnchor = $("#user-login");
        loginAnchor.text("Welcome, " + username + "!");
        loginAnchor.attr("href", loginAnchor.data("pref-href"));
        signUpAnchor.text("Sign out");
        signUpAnchor.attr("href", "javascript: signOut();");
    }
    var color = localStorage.getItem("color");
    document.body.style.background = color ? color : "#FFF";
}


function loginForm() {
    var form = $("form[name=form-login]");
    $.post("php/login.php",
        form.serialize(),
        function (data) {
            if (data === "success") {
                writeCookie("login", "true", 1);
                writeCookie("username", form.find('input[name="username"]').val(), 1);
                window.location = "index.html";
            } else {
                console.log(data);
                alert("Username or password is wrong, please try again.");
            }
        });
    return false;
}


function signUpForm() {
    var form = $("form[name=form-sign-up]");
    if (form.find('input[name="password"]').val() != form.find('input[name="verify-password"]').val()) {
        alert("Two passwords are not the same, please enter again.");
        return false;
    }
    $.post("php/signup.php",
        form.serialize(),
        function (data) {
            if (data === "success") {
                window.location = "login.html";
                alert("Sign up successful, please log in!");
            } else {
                console.log(data);
                alert("Sign up failed, please try again!");
            }
        }
    );
    return false;
}

function setPreference() {
    var form = $("form[name=form-preferences]");
    var color = form.find('input[name=color]').val();
    localStorage.setItem("color", color);
    $.post("php/update-pref.php",
        form.serialize(),
        function (data) {
            if (data === "success") {
                location.reload();
                alert("Preference was set successfully!");
            } else {
                console.log(data);
                alert("Preference was failed to update. Please try again.");
            }
        }
    );
    return false;
}
