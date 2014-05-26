<?php

class Pensupplier_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_pensupplier(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
		
		$tgl1                   = $this->input->post("tglawal");
		$tgl2                   = $this->input->post("tglakhir");
		$key					= $_POST["key"]; 
      
        $this->db->select("*, bagian.nmbagian, stsetuju.nmstsetuju, pengguna.nmlengkap");
        $this->db->from("pp");
		$this->db->join('bagian',
				'bagian.idbagian = pp.idbagian', 'left');
		$this->db->join('stsetuju',
				'stsetuju.idstsetuju = pp.idstsetuju', 'left');
		$this->db->join('pengguna',
				'pengguna.userid = pp.userid', 'left');
				
		$this->db->order_by('nopp');
		//$this->db->where('pp.idstsetuju = 2');
		
        
        if($this->input->post('chb_nopp')=='true'){	
			if ($key=='1'){
				$id     = $_POST["id"];
				$name   = $_POST["name"];
				$this->db->or_like($id, $name);
			}  
	    }
	   
	    if($this->input->post('chb_periode')=='true'){
			$this->db->where("date(tglpp) between '". $tgl1 ."' and '". $tgl2."'" );	   
	    }
        //======================================================================        
                
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(20,0);
        }        
        $q = $this->db->get(); 
       
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = $this->numrow($fields, $query);
        
        //======================================================================
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

		foreach($data as $row){
            array_push($build_array["data"],array(
                'nopp'=>$row->nopp,
				'tglpp'=>$row->tglpp,
				'nmbagian'=>$row->nmbagian,
				'idstsetuju'=>$row->idstsetuju,
				'nmstsetuju'=>$row->nmstsetuju
            ));
        }
        echo json_encode($build_array);
    }
	
	function numrow($fields, $query){
      
        $this->db->select("*, bagian.nmbagian, stsetuju.nmstsetuju, pengguna.nmlengkap");
        $this->db->from("pp");
		$this->db->join('bagian',
				'bagian.idbagian = pp.idbagian', 'left');
		$this->db->join('stsetuju',
				'stsetuju.idstsetuju = pp.idstsetuju', 'left');
		$this->db->join('pengguna',
				'pengguna.userid = pp.userid', 'left');        
                
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function get_pensupplierdet(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		$nopp = $_POST["nopp"];
      
        $this->db->select("*");
        $this->db->from("v_pensupplierdetail");
		//$this->db->order_by('');
		
		$where = array();
        $where['nopp']=$nopp;
                
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
            $this->db->limit(18,0);
        }
        
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $datax = $this->db->count_all('v_ppdetail');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
	}
	
	function delete_perpembelian(){     
		$where['nopp'] = $_POST['nopp'];
		$del = $this->rhlib->deleteRecord('pp',$where);
        return $del;
    }
	
	function insert_update_perpembelian(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('pp',array('nopp'=>$_POST['tf_nopp']));
		if($query->num_rows() > 0) $pas = $this->update_perpembelian();
		else $pas = $this->insert_perpembelian();
		
        if($pas){
            $this->db->trans_commit();
            $ret["success"]=true;
			$ret["nopp"]=$pas['nopp'];
        }else{
            $this->db->trans_rollback();
            $ret["success"]=false;
            //$ret["message"]='Simpan Data  Gagal';
        }
        echo json_encode($ret);
    }
		
	function insert_perpembelian(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('pp',$dataArray);
        return $dataArray;
    }

	function update_perpembelian(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('nopp', $_POST['nopp']);
		$this->db->update('pp', $dataArray);
        return $dataArray;
    }
	
	function getFieldsAndValues(){
		/* if(is_null($_POST['tf_nopp']) || $_POST['tf_nopp'] == '') 
			$ns = $this->getNoSupplier();
		else $ns = $_POST['tf_nopp']; */
			$ns = $this->getNoPp();
			$nostart = 'PP';
			$nomid = date('ym');
			$noend = str_pad($ns, 6, "0", STR_PAD_LEFT);
			$nopp = $nostart.$nomid.$noend;
		
		$dataArray = array(
			 'nopp'			=> ($_POST['tf_nopp']) ? $_POST['tf_nopp']: $nopp,
			 'tglpp'		=> $_POST['tglpp'],
             'idbagian'		=> $_POST['idbagian'],
             'bpb'			=> $_POST['bpb'],
             'idstsetuju'	=> $_POST['idstsetuju'],
			 'keterangan'	=> $_POST['keterangan'],
			 'userid'		=> $_POST['userid']			
		);
		return $dataArray;
	}
	
	function getNoPp(){
		$this->db->select("count(nopp) as no_pp");
		$this->db->from("pp");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['no_pp'])) $max =1;
		else $max = $data['no_pp'] + 1;
		return $max;
	}
	
	function insert_perpembeliandet(){
		$dataArray = $this->getFieldsAndValuesdet();
		$ret = $this->rhlib->insertRecord('ppdet',$dataArray);
        return $ret;
    }
	
	function delete_perpembeliandet(){     
		$where['nopp'] = $_POST['nopp'];
		$where['kdbrg'] = $_POST['kdbrg'];
		$del = $this->rhlib->deleteRecord('ppdet',$where);
        return $del;
    }
	
	function update_qty(){
		//UPDATE
		$this->db->where('nopp', $_POST['nopp']);
		$this->db->where('kdbrg', $_POST['kdbrg']);
		$this->db->set('qty', $_POST['qty']);
		$this->db->update('ppdet'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function update_catatan(){
		//UPDATE
		$this->db->where('nopp', $_POST['nopp']);
		$this->db->where('kdbrg', $_POST['kdbrg']);
		$this->db->set('catatan', $_POST['catatan']);
		$this->db->update('ppdet'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
	
	function getFieldsAndValuesdet(){
			$ns = $this->getNoPpdet();
			$nostart = 'PP';
			$nomid = date('ym');
			$noend = str_pad($ns, 6, "0", STR_PAD_LEFT);
			$nopp = $nostart.$nomid.$noend;
			
			$qty 			= (isset($_POST['qty']))? $_POST['qty'] : 0;
			$catatan		= (isset($_POST['catatan']))? $_POST['catatan'] : null; 
			$idhrgbrgsup	= (isset($_POST['idhrgbrgsup']))? $_POST['idhrgbrgsup'] : null; 
			$nopo 			= (isset($_POST['nopo']))? $_POST['nopo'] : null;
		
		$dataArray = array(
			 'nopp'			=> ($_POST['nopp']) ? $_POST['nopp']: $nopp,
			 'kdbrg'		=> $_POST['kdbrg'],
             'idsatuan'		=> $_POST['idsatuanbsr'],
             'qty'			=> $qty,
			 'catatan'		=> $catatan,
			 'idhrgbrgsup'	=> $idhrgbrgsup,		
			 'idstpp'		=> 1,		
			 'nopo'			=> $nopo			
		);
		return $dataArray;
	}
	
	function getNoPpdet(){
		$this->db->select("count(nopp) as no_pp");
		$this->db->from("ppdet");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['no_pp'])) $max =1;
		else $max = $data['no_pp'] + 1;
		return $max;
	}
	
	function cekbarang(){
        $q = "SELECT count(nopp) as nopp FROM ppdet where nopp='".$_POST['nopp']."' AND kdbrg='".$_POST['kdbrg']."'";
        $query  = $this->db->query($q);
        $jum = '';
        if ($query->num_rows() != 0)
        {
			$row = $query->row();
            $jum=$row->nopp;
        }
        if ($jum == null){
            $jum=0;
        }
        echo $jum;
    }
	
	function get_carihrgbrgsup(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		$kdbrg 					= $_POST['kdbrg'];
		$key					= $_POST["key"]; 
	  
        /* $this->db->select('hrgbrgsup.*, barang.nmbrg, jsatuan.nmsatuan, supplier.nmsupplier, matauang.nmmatauang');
        $this->db->from('hrgbrgsup');
		$this->db->join('barang',
                'barang.kdbrg = hrgbrgsup.kdbrg', 'left');		
 		$this->db->join('jsatuan',
                'jsatuan.idsatuan = hrgbrgsup.idsatuan', 'left');
		$this->db->join('supplier',
                'supplier.kdsupplier = hrgbrgsup.kdsupplier', 'left');
		$this->db->join('matauang',
                'matauang.idmatauang = hrgbrgsup.idmatauang', 'left'); */
		
		$this->db->select("*");
        $this->db->from("v_carisupplierfrompensupplier");
		//$this->db->order_by('');
		
		$where = array();
        $where['v_carisupplierfrompensupplier.kdbrg']=$kdbrg;	
				
		if ($key=='1'){
			$id     = $_POST["id"];
			$name   = $_POST["name"];
			$this->db->or_like($id, $name);
		}
		
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(18,0);
        }
		
        $this->db->where($where);
		
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = $this->nw($fields, $query);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function nw($fields, $query){
      
        $this->db->select("*");
        $this->db->from("v_carisupplierfrompensupplier");
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function update_pendetidhrgbrgsup(){
		//UPDATE
		$this->db->where('nopp', $_POST['nopp']);
		$this->db->where('kdbrg', $_POST['kdbrg']);
		$this->db->set('idhrgbrgsup', $_POST['idhrgbrgsup']);
		$this->db->update('ppdet'); 
        
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
	}
}
