<?php
class Status extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('status');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid($start,$limit,$sidx,$sord,$where){
		$this->db->select('*');
		$this->db->limit($limit);
		if($where != NULL)$this->db->where($where,NULL,FALSE);
		$this->db->order_by($sidx,$sord);
		$query = $this->db->get('status',$limit,$start);

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('status',array('idstatus'=>$id));
		return $query->row_array();
	}
	
	function getStkrm(){
		$this->db->select('*');
		$this->db->from('stkrm');
		$query = $this->db->get();
		
		return $query->result();
	}	
}

