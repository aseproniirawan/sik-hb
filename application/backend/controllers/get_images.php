<?php

class Get_images extends Controller {
var $stat;

    public function __construct()
    {
        parent::Controller();
        
    }
    
    function getData(){
        $dir =  "img/ori/";
        $dir_thumbs = "img/thumbs/";
        $start = isset($_REQUEST['start']) ? $_REQUEST['start'] : 0;
        $limit = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : 12;
        
        $dta="";
                $this->db->select("nama_produk");
                $this->db->from("tbl_produk");
               // $this->db->where('stok !=',0);
                
        
                $q=$this->db->get();
                $d=$q->result();
                $c=count($d);           
                if($c>0){
//                    $this->db->select("file_gambar,id_produk,nama_produk,qty,satuan,harga,keterangan");
//                    $this->db->from("tbl_produk");
//                    $this->db->order_by('id_produk');                  
//                    
//                   
                    $q="SELECT * from tbl_produk order by nama_produk asc";
                    $query  = $this->db->query($q);
        
                   // $this->db->limit($limit,$start);
                    $dt=$query;//$this->db->get();
                    $dta=$dt->result();
                }
            //}
        
        $data=array('result' => $c, 'images' => array());
        foreach($dta as $row){
            $di=dir($dir);          
            while($name = $di->read()){
                if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
                $size = "unknown";
                $lastmod = "mod unknown";
                $thumb = "Nothing Found";
                $nama="Images Not Found";
                if($name==$row->file_gambar){
                    $size = filesize($dir.$name);
                    $lastmod = filemtime($dir.$name)*1000;
                    $thumb = "thumb_".$name;
                    $nama=$name;
                    break;
                }
                
           }
           $di->close();
            array_push($data["images"], array(
                'nama_produk'=>$row->nama_produk,
                "name"=>$nama,
                "url"=> $dir.'/'.$nama,//$dir_thumbs,
                "lastmod"=>$lastmod,
                'thumb_url'=>$dir_thumbs.$thumb,
                'id_produk'=>$row->id_produk,
                'minimum'=>$row->minimum,
                'harga'=>  number_format($row->harga),
                'qty'=>$row->stok,
                'satuan'=>$row->satuan,
                'keterangan'=>$row->keterangan
            ));
            
        }
        echo json_encode($data);
        
            
    }
    
    function getRowById(){
        $data="";
        $this->db->select("id_buku, judul_buku,name, no_aplikasi, tgl_aplikasi, id_cabang,
         nama_lengkap, alamat_rumah, no_telepon, no_handphone,
         jns_id, no_identitas, agama, tmpt_lahir, tgl_lahir, jk, status_nikah, st_funding,
         nama_pekerjaan, jabatan, perusahaan, alamat, telepon, nama_ahli_waris, jenis_id, noid_waris,
         alama_waris, kota_waris, provinsi_waris, kodepos_waris, notelp_waris, nohp_waris,
         kuasa_ke, cara_bayar, periode_simpanan, jumlah_simpanan, periode_cicilan,
         jumlah_cicilan, masa_simpanan, jenis_bagi_hasil, no_rekening, nama_bank, atas_nama,
         jumlah_bagi_hasil, bp_id, komisi_rp,tgl_jatuhTempo,cara_bayar_bh,email_usaha,email,
         bukti_setor,fotocopy_ktp,formulir_aplikasi,biaya_administrasi,minimal_simpanan");


        $this->db->from($this->_view);
       

        $Q = $this-> db-> get();
        $data = $Q->row();
    }
    //START GRID MASTER
    function get_photo(){
       
        $dir =  "img/ori/";
        $dir_thumbs = "img/thumbs/";

        $start = isset($_REQUEST['start']) ? $_REQUEST['start'] : 0;
        $limit = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : 12;

        $images = array();
        $d = dir($dir);
        while($name = $d->read()){
            if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
            $size = filesize($dir.$name);
            $lastmod = filemtime($dir.$name)*1000;
            $thumb = "thumb_".$name;
           
           // $q="SELECT nama_produk, harga, deskripsi, id_kategori from tbl_produk where file_gambar='".$name."'";
            if($this->input->post('kit')){
                $q="SELECT id_buku, terjual, stok, judul_buku, harga_juali, pengarang, id_kategori from tbl_produk where file_gambar='".$name."' and id_kategori='".$this->input->post('kit')."'";
            }else{
                $q="SELECT id_buku, terjual, stok, judul_buku, harga_juali, pengarang, id_kategori from tbl_produk where file_gambar='".$name."'";
            }
            
            
            $query  = $this->db->query($q);
           
         //   $data = $query->result();
          $h = ''; 
          $np = '';
          $ds = '';
          $id_p = '';
          $stk = '';
          $ktg='';
          
            if ($query->num_rows() != 0)
            {
                $row = $query->row();
                $h=number_format($row->harga_juali);
                $np=$row->judul_buku;
                $ds=$row->pengarang;
                $id_p=$row->id_buku;
                $stk=$row->stok;
            }
            
            
            $images[] = array('rincian' => "<br><b>Nama Buku: $np</b><br>Stok: $stk<br>Harga : $h<br>",
                                'thumb_url' => $dir_thumbs.$thumb,
                                'id_buku'=> $id_p
                                );
            
        }
        
        /*
         $d->close();
        $o = array('images'=>$images);
        
        
        echo json_encode($o);
         */
         $result = count($images);

                if ($start == 0) {
                    $finish = $limit;
                    
                } else {
                    $finish = $start + $limit;
                    
                } 

                $fetch_images = array();
                for ($i = $start; $i < $finish; $i++) {
                    $fetch_images[] = $images[$i];
                }

                $d->close();
                $o = array('result' => $result, 'images' => $fetch_images);
                echo json_encode($o);


    }
   //END GRID MASTER
      
    function get_price($p){
        $tempx=explode("re", $p);
        $where = $tempx[0];
        
      // $where['file_gambar']=$p;
       // $where='P01.jpg';     
        $q="SELECT harga, file_gambar from tbl_produk where file_gambar like '".$where."%'";
        
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

        echo '{success: true}';
            }
            
    function get_photox(){
       
        $dir =  "resources/img/ori/";
        $dir_thumbs = "resources/img/thumbs/";


        $images = array();
        $d = dir($dir);
        while($name = $d->read()){
            if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
            $size = filesize($dir.$name);
            $lastmod = filemtime($dir.$name)*1000;
            $thumb = "thumb_".$name;
            $images[] = array('name' => $name, 'size' => $size,
                                'lastmod' => $lastmod, 'url' => $dir.$name,
                    'thumb_url' => $dir_thumbs.$thumb);
        }
        $d->close();
        $o = array('images'=>$images);
        echo json_encode($o);


    }
    
   function cari_dataKriteria()
    {
        $query="SELECT COLUMN_NAME as kolom from information_schema.`COLUMNS` where TABLE_NAME='tbl_produk' and TABLE_SCHEMA='buku'";
        $exec=$this->db->query($query);
        
        $data['data']=$exec->result();
        echo json_encode($data);
    }
}


