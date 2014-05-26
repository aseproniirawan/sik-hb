<?php

class Tpumum_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_tpumum(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		$key					= $_POST["key"]; 
		
        $this->db->select('tarif.*, tarif.idpenjamin, tarif.kdpelayanan as `tarif.kdpelayanan`, tarif.kdpelayanan as zzz, tarif.idklstarif as `tarif.idklstarif`,tarif.idklstarif as xxx, penjamin.nmpenjamin, pelayanan.nmpelayanan, klstarif.nmklstarif, pelayanan.idjnspelayanan, jpelayanan.nmjnspelayanan as nmjnspelayanan,(tarif.tarifjs + tarif.tarifjm + tarif.tarifjp + tarif.tarifbhp) AS total');
        $this->db->from('tarif');
 		$this->db->join('penjamin',
                'penjamin.idpenjamin = tarif.idpenjamin', 'left');
		$this->db->join('pelayanan',
                'pelayanan.kdpelayanan = tarif.kdpelayanan', 'left');
 		$this->db->join('klstarif',
                'klstarif.idklstarif = tarif.idklstarif', 'left');
 		$this->db->join('jpelayanan',
                'pelayanan.idjnspelayanan = jpelayanan.idjnspelayanan', 'left');
				
		$this->db->order_by('tarif.kdpelayanan');				
		//$this->db->where('tarif.idpenjamin = 1 and tarif.idklstarif = ', $_POST['klstarif']);
		
		$where = array();
        $where['tarif.idpenjamin']= '1';      
        $where['tarif.idklstarif']= $_POST['klstarif'];      
        
       if ($key=='1'){
			$id     = $_POST["id"];
			$name   = $_POST["name"];
			$this->db->or_like($id, $name);
		}
		
		$this->db->where($where);
        
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
	
         $this->db->select('tarif.*, tarif.idpenjamin, tarif.kdpelayanan as `tarif.kdpelayanan`, tarif.kdpelayanan as zzz, tarif.idklstarif as `tarif.idklstarif`,tarif.idklstarif as xxx, penjamin.nmpenjamin, pelayanan.nmpelayanan, klstarif.nmklstarif, pelayanan.idjnspelayanan, jpelayanan.nmjnspelayanan,(tarif.tarifjs + tarif.tarifjm + tarif.tarifjp + tarif.tarifbhp) AS total');
        $this->db->from('tarif');
 		$this->db->join('penjamin',
                'penjamin.idpenjamin = tarif.idpenjamin', 'left');
		$this->db->join('pelayanan',
                'pelayanan.kdpelayanan = tarif.kdpelayanan', 'left');
 		$this->db->join('klstarif',
                'klstarif.idklstarif = tarif.idklstarif', 'left');
 		$this->db->join('jpelayanan',
                'pelayanan.idjnspelayanan = jpelayanan.idjnspelayanan', 'left');
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function delete_tpumum(){ 
		$where['idpenjamin'] 	= '1';
		$where['kdpelayanan'] 	= $_POST['kdpelayanan'];
		$where['idklstarif'] 	= $_POST['idklstarif'];
		$del = $this->rhlib->deleteRecord('tarif',$where);
        return $del;
    }
		
	function insert_tpumum(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('tarif',$dataArray);
        return $ret;
    }
	
	function update_klstarif(){
		$idpenjamin = '1';
        
		//UPDATE
		$this->db->where('idpenjamin', $idpenjamin);
        $this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->set('idklstarif', $_POST['idklstarif']);
		$this->db->update('tarif'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_tarifjs(){
		$idpenjamin = '1';
        
		//UPDATE
		$this->db->where('idpenjamin', $idpenjamin);
        $this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->where('idklstarif', $_POST['idklstarif']);
		$this->db->set('tarifjs', $_POST['tarifjs']);
		$this->db->update('tarif'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_tarifjm(){
		$idpenjamin = '1';
		
		//UPDATE
		$this->db->where('idpenjamin', $idpenjamin);
        $this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->where('idklstarif', $_POST['idklstarif']);
		$this->db->set('tarifjm', $_POST['tarifjm']);
		$this->db->update('tarif'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_tarifjp(){
		$idpenjamin = '1';
        
		//UPDATE
		$this->db->where('idpenjamin', $idpenjamin);
        $this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->where('idklstarif', $_POST['idklstarif']);
		$this->db->set('tarifjp', $_POST['tarifjp']);
		$this->db->update('tarif'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_tarifbhp(){
		$idpenjamin = '1';
        
		//UPDATE
		$this->db->where('idpenjamin', $idpenjamin);
        $this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->where('idklstarif', $_POST['idklstarif']);
		$this->db->set('tarifbhp', $_POST['tarifbhp']);
		$this->db->update('tarif'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_tpumum(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE fix
		$this->db->where('idpenjamin', $_POST['idpenjamin']);
		$this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->where('idklstarif', $_POST['idklstarif_old']); 
		$this->db->update('tarif', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
	
	function update1field_tpumum(){ 				
		$field = $_POST['field'];
		$value = $_POST['value'];
		
		//UPDATE
		$this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->where('idklstarif', $_POST['idklstarif']); 
		$this->db->set($field, $value);
		$this->db->update('tarif'); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }

    function update(){  
		
 		$tarifjs = (isset($_POST['tarifjs']))? $_POST['tarifjs'] : 0;
		$tarifjm = (isset($_POST['tarifjm']))? $_POST['tarifjm'] : 0;
		$tarifjp = (isset($_POST['tarifjp']))? $_POST['tarifjp'] : 0;
        $tarifbhp = (isset($_POST['tarifbhp']))? $_POST['tarifbhp'] : 0;

        $data = array(
			'tarifjs'	=> $tarifjs,
			'tarifjm'	=> $tarifjm,
			'tarifjp'	=> $tarifjp, 
			'tarifbhp'	=> $tarifbhp,
        );
        
        $this->db->trans_begin();
        
		$where['kdpelayanan']=$this->input->post('kdpelayanan');
		$where['idklstarif']=$this->input->post('idklstarif');
        $this->db->where($where);
        $this->db->update("tarif", $data);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
	
		function getFieldsAndValues(){
		$idpenjamin = '1';
		//idpenjamin perlu diextract digit terakhir utk default idpenjamin --belum
		$kdpelayanan = (isset($_POST['kdpelayanan']))? $_POST['kdpelayanan'] : null;
		$idklstarif = (isset($_POST['idklstarif']))? $_POST['idklstarif'] : 2;
		$tarifjs 	= (isset($_POST['tarifjs']))? $_POST['tarifjs'] : 0;
		$tarifjm 	= (isset($_POST['tarifjm']))? $_POST['tarifjm'] : 0;
		$tarifjp 	= (isset($_POST['tarifjp']))? $_POST['tarifjp'] : 0;
		$tarifbhp 	= (isset($_POST['tarifbhp']))? $_POST['tarifbhp'] : 0;
		
		$dataArray = array(
		     'idpenjamin'	=> $idpenjamin, 
			 'kdpelayanan' 	=> $kdpelayanan,
             'idklstarif'	=> $idklstarif,
			 'tarifjs'		=> $tarifjs, 
			 'tarifjm' 		=> $tarifjm,
             'tarifjp'		=> $tarifjp,
			 'tarifbhp'		=> $tarifbhp,
        );
		
		return $dataArray;
	}
	
	function cekkdpelayanan(){
        $q = "SELECT count(*) as kdpelayanan FROM tarif where kdpelayanan='".$_POST['kdpelayanan']."' AND idklstarif='".$_POST['idklstarif']."' AND idpenjamin= 1" ;
        $query  = $this->db->query($q);
        $jum = '';
        if ($query->num_rows() != 0)
        {
			$row = $query->row();
            $jum=$row->kdpelayanan;
        }
        if ($jum == null){
            $jum=0;
        }
        echo $jum;
    }
}
