<?php

class Pelayanan_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_pelayanan(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('pelayanan.*, jpelayanan.nmjnspelayanan, jhirarki.nmjnshirarki, status.nmstatus');
        $this->db->from('pelayanan');
		$this->db->join('jpelayanan',
                'jpelayanan.idjnspelayanan = pelayanan.idjnspelayanan', 'left');
 		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = pelayanan.idjnshirarki', 'left');
		$this->db->join('status',
                'status.idstatus = pelayanan.idstatus', 'left');
				
		//$this->db->where('kdpelayanan > 0');
		$this->db->order_by('kdpelayanan');
        
        
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
	
        $this->db->select('pelayanan.*, jpelayanan.nmjnspelayanan, jhirarki.nmjnshirarki, status.nmstatus');
        $this->db->from('pelayanan');
		$this->db->join('jpelayanan',
                'jpelayanan.idjnspelayanan = pelayanan.idjnspelayanan', 'left');
 		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = pelayanan.idjnshirarki', 'left');
		$this->db->join('status',
                'status.idstatus = pelayanan.idstatus', 'left');

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
	
	function delete_pelayanan(){     
		$where['kdpelayanan'] = $_POST['kdpelayanan'];
		$del = $this->rhlib->deleteRecord('pelayanan',$where);
        return $del;
    }
		
	function insert_pelayanan(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('pelayanan',$dataArray);
        return $ret;
    }

	function update_pelayanan(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('kdpelayanan', $_POST['kdpelayanan']);
		$this->db->update('pelayanan', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
	
	function insert_update_pelayanan(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('pelayanan',array('kdpelayanan'=>$_POST['tf_kdpelayanan']));
		if($query->num_rows() > 0) $pas = $this->update_supplier();
		else $pas = $this->insert_supplier();
		
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
		
	function insert_supplier(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('pelayanan',$dataArray);
        return $dataArray;
    }

	function update_supplier(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('kdpelayanan', $_POST['tf_kdpelayanan']);
		$this->db->update('pelayanan', $dataArray);
        return $dataArray;
    }
			
	function getFieldsAndValues(){
		$ns = $this->getNoPelayanan();
		$nostart = 'T';
		$noend = str_pad($ns, 9, "0", STR_PAD_LEFT);
		$kdpelayanan = $nostart.$noend;
	
	$pelayanan =  $_POST['pel_kdpelayanan']; 

	if($pelayanan=="") $pelayanan=0;
	
		$dataArray = array(		
			 'kdpelayanan'		=> ($_POST['kdpelayanan']) ? $_POST['kdpelayanan']: $kdpelayanan,		 
             'nourut'			=> $_POST['nourut'],
             'nmpelayanan'		=> $_POST['nmpelayanan'],
             'idjnspelayanan'	=> $_POST['idjnspelayanan'],
			 'idjnshirarki'		=> $_POST['idjnshirarki'],
			 'idstatus'			=> $_POST['idstatus'],
			 'pel_kdpelayanan'	=> $this->kd_pelayanan('nmpelayanan',$pelayanan),
        );
		/* var_dump($dataArray);
		exit;  */
		return $dataArray;
	}
	
	function getNoPelayanan(){
		$this->db->select("count(kdpelayanan) as kd_p");
		$this->db->from("pelayanan");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['kd_p'])) $max =1;
		else $max = $data['kd_p'] + 1;
		return $max;
	}
	
	function get_parent_pelayanan(){ 
		$query = $this->db->getwhere('pelayanan',array('idjnshirarki'=>'0'));
		$parent = $query->result();
		$ttl = count($parent);
        $arrPelayanan = array ("success"=>true,"results"=>$ttl,"data"=>$parent);
		echo json_encode($arrPelayanan);
    }
	
	function kd_pelayanan($where, $val){
		$query = $this->db->getwhere('pelayanan',array($where=>$val));
		$id = $query->row_array();
		return  $id['kdpelayanan'];
    }
	
	function getNmpelayanan(){
		$query = $this->db->getwhere('pelayanan',array('kdpelayanan'=>$_POST['pel_kdpelayanan']));
		$nm = $query->row_array();
		echo json_encode($nm['nmpelayanan']);
    }
	
	function get_pelayanantotpumum_nonumum(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('pelayanan.*, jpelayanan.nmjnspelayanan, jhirarki.nmjnshirarki, status.nmstatus');
        $this->db->from('pelayanan');
		$this->db->join('jpelayanan',
                'jpelayanan.idjnspelayanan = pelayanan.idjnspelayanan', 'left');
 		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = pelayanan.idjnshirarki', 'left');
		$this->db->join('status',
                'status.idstatus = pelayanan.idstatus', 'left');
				
		$this->db->where('nourut > 0');
		$this->db->order_by('kdpelayanan');
        
        
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
	
}
