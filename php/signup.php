<?php
// Establish a connection to the database (you need to set the connection parameters in the string).
// If you want to use a different database, you need to change the following settings to the appropriate values.
$db = pg_connect("host=soit-db-pro-2.ucc.usyd.edu.au port=5432 dbname=y16info1003s02g31 user=y16info1003s02g31 password=UnG2Q2Ae");

// Get parameters from the query string.
// Creates a variable for each query parameter using the names given.
$str = $_SERVER['QUERY_STRING'];
parse_str($str);

// Print the vale of the username and passd parameters (currently commented out - delete the '#' characters to include these lines).
#echo "$username\n";
#echo "$passd\n";
$username = $_POST["username"];
$password = $_POST["password"];
$firstName = $_POST["first-name"];
$lastName = $_POST["last-name"];
$email = $_POST["e-mail"];

// Construct and execute the sql query.
// pg_query_params function takes three values:
//   - A variable containing a connection to the database
//   - An SQL query (containing $1, $2, ... in place of values passed in by the user)
//   - An array containing variables to be used in place of $1, $2, ...
$result = pg_insert($db, 'users', array("username" => $username, "first_name" => "$firstName", "last_name" => "$lastName", "email" => "$email", "password" => "$password", "color" => "#FFF"));

// Check the result of the query and write appropriate output.
// pg_fetch_row returns a row from a database query as an array, or false if no rows are left
if ($result) {
    echo "success";
} else {
    echo "invalid";
}
