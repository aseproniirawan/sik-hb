<?php

class C_utility extends Controller {
var $stat;

    public function __construct()
    {
        parent::Controller();
        $this->load->library('session');
       }
       
      
    function autoNumber($column,$tbl){
        $q = "SELECT max(".$column.")+1 as max FROM ".$tbl."" ;
        $query  = $this->db->query($q);
        $max = ''; 
                    
        if ($query->num_rows() != 0)
        {
            $row = $query->row();
            $max=$row->max;
        }
        if ($max == null){
            $max=0;
        }
        return $max;
    }  
	
	function cek_rows($table,$wherex,$wherey){
         
            $this->db->select("*");
            $this->db->from($table); 
			
        if($wherex !=''){
            $this->db->where($wherex, $wherey);
        }
            
        $q  = $this->db->get(); 
        $result = 0;
        if ($q->num_rows() > 0) {
            $result = $q->num_rows();
        } else {
			$result = 0;
		}
        return $result;
    }
    
    function id_field($column,$tbl,$whereb, $wherea){
        $q = "SELECT ".$column." as id FROM ".$tbl." where ".$whereb." = '".$wherea."' " ;
        $query  = $this->db->query($q);
        $id = ''; 
                    
        if ($query->num_rows() != 0)
        {
            $row = $query->row();
            $id=$row->id;
        }
        return $id;
    }  
    
    function nm_field($column,$tbl,$whereb, $wherea){
        $q = "SELECT ".$column." as nm FROM ".$tbl." where ".$whereb." = '".$wherea."' " ;
        $query  = $this->db->query($q);
        $nm= ''; 
                    
        if ($query->num_rows() != 0)
        {
            $row = $query->row();
            $nm=$row->nm;
        }
        return $nm;
    }  
       
       
       // START MENU
    function g_MN(){ //ISTRA
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("v_menu");
        
        
        if($fields!="" || $query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
    //        $a[explode(',', $r)];
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$query;
            }

           // $this->db->bracket('open','like');
             $this->db->or_like($d, $query);
           // $this->db->bracket('close','like');
        }
                
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
            $q = $this->db->get(); 
        
        
      //  $q = $this->db->get(); 
       
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
        $datax = $this->db->count_all('v_menu');
        $ttl = $datax;
        
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
       
   function s_MN($dt){      // MENU
       
      $submenu =  $this->input->post('submenu');
      $submenu1 = ''; 

      if($submenu == 'Pilih...' || $submenu == '' ){
          $submenu2=0;
      }else{
          $q="select idmenu from menu where nmmenu='".$submenu."'";
        
          $query  = $this->db->query($q);
         
            if ($query->num_rows() != 0)
            {
                $row = $query->row();
                $submenu1=$row->idmenu;
            }
           $submenu2= $this->id_field('idmenu','menu','idmenu',$submenu1);
      }
      
        
        if ($this->input->post('status') =='Aktif'){
            $st=1;
        }else{
            $st=0;
        }
        
        if ($this->input->post('hierarki') =='Header'){
            $hi=0;
        }else{
            $hi=1;
        }
               
             $data = array(
             'idmenu'=> $this->autoNumber('idmenu','menu'),
             'kdmenu'=>  $_POST['kode'],
             'nmmenu'=> $_POST['nama'],
             'deskripsi'=> $_POST['deskripsi'],
             'men_idmenu'=> $submenu2,
             'idstatus'=> $st,
             'idjnshirarki'=> $hi,
             'url'=> $_POST['url'],
             'gambar'=> $dt["file_name"],
             );

        $this->db->insert('menu', $data);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["message"]='Simpan Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["message"]='Simpan Data  Gagal';
        }
        return $ret;
    }
   
    
    function u_MN($dt){      //
      $submenu =  $this->input->post('submenu');
      $submenu1 = ''; 

      if($submenu == 'Pilih...' || $submenu == '' ){
          $submenu2=0;
      }else{
          $q="select idmenu from menu where nmmenu='".$submenu."'";
        
          $query  = $this->db->query($q);
         
            if ($query->num_rows() != 0)
            {
                $row = $query->row();
                $submenu1=$row->idmenu;
            }
           $submenu2= $this->id_field('idmenu','menu','idmenu',$submenu1);
      }
        
        if ($this->input->post('status') =='Aktif'){
            $st=1;
        }else{
            $st=0;
        }
        
        if ($this->input->post('hierarki') =='Header'){
            $hi=0;
        }else{
            $hi=1;
        }
                      
        
        $data = array(
             'kdmenu'=>  $_POST['kode'],
             'nmmenu'=> $_POST['nama'],
             'deskripsi'=> $_POST['deskripsi'],
             'men_idmenu'=> $submenu2,
             'idstatus'=> $st,
             'idjnshirarki'=> $hi,
             'url'=> $_POST['url'],
             'gambar'=> $dt,
             );
        
        $this->db->trans_begin();
        
        $where['idmenu']=$this->input->post('idmenu');
        $this->db->where($where);
        $this->db->update("menu", $data);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
   
    
    function d_MN(){       //ISTRA
        $where['idmenu']=$this->input->post('idmenu');
		
		$oldphoto = $this->input->post('temp_foto');
		
		if ($oldphoto) {
			unlink("resources/img/icons/$oldphoto");
		}
		
        $this->db->trans_begin();
       // $this->db->where($where);
        $this->db->delete("menu",$where);
       
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
     
     //END MENU
    
       
       
    //START 
    function g_JD(){ //ISTRA
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
      
        $this->db->select("*");
        $this->db->from("JDASHBOARD");
        
        
        if($fields!="" || $query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
    //        $a[explode(',', $r)];
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$query;
            }

           // $this->db->bracket('open','like');
             $this->db->or_like($d, $query);
           // $this->db->bracket('close','like');
        }
        
        //$this->db->order_by("JDASHBOARD");
                
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
            $q = $this->db->get(); 
        
        
      //  $q = $this->db->get(); 
       
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
        $datax = $this->db->count_all('JDASHBOARD');
        $ttl = $datax;
        
        
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    
   //END GRID MASTER

   
   function s_JD(){      // ISTRA
       
         
             $data = array(
             'idjnsdashboard'=> $this->autoNumber('idjnsdashboard', 'jdashboard'),
             'kdjnsdashboard'=> $_POST['kode'],
             'nmjnsdashboard'=> $_POST['nama'],
             'deskripsi'=> $_POST['deskripsi'],
             );

        $this->db->insert('JDASHBOARD', $data);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["message"]='Simpan Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["message"]='Simpan Data  Gagal';
        }
        return $ret;
    }
   
    
    function u_JD(){      // ISTRA
        $data = array(
            'kdjnsdashboard'=> $_POST['kode'],
            'nmjnsdashboard'=> $_POST['nama'],
            'deskripsi'=> $_POST['deskripsi'],
             
             );
        
        $this->db->trans_begin();
        
        $where['idjnsdashboard']=$this->input->post('id');
        $this->db->where($where);
        $this->db->update("JDASHBOARD", $data);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
   
    
    function d_JD(){       //ISTRA
        $where['kdjnsdashboard']=$this->input->post('kode');

        $this->db->trans_begin();
       // $this->db->where($where);
        $this->db->delete("JDASHBOARD",$where);
       
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
        return $return;
    }
     
     //END JENIS DASHBOARD =====================================================
    
    // START JENIS KELOMPOK PENGGUNA
    
    
       
   function s_JKP(){      // ISTRA
               
             $data = array(
             'idklppengguna'=> $this->autoNumber('idklppengguna', 'klppengguna'),
             'kdklppengguna'=> $_POST['kode'],
             'nmklppengguna'=> $_POST['nama'],
             'deskripsi'=> $_POST['deskripsi'],
             'idjnsdashboard'=> $this->id_field('idjnsdashboard', 'jdashboard', 'nmjnsdashboard', $this->input->post('dashboard')),//$_POST['kode'],
             'idstatus'=> $this->id_field('idstatus', 'status', 'nmstatus', $this->input->post('status')),
             );

        $this->db->insert('klppengguna', $data);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["message"]='Simpan Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["message"]='Simpan Data  Gagal';
        }
        return $ret;
    }
   
    
    function u_JKP(){      // ISTRA
        $data = array(
             'kdklppengguna'=> $_POST['kode'],
             'nmklppengguna'=> $_POST['nama'],
             'deskripsi'=> $_POST['deskripsi'],
             'idjnsdashboard'=> $this->id_field('idjnsdashboard', 'jdashboard', 'nmjnsdashboard', $this->input->post('dashboard')),//$_POST['kode'],
             'idstatus'=> $this->id_field('idstatus', 'status', 'nmstatus', $this->input->post('status')),
               );
        
        $this->db->trans_begin();
        
        $where['idklppengguna']=$this->input->post('id');
        $this->db->where($where);
        $this->db->update("klppengguna", $data);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
   
    
    function d_JKP(){       //ISTRA
        $where['kdklppengguna']=$this->input->post('kode');

        $this->db->trans_begin();
       // $this->db->where($where);
        $this->db->delete("klppengguna",$where);
       
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
        return $return;
    }
       
    function u_OT(){      // ISTRA
        $bool                  = $this->input->post("bool");
        $idklppengguna         = $this->id_field('idklppengguna', 'klppengguna', 'kdklppengguna', $this->input->post("kpengguna"));
        $idmenu                = $this->id_field('idmenu', 'menu', 'kdmenu', $this->input->post("kdmenu"));
       
         $data = array(
             'idklppengguna'=> $idklppengguna,
             'idmenu'=> $idmenu
             );
        if($bool == 'false'){
            $this->db->insert('otoritas', $data);
            
            if($this->db->affected_rows()){
                $ret["success"]=true;
                $ret["message"]='Simpan Data Berhasil';
            }else{
                $ret["success"]=false;
                $ret["message"]='Simpan Data  Gagal';
            }
        }else{ //'true'
             $where['idklppengguna']=$idklppengguna;
             $where['idmenu']=$idmenu;
             $this->db->trans_begin();
             $this->db->delete("otoritas",$where);
             
             if ($this->db->trans_status() === FALSE)
            {
                $this->db->trans_rollback();
                $ret["success"]=false;
                $ret["message"]="Hapus Data gagal";
            }
            else
            {
                $this->db->trans_commit();
                $ret["success"]=true;
                $ret["message"]="Hapus Data Berhasil";
            }
        }
        
        
        return $ret;
     }
     function updateaktif(){      // ISTRA
        $details=$this->input->post("details");
       
        $this->db->trans_begin();
            $rows = explode(";",$details);
            $row_count = count($rows);
            for($ri=0;$ri<$row_count;$ri++){
                $rows2 = explode("x",$rows[$ri]);
              //  $row_count2 = count($rows2);
               // $x=0;
              //  for($rd=$x;$rd<=$row_count2;$rd++){
                    $this->db->query("CALL SP_verifikasiotorisasi (?,?,?)",array($rows2[0],$rows2[1],$rows2[2]));
              //  }
                
            }

        
         if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
	 
	 function simpan_otoritas(){      // ISTRA
        $details=$this->input->post("selectotoritas");
       
        $this->db->trans_begin();
            $rows = explode(";",$details);
            $row_count = count($rows);
            for($ri=0;$ri<$row_count;$ri++){
                $rows2 = explode("x",$rows[$ri]);
              //  $row_count2 = count($rows2);
               // $x=0;
              //  for($rd=$x;$rd<=$row_count2;$rd++){
                    $this->db->query("CALL SP_simpan_otoritas (?,?,?)",array($rows2[0],$rows2[1],$rows2[2]));
              //  }
                
            }

        
         if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
            
     //END OTORITAS

     // START PENGGUNA
     
     function g_PG(){ //ISTRA
        
        //======================================================================
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                  = $this->input->post("fields");
        $query                  = $this->input->post("query");
        
       
            $this->db->select("*");
            $this->db->from("pengguna");
        
        if($fields!="" || $query !=""){
            $k=array('[',']','"');
            $r=str_replace($k, '', $fields);
    //        $a[explode(',', $r)];
            $b=explode(',', $r);
            $c=count($b);
            for($i=0;$i<$c;$i++){
                $d[$b[$i]]=$query;
            }

           // $this->db->bracket('open','like');
             $this->db->or_like($d, $query);
           // $this->db->bracket('close','like');
        }
        
        //$this->db->order_by("JDASHBOARD");
                
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
            $q = $this->db->get(); 
        
        
      //  $q = $this->db->get(); 
       
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
        $datax = $this->db->count_all('pengguna');
        $ttl = $datax;
        
        //======================================================================
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

      foreach($data as $row) {
            array_push($build_array["data"],array(
                'userid'=>$row->userid,
                'password'=>$row->password,
                'nmlengkap'=>$row->nmlengkap,
                'email'=>$row->email,
                'nohp'=>  $row->nohp,
                'noref'=>$row->noref,
                'foto'=>$row->foto,
                'tgldaftar'=>  substr($row->tgldaftar,0,10),
                'idjnspengguna'=>$this->nm_field('nmjnspengguna', 'jpengguna', 'idjnspengguna', $row->idjnspengguna),
                'idklppengguna'=>$this->nm_field('nmklppengguna', 'klppengguna', 'idklppengguna', $row->idklppengguna),
                'idstatus'=>$this->nm_field('nmstatus', 'status', 'idstatus', $row->idstatus),
            ));
        }
        echo json_encode($build_array);
    }
	
   
   function s_PG($dt){      // ISTRA
      $arr_tgl1    = explode('/',$this->input->post("tgldaftar"));
      $tgldaftar  = $arr_tgl1[2]."-".$arr_tgl1[1]."-".$arr_tgl1[0];
       $kp= $this->id_field('idklppengguna', 'klppengguna', 'nmklppengguna', $this->input->post('kelompok_pengguna'));
       $jp= $this->id_field('idjnspengguna', 'jpengguna', 'nmjnspengguna', $this->input->post('jenis_pengguna'));
	   
             $data = array(
             'userid'=> $_POST['userid'],
             'password'=> base64_encode($_POST['password']),
             'nmlengkap'=> $_POST['nama_lengkap'],
             'email'=> $_POST['email'],
             'nohp'=> $_POST['handphone'],
             'noref'=> $_POST['no_ref'],
             'idklppengguna'=> $kp,
             'idjnspengguna'=> $jp,
             'foto'=> $dt,
             /* 'idklppengguna'=>$this->id_field('idklppengguna', 'klppengguna', 'kdklppengguna', $_POST['h_klppengguna']),
             'idjnspengguna'=> $_POST['h_jpengguna'],
             'foto'=> $dt["file_name"], */
             'idstatus'=> $this->id_field('idstatus', 'status', 'nmstatus',$_POST['status']),
             'tgldaftar'=> $tgldaftar
             );
		
        $this->db->insert('pengguna', $data);
        if($this->db->affected_rows()){
            $ret["success"]=true;
            $ret["message"]='Simpan Data Berhasil';
        }else{
            $ret["success"]=false;
            $ret["message"]='Simpan Data  Gagal';
        }
        return $ret;
    }
   
    
    function u_PG($dt){      // ISTRA
      $arr_tgl1    = explode('/',$this->input->post("tgldaftar"));
      $tgldaftar  = $arr_tgl1[2]."-".$arr_tgl1[1]."-".$arr_tgl1[0];
       $kp= $this->id_field('idklppengguna', 'klppengguna', 'nmklppengguna', $this->input->post('kelompok_pengguna'));
       $jp= $this->id_field('idjnspengguna', 'jpengguna', 'nmjnspengguna', $this->input->post('jenis_pengguna'));
        $data = array(
            'userid'=> $_POST['userid'],
             'password'=> base64_encode($_POST['password']),
             'nmlengkap'=> $_POST['nama_lengkap'],
             'email'=> $_POST['email'],
             'nohp'=> $_POST['handphone'],
             'noref'=> $_POST['no_ref'],
             'idklppengguna'=> $kp,
             'idjnspengguna'=> $jp,
             'foto'=> $dt,
             'idstatus'=> $this->id_field('idstatus', 'status', 'nmstatus', $this->input->post('status')),
             'tgldaftar'=>$tgldaftar,
             );
			
        
        $this->db->trans_begin();
        
        $where['userid']=$this->input->post('userid');
        $this->db->where($where);
        $this->db->update("pengguna", $data);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Ubah Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Ubah Data Berhasil";
        }
        return $return;
     }
   
    
    function d_PG(){       //ISTRA
        $where['userid']=$this->input->post('userid');
		$oldphoto = $this->input->post('temp_foto');
		
		if ($oldphoto) {
			unlink("resources/img/ori/o_user/$oldphoto");
			unlink("resources/img/thumbs/t_user/thumb_$oldphoto");
		}

        $this->db->trans_begin();
       // $this->db->where($where);
        $this->db->delete("pengguna",$where);
       
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
     
     // END PENGGUNA ===========================================================
	 
     // START PENGGUNA PROGRAM STUDI
    function g_PPS(){ //ISTRA
        
    //======================================================================
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
        $id_module              = $this->input->post("userid");
        
            $q= $this->db->query("SELECT `prodi`.`kdprodi` AS `kdprodi`
     , `prodi`.`nmprodi` AS `nmprodi`
     , if(((SELECT `penggunaprodi`.`kdprodi` AS `kdprodi`
            FROM
              `penggunaprodi`
            WHERE
              ((`penggunaprodi`.`userid` = '".$id_module."')
              AND (`penggunaprodi`.`kdprodi` = `prodi`.`kdprodi`))) = `prodi`.`kdprodi`), 1, 0) AS `pilih`
FROM
  `prodi` WHERE kdprodi<>0");

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
            $this->db->limit(50,0);
        }
        
       
        $data = array();
        if ($q->num_rows() > 0) {
            $data = $q->result();
        }
        $datax = $this->db->count_all('prodi');
        $ttl = $datax;
        
        //======================================================================
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

      foreach($data as $row) {
            array_push($build_array["data"],array(
               
                'kdprodi'=>$row->kdprodi,
				'nmprodi'=>$row->nmprodi,
				'pilih'=>$row->pilih,
				
               
                            ));
        }
        echo json_encode($build_array);  
    }
    
       
   function s_PPS(){      // ISTRA
           $data=$this->input->post("pilihpenggunaprodi");
       
        $this->db->trans_begin();
            $rows = explode(";",$data);
            $row_count = count($rows);
            for($ri=0;$ri<$row_count;$ri++){
                $rows2 = explode("x",$rows[$ri]);
                
                     $this->db->query("CALL SP_simpan_pengguna_prodi (?,?,?)",
                             array(
                                 $rows2[0], //idmateri
                                 $rows2[1], //kdprodi
                                 $rows2[2], //pilih
                                ));
             }
        
         if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return["success"]=false;
            $return["message"]="Simpan Data gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return["success"]=true;
            $return["message"]="Simpan Data Berhasil";
        }
        return $return;         
            
    }
     
     //END PPS
       
    // START ganti password
	 function u_Pass(){      //
	 $oldpass =  $this->input->post('passlama');
     $newpass =  $this->input->post('passbaru');
	 $user = $this->my_usession->userdata('user_id');
	 $cekpass = $this->id_field('userid', 'pengguna', 'password', $oldpass);
	  
	  
	 if ($cekpass) {
		$data = array(
             'password'=>  $newpass,
             
             );
        
        $this->db->trans_begin();
        
        $where['userid']=$user;
		
        $this->db->where($where);
        $this->db->update("pengguna", $data);

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $return="Ganti Password gagal";
        }
        else
        {
            $this->db->trans_commit();
            $return="Ganti Password Berhasil";
        }
        echo $return;
		
	 } else {
		$return = "Password Lama Tidak Sama";
		echo $return;
     }
	 
    }
	 
	 //END GANTI PASSWORD


//=====================UPLOAD FOTO=======================

	function upload(){
			$table = $this->input->post('table');
		if 	($table == 'menu') {
			
            $config['upload_path'] = './resources/img/icons/';
            $config['allowed_types'] = 'ico|png';
            
			$kode = $this->input->post("kode");
			$numrows = $this->cek_rows('menu','kdmenu',$kode);
			
		}	else if($table == 'pengguna') {
			$ori_dir = 'resources/img/ori/o_user/';
			$thumb_dir = 'resources/img/thumbs/t_user/';
		
            $config['upload_path'] = './resources/img/ori/o_user/';
            $config['allowed_types'] = 'gif|jpg|png|jpeg';
			
			$kode = $this->input->post("userid");
			$numrows = $this->cek_rows('pengguna','userid',$kode);
		}
		
		$this->load->library('upload', $config);
		
		if ($_FILES['file_gambar']['size'] <= 800000) {	
	
				if ($numrows == 0) {
				
					if ($this->upload->do_upload('file_gambar'))
					{

						$data=$this->upload->data();
						// create thumbnail
						$newname= str_replace(" ", "_", $_FILES['file_gambar']['name']);
						
						if 	($table == 'menu') {
							$this->s_MN($data);
						} else if($table == 'pengguna') {
							$this->createThumb($newname, $ori_dir, $thumb_dir, $_FILES['file_gambar']['type']);
							$this->s_PG($data);
						}
						
						$return["success"]='true';
						$return["nama"]=$data["file_name"];
						
						echo json_encode($return);
					
					} else {
						
						if 	($table == 'menu') {
							$this->s_MN(null);
						} else if($table == 'pengguna') {
							//$this->createThumb($newname, $ori_dir, $thumb_dir, $_FILES['file_gambar']['type']);
							$this->s_PG(null);
						}
						
						$return["success"]='true';
						$return["nama"]='';

						echo json_encode($return);
					}
					
				} else {
				
				$return["success"]='false';
				$return["nama"]=$_FILES['file_gambar']['name'];
				$return["data"] = '';
				echo json_encode($return);
				
				}

			} else {
					
				$return["success"]='false';
                $return["nama"]=$_FILES['file_gambar']['name'];
				$return["data"]=', Ukuran file maksimal 800kb';
                echo json_encode($return);
				
			}	

    } 
	
	function upload_update(){
		$table = $this->input->post('table');
		$oldphoto = $_POST['temp_foto'];
		$newphoto = $this->input->post("get_foto");
		
		if 	($table == 'menu') {
			
            $config['upload_path'] = './resources/img/icons/';
            $config['allowed_types'] = 'ico|png';
			
		}	else if($table == 'pengguna') {
			$ori_dir = 'resources/img/ori/o_user/';
			$thumb_dir = 'resources/img/thumbs/t_user/';
		
            $config['upload_path'] = './resources/img/ori/o_user/';
            $config['allowed_types'] = 'gif|jpg|png|jpeg';
		}
		
		$this->load->library('upload', $config);
	
		if ($newphoto == $oldphoto) {
			
			if 	($table == 'menu') {
				$this->u_MN($_POST['temp_foto']);
			} else if($table == 'pengguna') {
				$this->u_PG($_POST['temp_foto']);
			}
			
			$return["success"]='true';
			$return["nama"]='';
			$return["data"]='';		
			echo json_encode($return);
			
		} else {
					
			if ($_FILES['file_gambar']['size'] <= 800000) {	

					if ($this->upload->do_upload('file_gambar'))
					{

						$data=$this->upload->data();
						// create thumbnail
						$newname= str_replace(" ", "_", $_FILES['file_gambar']['name']);
						
						if 	($table == 'menu') {
							$this->u_MN($data["file_name"]);
							if ($oldphoto) {

								unlink("resources/img/icons/$oldphoto");
							}
						} else if($table == 'pengguna') {
							$this->createThumb($newname, $ori_dir, $thumb_dir, $_FILES['file_gambar']['type']);
							$this->u_PG($data["file_name"]);
							if ($oldphoto) {

								unlink("resources/img/ori/o_user/$oldphoto");
								unlink("resources/img/thumbs/t_user/thumb_$oldphoto");
							}
						}

						$return["success"]='true';
						$return["nama"]=', File '.$data["file_name"];
						$return["data"]=' berhasil di upload';
						echo json_encode($return);
						
					} else {
						
						if 	($table == 'menu') {
							$this->u_MN(null);
						} else if($table == 'pengguna') {
							$this->u_PG(null);
						}
						
						unlink("resources/img/ori/o_user/$oldphoto");
						unlink("resources/img/thumbs/t_user/thumb_$oldphoto");
						
						$return["success"]='true';
						$return["nama"]='';
						echo json_encode($return);
					}

			} else {
					
				$return["success"]='false';
                $return["nama"]=$_FILES['file_gambar']['name'];
				$return["data"]=', Ukuran file maksimal 800kb';
                echo json_encode($return);
				
			}	
		}

    }
	
	
	 function createThumb($img_file, $ori_path, $thumb_path, $img_type)
        {

            // get the image source
            $path = $ori_path;
            $img = $path . $img_file;
            switch ($img_type) {
                case "image/jpeg":
                    $img_src = @imagecreatefromjpeg($img);
                    break;
                case "image/pjpeg":
                    $img_src = @imagecreatefromjpeg($img);
                    break;
                case "image/png":
                    $img_src = @imagecreatefrompng($img);
                    break;
                case "image/x-png":
                    $img_src = @imagecreatefrompng($img);
                    break;
                case "image/gif":
                    $img_src = @imagecreatefromgif($img);
                    break;
            }
            $img_width = imagesx($img_src);
            $img_height = imagesy($img_src);

            $square_size = 100;

            // check width, height, or square
            if ($img_width == $img_height) {
                // square
                $tmp_width = $square_size;
                $tmp_height = $square_size;
            } else
                if ($img_height < $img_width) {
                    // wide
                    $tmp_height = $square_size;
                    $tmp_width = intval(($img_width / $img_height) * $square_size);
                    if ($tmp_width % 2 != 0) {
                        $tmp_width++;
                    }
                } else
                    if ($img_height > $img_width) {
                        $tmp_width = $square_size;
                        $tmp_height = intval(($img_height / $img_width) * $square_size);
                        if ($tmp_height % 2 != 0) {
                            $tmp_height++;
                        }
                    }

            $img_new = imagecreatetruecolor($tmp_width, $tmp_height);
            imagecopyresampled($img_new, $img_src, 0, 0, 0, 0, $tmp_width, $tmp_height, $img_width,
                $img_height);

            // create temporary thumbnail and locate on the server
            $thumb = $thumb_path . "thumb_" . $img_file;
            switch ($img_type) {
                case "image/jpeg":
                    imagejpeg($img_new, $thumb);
                    break;
                case "image/pjpeg":
                    imagejpeg($img_new, $thumb);
                    break;
                case "image/png":
                    imagepng($img_new, $thumb);
                    break;
                case "image/x-png":
                    imagepng($img_new, $thumb);
                    break;
                case "image/gif":
                    imagegif($img_new, $thumb);
                    break;
            }

            // get tmp_image
            switch ($img_type) {
                case "image/jpeg":
                    $img_thumb_square = imagecreatefromjpeg($thumb);
                    break;
                case "image/pjpeg":
                    $img_thumb_square = imagecreatefromjpeg($thumb);
                    break;
                case "image/png":
                    $img_thumb_square = imagecreatefrompng($thumb);
                    break;
                case "image/x-png":
                    $img_thumb_square = imagecreatefrompng($thumb);
                    break;
                case "image/gif":
                    $img_thumb_square = imagecreatefromgif($thumb);
                    break;
            }

            $thumb_width = imagesx($img_thumb_square);
            $thumb_height = imagesy($img_thumb_square);

            if ($thumb_height < $thumb_width) {
                // wide
                $x_src = ($thumb_width - $square_size) / 2;
                $y_src = 0;
                $img_final = imagecreatetruecolor($square_size, $square_size);
                imagecopy($img_final, $img_thumb_square, 0, 0, $x_src, $y_src, $square_size, $square_size);
            } else
                if ($thumb_height > $thumb_width) {
                    // landscape
                    $x_src = 0;
                    $y_src = ($thumb_height - $square_size) / 2;
                    $img_final = imagecreatetruecolor($square_size, $square_size);
                    imagecopy($img_final, $img_thumb_square, 0, 0, $x_src, $y_src, $square_size, $square_size);
                } else {
                    $img_final = imagecreatetruecolor($square_size, $square_size);
                    imagecopy($img_final, $img_thumb_square, 0, 0, 0, 0, $square_size, $square_size);
                }

                switch ($img_type) {
                    case "image/jpeg":
                        @imagejpeg($img_final, $thumb);
                        break;
                    case "image/pjpeg":
                        @imagejpeg($img_final, $thumb);
                        break;
                    case "image/png":
                        @imagepng($img_final, $thumb);
                        break;
                    case "image/x-png":
                        @imagepng($img_final, $thumb);
                        break;
                    case "image/gif":
                        @imagegif($img_final, $thumb);
                        break;
                }
        }

}