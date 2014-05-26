<?php 

class Purchaseorder_Controller extends Controller {
	public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_PO(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		$po = $this->input->post("idbagian");
		$this->db->select("*");
		$this->db->from("po");
		$this->db->join("podet", "po.nopo = podet.nopo", "left");
		$this->db->where("nopo", $_POST['tf_nopo']);
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
		
        $datax = $this->db->count_all('po');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
	}
	
	
	function insorupd_po(){
		$this->db->trans_begin();
		$arrpo = $this->input->post("arrpo");
		$query = $this->db->getwhere('po',array('nopo'=>$_POST['nopo']));
		$po = $query->row_array();
		
		if($query->num_rows() == 0){
			$pos = $this->insert_po($po);
			$vpo = $pos['nopo'];
		}else{
			$pos = $query->row_array();
			$vpo = $pos['nopo'];
		}
		$podet = $this->insert_podet($vpo, $arrpo);
		if($po && $podet)
		{
            $this->db->trans_commit();
			$ret["success"] = true;
            $ret["nopo"]=$vpo;
		}else{
            $this->db->trans_rollback();
			$ret["success"] = false;
		}
		echo json_encode($ret);
  
		
	}
	
	function insert_po(){
		$dataArray = $this->getFieldsAndValues();
		$z = $this->db->insert('po',$dataArray);
		if($z){
			$ret = $dataArray;
		}else{
			$ret = false;
		}
		return $ret;
	}
	
	function insert_podet($nopo){
		//$where['nopol'] = $nopol;
	//	$this->db->delete('podet', $where);
		
		$k=array('[',']', '"');
		$r= str_replace($k, '', $_POST['arrpo']);
		$b = explode(',',$r);
		foreach($b as $val){
			
			$vale = explode('-', $val);
				$dataArray = $this->getFieldsAndValuesDet($vale[0],$vale[1],$nopo);
				$z = $this->db->insert('podet',$dataArray);
		}
		return true;
	}
	
	function getFieldsAndValues(){
		if(is_null($_POST['nopo']) || $_POST['nopo'] == ''){
			$no = $this->getNoPO();
			$nostart = "PO";
			$nomid = date('y');
			$nombln = date('m');
			$noend = str_pad($no, 5, "0", STR_PAD_LEFT);
			$nopo = $nostart.$nomid.$nombln.$noend;
		}else{
			$nopo = $_POST['nopo'];
		}
		$dataArray = array(
			'nopo' => $nopo,
			'tglpo' => date('Y-m-d'),
			'idjnspp' => $_POST['idjnspp'],
		//	'nopp' => $_POST[''],
		//	'tglpp' => '',
			'idbagian' => $_POST['idbagian'],
			'kdsupplier' => $_POST['kdsupplier'],
			'idsypembayaran' => $_POST['idsypembayaran'],
			'idjnspembayaran' => $_POST['idjnspembayaran'],
			'tglpengiriman' => date('Y-m-d'),
			'idstpo' => $_POST['idstpo'],
		//	'idstsetuju' => $_POST['idstsetuju'],
		//	'idmatauang' => '',
			'bpb' => $_POST['bpb'],
			'ketpo' => $_POST['keterangan'],
			'idstdiskon' => $_POST['idstdiskon'],
			'diskon' => $_POST['diskon'],
		//	'ppnrp' => '',
			'totalpo' => $_POST['totalpo'],
		//	'userinput'=> $this->session->userdata['username'],
            'tglinput'=> date('Y-m-d'),
		//	'approval1' => '',
		//	'approval2' => '', 
		);
		return $dataArray;
	}
	
	function getFieldsAndValuesDet($val1,$val2,$nopo){
	$query = $this->db->getwhere('hrgbrgsup',array('kdbrg'=>$val1));
	$item = $query = $query->row_array();
		$dataArray = array(
			'nopo' => $nopo,
			'kdbrg' => $val1,
			'idsatuan' => 1,
			'qty' => $val2,
			'idhrgbrgsup' => 1,
		);
		return $dataArray;
	}
	
	function getNoPO(){
		$this->db->select("count(nopo) AS max_np");
        $this->db->from("po");
        $this->db->where('SUBSTRING(nopo,3,2)', date('y'));
		$q = $this->db->get();
		$data = $q->row_array();
		var_dump($data['max_np']);
		if(is_null($data['max_np'])) $max = 1;
		else $max = $data['max_np'] + 1;
		return $max;
	}
}