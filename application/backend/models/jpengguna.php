<?php
class Jpengguna extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('jpengguna');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid($start,$limit,$sidx,$sord,$where){
		$this->db->select('*');
		$this->db->limit($limit);
		if($where != NULL)$this->db->where($where,NULL,FALSE);
		$this->db->order_by($sidx,$sord);
		$query = $this->db->get('jpengguna',$limit,$start);

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('jpengguna',array('idjnspengguna'=>$id));
		return $query->row_array();
	}
}

