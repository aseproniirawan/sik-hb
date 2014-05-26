<?php

class Loguser_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
              $this->load->library('session');
			  $this->load->model(array('Loguser'=>'Loguser'));
    }
	
	function gridL_user(){
		$rmasuk = $this->input->post("rtglmasuk");
		$rkeluar = $this->input->post("rtglkeluar");

		$tgl1 = $this->input->post("tglmasuk");
		$tgl2 = $this->input->post("tglkeluar");
		
		
		if ($rmasuk == 1){
			$loguser = $this->Loguser->getTglMasuk($tgl1,$tgl2);
		} else if ($rkeluar == 1){
			$loguser = $this->Loguser->getTglKeluar($tgl1,$tgl2);
		}else {
			$loguser = $this->Loguser->getAll();
		}
		$ttl = count($loguser);
        $arrLoguser = array ("success"=>true,"results"=>$ttl,"data"=>$loguser);
		echo json_encode($arrLoguser);
    }
}
