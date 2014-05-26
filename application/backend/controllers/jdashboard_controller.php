<?php

class Jdashboard_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
              $this->load->library('session');
			  $this->load->model(array('Jdashboard'=>'Jdashboard'));
    }
	
	function gridM_dash(){
		$jdashboard = $this->Jdashboard->getAll();
		$ttl = count($jdashboard);
        $arrJdashboard = array ("success"=>true,"results"=>$ttl,"data"=>$jdashboard);
		echo json_encode($arrJdashboard);
    }
}
