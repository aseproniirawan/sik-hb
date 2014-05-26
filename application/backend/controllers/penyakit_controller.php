<?php

class Penyakit_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_penyakit(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('penyakit.*, jhirarki.nmjnshirarki');
        $this->db->from('penyakit');
		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = penyakit.idjnshirarki', 'left');
				
		$this->db->order_by('kdpenyakit');
        
        
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
      
        $this->db->select('penyakit.*, jhirarki.nmjnshirarki');
        $this->db->from('penyakit');
		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = penyakit.idjnshirarki', 'left');

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
	
	function delete_penyakit(){     
		$where['idpenyakit'] = $_POST['idpenyakit'];
		$del = $this->rhlib->deleteRecord('penyakit',$where);
        return $del;
    }
		
	function insert_penyakit(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('penyakit',$dataArray);
        return $ret;
    }

	function update_penyakit(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idpenyakit', $_POST['idpenyakit']);
		$this->db->update('penyakit', $dataArray); 
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
	
	$penyakit =  $_POST['pen_idpenyakit']; 

	if($penyakit=="") $penyakit=null;
	
		$dataArray = array(
             'idpenyakit'		=> $_POST['idpenyakit'],
			 'kdpenyakit'		=> $_POST['kdpenyakit'],
             'nmpenyakit'		=> $_POST['nmpenyakit'],
             'nmpenyakiteng'	=> $_POST['nmpenyakiteng'],
			 'idjnshirarki'		=> $_POST['idjnshirarki'],
			 'pen_idpenyakit'	=> $this->id_penyakit('nmpenyakit',$penyakit),
        );		
/* 	var_dump($dataArray);
	exit; */
		return $dataArray;
	}
	
	function get_parent_penyakit(){ 
		$query = $this->db->getwhere('penyakit',array('idjnshirarki'=>'0'));
		$parent = $query->result();
		$ttl = count($parent);
        $arrPenyakit = array ("success"=>true,"results"=>$ttl,"data"=>$parent);
		echo json_encode($arrPenyakit);
    }
	
	function id_penyakit($where, $val){
		$query = $this->db->getwhere('penyakit',array($where=>$val));
		$id = $query->row_array();
		return  $id['idpenyakit'];
    }
	
	function getNmpenyakit(){
		$query = $this->db->getwhere('penyakit',array('idpenyakit'=>$_POST['pen_idpenyakit']));
		$nm = $query->row_array();
		echo json_encode($nm['nmpenyakit']);
    }	
}
