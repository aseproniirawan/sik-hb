<?php

class Supplier_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_supplier(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select('supplier.*, bank.nmbank, status.nmstatus');
        $this->db->from('supplier');
		$this->db->join('bank',
                'bank.idbank = supplier.idbank', 'left');	
		$this->db->join('status',
                'status.idstatus = supplier.idstatus', 'left');
				
		$this->db->order_by('kdsupplier');
        
        
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
      
        $this->db->select('supplier.*, bank.nmbank, status.nmstatus');
        $this->db->from('supplier');
		$this->db->join('bank',
                'bank.idbank = supplier.idbank', 'left');	
		$this->db->join('status',
                'status.idstatus = supplier.idstatus', 'left');

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
	
	function delete_supplier(){     
		$where['kdsupplier'] = $_POST['kdsupplier'];
		$del = $this->rhlib->deleteRecord('supplier',$where);
        return $del;
    }
	
	function insert_update_supplier(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('supplier',array('kdsupplier'=>$_POST['tf_kdsupplier']));
		if($query->num_rows() > 0) $pas = $this->update_supplier();
		else $pas = $this->insert_supplier();
		
        if($pas){
            $this->db->trans_commit();
            $ret["success"]=true;
        }else{
            $this->db->trans_rollback();
            $ret["success"]=false;
            //$ret["message"]='Simpan Data  Gagal';
        }
        echo json_encode($ret);
    }
		
	function insert_supplier(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('supplier',$dataArray);
        return $dataArray;
    }

	function update_supplier(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('kdsupplier', $_POST['tf_kdsupplier']);
		$this->db->update('supplier', $dataArray);
        return $dataArray;
    }
	
	function getFieldsAndValues(){
		if(is_null($_POST['tf_kdsupplier']) || $_POST['tf_kdsupplier'] == '') $ns = $this->getNoSupplier();
		else $ns = $_POST['tf_kdsupplier'];
			$nostart = 'S';
			$noend = str_pad($ns,4,"0",STR_PAD_LEFT);
			$kdsupplier = $nostart.$noend;
		
		$dataArray = array(
			'kdsupplier'		=> ($_POST['tf_kdsupplier']) ? $_POST['tf_kdsupplier']: $kdsupplier,
			'tgldaftar'			=> $_POST['tgldaftar'],
             'nmsupplier'		=> $_POST['nmsupplier'],
             'alamat'			=> $_POST['alamat'],
			 'notelp'			=> $_POST['notelp'],
			 'nofax'			=> $_POST['nofax'],
			 'email'			=> $_POST['email'],
			 'website'			=> $_POST['website'],
			 'kontakperson'		=> $_POST['kontakperson'],
			 'nohp'				=> $_POST['nohp'],
			 'npwp'				=> $_POST['npwp'],			 
			 'idbank'			=> $_POST['idbank'],
			 'norek'			=> $_POST['norek'],
			 'atasnama'			=> $_POST['atasnama'],
			 'keterangan'		=> $_POST['keterangan'],
             'idstatus'			=> $_POST['idstatus'],
             'userid'			=> $_POST['userid'],
			 'tglinput'			=> $_POST['tglinput']
			
		);
		return $dataArray;
	}
	
	function getNoSupplier(){
		$this->db->select("count(kdsupplier) as kd_s");
		$this->db->from("supplier");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['kd_s'])) $max =1;
		else $max = $data['kd_s'] + 1;
		return $max;
	}
	
}
