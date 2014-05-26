<!doctype html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> 	<html lang="en"> <!--<![endif]-->
<head>
	<link rel="shortcut icon" href="<?php echo base_url(); ?>resources/common-web/gfx/theme1/icons.png" />

	<!-- General Metas -->
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">	<!-- Force Latest IE rendering engine -->
	<title>RSKIA Harapan Bunda</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Mobile Specific Metas -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> 
	
	<!-- Stylesheets -->
	<link rel="stylesheet" href="<?php echo base_url(); ?>application/backend/views/auth/css/base.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>application/backend/views/auth/css/skeleton.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>application/backend/views/auth/css/layout.css">
	<script type="text/javascript">
		
	</script>
</head>
<body>

	<div class="notice">		
		<p class="warn"><img width="325" height="300" src="<?php echo base_url(); ?>application/backend/views/auth/images/logo-header.png"  />
		</p>
	</div>
	<!-- Primary Page Layout -->
	<div class="container">	
		<div class="form-bg">
			<form method="POST" id="frmLogin" action="<?php echo base_url(); ?>auth/rh_ext_login">
				<h2>Login</h2>
				<p><input type="text" placeholder="User ID" name="username" id="logUsername" autofocus></p>
				<p><input type="password" placeholder="Password" name="password" id="logPassword"></p>
				<label for="remember">
				<font color="gray"><?php echo $msg; ?></font>
				  <!--<span>Remember me on this computer</span>-->
				</label>
				<button type="submit"></button>
			<form>
		</div>
		<p class="forgot">© Copyright 2014 SIK V1. All rights reserved.<br>
		Sistem Informasi Kesehatan V1</p>
	</div><!-- container -->
<!-- End Document -->
</body>
</html>