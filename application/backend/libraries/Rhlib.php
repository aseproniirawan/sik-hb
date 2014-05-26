<?php
class Rhlib extends Controller {	
		
	public function __construct()
    {
        parent::__construct();
		$this->load->database();
    }
	
	var $_jsVars = array();
	public function setJsVar($name, $value)
    {
        $this->_jsVars[$name] = $value;
    }
	
	function get_bilangan($num){
		$bil = '';
		if($num==0) $bil = 'NOL';
		if($num==1) $bil = 'SATU';
		if($num==2) $bil = 'DUA';
		if($num==3) $bil = 'TIGA';
		if($num==4) $bil = 'EMPAT';
		if($num==5) $bil = 'LIMA';
		if($num==6) $bil = 'ENAM';
		if($num==7) $bil = 'TUJUH';
		if($num==8) $bil = 'DELAPAN';
		
		return $bil;
	}
	
	function get_par_val($table,$fieldName,$condition){
		$q = "SELECT $fieldName as fieldName FROM $table WHERE $condition LIMIT 0,1;";
		
        $query  = $this->db->query($q);
        if ($query->num_rows() == 1) {
            $val = $query->row()->fieldName;
        }
        return $val;
    }
	function get_row_pars($table,$fields,$condition){
		$q = "SELECT $fields FROM $table WHERE $condition LIMIT 0,1;";
		
        $query  = $this->db->query($q);
        if ($query->num_rows() == 1) {
            $row = $query->row();
        }
        return $row;
    }
	
	function insertRecord($table,$dataArray){
		$this->db->insert($table, $dataArray);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["msg"]='Simpan Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["msg"]= 'Simpan Data Gagal';
        }
        return $ret;
	}
	
	function deleteRecord($table,$where){
		$this->db->trans_begin();   
        $this->db->delete($table,$where);       
        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Hapus Data gagal";
        }else{
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Hapus Data Berhasil";
        }
        return $return;
	}
	
	function getStrQueryWSearch($q){
		$searchBy = "";		
		if(isset($_POST['key'])){
			$key = $_POST['key'];
			if($key!=null && $key!=''){
				$val = "";
				if(isset($_POST['value']))
					$val = $_POST['value'];
				$searchBy = " WHERE ".$key." like '%".$val."%'";
			}
		}		
		return "SELECT * FROM(".$q.")A ".$searchBy;
	}
		
	function jsonFromQuery($q){
		$strQuery = $this->getStrQueryWSearch($q);
		$query  = $this->db->query($strQuery);
        $data = array();
		$build_array = array ("success"=>false,"results"=>-1,"data"=>array(),"msg"=>"error");

		if ($query->num_rows() == 0)
		{
			$build_array["success"]=true;
			$build_array["results"]=0;
			$build_array["msg"]="no data";
		}
		if ($query->num_rows() > 0) {
            $data = $query->result();
			$ttl = count($data);
			if($ttl > 0){
				$build_array["success"]=true;
				$build_array["results"]=$ttl;
				$build_array["data"]=$data;
				$build_array["msg"]= "";
			}
        }
        echo json_encode($build_array);
	}
		
	function jsonFromQueryWLimit($q){
		$start = null;
        //$limit = $_POST['limit'];
		if ($start==null){
            $start = 0;
			$limit = 20;
		}	
		$data = array();
		$build_array = array ("success"=>false,"results"=>-1,"data"=>array());			
        
		$strQuery = $this->getStrQueryWSearch($q);
		$query1  = $this->db->query($strQuery);	//query all rows        
        if ($query1->num_rows() == 0){
			$build_array["success"]=true;
			$build_array["results"]= 0;
		}
		if ($query1->num_rows() > 0) {
			$total = $query1->num_rows(); // total data			
			$strQuery .=" LIMIT ".$start.", ".$limit; // query dengan limit
			$query2  = $this->db->query($strQuery);
            $data = $query2->result();
			$build_array["success"]=true;
			$build_array["results"]=$total;
            //$build_array["count"]=count($data);
			$build_array["data"]=$data;
        }
        echo json_encode($build_array);
	}
			
	function get_autoNum($table, $idTobeNum, $cond, $default){
		$num = $default;
		$q = "select IFNULL(
						(select MAX(
							CAST(".$idTobeNum
							." AS UNSIGNED)) + 1
						from ".$table 
						." WHERE ".$cond.")
					,".$default.") 
				as num";
		$query = $this->db->query($q);
		if ($query->num_rows() == 1) 
			$num = $query->row()->num;
		
		return $num;
	}
		
	function retValOrNull($val){
		//especially for combo & looukup with no item selected
		$val = ($val=='')? null : $val;
		return $val;
	}
	
	function jsonFromQueryWLimit2($q){
		$start = $_POST['start'];
        $limit = $_POST['limit'];
		if ($start==null){
            $start = 0;
			$limit = 20;
		}	
		$data = array();
		$build_array = array ("success"=>false,"results"=>-1,"data"=>array());			
        
		$strQuery = $this->getStrQueryWSearch($q);
		$KEDUA = $this->load->database('second', TRUE);
		$query1  = $KEDUA->query($strQuery);	//query all rows        
        if ($query1->num_rows() == 0){
			$build_array["success"]=true;
			$build_array["results"]= 0;
		}
		if ($query1->num_rows() > 0) {
			$total = $query1->num_rows(); // total data			
			$strQuery .=" LIMIT ".$start.", ".$limit; // query dengan limit
			$query2  = $KEDUA->query($strQuery);
            $data = $query2->result();
			$build_array["success"]=true;
			$build_array["results"]=$total;
            //$build_array["count"]=count($data);
			$build_array["data"]=$data;
        }
        echo json_encode($build_array);
	}
		
}
?>
