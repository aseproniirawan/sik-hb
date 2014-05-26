<?php

class Jhirarki_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
              $this->load->library('session');
			  $this->load->model(array('Jhirarki'=>'Jhirarki'));
    }
	
	function gridM_hierarki(){
		$jhirarki = $this->Jhirarki->getAll();
		$ttl = count($jhirarki);
        $arrJhirarki = array ("success"=>true,"results"=>$ttl,"data"=>$jhirarki);
		echo json_encode($arrJhirarki);
    }
}
