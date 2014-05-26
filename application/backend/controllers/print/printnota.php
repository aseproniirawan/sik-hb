<?php
class Printnota extends Controller {
    function __construct(){
        parent::__construct();
		$this->load->library('pdf');
        
    }
    
    function nota_ri($nonota, $noreg) {
		$query = $this->db->getwhere('v_registrasi',array('noreg'=>$noreg));
		$reg = $query->row_array();
		
		$query = $this->db->getwhere('nota',array('nonota'=>$nonota));
      
        $this->db->select("*");
        $this->db->from("nota");
        $this->db->join("shift",
				"shift.idshift = nota.idshift", "left");
        $this->db->join("bagian",
				"bagian.idbagian = nota.idbagian", "left");
        $this->db->join("dokter",
				"dokter.iddokter = nota.iddokter", "left");
        $query = $this->db->get();
		$nota = $query->row_array();
		
		$query = $this->db->getwhere('notadet',array('nonota'=>$nonota));
		$notadet = $query->result();
		
		// add a page
		$this->pdf->AddPage();
		$this->pdf->SetFont('helvetica', '', 10);
		
		$x=40;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'NOTA TRANSAKSI RJ', '', 1, 0, true, 'C', true);
		$x+=5;$y+=0;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'No. Nota');
		$x+=0;$y+=35;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=5;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $nota['nonota']);
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'Tgl. / Jam / Shift');
		$x+=0;$y+=35;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=5;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, date_format(date_create($nota['tglnota']), 'd-m-Y').' / '.$nota['jamnota'].' / '.$nota['nmshift']);
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'No. RM / Reg.');
		$x+=0;$y+=35;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=5;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $reg['norm'].' / '.$reg['noreg']);
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'Nama Pasien');
		$x+=0;$y+=35;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=5;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $reg['nmpasien']);
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'Alamat Pasien');
		$x+=0;$y+=35;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=5;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, $reg['alamatp'].', Tlp. : '. $reg['notelpp']);
		
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
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'Penjamin');
		$x+=0;$y+=35;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, ':');
		$x+=0;$y+=5;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '');
		
		$x+=5;$y=0;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '');
		

		$isi = '';
		$total = '';
		foreach($notadet AS $i=>$val){
			$x+=5;
			$query = $this->db->getwhere('v_tarifall',array('kditem'=>$val->kditem));
			$tarifall = $query->row_array();
			
			$query = $this->db->getwhere('dokter',array('iddokter'=>$val->iddokter));
			$dokter = $query->row_array();
			$query = $this->db->getwhere('perawat',array('idperawat'=>$val->idperawat));
			$perawat = $query->row_array();
			$query = $this->db->getwhere('satuan',array('idsatuan'=>$val->idsatuan));
			$satuan = $query->row_array();
			
			$tarif = $val->tarifjs + $val->tarifjm + $val->tarifjp + $val->tarifbhp;
			$total += $tarif;
			
			$isi .= "<tr>
				<td width=\"5%\" align=\"center\"><font size=\"10\" face=\"Helvetica\">". ($i+1) ."</font></td>
				<td width=\"80%\"><font size=\"10\" face=\"Helvetica\">". $tarifall['nmitem'] ."</font></td>
				<td width=\"15%\"><font size=\"10\" face=\"Helvetica\">Rp. ". number_format($tarif,0,',','.') ."</font></td>
			</tr>";
		}
		
		$x+=18;
		$html = "<br/><br/>
			<table border=\"1px\" cellpadding=\"2\">
			  <tbody>
				<tr align=\"center\">
					<td width=\"5%\"><font size=\"10\" face=\"Helvetica\">No.</font></td>
					<td width=\"80%\"><font size=\"10\" face=\"Helvetica\">Item Pelayanan</font></td>
					<td width=\"15%\"><font size=\"10\" face=\"Helvetica\">Subtotal</font></td>
				</tr>". $isi
			  ."</tbody>
				<tr>
					<td width=\"85%\"><p align=\"right\"><font size=\"10\" face=\"Helvetica\"> Total </font></p></td>
					<td width=\"15%\"><font size=\"10\" face=\"Helvetica\">Rp. ". number_format($total,0,',','.') ."</font></td>
				</tr>
			</table>
		";
		$this->pdf->writeHTML($html,true,false,false,false);
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '<i>* catatan</i>');
		$x+=0;$y+=0;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '# '.$this->rp_terbilang($total, 0).' rupiah #', '', 1, 0, true, 'R', true);
		
		$x+=20;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '( '. $nota['userinput'] .' )');
		$x+=0;$y+=0;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '<i>Tgl. & Jam Cetak : '.date('d-m-Y').' & '.date('H:i:s').'</i>', '', 1, 0, true, 'R', true);
		
		$x+=5;$y=10;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, 'Petugas Transaksi');
		$x+=5;$y=0;
		$this->pdf->writeHTMLCell(0, 10, $y, $x, '[ '.$nota['nonota'].' ]', '', 1, 0, true, 'C', true);


		//Close and output PDF document
		$this->pdf->Output('nota.pdf', 'I');
			//============================================================+
			// END OF FILE
			//============================================================+
	}
	
	function rp_satuan($angka,$debug){
		$terbilang = '';
		$a_str['1']="satu";
		$a_str['2']="dua";
		$a_str['3']="tiga";
		$a_str['4']="empat";
		$a_str['5']="lima";
		$a_str['6']="enam";
		$a_str['7']="tujuh";
		$a_str['8']="delapan";
		$a_str['9']="sembilan";
		
		
		$panjang=strlen($angka);
		for ($b=0;$b<$panjang;$b++)
		{
			$a_bil[$b]=substr($angka,$panjang-$b-1,1);
		}
		
		if ($panjang>2)
		{
			if ($a_bil[2]=="1")
			{
				$terbilang=" seratus";
			}
			else if ($a_bil[2]!="0")
			{
				$terbilang= " ".$a_str[$a_bil[2]]. " ratus";
			}
		}

		if ($panjang>1)
		{
			if ($a_bil[1]=="1")
			{
				if ($a_bil[0]=="0")
				{
					$terbilang .=" sepuluh";
				}
				else if ($a_bil[0]=="1")
				{
					$terbilang .=" sebelas";
				}
				else 
				{
					$terbilang .=" ".$a_str[$a_bil[0]]." belas";
				}
				return $terbilang;
			}
			else if ($a_bil[1]!="0")
			{
				$terbilang .=" ".$a_str[$a_bil[1]]." puluh";
			}
		}
		
		if ($a_bil[0]!="0")
		{
			$terbilang .=" ".$a_str[$a_bil[0]];
		}
		return $terbilang;
	   
	}
	
	function rp_terbilang($angka,$debug){
		$terbilang = '';
		
		$angka = str_replace(".",",",$angka);
		
		list ($angka) = explode(",",$angka);
		$panjang=strlen($angka);
		for ($b=0;$b<$panjang;$b++)
		{
			$myindex=$panjang-$b-1;
			$a_bil[$b]=substr($angka,$myindex,1);
		}
		if ($panjang>9)
		{
			$bil=$a_bil[9];
			if ($panjang>10)
			{
				$bil=$a_bil[10].$bil;
			}

			if ($panjang>11)
			{
				$bil=$a_bil[11].$bil;
			}
			if ($bil!="" && $bil!="000")
			{
				$terbilang .= $this->rp_satuan($bil,$debug)." milyar";
			}
			
		}

		if ($panjang>6)
		{
			$bil=$a_bil[6];
			if ($panjang>7)
			{
				$bil=$a_bil[7].$bil;
			}

			if ($panjang>8)
			{
				$bil=$a_bil[8].$bil;
			}
			if ($bil!="" && $bil!="000")
			{
				$terbilang .= $this->rp_satuan($bil,$debug)." juta";
			}
			
		}
		
		if ($panjang>3)
		{
			$bil=$a_bil[3];
			if ($panjang>4)
			{
				$bil=$a_bil[4].$bil;
			}

			if ($panjang>5)
			{
				$bil=$a_bil[5].$bil;
			}
			if ($bil!="" && $bil!="000")
			{
				$terbilang .= $this->rp_satuan($bil,$debug)." ribu";
			}
			
		}

		$bil=$a_bil[0];
		if ($panjang>1)
		{
			$bil=$a_bil[1].$bil;
		}

		if ($panjang>2)
		{
			$bil=$a_bil[2].$bil;
		}
		//die($bil);
		if ($bil!="" && $bil!="000")
		{
			$terbilang .= $this->rp_satuan($bil,$debug);
		}
		return trim($terbilang);
	}
}


    
