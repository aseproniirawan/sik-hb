<?php

class registrasidet_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_registrasidet(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("registrasidet");
		$this->db->order_by('noregdet desc');
        
        
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
		
        $datax = $this->db->count_all('registrasidet');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
		
	function insorupd_registrasidet(){
		$query = $this->db->getwhere('registrasidet',array('noreg'=>$_POST['tf_noreg']));
		if($query->num_rows() > 0) $this->update_registrasidet();
		else $this->insert_registrasidet();
    }
	
	function delete_registrasidet(){     
		$where['idregistrasidet'] = $_POST['idregistrasidet'];
		$del = $this->rhlib->deleteRecord('registrasidet',$where);
        return $del;
    }
		
	function insert_registrasidet(){
		$dataArray = $this->getFieldsAndValues();
		$this->rhlib->insertRecord('registrasidet',$dataArray);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["noregdet"]=$dataArray['noregdet'];
        }else{
            $ret["success"]=false;
            //$ret["message"]='Simpan Data  Gagal';
        }
        echo json_encode($ret);
    }

	function update_registrasidet(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('noregdetistrasidet', $_POST['tf_noregdet']);
		$this->db->update('registrasidet', $dataArray);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $ret["success"]=false;
            //$ret["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $ret["success"]=true;
            $ret["noregdetistrasidet"]=$dataArray['noregdetistrasidet'];
        }
        echo json_encode($ret);
    }
			
	function getFieldsAndValues(){
		$dataArray = array(
             'noregdet'=> $_POST['tf_noreg'],
             'noreg'=> $_POST['tf_noreg'],
             'tglreg'=> $_POST['df_tglshift'],
             'jamreg'=> $_POST['tf_jamshift'],
             'idshift'=> $_POST['idshift'],
             'idbagiankirim'=> $_POST['tf_upengirim'],
             'iddokterkirim'=> $_POST['tf_dkirim'],
             'nmdokterkirim'=> $_POST['tf_dkirim'],
             'idbagian'=> $_POST['tf_ruangan'],
             'iddokter'=> $_POST['tf_noreg'],
             'idcaradatang'=> $_POST['tf_noreg'],
             'idbed'=> $_POST['tf_noreg'],
             'idklstarif'=> $_POST['tf_noreg'],
             'tglmasuk'=> $_POST['tf_noreg'],
             'jammasuk'=> $_POST['tf_noreg'],
             'tglkeluar'=> $_POST['tf_noreg'],
             'jamkeluar'=> $_POST['tf_noreg'],
             'catatankeluar'=> $_POST['tf_noreg'],
             'umurtahun'=> $_POST['tf_noreg'],
             'umurbulan'=> $_POST['tf_noreg'],
             'umurhari'=> $_POST['tf_noreg'],
             'idklsrawat'=> $_POST['tf_noreg'],
             'idkamar'=> $_POST['tf_noreg'],
             'idstkeluar'=> $_POST['tf_noreg'],
             'nooruangan'=> $_POST['tf_noreg'],
             'idstregistrasi'=> $_POST['tf_noreg'],
             'userinput'=> $_POST['tf_noreg'],
             'tglinput'=> $_POST['tf_noreg'],
             'userbatal'=> $noregdetistrasidet,
             'tglbatal'=> $_POST['tf_notelpkerabat']
        );		
		return $dataArray;
	}
	
	function id_daerah($where, $val){
		$query = $this->db->getwhere('daerah',array($where=>$val));
		$id = $query->row_array();
		return $id['iddaerah'];
    }
}
