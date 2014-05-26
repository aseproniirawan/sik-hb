<?php $this->load->view('header'); ?>
<?php  ?>

	<script type="text/javascript">
	
		Ext.Ajax.request({
			url:BASE_URL + 'auth/get_auth',
			method:'POST',
			success: function(response){
				var r = Ext.decode(response.responseText);
				USERID = r.user_id;
				USERNAME = r.username;
				L_MEMBER = r.level_member;
				NM_KLP = r.nm_klp;
				
				if (!USERID) {
					window.location = BASE_URL + 'auth/login';
				}
			}
		});
    </script>
<!-- PLUGIN dan Resources third party  -->   
	<!-- for numeric field with thousand separator, the numeric is right alignment-->
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/form/NumberField.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/TreeGridSorter.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/TreeGridColumnResizer.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/TreeGridNodeUI.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/TreeGridLoader.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/OverrideNodeUI.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/TreeGridColumns.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/treegrid/TreeGrid.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/CheckColumn.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/DataView-more.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/FileUploadField.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/Ext.ux.grid.Search.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/RowEditor.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>resources/js/ext/ux/ColumnHeaderGroup.js"></script>
	<script type="text/javascript" src="<?php echo base_url().$url; ?>store/DataMaster.js"></script> 
    <script type="text/javascript" src="<?php echo base_url().$url; ?>m_image.js"></script>
    <script type="text/javascript" src="<?php echo base_url().$url; ?>find_m.js"></script>
    <script type="text/javascript" src="<?php echo base_url().$url; ?>upload_m.js"></script>
	<script type="text/javascript" src="<?php echo base_url().$url; ?>main/page_controller.js"></script>
	<script type="text/javascript" src="<?php echo base_url().$url; ?>dashboard/dashboard_index.js"></script>
	<script type="text/javascript" src="<?php echo base_url().$url; ?>main/main.js"></script> 
	<script type="text/javascript" src="<?php echo base_url().$url; ?>rawatinap/RIregistrasi.js"></script> 
	<script type="text/javascript" src="<?php echo base_url().$url; ?>rawatjalan/RJregistrasi.js"></script> 
	<script type="text/javascript" src="<?php echo base_url().$url; ?>ugd/UGDregistrasi.js"></script>
	<script type="text/javascript" src="<?php echo base_url().$url; ?>persediaan/pembelian/PDaftarPO.js"></script>
		
	

<!--new priv -->
	<?php
		foreach($menu AS $j=>$value){
			echo '<script type="text/javascript" src="'. base_url() . $url .$value->url .'"></script>';
		}
	?>

<?php $this->load->view('footer'); ?>