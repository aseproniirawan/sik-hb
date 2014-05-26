<?php
class Print_reservasiRJ extends Controller {
    function __construct(){
        parent::__construct();
        $this->load->library('pdf');
        
    }
    
    function reservasi_pdf($tgl) {
        
         $this->db->select("*, reservasi.norm as rnorm");
        $this->db->from("reservasi");
        $this->db->join("dokter", 
                    "dokter.iddokter = reservasi.iddokter", "left"
        );
        $this->db->join("pasien", 
                    "pasien.norm = reservasi.norm", "left"
        );
        $this->db->join("jkelamin", 
                    "jkelamin.idjnskelamin = pasien.idjnskelamin", "left"
        );
        $this->db->join("registrasidet", 
                    "registrasidet.idregdet = reservasi.idregdet", "left"
        );
        $this->db->join("stregistrasi", 
                    "stregistrasi.idstregistrasi = registrasidet.idstregistrasi", "left"
        );
        $this->db->join("registrasi", 
                    "registrasi.noreg = registrasidet.noreg", "left"
        );
        $this->db->join("stpasien", 
                    "stpasien.idstpasien = registrasi.idstpasien", "left"
        );
        $this->db->join("stposisipasien", 
                    "stposisipasien.idstposisipasien = reservasi.idstposisipasien", "left"
        );
        $this->db->join("bagian", 
                    "bagian.idbagian = reservasi.idbagian", "left"
        );
        $this->db->where("tglreservasi",$tgl);        
        $query = $this->db->get();
        $nota = $query->row_array();
        
        // add a page
        $this->pdf->AddPage();
        $this->pdf->SetFont('helvetica', '', 10);
        
        $x=40;$y=10;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, 'Reservasi Rawat Jalan', '', 1, 0, true, 'C', true);
        
        $x+=5;$y=10;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, 'Tgl. / Jam / Shift');
        $x+=0;$y+=35;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
        $x+=0;$y+=5;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, date_format(date_create($nota['tglreservasi']), 'd-m-Y').' / '.$nota['jamreservasi'].' / '.$nota['idshift']);
        
        $x+=5;$y=10;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, 'Unit Pelayanan');
        $x+=0;$y+=35;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
        $x+=0;$y+=5;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, $nota['nmbagian']);
        
        $x+=5;$y=10;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, 'Dokter');
        $x+=0;$y+=35;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
        $x+=0;$y+=5;
        $this->pdf->writeHTMLCell(0, 10, $y, $x, $nota['nmdoktergelar']);

        $isi = '';
     //   foreach($nota as $i=> $val){
            $a = $this->db->query("select * from v_reservasi where date(tglreservasi)  = '".$tgl."'");
            $test = $a->row_array();
        
            $isi .= "<tr>
                <td width=\"15%\" align=\"center\"><font size=\"10\" face=\"Helvetica\">". $test['norm'] ."</font></td>
                <td width=\"20%\"><font size=\"10\" face=\"Helvetica\">". $test['nmpasien'] ."</font></td>
                <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">". $test['nohp'] ."</font></td>
                <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">". $test['notelp'] ."</font></td>
                <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">". $test['email'] ."</font></td>
                <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">". $test['tglinput'] ."</font></td>
                <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">". $test['nmstreservasi'] ."</font></td>
            </tr>";
       // }
        
        $x+=18;
        $html = "<br/><br/><br/><br/>
            <table border=\"1px\" cellpadding=\"2\">
              <tbody>
                <tr align=\"center\">
                    <td width=\"15%\"><font size=\"10\" face=\"Helvetica\">No. RM</font></td>
                    <td width=\"20%\"><font size=\"10\" face=\"Helvetica\">Nama Pasien</font></td>
                    <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">No HP</font></td>
                    <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">No Telp</font></td>
                    <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">Email</font></td>
                    <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">Tanggal Input</font></td>
                    <td width=\"12%\"><font size=\"10\" face=\"Helvetica\">Status</font></td>
                </tr>". $isi
              ."</tbody>
                
            </table>
        ";
        $this->pdf->writeHTML($html,true,false,false,false);
        $this->pdf->Output('nota.pdf', 'I');
            }
}


    
