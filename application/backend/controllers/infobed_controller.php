<?php

class Infobed_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	/* function get_infobed1(){ //ISTRA
        
        //======================================================================
        
        $this->db->select("*");
        $this->db->from("v_infobed"); 
        
        //$this->db->order_by("JDASHBOARD");
		
        $q = $this->db->get(); 
		
      //  $q = $this->db->get(); 
       
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
        $datax = $this->db->count_all('v_infobed');
        $ttl = $datax;
        
        //======================================================================
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

      foreach($data as $row) {
            array_push($build_array["data"],array(
				'nmbagian'=>$row->nmbagian,
                'nmkamar'=>$row->nmkamar,
                'nmbed'=>$row->nmbed, 
				'nmstbed'=>$row->nmstbed, 
				'noreg'=>$row->noreg, 
				'tglmasuk'=>$row->tglmasuk,
				'jammasuk'=>$row->jammasuk, 
				'norm'=>$row->norm, 
				'nmpasien'=>$row->nmpasien, 
				'kdjnskelamin'=>$row->kdjnskelamin,	
				'Umur'=>$row->Umur,
			));
        }
        echo json_encode($build_array);
    } */
	
	function get_infobed(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
      
        $this->db->select('*');
        $this->db->from('v_infobed');
		
		$key = $_POST["key"];  
		if ($key=='1'){
			$id     = $_POST["id"];
			$name   = $_POST["name"];
			$this->db->or_like($id, $name);
		}
        
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
}
