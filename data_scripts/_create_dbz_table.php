<!-- file to create admin table -->

<?php  
// Connect to the file above here  
require "connect_to_mysql.php"; 

$sqlCommand = "CREATE TABLE game_dbz_catch(
		
		id int(11)NOT NULL auto_increment,
		
		nicks varchar(32) NOT NULL,
		
		scores varchar(32) NOT NULL,		
				
		PRIMARY KEY(id),
			
		UNIQUE KEY id(id)
		
		)";
		
if(mysql_query($sqlCommand)){
	echo "Your game_dbz_catch table has been created successfully!";
}else{
	echo "CRITICAL ERROR: game_dbz_catch table has not been created.";
}

?>