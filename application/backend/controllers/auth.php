<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends Controller {
	var $stat;
	
    public function __construct()
    {
        parent::Controller();
		$this->load->model(array('Loguser'=>'Loguser', 'Pengguna'=>'Pengguna'));
    }
    
    public function index()
    {
		global $loginRet;
		if ($this->my_usession->logged_in)
        {
			redirect('');
        }
        else
        {
			$this->my_usession->set_userdata('login_res', 0);
			redirect('auth/login');
        }		
    }
	
/*
 * RH Redefine Login Function 
 * 
 */
	
	public function login()
    {
        if ($this->my_usession->logged_in)
        {
            if($this->my_usession->userdata('level_member') == 1){
                redirect('auth/index');
            }           
		}
        else
        {
            $data['title'] = 'User Login';
			if($this->my_usession->userdata('login_res') == 0){
				$data['msg'] = 'Masukkan User ID dan Password';
			}
			if($this->my_usession->userdata('login_res') == 1){
				$data['msg'] = 'User tidak aktif!';
			}
			if($this->my_usession->userdata('login_res') == 2){
				$data['msg'] = 'User atau password salah!';
			}
            $this->load->view('auth/login', $data);
        }
    }
	
	public function rh_ext_login(){
		if($_POST['username']=="" || $_POST['password']==""){
			$this->my_usession->set_userdata('login_res', 0);
			redirect('auth/login');
		}
		
		$cond = array(
			'userid' => $_POST['username'],
			'password' => base64_encode($_POST['password'])
        );
        $query = $this->Pengguna->getLogin($cond);
        if ($query->num_rows() != 0)
        {
            $row = $query->row();
			$q_klppengguna = $this->Pengguna->getKlppengguna($row->idklppengguna);
            $klppengguna = $q_klppengguna->row();
            $this->my_usession->set_userdata('status_aktifasi', $row->idstatus);
            if($this->my_usession->userdata('status_aktifasi') == 1){
                $this->my_usession->set_userdata('user_id', $row->userid);
                $this->my_usession->set_userdata('username', $row->nmlengkap);
                $this->my_usession->set_userdata('level_member', $row->idklppengguna);
				$this->my_usession->set_userdata('nm_klp', $klppengguna->nmklppengguna);
				$this->my_usession->set_userdata('login_res', 0);
				$this->Loguser->save();
				redirect('');
			}else{
				$this->my_usession->set_userdata('login_res', 1);
				redirect('auth/login');
				//echo "{success:false, errors: { reason: 'User tidak aktif!' }}";
            }
            
        }
        else
        {
			$this->my_usession->set_userdata('login_res', 2);
			redirect('auth/login');
			//echo "{success:false, errors: { reason: 'User not found !' }}";
        }
    }

    public function ext_logout()
    {
		$this->Loguser->update();
        $this->my_usession->unset_userdata("session_id");
        echo "{success:true}";
    }

    function get_auth(){
        $user = $this->session->userdata("user_id");
            
        if($user != ""){
            $value["success"]=true;
			$value["user_id"]=$this->session->userdata("user_id");
            $value["username"]=$this->session->userdata("username");
            $value["level_member"]=$this->session->userdata("level_member");
			$value["nm_klp"]=$this->session->userdata("nm_klp");
              
        }else{
            $value["success"]=false;
        }
        echo json_encode($value);
    }
}
