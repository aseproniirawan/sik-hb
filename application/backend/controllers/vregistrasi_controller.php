<?php

class Vregistrasi_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_vregistrasi(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
        $cek                    = $this->input->post("cek");
        $norm                   = $this->input->post("norm");
		
        $ctglreg                = $this->input->post("ctglreg");
        $cnmjnspelayanan        = $this->input->post("cnmjnspelayanan");
        $cdokter                = $this->input->post("cdokter");
        $cnorm                  = $this->input->post("cnorm");
        $cnmpasien              = $this->input->post("cnmpasien");
        $cnoreg                 = $this->input->post("cnoreg");
      
        $this->db->select("*");
        $this->db->from("v_registrasi");
        $this->db->where('userbatal', null);
		$this->db->order_by('noreg desc');
        
        if($query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
			$orlike = '(';
            for($i=0;$i<$c;$i++){
                //$d[$b[$i]]=$query;
				$orlike .= $b[$i] .' LIKE "%'.$query.'%" OR ';
            }
			$len = strlen($orlike);
			$orlike = substr($orlike, 0, ($len-3));
			$orlike .= ')';
			$this->db->where($orlike);
        }
		
		if($cek){
			if($cek == 'RJ'){
				$this->db->where('SUBSTRING(noreg,1,2)', $cek);
			} elseif($cek == 'RI'){
				$this->db->where('SUBSTRING(noreg,1,2)', $cek);
			} elseif($cek == 'UG'){
				$this->db->where('SUBSTRING(noreg,1,2)', $cek);
			} else {
				$this->db->where('norm', $norm);
			}
        }
		
		if($ctglreg != '')$this->db->or_like('tglreg', $ctglreg);
        if($cnmjnspelayanan != '')$this->db->or_like('idbagian', $cnmjnspelayanan);
        if($cdokter != '')$this->db->or_like('iddokter', $cdokter);
        if($cnorm != '')$this->db->or_like('norm', $cnorm);
        if($cnmpasien != '')$this->db->or_like('nmpasien', $cnmpasien);
        if($cnoreg != '')$this->db->or_like('noreg', $cnoreg);
		
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
        $cek                  = $this->input->post("cek");
        $norm                  = $this->input->post("norm");
		
        $this->db->select("*");
        $this->db->from("v_registrasi");
		$this->db->where('userbatal', null);
        
        if($query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
			$orlike = '(';
            for($i=0;$i<$c;$i++){
                //$d[$b[$i]]=$query;
				$orlike .= $b[$i] .' LIKE "%'.$query.'%" OR ';
            }
			$len = strlen($orlike);
			$orlike = substr($orlike, 0, ($len-3));
			$orlike .= ')';
			$this->db->where($orlike);
        }
		
		if($cek){
			if($cek == 'RJ'){
				$this->db->where('SUBSTRING(noreg,1,2)', $cek);
			} elseif($cek == 'RI'){
				$this->db->where('SUBSTRING(noreg,1,2)', $cek);
			} elseif($cek == 'UG'){
				$this->db->where('SUBSTRING(noreg,1,2)', $cek);
			} else {
				$this->db->where('norm', $norm);
			}
        }
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function getDataRegistrasi(){
        $cek                  = $this->input->post("cek");
        $noreg                  = $this->input->post("noreg");
		
		if($cek){
			if($cek == 'RJ'){
				$q = $this->db->getwhere('v_registrasi',array('noreg'=>$noreg, 'SUBSTRING(noreg,1,2)'=>$cek));
			} elseif($cek == 'RI'){
				$q = $this->db->getwhere('v_registrasi',array('noreg'=>$noreg, 'SUBSTRING(noreg,1,2)'=>$cek));
			} elseif($cek == 'UG'){
				$q = $this->db->getwhere('v_registrasi',array('noreg'=>$noreg, 'SUBSTRING(noreg,1,2)'=>$cek));
			}
        } else {
			$q = $this->db->getwhere('v_registrasi',array('noreg'=>$noreg));
		}
		$reg = $q->row_array();
		echo json_encode($reg);
    }
	
	function cekRegistrasi(){
        $norm = $this->input->post("norm");
        $jpel = $this->input->post("jpel");
		
		$this->db->select("idbagian");
        $this->db->from("v_registrasi");
		$this->db->where("norm", $norm);
		$this->db->where("nmjnspelayanan", $jpel);
		$this->db->where("tglreg", date('Y-m-d'));
		$q = $this->db->get();
		$ret['validasi'] = $q->num_rows();
		$ret['arr'] = array();
		foreach($q->result() as $val){
			array_push($ret['arr'], $val->idbagian);
		}
		//var_dump($ret['arr']);
		echo json_encode($ret);
	}
}
