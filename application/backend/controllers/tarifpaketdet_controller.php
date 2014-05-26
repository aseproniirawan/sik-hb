<?php

class Tarifpaketdet_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
		
	function get_tarifpaketdet(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
        $val                  = $this->input->post("val");
		
		$this->db->select('tarifpaketdet.*, 
				if(tarifpaketdet.idjnstarif=2, pelayanan.nmpelayanan, barang.nmbrg) nmitem,
				(tarifpaketdet.tarifjs+tarifpaketdet.tarifjm+tarifjp+tarifbhp) ttltarif
		', false);
        $this->db->from('tarifpaketdet');
		$this->db->join('pelayanan',
                'pelayanan.kdpelayanan = tarifpaketdet.kdtarif', 'left');
		$this->db->join('barang',
                'barang.kdbrg = tarifpaketdet.kdtarif', 'left');
		$this->db->join('satuan',
                'satuan.idsatuan = tarifpaketdet.idsatuan', 'left');
		$this->db->group_by('kdtarif', 'idjnstarif','idtarifpaket');
        
		if($val){
			$x=array('[',']','"');
            $y=str_replace($x, '', $val);
            $z=explode(',', $y);
			$this->db->where_not_in('kdtarif',$z);
		}
        
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
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
      
       $this->db->select('tarifpaketdet.*, 
				if(tarifpaketdet.idjnstarif=2, pelayanan.nmpelayanan, barang.nmbrg) nmitem,
				(tarifpaketdet.tarifjs+tarifpaketdet.tarifjm+tarifjp+tarifbhp) ttltarif
		', false);
        $this->db->from('tarifpaketdet');
		$this->db->join('pelayanan',
                'pelayanan.kdpelayanan = tarifpaketdet.kdtarif', 'left');
		$this->db->join('barang',
                'barang.kdbrg = tarifpaketdet.kdtarif', 'left');
		$this->db->join('satuan',
                'satuan.idsatuan = tarifpaketdet.idsatuan', 'left');
		$this->db->group_by('kdtarif', 'idjnstarif','idtarifpaket');
        
        if($query !=""){
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
}
