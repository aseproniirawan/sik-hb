<?php 

class Regispaspulang_Controller extends Controller{
	public function __construct(){
		parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
	}
	
	function get_regispaspulang(){
		$start = $this->input->post("start");
		$limit = $this->input->post("limit");
		
		$fields = $this->input->post("fields");
		$query = $this->input->post("query");
		
		$this->db->select("*");
		$this->db->from("registrasidet");
		
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
		
        $datax = $this->db->count_all('registrasidet');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
	}
	function update_regispaspulang(){
		$dataArray = $this->getFieldsAndValues();
		
		$this->db->where('noreg', $_POST['tf_noregis']);
		$this->db->update('registrasidet', $dataArray);
		
		if ($this->db->trans_status() === FALSE){
				
				$this->db->trans_rollback();
				$ret["success"]=false;
				$ret["message"]="Ubah Data Gagal";
				//$ret = $dataArray;
			}else{
			$this->db->trans_commit();
				$ret["success"] = false;
				$ret["message"]="Ubah Data Berhasil";
			}
		//echo json_encode($ret);
		return $ret;
	}
	function getFieldsAndValues(){
		$dataArray = array(
			'noreg'=> $_POST['tf_noregis'],
			'idstkeluar' => $_POST['cb_keadaankeluar'],
			'catatanrencanakeluar' => $_POST['ta_catatan'],
		);
		return $dataArray;
	}
}