<?php

class Vtarifall_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_vtarifall(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
        $val                  = $this->input->post("val");
      
        $this->db->select("*");
        $this->db->from("v_tarifall");
		$this->db->order_by('kditem');
		
		if($val){
			$x=array('[',']','"');
            $y=str_replace($x, '', $val);
            $z=explode(',', $y);
			$this->db->where_not_in('kditem',$z);
		}
		
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = $this->numrow();
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function numrow(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
        $val                  = $this->input->post("val");
      
        $this->db->select("*");
        $this->db->from("v_tarifall");
		$this->db->order_by('kditem');
		
		if($val){
			$x=array('[',']','"');
            $y=str_replace($x, '', $val);
            $z=explode(',', $y);
			$this->db->where_not_in('kditem',$z);
		}
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
}
