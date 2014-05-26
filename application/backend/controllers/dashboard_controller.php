<?php 
	class Dashboard_Controller extends Controller{
		public function __construct()
		{
			parent::Controller();
				$this->load->library('session');
				$this->load->library('rhlib');
		}
		
		function count_pasien(){
			$this->db->select("count(norm) as norm");
			$this->db->from("pasien");
			$q = $this->db->get();
			$norm = $q->row_array();
			echo json_encode($norm);
		}
		function count_dokter(){
			$this->db->select("count(iddokter) as iddokter");
			$this->db->from("dokter");
			$q = $this->db->get();
			$dokt = $q->row_array();
			echo json_encode($dokt);
		}
		function count_perawat(){
			$this->db->select("count(idperawat) as idperawat");
			$this->db->from("perawat");
			$q = $this->db->get();
			$perawat = $q->row_array();
			echo json_encode($perawat);
		}
		function count_bed(){
			$this->db->select("count(idbed) as idbed");
			$this->db->from("bed");
			$q = $this->db->get();
			$bed = $q->row_array();
			echo json_encode($bed);
		}
		function pie_pasien(){
			$sql = $this->db->query("SELECT DISTINCT (EXTRACT( YEAR FROM tgldaftar )) as tahundaftar, count(norm) as norm from pasien GROUP BY tahundaftar");
			$num = $sql->num_rows();
			
			if($num>0){
			//	return $sql->result();
				$arr = array('data'=>$sql->result());
				echo json_encode($arr);
			}else{
				return 0;
			}
		}
		function chart_pasien(){
			$query = $this->db->query("SELECT DISTINCT (
                extract(YEAR
                FROM rd.tglreg)
                ) AS tahunreg
              , (
                SELECT count(*)
                FROM
                  registrasidet rd, registrasi r
                WHERE
                  r.noreg = rd.noreg
                  AND
                  r.idstpasien = 1
                  AND
                  extract(YEAR
                  FROM rd.tglreg) = tahunreg
                ) AS pasienbaru
              , (
                SELECT count(*)
                FROM
                  registrasidet rd, registrasi r
                WHERE
                  r.noreg = rd.noreg
                  AND
                  r.idstpasien = 2
                  AND
                  extract(YEAR
                  FROM rd.tglreg) = tahunreg
                ) AS pasienlama
				FROM
				  registrasidet rd, registrasi r
				WHERE
				  r.noreg = rd.noreg
				GROUP BY
				  tahunreg"
				);
				
			$num = $query->num_rows();
			if($num>0){
				$arr = array('data'=>$query->result());
				echo json_encode($arr);
			}else{
				return 0;
			}
		}
		
		function count_poli(){
			
			$query = $this->db->query("SELECT DISTINCT (
                extract(YEAR
                FROM rd.tglreg)
                ) AS tahunreg
              , 
                rd.idbagian as idbagianb
              ,(
                SELECT count(rd.idbagian)
                FROM
                  registrasidet rd, registrasi r, bagian b
                WHERE
                  r.noreg = rd.noreg
                  AND
                  r.idstpasien = 1
                  AND
                  rd.idbagian = b.idbagian
                  AND
                  b.idbagian = idbagianb
                  and
                  extract(YEAR
                  FROM rd.tglreg) = tahunreg
                ) AS polibaru
              , (
                SELECT count(rd.idbagian)
                FROM
                  registrasidet rd, registrasi r, bagian b
                WHERE
                  r.noreg = rd.noreg
                  AND
                  r.idstpasien = 2
                  AND
                  rd.idbagian = b.idbagian
                  AND
                  b.idbagian = idbagianb
                  AND
                  extract(YEAR
                  FROM rd.tglreg) = tahunreg
                ) AS polilama,
                b.nmbagian 
				FROM
				  registrasidet rd, registrasi r, bagian b
				WHERE
				  r.noreg = rd.noreg
				  and
				  rd.idbagian = b.idbagian
				  AND
				  rd.tglreg LIKE '%2014%'
				GROUP BY
				  tahunreg, rd.idbagian"
  );
		$num = $query->num_rows();
			if($num>0){
				$arr = array('data'=>$query->result());
				echo json_encode($arr);
			}else{
				return 0;
			}
		}
		
	function Informasi(){
	$sql =	$this->db->query("select deskripsi from informasi");
	$num = $sql->num_rows();
			if($num>0){
				$arr = array('data'=>$sql->result());
				echo json_encode($arr);			
			}else{
				return 0;
			} 
			/*
	if($sql->num_rows() > 0){
			$arr = array('data'=>$sql->result());
			foreach($arr as $row){
			//	echo $row->deskripsi;
				echo json_encode($arr);
			}
			
		}else{
			return 0;
		} */
	}
}