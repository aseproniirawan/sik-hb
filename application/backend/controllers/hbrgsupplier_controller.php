<?php

class Hbrgsupplier_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_hbrgsupplier(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
	  
	  
        $this->db->select('hrgbrgsup.*, barang.nmbrg, jsatuan.nmsatuan, supplier.nmsupplier, matauang.nmmatauang');
        $this->db->from('hrgbrgsup');
		$this->db->join('barang',
                'barang.kdbrg = hrgbrgsup.kdbrg', 'left');		
 		$this->db->join('jsatuan',
                'jsatuan.idsatuan = hrgbrgsup.idsatuan', 'left');
		$this->db->join('supplier',
                'supplier.kdsupplier = hrgbrgsup.kdsupplier', 'left');
		$this->db->join('matauang',
                'matauang.idmatauang = hrgbrgsup.idmatauang', 'left');
				
		//$this->db->order_by('idhrgbrgsup');
        
        
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
      
        $this->db->select('hrgbrgsup.*, barang.nmbrg, jsatuan.nmsatuan, supplier.nmsupplier, matauang.nmmatauang');
        $this->db->from('hrgbrgsup');
		$this->db->join('barang',
                'barang.kdbrg = hrgbrgsup.kdbrg', 'left');		
 		$this->db->join('jsatuan',
                'jsatuan.idsatuan = hrgbrgsup.idsatuan', 'left');
		$this->db->join('supplier',
                'supplier.kdsupplier = hrgbrgsup.kdsupplier', 'left');
		$this->db->join('matauang',
                'matauang.idmatauang = hrgbrgsup.idmatauang', 'left');

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
	
	function delete_hbrgsupplier(){     
		$where['idhrgbrgsup'] = $_POST['idhrgbrgsup'];
		$del = $this->rhlib->deleteRecord('hrgbrgsup',$where);
        return $del;
    }
		
	function insert_hbrgsupplier(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('hrgbrgsup',$dataArray);
        return $ret;
    }

	function update_hbrgsupplier(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idhrgbrgsup', $_POST['idhrgbrgsup']);
		$this->db->update('hrgbrgsup', $dataArray); 
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
             'idhrgbrgsup'		=> $_POST['idhrgbrgsup'],
			 'kdbrg'			=> $_POST['kdbrg'],
             'idsatuan'			=> $_POST['idsatuan'],
			 'kdsupplier'		=> $_POST['kdsupplier'],
			 'idmatauang'		=> $_POST['idmatauang'],
			 'harga'			=> $_POST['harga'],
			 'tglefektif'		=> $_POST['tglefektif'],
             'keterangan'		=> $_POST['keterangan'],
			 'userid'			=> $_POST['userid'],
			 'tglinput'			=> $_POST['tglinput']
        );		
		return $dataArray;
	}
	function get_hargabrng(){
		 $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		$val                  = $this->input->post("val");
	  
        $this->db->select('hrgbrgsup.*, barang.nmbrg, jsatuan.nmsatuan, supplier.nmsupplier, matauang.nmmatauang');
        $this->db->from('hrgbrgsup');
		$this->db->join('barang',
                'barang.kdbrg = hrgbrgsup.kdbrg', 'left');		
 		$this->db->join('jsatuan',
                'jsatuan.idsatuan = hrgbrgsup.idsatuan', 'left');
		$this->db->join('supplier',
                'supplier.kdsupplier = hrgbrgsup.kdsupplier', 'left');
		$this->db->join('matauang',
                'matauang.idmatauang = hrgbrgsup.idmatauang', 'left');
				
		//$this->db->order_by('idhrgbrgsup');
        
        
       if($val){
			$x=array('[',']','"');
            $y=str_replace($x, '', $val);
            $z=explode(',', $y);
			$this->db->where_not_in('barang.kdbrg',$z);
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
