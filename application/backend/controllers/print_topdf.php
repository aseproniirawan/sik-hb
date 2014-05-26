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
       
    }

 
    function getGrid_admin(){
//        $where='2012-07-13';//date('Y-m-d');

            $q = "SELECT * FROM tbl_admin" ;

        $query  = $this->db->query($q);
        $result = array();
        if ($query->num_rows() > 0) {
            $result = $query->result();
        }
        return $result;
    }

   function print_Dadmins()
     {
        $text = "http://www.ababil-online.com";

        $this->cezpdf->Cezpdf('A4','potrait'); //landscape
        $this->cezpdf->ezSetMargins(15,30,10,10); //kiri, atas, kanan, bawah
        $this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu.jpg',170,760,50,'left');
        $this->cezpdf->ezText($text,5,array('justification' => 'right'));


         //Separator Space
            $d_sparator_space1[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));


         //head info laporan
            $data_info[] 	= array( 'col_0' => "REPORT DATA ADMINISTRATOR");
            $data_info[] 	= array( 'col_0' => "TANGGAL FORM   : ".date("d/m/Y"));
            //$data_info_t = array('col_1' => '');
            $this->cezpdf->ezTable($data_info, '', '', array( //'width'=>1048,
                                                              'fontSize' => 8,
                                                              'showLines'=> 0,
                                                              'showHeadings'=>0,
                                                              'shaded'=>0,
                                                              'justification' => 'center'
                                                                ));

        //Separator Space
            $d_sparator_space2[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space2, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));

           
            // data table
                $so = $this->getGrid_admin();
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $db_data[] = array('no' => $i.'.',
                                    'id_admin' => $item->id_admin,
                                    'nama_lengkap' => $item->nama_lengkap,
                                    'username' => $item->username,
                                    'email' => $item->email,
                                    'password' => $item->password,
                                     'level_admin' => $item->level_admin,
                                    'status_admin' => $item->status_admin,

                                      );
                    }


                    $col_names3 = array(
                           // 'no' => 'No.',
                            'id_admin' => 'ID Admin',
                            'nama_lengkap' =>'Nama Lengkap' ,
                            'username' =>'Username',
                            'email' =>  'Email',
                            'password' => 'Password',
                             'level_admin' => 'Level Admin',
                            'status_admin' => 'Status Admin' ,
                            );


                 $this->cezpdf->ezTable($db_data, $col_names3, '', array('width'=>600,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                                                              'cols'=>array(
                                                                //  'no'=>array('width'=>25),

                                                                  'id_admin'=>array('width'=>75),

                                                                  'nama_lengkap'=>array('width'=>125,'justification'=>"center"),
                                                                  'username'=>array('width'=>85,'justification'=>"center"),

                                                                  'email'=>array('width'=>85,'justification'=>"center"),
                                                                  'password'=>array('width'=>85,'justification'=>"center"),

                                                                  'level_admin'=>array('width'=>60,'justification'=>"center"),
                                                                  'status_admin'=>array('width'=>60,'justification'=>"center"),

                                                                  )
                                                                ));

           // data footer
            $this->cezpdf->ezText('',10,array('justification' => 'left'));
            $this->cezpdf->ezText('Jumlah data: '.$i ,8,array('justification' => 'left'));
          

        $this->cezpdf->ezStream(array('Content-Disposition'=>'Report-Admin.pdf'));
     }

     function print_lap($kit,$param1=null,$param2=null)
     {
        switch($kit){
            case 'harian':
                $judul='REPORT DATA PENJUALAN HARIAN TANGGAL '.date('d/m/Y',strtotime(str_replace('_','/',$param1))); 
                $so = $this->get_profit('harian',$param1);
            break;
            case 'bulanan':
                $judul='REPORT DATA PENJUALAN BULAN '.$param1.' TAHUN '.$param2;
                $so = $this->get_profit('bulanan',$param1,$param2);
            break;
            case 'tahunan':
                $judul='REPORT DATA PENJUALAN TAHUN '.$param1;
                $so = $this->get_profit('tahunan',$param1);
            break;
            case 'periode':
                $judul='REPORT DATA PENJUALAN PERIODE '.date('d/m/Y',strtotime(str_replace('_','/',$param1))).' s/d '.date('d/m/Y',strtotime(str_replace('_','/',$param2)));
                $so = $this->get_profit('periode',$param1,$param2);
            break;
        }
        
        $text = "http://www.ababil-online.com";

        $this->cezpdf->Cezpdf('A4','potrait'); //landscape
        $this->cezpdf->ezSetMargins(15,30,10,10); //kiri, atas, kanan, bawah
        $this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu.jpg',115,760,50,'left');
        $this->cezpdf->ezText($text,5,array('justification' => 'right'));


         //Separator Space
            $d_sparator_space1[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));


         //head info laporan
            $data_info[] 	= array( 'col_0' => $judul );
            $data_info[] 	= array( 'col_0' => "TANGGAL FORM   : ".date("d/m/Y"));
            //$data_info_t = array('col_1' => '');
            $this->cezpdf->ezTable($data_info, '', '', array( //'width'=>1048,
                                                              'fontSize' => 8,
                                                              'showLines'=> 0,
                                                              'showHeadings'=>0,
                                                              'shaded'=>0,
                                                              'justification' => 'center'
                                                                ));

        //Separator Space
            $d_sparator_space2[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space2, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));
            $tot_qty=0;
            $tot_income=0;
            $tot_incomeQty=0;
           
            // data table
                
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $db_data[] = array('no' => $i.'.',
                                    'id_produk' => $item->id_produk,
                                    'nama_produk' => $item->nama_produk,
                                    'qty' => $item->qty,
                                    'harga_jual' => 'Rp. '. number_format($item->harga_jual),
                                    'harga_modal' => 'Rp. '. number_format($item->harga_modal),
                                    'income' => 'Rp. '. number_format($item->income),
                                    'income_x_qtt' => 'Rp. '. number_format($item->income_x_qtt),
                                    );
                        $tot_qty+=$item->qty;
                        $tot_income+=$item->income;
                        $tot_incomeQty+=$item->income_x_qtt;
                    }


                    $col_names3 = array(
                           // 'no' => 'No.',
                            'id_produk' => 'ID Produk',
                            'nama_produk' =>'Nama Produk' ,
                            'qty' =>'Quantity',
                            'harga_jual' =>  'Harga Jual',
                            'harga_modal' => 'Harga Modal',
                            'income' => 'Income',
                            'income_x_qtt' => 'Income x Qty' ,
                            );


                 $this->cezpdf->ezTable($db_data, $col_names3, '', array('width'=>600,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                                                              'cols'=>array(
                                                                //  'no'=>array('width'=>25),

                                                                  'id_produk'=>array('width'=>75),

                                                                  'nama_produk'=>array('width'=>125,'justification'=>"center"),
                                                                  'qty'=>array('width'=>85,'justification'=>"center"),

                                                                  'harga_jual'=>array('width'=>85,'justification'=>"center"),
                                                                  'harga_modal'=>array('width'=>85,'justification'=>"center"),

                                                                  'income'=>array('width'=>60,'justification'=>"center"),
                                                                  'income_x_qtt'=>array('width'=>60,'justification'=>"center"),

                                                                  )
                                                                ));

           // data footer
            $this->cezpdf->ezText('',10,array('justification' => 'left'));
            $this->cezpdf->ezText('Jumlah Quantity: '.$tot_qty ,8,array('justification' => 'left'));
            $this->cezpdf->ezText('Jumlah Income: '.'Rp. '. number_format($tot_income) ,8,array('justification' => 'left'));
            $this->cezpdf->ezText('Jumlah Income x Quantity: '.'Rp. '. number_format($tot_incomeQty) ,8,array('justification' => 'left'));
          

        $this->cezpdf->ezStream(array('Content-Disposition'=>'Report-Jual-'.$kit.'-'.date('d-m-Y').'.pdf'));
     }
     
     function getGrid_products(){
//        $where='2012-07-13';//date('Y-m-d');

            $q = "SELECT * FROM tbl_produk" ;

        $query  = $this->db->query($q);
        $result = array();
        if ($query->num_rows() > 0) {
            $result = $query->result();
        }
        return $result;
    }


    function print_Dproducts()
     {
        $text = "Software Developer Phone: 08987070737-Reza";

        $this->cezpdf->Cezpdf('A4','landscape'); //landscape
        $this->cezpdf->ezSetMargins(15,30,10,10); //kiri, atas, kanan, bawah
        $this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu2.jpg',245,510,100,'left');
        $this->cezpdf->ezText($text,7,array('justification' => 'right'));


         //Separator Space
            $d_sparator_space1[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));


         //head info laporan
            $data_info[] 	= array( 'col_0' => "REPORT DATA PRODUK");
            $data_info[] 	= array( 'col_0' => "TANGGAL FORM   : ".date("d/m/Y"));
            //$data_info_t = array('col_1' => '');
            $this->cezpdf->ezTable($data_info, '', '', array( //'width'=>1048,
                                                              'fontSize' => 8,
                                                              'showLines'=> 0,
                                                              'showHeadings'=>0,
                                                              'shaded'=>0,
                                                              'justification' => 'center'
                                                                ));

        //Separator Space
            $d_sparator_space2[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space2, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));


            // data table
                $so = $this->getGrid_products();
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $db_data[] = array('no' => $i.'.',
                                    'id_produk' => $item->id_produk,
                                    'nama_produk' => $item->nama_produk,
                                    'harga' => 'Rp. '.number_format ($item->harga),
                                    'keterangan' => $item->keterangan,
                                    'stok' => $item->stok,
                                    'min_stok' => $item->minimum,
                                    'terjual' => $item->terjual,
                                    'supplier' => $item->supplier,
                                      );
                    }


                    $col_names3 = array(
                                    'id_produk' =>'ID Produk',
                                    'nama_produk' => 'Nama Produk',
                                    'harga' => 'Harga',
                                    'keterangan' => 'Keterangan',
                                    'stok' => 'Stok',
                                    'min_stok' => 'Min Stok',
                                    'terjual' => 'Terjual',
                                    'supplier' => 'Supplier',
                            );


                 $this->cezpdf->ezTable($db_data, $col_names3, '', array('width'=>800,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                                                              'cols'=>array(
                                                                  'id_produk'=>array('width'=>47),
                                                                  'nama_produk'=>array('width'=>150,'justification'=>"left"),
                                                                  'harga'=>array('width'=>60,'justification'=>"center"),
                                                                  'pengarang'=>array('width'=>150,'justification'=>"center"),
                                                                  'stok'=>array('width'=>40,'justification'=>"center"),
                                                                  'min_stok'=>array('width'=>45,'justification'=>"center"),
                                                                  'terjual'=>array('width'=>45,'justification'=>"center"),
                                                                  'supplier'=>array('width'=>210,'justification'=>"center"),

                                                                )
                                                                ));

           // data footer
            $this->cezpdf->ezText('',10,array('justification' => 'left'));
            $this->cezpdf->ezText('   Jumlah data: '.$i ,8,array('justification' => 'left'));
          

        $this->cezpdf->ezStream(array('Content-Disposition'=>'Report-Admin.pdf'));
     }
     
     
     
     function getGrid_member($param3){
//        $where='2012-07-13';//date('Y-m-d');
        if(param3 != ''){
            $q = "SELECT * FROM tbl_member where nama_lengkap ='".$param3."'" ;
        }else{
            $q = "SELECT * FROM tbl_member";
        }
    
        $query  = $this->db->query($q);
        $result = array();
        if ($query->num_rows() > 0) {
            $result = $query->result();
        }
        return $result;
    }
    
    function getGrid_member1(){
//        $where='2012-07-13';//date('Y-m-d');
       
            $q = "SELECT * FROM tbl_member" ;
        
      
        $query  = $this->db->query($q);
        $result = array();
        if ($query->num_rows() > 0) {
            $result = $query->result();
        }
        return $result;
    }


    function print_Dmembers()
     {
        $text = "Software Developer Phone: 08987070737-Reza";

        $this->cezpdf->Cezpdf('A4','landscape'); //landscape
        $this->cezpdf->ezSetMargins(15,30,10,10); //kiri, atas, kanan, bawah
        $this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu2.jpg',245,510,100,'left');
        $this->cezpdf->ezText($text,5,array('justification' => 'right'));


         //Separator Space
            $d_sparator_space1[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));


         //head info laporan
            $data_info[] 	= array( 'col_0' => "REPORT DATA AGEN");
            $data_info[] 	= array( 'col_0' => "TANGGAL FORM   : ".date("d/m/Y"));
            //$data_info_t = array('col_1' => '');
            $this->cezpdf->ezTable($data_info, '', '', array( //'width'=>1048,
                                                              'fontSize' => 8,
                                                              'showLines'=> 0,
                                                              'showHeadings'=>0,
                                                              'shaded'=>0,
                                                              'justification' => 'center'
                                                                ));

        //Separator Space
            $d_sparator_space2[]=array('separator_space'=>'');
            $this->cezpdf->ezTable($d_sparator_space2, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));

            $kosong='';
            // data table
                $soa = $this->getGrid_member1();
                    $i = 0;
                    foreach($soa as $item)
                    {
                        $i = ($i+1);
                        $db_data[] = array('no' => $i.'.',
                                    'id_member' => $item->id_member,
                                    'nama_lengkap' => $item->nama_lengkap,
//                                    'username' => $item->username,
//                                    'password' => $item->password,
                                    'email' => $item->email,
                                    'no_hp' => $item->no_hp,
                                    'alamat_member' => $item->alamat_member,
                            
                                    'kodepos' => $item->kodepos,
                                    'status_aktifasi' => $item->status_aktifasi,
                                    'tglmasuk' => $item->tglmasuk,
                                    //'id_upline' => $item->id_upline,
                                    
                                      );
                    }


                    $col_names3 = array(
                           
                            'id_member' => 'ID Member',
                            'nama_lengkap' =>'Nama Lengkap' ,
//                            'username' =>'Username',
//                            'password' =>  'Password',
                            'email' => 'Email',
                            'no_hp' => 'Handphone',
                            'alamat_member' => 'Alamat Member' ,
                            'kodepos' =>  'kodepos',
                           // 'status_aktifasi' => 'Status ',
                            'tglmasuk' => 'TGL Masuk',
//                            'id_upline' => 'ID Upline' ,
                       
                            );


                 $this->cezpdf->ezTable($db_data, $col_names3, '', array('width'=>600,
                            'fontSize' => 8,
                            'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                            'cols'=>array(
                            //  'no'=>array('width'=>25),

                                'id_member'=>array('width'=>50),
//                                'nama_lengkap'=>array('width'=>100,'justification'=>"center"),
//                                'username'=>array('width'=>80,'justification'=>"center"),
                                'password'=>array('width'=>80,'justification'=>"center"),
                                'email'=>array('width'=>125,'justification'=>"center"),
                                'no_hp'=>array('width'=>65,'justification'=>"center"),
                                'alamat_member'=>array('width'=>130,'justification'=>"center"),

                                'kodepos'=>array('width'=>50,'justification'=>"center"),
                                //'status_aktifasi'=>array('width'=>35,'justification'=>"center"),
                                'tglmasuk'=>array('width'=>75,'justification'=>"center"),
//                                'id_upline'=>array('width'=>45,'justification'=>"center"),

                                )
                            ));

           // data footer
            $this->cezpdf->ezText('',10,array('justification' => 'left'));
            $this->cezpdf->ezText('                                                             Jumlah data: '.$i ,8,array('justification' => 'left'));
          

        $this->cezpdf->ezStream(array('Content-Disposition'=>'Report-Admin.pdf'));
     }
     //===================================SURAT JALAN
     
     function getGrid_detail_pesanan($np){
//        $where='2012-07-13';//date('Y-m-d');

            $q = "SELECT * FROM v_pesanan_detail where no_order='".$np."'" ;

        $query  = $this->db->query($q);
        $result = array();
        if ($query->num_rows() > 0) {
            $result = $query->result();
        }
        return $result;
    }
    
//    function getStatus_Kredit($np){
//
//    }

     function get_profit($periode,$param1=null,$param2=null){
        $data='';
        switch($periode){
            case 'harian':
                //$q="SELECT * from v_faktur_produk_detail where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d')=STR_TO_DATE('".$this->input->post('tanggal')."','%Y-%m-%d');";
                $q="select vf.no_pesanan,vf.tgl_dipesan,vf.id_produk,vf.nama_produk,sum(vf.qty) as qty,vf.harga_jual,vf.harga_modal,sum(vf.income) as income,sum(vf.income_x_qtt) as income_x_qtt,vf.username from v_faktur_produk_detail vf where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d')=STR_TO_DATE('".str_replace('_','-',$param1)."','%Y-%m-%d') group by vf.id_produk";
            break;
            case 'bulanan':
                $q="SELECT vf.no_pesanan,vf.tgl_dipesan,vf.id_produk,vf.nama_produk,sum(vf.qty) as qty,vf.harga_jual,vf.harga_modal,sum(vf.income) as income,sum(vf.income_x_qtt) as income_x_qtt,vf.username from v_faktur_produk_detail vf where substring(tgl_dipesan,1,2)='".$param1."' and substring(tgl_dipesan,7,4)='".$param2."' group by vf.id_produk";
            break;
            case 'tahunan':
                $q="SELECT vf.no_pesanan,vf.tgl_dipesan,vf.id_produk,vf.nama_produk,sum(vf.qty) as qty,vf.harga_jual,vf.harga_modal,sum(vf.income) as income,sum(vf.income_x_qtt) as income_x_qtt,vf.username from v_faktur_produk_detail vf where substring(tgl_dipesan,7,4)='".$param1."' group by vf.id_produk";
            break;
            case 'periode':
                $q="select vf.no_pesanan,vf.tgl_dipesan,vf.id_produk,vf.nama_produk,sum(vf.qty) as qty,vf.harga_jual,vf.harga_modal,sum(vf.income) as income,sum(vf.income_x_qtt) as income_x_qtt,vf.username from v_faktur_produk_detail vf where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d') >= STR_TO_DATE('".str_replace('_','-',$param1)."','%Y-%m-%d') and STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d') <= STR_TO_DATE('".str_replace('_','-',$param2)."','%Y-%m-%d') group by vf.id_produk";
                //$q="SELECT * from v_faktur_produk_detail where tgl_dipesan between '".$this->input->post('dari')."' and '".$this->input->post('sampai')."'";
            break;
            
        }
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        return $data;
    }
    
    function print_transaksi_cash($d)
     {
        $par=explode("qie", $d);
        
        $no_pesanan=$par[1];
        $tgl_dipesan=$par[2];
    //    $nama_pengirim=$par[3];
     //   $hp_pengirim=$par[4];
        $nama_penerima=$par[3];
     //   $hp_penerima=$par[6];
        
        $alamat=$par[5];
      //  $nama_expedisi=$par[8];
        $petugas=$par[6];
        
        $provinsi=$par[7];
        $kabkota=$par[8];
        $kode_pos=$par[9];
        
        $text = "Software Developer Phone: 08987070737-Reza";
// "http://www.ababil-online.com";

        $this->cezpdf->Cezpdf('A5','landscape'); //landscape
        $this->cezpdf->ezSetMargins(10,10,10,10); //kiri, atas, kanan, bawah
        //$this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu.jpg',170,760,50,'left');
        $this->cezpdf->ezText($text,7,array('justification' => 'right'));
//         //Separator Space
//            $d_sparator_space1[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));

            $head_0[]=array('kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'',
                               'kol6'=>''//.date("d/m/Y")
                );

            $this->cezpdf->ezTable($head_0, '', '', array('width'=>650, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('justification'=>'right'))));
        
            $head_1[]=array(   'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'Nota Penjualan',
                               'kol4'=>'',
                               'kol5'=>'');
          
            $head_1[]=array(   'kol1'=>'TooBagus Group', //.$nama_pengirim,
                               'kol2'=>'',
                               'kol3'=>'No Pesanan: '.$no_pesanan,
                               'kol4'=>'',
                               'kol5'=>'Kepada Yth. '.$nama_penerima);
            
            $head_1[]=array(   'kol1'=>'Perumahan Manglayang Regency Blok C2 No. 51-52 Cileunyi Hp. 085224062821/082120043885',//.$hp_pengirim,
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'Alamat Penerima   : '.$alamat.", ".$kabkota."-".$provinsi." ".$kode_pos);
            
            $head_1[]=array(   'kol1'=>'',//.$nama_expedisi,
                               'kol2'=>'',
                               'kol3'=>'Tanggal Dipesan    : '.$tgl_dipesan,
                               'kol4'=>'',
                               'kol5'=>'');
            
                        
            $this->cezpdf->ezTable($head_1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>170,'justification'=>'left'),
                                                                                 'kol2'=>array('justification'=>'center'),
                                                                       'kol3'=>array('justification'=>'center'),
                                                                       'kol4'=>array('justification'=>'center'),
                                                                       'kol5'=>array('width'=>170,'justification'=>'left'))));
            
            $garis1[] 	= array('col_1' => str_repeat("==", 57));
            $col_garis1 = array('col_1' => '');
            $this->cezpdf->ezTable($garis1, $col_garis1, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));
            
        //Separator Space
//            $d_sparator_space5[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space5, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));
        // data table
                $qty_temp=0;
                $subtotal=0;
                $total=0;
            
                $so = $this->getGrid_detail_pesanan($no_pesanan);
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $subtotal = $item->qty * $item->harga_jual;
                        $total = $total + $subtotal;
                        
                        $db_data5[] = array('no' => $i.'.',
                                    'id_produk' => $item->id_buku,
                                    'nama_produk' => $item->judul_buku,
                                    'qty' => $item->qty,
                                  //  'satuan' => $item->satuan_qtt,
                                    'harga_jual' =>'Rp. '. number_format($item->harga_jual),
                                    'keterangan' =>'Rp. '. number_format($subtotal)
                                      );
                        $qty_temp = $qty_temp + $item->qty;
                        
                    }


                    $col_names5 = array(
                            'no' => 'No.',
                            'id_produk' => 'ID Produk',
                            'nama_produk' =>'Nama Produk' ,
                            'qty' =>'Qty',
                          //  'satuan' => 'Satuan',
                            'harga_jual' => 'Harga',
                            'keterangan' => 'Sub Total',                   
                            );

                 $this->cezpdf->ezTable($db_data5, $col_names5, '', array('width'=>600,
                            'fontSize' => 8,
                            'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                            'cols'=>array(
                                'no'=>array('width'=>25),

                                'id_produk'=>array('width'=>50),
                                'nama_produk'=>array('width'=>100,'justification'=>"left"),
                                'qty'=>array('width'=>40,'justification'=>"center"),
                            //    'satuan'=>array('width'=>50,'justification'=>"center"),
                                'harga_jual'=>array('width'=>80,'justification'=>"center"),
                                'keterangan'=>array('width'=>80,'justification'=>"center"),
                              
                                )
                            ));
            
                 
            $garis11[] 	= array('col_1' => str_repeat("__", 60));
            $col_garis11 = array('col_1' => '');
            $this->cezpdf->ezTable($garis11, $col_garis11, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

             $foot0[]=array(    'kol1'=>'Jumlah Produk: '.$qty_temp,
                               'kol2'=>'',
                               
                               'kol4'=>'Total   : Rp. '. number_format($total)
                               );
             $foot0[]=array(    'kol1'=>'',
                               'kol2'=>'',
                               
                               'kol4'=>''
                               );
             $foot0[]=array(    'kol1'=>'Barang yang sudah dibeli tidak dapat ditukar/dikembalikan!',
                               'kol2'=>'',
                               
                               'kol4'=>''
                               );
                         
            $this->cezpdf->ezTable($foot0, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>235,'justification'=>'left'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>160,'justification'=>'left'),
                                                                          )));
          
           $garis12[] 	= array('col_1' => str_repeat("==", 57));
           $col_garis12 = array('col_1' => '');
           $this->cezpdf->ezTable($garis12, $col_garis12, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

            $foot1[]=array(    'kol1'=>'Kasir',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'Tanda Terima'
                               );
             $foot1[]=array(    'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'
                                   
                                '
                               );
            
            
                        
            $this->cezpdf->ezTable($foot1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>135,'justification'=>'center'),
                                                                          )));
         
            
            
            $foot2[]=array(    'kol1'=>$petugas,
                               'kol2'=>'',
                               'kol3'=>'',
                            'kol4'=>'(.......................)'
                               );
            
                        
            $this->cezpdf->ezTable($foot2, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>135,'justification'=>'center'),
                                                                          )));
          
           
           
        $this->cezpdf->ezStream(array('Content-Disposition'=>'SuratJalan.pdf'));
     }
     
     
     function print_transaksi($d) //ini
     {
        $par=explode("facadfasdfasdfasdfghhjhjeytrgbsrtCsdjhUxlmlbajyubpaF435anhfgl", $d);
        
        $no_pesanan=$par[1];
        $tglorder=  explode('_',$par[2]);
        $tglorder2= $tglorder[2]."/".$tglorder[1]."/".$tglorder[0];
        
        $tglselesei=  explode('_',$par[3]);
        $tglselesei2= $tglselesei[2]."/".$tglselesei[1]."/".$tglselesei[0];
        
    //    $nama_pengirim=$par[3];
     //   $hp_pengirim=$par[4];
               
        $nama=$par[4];
      //  $nama_expedisi=$par[8];
        $no_handphone=$par[5];
        
        $USERNAME=$par[8];
        $diskon=$par[9];
        $printke='<b>'.$par[10].'</b>';
        
        $status_bayar=$par[11];
        if($status_bayar=="Kredit"){
            //$dp=$par[12];
           // $saldo_kredit=$par[13]; 
            $q = "SELECT * FROM tbl_pembayaran WHERE no_order = '".$no_pesanan."' order by no_bayar asc limit 1";
            
            $query  = $this->db->query($q);
              
                if ($query->num_rows() != 0)
                {
                    $row = $query->row();
                    $dp=$row->total_bayar;
                    $saldo_kredit=$row->saldo_kredit;
                }

           // $value["OtoNoApp"]=$row->OtoNoApp;
            
           
        }else{
            $dp=0;
            $saldo_kredit=0; 
        }
        
               
        
        // $text = "Software Developer Phone: 08987070737-Reza";// "http://www.ababil-online.com";

        $this->cezpdf->Cezpdf('A5','landscape'); //landscape
        $this->cezpdf->ezSetMargins(10,10,10,10); //kiri, atas, kanan, bawah
        //$this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu.jpg',170,760,50,'left');
        //$this->cezpdf->ezText($text,7,array('justification' => 'right'));
//         //Separator Space
//            $d_sparator_space1[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));

            $head_0[]=array('kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'',
                               'kol6'=>''//.date("d/m/Y")
                );

            $this->cezpdf->ezTable($head_0, '', '', array('width'=>650, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('justification'=>'right'))));
        
            $head_1[]=array(   'kol1'=>'BAITS EVOLUTION',
                               'kol2'=>'',
                               'kol3'=>'Nota Penjualan',
                               'kol4'=>'',
                               'kol5'=>'               Kepada Yth. '.$nama);
          
            $head_1[]=array(   'kol1'=>'Jl. Gegerkalong Hilir No.12', //.$nama_pengirim,
                               'kol2'=>'',
                               'kol3'=>'No Pesanan     : '.$no_pesanan,
                               'kol4'=>'',
                               'kol5'=>'               No Handphone: '.$no_handphone);
            
            $head_1[]=array(   'kol1'=>'Phone: (022)61545456/61545455',//.$hp_pengirim,
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'               Tgl Order         : '.$tglorder2);
            
            $head_1[]=array(   'kol1'=>'Website: www.baitsevolution.com',//.$nama_expedisi,
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'               Tgl Selesai      : '.$tglselesei2);
            
                        
            $this->cezpdf->ezTable($head_1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>170,'justification'=>'left'),
                                                                                 'kol2'=>array('justification'=>'center'),
                                                                       'kol3'=>array('justification'=>'center'),
                                                                       'kol4'=>array('justification'=>'center'),
                                                                       'kol5'=>array('width'=>170,'justification'=>'left'))));
            
            $garis1[] 	= array('col_1' => str_repeat("==", 57));
            $col_garis1 = array('col_1' => '');
            $this->cezpdf->ezTable($garis1, $col_garis1, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));
            
        //Separator Space
//            $d_sparator_space5[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space5, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));
        // data table
                $qty_temp=0;
                $subtotal=0;
                $total=0;
            
                $so = $this->getGrid_detail_pesanan($no_pesanan);
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $subtotal = $item->qty*$item->harga_pertgl;
                        $total = $total + $subtotal;
                        
                        $db_data5[] = array('no' => $i.'.',
                                    'id_produk' => $item->id_produk,
                                    'nama_produk' => $item->nama_produk,
                                    'qty' => $item->qty,
                                    'satuan' => $item->satuan,
                                    'harga_jual' =>'Rp. '. number_format($item->harga_pertgl),
                                    'keterangan' =>'Rp. '. number_format($item->qty*$item->harga_pertgl)
                                      );
                        $qty_temp = $qty_temp + $item->qty;
                        
                    }


                    $col_names5 = array(
                            'no' => 'No.',
                            'id_produk' => 'ID Produk',
                            'nama_produk' =>'Nama produk' ,
                            'qty' =>'Qty',
                            'satuan' => 'Satuan',
                            'harga_jual' => 'Harga',
                            'keterangan' => 'Sub Total',                   
                            );

                 $this->cezpdf->ezTable($db_data5, $col_names5, '', array('width'=>600,
                            'fontSize' => 8,
                            'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                            'cols'=>array(
                                'no'=>array('width'=>25),

                                'id_produk'=>array('width'=>50),
                                'nama_produk'=>array('width'=>200,'justification'=>"left"),
                                'qty'=>array('width'=>40,'justification'=>"center"),
                                'satuan'=>array('width'=>50,'justification'=>"center"),
                                'harga_jual'=>array('width'=>80,'justification'=>"center"),
                                'keterangan'=>array('width'=>80,'justification'=>"center"),
                              
                                )
                            ));
            
                 
            $garis11[] 	= array('col_1' => str_repeat("__", 60));
            $col_garis11 = array('col_1' => '');
            $this->cezpdf->ezTable($garis11, $col_garis11, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

             $foot0[]=array(   'kol1'=>'Diskon     : Rp. '.number_format($diskon),
                               'kol2'=>'SubTotal   : Rp. '.number_format($total),
                               'kol4'=>'Grand Total: Rp. '.number_format($total-$diskon)
                               );
             
             $foot0[]=array(   'kol1'=>'',
                               'kol2'=>'',
                               
                               'kol4'=>''
                               );
             $foot0[]=array(   'kol1'=>'Status Bayar: '.$status_bayar.', Dp : Rp. '.number_format($dp),
                               'kol2'=>'Saldo Kredit: Rp. '.number_format($saldo_kredit),
                               'kol4'=>'                                        Ket: '. $printke
                               );
             
                         
            $this->cezpdf->ezTable($foot0, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>235,'justification'=>'left'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>160,'justification'=>'left'),
                                                                          )));
//            $foot11[]=array(    'kol1'=>'Catatan:
//          1. Pengambilan Laundry harus dengan nota bernomor urut.
//          2. Kami tidak bertanggung jawab terhadap luntur, susut, sobek/rusak, yang terjadi setelah proses laundry 
//             jika tidak ada pemberitahuan sebelumnya.
//          3. Kami tidak bertanggung jawab atas kehilangan kancing dan barang - barang yang tertinggal didalam saku.
//          4. Klaim dapat dilakukan paling lambat 1x24 Jam dari waktu pengembalian dan harus disertai nota bernomor
//             urut dan bukti.
//          5. Ganti rugi kehilangan/kerusakan 10x total berat barang yang hilang/rusak atau maks. Rp. 50.000, barang
//             yang sudah diganti jadi milik kami.
//          6. Ekspress 6 jam min 4Kg /konsumen, tarif 2x harga normal.
//          7. Laundry yang tidak diambil dalam jangka waktu 1 bulan bukan merupakan tanggung jawab kami.
//          8. Setiap konsumen dianggap memahami & menyetujui syarat dan ketentuan diatas.',
//                               'kol2'=>'',
//                               
//                               'kol4'=>''
//                               );
//          $this->cezpdf->ezTable($foot11, '', '', array('width'=>550, 'fontSize' => 4, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
//                                                                   'cols'=>array('kol1'=>array('width'=>235,'justification'=>'left'),
//                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
//                                                                       'kol4'=>array('width'=>160,'justification'=>'left'),
//                                                                          )));
//          
           $garis12[] 	= array('col_1' => str_repeat("==", 57));
           $col_garis12 = array('col_1' => '');
           $this->cezpdf->ezTable($garis12, $col_garis12, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

            $foot1[]=array(    'kol1'=>'Kasir',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'Tanda Terima'
                               );
             $foot1[]=array(    'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'
                                   
                                '
                               );
            
            
                        
            $this->cezpdf->ezTable($foot1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>135,'justification'=>'center'),
                                                                          )));
         
            
            
            $foot2[]=array(    'kol1'=>'('.$USERNAME.')',
                               'kol2'=>'',
                               'kol3'=>'',
                            'kol4'=>'('.$nama.')'
                               );
            
                        
            $this->cezpdf->ezTable($foot2, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>135,'justification'=>'center'),
                                                                          )));
          
           
           
        $this->cezpdf->ezStream(array('Content-Disposition'=>$no_pesanan.'.pdf'));
     }
     
       function print_sjalan($d)
     {
        $par=explode("qie", $d);
        
        $no_pesanan=$par[1];
        $tgl_dipesan=$par[2];
        $nama_pengirim=$par[3];
        $hp_pengirim=$par[4];
        $nama_penerima=$par[5];
        $hp_penerima=$par[6];
        
        $alamat=$par[7];
        $nama_expedisi=$par[8];
        $petugas=$par[9];
        
        $provinsi=$par[10];
        $kabkota=$par[11];
        $kode_pos=$par[12];
        
        $text = "Software Developer Phone: 08987070737-Reza";// "http://www.ababil-online.com";

        $this->cezpdf->Cezpdf('A5','landscape'); //landscape
        $this->cezpdf->ezSetMargins(10,10,10,10); //kiri, atas, kanan, bawah
        //$this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu.jpg',170,760,50,'left');
        $this->cezpdf->ezText($text,7,array('justification' => 'right'));
//         //Separator Space
//            $d_sparator_space1[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));

            $head_0[]=array('kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'',
                               'kol6'=>''//.date("d/m/Y")
                );

            $this->cezpdf->ezTable($head_0, '', '', array('width'=>650, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('justification'=>'right'))));
        
            $head_1[]=array(   'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'SURAT JALAN',
                               'kol4'=>'',
                               'kol5'=>'');
          
            $head_1[]=array(   'kol1'=>'TooBagus Group',
                               'kol2'=>'',
                               'kol3'=>'Nama Penerima     : '.$nama_penerima,//'No Pesanan: '.$no_pesanan,
                               'kol4'=>'',
                               'kol5'=>'No Pesanan        : '.$no_pesanan
                            );
            
            $head_1[]=array(   'kol1'=>'Perumahan Manglayang Regency Blok C2 No. 51-52 Cileunyi',
                               'kol2'=>'',
                               'kol3'=>'Hp Penerima          : '.$hp_penerima,
                               'kol4'=>'',
                               'kol5'=>'Tanggal Dipesan : '.$tgl_dipesan);
            
            $head_1[]=array(   'kol1'=>'Nama Expedisi    : '.$nama_expedisi,
                               'kol2'=>'',
                               'kol3'=>'Alamat Penerima   : '.$alamat.", ".$kabkota."-".$provinsi." ".$kode_pos,
                               'kol4'=>'',
                               'kol5'=>'');
            
                     //'Alamat Penerima   : '.$alamat.", ".$kabkota."-".$provinsi." ".$kode_pos   
            $this->cezpdf->ezTable($head_1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('justification'=>'left'),
                                                                                 'kol2'=>array('justification'=>'center'),
                                                                       'kol3'=>array('justification'=>'center'),
                                                                       'kol4'=>array('justification'=>'center'),
                                                                       'kol5'=>array('width'=>170,'justification'=>'left'))));
            
            $garis1[] 	= array('col_1' => str_repeat("==", 57));
            $col_garis1 = array('col_1' => '');
            $this->cezpdf->ezTable($garis1, $col_garis1, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));
            
        //Separator Space
//            $d_sparator_space5[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space5, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));
        // data table
                $qty_temp=0;
            
                $so = $this->getGrid_detail_pesanan($no_pesanan);
                    $i = 0;
                    foreach($so as $item)
                    {
                        $i = ($i+1);
                        $db_data5[] = array('no' => $i.'.',
                                    'id_produk' => $item->id_buku,
                                    'nama_produk' => $item->judul_buku,
                                    'qty' => $item->qty,
                                    'satuan' => $item->satuan_qtt,
                                    'keterangan' => ''
                                      );
                        $qty_temp = $qty_temp + $item->qty;
                    }


                    $col_names5 = array(
                            'no' => 'No.',
                            'id_produk' => 'ID Produk',
                            'nama_produk' =>'Nama Produk' ,
                            'qty' =>'Qty',
                          //  'satuan' => 'Satuan',
                            'keterangan' => 'Keterangan',                   
                            );


                 $this->cezpdf->ezTable($db_data5, $col_names5, '', array('width'=>600,
                            'fontSize' => 8,
                            'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                            'cols'=>array(
                                'no'=>array('width'=>25),

                                'id_produk'=>array('width'=>50),
                                'nama_produk'=>array('width'=>100,'justification'=>"left"),
                                'qty'=>array('width'=>40,'justification'=>"center"),
                           //     'satuan'=>array('width'=>80,'justification'=>"center"),
                                'keterangan'=>array('width'=>80,'justification'=>"center"),
                              
                                )
                            ));
            
                 
            $garis11[] 	= array('col_1' => str_repeat("__", 60));
            $col_garis11 = array('col_1' => '');
            $this->cezpdf->ezTable($garis11, $col_garis11, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

           // data footer
          //  $this->cezpdf->ezText('',10,array('justification' => 'left'));
           $this->cezpdf->ezText('         Jumlah Produk: '.$qty_temp ,8,array('width'=>300,'justification' => 'left'));
           
           $garis12[] 	= array('col_1' => str_repeat("==", 57));
           $col_garis12 = array('col_1' => '');
           $this->cezpdf->ezTable($garis12, $col_garis12, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

            $foot1[]=array(    'kol1'=>'Kasir',
                               'kol2'=>'Gudang',
                               'kol3'=>'Supir',
                               'kol4'=>'Tanda Terima'
                               );
             $foot1[]=array(    'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'
                                   
                                '
                               );
            
            
                        
            $this->cezpdf->ezTable($foot1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>135,'justification'=>'center'),
                                                                          )));
         
            
            
            $foot2[]=array(    'kol1'=>'('.$petugas.')',
                               'kol2'=>'(.......................)',
                               'kol3'=>'(.......................)',
                            'kol4'=>'(.......................)'
                               );
            
                        
            $this->cezpdf->ezTable($foot2, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol2'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>135,'justification'=>'center'),
                                                                       'kol4'=>array('width'=>135,'justification'=>'center'),
                                                                          )));
          
           
           
        $this->cezpdf->ezStream(array('Content-Disposition'=>'SuratJalan.pdf'));
     }

     function print_transaksi_penjualan($kit,$param1=null,$param2=null,$param3=null)
     {
         
//                $so_member = $this->getGrid_member($param3);
//                    $v = 0;
//                    foreach($so_member as $item)
//                    {
//                        $v = ($v+1);
//                        $nama_lengkap = $item->nama_lengkap;
//                        $alamat = $item->alamat_member;
//                    }
                    
        
        switch($kit){
            case 'harian':
                $judul='REKAP TRANSAKSI PENJUALAN HARIAN TANGGAL '.date('d/m/Y',strtotime(str_replace('_','/',$param1))); 
                $per = 'PERKONSUMEN';
                $so = $this->get_transaksi_penjualan('harian',$param1,0,$param3);
            //    $so2 = $this->get_transaksi_pembayaran('harian',$param1,0,$param3);
                
            break;
            case 'bulanan':
                $judul='REKAP TRANSAKSI PENJUALAN BULAN '.$param1.' TAHUN '.$param2;
                $per = 'PERKONSUMEN';
                $so = $this->get_transaksi_penjualan('bulanan',$param1,$param2,$param3);
             //   $so2 = $this->get_transaksi_pembayaran('bulanan',$param1,$param2,$param3);
            break;
            case 'tahunan':
                $judul='REKAP TRANSAKSI PENJUALAN TAHUN '.$param1;
                $per = 'PERKONSUMEN';
                $so = $this->get_transaksi_penjualan('tahunan',$param1,0,$param3);
             //   $so2 = $this->get_transaksi_pembayaran('tahunan',$param1,0,$param3);
            break;
            case 'periode':
                $judul='REKAP TRANSAKSI PENJUALAN PERIODE '.date('d/m/Y',strtotime(str_replace('_','/',$param1))).' s/d '.date('d/m/Y',strtotime(str_replace('_','/',$param2)));
                $per = 'PERKONSUMEN';
                $so = $this->get_transaksi_penjualan('periode',$param1,$param2,$param3);
            //    $so2 = $this->get_transaksi_pembayaran('periode',$param1,$param2,$param3);
            break;
        }
//        $so2=$this->get_transaksi_pembayaran('member',null,null,$param3);
      
        $text = "Software Developer Phone: 08987070737-Reza";


        $this->cezpdf->Cezpdf('A5','landscape'); //landscape
        $this->cezpdf->ezSetMargins(10,5,10,10); //atas, kanan, kiri, bawah
        //$this->cezpdf->addJpegFromFile(APPPATH.'logo-ksu.jpg',170,760,50,'left');
        $this->cezpdf->ezText($text,5,array('justification' => 'right'));
//         //Separator Space
//            $d_sparator_space1[]=array('separator_space'=>'');
//            $this->cezpdf->ezTable($d_sparator_space1, '', '', array('width'=>550,'showLines'=> 0,'showHeadings'=>0));

            $head_1[]=array(   'kol1'=>'',//.$hp_pengirim,
                               'kol2'=>'',
                               'kol3'=>$judul,
                               'kol4'=>'',
                               'kol5'=>'');

            $head_1[]=array(   'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>$per,
                               'kol4'=>'',
                               'kol5'=>'Tanggal Cetak: '.date("d/m/Y"));

            $head_1[]=array(   'kol1'=>'',
                               'kol2'=>'',
                               'kol3'=>'',
                               'kol4'=>'',
                               'kol5'=>'Pembayaran   : '.$param3);


            $this->cezpdf->ezTable($head_1, '', '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0,
                                                                   'cols'=>array('kol1'=>array('width'=>110,'justification'=>'left'),
                                                                                 'kol2'=>array('width'=>60,'justification'=>'center'),
                                                                       'kol3'=>array('width'=>200,'justification'=>'center'),
                                                                       'kol4'=>array('justification'=>'center'),
                                                                       'kol5'=>array('width'=>120,'justification'=>'left'))));

            $garis1[] 	= array('col_1' => str_repeat("==", 57));
            $col_garis1 = array('col_1' => '');
            $this->cezpdf->ezTable($garis1, $col_garis1, '', array('width'=>550, 'fontSize' => 8, 'showLines'=> 0,'showHeadings'=>0,'shaded'=>0 ));

            $setelah_diskon=0;
            $diskon=0;
            $pend_bersih=0;
           // $tot_incomeQty=0;
           
            // data table
//    $tot_balance1=0;                     
//    $tot_bayar2=0;//$tot_balance2=0;
//    $tot_balance3=0;              
                    $i = 0;
                    foreach($so as $item)
                    {   $i = ($i+1);

                          $sub_check =substr($item->no_order, 0, 2);    
                          echo $sub_check;
                        if($item->diskon==""){
                            $ubahdiskon=0;
                        }else{
                            $ubahdiskon=$item->diskon;
                        }
        
                          if($sub_check != "BE"){ //NB
                                    
                              }else{
                                   $db_data[] = array(
                                          'no' => $i.'.',
                                          'no_pesanan' => $item->no_order,
                                          'tgl_dipesan' => $item->tglorder,
                                          'subtotal' => 'Rp. '. number_format($item->total_beli + $ubahdiskon),
                                          //'nama_expedisi' => $item->status_lunas,
                                          'diskon' => 'Rp. '. number_format($ubahdiskon),

                                          'petugas' => $item->petugas,
                                          'saldo' => 'Rp. '. number_format($item->untung),
                                          );
                                   $pend_bersih = $pend_bersih + ($item->untung );
                                   $diskon = $diskon + $ubahdiskon;
                                   
                                   $setelah_diskon=($setelah_diskon + $item->total_beli);
                               }
    
                               }
                                         
                    $col_names3 = array(
                            'no' => 'No.',
                            'tgl_dipesan' =>'Tgl Dipesan' ,
                            'no_pesanan' => 'No. Nota',
                            'subtotal' =>'Total Penjualan',
                           // 'nama_expedisi' =>  'Nama Expedisi',
                            'diskon' => 'Diskon',
                            'saldo' => 'Keuntungan',
                            'petugas' => 'Status'
                            );


                 $this->cezpdf->ezTable($db_data, $col_names3, '', array('width'=>600,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>1,'shaded'=>1,'justification'=>"right",
                                                              'cols'=>array(
                                                                  'no'=>array('width'=>23),
                                                                  'tgl_dipesan'=>array('width'=>65,'justification'=>"left"),
                                                                  'no_pesanan'=>array('width'=>90,'justification'=>"left"),
                                                                  'subtotal'=>array('width'=>95,'justification'=>"left"),
                                                                  'diskon'=>array('width'=>95,'justification'=>"left"),
                                                                  'petugas'=>array('width'=>65,'justification'=>"left"),
                                                                  'saldo'=>array('width'=>125,'justification'=>"left"),
                                                                 
                                                                  )
                                                                ));

           // data footer
                 
                 $db_data33[] = array(
                                        'no' => '',
                                        'tgl_dipesan' => '   ',
                                        'no_pesanan' => 'Total',
                                        'subtotal' => 'Rp. '.number_format($setelah_diskon),
                                        'ongkir' => 'Rp. '.number_format($diskon),
                                        'tot_kredit' => 'Rp. '.number_format($pend_bersih),
                                        'saldo' => '',
                                        );
                 
                

                 $this->cezpdf->ezTable($db_data33, '', '', array('width'=>600,
                                                              'fontSize' => 8,
                                                              'showLines'=> 1,'showHeadings'=>0,'shaded'=>1,'justification'=>"right",
                                                              'cols'=>array(
                                                                  'no'=>array('width'=>23,'showLines'=> 0,'shaded'=>0),
                                                                  'tgl_dipesan'=>array('width'=>65,'justification'=>"right"),
                                                                  'no_pesanan'=>array('width'=>90,'justification'=>"right"),
                                                                  'subtotal'=>array('width'=>95,'justification'=>"right"),
                                                                  'ongkir'=>array('width'=>95,'justification'=>"right"),
                                                                  'tot_kredit'=>array('width'=>125,'justification'=>"right"),
                                                                  'saldo'=>array('width'=>65,'justification'=>"right"),
                                                                 
                                                                  )
                                                                ));

                 
            $this->cezpdf->ezText('',10,array('justification' => 'left'));
//            $this->cezpdf->ezText('Total'.$tot_qty.$sub_check ,8,array('justification' => 'left'));
//            $this->cezpdf->ezText('Jumlah Income: '.'Rp. '. number_format($tot_income) ,8,array('justification' => 'left'));
//          //  $this->cezpdf->ezText('Jumlah Income x Quantity: '.'Rp. '. number_format($tot_incomeQty) ,8,array('justification' => 'left'));
          

        $this->cezpdf->ezStream(array('Content-Disposition'=>'Report-Jual-'.$kit.'-'.date('d-m-Y').'.pdf'));

     }
     
     function get_transaksi_penjualan($periode,$param1=null,$param2=null,$param3=null){
         $par=explode("_", $param1);
         $tanggal = $par[0]."-".$par[1]."-".$par[2];
                 
         if($param3 == 'All'){
             $ganti = '';
         }else{
             $ganti = $param3;
         }
         
        $data='';
        switch($periode){
            case 'harian':
                //$q="SELECT * from v_faktur_produk_detail where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d')=STR_TO_DATE('".$this->input->post('tanggal')."','%Y-%m-%d');";
                $q="SELECT no_order
     , tglorder
     , nama
     , no_handphone
     , alamat
     , total_beli
     , diskon
     , sum(qty)
     , sum(harga) AS harga
     , sum(modal_pertgl) AS harga_modal
     , sum(hargax_modal) AS hargax_modal
     , sum(untung) AS untung
     , petugas
                FROM
                  v_faktur_produk_detail
                  where status_bayar like '%".$ganti."%' and STR_TO_DATE(concat(left(tglorder, 4),'-',substring(tglorder,6,2),'-',substring(tglorder,9,2)),'%Y-%m-%d')=STR_TO_DATE('".str_replace('_','-',$param1)."','%Y-%m-%d')
                  group by no_order order by tglorder ASC";// and username='".$param3."'";
            break;
            case 'bulanan':
                $q="SELECT no_order
     , tglorder
     , nama
     , no_handphone
     , alamat
     , total_beli
     , diskon
     , sum(qty)
     , sum(harga) AS harga
     , sum(modal_pertgl) AS harga_modal
     , sum(hargax_modal) AS hargax_modal
     , sum(untung) AS untung
     , petugas
                FROM
                  v_faktur_produk_detail  vf where status_bayar like '%".$ganti."%' and substring(tglorder,6,2)='".$param1."' and left(tglorder, 4) ='".$param2."' 
                      group by no_order order by tglorder ASC";// and username='".$param3."'";
            break;
            case 'tahunan':
                $q="SELECT no_order
     , tglorder
     , nama
     , no_handphone
     , alamat
     , total_beli
     , diskon
     , sum(qty)
     , sum(harga) AS harga
     , sum(modal_pertgl) AS harga_modal
     , sum(hargax_modal) AS hargax_modal
     , sum(untung) AS untung
     , petugas
                FROM
                  v_faktur_produk_detail vf where status_bayar like '%".$ganti."%' and left(tglorder, 4) ='".$par[0]."' group by 
                      no_order order by tglorder ASC";// and username='".$param3."'";
            break;
            case 'periode':
                $q="SELECT no_order
     , tglorder
     , nama
     , no_handphone
     , alamat
     , total_beli
     , diskon
     , sum(qty)
     , sum(harga) AS harga
     , sum(modal_pertgl) AS harga_modal
     , sum(hargax_modal) AS hargax_modal
     , sum(untung) AS untung
     , petugas
                FROM
                  v_faktur_produk_detail vf where status_bayar like '%".$ganti."%' and STR_TO_DATE(concat(left(tglorder, 4),'-',substring(tglorder,6,2),'-',substring(tglorder,9,2)),'%Y-%m-%d') >= STR_TO_DATE('".$tanggal."','%Y-%m-%d') and STR_TO_DATE(concat(left(tglorder,4),'-',substring(tglorder,6,2),'-',substring(tglorder,9,2)),'%Y-%m-%d') <= STR_TO_DATE('".str_replace('_','-',$param2)."','%Y-%m-%d') 
                      group by no_order order by tglorder ASC";// and username='".$param3."'";
                //$q="SELECT * from v_faktur_produk_detail where tglorder between '".$this->input->post('dari')."' and '".$this->input->post('sampai')."'";
            break;
            
        }
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        return $data;
    }
    
    function get_transaksi_pembayaran($periode,$param1=null,$param2=null,$param3=null){
        $data='';
        switch($periode){
            case 'harian':
                //$q="SELECT * from v_faktur_produk_detail where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d')=STR_TO_DATE('".$this->input->post('tanggal')."','%Y-%m-%d');";
                $q="select * from v_c_bayar where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d')=STR_TO_DATE('".str_replace('_','-',$param1)."','%Y-%m-%d') and username='".$param3."'";
            break;
            case 'bulanan':
                $q="SELECT * from v_c_bayar where substring(tgl_dipesan,1,2)='".$param1."' and substring(tgl_dipesan,7,4)='".$param2."' and username='".$param3."'";
            break;
            case 'tahunan':
                $q="SELECT * from v_c_bayar where substring(tgl_dipesan,7,4)='".$param1."' and username='".$param3."'";
            break;
            case 'periode':
                $q="select * from v_c_bayar where STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d') >= STR_TO_DATE('".str_replace('_','-',$param1)."','%Y-%m-%d') and STR_TO_DATE(concat(substring(tgl_dipesan,7,4),'-',substring(tgl_dipesan,1,2),'-',substring(tgl_dipesan,4,2)),'%Y-%m-%d') <= STR_TO_DATE('".str_replace('_','-',$param2)."','%Y-%m-%d') and username='".$param3."'";
                //$q="SELECT * from v_faktur_produk_detail where tgl_dipesan between '".$this->input->post('dari')."' and '".$this->input->post('sampai')."'";
            break;
            case 'member':
                $q="select * from v_c_bayar ";//where username='".$param3."'";
            break;
            
        }
        
        $query  = $this->db->query($q);
        $data = array();
        if ($query->num_rows() > 0) {
            $data = $query->result();
        }
        
        return $data;
    }

}
