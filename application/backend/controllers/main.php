<?php

class Main extends Controller {
	var $stat;
	
    public function __construct()
    {
        parent::Controller();
		$this->load->model(array('Menu'=>'Menu'));
    }
    
    public function index()
    {
        if ($this->my_usession->logged_in) {
			$data['title'] = 'Owner Area';
			
			$data['url'] = 'application/frontend/';
			$data['menu'] = $this->Menu->getAll();
			
			$this->load->view('index-sik', $data);
        }
        else {		
            $this->my_usession->set_userdata('login_res', 0);
			redirect('auth/login');
        }
    }
    
}
