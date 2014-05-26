<?php

class Pengguna_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_pengguna(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*, date(pengguna.tgldaftar) tgldaftar");
        $this->db->from("pengguna");
        $this->db->join("jpengguna",
				"jpengguna.idjnspengguna = pengguna.idjnspengguna", "left"
		);
        $this->db->join("klppengguna",
				"klppengguna.idklppengguna = pengguna.idklppengguna", "left"
		);
        $this->db->join("status",
				"status.idstatus = pengguna.idstatus", "left"
		);
        
        
        if($fields!="" || $query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$query;
            }
            $this->db->or_like($d, $query);
        }
                
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(18,0);
        }
        
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = $this->numrow($fields, $query);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());
        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
	
	function numrow($fields, $query){
      
        $this->db->select("*");
        $this->db->from("pengguna");
        $this->db->join("jpengguna",
				"jpengguna.idjnspengguna = pengguna.idjnspengguna", "left"
		);
        $this->db->join("klppengguna",
				"klppengguna.idklppengguna = pengguna.idklppengguna", "left"
		);
        $this->db->join("status",
				"status.idstatus = pengguna.idstatus", "left"
		);
    
        if($fields!="" || $query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$query;
            }
            $this->db->or_like($d, $query);
        }
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
}
