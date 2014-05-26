<?php

class Daerah_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	/* function autoNumber($column,$tbl){
        $q = "SELECT max(".$column.")+1 as max FROM ".$tbl."" ;
        $query  = $this->db->query($q);
        $max = ''; 
                    
        if ($query->num_rows() != 0)
        {
            $row = $query->row();
            $max=$row->max;
        }
        if ($max == null){
            $max=0;
        }
        return $max;
    }  */
	
	function get_daerah(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("daerah");
		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = daerah.idjnshirarki', 'left');
		$this->db->join('lvldaerah',
                'lvldaerah.idlvldaerah = daerah.idlvldaerah', 'left');
		
		$this->db->orderby('kddaerah');
        
        
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
      
        $this->db->select("*");
        $this->db->from("daerah");
		$this->db->join('jhirarki',
                'jhirarki.idjnshirarki = daerah.idjnshirarki', 'left');
		$this->db->join('lvldaerah',
                'lvldaerah.idlvldaerah = daerah.idlvldaerah', 'left');
		
		$this->db->orderby('kddaerah');
        
        
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
	
	function delete_daerah(){     
		$where['iddaerah'] = $_POST['iddaerah'];
		$del = $this->rhlib->deleteRecord('daerah',$where);
        return $del;
    }
		
	function insert_daerah(){
		/* $idnew = $this->autoNumber('iddaerah', 'daerah');
		$dataArray = array(
             'iddaerah'			=> $idnew,
             'idjnshirarki'		=> $_POST['idjnshirarki'],
             'dae_iddaerah'		=> $idnew,
             'idlvldaerah'		=> $_POST['idlvldaerah'],
             'kddaerah'			=> $_POST['kddaerah'],
			 'nmdaerah'			=> $_POST['nmdaerah'],
        ); */
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('daerah',$dataArray);
        //$this->update_insert($idnew);
		return $ret;
    }

	function update_daerah(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('iddaerah', $_POST['iddaerah']);
		$this->db->update('daerah', $dataArray); 
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
		$daerah = $_POST['dae_iddaerah'];
		
		if ($daerah=="")
			$daerah=null;
		
		$dataArray = array(
             'iddaerah'			=> $_POST['iddaerah'],
             'idjnshirarki'		=> $_POST['idjnshirarki'],
             'dae_iddaerah'		=> $this->id_daerah('nmdaerah',$daerah),
             'idlvldaerah'		=> $_POST['idlvldaerah'],
             'kddaerah'			=> $_POST['kddaerah'],
			 'nmdaerah'			=> $_POST['nmdaerah'],
        );		
		return $dataArray;
	}
	
	function update_insert($id){ 				
		
		$dataArray = array(
             'dae_iddaerah'		=> $id,
        );
		
		//UPDATE
		$this->db->where('iddaerah', $id);
		$this->db->update('daerah', $dataArray); 
		if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Update Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Update Data Gagal';
        }
        return $ret;
    }
	
	function get_parent(){ 
		$query = $this->db->getwhere('daerah',array('idjnshirarki'=>'0'));
		$parent = $query->result();
		$ttl = count($parent);
        $arrDaerah = array ("success"=>true,"results"=>$ttl,"data"=>$parent);
		echo json_encode($arrDaerah);
    }
	
	function id_daerah($where, $val){
		$query = $this->db->getwhere('daerah',array($where=>$val));
		$id = $query->row_array();
		return $id['iddaerah'];
    }
	
	function getNmdaerah(){
		$query = $this->db->getwhere('daerah',array('iddaerah'=>$_POST['dae_iddaerah']));
		$nm = $query->row_array();
		echo json_encode($nm['nmdaerah']);
    }
	
	function getDaerahOth($id)
	{
		$this->db->select("*");
		$this->db->from("daerah");
		$this->db->where('iddaerah', $id);
		$this->db->join('lvldaerah', 'lvldaerah.idlvldaerah = daerah.idlvldaerah', 'left');
		$q = $this->db->get();
		$daerah = $q->row_array();
		return $daerah;
	}
	
	function getDaerahlkp()
	{
		
		$this->db->select("*");
		$this->db->from("lvldaerah");
		$this->db->order_by("kdlvldaerah DESC");
		$qlvldaerah = $this->db->get();
		$dlvldaerah = $qlvldaerah->result();
		$arr = array();
		foreach($dlvldaerah AS $val){
			$data = $this->getDaerahOth($_POST['id']);
			$expnm = explode('/',$val->nmlvldaerah);
			if($_POST['id'] > 0 && $data['idlvldaerah'] == $val->idlvldaerah)
			{
				$arr[$expnm[0]] = $data['nmdaerah'];
				$_POST['id'] = $data['dae_iddaerah'];
			}else{
				$arr[$expnm[0]] = '';
			}
		}
		
		echo json_encode($arr);
    }
}
