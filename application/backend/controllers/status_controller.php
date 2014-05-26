<?php
class Status_Controller extends Controller {

    public function __construct() {
        parent::Controller();
		$this->load->model(array('Status'=>'Status'));		
    }

    function get_status() {
        //$sql = "SELECT idstatus, nmstatus FROM `status`";
        $status = $this->Status->getAll();
		$ttl = count($status);
		$arrStatus = array("success" => true, "results" => $ttl, "data" => $status);
        echo json_encode($arrStatus);
    }
	
	function getStatusKartuRM(){
		$stkrm = $this->Status->getStkrm();
		$ttl = count($stkrm);
		$arrStatus = array("success" => TRUE, "results" => $ttl, "data" => $stkrm);
		echo json_encode($arrStatus);		
	}
}