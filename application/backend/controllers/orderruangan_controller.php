<?php 
	
		class Orderruangan_Controller extends Controller{
		
			public function __construct(){
				parent::Controller();
				$this->load->library('session');
				$this->load->library('rhlib');
			}
			
			function get_orderRuangan(){
				$start = $this->input->post("start");
				$limit = $this->input->post("limit");
				
				$fields = $this->input->post("fields");
				$query = $this->input->post("query");
				
				$this->db->select("*");
				$this->db->from("oruangan");
				$this->db->join("pengguna","pengguna.userid = oruangan.userid","left"); 
				$this->db->join("bagian","bagian.idbagian = oruangan.idbagian","left");
				$this->db->join("bed","bed.idbed = oruangan.idbed","left");
				$this->db->join("kamar","kamar.idkamar = oruangan.idkamar","left");
				$this->db->join("klsrawat","klsrawat.idklsrawat = oruangan.idkamar","left");
				$this->db->join("klstarif","klstarif.idklstarif = oruangan.idklstarif","left");
				$this->db->join("hubkeluarga","hubkeluarga.idhubkeluarga = oruangan.idhubkeluarga","left");
				$this->db->join("registrasidet","registrasidet.idregdet = oruangan.idregdet","left");
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
		
        $datax = $this->db->count_all('oruangan');
        $ttl = $datax;
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
		
        echo json_encode($build_array);
			}
		function getFieldsAndValues(){
			if(is_null($_POST['tf_noorder']) || $_POST['tf_noorder'] == ''){
				$nr = $this->getNoOruangan();
				$nostart = 'OR';
				$nomid = date('y');
				$noend = str_pad($nr,6,"0",STR_PAD_LEFT);
				$noorder = $nostart.$nomid.$noend;
			}
			$dataArray = array(
				'nooruangan' => $noorder,
				'tgloruangan' => date('Y-m-d'),
				'jamoruangan' => date('H:i:s'),
				'idklsrawat' => $_POST['tf_idklsrawat'],
				'idregdet' => $_POST['tf_idregdet'],
				'userid' => $this->session->userdata['username'],
				'idbagian' => $_POST['tf_bagianid'],
				'idkamar' => $_POST['tf_idkamar'],
			//	'idbed' => $_POST[''],
				'idklstarif' => 1,
			//	'tglrencanamasuk' => $_POST[''],
			//	'jamrencanamasuk' => $_POST[''],
				'nmkerabat' => $_POST['tf_nama'],
				'alasanpindah' => $_POST['tf_alasan'],
				'catatan' => $_POST['ta_catatan'],
				'notelpkerabat' => $_POST['tf_telp'],
			);
			return $dataArray;
		}
		function insert_oruangan(){
		
			$dataArray = $this->getFieldsAndValues();
				//print_r($dataArray->getErrors());
			$this->rhlib->insertRecord('oruangan',$dataArray);
			if($this->db->affected_rows()){
				$ret["success"] = true;
				$ret["nooruangan"] = $dataArray['nooruangan'];
			}else{
				$ret["success"]=false;
			}
			echo json_encode($ret);
		}
		function getNoOruangan(){
			$this->db->select("count(nooruangan) as no_r");
			$this->db->from("oruangan");
			$this->db->where('SUBSTRING(nooruangan,3,2)',date('y'));
			$q = $this->db->get();
			$data = $q->row_array();
			if(is_null($data['no_r'])) $max =1;
			else $max = $data['no_r'] + 1;
			return $max;
		}
	}
		
		