<?php

class Lokasi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_lokasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('lokasi.*, bagian.nmbagian');
        $this->db->from('lokasi');
		$this->db->join('bagian',
                'bagian.idbagian = lokasi.idbagian', 'left');
				
		$this->db->order_by('kdlokasi');
        
        
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
      
        $this->db->select('lokasi.*, bagian.nmbagian');
        $this->db->from('lokasi');
		$this->db->join('bagian',
                'bagian.idbagian = lokasi.idbagian', 'left');

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
	
	function delete_lokasi(){     
		$where['idlokasi'] = $_POST['idlokasi'];
		$del = $this->rhlib->deleteRecord('lokasi',$where);
        return $del;
    }
		
	function insert_lokasi(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('lokasi',$dataArray);
        return $ret;
    }

	function update_lokasi(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idlokasi', $_POST['idlokasi']);
		$this->db->update('lokasi', $dataArray); 
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
             'idlokasi'	=> $_POST['idlokasi'],
			 'idbagian'	=> $_POST['idbagian'],
			 'kdlokasi'	=> $_POST['kdlokasi'],
             'nmlokasi'	=> $_POST['nmlokasi'],
        );		
		return $dataArray;
	}
	
}
