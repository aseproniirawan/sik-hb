<?php

class Inputinformasi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_inputinformasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('informasi.*, pengguna.nmlengkap, stpublish.nmstpublish');
        $this->db->from('informasi');
		$this->db->join('pengguna',
                'pengguna.userid = informasi.userid', 'left');
		$this->db->join('stpublish',
                'stpublish.idstpublish = informasi.idstpublish', 'left');
				
		$this->db->order_by('idinfo');
        
        
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
            $this->db->limit(22,0);
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
      
        $this->db->select('informasi.*, pengguna.nmlengkap, stpublish.nmstpublish');
        $this->db->from('informasi');
		$this->db->join('pengguna',
                'pengguna.userid = informasi.userid', 'left');
		$this->db->join('stpublish',
                'stpublish.idstpublish = informasi.idstpublish', 'left');

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
	
	function delete_inputinformasi(){     
		$where['idinfo'] = $_POST['idinfo'];
		$del = $this->rhlib->deleteRecord('informasi',$where);
        return $del;
    }
		
	function insert_inputinformasi(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('informasi',$dataArray);
        return $ret;
    }

	function update_inputinformasi(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idinfo', $_POST['idinfo']);
		$this->db->update('informasi', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
			
	function getFieldsAndValues(){
		$dataArray = array(
             'idinfo'		=> $_POST['idinfo'],
			 'tglinfo'		=> $_POST['tglinfo'],
             'judul'		=> $_POST['judul'],
             'deskripsi'	=> '<h1>'.$_POST['judul'].'</h1><br>'.$_POST['tglinfo'].' | '.$_POST['userid'].'<br>'.$_POST['deskripsi'],
             'userid'		=> $_POST['userid'],
             'idstpublish'	=> $_POST['idstpublish']
        );		
		return $dataArray;
	}
	
}
