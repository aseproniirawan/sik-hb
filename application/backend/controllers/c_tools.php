<?php

class C_tools extends Controller {
var $stat;

    public function __construct()
    {
        parent::Controller();
        
    }

   function get_user(){
        $user = $this->session->userdata("username");
            
        if($user != ""){
            $value["success"]=true;
			$value["userid"]=$this->session->userdata("user_id");
            $value["username"]=$this->session->userdata("username");
            $value["level_member"]=$this->session->userdata("level_member");
			$value["nm_klp"]=$this->session->userdata("nm_klp");
              
        }else{
            $value["success"]=false;
        }
        echo json_encode($value);
    }
    
   
}
