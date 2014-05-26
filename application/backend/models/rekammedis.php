<?php
class Rekammedis extends Model{
	
	function __construct(){
		parent::Model();
	}
	
	function getMutasiKRM(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		
		$nmjnspelayanan = $this->input->post("nmjnspelayanan");
		$stpasien = $this->input->post("nmstpasien");
		$nmpasien = $this->input->post("nmpasien");
		$norm = $this->input->post("norm");
		$nmbagian = $this->input->post("nmbagian");
		$lokasi = $this->input->post("kdlokasi");
		
		$this->db->select('*');
		$this->db->from('v_mutasikrm');		
		$this->db->where('idjnsstkrm',1);
		
		if($lokasi !='')$this->db->like('kdlokasi', $lokasi);
		if($nmjnspelayanan !='')$this->db->like('nmjnspelayanan', $nmjnspelayanan);
		if($stpasien != '')$this->db->like('nmstpasien',$stpasien);
		if($nmpasien != '')$this->db->like('nmpasien',$nmpasien);
		if($norm != '')$this->db->like('norm',$norm);
		if($nmbagian != '')$this->db->like('nmbagian',$nmbagian);
		
        $q = $this->db->get();
        
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
        
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        return $build_array;		
	}

	function getMutasiKRMKeluar(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		
		$nmjnspelayanan = $this->input->post("nmjnspelayanan");
		$stpasien = $this->input->post("nmstpasien");
		$nmpasien = $this->input->post("nmpasien");
		$norm = $this->input->post("norm");
		$nmbagian = $this->input->post("nmbagian");
		$lokasi = $this->input->post("kdlokasi");
		
		$this->db->select('*');
		$this->db->from('v_mutasikrm');
		$this->db->where('idstkrm',2);
		$this->db->where('idjnsstkrm',2);
		
		if($lokasi !='')$this->db->like('kdlokasi', $lokasi);
		if($nmjnspelayanan !='')$this->db->like('nmjnspelayanan', $nmjnspelayanan);
		if($stpasien != '')$this->db->like('nmstpasien',$stpasien);
		if($nmpasien != '')$this->db->like('nmpasien',$nmpasien);
		if($norm != '')$this->db->like('norm',$norm);
		if($nmbagian != '')$this->db->like('nmbagian',$nmbagian);
		
        $q = $this->db->get();
        
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
        
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        return $build_array;
	}

	function getBagian(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
      
        $this->db->select('bagian.*, lvlbagian.nmlvlbagian, jhirarki.nmjnshirarki, jpelayanan.nmjnspelayanan, bdgrawat.nmbdgrawat');
        $this->db->from('bagian');
		$this->db->join('lvlbagian',
                'lvlbagian.idlvlbagian = bagian.idlvlbagian', 'left');		
 		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = bagian.idjnshirarki', 'left');
		$this->db->join('jpelayanan',
                'jpelayanan.idjnspelayanan = bagian.idjnspelayanan', 'left');
		$this->db->join('bdgrawat',
                'bdgrawat.idbdgrawat = bagian.idbdgrawat', 'left');
		$this->db->where('kdbagian !=','null');
		$this->db->where('bagian.idlvlbagian <>',1);
		$this->db->order_by('bagian.nmbagian');
        
        
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
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        return $build_array;
	}

	function getLokasi(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		
		$this->db->select('*');
		$this->db->from('lokasi');		
		$this->db->group_by('kdlokasi');
				
        $q = $this->db->get();
        
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
        
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        return $build_array;
	}

	function getStatusBerkasRM(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		
		$this->db->select('*');
		$this->db->from('jstkrm');		
		$this->db->group_by('idjnsstkrm');
				
        $q = $this->db->get();
        
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
        
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        return $build_array;
	}

	function getHistory(){
		$start = $this->input->post("start");
        $limit = $this->input->post("limit");        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
		
        $norm = $this->input->post("norm");

		$this->db->select('*');
		$this->db->from('v_mutasikrm');				
		$this->db->order_by('tglminta');
		
		if($norm)$this->db->like('norm', $norm);

        $q = $this->db->get();
        
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
        
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        return $build_array;
	}

	function getHistoryRM(){
		$start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		
        $norm                  = $this->input->post("norm");
        $nmpasien                  = $this->input->post("nmpasien");
        $tgllahir                  = $this->input->post("tgllahir");
        $tptlahir                  = $this->input->post("tptlahir");
        $nmibu                  = $this->input->post("nmibu");
        $notelp                  = $this->input->post("notelp");
      
        $this->db->select("*");
        $this->db->from("pasien");
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = pasien.idjnskelamin', 'left');
		$this->db->join('daerah',
                'daerah.iddaerah = pasien.iddaerah', 'left');
		$this->db->join('lokasi',
                'pasien.idlokasi = lokasi.idlokasi','left');
		$this->db->order_by('norm desc');
		
        if($norm != '')$this->db->or_like('norm', $norm);
        if($nmpasien != '')$this->db->or_like('nmpasien', $nmpasien);
        if($tgllahir != '')$this->db->or_like('tgllahir', $tgllahir);
        if($tptlahir != '')$this->db->or_like('tptlahir', $tptlahir);
        if($nmibu != '')$this->db->or_like('nmibu', $nmibu);
        if($notelp != ''){
			$this->db->or_like('notelp', $notelp);
			$this->db->or_like('nohp', $notelp);
		}
		
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
		
        $datax = $this->db->count_all('pasien');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        return $build_array;
	}
	
	function keluarkanRM(){
		$k = array('[',']','"');
		$r = str_replace($k, '', $_POST['arr']);
		$b = explode(',', $r);
		$update = '';
		$user = $this->session->userdata['user_id'];
		foreach($b as $x){
			$y = explode('-', $x);
			$data = array(
				'idstkrm' => 2
			);
			$this->db->where('norm',$y[0]);
			$update = $this->db->update('pasien',$data);
			
			$data2 = array(
				'tglkeluar' => date('Y-m-d'),
				'jamkeluar' => date('H:i:s'),
				'idjnsstkrm' => 2,
				'useridkeluar' => $user
			);
			$this->db->where('idregdet', $y[1]);
			$update2 = $this->db->update('mutasikrm', $data2);
		}
		if($update && $update2){
			$res["success"] =  TRUE;
		} else {
			$res["success"] = FALSE;
		}
		
		return $res;
	}
	
	function terimaRM(){
		$k = array('[',']','"');
		$r = str_replace($k, '', $_POST['arr']);
		$b = explode(',', $r);
		$update = '';
		$user = $this->session->userdata['user_id'];
		foreach($b as $x){
			$y = explode('-', $x);
			$data = array(
				'idstkrm' => 1
			);
			$this->db->where('norm',$y[0]);
			$update = $this->db->update('pasien',$data);
			
			$data2 = array(
				'tglkembali' => date('Y-m-d'),
				'jamkembali' => date('H:i:s'),
				'idjnsstkrm' => 3,
				'useridkembali' => $user
			);
			$this->db->where('idregdet', $y[1]);
			$update2 = $this->db->update('mutasikrm', $data2);
		}
		if($update && $update2){
			$res["success"] =  TRUE;
		} else {
			$res["success"] = FALSE;
		}
		
		return $res;
	}
	
	function keluarkanRMScan(){
		$act = '';
		$act2 = '';
		$dt = array('idstkrm' => 2);		
		$norm = $_POST['norm'];
		$idregdet = $this->getIdregdet($norm,1);
				
		$this->db->where('norm',$norm);
		$act = $this->db->update('pasien',$dt);
		
		$user = $this->session->userdata['user_id'];
		$dt2 = array(
			'tglkeluar' => date('Y-m-d'),
			'jamkeluar' => date('H:i:s'),
			'useridkeluar' => $user
		);
		
		$this->db->where('idregdet', $idregdet);
		$act2 = $this->db->update('mutasikrm', $dt2);
				
		if($act && $act2){
			if($idregdet){
				$res["success"] =  1;
			} else {
				$res["success"] =  2;
			}				
		}
		
		return $res;
	}
	
	function terimaRMScann(){
		$act = '';
		$act2 = '';
		$dt = array('idstkrm' => 1);		
		$norm = $_POST['norm'];
		$idregdet = $this->getIdregdet($norm,2);
				
		$this->db->where('norm',$norm);
		$act = $this->db->update('pasien',$dt);
		
		$user = $this->session->userdata['user_id'];
		$dt2 = array(
			'tglkembali' => date('Y-m-d'),
			'jamkembali' => date('H:i:s'),
			'idjnsstkrm' => 2,
			'useridkembali' => $user
		);
		
		$this->db->where('idregdet', $idregdet);
		$act2 = $this->db->update('mutasikrm', $dt2);
				
		if($act && $act2){
			if($idregdet){
				$res["success"] =  1;
			} else {
				$res["success"] =  2;
			}				
		}
		return $res;
	}
	
	function getIdregdet($par,$par2){
		$this->db->select('*');
		$this->db->from('v_mutasikrm');
		$this->db->where('norm',$par);
		$this->db->where('idstkrm',$par2);
		$q = $this->db->get();
		$z=null;
		if($q->num_rows() > 0) {
			$data = $q->row_array();
			$z=$data['idregdet'];
		}
		return $z;
	}
	
	function ubahLokasi(){			
		$k = array('[',']','"');
		$r = str_replace($k, '', $_POST['arr']);
		$b = explode(',', $r);
		$update = '';
		$dt = array('idlokasi' => $_POST['idlokasi']);
		
		foreach($b as $x){
			$y = explode('-', $x);
			
			$this->db->where('norm',$y[0]);
			$update = $this->db->update('pasien',$dt);			
		}
		
		if($update){
			$res["success"] =  TRUE;
		} else {
			$res["success"] = FALSE;
		}
		
		return $res;
	}

	function ubahRiwayatRM(){					
		$op1 = '';
		$op2 = '';

		$dtLokasi = array('idlokasi' => $_POST['lok']);
		$dtStatus = array('idjnsstkrm' => $_POST['status']);

		$norm = $_POST['norm'];
		$idregdet = $_POST['idregdet'];
				
		$this->db->where('norm', $norm);
		$op1 = $this->db->update('pasien', $dtLokasi);	
		
		$this->db->where('idregdet', $idregdet);
		$op2 = $this->db->update('mutasikrm', $dtStatus);	
	
		if($op1 && $op2){
			$res["success"] =  TRUE;
		} else {
			$res["success"] = FALSE;
		}
		
		return $res;
	}

}
