<?php

class Tppelayanan_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_tppelayanan(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                 = $this->input->post("fields");
        $query                 	= $this->input->post("query");
		$idtarifpaket           = $_POST["idtarifpaket"];
		
        $this->db->select('tarifpaketdet.*, jtarif.kdjnstarif, tarifpaket.nmpaket, jsatuan.nmsatuan, (tarifpaketdet.tarifjs + tarifpaketdet.tarifjm + tarifpaketdet.tarifjp + tarifpaketdet.tarifbhp) * qty AS total');
        $this->db->from('tarifpaketdet');
		$this->db->join('jtarif',
                'jtarif.idjnstarif = tarifpaketdet.idjnstarif', 'left');
		$this->db->join('tarifpaket',
                'tarifpaket.idtarifpaket = tarifpaketdet.idtarifpaket', 'left');
		$this->db->join('jsatuan',
                'jsatuan.idsatuan = tarifpaketdet.idsatuan', 'left');
				
		//$this->db->where('tarifpaketdet.idtarifpaket',$idtarifpaket);	
		$this->db->order_by('idtarifpaketdet');
		
		/* $this->db->select('*');
		$this->db->from('v_tarifpaketdet'); */
		
		$where = array();
        $where['tarifpaketdet.idtarifpaket']=$idtarifpaket;
        
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

        $this->db->where($where);
		
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(1000000,0);
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
      
		$this->db->select('tarifpaketdet.*, jtarif.kdjnstarif, tarifpaket.nmpaket, jsatuan.nmsatuan');
        $this->db->from('tarifpaketdet');
		$this->db->join('jtarif',
                'jtarif.idjnstarif = tarifpaketdet.idjnstarif', 'left');
		$this->db->join('tarifpaket',
                'tarifpaket.idtarifpaket = tarifpaketdet.idtarifpaket', 'left');
		$this->db->join('jsatuan',
                'jsatuan.idsatuan = tarifpaketdet.idsatuan', 'left');
				
		/* $this->db->select('*');
		$this->db->from('v_tarifpaketdet'); */

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
	
	function delete_tppelayanan(){     
		$where['idtarifpaketdet'] = $_POST['idtarifpaketdet'];
		$del = $this->rhlib->deleteRecord('tarifpaketdet',$where);
        return $del;
    }
	
	function delete_win_pelayanan(){     
		$where['idtarifpaket'] = $_POST['idtarifpaket'];
		$where['kdtarif'] = $_POST['kdpelayanan'];
		$del = $this->rhlib->deleteRecord('tarifpaketdet',$where);
        return $del;
    }
	
	function delete_win_Barang(){     
		$where['idtarifpaket'] = $_POST['idtarifpaket'];
		$where['kdtarif'] = $_POST['kdbrg'];
		$where['idsatuan'] = $_POST['idsatuan'];
		$del = $this->rhlib->deleteRecord('tarifpaketdet',$where);
        return $del;
    }
		
	function insert_win_pelayanan(){
		$dataArray = $this->getFieldsAndValuesPelayanan();
		$ret = $this->rhlib->insertRecord('tarifpaketdet',$dataArray);
		return $ret;
    }
	
	function insert_win_barang(){
		$dataArray = $this->getFieldsAndValuesBarang();
		$ret = $this->rhlib->insertRecord('tarifpaketdet',$dataArray);
		return $ret;
    }
	
	function update_qty(){
		//UPDATE
		$this->db->where('idtarifpaketdet', $_POST['idtarifpaketdet']);
		$this->db->set('qty', $_POST['qty']);
		$this->db->update('tarifpaketdet'); 
        
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
		//UPDATE
		$this->db->where('idtarifpaketdet', $_POST['idtarifpaketdet']);
		$this->db->set('tarifjs', $_POST['tarifjs']);
		$this->db->update('tarifpaketdet'); 
        
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
		//UPDATE
		$this->db->where('idtarifpaketdet', $_POST['idtarifpaketdet']);
		$this->db->set('tarifjm', $_POST['tarifjm']);
		$this->db->update('tarifpaketdet'); 
        
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
		//UPDATE
		$this->db->where('idtarifpaketdet', $_POST['idtarifpaketdet']);
		$this->db->set('tarifjp', $_POST['tarifjp']);
		$this->db->update('tarifpaketdet'); 
        
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
		//UPDATE
		$this->db->where('idtarifpaketdet', $_POST['idtarifpaketdet']);
		$this->db->set('tarifbhp', $_POST['tarifbhp']);
		$this->db->update('tarifpaketdet'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_tppelayanan(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idtarifpaketdet', $_POST['idtarifpaketdet']);
		$this->db->update('tarifpaketdet', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
	
	function getFieldsAndValuesPelayanan(){
		$idsatuan 	= (isset($_POST['idsatuan']))? $_POST['idsatuan'] : null;
		$qty 		= (isset($_POST['qty']))? $_POST['qty'] : 0;
		$tarifjs 	= (isset($_POST['tarifjs']))? $_POST['tarifjs'] : 0;
		$tarifjm 	= (isset($_POST['tarifjm']))? $_POST['tarifjm'] : 0;
		$tarifjp 	= (isset($_POST['tarifjp']))? $_POST['tarifjp'] : 0;
		$tarifbhp 	= (isset($_POST['tarifbhp']))? $_POST['tarifbhp'] : 0;
		
		$dataArray = array(
		    //'idtarifpaketdet'	=> $_POST['idtarifpaketdet'],
		     'kdtarif'			=> $_POST['kdpelayanan'],
		     'idjnstarif'		=> $_POST['idjnstarif'],
		     'idtarifpaket'		=> $_POST['idtarifpaket'],
		     'idsatuan'			=> $idsatuan,
			 'qty'				=> $qty, 
			 'tarifjs'			=> $tarifjs, 
			 'tarifjm' 			=> $tarifjm,
             'tarifjp'			=> $tarifjp,
			 'tarifbhp'			=> $tarifbhp,
        );
		
		return $dataArray;
	}
	
	function getFieldsAndValuesBarang(){
		$idsatuan 	= (isset($_POST['idsatuan']))? $_POST['idsatuan'] : null;
		$qty 		= (isset($_POST['qty']))? $_POST['qty'] : 0;
		$tarifjs 	= (isset($_POST['tarifjs']))? $_POST['tarifjs'] : 0;
		$tarifjm 	= (isset($_POST['tarifjm']))? $_POST['tarifjm'] : 0;
		$tarifjp 	= (isset($_POST['tarifjp']))? $_POST['tarifjp'] : 0;
		$tarifbhp 	= (isset($_POST['tarifbhp']))? $_POST['tarifbhp'] : 0;
		
		$dataArray = array(
		    //'idtarifpaketdet'	=> $_POST['idtarifpaketdet'],
		     'kdtarif'			=> $_POST['kdbrg'],
		     'idjnstarif'		=> $_POST['idjnstarif'],
		     'idtarifpaket'		=> $_POST['idtarifpaket'],
		     'idsatuan'			=> $idsatuan,
			 'qty'				=> $qty, 
			 'tarifjs'			=> $tarifjs, 
			 'tarifjm' 			=> $tarifjm,
             'tarifjp'			=> $tarifjp,
			 'tarifbhp'			=> $tarifbhp,
        );
		
		return $dataArray;
	}
	
	function cekkdpelayanan(){
        $q = "SELECT count(kdtarif) as kdtarif FROM tarifpaketdet where kdtarif='".$_POST['kdpelayanan']."' AND idtarifpaket='".$_POST['idtarifpaket']."' AND idjnstarif='".$_POST['idjnstarif']."'";
        $query  = $this->db->query($q);
        $jum = '';
        if ($query->num_rows() != 0)
        {
			$row = $query->row();
            $jum=$row->kdtarif;
        }
        if ($jum == null){
            $jum=0;
        }
        echo $jum;
    }
	
	function cekkdbarang(){
        $q = "SELECT count(kdtarif) as kdtarif FROM tarifpaketdet where kdtarif='".$_POST['kdbrg']."' AND idtarifpaket='".$_POST['idtarifpaket']."' AND idjnstarif='".$_POST['idjnstarif']."' AND idsatuan='".$_POST['idsatuan']."'";
        $query  = $this->db->query($q);
        $jum = '';
        if ($query->num_rows() != 0)
        {
			$row = $query->row();
            $jum=$row->kdtarif;
        }
        if ($jum == null){
            $jum=0;
        }
        echo $jum;
    }		
}
