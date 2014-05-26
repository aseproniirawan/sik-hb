<?php
/**
 * Mencetak Semua Dokumen Baik itu report atau dokumen
 *
 * @author gambasvb
 */
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Print_topdf extends Controller {
    function __construct(){
        parent::__construct();
       $this->load->library('cezpdf');
    }
    
    function header($orientation){
        if($orientation=='landscape'){
            $x_image = 100;
            $y_image = 475;
            
            $x_text1 = 218;
            $y_text1 = 535;
            
            $x_text2 = 218;
            $y_text2 = 515;
            $alamat='          Jl. Karapitan No. 116 Bandung 60261, Telp. 022-4218084, Fax. 022-4237144';
			$this->cezpdf->line(90,465,745,465);
        }else{
            $x_image = 50;
            $y_image = 725;
            
            $x_text1 = 168;
            $y_text1 = 785;
            
            $x_text2 = 168;
            $y_text2 = 765;
            $alamat='                                 Jl. Karapitan No. 116 Bandung 60261, Telp. 022-4218084, Fax. 022-4237144';
			$this->cezpdf->line(55,720,550,720);
		}
        
        $image = imagecreatefrompng(base_url().'resources/img/report.png');
        $this->cezpdf->addImage($image,$x_image,$y_image,110);
        
       // $this->cezpdf->addPngFromFile(base_url().'resources/common-web/gfx/theme1/icon.png',100,490,100,'left'); //245,510,100,'left');
        // $this->cezpdf->ezText($text,7,array('justification' => 'right'));

        //head info laporan
        $this->cezpdf->selectFont('./fonts/Helvetica-Bold');
        $this->cezpdf->addText($x_text1,$y_text1,14,"",0);
        $this->cezpdf->addText($x_text2,$y_text2,23,"",0);
        $this->cezpdf->selectFont('./fonts/Helvetica');
        
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>$alamat);

		
             
            $this->cezpdf->ezTable($head_unla, '', '', array( 'width'=>660,
                                                              'fontSize' => 11,
                                                              'showLines'=> 0,
                                                              'showHeadings'=>0,
                                                              'shaded'=>0,
                                                              'cols'=>array(
                                                                    'kol1'=>array('justification'=>'left','width'=>'35','fontSize' => 12),
                                                                    'kol2'=>array('justification'=>'left','width'=>'500'))));
        
    }
    
    function terbilang($x)
    {
        $abil = array(
            "",
            "Satu",
            "Dua",
            "Tiga",
            "Empat",
            "Lima",
            "Enam",
            "Tujuh",
            "Delapan",
            "Sembilan",
            "Sepuluh",
            "Sebelas");
        if ($x < 12){
            return $abil[$x];}
        elseif ($x < 20){
            return $this->terbilang($x - 10) . " Belas";}
        elseif ($x < 100){
            return $this->terbilang($x / 10) . " Puluh" . $this->terbilang($x % 10);}
        elseif ($x < 200){
            return " Seratus" . $this->terbilang($x - 100);}
        elseif ($x < 1000){
            return $this->terbilang($x / 100) . " Ratus" . $this->terbilang($x % 100);}
        elseif ($x < 2000){
            return " Seribu" . $this->terbilang($x - 1000);}
        elseif ($x < 1000000){
            return $this->terbilang($x / 1000) . " Ribu" . $this->terbilang($x % 1000);}
        elseif ($x < 1000000000){
            return $this->terbilang($x / 1000000) . " Juta" . $this->terbilang($x % 1000000);}
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
	
     function get_v_infojdokterpraktek($wherex){
        $fild          = ($wherex['cb_search'])=='nmbagian' ? 'nmbagian':'nmdoktergelar';
        $value         = $wherex['cek'];
		
         if($fild != ''){
             $dimana = "where ".$fild." like '%".$value."%'";
         } else {
			$dimana = '';
		 }
        $q = "SELECT * FROM v_infojdokterpraktek ".$dimana;

        $query  = $this->db->query($q);
        $result = array();
        if ($query->num_rows() > 0) {
            $result = $query->result();
        }
        return $result;
    }
	
// ===============================================================================================================
    
    function infojpraktekdokter($var)
     {
        $par                    = explode("istra", $var);
        $cb_search           = $par[0];
        $cek		         = $par[1];
        $search_show 		 = ($par[0] == 'nmbagian') ? 'Unit Pelayanan':'Nama Dokter';
		
      //  $this->cezpdf->ezText("<b>White Rabbit checking watch</b>",12,array("justification"=>"center"));
        
       //$text = "Software Developer Phone: 08987070737-Reza";
        
       // $this->cezpdf->stream();
        //====================================================
        $this->cezpdf->Cezpdf('A4','landscape'); //landscape
        $this->cezpdf->ezSetMargins(15,30,10,10); //kiri, atas, kanan, bawah
        
         
      //  $this->cezpdf->addText(150,100,10,"the quick <b>brown</b> fox jumps over the lazy dog!",0);
        
         //$this->header('landscape'); //untuk memberi Logo pada header laporan
        
         $this->cezpdf->ezSetDy(-50, 'makeSpace'); //separator space
//            
            $this->cezpdf->selectFont('./fonts/Helvetica-Bold');
            $this->cezpdf->ezText("<b>JADWAL PRAKTEK DOKTER</b>", 12, array("justification" => "center")); //addText(350,450,14,"<b>STUDENT BODY</b> <i>dodol</i>",0);
            $this->cezpdf->selectFont('./fonts/Helvetica');
       
           // $head_1[]=array(   'kol1'=>'','kol2'=>'','kol3'=>'');
            $head_2[]=array(   'kol1'=>$search_show.' : '.$cek,'kol2'=>'','kol3'=>'');
             
//            $this->cezpdf->ezTable($head_1, '', '', array( 'width'=>660,
//                                                              'fontSize' => 12,
//                                                              'showLines'=> 0,
//                                                              'showHeadings'=>0,
//                                                              'shaded'=>0,
//                                                              'cols'=>array(
//                                                                    'kol1'=>array('justification'=>'left'),
//                                                                    'kol2'=>array('justification'=>'center'),
//                                                                    'kol3'=>array('justification'=>'center'))));
//            
            $this->cezpdf->ezTable($head_2, '', '', array( 'width'=>800,
                                                              'fontSize' => 8, 
                                                              'showLines'=> 0,
                                                              'showHeadings'=>0,
                                                              'shaded'=>0,
                                                              'cols'=>array(
                                                                    'kol1'=>array('justification'=>'left'),
                                                                    'kol2'=>array('justification'=>'center'),
                                                                    'kol3'=>array('justification'=>'center'))));
            

    
       
// nmbagian,nmdoktergelar,senin,selasa,rabu,kamis,jumat,sabtu,minggu,keterangan
                    $col_names3[] = array(
                                    'nourut' =>'No.',
                                    'nmbagian' => 'Unit Bagian',
                                    'nmdoktergelar' => 'Nama Dokter',
                                    'senin' => 'Senin',
                                    'selasa' => 'Selasa',
                                    'rabu' => 'Rabu',
                                    'kamis' => 'Kamis',
                                    'jumat' => 'Jumat',
                                    'sabtu' => 'Sabtu',
                                    'minggu' => 'Minggu',
                                    'keterangan' => 'Keterangan',
                            );


                 $this->cezpdf->ezTable($col_names3, '', '', array('width'=>800,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>0,'shaded'=>0,'justification'=>"right",
                                                              'cols'=>array(
                                                                  'nourut'=>array('width'=>30,'justification'=>"center"),
                                                                  'nmbagian'=>array('width'=>100,'justification'=>"center"),
                                                                  'nmdoktergelar'=>array('width'=>140,'justification'=>"center"),
                                                                  'senin'=>array('width'=>60,'justification'=>"center"),
                                                                  'selasa'=>array('width'=>60,'justification'=>"center"),
                                                                  'rabu'=>array('width'=>60,'justification'=>"center"),
                                                                  'kamis'=>array('width'=>60,'justification'=>"center"),
                                                                  'jumat'=>array('width'=>60,'justification'=>"center"),
                                                                  'sabtu'=>array('width'=>60,'justification'=>"center"),
                                                                  'minggu'=>array('width'=>60,'justification'=>"center"),
                                                                  'keterangan'=>array('width'=>100,'justification'=>"center"),

                                                                )
                                                                ));

                  // data table
				 $wherex['cb_search']=$cb_search; 
                 $wherex['cek']=$cek;
				 
                $so = $this->get_v_infojdokterpraktek($wherex);
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $db_data[] = array(
									'no' => $i.'.',
                                    'nmbagian' => $item->nmbagian,
                                    'nmdoktergelar' => $item->nmdoktergelar,
                                    'senin' => $item->senin,
                                    'selasa' => $item->selasa,
                                    'rabu' => $item->rabu,
                                    'kamis' => $item->kamis,
                                    'jumat' => $item->jumat,
                                    'sabtu' => $item->sabtu,
                                    'minggu' => $item->minggu,
                                    'keterangan' => $item->catatan,
                                      );
                    }
                 $this->cezpdf->ezTable($db_data, '', '', array('width'=>800,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>0,'shaded'=>0,'justification'=>"right",
                                                              'cols'=>array(
                                                                  'no'=>array('width'=>30,'justification'=>"center"),
                                                                  'nmbagian'=>array('width'=>100,'justification'=>"left"),
                                                                  'nmdoktergelar'=>array('width'=>140,'justification'=>"left"),
                                                                  'senin'=>array('width'=>60,'justification'=>"center"),
                                                                  'selasa'=>array('width'=>60,'justification'=>"center"),
                                                                  'rabu'=>array('width'=>60,'justification'=>"center"),
                                                                  'kamis'=>array('width'=>60,'justification'=>"center"),
                                                                  'jumat'=>array('width'=>60,'justification'=>"center"),
                                                                  'sabtu'=>array('width'=>60,'justification'=>"center"),
                                                                  'minggu'=>array('width'=>60,'justification'=>"center"),
                                                                  'keterangan'=>array('width'=>100,'justification'=>"left"),

                                                                )
                                                                ));


        $this->cezpdf->ezStream(array('Content-Disposition'=>'JadwalPraktek'.$cek.'.pdf'));
     }
    
}
