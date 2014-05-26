<?php

class Registrasi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function getRegistrasi(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
      
        $this->db->select("*,
        registrasi.noreg as zzz, registrasi.noreg as `registrasi.noreg`,
		oruangan.nooruangan as xy, oruangan.nooruangan as `oruangan.nooruangan`,
		oruangan.catatan as ooc, oruangan.catatan as `oruangan.catatan`");
        $this->db->from("registrasi");		
        $this->db->join("registrasidet","registrasidet.noreg = registrasi.noreg","left");
		$this->db->join("oruangan","oruangan.nooruangan = registrasidet.nooruangan", "left");
		$this->db->join("pasien","pasien.norm = registrasi.norm", "left");
		$this->db->join("kamar","kamar.idkamar = registrasidet.idkamar", "left");
		$this->db->join("bed","bed.idbed = registrasidet.idbed", "left");		
		$this->db->order_by('registrasi.noreg desc');
                
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
		
        $datax = $this->db->count_all('registrasi');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
	}

	function getStatusBed(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
 	    
        $this->db->select("nmklsrawat,nmkamar,nmbed,nmstbed,tglmasuk,jammasuk,nmpasien,nmdokter,tglrencanakeluar,
        		floor(timestampdiff(hour,cast(concat(registrasidet.tglmasuk,' ',registrasidet.jammasuk)as datetime),
                cast(concat(registrasidet.tglkeluar,' ',registrasidet.jamkeluar)as datetime)) / 24) as hari,
                timestampdiff(hour,cast(concat_ws(' ',registrasidet.tglmasuk,registrasidet.jammasuk)as datetime),
        		cast(concat_ws(' ',registrasidet.tglkeluar,registrasidet.jamkeluar)as datetime)) % 24 as jam",false);
        $this->db->from("klsrawat"); 
        $this->db->join("registrasidet","registrasidet.idklsrawat = klsrawat.idklsrawat");
        $this->db->join("registrasi","registrasi.noreg = registrasidet.noreg");
        $this->db->join("kamar","registrasidet.idkamar = kamar.idkamar");
        $this->db->join("bed","registrasidet.idbed = bed.idbed");
        $this->db->join("stbed","bed.idstbed = stbed.idstbed");
		$this->db->join("pasien","registrasi.norm = pasien.norm");
		$this->db->join("dokter","registrasidet.iddokter = dokter.iddokter");
        
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
	
	function get_registrasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*, registrasi.noreg as zzz, registrasi.noreg as `registrasi.noreg`, 
						pasien.alamat as xxx, pasien.alamat as `pasien.alamat`, 
						registrasi.catatan as catatanreg, 
						klsrawat.kdklsrawat as kelastarif,klsrawat.kdklsrawat as`klsrawat.kdklsrawat`,klsrawat.idklsrawat as idklsrawat,
						registrasidet.idregdet as`registrasidet.idregdet`,registrasidet.idregdet as idregdet,registrasidet.idregdet as`registrasidet.idregdet`,
						registrasidet.idklstarif as`registrasidet.idklstarif`,registrasidet.idklstarif as idklstarif,registrasidet.idklstarif as`registrasidet.idklstarif`");
        $this->db->from("registrasi");
        $this->db->join("pasien", 
					"pasien.norm = registrasi.norm", "left"
		);
        $this->db->join("jkelamin", 
					"pasien.idjnskelamin = jkelamin.idjnskelamin", "left"
		);
        $this->db->join("jpelayanan", 
					"jpelayanan.idjnspelayanan = registrasi.idjnspelayanan", "left"
		);
        $this->db->join("stpasien", 
					"stpasien.idstpasien = registrasi.idstpasien", "left"
		);
        $this->db->join("registrasidet", 
					"registrasidet.noreg = registrasi.noreg", "left"
		);
		$this->db->join("oruangan",
					"oruangan.nooruangan = registrasidet.nooruangan","left"
		);
        $this->db->join("klsrawat", 
					"registrasidet.idklsrawat = klsrawat.idklsrawat", "left"
		);
        $this->db->join("bagian", 
					"registrasidet.idbagian = bagian.idbagian", "left"
		);
        $this->db->join("kamar", 
					"registrasidet.idkamar = kamar.idkamar", "left"
		);
        $this->db->join("bed", 
					"registrasidet.idbed = bed.idbed", "left"
		);
        $this->db->join("dokter", 
					"registrasidet.iddokter = dokter.iddokter", "left"
		);
        $this->db->join("penjamin", 
					"penjamin.idpenjamin = registrasi.idpenjamin", "left"
		);
		$this->db->join("klstarif",
					"klstarif.idklstarif = registrasidet.idklstarif", "left"
		);	
		$this->db->where('registrasidet.userbatal', null);
		$this->db->order_by('registrasi.noreg desc');
        
        
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
		
        $datax = $this->db->count_all('registrasi');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function insorupd_registrasi(){
		$arrnota = $this->input->post("arrnota");
	  //registrasi
        $this->db->trans_begin();
		$query = $this->db->getwhere('registrasi',array('noreg'=>$_POST['tf_noreg']));
		if($query->num_rows() > 0) $reg = $this->update_registrasi();
		else $reg = $this->insert_registrasi();
		
	  //registrasi detail
		$regdet = $this->insert_registrasidet($reg);
		
	  //reservasi
		$res = $this->insert_reservasi($reg, $regdet);
		
	  //mutasi krm
		$query = $this->db->getwhere('mutasikrm',array('idregdet'=>$res['idregdet']));
		if($query->num_rows() > 0){
			$mtskrm = false;
		} else {
			$mtskrm = $this->insert_mutasikrm($res['idregdet']);
		}
		$nota['nokuitansi'] = '';
		$nota['nonota'] = '';
		if(strlen($arrnota) >2) $nota = $this->insorupd_nota($regdet, $arrnota);
		
		if($reg && $regdet && $res && $mtskrm)
		{
            $this->db->trans_commit();
			$ret["success"] = true;
            $ret["noreg"]=$regdet['noreg'];
            $ret["noantrian"]=$res['noantrian'];
            $ret["nokuitansi"]=$nota['nokuitansi'];
            $ret["nonota"]=$nota['nonota'];
		}else{
            $this->db->trans_rollback();
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
	
	function insorupd_regperawat(){
	  //registrasi
        $this->db->trans_begin();
		$query = $this->db->getwhere('registrasi',array('noreg'=>$_POST['tf_noreg']));
		if($query->num_rows() > 0) $regper = $this->update_registrasiper();
		//else $regper = $this->insert_registrasiper();
		
		if($regper)
		{
            $this->db->trans_commit();
			$ret["success"] = true;
		}else{
            $this->db->trans_rollback();
			$ret["success"] = false;
		}
		
		echo json_encode($ret);
    }
	
	function batal_registrasi(){
		$dataArray['noreg'] = $_POST['tf_noreg'];
		$dataArray['userbatal'] = $this->session->userdata['username'];
		$dataArray['tglbatal'] = date('Y-m-d');
		$this->db->where('noreg', $dataArray['noreg']);
		$this->db->update('registrasidet', $dataArray);

        if ($this->db->trans_status() === FALSE)
        {
            $ret["success"]=false;
        }
        else
        {
            $ret["success"]=true;
        }
        echo json_encode($ret);
    }
		
	function insert_registrasi(){
		$dataArray = $this->getFieldsAndValues();
		$z =$this->db->insert('registrasi', $dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret = false;
        }
        return $ret;
    }
		
	function insert_registrasidet($reg){
		$dataArray = $this->getFieldsAndValuesDet($reg);
		$z =$this->db->insert('registrasidet', $dataArray);
        if($z){
            $ret=$dataArray;
			$ret['idregdet'] = $this->db->insert_id();
        }else{
            $ret=false;
        }
        return $ret;
    }
	
	function insert_registrasiper(){
		$dataArray = $this->getFieldsAndValuesPer();
		$this->rhlib->insertRecord('registrasidet',$dataArray);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret=$dataArray;
        }else{
            $ret["success"]=false;
            $ret=$dataArray;
        }
        return $ret;
    }
		
	function insert_reservasi($reg, $regdet){
		$dataArray = $this->getFieldsAndValuesRes($reg, $regdet);
		$z =$this->db->insert('reservasi', $dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }
	
	function insert_mutasikrm($regdet){
		$dataArray = $this->getFieldsAndValuesMtsKrm($regdet);
		$z =$this->db->insert('mutasikrm', $dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }

	function update_registrasi(){ 				
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

	function update_registrasidet($reg){ 				
		$dataArray = $this->getFieldsAndValuesDet($reg);
		
		//UPDATE
		$this->db->where('noregdetistrasidet', $_POST['tf_noregdet']);
		$this->db->update('registrasidet', $dataArray);

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
	
	function update_registrasiper(){ 				
		$dataArray = $this->getFieldsAndValuesPer();
		
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
		if($_POST['ureg'] == 'RJ'){
			$nostart = 'RJ';
			$_POST['ta_keluhan'] = null;
			$_POST['tf_nmkerabat'] = null;
			$_POST['tf_notelpkerabat'] = null;
			$_POST['tf_ruangan'] = null;
			$_POST['tf_dokterrawat'] = null;
			$_POST['tf_klsperawatan'] = null;
			$_POST['tf_nmkamar'] = null;
			$_POST['tf_nmbed'] = null;
			$_POST['cb_hubkeluarga'] = 'Pilih...';
			$_POST['idjnspelayanan'] = 1;
			$_POST['tf_dokterrawat'] = $_POST['tf_dokter'];
			$_POST['tf_ruangan'] = $_POST['tf_upelayanan'];
			$_POST['tf_noantrian'] = ($_POST['tf_jmlpantri'] + 1);
			$jpel = 'IRJ';
		} elseif($_POST['ureg'] == 'RI'){
			$nostart = 'RI';
			$_POST['idjnspelayanan'] = 2;
			$_POST['tf_noantrian'] = null;
			$jpel = 'IRI';
		} elseif($_POST['ureg'] == 'UG'){
			$nostart = 'UG';
			$_POST['ta_keluhan'] = null;
			$_POST['tf_nmkerabat'] = null;
			$_POST['tf_notelpkerabat'] = null;
			$_POST['tf_ruangan'] = null;
			$_POST['tf_dokterrawat'] = null;
			$_POST['tf_klsperawatan'] = null;
			$_POST['tf_nmkamar'] = null;
			$_POST['tf_nmbed'] = null;
			$_POST['cb_hubkeluarga'] = 'Pilih...';
			$_POST['idjnspelayanan'] = 3;
			$_POST['tf_dokterrawat'] = $_POST['tf_dokter'];
			$_POST['tf_noantrian'] = ($_POST['tf_jmlpantri'] + 1);
			$_POST['tf_ruangan'] = $_POST['tf_upelayanan'];
			$jpel = 'IGD';
		}
		
		if(is_null($_POST['tf_noreg']) || $_POST['tf_noreg'] == '')
		{
			$nr = $this->getNoregistrasi();
			$nomid = date('y');
			$noend = str_pad($nr, 6, "0", STR_PAD_LEFT);
			$noregistrasi = $nostart.$nomid.$noend;
		} else{
			$noregistrasi = $_POST['tf_noreg'];
		}
		
		$dataArray = array(
             'noreg'=> $noregistrasi,
             'norm'=> $_POST['tf_norm'],
             'idpenjamin'=> $this->searchId('idpenjamin','penjamin','nmpenjamin',$_POST['tf_penjamin']),
             'idjnspelayanan'=> $_POST['idjnspelayanan'],
             'idstpasien'=> 1,
             'keluhan'=> $_POST['ta_keluhan'],
             'nmkerabat'=> $_POST['tf_nmkerabat'],
             'notelpkerabat'=> $_POST['tf_notelpkerabat'],
             'idhubkeluarga'=> ($_POST['cb_hubkeluarga'] == 'Pilih...')?null:$this->searchId('idhubkeluarga','hubkeluarga','nmhubkeluarga',$_POST['cb_hubkeluarga']),
             'catatan'=> $_POST['ta_catatan']
        );		
		return $dataArray;
	}

	function getFieldsAndValuesDet($reg){
		$dataArray = array(
             'noregdet'=> 1,
             'noreg'=> $reg['noreg'],
             'tglreg'=> date_format(date_create($_POST['df_tglshift']), 'Y-m-d'),
             'jamreg'=> date_format(date_create($_POST['tf_jamshift']), 'H:i:s'),
             'idshift'=> $this->searchId('idshift','shift','nmshift',$_POST['tf_waktushift']),
             'idbagiankirim'=> ($_POST['tf_upengirim']!='')?$this->searchId('idbagian','bagian','nmbagian',$_POST['tf_upengirim']):null,
             'iddokterkirim'=> ($_POST['tf_dkirim']!='')?$dkirim = $this->searchId('iddokter','dokter','nmdoktergelar',$_POST['tf_dkirim']):null,
             'nmdokterkirim'=> (isset($dkirim))?null:$_POST['tf_dkirim'],
             'idbagian'=> $this->searchId('idbagian','bagian','nmbagian',$_POST['tf_ruangan']),
             'iddokter'=> $this->searchId('iddokter','dokter','nmdoktergelar',$_POST['tf_dokterrawat']),
             'idcaradatang'=> $this->searchId('idcaradatang','caradatang','nmcaradatang',$_POST['cb_caradatang']),
             'tglmasuk'=> date('Y-m-d'),
             'jammasuk'=> date('H:i:s'),
             //'tglkeluar'=> $_POST['tf_noreg'],
             //'jamkeluar'=> $_POST['tf_noreg'],
             //'catatankeluar'=> $_POST['tf_noreg'],
             'umurtahun'=> $_POST['tf_umurthn'],
             'umurbulan'=> $_POST['tf_umurbln'],
             'umurhari'=> $_POST['tf_umurhari'],
             'idklsrawat'=> $this->searchId('idklsrawat','klsrawat','nmklsrawat',$_POST['tf_klsperawatan']),
             'idklstarif'=> $this->searchId('idklstarif','klsrawat','nmklsrawat',$_POST['tf_klsperawatan']),
             'idkamar'=> $this->searchId('idkamar','kamar','nmkamar',$_POST['tf_nmkamar']),
             'idbed'=> $this->searchId('idbed','bed','nmbed',$_POST['tf_nmbed']),
             //'idstkeluar'=> $_POST['tf_noreg'],
             //'nooruangan'=> $_POST['tf_noreg'],
             'idstregistrasi'=> 1,
             'userinput'=> $this->session->userdata['user_id'],
             'tglinput'=> date('Y-m-d'),
             //'userbatal'=> $noregdetistrasidet,
             //'tglbatal'=> $_POST['tf_notelpkerabat']
        );		
		return $dataArray;
	}
	
	function getFieldsAndValuesPer(){
		$noreg = $this->input->post("tf_noreg");
		$keluhan = $this->input->post("ta_keluhan");
		$catatan = $this->input->post("ta_catatanreg");
		$tinggi = $this->input->post("tf_tinggi");
		$berat = $this->input->post("tf_berat");
		$systole = $this->input->post("tf_systole");
		$diastole = $this->input->post("tf_diastole");
		
		
		$dataArray = array(
             'noreg'=> $noreg,
             'keluhan'=> $keluhan,
             'catatan'=> $catatan,
             'tinggibadan'=> $tinggi,
             'beratbadan'=> $berat,
             'systole'=> $systole,
             'diastole'=> $diastole
        );		
		return $dataArray;
	}

	function getFieldsAndValuesRes($reg, $regdet){
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
             //'email'=> $_POST['alamat'],
             'notelp'=> $_POST['notelp'],
             'nohp'=> $_POST['nohp'],
             'iddokter'=> $regdet['iddokter'],
             'idbagian'=> $regdet['idbagian'],
             'idstreservasi'=> 1,
             'idregdet'=> $dataregdet['max'],
             'noantrian'=> $_POST['tf_noantrian'],
             'userinput'=> $this->session->userdata['username'],
             'tglinput'=> date('Y-m-d'),
             'idstposisipasien'=> 2
        );		
		return $dataArray;
	}
	
	function getFieldsAndValuesMtsKrm($regdet){
		if($_POST['ureg'] == 'RJ'){
			$nostart = 'RJ';
		} elseif($_POST['ureg'] == 'RI'){
			$nostart = 'RI';
		} elseif($_POST['ureg'] == 'UG'){
			$nostart = 'UG';
		} else{
			$nostart = 'EL';
		}
		
		$nr = $this->getNomutasikrm();
		$nomid = date('y');
		$noend = str_pad($nr, 6, "0", STR_PAD_LEFT);
		$nomutasikrm = $nostart.$nomid.$noend;
		
		$this->db->select('max(idregdet) as max');
		$this->db->from('registrasidet');
		$q = $this->db->get();
		$dataregdet = $q->row_array();
		$dataArray = array(
             'nomutasikrm'=> $nomutasikrm,
             'idregdet'=> $regdet,
             'idjnsstkrm'=> 1,
             'idjnsrefkrm'=> 1,
             'tglminta'=> date('Y-m-d'),
             'jamminta'=> date('H:i:s')
        );		
		return $dataArray;
	}
	
	function getNoregistrasi(){
        $this->db->select("count(noreg) AS max_np");
        $this->db->from("registrasi");
        $this->db->where('SUBSTRING(noreg,1,2)', $_POST['ureg']);
        $this->db->where('SUBSTRING(noreg,3,2)', date('y'));
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['max_np'])) $max = 1;
		else $max = $data['max_np'] + 1;
		return $max;
	}
	
	function getNomutasikrm(){
        $this->db->select("count(nomutasikrm) AS max_np");
        $this->db->from("mutasikrm");
        $this->db->where('SUBSTRING(nomutasikrm,1,2)', $_POST['ureg']);
        $this->db->where('SUBSTRING(nomutasikrm,3,2)', date('y'));
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

	function insorupd_nota($regdet, $arrnota){
		$kque = $this->insert_kuitansi($regdet);
		$kui = $kque['nokuitansi'];
		
		$kuidet = $this->insert_kuitansidet($kui);
		
		$nota = $this->insert_nota($regdet, $kui);
		$vnota = $nota['nonota'];
		
		$notadet = $this->insert_notadet($vnota, $regdet, $arrnota);
		$ret['nokuitansi'] = $kui;
		$ret['nonota'] = $vnota;
		return $ret;
    }
		
	function insert_kuitansi($regdet){
		$dataArray = $this->getFieldsAndValuesKui($regdet);
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
    }
		
	function insert_nota($regdet, $kui){
		$dataArray = $this->getFieldsAndValuesNota($regdet, $kui);
		$z =$this->db->insert('nota',$dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }
		
	function insert_notadet($nota, $regdet, $arrnota){
		$k=array('[',']','"');
        $r=str_replace($k, '', $arrnota);
		$b=explode(',', $r);
		foreach($b AS $val){
			$dataArray = $this->getFieldsAndValuesNotaDet($nota, $regdet, $val);
			$z =$this->db->insert('notadet',$dataArray);
		}
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }

	function getFieldsAndValuesKui($regdet){
		if($_POST['ureg'] == 'RJ'){
			$jpel = 'IRJ';
		} elseif($_POST['ureg'] == 'RI'){
			$jpel = 'IRI';
		} elseif($_POST['ureg'] == 'UG'){
			$jpel = 'IGD';
		}
		
		$nk = $this->getNokuitansi();
		$nostart = 'KUI';
		$nomid = date('y');
		$noend = str_pad($nk, 7, "0", STR_PAD_LEFT);
		$nokuitansi = $nostart.$nomid.$noend;
		
		$dataArray = array(
             'nokuitansi'=> $nokuitansi,
             'tglkuitansi'=> date('Y-m-d'),
             'jamkuitansi'=> date('H:i:s'),
             'idshift'=> $regdet['idshift'],
             //'noreg'=> $regdet['noreg'],
             'idstkuitansi'=> 1,
             //'userid'=> $this->session->userdata['user_id'],
             'idsbtnm'=> $this->searchSbtnm('idsbtnm','jsbtnm',$regdet['umurtahun'], $this->searchId('idjnskelamin','pasien','norm',$_POST['tf_norm'])),
             'atasnama'=> $this->searchId('nmpasien','pasien','norm',$_POST['tf_norm']),
             //'idjnskas'=> 1,
             'idjnskuitansi'=> $this->searchId('idjnskuitansi','jkuitansi','kdjnskuitansi',$jpel),
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
             'idcarabayar'=> $this->searchId('idcarabayar','carabayar','nmcarabayar',$_POST['cb_carabayar']),
             'jumlah'=> 0
        );		
		return $dataArray;
	}
	
	function getFieldsAndValuesNota($regdet, $kui){
		$nr = $this->getNonota();
		$nostart = 'NPM';
		$nomid = date('y');
		$nombln = date('m');
		$noend = str_pad($nr, 5, "0", STR_PAD_LEFT);
		$nonota = $nostart.$nomid.$nombln.$noend;
		
		$dataArray = array(
             'nonota'=> $nonota,
             'nona'=> $nonota,
             'tglnota'=> date('Y-m-d'),
             'jamnota'=> date('H:i:s'),
             'idbagian'=> $regdet['idbagian'],
             'iddokter'=> $regdet['iddokter'],
             'idjnstransaksi'=> 1,
             'idsttransaksi'=> 1,
             'nokuitansi'=> $kui,
             'idregdet'=> $regdet['idregdet'],
             'noorder'=> 1,
             'idshift'=> $regdet['idshift'],
             'noresep'=> 1,
             'catatan'=> $_POST['ta_catatan'],
             'diskon'=> 0,
             'uangr'=> 0,
             'userinput'=> $this->session->userdata['username'],
             'tglinput'=> date('Y-m-d'),
			 'idregdettransfer'=> null
        );		
		return $dataArray;
	}
	
	function getFieldsAndValuesNotaDet($nota, $regdet, $val){
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
             'iddokter'=> $regdet['iddokter'],
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
