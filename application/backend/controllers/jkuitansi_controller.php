<?php

class Jkuitansi_Controller extends Controller {

    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
    function get_jkuitansi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*, jkas.nmjnskas");
        $this->db->from("jkuitansi");
		$this->db->join('jkas',
                'jkas.idjnskas = jkuitansi.idjnskas', 'left');
        
        
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
      
        $this->db->select("*, jkas.nmjnskas");
        $this->db->from("jkuitansi");
		$this->db->join('jkas',
                'jkas.idjnskas = jkuitansi.idjnskas', 'left');
    
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
    
    function delete_jkuitansi(){
        $where['idjnskuitansi'] = $_POST['idjnskuitansi'];
        $del = $this->rhlib->deleteRecord('jkuitansi',$where);
        return $del;
    }
    function insert_jkuitansi(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('jkuitansi',$dataArray);
        return $ret;
    }

	function update_jkuitansi(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idjnskuitansi', $_POST['idjnskuitansi']);
		$this->db->update('jkuitansi', $dataArray); 
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
             'idjnskuitansi'=> $_POST['idjnskuitansi'],
             'kdjnskuitansi'=> $_POST['kdjnskuitansi'],
			 'nmjnskuitansi'=> $_POST['nmjnskuitansi'],
             'idjnskas'		=> $_POST['idjnskas']
        );		
		return $dataArray;
	}
    
    

}
