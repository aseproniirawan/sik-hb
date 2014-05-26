<?php 

	class ReservasiRJ_Controller extends Controller {
		public function __construct()
		{
			parent::Controller();
				$this->load->library('session');
				$this->load->library('rhlib');
		}
		
		function get_reservasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		
        $norm                  = $this->input->post("idbagian");
		$tglreservasi	= $this->input->post("tglreservasi");
		$aa	= $this->input->post("iddokter");
      
        $this->db->select("*,stposisipasien.nmstposisipasien as namaposisipasien, stposisipasien.nmstposisipasien as `namaposisipasien`");
        $this->db->from("reservasi");
        $this->db->join("streservasi", 
        				"streservasi.idstreservasi  = reservasi.idstreservasi","left");
        
        $this->db->join("stposisipasien", 
					"stposisipasien.idstposisipasien = reservasi.idstposisipasien","left"
		);
		/*
        $this->db->join("registrasidet", 
					"registrasidet.idregdet = reservasi.idregdet", "left"
		);
		 */
		$this->db->where("idbagian", $norm);
		$this->db->where("tglreservasi", $tglreservasi);
		//$this->db->order_by('tglreservasi, noantrian desc'); 
        
        
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
            $this->db->limit(18,0);
        }
        
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $datax = $this->db->count_all('reservasi');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
		
		function insert_reservasi(){
			$dataArray =  $this->getFieldsAndValues();
			$this->rhlib->insertRecord('reservasi',$dataArray);
			if($this->db->affected_rows()){
				$ret["success"] = true;
				$ret = $dataArray;
			}else{
				$ret["success"] = false;
				
			}
			return $ret;
		}
		
		function update_reservasi(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('noreg', $dataArray['noreg']);
		$this->db->update('registrasi', $dataArray);

        if ($this->db->trans_status() === FALSE)
        {
            $ret["success"]=false;
        }
        else
        {
            $ret["success"]=true;
            $ret=$dataArray;
        }
        return $ret;
    }

    	function batal(){
    		$dataArray = $this->getBatal();

    		$this->db->where('idreservasi', $_POST['tf_idreservasi']);
    		$this->db->update('reservasi',$dataArray);

    		if ($this->db->trans_status() === FALSE){
				$ret["success"] = false;
			}else{
				$ret["success"]=true;
				$ret = $dataArray;
			}
			return $ret;
    	}
		
		function getBatal(){
			$dataArray = array(
					'idreservasi' => $_POST['tf_idreservasi'],
					'idstreservasi'=> 2,
				);
			return $dataArray;
		}

		function getFieldsAndValues(){
		
			$dataArray = array(
				'tglreservasi' => date_format(date_create($_POST['df_tgl']), 'Y-m-d'),
				'jamreservasi' => $_POST['tf_jam'],
				'idshift'=> 1,
				'norm'=> $_POST['tf_norm'],
				'nmpasien'=> $_POST['tf_nmpasien'],
				'notelp' => $_POST['tf_telp'],
				'nohp' => $_POST['tf_hp'],
				'email'=> $_POST['tf_email'],
				'idbagian'=> $_POST['idbagian'],
				'iddokter'=> $_POST['tf_iddokter'],
           		'idstreservasi' => 1,
				//'idregdet' => $_POST[],
				'noantrian' =>($_POST['tf_jmlpantri'] + 1),
				'userinput'=> $this->session->userdata['username'],
				'tglinput'=> date('Y-m-d'),
				'idstposisipasien' => 1,
			);
		return $dataArray;
		}
		
		function getDataPasien(){
			$norm = str_pad($_POST['norm'], 10, "0", STR_PAD_LEFT);
			$this->db->select("*");
			$this->db->from("pasien");
			$this->db->where('norm',$norm);
			$q = $this->db->get();
			$pasien = $q->row_array();
			echo json_encode($pasien);
		}
		
		function getNoantrian(){
        $this->db->select("count(idreservasi) AS max_np");
        $this->db->from("reservasi");
        $this->db->where('tglreservasi', date('Y-m-d'));
		$q = $this->db->get();
		$data = $q->row_array();
		 if(is_null($data['max_np'])) $max = 1;
		else $max = $data['max_np'] + 1;
		
		//$ret["max"] = $max; 
        $ret["antrian"]=$data['max_np'];
		//return $ret;
		echo json_encode($ret);
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

    /* function getExportDate($table,$valuedate,$valuetime,valueshift) {
		$q = "SELECT * FROM ".$table." where date(tglreservasi) = '".$valuedate."' and jamreservasi='".$valuetime."' and idshift='".$valueshift."'" ;
        $query = $this->db->query($q);
		
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return array();
       } 
	   
    } */

    function getExportDate($table,$valuedate) {
		$q = "SELECT * FROM ".$table." where date(tglreservasi) = '".$valuedate."'" ;
        $query = $this->db->query($q);
		
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return array();
       } 
	   
    }

    function getExportDateDetail($table,$valuedate) {
		$q = "SELECT * FROM ".$table." where date(tglreservasi) = '".$valuedate."'" ;
        $query = $this->db->query($q);
		
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return array();
       } 
	   
    }
 

    function getNumRows($table) {
       
        $query = $this->db->get($table);
		
        return $query->num_rows();
       
	   
    }

    function exportexcel($dateval) {

		$tablename='v_reservasi';
	//	$viewname='reservasi';

		$data['eksport'] = $this->getExportDate($tablename,$dateval);//,$timeval,$shiftval);
	//	$data['eksportview'] = $this->getExportDate($tablename,$dateval);//,$timeval,$shiftval);
		$data['table'] = $tablename;
		$data['fieldname'] = $this->db->list_fields($tablename);
		$data['numrows'] = $this->getNumRows($tablename);
		$this->load->view('exportexcel', $data); 	
	}
	function reminderR(){
		$tgl = $this->input->post("tglreservasi");
		$norm = $this->input->post("norm");
		$idbagian = $this->input->post("idbagian");
		$iddokter = $this->input->post("iddokter");
		
		$this->db->select("*");
		$this->db->from("reservasi");
		$this->db->where("tglreservasi",$tgl);
		$this->db->where("norm",$norm);
		$this->db->where("idbagian",$idbagian);
		$this->db->where("iddokter",$iddokter);
		$q = $this->db->get();
			$dokt = $q->row_array();
			echo json_encode($dokt);
		
	}
}