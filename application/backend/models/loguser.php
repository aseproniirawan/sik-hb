<?php
class Loguser extends Model{
	function __construct (){
		parent::Model();
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('loguser');
		$this->db->limit(10);
		$this->db->order_by('idloguser','ASC');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid($start,$limit,$sidx,$sord,$where){
		$this->db->select('*');
		$this->db->limit($limit);
		if($where != NULL)$this->db->where($where,NULL,FALSE);
		$this->db->order_by($sidx,$sord);
		$query = $this->db->get('loguser',$limit,$start);

		return $query->result();
	}

	function get($id){
		$query = $this->db->getwhere('loguser',array('idloguser'=>$id));
		return $query->row_array();
	}
  
	function autoNumber(){
		$this->db->select('max(idloguser)+1 AS max');
		$this->db->from('loguser');
		$query = $this->db->get();
		
		if ($query->num_rows() != 0)
		{
			$row = $query->row();
			$max=$row->max;
		} elseif ($max == null){
			$max=0;
		}
		return $max;
	}
  
	function save(){      // marco
		$ipaddress = $_SERVER['REMOTE_ADDR'];
		$idloguser = $this->autoNumber();
		$data = array(
			'idloguser'=> $idloguser,
			'userid'=> $_POST['username'],
		);
        $this->db->query("CALL SP_insertlog (?,?)", $data);
        $this->my_usession->set_userdata('idloguser', $idloguser);
		if($this->db->trans_status()=== FALSE)
        {
            $this->db->trans_rollback();
            $ret["success"]=false;
            $ret["message"]="Simpan Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $ret["success"]=true;
            $ret["message"]="Simpan Data Berhasil";
        }
        return $ret;
    }
	
	function update(){      // marco
        $data = array(
             'idloguser'=>  $this->my_usession->userdata('idloguser'),
        );

        $this->db->query("CALL SP_updatelog (?)", $data);
        	
		if($this->db->trans_status()=== FALSE)
        {
            $this->db->trans_rollback();
            $ret["success"]=false;
            $ret["message"]="Simpan Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $ret["success"]=true;
            $ret["message"]="Simpan Data Berhasil";
        }
        return $ret;
    }
	
	function getTglMasuk($tgl1, $tgl2){
		$this->db->select('*');
		$this->db->from('loguser');
		$this->db->where('date(tglmsk) BETWEEN "'. $tgl1 .'" AND "'. $tgl2 .'"');
		$query = $this->db->get();

		return $query;
    }
	
	function getTglKeluar($tgl1, $tgl2){
		$this->db->select('*');
		$this->db->from('loguser');
		$this->db->where('date(tglklr) BETWEEN "'. $tgl1 .'" AND "'. $tgl2 .'"');
		$query = $this->db->get();

		return $query;
    }
}

