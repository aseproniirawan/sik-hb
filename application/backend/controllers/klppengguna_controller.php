<?php
class Klppengguna_Controller extends Controller {

    public function __construct() {
        parent::Controller();
		$this->load->model(array('Klppengguna'=>'Klppengguna'));
    }
	
	function g_JKP(){
		$klppengguna = $this->Klppengguna->getAllGrid();
		$ttl = count($klppengguna);
        
        $arrKlppengguna = array ("success"=>true,"results"=>$ttl,"data"=>$klppengguna);
        echo json_encode($arrKlppengguna);
    }
}