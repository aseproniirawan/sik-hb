<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename = $table.xls");
header("Pragma: no-cache");
header("Expires: 0");

function cleanData($str) { 

	if(preg_match("/^0/", $str) || preg_match("/^\+?\d{8,}$/", $str) || preg_match("/^\d{4}.\d{1,2}.\d{1,2}/", $str)) 
	{ 
	return "'$str"; 
	} else {
	return "$str"; 
	}

}  
/*
foreach($eksport as $data) {
  
	echo "Nama Pasien  : ".$data->nmpasien. "\n"; 
	echo "No Handphone : ".$data->nohp. "\n";
	echo "No Telp      : ".$data->notelp. "\n";
	echo "Email        : ".$data->email. "\n";
	
}
*/
echo ("\n");
echo ("\n");
 
foreach($fieldname as $field) {
  
	echo strtoupper($field). "\t"; 
	
} 

echo ("\n");	

foreach ($eksport as $row) {

    foreach ($row as $key => $value) {
	   
		/* if (is_numeric($value)) {
			echo  "'".$value. "\t";
		} else {
			echo  $value. "\t";
		} */	

		echo  cleanData($value). "\t";
	
    }
			
	echo ("\n");
		
}
?>                                                                 
