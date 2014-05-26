<?php
class Printpasien extends Controller {
    function __construct(){
        parent::__construct();
		$this->load->library('pdf');
        
    }
    
    function kartu($norm) {
		$this->pdf->SetPrintHeader(false);
		$query = $this->db->getwhere('pasien',array('norm'=>$norm));
		$pasien = $query->row_array();
		
		$page_format = array(
			'MediaBox' => array ('llx' => 0, 'lly' => 0, 'urx' => 54, 'ury' => 85),
		);
		// add a page
		$this->pdf->SetAutoPageBreak(TRUE, 0);
		$this->pdf->AddPage('L',$page_format);
        $this->pdf->SetMargins(5, PDF_MARGIN_TOP, 3,true);
		$this->pdf->SetFont('times', 'B', 12);
		$x=20;
		$y=6;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $pasien['nmpasien']);
		
		$this->pdf->SetFont('times', 'B', 10);
		$x+=6;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, date("d F Y", strtotime($pasien['tgllahir'])));
		
		$x+=6;
		
		$style = array(
                'position' => '',
                'align' => 'L',
                'stretch' => false,
                'fitwidth' => true,
                'cellfitalign' => '',
                'border' => false,
                'hpadding' => 'auto',
                'vpadding' => 'auto',
                'fgcolor' => array(0,0,0),
                'bgcolor' => false, //array(255,255,255),
                'text' => true,
                'font' => 'helvetica',
                'fontsize' => 6,
                'stretchtext' => 1,
                'label' => false,
                );
		$this->pdf->Cell(0, 0, '', 0, 1);
		$this->pdf->write1DBarcode($pasien['norm'], 'C39', '', '', 40, 16, 0.4, $style,'N');
		
		$x+=12;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $pasien['norm']);


		//Close and output PDF document
		$this->pdf->Output('kartu_pasien.pdf', 'I');
			//============================================================+
			// END OF FILE
			//============================================================+
	}
}


    
