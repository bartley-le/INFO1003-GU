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

//game

var myGamePiece;
var myObstacles = [];
var myScore;
var canvas = document.getElementById("gameCanvas");

function startGame() {
    myGamePiece = new component(30, 30, "img/brain.png", 10, 120,"image");
    myGamePiece.gravity = 0.05;
    myScore = new component("15px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
       var ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        else if (type == "image") {
          ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);}
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (var i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    var healthStatus ="";
    if (myGameArea.frameNo < 500)
    {
      healthStatus = "bad";  
    }
    else if (myGameArea.frameNo < 1000)
    {
        healthStatus = "better";
    }
    else 
    {
        healthStatus = "Good";
    }
    
    myScore.text="Health: "+ healthStatus;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

setUpNavBar();