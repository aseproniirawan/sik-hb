<?php

class Dokter_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_dokter(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
	  
	  
        $this->db->select('dokter.*, jkelamin.nmjnskelamin, spesialisasi.nmspesialisasi, status.nmstatus, stdokter.nmstdokter, bagian.nmbagian');
        $this->db->from('dokter');
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = dokter.idjnskelamin', 'left');		
 		$this->db->join('spesialisasi',
                'spesialisasi.idspesialisasi = dokter.idspesialisasi', 'left');
		$this->db->join('status',
                'status.idstatus = dokter.idstatus', 'left');
		$this->db->join('stdokter',
                'stdokter.idstdokter = dokter.idstdokter', 'left');
		$this->db->join('dokterbagian',
                'dokter.iddokter = dokterbagian.iddokter', 'left');
		$this->db->join('bagian',
                'bagian.idbagian = dokterbagian.idbagian', 'left');
				
		$this->db->order_by('kddokter');
        
        
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
      
        $this->db->select('dokter.*, jkelamin.nmjnskelamin, spesialisasi.nmspesialisasi, status.nmstatus, stdokter.nmstdokter');
        $this->db->from('dokter');
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = dokter.idjnskelamin', 'left');		
 		$this->db->join('spesialisasi',
                'spesialisasi.idspesialisasi = dokter.idspesialisasi', 'left');
		$this->db->join('status',
                'status.idstatus = dokter.idstatus', 'left');
		$this->db->join('stdokter',
                'stdokter.idstdokter = dokter.idstdokter', 'left');

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
	
	function delete_dokter(){     
		$where['iddokter'] = $_POST['iddokter'];
		$del = $this->rhlib->deleteRecord('dokter',$where);
		
		$where['iddokter'] = $_POST['iddokter'];
		$del = $this->rhlib->deleteRecord('dokterbagian',$where);
        return $del;
    }
		
	function insert_dokter(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('dokter',$dataArray);	
		
		$dataArray2 = $this->getFieldsAndValues2();
		$ret = $this->rhlib->insertRecord('dokterbagian',$dataArray2);
        return $ret;
    }

	function update_dokter(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('iddokter', $_POST['iddokter']);
		$this->db->update('dokter', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
			
	function getFieldsAndValues(){
		$dataArray = array(
             'iddokter'			=> $_POST['iddokter'],
			 'kddokter'			=> $_POST['kddokter'],
             'nmdokter'			=> $_POST['nmdokter'],
			 'nmdoktergelar'	=> $_POST['nmdoktergelar'],
			 'idjnskelamin'		=> $_POST['idjnskelamin'],
			 'tptlahir'			=> $_POST['tptlahir'],
			 'tgllahir'			=> $_POST['tgllahir'],
             'alamat'			=> $_POST['alamat'],
			 'notelp'			=> $_POST['notelp'],
			 'nohp'				=> $_POST['nohp'],
			 'idspesialisasi'	=> $_POST['idspesialisasi'],
             'idstatus'			=> $_POST['idstatus'],
			 'idstdokter'		=> $_POST['idstdokter'],
			 'catatan'			=> $_POST['catatan']
        );		
		return $dataArray;
	}
	
	function getFieldsAndValues2(){
		$hasil = $this->db->query("SELECT iddokter FROM dokter ORDER BY iddokter DESC LIMIT 1");
			foreach($hasil->result() as $row)
				$iddokter= $row->iddokter;
	
		$dataArray2 = array(
			 'idbagian'			=> $_POST['idbagian'],
             'iddokter'			=> $iddokter,
        );
		return $dataArray2;
	}
	
	function get_dokterri(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('dokter.*, jkelamin.nmjnskelamin, spesialisasi.nmspesialisasi, status.nmstatus, stdokter.nmstdokter');
        $this->db->from('dokter');
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = dokter.idjnskelamin', 'left');		
 		$this->db->join('spesialisasi',
                'spesialisasi.idspesialisasi = dokter.idspesialisasi', 'left');
		$this->db->join('status',
                'status.idstatus = dokter.idstatus', 'left');
		$this->db->join('stdokter',
                'stdokter.idstdokter = dokter.idstdokter', 'left');
		$this->db->join('dokterbagian',
                'dokterbagian.iddokter = dokter.iddokter', 'left');
		$this->db->where('idbagian', 27);
		//$this->db->order_by('kddokter');
        
        
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
}
