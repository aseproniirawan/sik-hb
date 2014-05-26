<?php

class Stdokterrawat_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_stdokterrawat(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('stdokterrawat.*');
        $this->db->from('stdokterrawat');
				
		$this->db->order_by('kdstdokterrawat');
        
        
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
            $this->db->limit(20,0);
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
      
        $this->db->select('stdokterrawat.*');
        $this->db->from('stdokterrawat');

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
	
	function delete_stdokterrawat(){     
		$where['idstdokterrawat'] = $_POST['idstdokterrawat'];
		$del = $this->rhlib->deleteRecord('stdokterrawat',$where);
        return $del;
    }
		
	function insert_stdokterrawat(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('stdokterrawat',$dataArray);
        return $ret;
    }

	function update_stdokterrawat(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idstdokterrawat', $_POST['idstdokterrawat']);
		$this->db->update('stdokterrawat', $dataArray); 
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
             'idstdokterrawat'		=> $_POST['idstdokterrawat'],
			 'kdstdokterrawat'		=> $_POST['kdstdokterrawat'],
             'nmstdokterrawat'		=> $_POST['nmstdokterrawat']
        );		
		return $dataArray;
	}
	
}
