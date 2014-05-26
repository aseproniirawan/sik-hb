<?php

class Infojpraktekdokter_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
			$this->load->library('session');
			$this->load->library('rhlib');
    }
	
	function get_infojpraktekdokter(){
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        /* $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query"); */
		//$iddokter        		= $_POST["iddokter"];
      
        $this->db->select('*');
        $this->db->from('v_infojdokterpraktek');
		
		$this->db->order_by('nmdoktergelar');
		$this->db->order_by('nmbagian');
		$this->db->order_by('idshift');
		
		$key = $_POST["key"];  
		if ($key=='1'){
			$id     = $_POST["id"];
			$name   = $_POST["name"];
			$this->db->or_like($id, $name);
		}
		
		/* if($fields!="" || $query !=""){
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
            $this->db->limit(1000000,0);
        } */
        
        $q = $this->db->get();
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
		
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());
		
		$nmbagian = '';
		$nmdoktergelar = '';
        $datax = array();
		$zx = 0;
		
		foreach($data as $x=>$val){
			if($nmbagian == $val->nmbagian && $nmdoktergelar == $val->nmdoktergelar){
			//var_dump($val->senin);
				$zx--;
				$datax[$zx]->senin .= '<br>'.$val->senin;
				$datax[$zx]->selasa .= '<br>'.$val->selasa;
				$datax[$zx]->rabu .= '<br>'.$val->rabu;
				$datax[$zx]->kamis .= '<br>'.$val->kamis;
				$datax[$zx]->jumat .= '<br>'.$val->jumat;
				$datax[$zx]->sabtu .= '<br>'.$val->sabtu;
				$datax[$zx]->minggu .= '<br>'.$val->minggu;
				$zx++;
			} else {
				$datax[$zx] = $val;
				$zx++;
			}
			$nmbagian = $val->nmbagian;
			$nmdoktergelar = $val->nmdoktergelar;
			
		}
		
        if($ttl>0){
            $build_array["data"]=$datax;
        }
		
        echo json_encode($build_array);
    }
	
	/* function numrow($fields, $query){
      
        $this->db->select('*');
        $this->db->from('v_infojdokterpraktek');

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
    } */
}
