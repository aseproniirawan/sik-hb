<?php
class Klppengguna extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('klppengguna');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                  = $this->input->post("fields");
        $q                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("klppengguna");
        
        if($fields!="" || $q !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$q;
            }
            $this->db->or_like($d, $q);
        }
        
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        $query = $this->db->get();

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('klppengguna',array('idklppengguna'=>$id));
		return $query->row_array();
	}

	function getKd($kd){
		$query = $this->db->getwhere('klppengguna',array('kdklppengguna'=>$kd));
		return $query->row_array();
	}
}

