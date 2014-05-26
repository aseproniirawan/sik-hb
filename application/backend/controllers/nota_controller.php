<?php

class Nota_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_nota(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
        $idregdet                  = $this->input->post("idregdet");
        $jpel                  = $this->input->post("jpel");
        $grupby                  = $this->input->post("grupby");
		if($grupby){
			$this->db->select("*,
					if(SUBSTRING(notadet.kditem,1,1)='T', pelayanan.nmpelayanan, barang.nmbrg) nmitem,
					(notadet.tarifjs + notadet.tarifjm + notadet.tarifjp + notadet.tarifbhp) tarif,
					SUM(notadet.uangr) ctotal
			", false);
        }else{
			$this->db->select("*,
					if(SUBSTRING(notadet.kditem,1,1)='T', pelayanan.nmpelayanan, barang.nmbrg) nmitem,
					(notadet.tarifjs + notadet.tarifjm + notadet.tarifjp + notadet.tarifbhp) tarif
			", false);
		}
        $this->db->from("nota");
        $this->db->join("notadet",
				"notadet.nonota = nota.nonota", "left");
        $this->db->join("pelayanan",
				"pelayanan.kdpelayanan = notadet.kditem", "left");
        $this->db->join("barang",
				"barang.kdbrg = notadet.kditem", "left");
        $this->db->join("dokter",
				"dokter.iddokter = notadet.iddokter", "left");
        $this->db->join("perawat",
				"perawat.idperawat = notadet.idperawat", "left");
        $this->db->join("satuan",
				"satuan.idsatuan = notadet.idsatuan", "left");
        $this->db->join("bagian",
				"bagian.idbagian = nota.idbagian", "left");
		
		if($idregdet)$this->db->where("idregdet", $idregdet);
		if($jpel)$this->db->where("bagian.idjnspelayanan", $jpel);
		if($grupby)$this->db->group_by("nota.nonota");
		$this->db->orderby("tglnota desc");
        
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
      
        $this->db->select("*,
				if(notadet.idjnstarif=2, pelayanan.nmpelayanan, barang.nmbrg) nmitem,
				(notadet.tarifjs + notadet.tarifjm + notadet.tarifjp + notadet.tarifbhp) tarif
		", false);
        $this->db->from("nota");
        $this->db->join("notadet",
				"notadet.nonota = nota.nonota", "left");
        $this->db->join("pelayanan",
				"pelayanan.kdpelayanan = notadet.kditem", "left");
        $this->db->join("barang",
				"barang.kdbrg = notadet.kditem", "left");
        $this->db->join("dokter",
				"dokter.iddokter = notadet.iddokter", "left");
        $this->db->join("perawat",
				"perawat.idperawat = notadet.idperawat", "left");
        $this->db->join("satuan",
				"satuan.idsatuan = notadet.idsatuan", "left");
		$this->db->where("idregdet", $_POST['idregdet']);
		$this->db->orderby("tglnota desc");
        
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
	
	function get_notax(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
		
        $idregdet                  = $this->input->post("idregdet");
        $jpel                  = $this->input->post("jpel");
        $batal                  = $this->input->post("batal");
		
		$this->db->select("*");
        $this->db->from("nota");
        $this->db->join("dokter",
				"dokter.iddokter = nota.iddokter", "left");
        $this->db->join("bagian",
				"bagian.idbagian = nota.idbagian", "left");
        $this->db->join("registrasidet",
				"registrasidet.idregdet = nota.idregdet", "left");
        $this->db->join("registrasi",
				"registrasi.noreg = registrasidet.noreg", "left");
        $this->db->join("pasien",
				"pasien.norm = registrasi.norm", "left");
        $this->db->join("penjamin",
				"penjamin.idpenjamin = registrasi.idpenjamin", "left");
		
		if($jpel)$this->db->where("bagian.idjnspelayanan", $jpel);
		if($batal)$this->db->where("nota.idsttransaksi !=", $batal);
		$this->db->orderby("tglnota desc");
                
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
		
        $ttl = $this->numrowx();
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function numrowx(){
        $jpel                  = $this->input->post("jpel");
		
		$this->db->select("*");
        $this->db->from("nota");
        $this->db->join("dokter",
				"dokter.iddokter = nota.iddokter", "left");
        $this->db->join("bagian",
				"bagian.idbagian = nota.idbagian", "left");
        $this->db->join("registrasidet",
				"registrasidet.idregdet = nota.idregdet", "left");
        $this->db->join("registrasi",
				"registrasi.noreg = registrasidet.noreg", "left");
        $this->db->join("pasien",
				"pasien.norm = registrasi.norm", "left");
        $this->db->join("penjamin",
				"penjamin.idpenjamin = registrasi.idpenjamin", "left");
		
		if($jpel)$this->db->where("bagian.idjnspelayanan", $jpel);
		$this->db->orderby("tglnota desc");
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function get_kuinota(){
		$query = $this->db->getwhere('v_registrasi',array('noreg'=>$_POST['noreg']));
		$reg = $query->row_array();
		
        $this->db->select("*,
				(notadet.tarifjs + notadet.tarifjm + notadet.tarifjp + notadet.tarifbhp) tarif,
				SUM(notadet.uangr) ctotal
		", false);
        $this->db->from("nota");
        $this->db->join("notadet",
				"notadet.nonota = nota.nonota", "left");
		$this->db->where("nota.idregdet", $reg['idregdet']);
		$this->db->where("notadet.nonota", $_POST['nonota']);
		$this->db->where("notadet.idstbypass", 1);
		$this->db->orderby("tglnota desc");
        
        $q = $this->db->get();
        $data = $q->row_array();
		
        echo json_encode($data);
    }
	
	function delete_notadet(){
		$where['nonota'] = $_POST['nonota'];
		$where['kditem'] = $_POST['kditem'];
		$where['idjnstarif'] = $_POST['idjnstarif'];
		$del = $this->rhlib->deleteRecord('notadet',$where);
		
		if($del)
		{
			$ret["success"] = true;
            $ret["nonota"]=$_POST['nonota'];
		}else{
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
	
	function delete_bnotadet(){
		
        $k=array('[',']','"');
        $r=str_replace($k, '', $_POST['arr']);
		$b=explode(',', $r);
		foreach($b AS $x){
			$y=explode('-', $x);
			$where['nonota'] = $_POST['nonota'];
			$where['kditem'] = $y[0];
			$where['idjnstarif'] = $y[1];
			$del = $this->rhlib->deleteRecord('notadet',$where);
		}
		
		if($del)
		{
			$ret["success"] = true;
            $ret["nonota"]=$_POST['nonota'];
		}else{
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
	
	function batal_nota(){
		$dataArray = array(
             'idsttransaksi'=> 2
        );		
		$this->db->where('nonota', $_POST['nonota']);
		$z =$this->db->update('nota', $dataArray);
		
		if($z)
		{
			$ret["success"] = true;
            $ret["nonota"]=$_POST['nonota'];
		}else{
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
		
	function insorupd_nota(){
        $this->db->trans_begin();
		$arrnota = $this->input->post("arrnota");
		$query = $this->db->getwhere('v_registrasi',array('noreg'=>$_POST['noreg']));
		$reg = $query->row_array();
		
		/* $query = $this->db->getwhere('kuitansi',array('noreg'=>$_POST['noreg']));
		if($query->num_rows() == 0){
			$kque = $this->insert_kuitansi($reg);
			$kui = $kque['nokuitansi'];
		} else {
			$kque = $query->row_array();
			$kui = $kque['nokuitansi'];
		}
		
		$query = $this->db->getwhere('kuitansidet',array('nokuitansi'=>$kui));
		if($query->num_rows() == 0){
			$kuidet = $this->insert_kuitansidet($kui);
		} else {
			$kuidet = true;
		} */
		
		$query = $this->db->getwhere('nota',array('idregdet'=>$reg['idregdet']));
		if($query->num_rows() == 0){
			$nota = $this->insert_nota($reg);
			$vnota = $nota['nonota'];
		} else {
			$nota = $query->row_array();
			$vnota = $nota['nonota'];
		}
		
		$notadet = $this->insert_notadet($vnota, $reg, $arrnota);
		
		if($nota && $notadet)
		{
            $this->db->trans_commit();
			$ret["success"] = true;
            $ret["nonota"]=$vnota;
		}else{
            $this->db->trans_rollback();
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
		
	/* function insert_kuitansi($reg){
		$dataArray = $this->getFieldsAndValuesKui($reg);
		$z =$this->db->insert('kuitansi',$dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }
		
	function insert_kuitansidet($kui){
		$dataArray = $this->getFieldsAndValuesKuiDet($kui);
		$z =$this->db->insert('kuitansidet',$dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    } */
		
	function insert_nota($reg){
		$dataArray = $this->getFieldsAndValues($reg);
		$z =$this->db->insert('nota',$dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }
		
	function insert_notadet($nota, $reg, $arrnota){
		$where['nonota'] = $nota;
		$this->db->delete('notadet',$where);
		
		$k=array('[',']','"');
        $r=str_replace($k, '', $arrnota);
		$b=explode(',', $r);
		foreach($b AS $val){
			$dataArray = $this->getFieldsAndValuesDet($nota, $reg, $val);
			$z =$this->db->insert('notadet',$dataArray);
		}
		
        return true;
    }
		
	function test(){
		$query = $this->db->getwhere('v_registrasi',array('noreg'=>$_POST['noreg']));
		$reg = $query->row_array();
		
		$query = $this->db->getwhere('nota',array('idregdet'=>$reg['idregdet']));
		$nota = $query->row_array();
		
		$ret["success"] = true;
		$ret["nonota"]=$nota['nonota'];
		
		echo json_encode($ret);
    }

	function update_nota(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('nonota', $_POST['tf_nonota']);
		$this->db->update('nota', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
	
	/* function getFieldsAndValuesKui($reg){
		$shift = $this->input->post("tf_waktushift");
		$noreg = $this->input->post("noreg");
		$jpel = $this->input->post("jpel");
		
		$nk = $this->getNokuitansi();
		$nostart = 'KUI';
		$nomid = date('y');
		$noend = str_pad($nk, 7, "0", STR_PAD_LEFT);
		$nokuitansi = $nostart.$nomid.$noend;
		
		$dataArray = array(
             'nokuitansi'=> $nokuitansi,
             'tglkuitansi'=> date('Y-m-d'),
             'jamkuitansi'=> date('H:i:s'),
             'idshift'=> $this->searchId('idshift','shift','nmshift',$shift),
             'noreg'=> $noreg,
             'idstkuitansi'=> 1,
             'userid'=> $this->session->userdata['user_id'],
             'idsbtnm'=> $this->searchSbtnm('idsbtnm','jsbtnm',$reg['umurtahun'], $reg['idjnskelamin']),
             'atasnama'=> $reg['nmpasien'],
             //'idjnskas'=> 1,
             'idjnskuitansi'=> $this->searchId('idjnskuitansi','jkuitansi','nmjnskuitansi',$jpel),
             'pembulatan'=> 0,
             'total'=> 0,
             //'ketina'=> $_POST['catatan'],
             //'keteng'=> 0
        );		
		return $dataArray;
	}
	
	function getFieldsAndValuesKuiDet($kui){
		$dataArray = array(
             'nokuitansi'=> $kui,
             //'idbank'=> date('Y-m-d'),
             'idcarabayar'=> 1,
             'jumlah'=> 0
        );		
		return $dataArray;
	} */
	
	function getFieldsAndValues($reg){
		
		if(is_null($_POST['nonota']) || $_POST['nonota'] == '')
		{
			$nr = $this->getNonota();
			$nostart = 'NPM';
			$nomid = date('y');
			$nombln = date('m');
			$noend = str_pad($nr, 5, "0", STR_PAD_LEFT);
			$nonota = $nostart.$nomid.$nombln.$noend;
		} else{
			$nonota = $_POST['nonota'];
		}
		$dataArray = array(
             'nonota'=> $nonota,
             'nona'=> $nonota,
             'tglnota'=> date('Y-m-d'),
             'jamnota'=> date('H:i:s'),
             'idbagian'=> $reg['idbagian'],
             'iddokter'=> $reg['iddokter'],
             'idjnstransaksi'=> 2,
             'idsttransaksi'=> 1,
             //'nokuitansi'=> $kui,
             'idregdet'=> $reg['idregdet'],
             'noorder'=> 1,
             'idshift'=> $this->searchId('idshift','shift','nmshift',$_POST['nmshift']),
             'noresep'=> 1,
             'catatan'=> $_POST['catatan'],
             'diskon'=> 0,
             'uangr'=> 0,
             'userinput'=> $this->session->userdata['username'],
             'tglinput'=> date('Y-m-d'),
			 'idregdettransfer'=> null
        );		
		return $dataArray;
	}
	
	function getFieldsAndValuesDet($nota, $reg, $val){
		$query = $this->db->getwhere('v_tarifall',array('kditem'=>$val));
		$item = $query->row_array();
		if(!$item['tarifjs']) $item['tarifjs'] = 0;
		if(!$item['tarifjm']) $item['tarifjm'] = 0;
		if(!$item['tarifjp']) $item['tarifjp'] = 0;
		if(!$item['tarifbhp']) $item['tarifbhp'] = 0;
		$dataArray = array(
             'nonota'=> $nota,
             'kditem'=> $val,
             //'idjnstarif'=> 0,
             //'kdresep'=> $_POST['kdnota'],
             //'idsatuan'=> 1,
             //'qty'=> 0,
             'tarifjs'=> $item['tarifjs'],
             'tarifjm'=> $item['tarifjm'],
             'tarifjp'=> $item['tarifjp'],
             'tarifbhp'=> $item['tarifbhp'],
             'diskonjs'=> 0,
             'diskonjm'=> 0,
             'diskonjp'=> 0,
             'diskonbhp'=> 0,
             //'uangr'=> 0,
             'iddokter'=> $reg['iddokter'],
             'idperawat'=> 1,
			 'idstbypass'=> 1
        );
		return $dataArray;
	}
	
	function getNonota(){
        $this->db->select("count(nonota) AS max_np");
        $this->db->from("nota");
        $this->db->where('SUBSTRING(nonota,4,2)', date('y'));
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['max_np'])) $max = 1;
		else $max = $data['max_np'] + 1;
		return $max;
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
	
	function searchSbtnm($select, $tbl, $val, $val2){
        $this->db->select($select);
        $this->db->from($tbl);
        $this->db->where('dariumur >=', $val);
        $this->db->where('sampaiumur <=', $val);
        $this->db->where('idjnskelamin', $val2);
		$q = $this->db->get();
		$id = $q->row_array();
		if($q->num_rows()<1){
			$id[$select] = null;
		}
		return $id[$select];
    }
}
