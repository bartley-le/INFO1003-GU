<?php
$db = pg_connect("host=soit-db-pro-2.ucc.usyd.edu.au port=5432 dbname=y16info1003s02g31 user=y16info1003s02g31 password=UnG2Q2Ae");

$username = $_COOKIE["username"];
$color = $_POST["color"];
$firstName = $_POST["first-name"];
$lastName = $_POST["last-name"];

// Construct and execute the sql query.
$result = pg_update($db, 'users', array("color" => $color, "first_name" => $firstName, "last_name" => $lastName), array("username" => $username));

// Check the result of the query and write appropriate output.
// pg_fetch_row returns a row from a database query as an array, or false if no rows are left
if ($result) {
    echo "success";
} else {
    echo "invalid";
}
