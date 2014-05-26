<?php
class Print_rekammedis extends Controller{
	function __construct(){
		parent::__construct();
		$this->load->library('pdf');
	}

	function cetakKartuRM($param){
		// add a page
		$this->pdf->AddPage();
		$this->pdf->SetFont('helvetica', 'B', 15);
		$x=40;$y=10;		
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'KARTU REKAM MEDIS', '', 1, 0, true, 'C', true);
		
		$this->pdf->SetFont('helvetica', '', 10);
		$x+=10;$y+=0;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'No. RM');
		$x+=0;$y+=20;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $param);

		$html = "<br/><br/><br/><br/><br/><br/>
		<table border=\"1px\" cellpadding=\"2\">
			<tbody>
				<tr align=\"center\">
					<td width=\"5%\"><font size=\"10\" face=\"Helvetica\">No.</font></td>
					<td width=\"48%\"><font size=\"10\" face=\"Helvetica\">Diagnosa</font></td>
					<td width=\"47%\"><font size=\"10\" face=\"Helvetica\">Anamnesa</font></td>
				</tr>
				<tr>
					<td height=\"550\"></td>
					<td height=\"550\"></td>
					<td height=\"550\"></td>
				</tr>
			</tbody>
		</table>";
		$this->pdf->writeHTML($html,true,false,false,false);
		//Close and output PDF document
		$this->pdf->Output('KartuRM.pdf', 'I');
	}
}