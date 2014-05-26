<?php

class Brgbagian_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_brgbagian(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
/*         $this->db->select('barangbagian.*, bagian.nmbagian, barang.nmbrg');
        $this->db->from('barangbagian');
		$this->db->join('bagian',
                'bagian.idbagian = barangbagian.idbagian');
		$this->db->join('barang',
                'barang.idbrg = barang.idbrg');
				
		$this->db->order_by('kdbrg');   */
		
			/* 		foreach($data as $row) {
            array_push($build_array["data"],array(
                'iddokter'			=> $row->iddokter,
                'kddokter'			=> $row->kddokter,
                'nmdokter'			=> $row->nmdokter,
                'idjnskelamin'		=> $row->idjnskelamin,
                'nmdoktergelar'		=> $row->nmdoktergelar,
                'nmjnskelamin'		=> $row->nmjnskelamin,
                'tptlahir'			=> $row->tptlahir,
                'tgllahir'			=> $row->tgllahir, //date('d F Y',strtotime($row->tgllahir)), //'tgllahir'=> substr($row->tgllahir,0,10), 
                'alamat'			=> $row->alamat,
                'notelp'			=> $row->notelp,
                'nohp'				=> $row->nohp, 
                'idspesialisasi'	=> $row->idspesialisasi,
                'nmspesialisasi'	=> $row->nmspesialisasi,
                'idstatus'			=> $row->idstatus, 
                'nmstatus'			=> $row->nmstatus, 
                'idstdokter'		=> $row->idstdokter, 
                'nmstdokter'		=> $row->nmstdokter, 
				'catatan'			=> $row->catatan,
            ));
        } */
		
		$this->db->select('*');
        $this->db->from('v_brgbagian');
		
		//$this->db->order_by('nmbagian');
        
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
/* 				foreach($data as $row) {
            array_push($build_array["data"],array(
                'idbagian'			=> $row->idbagian,
                'nmbagian'			=> $row->nmbagian,
                'kdbrg'				=> $row->kdbrg,
                'nmbrg'				=> $row->nmbrg,
                'stoknowbagian'		=> substr($row->stoknowbagian,0,2),
                'stokminbagian'		=> substr($row->stokminbagian,0,2),
                'stokmaxbagian'		=> substr($row->stokmaxbagian,0,2),
            ));
        }  */
		
        echo json_encode($build_array);
    }
	
	function numrow($fields, $query){
      
		$this->db->select('*');
        $this->db->from('v_brgbagian');

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
	
	function delete_brgbagian(){     
		$where['kdbrg'] = $_POST['kdbrg'];
		$where['idbagian'] = $_POST['idbagian'];
		$del = $this->rhlib->deleteRecord('barangbagian',$where);
        return $del;
    }
		
	function insert_brgbagian(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('barangbagian',$dataArray);
        return $ret;
    }

	function update_brgbagian(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idbagian', $_POST['idbagian']);
		$this->db->update('barangbagian', $dataArray); 
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
             'idbagian'			=> $_POST['idbagian'],
			 'kdbrg'			=> $_POST['kdbrg'],
			 'stoknowbagian'	=> $_POST['stoknowbagian'],
             'stokminbagian'	=> $_POST['stokminbagian'],
             'stokmaxbagian'	=> $_POST['stokmaxbagian'],
        );		
		return $dataArray;
	}
	
}
