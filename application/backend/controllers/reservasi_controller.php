<?php

class Reservasi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_reservasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
		
        $tglreservasi           = $this->input->post("tglreservasi");
        $norm             		= $this->input->post("norm");
        $nmpasien             		= $this->input->post("nmpasien");
        $upel             		= $this->input->post("upel");
        $nmdokter                 = $this->input->post("nmdokter");
        $dokter                 = $this->input->post("dokter");
        $email                 = $this->input->post("email");
        $notelp                 = $this->input->post("notelp");
        $streservasi         	= $this->input->post("streservasi");
        $idreservasi         	= $this->input->post("idreservasi");
        $jpelayanan         	= $this->input->post("jpelayanan");
      
        $this->db->select("*, reservasi.norm as rnorm");
        $this->db->from("reservasi");
        $this->db->join("dokter", 
					"dokter.iddokter = reservasi.iddokter", "left"
		);
        $this->db->join("pasien", 
					"pasien.norm = reservasi.norm", "left"
		);
        $this->db->join("jkelamin", 
					"jkelamin.idjnskelamin = pasien.idjnskelamin", "left"
		);
        $this->db->join("registrasidet", 
					"registrasidet.idregdet = reservasi.idregdet", "left"
		);
        $this->db->join("stregistrasi", 
					"stregistrasi.idstregistrasi = registrasidet.idstregistrasi", "left"
		);
        $this->db->join("registrasi", 
					"registrasi.noreg = registrasidet.noreg", "left"
		);
        $this->db->join("stpasien", 
					"stpasien.idstpasien = registrasi.idstpasien", "left"
		);
        $this->db->join("stposisipasien", 
					"stposisipasien.idstposisipasien = reservasi.idstposisipasien", "left"
		);
        $this->db->join("bagian", 
					"bagian.idbagian = reservasi.idbagian", "left"
		);
		
		if($streservasi)$this->db->where('reservasi.idstreservasi',$streservasi);
		if($idreservasi)$this->db->where('reservasi.idreservasi',$idreservasi);
		if($jpelayanan)$this->db->where('bagian.idjnspelayanan',$jpelayanan);
		
		$this->db->order_by('tglreservasi desc, noantrian asc');
		
		if($norm)$this->db->or_like('pasien.norm',$norm);
		if($nmpasien)$this->db->or_like('pasien.nmpasien',$nmpasien);
		if($tglreservasi)$this->db->or_like('reservasi.tglreservasi',$tglreservasi);
		if($upel)$this->db->or_like('registrasidet.idbagian',$upel);
		if($dokter)$this->db->where('reservasi.iddokter',$dokter);
		if($nmdokter)$this->db->or_like('dokter.nmdoktergelar',$nmdokter);
		if($email)$this->db->or_like('reservasi.email',$email);
		if($notelp){
			$this->db->or_like('reservasi.nohp',$notelp);
			$this->db->or_like('reservasi.notelp',$notelp);
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
		
        $ttl = $this->numrow();
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function numrow(){
        $tglreservasi           = $this->input->post("tglreservasi");
        $norm             		= $this->input->post("norm");
        $nmpasien             		= $this->input->post("nmpasien");
        $upel             		= $this->input->post("upel");
        $nmdokter                 = $this->input->post("nmdokter");
        $dokter                 = $this->input->post("dokter");
        $email                 = $this->input->post("email");
        $notelp                 = $this->input->post("notelp");
        $streservasi         	= $this->input->post("streservasi");
        $idreservasi         	= $this->input->post("idreservasi");
        $jpelayanan         	= $this->input->post("jpelayanan");
      
        $this->db->select("*, reservasi.norm as rnorm");
        $this->db->from("reservasi");
        $this->db->join("dokter", 
					"dokter.iddokter = reservasi.iddokter", "left"
		);
        $this->db->join("pasien", 
					"pasien.norm = reservasi.norm", "left"
		);
        $this->db->join("jkelamin", 
					"jkelamin.idjnskelamin = pasien.idjnskelamin", "left"
		);
        $this->db->join("registrasidet", 
					"registrasidet.idregdet = reservasi.idregdet", "left"
		);
        $this->db->join("stregistrasi", 
					"stregistrasi.idstregistrasi = registrasidet.idstregistrasi", "left"
		);
        $this->db->join("registrasi", 
					"registrasi.noreg = registrasidet.noreg", "left"
		);
        $this->db->join("stpasien", 
					"stpasien.idstpasien = registrasi.idstpasien", "left"
		);
        $this->db->join("stposisipasien", 
					"stposisipasien.idstposisipasien = reservasi.idstposisipasien", "left"
		);
        $this->db->join("bagian", 
					"bagian.idbagian = reservasi.idbagian", "left"
		);
		
		if($streservasi)$this->db->where('reservasi.idstreservasi',$streservasi);
		if($idreservasi)$this->db->where('reservasi.idreservasi',$idreservasi);
		if($jpelayanan)$this->db->where('bagian.idjnspelayanan',$jpelayanan);
		
		$this->db->order_by('tglreservasi desc, noantrian asc');
		
		if($norm)$this->db->or_like('pasien.norm',$norm);
		if($nmpasien)$this->db->or_like('pasien.nmpasien',$nmpasien);
		if($tglreservasi)$this->db->or_like('reservasi.tglreservasi',$tglreservasi);
		if($upel)$this->db->or_like('registrasidet.idbagian',$upel);
		if($dokter)$this->db->where('reservasi.iddokter',$dokter);
		if($nmdokter)$this->db->or_like('dokter.nmdoktergelar',$nmdokter);
		if($email)$this->db->or_like('reservasi.email',$email);
		if($notelp){
			$this->db->or_like('reservasi.nohp',$notelp);
			$this->db->or_like('reservasi.notelp',$notelp);
		}
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function insorupd_reservasi(){
	 /*  //registrasi
		$query = $this->db->getwhere('registrasi',array('noreg'=>$_POST['tf_noreg']));
		if($query->num_rows() > 0) $reg = $this->update_registrasi();
		else $reg = $this->insert_registrasi();
		
	  //registrasi detail
		$regdet = $this->insert_registrasidet($reg);
		
	  //reservasi
		$res = $this->insert_reservasi($reg, $regdet);
		
		if($reg && $regdet && $res)
		{
			$ret["success"] = true;
            $ret["noreg"]=$regdet['noreg'];
		}else{
			$ret["success"] = false;
		}
		
		echo json_encode($ret); */
    }
		
	function insert_reservasi(){
		$dataArray = $this->getFieldsAndValuesRes($reg, $regdet);
		$this->rhlib->insertRecord('reservasi',$dataArray);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret=$dataArray;
        }else{
            $ret["success"]=false;
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

	function getFieldsAndValues(){
		$this->db->select('max(idregdet) as max');
		$this->db->from('registrasidet');
		$q = $this->db->get();
		$dataregdet = $q->row_array();
		$dataArray = array(
             'tglreservasi'=> date_format(date_create($regdet['tglreg']), 'Y-m-d'),
             'jamreservasi'=> date_format(date_create($regdet['jamreg']), 'H:i:s'),
             'idshift'=> $regdet['idshift'],
             'norm'=> $reg['norm'],
             'nmpasien'=> $_POST['tf_nmpasien'],
             'alamat'=> $_POST['alamat'],
             'notelp'=> $_POST['notelp'],
             'nohp'=> $_POST['nohp'],
             'iddokter'=> $regdet['iddokter'],
             'idbagian'=> $regdet['idbagian'],
             'idstreservasi'=> 1,
             'idregdet'=> $dataregdet['max'],
             //'noantrian'=> $this->idKamar('nmkamar',$_POST['tf_nmkamar']),
             'userinput'=> $this->session->userdata['username'],
             'tglinput'=> date('Y-m-d')
        );		
		return $dataArray;
	}
	
	function getNoantrian(){
        $nmbagian                  = $this->input->post("nmbagian");
        $nmdokter                  = $this->input->post("nmdokter");
		$idbagian = $this->searchId('idbagian','bagian','nmbagian',$nmbagian);
		$iddokter = $this->searchId('iddokter','dokter','nmdoktergelar',$nmdokter);
		
        $this->db->select("count(idreservasi) AS max_np");
        $this->db->from("reservasi");
        $this->db->where('tglreservasi', date('Y-m-d'));
		if($idbagian)$this->db->where('idbagian', $idbagian);
		if($iddokter)$this->db->where('iddokter', $iddokter);
        
		$q = $this->db->get();
		$data = $q->row_array();
        $ret["antrian"]=$data['max_np'];
		
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
	
	function updateStposisipasien(){
        $idreservasi		= $this->input->post("idreservasi");
        $idstposisipasien	= $this->input->post("idstposisipasien");
	
		$this->db->where('idreservasi', $idreservasi);
		$data = array(
             'idstposisipasien'=> $idstposisipasien
        );
		$z = $this->db->update('reservasi', $data);
		if($z){
			$ret = true;
		} else {
			$ret = false;
		}
		
		return json_encode($ret);
	}
	
	function getRegres(){
        $idreservasi		= $this->input->post("idreservasi");
		
        $this->db->select("*");
        $this->db->from("reservasi");
        $this->db->join("bagian", 
					"bagian.idbagian = reservasi.idbagian", "left"
		);
        $this->db->join("dokter", 
					"dokter.iddokter = reservasi.iddokter", "left"
		);
        $this->db->where('idreservasi', $idreservasi);
		$q = $this->db->get();
		$data = $q->row_array();
        //$ret["antrian"]=$data['idbagian'];
		
		echo json_encode($data);
	}
}
