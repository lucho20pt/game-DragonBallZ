<?php
// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors','1');
?>

<?php
//Run a select query to get my SCORS

// Connect to the MySQL database  
include "../data_scripts/connect_to_mysql.php"; 

$scores_list = "";
$sql = mysql_query("SELECT * FROM game_dbz_catch ORDER BY cast(scores as unsigned) DESC");
$scoresCount = mysql_num_rows($sql); // count the output amount
if($scoresCount > 0){
	while($row = mysql_fetch_array($sql)){
		$id = $row["id"];
		$nicks = $row["nicks"];
		$scores = $row["scores"];
		
		$scores_list .= "
						<li class='odd'><strong>$nicks</strong></li>
						<li class='even'>$scores</li>
						";
	}	
}else{
	$scores = "We have no scores listed in our data base";		
}

?>

<ol id="scoresList">
<?php echo $scores_list; ?>
</ol>

