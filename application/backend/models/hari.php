<?php
class Hari extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('hari');
		$this->db->order_by('kdhari','ASC');
		$query = $this->db->get();

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('hari',array('idhari'=>$id));
		return $query->row_array();
	}
}

