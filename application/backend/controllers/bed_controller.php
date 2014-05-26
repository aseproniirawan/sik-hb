<?php

class Bed_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_bed(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
       /*  $this->db->select('bed.*, kamar.nmkamar, extrabed.nmextrabed, stbed.nmstbed, status.nmstatus
							kamar.idbagian, bagian.nmbagian, concat(bagian.nmbagian, ' - ', kamar.nmkamar as rperawatan_kamar)');
        $this->db->from('bed');
		$this->db->join('kamar',
                'kamar.idkamar = bed.idkamar', 'left');		
 		$this->db->join('extrabed',
                'extrabed.idextrabed = bed.idextrabed', 'left');
		$this->db->join('stbed',
                'stbed.idstbed = bed.idstbed', 'left');
		$this->db->join('status',
                'status.idstatus = bed.idstatus', 'left');
		$this->db->join('bagian',
                'bagian.idbagian = kamar.idbagian', 'left'); */
				
		$this->db->select('*');
		$this->db->from('v_bed');
				
		$this->db->order_by('idkamar');
      
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
      
       /*  $this->db->select('bed.*, kamar.nmkamar, extrabed.nmextrabed, stbed.nmstbed, status.nmstatus
							kamar.idbagian, bagian.nmbagian, concat(bagian.nmbagian, ' - ', kamar.nmkamar as rperawatan_kamar)');
        $this->db->from('bed');
		$this->db->join('kamar',
                'kamar.idkamar = bed.idkamar', 'left');		
 		$this->db->join('extrabed',
                'extrabed.idextrabed = bed.idextrabed', 'left');
		$this->db->join('stbed',
                'stbed.idstbed = bed.idstbed', 'left');
		$this->db->join('status',
                'status.idstatus = bed.idstatus', 'left');
		$this->db->join('bagian',
                'bagian.idbagian = kamar.idbagian', 'left'); */
				
		$this->db->select('*');
		$this->db->from('v_bed');

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
	
	function delete_bed(){     
		$where['idbed'] = $_POST['idbed'];
		$del = $this->rhlib->deleteRecord('bed',$where);
        return $del;
    }
		
	function insert_bed(){
		$dataArray = $this->getFieldsAndValues();
		$ret = $this->rhlib->insertRecord('bed',$dataArray);
        return $ret;
    }

	function update_bed(){ 				
		$dataArray = $this->getFieldsAndValues();
		
		//UPDATE
		$this->db->where('idbed', $_POST['idbed']);
		$this->db->update('bed', $dataArray); 
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
			 'idkamar'		=> $_POST['idkamar'],
             'idbed'		=> $_POST['idbed'],
			 'kdbed'		=> $_POST['kdbed'],
             'nmbed'		=> $_POST['nmbed'],
			 'idextrabed'	=> $_POST['idextrabed'],
			 'idstbed'		=> $_POST['idstbed'],
             'idstatus'		=> $_POST['idstatus'],

        );		
		return $dataArray;
	}
}
