<?php

class Stspasien_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();		
		$this->load->library('session');
		$this->load->library('rhlib');
    }
	
	function getStPasien(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
      
        $this->db->select('*');
        $this->db->from('stpasien');
		$this->db->group_by('nmstpasien');
		$this->db->order_by('kdstpasien');
        
        
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
	
	
	function get_stpasien(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('stpasien.*, jpelayanan.nmjnspelayanan');
        $this->db->from('stpasien');
		$this->db->join('jpelayanan',
                'jpelayanan.idjnspelayanan = stpasien.idjnspelayanan', 'left');
		$this->db->order_by('kdstpasien');
        
        
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
      
        $this->db->select('stpasien.*, jpelayanan.nmjnspelayanan');
        $this->db->from('stpasien');
		$this->db->join('jpelayanan',
                'jpelayanan.idjnspelayanan = stpasien.idjnspelayanan', 'left');
        
        
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
	
	function delete_stpasien(){     
		$where['idstpasien'] = $_POST['idstpasien'];
		$del = $this->rhlib->deleteRecord('stpasien',$where);
        return $del;
    }
		
	function insert_stpasien(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('stpasien',$dataArray);
        return $ret;
    }

	function update_stpasien(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idstpasien', $_POST['idstpasien']);
		$this->db->update('stpasien', $dataArray); 
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
             'idstpasien'=> $_POST['idstpasien'],
			 'idjnspelayanan'=> $_POST['idjnspelayanan'],
             'kdstpasien'=> $_POST['kdstpasien'],
			 'nmstpasien'=> $_POST['nmstpasien']
        );		
		return $dataArray;
	}
}
