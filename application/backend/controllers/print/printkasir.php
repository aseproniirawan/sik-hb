<?php
class Printkasir extends Controller {
    function __construct(){
        parent::__construct();
		$this->load->library('pdf');
        
    }
    
    function ksrkui($noreg) {
		$query = $this->db->getwhere('v_registrasi',array('noreg'=>$noreg));
		$reg = $query->row_array();
		
		$query = $this->db->getwhere('nota',array('idregdet'=>$reg['idregdet']));
		$nota = $query->row_array();
		
		$query = $this->db->getwhere('notadet',array('nonota'=>$nota['nonota']));
		$notadet = $query->result();
		
		$query = $this->db->getwhere('kuitansi',array('nokuitansi'=>$nota['nokuitansi']));
		$kuitansi = $query->row_array();
		
		// add a page
		$this->pdf->AddPage();
		$this->pdf->SetFont('helvetica', '', 10);
		
		$x=35;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '', '', 1, 0, true, 'C', true);
		$this->pdf->Cell(0, 0, 'KUITANSI', 0, 1, 'C', 0, '', 0);
		$this->pdf->Cell(0, 0, '', 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, '', 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, 'No. Registrasi : '.$reg['norm'], 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, '', 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, 'Nama Pasien : '.$reg['nmpasien'], 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, '', 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, 'No. Nota : '.$nota['nonota'], 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, '', 0, 1, 'L', 0, '', 0);
		$this->pdf->Cell(0, 0, 'No. Kuitansi : '.$kuitansi['nokuitansi'], 0, 1, 'L', 0, '', 0);
		

		$isi = '';
		$total = '';
		foreach($notadet AS $i=>$val){
			$query = $this->db->getwhere('v_tarifall',array('kditem'=>$val->kditem));
			$tarifall = $query->row_array();
			
			$query = $this->db->getwhere('dokter',array('iddokter'=>$val->iddokter));
			$dokter = $query->row_array();
			$query = $this->db->getwhere('perawat',array('idperawat'=>$val->idperawat));
			$perawat = $query->row_array();
			$query = $this->db->getwhere('satuan',array('nmsatuan'=>$tarifall['satuankcl']));
			$satuan = $query->row_array();
			if(!$satuan) $satuan['nmsatuan'] ='';
			$tarif = $val->tarifjs + $val->tarifjm + $val->tarifjp + $val->tarifbhp;
			$total += $tarif;
			
			$isi .= "<tr>
				<td width=\"5%\" align=\"center\"><font size=\"8\" face=\"Helvetica\">". ($i+1) ."</font></td>
				<td width=\"15%\"><font size=\"8\" face=\"Helvetica\">". $tarifall['nmitem'] ."</font></td>
				<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">". $dokter['nmdoktergelar'] ."</font></td>
				<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">". $perawat['nmperawat'] ."</font></td>
				<td width=\"13%\"><font size=\"8\" face=\"Helvetica\">Rp. ". number_format($tarif,0,',','.') ."</font></td>
				<td width=\"7%\"><font size=\"8\" face=\"Helvetica\">". $val->qty ."</font></td>
				<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">". $satuan['nmsatuan'] ."</font></td>
				<td width=\"9%\"><font size=\"8\" face=\"Helvetica\">0</font></td>
				<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">0</font></td>
				<td width=\"11%\"><font size=\"8\" face=\"Helvetica\">Rp. ". number_format($tarif,0,',','.') ."</font></td>
			</tr>";
		}
		
		$html = "<br/><br/>
			<table border=\"1px\" cellpadding=\"2\">
			  <tbody>
				<tr align=\"center\">
					<td width=\"5%\"><font size=\"8\" face=\"Helvetica\">No.</font></td>
					<td width=\"15%\"><font size=\"8\" face=\"Helvetica\">Item Pelayanan</font></td>
					<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">Dokter</font></td>
					<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">Perawat</font></td>
					<td width=\"13%\"><font size=\"8\" face=\"Helvetica\">Tarif</font></td>
					<td width=\"7%\"><font size=\"8\" face=\"Helvetica\">Qty</font></td>
					<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">Satuan</font></td>
					<td width=\"9%\"><font size=\"8\" face=\"Helvetica\">Diskon %</font></td>
					<td width=\"10%\"><font size=\"8\" face=\"Helvetica\">Diskon Rp</font></td>
					<td width=\"11%\"><font size=\"8\" face=\"Helvetica\">Subtotal</font></td>
				</tr>". $isi
			  ."</tbody>
				<tr>
					<td width=\"89%\"><p align=\"right\"><font size=\"8\" face=\"Helvetica\"> Total </font></p></td>
					<td width=\"11%\"><p align=\"center\"><font size=\"8\" face=\"Helvetica\">Rp. ". number_format($total,0,',','.') ."</font></p></td>
				</tr>
			</table>
		";
		$this->pdf->writeHTML($html,true,false,false,false);


		//Close and output PDF document
		$this->pdf->Output('kuitansi.pdf', 'I');
			//============================================================+
			// END OF FILE
			//============================================================+
	}
}


    
