<?php

class Jtransaksi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_jnstransaksi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('jtransaksi.*');
        $this->db->from('jtransaksi');
				
		$this->db->order_by('kdjnstransaksi');
        
        
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
      
        $this->db->select('jtransaksi.*');
        $this->db->from('jtransaksi');

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
	
	function delete_jnstransaksi(){     
		$where['idjnstransaksi'] = $_POST['idjnstransaksi'];
		$del = $this->rhlib->deleteRecord('jtransaksi',$where);
        return $del;
    }
		
	function insert_jnstransaksi(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('jtransaksi',$dataArray);
        return $ret;
    }

	function update_jnstransaksi(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idjnstransaksi', $_POST['idjnstransaksi']);
		$this->db->update('jtransaksi', $dataArray); 
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
             'idjnstransaksi'		=> $_POST['idjnstransaksi'],
			 'kdjnstransaksi'		=> $_POST['kdjnstransaksi'],
             'nmjnstransaksi'		=> $_POST['nmjnstransaksi']
        );		
		return $dataArray;
	}
	
}
