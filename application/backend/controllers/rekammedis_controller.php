<?php
class Rekammedis_controller extends Controller{
	
	function __construct(){
		parent::Controller();
		$this->load->model(array('Rekammedis'=>'Rekammedis'));
	}
	
	function getPermintaanKartuRM(){
		$tmp=$this->Rekammedis->getMutasiKRM();
		echo json_encode($tmp);		
	}
	
	function getPengeluaranKartuRM(){
		$tmp = $this->Rekammedis->getMutasiKRMKeluar();
		echo json_encode($tmp);
	}
	
	function getBagian(){
		$tmp = $this->Rekammedis->getBagian();
		echo json_encode($tmp);	
	}	
	
	function keluarkanRM(){
		$tmp = $this->Rekammedis->keluarkanRM();
		echo json_encode($tmp);
	}
	
	function terimaRM(){
		$tmp = $this->Rekammedis->terimaRM();
		echo json_encode($tmp);
	}
	
	function keluarkanRMScan(){
		$tmp = $this->Rekammedis->keluarkanRMScan();		
		echo json_encode($tmp);
	}
	
	function terimaRMScann(){
		$tmp = $this->Rekammedis->terimaRMScann();
		echo json_encode($tmp);
	}
	
	function getLokasi(){
		$tmp = $this->Rekammedis->getLokasi();
		echo json_encode($tmp);
	}
	
	function ubahLokasi(){
		$tmp = $this->Rekammedis->ubahLokasi();
		echo json_encode($tmp);
	}
	
	function getHistory(){
		$tmp = $this->Rekammedis->getHistory();
		echo json_encode($tmp);
	}

	function getHistoryRM(){
		$tmp = $this->Rekammedis->getHistoryRM();
		echo json_encode($tmp);
	}
	
	function getStatusBerkasRM(){
		$tmp = $this->Rekammedis->getStatusBerkasRM();
		echo json_encode($tmp);
	}

	function ubahRiwayatRM(){
		$tmp = $this->Rekammedis->ubahRiwayatRM();
		echo json_encode($tmp);
	}

	function getRiwayatPasien(){
		$tmp = $this->Rekammedis->getRiwayatPasien();
		echo json_encode($tmp);
	}
}
