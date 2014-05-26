<?php

class Spdokter_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_spdokter(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("spesialisasi");
        
        
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
      
        $this->db->select("*");
        $this->db->from("spesialisasi");
        
        
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
	
	function delete_spdokter(){     
		$where['idspesialisasi'] = $_POST['idspesialisasi'];
		$del = $this->rhlib->deleteRecord('spesialisasi',$where);
        return $del;
    }
		
	function insert_spdokter(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('spesialisasi',$dataArray);
        return $ret;
    }

	function update_spdokter(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idspesialisasi', $_POST['idspesialisasi']);
		$this->db->update('spesialisasi', $dataArray); 
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
             'idspesialisasi'=> $_POST['idspesialisasi'],
             'kdspesialisasi'=> $_POST['kdspesialisasi'],
			 'nmspesialisasi'=> $_POST['nmspesialisasi']
        );		
		return $dataArray;
	}
}
