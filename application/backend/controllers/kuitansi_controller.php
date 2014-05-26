<?php

class Kuitansi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_kuitansi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("kuitansi");
        $this->db->join("kuitansidet",
				"kuitansidet.nokuitansi = kuitansi.nokuitansi", "left");
		$this->db->orderby("tglkuitansi desc");
        
        if($query !=""){
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
            $this->db->limit(50,0);
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
      
        $this->db->select("*");
        $this->db->from("kuitansi");
        $this->db->join("kuitansidet",
				"kuitansidet.nokuitansi = kuitansi.nokuitansi", "left");
		$this->db->orderby("tglkuitansi desc");
        
        if($query !=""){
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
	
	function delete_kuitansi(){     
		$where['nokuitansi'] = $_POST['tf_nokuitansi'];
		$del = $this->rhlib->deleteRecord('kuitansi',$where);
        return $del;
    }
		
	function insert_kuitansi(){
		$query = $this->db->getwhere('kuitansi',array('noreg'=>$_POST['noreg']));
		$kuitansi = $query->row_array();
		if($query->num_rows() == 0){
			$dataArray = $this->getFieldsAndValues();
			$kuitansi = $this->db->insert('kuitansi',$dataArray);
		} else {
			$kuitansi = $this->update_kuitansi();
		}
		
		$query = $this->db->getwhere('kuitansidet',array('nokuitansi'=>$kuitansi['nokuitansi']));
		$kuitansidet = $query->row_array();
		if($query->num_rows() == 0){
			$kuitansidet = $this->insert_kuitansidet($kuitansi);
		} else {
			$kuitansidet = $this->update_kuitansidet($kuitansi);
		}
		
		//$notadet = $this->update_notadet($kuitansi);
		
		if($kuitansi && $kuitansidet)
		{
			$ret["success"] = true;
            $ret["nokuitansi"]=$kuitansi['nokuitansi'];
		}else{
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
		
	function insert_kuitansidet($kuitansi){
		$dataArray = $this->getFieldsAndValuesDet($kuitansi);
		$z =$this->db->insert('kuitansidet',$dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
		
        return $ret;
    }
		
	function test(){
		$query = $this->db->getwhere('v_registrasi',array('noreg'=>$_POST['noreg']));
		$reg = $query->row_array();
		
		$query = $this->db->getwhere('kuitansi',array('idregdet'=>$reg['idregdet']));
		$kuitansi = $query->row_array();
		
		$ret["success"] = true;
		$ret["nokuitansi"]=$kuitansi['nokuitansi'];
		
		echo json_encode($ret);
    }

	function update_kuitansi(){
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('nokuitansi', $dataArray['nokuitansi']);
		$kuitansi = $this->db->update('kuitansi', $dataArray);
		
		return $dataArray;
    }
	
	function update_kuitansidet($kuitansi){
		$dataArray = $this->getFieldsAndValuesDet($kuitansi);
		
		//UPDATE
		$this->db->where('nokuitansi', $dataArray['nokuitansi']);
		$kuitansidet = $this->db->update('kuitansidet', $dataArray);
		
		return $dataArray;
    }
	
	function update_notadet($kuitansi){
		/* $query = $this->db->getwhere('v_registrasi',array('noreg'=>$_POST['noreg']));
		$reg = $query->row_array();
		
		$query = $this->db->getwhere('nota',array('idregdet'=>$reg['idregdet']));
		$nota = $query->row_array();
		
		//UPDATE
		$this->db->where('nonota', $nota['nonota']);
		$this->db->where('kditem', $_POST['kditem']);
		$this->db->where('idjnstarif', $_POST['idjnstarif']);
		$this->db->update('notadet', array('idstbypass'=>2)); */
    }

	function getFieldsAndValues(){
		$query = $this->db->getwhere('kuitansi',array('noreg'=>$_POST['noreg']));
		$kuitansi = $query->row_array();
		if(is_null($kuitansi['nokuitansi']) || $kuitansi['nokuitansi'] == '')
		{
			$nr = $this->getNokuitansi();
			$nostart = 'NK';
			$nomid = date('y');
			$noend = str_pad($nr, 8, "0", STR_PAD_LEFT);
			$nokuitansi = $nostart.$nomid.$noend;
		} else{
			$nokuitansi = $kuitansi['nokuitansi'];
		}
		
		/* var_dump($nokuitansi);
		exit; */
		$dataArray = array(
             'nokuitansi'=> $nokuitansi,
             'tglkuitansi'=> date('Y-m-d'),
             'jamkuitansi'=> date('H:i:s'),
             'idshift'=> 3,
             'noreg'=> $_POST['noreg'],
             'idstkuitansi'=> 1,
             'userid'=> $this->session->userdata['user_id'],
             //'idsbtnm'=> 1,
             //'atasnama'=> $reg['idregdet'],
             'idjnskas'=> 1,
             'idjnskuitansi'=> 1,
             'pembulatan'=> $_POST['pembulatan'],
             'total'=> $_POST['total'],
             //'ketina'=> 0,
             //'keteng'=> 0
        );		
		return $dataArray;
	}
			
	function getFieldsAndValuesDet($kuitansi){
		$dataArray = array(
             'nokuitansi'=> $kuitansi['nokuitansi'],
             'idbank'=> 1,
             'idcarabayar'=> 1,
             'jumlah'=> 1
        );
		return $dataArray;
	}
	
	function getNokuitansi(){
        $this->db->select("count(nokuitansi) AS max_np");
        $this->db->from("kuitansi");
        $this->db->where('SUBSTRING(nokuitansi,4,2)', date('y'));
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['max_np'])) $max = 1;
		else $max = $data['max_np'] + 1;
		return $max;
	}

	function searchId($select, $tbl, $where, $val){
        $this->db->select($select);
        $this->db->from($tbl);
        $this->db->where($where,$val);
		$q = $this->db->get();
		$id = $q->row_array();
		if($q->num_rows()<1){
			$id[$select] = null;
		}
		return $id[$select];
    }
}
