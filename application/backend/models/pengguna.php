<?php
class Pengguna extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('pengguna');
		$this->db->limit(10);
		$this->db->order_by('userid','ASC');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid($start,$limit,$sidx,$sord,$where){
		$this->db->select('*');
		$this->db->limit($limit);
		if($where != NULL)$this->db->where($where,NULL,FALSE);
		$this->db->order_by($sidx,$sord);
		$query = $this->db->get('pengguna',$limit,$start);

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('pengguna',array('userid'=>$id));
		return $query->row_array();
	}

	function getLogin($data){
		$query = $this->db->getwhere('pengguna',$data);
		return $query;
	}
	
	function getKlppengguna($idklppengguna){
		$query = $this->db->getwhere('klppengguna',array('idklppengguna'=>$idklppengguna));
		return $query;
	}

	function save(){
		$userid = $this->input->post('userid');
		$password=$this->input->post('password');
		$nmlengkap=$this->input->post('nmlengkap');
		$email=$this->input->post('email');
		$nohp=$this->input->post('nohp');
		$idjnspengguna=$this->input->post('idjnspengguna');
		$noref=$this->input->post('noref');
		$idklppengguna=$this->input->post('idklppengguna');
		$foto = $this->input->post('foto');
		$idstatus = $this->input->post('idstatus');
		$tgldaftar=$this->input->post('tgldaftar');
		$data = array(
		  'userid'=>$userid,
		  'password'=>$password,
		  'nmlengkap'=>$nmlengkap,
		  'email'=>$email,
		  'nohp'=>$nohp,
		  'idjnspengguna'=>$idjnspengguna,
		  'noref'=>$noref,
		  'idklppengguna'=>$idklppengguna,
		  'foto'=>$foto,
		  'idstatus'=>$idstatus,
		  'tgldaftar'=>$tgldaftar
		);
		$this->db->insert('pengguna',$data);
	}

	function update(){
		$userid = $this->input->post('userid');
		$password=$this->input->post('password');
		$nmlengkap=$this->input->post('nmlengkap');
		$email=$this->input->post('email');
		$nohp=$this->input->post('nohp');
		$idjnspengguna=$this->input->post('idjnspengguna');
		$noref=$this->input->post('noref');
		$idklppengguna=$this->input->post('idklppengguna');
		$foto = $this->input->post('foto');
		$idstatus = $this->input->post('idstatus');
		$tgldaftar=$this->input->post('tgldaftar');
		$data = array(
		  'password'=>$password,
		  'nmlengkap'=>$nmlengkap,
		  'email'=>$email,
		  'nohp'=>$nohp,
		  'idjnspengguna'=>$idjnspengguna,
		  'noref'=>$noref,
		  'idklppengguna'=>$idklppengguna,
		  'foto'=>$foto,
		  'idstatus'=>$idstatus,
		  'tgldaftar'=>$tgldaftar
		);
		$this->db->where('userid',$userid);
		$this->db->update('pengguna',$data);
	}
}

