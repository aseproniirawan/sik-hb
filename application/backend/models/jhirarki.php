<?php
class Jhirarki extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('jhirarki');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid($start,$limit,$sidx,$sord,$where){
		$this->db->select('*');
		$this->db->limit($limit);
		if($where != NULL)$this->db->where($where,NULL,FALSE);
		$this->db->order_by($sidx,$sord);
		$query = $this->db->get('jhirarki',$limit,$start);

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('jhirarki',array('idjnshirarki'=>$id));
		return $query->row_array();
	}
}

