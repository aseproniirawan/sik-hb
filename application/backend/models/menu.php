<?php
class Menu extends Model{
	function __construct (){
		parent::Model();
		$this->load->model(array('Klppengguna'=>'Klppengguna'));
	}

	function getAll(){
		$this->db->select('*');
		$this->db->from('menu');
		$query = $this->db->get();

		return $query->result();
	}

	function getAllGrid(){
        $klppengguna=$this->input->post('klppengguna');
        $idklp=$this->Klppengguna->getKd($klppengguna);
        //======================================================================
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                 = $this->input->post("fields");
        $q                  = $this->input->post("query");

		$this->db->select('`menu`.`idmenu` AS `idmenu`');
		$this->db->select('`menu`.`kdmenu` AS `kdmenu`');
		$this->db->select('`menu`.`nmmenu` AS `nmmenu`');
		$this->db->select('deskripsi');
		$this->db->select('(select nmjnshirarki from jhirarki where idjnshirarki = menu.idjnshirarki) as idjnshirarki');
		$this->db->select('(select nmstatus from status where idstatus = menu.idstatus ) as idstatus');
		$this->db->select('(select m.nmmenu from menu m where m.idmenu = menu.men_idmenu ) as men_idmenu');
		$this->db->select('
			if(((SELECT otoritas.idmenu
				FROM
				  otoritas
				WHERE
				  ((otoritas.idklppengguna = '. $idklp["idklppengguna"] .')
				  AND (otoritas.idmenu = menu.idmenu))) = menu.idmenu), 1 , 0) AS user_aktif
		', false);
		$this->db->from('menu');
		$this->db->order_by('`menu`.`kdmenu`');
		
        if($q !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$q;
            }
               
             $this->db->or_like($d, $q);

        } 
		
		if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
		$query = $this->db->get();
		
		$ttl = $this->numrow($fields, $q, $idklp['idklppengguna']);
        $arrMenu = array ("success"=>true,"results"=>$ttl,"data"=>$query->result());

		return $arrMenu;
	}
	
	function numrow($fields, $q, $idklp){
      
        $this->db->select('`menu`.`idmenu` AS `idmenu`');
		$this->db->select('`menu`.`kdmenu` AS `kdmenu`');
		$this->db->select('`menu`.`nmmenu` AS `nmmenu`');
		$this->db->select('deskripsi');
		$this->db->select('(select nmjnshirarki from jhirarki where idjnshirarki = menu.idjnshirarki) as idjnshirarki');
		$this->db->select('(select nmstatus from status where idstatus = menu.idstatus ) as idstatus');
		$this->db->select('(select m.nmmenu from menu m where m.idmenu = menu.men_idmenu ) as men_idmenu');
		$this->db->select('
			if(((SELECT otoritas.idmenu
				FROM
				  otoritas
				WHERE
				  ((otoritas.idklppengguna = '. $idklp .')
				  AND (otoritas.idmenu = menu.idmenu))) = menu.idmenu), 1 , 0) AS user_aktif
		', false);
		$this->db->from('menu');
		$this->db->order_by('`menu`.`kdmenu`');
        
        
        if($fields!="" || $q !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$q;
            }
            $this->db->or_like($d, $q);
        }
        $query = $this->db->get();
        
        return $query->num_rows();
    }

	function get($id){
		$query = $this->db->getwhere('menu',array('kdmenu'=>$id));
		return $query->row_array();
	}

	function getHeader(){
		$query = $this->db->getwhere('menu',array('idjnshirarki'=>'0'));
		return $query->result();
	}
}

