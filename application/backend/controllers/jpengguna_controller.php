<?php

class Jpengguna_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
              $this->load->library('session');
			  $this->load->model(array('Jpengguna'=>'Jpengguna'));
    }
	
	function grid_jpengguna(){
		$jpengguna = $this->Jpengguna->getAll();
		$ttl = count($jpengguna);
        $arrJpengguna = array ("success"=>true,"results"=>$ttl,"data"=>$jpengguna);
		echo json_encode($arrJpengguna);
    }
}
