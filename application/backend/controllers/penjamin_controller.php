<?php

class Penjamin_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_penjamin(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('penjamin.*, jpenjamin.nmjnspenjamin, status.nmstatus');
        $this->db->from('penjamin');
		$this->db->join('jpenjamin',
                'jpenjamin.idjnspenjamin = penjamin.idjnspenjamin', 'left');	
		$this->db->join('status',
                'status.idstatus = penjamin.idstatus', 'left');
				
		$this->db->order_by('kdpenjamin');
        
        
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
      
        $this->db->select('penjamin.*, jpenjamin.nmjnspenjamin, status.nmstatus');
        $this->db->from('penjamin');
		$this->db->join('jpenjamin',
                'jpenjamin.idjnspenjamin = penjamin.idjnspenjamin', 'left');	
		$this->db->join('status',
                'status.idstatus = penjamin.idstatus', 'left');

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
	
	function delete_penjamin(){     
		$where['idpenjamin'] = $_POST['idpenjamin'];
		$del = $this->rhlib->deleteRecord('penjamin',$where);
        return $del;
    }
		
	function insert_penjamin(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('penjamin',$dataArray);
        return $ret;
    }

	function update_penjamin(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idpenjamin', $_POST['idpenjamin']);
		$this->db->update('penjamin', $dataArray); 
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
             'idpenjamin'		=> $_POST['idpenjamin'],
			 'kdpenjamin'		=> $_POST['kdpenjamin'],
             'nmpenjamin'		=> $_POST['nmpenjamin'],
			 'idjnspenjamin'	=> $_POST['idjnspenjamin'],
             'alamat'			=> $_POST['alamat'],
			 'notelp'			=> $_POST['notelp'],
			 'nofax'			=> $_POST['nofax'],
             'email'			=> $_POST['email'],
			 'website'			=> $_POST['website'],			 
			 'nmcp'				=> $_POST['nmcp'],
			 'nohp'				=> $_POST['nohp'],
			 'tglawal'			=> $_POST['tglawal'],
             'tglakhir'			=> $_POST['tglakhir'],
             'idstatus'			=> $_POST['idstatus'],
			 'infoumum'			=> $_POST['infoumum'],
			 'inforj'			=> $_POST['inforj'],
             'infori'			=> $_POST['infori'],
        );		
		return $dataArray;
	}
	
	function get_idpenjamin(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('penjamin.*, jpenjamin.nmjnspenjamin, status.nmstatus');
        $this->db->from('penjamin');
		$this->db->join('jpenjamin',
                'jpenjamin.idjnspenjamin = penjamin.idjnspenjamin', 'left');	
		$this->db->join('status',
                'status.idstatus = penjamin.idstatus', 'left');
		$this->db->where('idpenjamin > 1');		
		$this->db->order_by('kdpenjamin');
        
        
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
