<?php
class Datalib extends Controller {	
		
	public function __construct()
    {
        parent::__construct();
    }
	
	function qtable_kelmk(){
		$str = "SELECT kdkodtbkod as kdkelmk, 
			CASE WHEN ifnull(nmdata,'')='' THEN nmkodtbkod
				ELSE nmdata END as nmkelmk
			FROM tbkod WHERE kdapltbkod='10'";
		return $str;
	}
	
}
?>
