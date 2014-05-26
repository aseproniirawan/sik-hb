<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once APPPATH.'third_party/tcpdf/tcpdf'.EXT;

class Pdf extends TCPDF{
    public function __construct($orientation = 'P', $unit = 'mm', $format = 'A4', $unicode = TRUE, $encoding = 'UTF-8', $diskcache = FALSE, $pdfa = FALSE) {
        parent::__construct($orientation, $unit, $format, $unicode, $encoding, $diskcache, $pdfa);
    }
    
    
    public function Header() {
        // Logo
        $image_file = base_url().'resources/img/report.png';
        $this->Image($image_file, 8, 8, 23, '', 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        
        $text1 = "RSKIA HARAPAN BUNDA";
        $text2 = "dr. Bambang Suhardijant, SpOg";
        $text3 = "Pluto Raya Blok C Margahayu Raya Bandung";          
        $text4 = "Telp. (022) 7506490 Fax (022) 7514712";          
        $x_text1 = 35;
        $y_text1 = 8;
            
        $x_text2 = 35;
        $y_text2 = 16;

        $x_text3 = 35;
        $y_text3 = 23;

        $x_text4 = 35;
        $y_text4 = 29;
        
        $this->SetFont('helvetica', 'B', 20);     
        $this->Text($x_text1,$y_text1,$text1,false);
        $this->SetFont('helvetica', 'B', 16);
        $this->Text($x_text2,$y_text2,$text2,false);
        $this->SetFont('helvetica', '', 13);
        $this->Text($x_text3,$y_text3,$text3,false);
        $this->SetFont('helvetica', '', 13);
        $this->Text($x_text4,$y_text4,$text4,false);
        
        $style = array('width' => 0.3, 'cap' => 'butt', 'join' => 'miter', 'phase' => 0, 'color' => array(0, 0, 0));
        $style2 = array('width' => 0.7, 'cap' => 'butt', 'join' => 'miter', 'phase' => 0, 'color' => array(0, 0, 0));

        $this->Line(10, 35, 200, 35, $style);
        $this->Line(10, 36, 200, 36, $style2);
    }
    
}