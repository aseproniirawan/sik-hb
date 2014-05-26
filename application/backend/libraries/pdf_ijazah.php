<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once APPPATH.'third_party/tcpdf/tcpdf'.EXT;

class Pdf_ijazah extends TCPDF{
    public function __construct($orientation = 'L', $unit = 'mm', $format = 'A4', $unicode = TRUE, $encoding = 'UTF-8', $diskcache = FALSE, $pdfa = FALSE) {
        parent::__construct($orientation, $unit, $format, $unicode, $encoding, $diskcache, $pdfa);
    }
    
    
     public function Header() {
        // Logo
        $image_file = base_url().'resources/img/backlogoijazah.png';
        $this->Image($image_file, 95, 45, 100, '', 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);
       /* 
        $this->SetFont('helvetica', '', 16); 
        $this->Cell(0,13,'YAYASAN PENDIDIKAN TRI BHAKTI LANGLANGBUANA',0,1,'L');
        $this->Write(0, 'YAYASAN PENDIDIKAN TRI BHAKTI LANGLANGBUANA', '', 0, 'L', true, 0, false, false, 0);
        $this->SetFont('helvetica', 'B', 25); 
        $this->Cell(0,13,'UNIVERSITAS LANGLANGBUANA',0,1,'R');
        $this->SetFont('helvetica', '', 12); 
        $this->Cell(0,13,'Jl. Karapitan No. 116 Bandung 40261, Telp. 022-4218084, Fax. 022-4237144',0,0,'R');
        
        $no1 = "";
		$no2 = "";
        $text2 = "UNIVERSITAS LANGLANGBUANA";
 		
		$x_no1 = 30;
        $y_no1 = 2;
		
		$x_no2 = 220;
        $y_no2 = 2;
		
        $x_text1 = 120;
        $y_text1 = 12;
            
        $x_text2 = 85;
        $y_text2 = 20;

        $x_text3 = 100;
        $y_text3 = 29;
		
		$x_text4 = 123;
        $y_text4 = 34;
        
		$this->SetFont('courier', '', 10);     
        $this->Text($x_no1,$y_no1,$no1,false);
		$this->Text($x_no2,$y_no2,$no2,false);
        $this->SetFont('courier', 'B', 20);
        $this->Text($x_text2,$y_text2,$text2,false);
        $this->SetFont('helvetica', '', 12);
        
         */
        
    }
    
}