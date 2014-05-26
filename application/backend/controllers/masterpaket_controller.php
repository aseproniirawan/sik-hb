<?php

class Masterpaket_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
		
	function get_masterpaket(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		
		$this->db->select('tarifpaket.*, klstarif.nmklstarif');
        $this->db->from('tarifpaket');
		$this->db->join('klstarif',
                'klstarif.idklstarif = tarifpaket.idklstarif', 'left');
				
        $this->db->order_by('nmpaket');
        
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
      
        $this->db->select('tarifpaket.*, klstarif.nmklstarif');
        $this->db->from('tarifpaket');
		$this->db->join('klstarif',
                'klstarif.idklstarif = tarifpaket.idklstarif', 'left');
        
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
	
	function delete_masterpaket(){     
		$where['idtarifpaket'] = $_POST['idtarifpaket'];
		$where['idklstarif'] = $_POST['idklstarif'];
		$del = $this->rhlib->deleteRecord('tarifpaket',$where);
        return $del;
    }
		
	function insert_update_masterpaket(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('tarifpaket',array('idtarifpaket'=>$_POST['tf_idtarifpaket']));
		if($query->num_rows() > 0) $pas = $this->update_masterpaket();
		else $pas = $this->insert_masterpaket();
		
        if($pas){
            $this->db->trans_commit();
            $ret["success"]=true;
        }else{
            $this->db->trans_rollback();
            $ret["success"]=false;
            //$ret["message"]='Simpan Data  Gagal';
        }
        echo json_encode($ret);
    }
	
	function insert_masterpaket(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('tarifpaket',$dataArray);
        return $dataArray;
    }

	function update_masterpaket(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idtarifpaket', $_POST['idtarifpaket']);
		$this->db->update('tarifpaket', $dataArray);
        return $dataArray;
    }
			
	function getFieldsAndValues(){
		$ns = $this->getNoPpdet();
		$nostart = 'P';
		$noend = str_pad($ns, 9, "0", STR_PAD_LEFT);
		$idtf = $nostart.$noend;
		
		$dataArray = array(
             'idtarifpaket'	=> ($_POST['idtarifpaket']) ? $_POST['idtarifpaket']: $idtf, //$_POST['idtarifpaket'],
             'idklstarif'	=> $_POST['idklstarif'],
			 'nmpaket'		=> $_POST['nmpaket']
        );		
		return $dataArray;
	}
	
	function getNoPpdet(){
		$this->db->select("count(idtarifpaket) as id_tf");
		$this->db->from("tarifpaket");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['id_tf'])) $max =1;
		else $max = $data['id_tf'] + 1;
		return $max;
	}
	
}
