<?php

class Kamar_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_kamar(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('kamar.*, bagian.nmbagian');
        $this->db->from('kamar');
		$this->db->join('bagian',
                'bagian.idbagian = kamar.idbagian', 'left');
				
		$this->db->order_by('idbagian');
        
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
      
        $this->db->select('kamar.*, bagian.nmbagian');
        $this->db->from('kamar');
		$this->db->join('bagian',
                'bagian.idbagian = kamar.idbagian', 'left');

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
	
	function get_cbkamardibed(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('*');
        $this->db->from('v_cbdibed');
		
		$this->db->order_by('idkamar');
                
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
	
	function delete_kamar(){     
		$where['idkamar'] = $_POST['idkamar'];
		$del = $this->rhlib->deleteRecord('kamar',$where);
        return $del;
    }
		
	function insert_kamar(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('kamar',$dataArray);
        return $ret;
    }

	function update_kamar(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idkamar', $_POST['idkamar']);
		$this->db->update('kamar', $dataArray); 
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
             'idkamar'		=> $_POST['idkamar'],
			 'idbagian'		=> $_POST['idbagian'],
			 'kdkamar'		=> $_POST['kdkamar'],
             'nmkamar'		=> $_POST['nmkamar'],
			 'fasilitas'	=> $_POST['fasilitas'],
        );		
		return $dataArray;
	}
	
	function get_kamarbag(){
        $this->db->select('*');
        $this->db->from('kamar');
		$this->db->join('bagian',
                'bagian.idbagian = kamar.idbagian', 'left');
		$this->db->join('bed',
                'bed.idkamar = kamar.idkamar', 'left');
		$this->db->where('kamar.idbagian', $_POST['idbagian']);
		$this->db->order_by('kdkamar');
		
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = $q->num_rows();
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
}
