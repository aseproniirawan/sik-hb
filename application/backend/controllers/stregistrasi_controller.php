<?php

class Stregistrasi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_stregistrasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("stregistrasi");
        
        
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
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
    
        $this->db->select("*");
        $this->db->from("stregistrasi");        
        
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
	
	function delete_stregistrasi(){     
		$where['idstregistrasi'] = $_POST['idstregistrasi'];
		$del = $this->rhlib->deleteRecord('stregistrasi',$where);
        return $del;
    }
		
	function insert_stregistrasi(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('stregistrasi',$dataArray);
        return $ret;
    }

	function update_stregistrasi(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idstregistrasi', $_POST['idstregistrasi']);
		$this->db->update('stregistrasi', $dataArray); 
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
             'idstregistrasi'=> $_POST['idstregistrasi'],
             'kdstregistrasi'=> $_POST['kdstregistrasi'],
			 'nmstregistrasi'=> $_POST['nmstregistrasi']
        );		
		return $dataArray;
	}
}
