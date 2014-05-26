<?php

class C_mastah extends Controller {
var $stat;

    public function __construct()
    {
        parent::Controller();
        
    }

    // START HELPER ===========================================================
    function gridM_status(){ //ISTRA
        $q="SELECT * from status";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function gridM_dash(){ //ISTRA
        $q="SELECT * from jdashboard";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function gridM_hierarki(){ //ISTRA
        $q="SELECT * from jhirarki";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function gridS_menu(){ //ISTRA
        $q="SELECT * from menu";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function gridL_pengguna(){ //ISTRA
     $rmasuk                  = $this->input->post("rtglmasuk");
     $rkeluar                 = $this->input->post("rtglkeluar");
	 
	 $tgl1                  = $this->input->post("tglmasuk");
     $tgl2                  = $this->input->post("tglkeluar");
	 
	 if ($rmasuk == 1){
		$q="SELECT * from logpengguna where date(tglmasuk) between '". $tgl1 ."' and '". $tgl2 ."'";	
	 } else if ($rkeluar == 1){
		$q="SELECT * from logpengguna where date(tglkeluar) between '". $tgl1 ."' and '". $tgl2 ."'";	
	 }
	 else {
        $q="SELECT * from logpengguna";
	 }
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_stpublish(){ //ISTRA
        $q="SELECT * from stpublish";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
     function grid_kategorihalaman(){ //ISTRA
        $q="SELECT * from ktghalaman";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_jgaleri(){ //ISTRA
        $q="SELECT * from jgaleri";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_klpgaleri(){ //ISTRA
        $q="SELECT * from klpgaleri";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_klptautan(){ //ISTRA
        $q="SELECT * from klptautan";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_stsemester(){ //ISTRA
        $q="SELECT * from stsemester";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_vstsemester(){ //ISTRA

        
        $q="SELECT kdstsemester, kdthnakademik, idjnssemester, nmjnssemester from vv_status_semester WHERE idstatus = 1";
        
        $query  = $this->db->query($q);
        if ($query->num_rows() > 0) {
            $data = $query->row();
        }
        
        $ttl = count($data);
        
        if($ttl>0){
            $build_array='{"kdstsemester":"'.$data->kdstsemester
                    .'", "kdthnakademik":"'.$data->kdthnakademik
                    .'", "idjnssemester":"'.$data->idjnssemester
                    .'", "nmjnssemester":"'.$data->nmjnssemester.'"}';
        }
        echo $build_array;
    }
    
    function grid_vstsemester2(){ //ISTRA

        
        $q="SELECT kdstsemester, kdthnakademik, idjnssemester, nmjnssemester from vv_status_semester WHERE idstatus = 1";
        
        $query  = $this->db->query($q);
         if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_vstsemester3(){ //ISTRA

        
        $q="SELECT kdstsemester, kdthnakademik, idjnssemester, nmjnssemester from vv_status_semester";
        
        $query  = $this->db->query($q);
         if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_stmskmhs(){ //ISTRA
        $q="SELECT idstmskmhs, nmstmskmhs from stmskmhs";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_stmskmhs_pmb(){ //ISTRA
        $q="SELECT idstmskmhs, nmstmskmhs from stmskmhs where idstmskmhs<=2";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_jadwalpmb(){ //ISTRA
        $q="SELECT * from jadwalpmb where idstatus=1";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_prodi(){ //ISTRA
        $q="SELECT nourutprodi, nmprodi, nmjenjangstudi, kdprodi FROM v_prodi where nmjenjangstudi <> 'S-2'";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
           foreach($data as $row) {
                array_push($build_array["data"],array(
                    'kdprodi'=>$row->kdprodi,
                    'nmprodi'=>$row->nourutprodi.".".$row->nmprodi." ".$row->nmjenjangstudi
                ));
            }
        }
        echo json_encode($build_array);
    }
    
    function grid_prodiasal(){ //ISTRA
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
       
        
        $this->db->select("kdpsttbpst, nmpsttbpst");
        $this->db->from("tbpst"); 
        
        //$q="SELECT nmkabtbpro, nmprotbpro,kdprotbpro,kdkabtbpro from tbpro";
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
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
        
        $query2  = $this->db->get(); //$this->db->query($q);
        $data = array();
        if ($query2->num_rows() > 0) {
            $data = $query2->result();
        }
            
        $ttl =$this->db->count_all('tbpst');
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
           foreach($data as $row) {
                array_push($build_array["data"],array(
                    'kdprodi'=>$row->kdpsttbpst,
                    'nmprodi'=>$row->nmpsttbpst
                ));
            }
        }
        echo json_encode($build_array);
    }
    
    function grid_fieldpmb()
    {
        $query="SELECT COLUMN_NAME AS kolom FROM information_schema.`COLUMNS` WHERE TABLE_NAME = 'pmb' AND TABLE_SCHEMA = 'siak-unla-public'";
        $exec=$this->db->query($query);
        
        $data['data']=$exec->result();
        echo json_encode($data);
    }
    
    function grid_klsmhs(){ //ISTRA
        $dimana                   = "";
        $kdprodi                  = $this->input->post("kdprodi");
        
        if($kdprodi !=''){
            $dimana = "Where kdprodi=".$kdprodi;
        }
         $q="SELECT idklsmhs, kdklsmhs, nmklsmhs from v_klsprodi ".$dimana;
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_klsmhs2(){ //ISTRA
        $dimana2                   = "";
        $kdprodi2                  = $this->input->post("kdprodi");
        
        if($kdprodi2 !=''){
            $dimana2 = $kdprodi2;
        }
        
        $q="SELECT idklsmhs, kdklsmhs, nmklsmhs from v_klsprodi Where kdprodi=".$dimana2;
        $query  = $this->db->query($q);
         
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_kotkabasal(){ //ISTRA
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
       
        
        $this->db->select("nmkabtbpro, nmprotbpro,kdprotbpro,kdkabtbpro");
        $this->db->from("tbpro"); 
        
        //$q="SELECT nmkabtbpro, nmprotbpro,kdprotbpro,kdkabtbpro from tbpro";
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
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
        
        $query2  = $this->db->get(); //$this->db->query($q);
        $data = array();
        if ($query2->num_rows() > 0) {
            $data = $query2->result();
        }
            
        $ttl =$this->db->count_all('tbpro');
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            foreach($data as $row) {
                array_push($build_array["data"],array(
                    'nmkabtbpro'=>$row->nmkabtbpro,
                    'nmprotbpro'=>$row->nmprotbpro,
                    'kdkabtbpro'=>$row->kdkabtbpro.$row->kdprotbpro,
                                ));
            }
        }
        echo json_encode($build_array);
    }//
    //
    function grid_pekerjaanortu(){ //ISTRA
        $q="SELECT idpekerjaanortu, nmpekerjaanortu from pekerjaanortu";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_ptasal(){ //ISTRA
        $start                  = $this->input->post("start");
        $limit                  = $this->input->post("limit");
        $fields                 = $this->input->post("fields");
        $query                  = $this->input->post("query");
       
        
        $this->db->select("nmptitbpti, kdptitbpti");
        $this->db->from("tbpti"); 
        
        //$q="SELECT nmkabtbpro, nmprotbpro,kdprotbpro,kdkabtbpro from tbpro";
        if ($start!=null){
            $this->db->limit($limit,$start);
        }else{
            $this->db->limit(50,0);
        }
        
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
        
        $query2  = $this->db->get(); //$this->db->query($q);
        $data = array();
        if ($query2->num_rows() > 0) {
            $data = $query2->result();
        }
            
        $ttl =$this->db->count_all('tbpti');
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }//
    //
    function grid_jenpdkpendaftar(){ //ISTRA
        $q="SELECT idjenpdkpendaftar, nmjenpdkpendaftar from jenpdkpendaftar";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    } //grid_stakreditasi
    
    function grid_stakreditasi(){ //ISTRA
        $q="SELECT idstakreditasi, nmstakreditasi from stakreditasi";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    } //grid_sbrinfo
    //
    function grid_sbrinfo(){ //ISTRA
        $q="SELECT idsbrinfo, nmsbrinfo from sbrinfo";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_rekpmb(){ //ISTRA
        $q="SELECT idrekpmb, nmrekpmb from rekpmb";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_alasanpendaftar(){ //ISTRA
        $q="SELECT idalasanpendaftar, nmalasanpendaftar from alasanpendaftar";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_carabyr(){ //ISTRA
        $q="SELECT idcarabyr, nmcarabyr from carabyr";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function gridM_stusm(){ 
        $q="SELECT idstusm, nmstusm from stusm";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function grid_jpengguna(){ //ISTRA
        $q="SELECT idjnspengguna, nmjnspengguna from jpengguna";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
    
    function griddosen(){ //ISTRA


        $q="SELECT nidn, nmdosdgngelar from dosen";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
	
	function grid_thnakademik2(){ //ISTRA
        $q="SELECT * from v_tahunakademik";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }
	
	function grid_pimpinan(){ //ISTRA
        $q="SELECT * from pimpinan";
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        $ttl = count($data);
        $build_array = array ("success"=>true,"results"=>$ttl,"data"=>array());

        if($ttl>0){
            $build_array["data"]=$data;
        }
        echo json_encode($build_array);
    }

    // END HELPER =============================================================
  
}
