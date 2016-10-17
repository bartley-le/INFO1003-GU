<?php
$db = pg_connect("host=soit-db-pro-2.ucc.usyd.edu.au port=5432 dbname=y16info1003s02g31 user=y16info1003s02g31 password=UnG2Q2Ae");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Preferences</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
</head>
<body>

<!--Larry - Navigation-->
<nav class="nav-bar">

    <ul class="left">
        <li>
            <img src="img/icon-nav.png">
        </li>
        <li>
            <a class="brand" href="index.html">
                Stroke<br><b>Defender</b>
            </a>
        </li>
    </ul>
    <ul class="right">
        <li>
            <a href="index.html">About stroke</a>
            <ul></ul>
        </li>
        <li>
            <a href="index.html">What we do</a>
        </li>
        <li>
            <a href="index.html">How you can help</a>
        </li>
        <li>
            <a class="rnd-btn" href="login.html" id="user-login">Login</a>
        </li>
        <li>
            <a class="rnd-btn" href="signup.html" id="user-sign-up">Sign up</a>
        </li>
    </ul>
</nav>


<!--Anqi - Banner-->
<div class="banner">
    <img class="banner-img" src="img/sunset-banner.jpg">
    <h1 class="banner-heading">Preferences</h1>
</div>
<?php
$result = pg_query_params($db, 'SELECT * FROM users WHERE username = $1', array("$_COOKIE[username]"));
$row = pg_fetch_row($result);
if (!$row) {
    header("Location: " . "login.html", true, 301);
    die();
}
?>
<div class="preferences-content shadow">

    <form class="user-form" name="form-preferences" onsubmit="return setPreference()">
        <div class="form-control">
            <label for="first-name">First Name</label>
            <input name="first-name" id="first-name" value="<?php echo $row[2] ?>">
        </div>
        <div class="form-control">
            <label for="last-name">Last Name</label>
            <input name="last-name" id="last-name" value="<?php echo $row[3] ?>">
        </div>
        <div class="form-control">
            <label for="color">Background Color</label>
            <input name="color" id="color" type="color" value="<?php echo $row[5] ?>">
        </div>
        <div class="form-control">
            <button type="submit">Save</button>
        </div>

    </form>
</div>


<!--Jake - Footer-->
<footer>
    <div class="footer-links">
        <div class="footer-column">
            <h6>QUICK LINKS</h6>
            <ul>
                <li><a href="faq-articles/what-is-stroke.html">What is stroke?</a></li>
                <li><a href="faq-articles/symptoms.html">How to identify stroke?</a></li>
                <li><a href="faq-articles/treatments.html">What is Integrative Medicine?</a></li>
                <li><a>Suggested hospitals.</a></li>
                <li><a href="faq.html">FAQ</a></li>
            </ul>
        </div>
        <div class="footer-column">
            <h6>RELATED SITES</h6>
            <ul>
                <li><a href="http://strokefoundation.com.au/">Stroke Foundation</a></li>
                <li><a href="http://www.stroke.org/">National Stroke Association</a></li>
                <li><a href="http://www.strokeassociation.org/">American Stroke Association</a></li>
            </ul>
        </div>
        <div class="footer-column">
            <h6>ABOUT US</h6>
            <ul>
                <li><a href="about.html">Our team & purpose</a></li>
                <li><a href="contact.html">Contact us</a></li>
            </ul>
        </div>

    </div>
    <hr>
    <div class="footer-bottom">
        <span class="copyright">Copyright © 2016 Stroke Defender Inc. All rights reserved.</span>
        <ul class="hor-list">
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="sitemap.html">Site Map</a></li>
        </ul>
    </div>
</footer>

<script src="js/jquery-3.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
<script type="text/javascript" src="js/script.js"></script>
</body>
</html>
