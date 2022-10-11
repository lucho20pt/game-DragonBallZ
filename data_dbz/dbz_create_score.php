<?php
// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors','1');
?>

<?php
// Connect to the MySQL database  
include "../data_scripts/connect_to_mysql.php"; 

if (isset($_POST['nicks']) && isset($_POST['scores'])) {
	$nicks = $_POST['nicks'];
	$scores = $_POST['scores'];
	
	// Add this SCORE into the database now
	$sql = mysql_query("INSERT INTO game_dbz_catch (nicks, scores)
	VALUES('$nicks', '$scores')") or die (mysql_error());
	
	echo "{$nicks} {$scores}";
}


?>