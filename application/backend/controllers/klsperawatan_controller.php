<?php

class Klsperawatan_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_klsperawatan(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('klsrawat.*, bagian.nmbagian, klstarif.nmklstarif');
        $this->db->from('klsrawat');
		$this->db->join('bagian',
                'bagian.idbagian = klsrawat.idbagian', 'left');
		$this->db->join('klstarif',
                'klstarif.idklstarif = klsrawat.idklstarif', 'left');
				
		$this->db->order_by('kdklsrawat');
        
        
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

        $this->db->select('klsrawat.*, bagian.nmbagian, klstarif.nmklstarif');
        $this->db->from('klsrawat');
		$this->db->join('bagian',
                'bagian.idbagian = klsrawat.idbagian', 'left');
		$this->db->join('klstarif',
                'klstarif.idklstarif = klsrawat.idklstarif', 'left');
        
        
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
	
	function delete_klsperawatan(){     
		$where['idklsrawat'] = $_POST['idklsrawat'];
		$del = $this->rhlib->deleteRecord('klsrawat',$where);
        return $del;
    }
		
	function insert_klsperawatan(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('klsrawat',$dataArray);
        return $ret;
    }

	function update_klsperawatan(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idklsrawat', $_POST['idklsrawat']);
		$this->db->update('klsrawat', $dataArray); 
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
             'idklsrawat'=> $_POST['idklsrawat'],
             'idbagian'=> $_POST['idbagian'],
			 'idklstarif'=> $_POST['idklstarif'],
             'kdklsrawat'=> $_POST['kdklsrawat'],
			 'nmklsrawat'=> $_POST['nmklsrawat']
        );		
		return $dataArray;
	}
	
	function get_bagianklsperawatan(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('*');
        $this->db->from('v_bagianklsperawatan');        
        
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
		
        $ttl = $this->nw($fields, $query);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function nw($fields, $query){

        $this->db->select('*');
        $this->db->from('v_bagianklsperawatan');
        
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
}
