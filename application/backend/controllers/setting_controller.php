<?php

class Setting_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_setting(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
		$idklpsetting			= $_POST['klpsetting'];
      
        $this->db->select('setting.*, klpsetting.nmklpsetting');
        $this->db->from('setting');
		$this->db->join('klpsetting',
                'klpsetting.idklpsetting = setting.idklpsetting', 'left');
				
		$this->db->order_by('nmklpsetting');
		$where = array(); 
        $where['setting.idklpsetting']= $idklpsetting;  
		
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
		
		$this->db->where($where);
                
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(15,0);
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
      
        $this->db->select('setting.*, klpsetting.nmklpsetting');
        $this->db->from('setting');
		$this->db->join('klpsetting',
                'klpsetting.idklpsetting = setting.idklpsetting', 'left');

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
	
	function delete_setting(){
        $where['idset']= $_POST['idset'];
		
        $this->db->trans_begin();
        $this->db->delete("setting",$where);
       
         if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Hapus Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Hapus Data Berhasil";
        }
        echo json_encode($return);
    }
	
	function insert_update_setting(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('setting',array('idset'=>$_POST['idset']));
		if($query->num_rows() > 0) $pas = $this->update_seting();
		else $pas = $this->insert_seting();
		
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
		
	function insert_seting(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('setting',$dataArray);
        return $dataArray;
    }

	function update_seting(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idset', $_POST['idset']);
		$this->db->update('setting', $dataArray);
        return $dataArray;
    }
	
	function getFieldsAndValues(){
		$tf_kdset = (isset($_POST['tf_kdset']))? $_POST['tf_kdset'] : null;
		$tf_nmset 	= (isset($_POST['tf_nmset']))? $_POST['tf_nmset'] : null;
		$tf_ketset 	= (isset($_POST['ta_ketset']))? $_POST['ta_ketset'] :null;
		$tf_nilai 	= (isset($_POST['tf_nilai']))? $_POST['tf_nilai'] : null;
		$tf_nourut 	= (isset($_POST['tf_nourut']))? $_POST['tf_nourut'] : null;
		
		$dataArray = array(
             //'idset'			=> $_POST['tf_idset'],
			 'idklpsetting'		=> $_POST['tf_idklpsetting'], //$this->searchId('idklpsetting','klpseting','nmklpsetting',$_POST['cb_klpseting']),
			 'kdset'			=> $_POST['tf_kdset'],
             'nmset'			=> $_POST['tf_nmset'],
             'ketset'			=> $_POST['ta_ketset'],
             'nilai'			=> $_POST['tf_nilai'],
             'nourut'			=> $_POST['tf_nourut']
        );		
		return $dataArray;
	}
    function statusNoAntrian(){
        $this->db->select("*");
        $this->db->from("setting");
        $this->db->where("kdset = 'R01'");
        $q = $this->db->get();
            $noAntrian = $q->row_array();
            echo json_encode($noAntrian);
    }
    function getNoantrian(){
        $this->db->select("count(idreservasi) AS max_np");
        $this->db->from("reservasi");
        $this->db->where('tglreservasi', date('Y-m-d'));
        $q = $this->db->get();
        $data = $q->row_array();
         if(is_null($data['max_np'])) $max = 1;
        else $max = $data['max_np'] + 1;
        
       // $ret["max"] = $max; 
       // $ret["antrian"]=$data['max_np'];
        return $max;
       // echo json_encode($ret);
    }

}