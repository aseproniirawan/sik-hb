<?php
class V_otoritas extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('v_otoritas');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid($start,$limit,$sidx,$sord,$where){
		$this->db->select('*');
		$this->db->limit($limit);
		if($where != NULL)$this->db->where($where,NULL,FALSE);
		$this->db->order_by($sidx,$sord);
		$query = $this->db->get('v_otoritas',$limit,$start);

		return $query->result();
	}

	function getOtoritasMenu($idparent){
		$otorisasi = $this->my_usession->userdata('username');
		$this->db->select("*");
                
        $this->db->from("v_otoritas");
        $this->db->order_by('kdmenu'); 
		$this->db->where('idsubmenu',$idparent);
		$this->db->where('idstatusklppengguna',1);
		$this->db->where('idstatus',1); //RH_ADD
        $this->db->where('nmlengkap',$otorisasi);
                
        $query = $this->db->get();
		return $query;
	}
}

