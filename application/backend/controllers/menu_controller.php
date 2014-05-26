<?php

class Menu_Controller extends Controller {
    public function __construct()
    {
        parent::Controller();
              $this->load->library('session');
			  $this->load->model(array('Menu'=>'Menu', 'V_otoritas'=>'V_otoritas'));
    }    
    			
	function getMenuTree(){
		$strTree = "";
        $idparent = 0;
		//get Menu
        $q = $this->V_otoritas->getOtoritasMenu($idparent);        
        $row = array();
		
        if ($q->num_rows() > 0) {
            $row = $q->result();
            //$r = count($row);
        
			$strTree = "[";
			
			foreach($row as $rr){
				$strTree .= "{";
				//get submenu
				$qc = $this->V_otoritas->getOtoritasMenu($rr->idmenu); 
				$rowc = array();
				
				if ($qc->num_rows() > 0) {
					$rowc = $qc->result();					
					$strTree .= $this->getStrTreeProperties($rr, true);
					$strTree .= ",children:["; //Open children
					
					foreach($rowc as $rrc){					
						$strTree .= "{";
						$qd = $this->V_otoritas->getOtoritasMenu($rrc->idmenu); 
						$rowd = array();
						
						if ($qd->num_rows() > 0) {
							$rowd = $qd->result();					
							$strTree .= $this->getStrTreeProperties($rrc, true);
							$strTree .= ",children:["; //Open children
							
							foreach($rowd as $rrd){					
								$strTree .= "{";
								$strTree .= $this->getStrTreeProperties($rrd, false);
								$strTree .= "},";
							}
							$strTree .="]";	 //Close children
						}
						else {
							$strTree .= $this->getStrTreeProperties($rrc, false);
						}
						$strTree .= "},";
					}
					$strTree .="]";	 //Close children
				}
				else {
					$strTree .= $this->getStrTreeProperties($rr, false);
				}
				$strTree .= "},";
			}
			$strTree .="]";
		}
        echo $strTree;
    }
	
	private function getStrTreeProperties($row, $isHasChild){
		$id = "id:'".$row->idmenu."'";
		$kode ="kode:'".$row->kdmenu."'";
		$text ="text:'".$row->nmmenu."'";
		$expanded = "expanded:false";  //($isHasChild)? "expanded:false" : "expanded:false";
		$leaf = ($isHasChild)? "leaf:false" : "leaf:true";
		$parent = "parent:".$row->idsubmenu;
		$url = "url:'".$row->url."'";
		$icon = ($row->gambar != null)? "iconCls:'".$row->gambar."'" : "iconCls:''";
		$ret = $id.",".$kode.",".$text.",".$expanded.",".$leaf.",".$parent.",".$url.",".$icon;
		//$ret = ($isHasChild)? "{".$ret.",children:[" : "{".$ret."},";
		return $ret;
	}
	
	function getMenuAll(){
		$menu = $this->Menu->get($_POST['id']);
		$file = explode('/',$menu['url']);
		$count = COUNT($file);
		$func = explode('.', $file[($count-1)]);
		echo $func[0].'()';
    }
	
	function gridS_menu(){
		$menu = $this->Menu->getHeader();
		$ttl = count($menu);
        $arrMenu = array ("success"=>true,"results"=>$ttl,"data"=>$menu);
		echo json_encode($arrMenu);
    }

	function g_OT(){ //ISTRA
		$menu = $this->Menu->getAllGrid();
		//$ttl = $this->db->count_all('menu');
        //$arrMenu = array ("success"=>true,"results"=>$ttl,"data"=>$menu);
        echo json_encode($menu);
    }
}