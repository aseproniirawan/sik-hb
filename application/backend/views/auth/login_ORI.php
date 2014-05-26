<?php $this->load->view('header'); ?>
<style type="text/css">
   body {
       margin:0; padding:0;
   }
   html, body, #bg {
       height:100%;
       width:100%;
   }
   #bg {
       position:absolute; 
       left:0;
       right:0;
       bottom:0;
       top:0;
       overflow:hidden;
       z-index:0;
   }
   #bg img {
       width:100%;
       min-width:100%;
       min-height:100%;
   }
   #content {
       z-index:1;
   }
</style>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext_plugins/statusbar/StatusBar.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>application/frontend/auth/form_validation.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>application/frontend/auth/form_login.js"></script>

<?php $this->load->view('footer'); ?>