<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('class.pdf.php');

class RhRpt extends Cezpdf {
    function __construct(){
        parent::__construct();
		//parent::Controller();
		//$this->load->library('cezpdf');
    }

	function rptStream($rptName){
		//The last function to call
		$this->ezStream(array('Content-Disposition'=>$rptName));
	}
	
	function setPage($size, $layout){
		//$this->cezpdf->
		$this->Cezpdf($size, $layout);
	}
	
	function setMargins($left, $top, $right, $bottom){
		//$this->cezpdf->
		$this->ezSetMargins($left, $top, $right, $bottom);
	}
	
	function vSpace($v_space){
		$this->ezSetDy(-$v_space, 'makeSpace'); //separator space
	}
	
	function getUnlaHeader(){
		$head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        return $head_unla;
	}
	
	function setUnlaHeader($x, $y, $hwidth, $fontSize){
		$head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $head_unla[]=array(   'kol1'=>'','kol2'=>'');
        $imgWidth = 100;
		$textWidth = $hwidth - $imgWidth - 50; 
		//$this->cezpdf->
		$this->addPngFromFile(base_url().'resources/common-web/gfx/theme1/icon.png',$x,$y,$imgWidth,'left'); //245,510,100,'left');
        //$this->cezpdf->		
		$this->ezTable($head_unla, '', '', 
						array( 'width'=>$hwidth,
								'fontSize' => $fontSize,
								'showLines'=> 0,
								'showHeadings'=>0,
								'shaded'=>0,
								'cols'=>array(
									'kol1'=>array('justification'=>'left','width'=>$x+$imgWidth,'fontSize' => $fontSize),
									'kol2'=>array('justification'=>'left','width'=>$textWidth)
								)
							)
						);
        
	}
	
	function setRptHeader($text, $fontSize, $width){
		$htitle[]=array(   'kol1'=>'','kol2'=>$text,'kol3'=>'');
		     
		//$this->cezpdf->
		$this->ezTable($htitle, '', '', 
								array( 'width'=>$width, //660,
									'fontSize' => $fontSize,
									'showLines'=> 0,
									'showHeadings'=>0,
									'shaded'=>0,
									'cols'=>array(
										'kol1'=>array('justification'=>'left'),
										'kol2'=>array('justification'=>'center'),
										'kol3'=>array('justification'=>'center'))));
        
	}
	
	function setRptTable($cols, $data, $width){
		for($i = 0; $i < count($cols); $i++)
		{
			$dataindex = $cols[$i]['dataindex'];
			$cheader = $cols[$i]['header'];
			$cwidth = $cols[$i]['width'];
			$align = $cols[$i]['align'];
			
			$col_header[$dataindex] = $cheader;
			$cheader_style[$dataindex] = array('width'=>$cwidth, 'justification'=>"center");
			$cdetail_style[$dataindex] = array('width'=>$cwidth, 'justification'=>"$align");
		}
		$col_headers[] = $col_header; //array[0] = array()
		
		//$this->cezpdf->
		$this->ezTable($col_headers, '', '', 
							array('width'=>$width, //800,
								'fontSize' => 8,
								'showLines'=> 1,'showHeadings'=>0,'shaded'=>1,'justification'=>"left",
								'cols'=>$cheader_style
							)
						);
		//$this->cezpdf->		
		$this->ezTable($data, '', '', 
							array('width'=>$width, //800,
								'fontSize' => 8,
								'showLines'=> 1,'showHeadings'=>0,'shaded'=>1,'justification'=>"left",
								'cols'=>$cdetail_style
							)
						);
		
	}
}
	
?>