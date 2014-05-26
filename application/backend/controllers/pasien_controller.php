<?php

class Pasien_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_pasien(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		
        $norm                  = $this->input->post("norm");
        $nmpasien                  = $this->input->post("nmpasien");
        $tgllahir                  = $this->input->post("tgllahir");
        $tptlahir                  = $this->input->post("tptlahir");
        $nmibu                  = $this->input->post("nmibu");
        $notelp                  = $this->input->post("notelp");
      
        $this->db->select("*");
        $this->db->from("pasien");
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = pasien.idjnskelamin', 'left');
		$this->db->join('daerah',
                'daerah.iddaerah = pasien.iddaerah', 'left');
		$this->db->order_by('norm desc');
		
        if($norm != '')$this->db->or_like('norm', $norm);
        if($nmpasien != '')$this->db->or_like('nmpasien', $nmpasien);
        if($tgllahir != '')$this->db->or_like('tgllahir', $tgllahir);
        if($tptlahir != '')$this->db->or_like('tptlahir', $tptlahir);
        if($nmibu != '')$this->db->or_like('nmibu', $nmibu);
        if($notelp != ''){
			$this->db->or_like('notelp', $notelp);
			$this->db->or_like('nohp', $notelp);
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
		
        $ttl = $this->numrow();
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
    }
	
	function numrow(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
		
        $norm                  = $this->input->post("norm");
        $nmpasien                  = $this->input->post("nmpasien");
        $tgllahir                  = $this->input->post("tgllahir");
        $tptlahir                  = $this->input->post("tptlahir");
        $nmibu                  = $this->input->post("nmibu");
        $notelp                  = $this->input->post("notelp");
    
        $this->db->select("*");
        $this->db->from("pasien");
		$this->db->join('jkelamin',
                'jkelamin.idjnskelamin = pasien.idjnskelamin', 'left');
		$this->db->join('daerah',
                'daerah.iddaerah = pasien.iddaerah', 'left');
		$this->db->order_by('norm desc');
		
        if($norm != '')$this->db->or_like('norm', $norm);
        if($nmpasien != '')$this->db->or_like('nmpasien', $nmpasien);
        if($tgllahir != '')$this->db->or_like('tgllahir', $tgllahir);
        if($tptlahir != '')$this->db->or_like('tptlahir', $tptlahir);
        if($nmibu != '')$this->db->or_like('nmibu', $nmibu);
        if($notelp != ''){
			$this->db->or_like('notelp', $notelp);
			$this->db->or_like('nohp', $notelp);
		}
        
        $q = $this->db->get();
        
        return $q->num_rows();
    }
		
	function insorupd_pasien(){
        $this->db->trans_begin();
		$query = $this->db->getwhere('pasien',array('norm'=>$_POST['tf_norm']));
		if($query->num_rows() > 0) $pas = $this->update_pasien();
		else $pas = $this->insert_pasien();
		
        if($pas){
            $this->db->trans_commit();
            $ret["success"]=true;
            $ret["norm"]=$pas['norm'];
        }else{
            $this->db->trans_rollback();
            $ret["success"]=false;
        }
        echo json_encode($ret);
    }
	
	function delete_pasien(){     
		$where['idpasien'] = $_POST['idpasien'];
		$del = $this->rhlib->deleteRecord('pasien',$where);
        return $del;
    }
		
	function insert_pasien(){
		$dataArray = $this->getFieldsAndValues();
		$z =$this->db->insert('pasien',$dataArray);
        if($z){
            $ret=$dataArray;
        }else{
            $ret=false;
        }
        return $ret;
    }

	function update_pasien(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('norm', $_POST['tf_norm']);
		$this->db->update('pasien', $dataArray);
        return $dataArray;
    }
			
	function getFieldsAndValues(){
		if(is_null($_POST['tf_norm']) || $_POST['tf_norm'] == '') $np = $this->getnorm();
		else $np = $_POST['tf_norm'];
		$norm = str_pad($np, 10, "0", STR_PAD_LEFT);
		$dataArray = array(
             'norm'=> $norm,
             'nmpasien'=> $_POST['tf_nmpasien'],
             'idjnskelamin'=> $this->searchId('idjnskelamin','jkelamin','nmjnskelamin',$_POST['cb_jkelamin']),
             'idstkawin'=> $this->searchId('idstkawin','stkawin','nmstkawin',$_POST['cb_stkawin']),
             'alamat'=> $_POST['tf_alamat'],
             'idwn'=> $this->searchId('idwn','wn','kdwn',$_POST['cb_wn']),
             'iddaerah'=> $this->searchId('iddaerah','daerah','nmdaerah',$_POST['tf_daerah']),
             'notelp'=> $_POST['tf_notelp'],
             'nohp'=> $_POST['tf_nohp'],
             'tptlahir'=> $_POST['tf_tptlahir'],
             'tgllahir'=> date_format(date_create($_POST['df_tgllahir']), 'Y-m-d'),
             'nmibu'=> $_POST['tf_nmibu'],
             'idpekerjaan'=> $this->searchId('idpekerjaan','pekerjaan','nmpekerjaan',$_POST['cb_pekerjaan']),
             'idagama'=> $this->searchId('idagama','agama','nmagama',$_POST['cb_agama']),
             //'idjnsidentitas'=> $_POST['idjnsidentitas'],
             'idstpelayanan'=> $this->searchId('idstpelayanan','stpelayanan','nmstpelayanan',$_POST['cb_stpelayanan']),
             'noidentitas'=> $_POST['tf_noidentitas'],
             'idgoldarah'=> $this->searchId('idgoldarah','goldarah','nmgoldarah',$_POST['cb_goldarah']),
             'idpendidikan'=> $this->searchId('idpendidikan','pendidikan','nmpendidikan',$_POST['cb_pendidikan']),
             'idsukubangsa'=> $this->searchId('idsukubangsa','sukubangsa','nmsukubangsa',$_POST['cb_sukubangsa']),
             'catatan'=> $_POST['ta_catatan'],
             'negara'=> $_POST['tf_negara'],
             'alergi'=> $_POST['ta_alergiobat'],
			 'tgldaftar'=> DATE('Y-m-d')
        );		
		return $dataArray;
	}
	
	function getnorm(){
        $this->db->select("max(norm) AS max_np");
        $this->db->from("pasien");
		$q = $this->db->get();
		$data = $q->row_array();
		if(is_null($data['max_np'])) $max = 1;
		else $max = $data['max_np'] + 1;
		return $max;
	}
	
	function searchId($select, $tbl, $where, $val){
        $this->db->select($select);
        $this->db->from($tbl);
        $this->db->where($where,$val);
		$q = $this->db->get();
		$id = $q->row_array();
		if($q->num_rows()<1){
			$id[$select] = null;
		}
		return $id[$select];
    }
	
	function getDataPasien(){
		$norm = str_pad($_POST['norm'], 10, "0", STR_PAD_LEFT);
        $this->db->select("*");
        $this->db->from("pasien");
		$this->db->join('daerah',
                'daerah.iddaerah = pasien.iddaerah', 'left');
		$this->db->where('norm',$norm);
		$q = $this->db->get();
		$pasien = $q->row_array();
		echo json_encode($pasien);
    }
}
