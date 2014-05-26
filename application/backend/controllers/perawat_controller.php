<?php

class Perawat_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_perawat(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('perawat.*, jkelamin.nmjnskelamin, status.nmstatus');
        $this->db->from('perawat');
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = perawat.idjnskelamin', 'left');	
		$this->db->join('status',
                'status.idstatus = perawat.idstatus', 'left');
				
		$this->db->order_by('kdperawat');
        
        
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
      
        $this->db->select('perawat.*, jkelamin.nmjnskelamin, status.nmstatus');
        $this->db->from('perawat');
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = perawat.idjnskelamin', 'left');	
		$this->db->join('status',
                'status.idstatus = perawat.idstatus', 'left');

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
	
	function delete_perawat(){     
		$where['idperawat'] = $_POST['idperawat'];
		$del = $this->rhlib->deleteRecord('perawat',$where);
        return $del;
    }
		
	function insert_perawat(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('perawat',$dataArray);
        return $ret;
    }

	function update_perawat(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idperawat', $_POST['idperawat']);
		$this->db->update('perawat', $dataArray); 
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
             'idperawat'		=> $_POST['idperawat'],
			 'kdperawat'		=> $_POST['kdperawat'],
             'nmperawat'		=> $_POST['nmperawat'],
			 'idjnskelamin'		=> $_POST['idjnskelamin'],
			 'notelp'			=> $_POST['notelp'],
			 'nohp'				=> $_POST['nohp'],
             'alamat'			=> $_POST['alamat'],
             'idstatus'			=> $_POST['idstatus'],
			 'keterangan'		=> $_POST['keterangan']
        );		
		return $dataArray;
	}
	
}
