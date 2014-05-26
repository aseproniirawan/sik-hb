<?php

class Brgmedis_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_brgmedis(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('*');
		$this->db->from('v_barang');
		$this->db->order_by('kdbrg');        
        
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
      
        $this->db->select('*');
		$this->db->from('v_barang');
		$this->db->order_by('kdbrg');

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
	
	function delete_brgmedis(){     
		$where['kdbrg'] = $_POST['kdbrg'];
		$del = $this->rhlib->deleteRecord('barang',$where);
        return $del;
    }
	
	function insert_update_brgmedis(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('barang',array('kdbrg'=>$_POST['kdbrg']));
		if($query->num_rows() > 0) $pas = $this->update_brgmedis();
		else $pas = $this->insert_brgmedis();
		
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
		
	function insert_brgmedis(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('barang',$dataArray);
        return $dataArray;
    }

	function update_brgmedis(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('kdbrg', $_POST['kdbrg']);
		$this->db->update('barang', $dataArray);
        return $dataArray;
    }
	
	function getFieldsAndValues(){
		if(is_null($_POST['kdbrg']) || $_POST['kdbrg'] == '') $ns = $this->getNobrgmedis();
		else $ns = $_POST['kdbrg'];
			$nostart = 'B';
			$noend = str_pad($ns,9,"0",STR_PAD_LEFT);
			$kdbrg = $nostart.$noend;
		
		$dataArray = array(
			 'kdbrg'		=> ($_POST['kdbrg']) ? $_POST['kdbrg']: $kdbrg,
			 'idklpbrg'		=> $_POST['idklpbrg'],
             'idjnsbrg'		=> $_POST['idjnsbrg'],
             'nmbrg'		=> $_POST['nmbrg'],
			 'idsatuankcl'	=> $_POST['idsatuankcl'],
			 'rasio'		=> $_POST['rasio'],
			 'idsatuanbsr'	=> $_POST['idsatuanbsr'],
			 'hrgavg'		=> $_POST['hrgavg'],
			 'hrgbeli'		=> $_POST['hrgbeli'],
			 'idpabrik'		=> $_POST['idpabrik'],
			 'stokmin'		=> $_POST['stokmin'],			 
			 'stokmax'		=> $_POST['stokmax'],
			 'gambar'		=> $_POST['gambar'],
			 'keterangan'	=> $_POST['keterangan'],
			 'tglinput'		=> $_POST['tglinput'],
             'userinput'	=> $_POST['userinput']
			
		);
		return $dataArray;
	}
	
	function getNobrgmedis(){
		$this->db->select("count(kdbrg) as kd_b");
		$this->db->from("barang");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['kd_b'])) $max =1;
		else $max = $data['kd_b'] + 1;
		return $max;
	}	
}
