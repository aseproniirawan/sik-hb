<?php

class Bukakasir_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_bukakasir(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('*');
		$this->db->from('v_bukakasir');    
        
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
            $this->db->limit(18,0);
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
      
        $this->db->select('*');
		$this->db->from('v_bukakasir');

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
	
	function get_stkasir(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('*');
        $this->db->from('stkasir');
		
		$this->db->order_by('idstkasir');
                
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function get_cbbagiandikasir(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("bagian");
		
		$this->db->where('idjnspelayanan = 7');
                
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function delete_bukakasir(){     
		$where['nokasir'] = $_POST['nokasir'];
		$del = $this->rhlib->deleteRecord('kasir',$where);
        return $del;
    }
	
	function insert_update_bukakasir(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('kasir',array('nokasir'=>$_POST['tf_nokasir']));
		if($query->num_rows() > 0) $pas = $this->update_bukakasir();
		else $pas = $this->insert_bukakasir();
		
        if($pas){
            $this->db->trans_commit();
            $ret["success"]=true;
        }else{
            $this->db->trans_rollback();
            $ret["success"]=false;
            //$ret["message"]='Simpan Data  Gagal';
        }
        echo json_encode($ret);
    }
		
	function insert_bukakasir(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('kasir',$dataArray);
        return $dataArray;
    }

	function update_bukakasir(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('nokasir', $_POST['nokasir']);
		$this->db->update('kasir', $dataArray);
        return $dataArray;
    }
	
	function getFieldsAndValues(){
			$ns = $this->getNoKasir();
			$nostart = 'K';
			$nomid = date('ym');
			$noend = str_pad($ns, 5, "0", STR_PAD_LEFT);
			$nokasir = $nostart.$nomid.$noend;
			
			$idshiftbuka		= (isset($_POST['idshiftbuka']))? $_POST['idshiftbuka'] : null;
		
		$dataArray = array(
			 'nokasir'		=> ($_POST['nokasir']) ? $_POST['nokasir']: $nokasir,
			 'tglbuka'		=> $_POST['tglbuka'],
             'jambuka'		=> $_POST['jambuka'],
             'idshiftbuka'	=> $idshiftbuka,
			 'userid'		=> $_POST['userid'],
			 'idbagian'		=> $_POST['idbagian'],
			 'saldoawal'	=> $_POST['saldoawal'],
			 'catatanbuka'	=> $_POST['catatanbuka'],		
			 'idstkasir'	=> $_POST['idstkasir']
		);
		return $dataArray;
	}
	
	function getNoKasir(){
		$this->db->select("count(nokasir) as no_k");
		$this->db->from("kasir");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['no_k'])) $max =1;
		else $max = $data['no_k'] + 1;
		return $max;
	}
}
