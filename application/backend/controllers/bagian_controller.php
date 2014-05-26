<?php

class Bagian_Controller extends Controller {
    	
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_bagian(){
        $start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
        $jpel = $this->input->post("jpel");
        $val = $this->input->post("val");
      
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
		//$this->db->where('bagian.idlvlbagian <>',1);
		
		if($jpel == 1){
			$this->db->where('bagian.idjnspelayanan',$jpel);
		} else if($jpel == 2){
			$this->db->where('bagian.idjnspelayanan',$jpel);
		} else if($jpel == 3){
			$this->db->where('bagian.idjnspelayanan',$jpel);
		}
		
		if($val != ''){
			$x=array('[',']','"');
            $y=str_replace($x, '', $val);
            $z=explode(',', $y);
			$this->db->where_not_in('bagian.idbagian',$z);
		}
		
		$this->db->order_by('kdbagian');
        
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
	
	function get_bagianrjriugd(){
        $start = $this->input->post("start");
        $limit = $this->input->post("limit");
        
        $fields = $this->input->post("fields");
        $query = $this->input->post("query");
      
        $this->db->select('*');
        $this->db->from('bagian');
		$this->db->where('kdbagian !=','null');
		$this->db->where('idjnshirarki !=',0);
		
		$this->db->order_by('kdbagian');
        
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
		
        $ttl = $this->numrowrawat($fields, $query);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function getBagianClean(){
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
		
        $ttl = $this->numrow($fields, $query);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function numrow($fields, $query){
        $jpel = $this->input->post("jpel");
      
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

		if($jpel == 1){
			$this->db->where('bagian.idjnspelayanan',$jpel);
		} else if($jpel == 2){
			$this->db->where('bagian.idjnspelayanan',$jpel);
		} else if($jpel == 3){
			$this->db->where('bagian.idjnspelayanan',$jpel);
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
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
	
	function numrowrawat($fields, $query){
      
        $this->db->select('*');
        $this->db->from('bagian');
		$this->db->where('kdbagian !=','null');
		$this->db->where('idjnshirarki !=',0);

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
	
	function delete_bagian(){     
		$where['idbagian'] = $_POST['idbagian'];
		$del = $this->rhlib->deleteRecord('bagian',$where);
        return $del;
    }
		
	function insert_bagian(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('bagian',$dataArray);
        return $ret;
    }

	function update_bagian(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idbagian', $_POST['idbagian']);
		$this->db->update('bagian', $dataArray); 
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
	
	$bagian = $_POST['bag_idbagian'];
	
	if ($bagian=="") 
		$bagian=null;
	
		$dataArray = array(
             'idbagian'			=> $_POST['idbagian'],
			 'idlvlbagian'		=> $_POST['idlvlbagian'],
			 'idjnshirarki'		=> $_POST['idjnshirarki'],
             'idjnspelayanan'	=> $_POST['idjnspelayanan'],
			 'idbdgrawat'		=> $_POST['idbdgrawat'],
			 'kdbagian'			=> $_POST['kdbagian'],
             'nmbagian'			=> $_POST['nmbagian'],
			 'bag_idbagian'		=> $this->id_bagian('nmbagian',$bagian),
        );		
/* 		var_dump($dataArray);
		exit; */
		return $dataArray;
	}
	
	function get_parent_bagian(){ 
		$query = $this->db->getwhere('bagian',array('idjnshirarki'=>'0'));
		$parent = $query->result();
		$ttl = count($parent);
        $arrBagian = array ("success"=>true,"results"=>$ttl,"data"=>$parent);
		echo json_encode($arrBagian);
    }
	
	function id_bagian($where, $val){
		$query = $this->db->getwhere('bagian',array($where=>$val));
		$id = $query->row_array();
		return $id['idbagian'];
    }
	
	function getNmbagian(){
		$query = $this->db->getwhere('bagian',array('idbagian'=>$_POST['bag_idbagian']));
		$nm = $query->row_array();
		echo json_encode($nm['nmbagian']);
    }
	
	function get_bagianri(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
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
		$this->db->where('bag_idbagian', 27);
		$this->db->order_by('kdbagian');
        
        
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
	
	function get_kmrbagian(){
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
				
        $this->db->where('bagian.idjnspelayanan = 2');
		$this->db->order_by('kdbagian');
        
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
