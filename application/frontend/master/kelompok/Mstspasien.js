function Mstspasien(){
	var pageSize = 18;
	var ds_stpasien = dm_stpasien();
	var ds_jpelayanan = dm_jpelayanan();
	
	var cari_data = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'remote',
		width: 200
	})];
	
	var paging = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_stpasien,
		displayInfo: true,
		displayMsg: 'Data Status Pasien Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stpasien',
		store: ds_stpasien,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		pageSize: pageSize,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddStpasien();
				Ext.getCmp('tf.frm.idstpasien').focus();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstpasien',
			sortable: true
		},
		{
			header: 'Nama Pasien',
			width: 200,
			dataIndex: 'nmstpasien',
			sortable: true
		},
		{
			header: 'Pelayanan',
			width: 200,
			dataIndex: 'nmjnspelayanan',
			sortable: true
		},{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Edit',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_edit.png',
					tooltip: 'Edit record',
                    handler: function(grid, rowIndex) {
						fnEditStpasien(grid, rowIndex);
                    }
                }]
        },{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Hapus',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_delete.gif',
					tooltip: 'Hapus record',
                    handler: function(grid, rowIndex) {
						fnDeleteStpasien(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {
			
			}
		}
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Pasien', iconCls:'silk-calendar',
		layout: 'fit',
		items: [
		{
			xtype: 'panel',
			border: false,
			items: [{
				layout: 'form',
				border: false,
				items: [grid_nya]
			}]
		}]
	});
	SET_PAGE_CONTENT(form_bp_general);
/** 
FUNCTIONS
*/
	
	function reloadStpasien(){
		ds_stpasien.reload();
	}
	
	function fnAddStpasien(){
		var grid = grid_nya;
		wEntryStpasien(false, grid, null);	
	}
	
	function fnEditStpasien(grid, record){
		var record = ds_stpasien.getAt(record);
		wEntryStpasien(true, grid, record);		
	}
	
	function fnDeleteStpasien(grid, record){
		var record = ds_stpasien.getAt(record);
		var url = BASE_URL + 'stspasien_controller/delete_stpasien';
		var params = new Object({
						idstpasien	: record.data['idstpasien']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function wEntryStpasien(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Status Pasien (Edit)':'Status Pasien (Entry)';
		var stpasien_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.stpasien',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 200, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [     
			{
				id: 'tf.frm.idstpasien', 
				hidden: true,
			},    
			{
				id: 'tf.frm.kdstpasien', 
				fieldLabel: 'Kode',
				width: 150, allowBlank: false,
			},{
				id: 'tf.frm.nmstpasien', 
				fieldLabel: 'Nama Pasien',
				width: 300, allowBlank: false,        
			},{
				xtype: 'combo', id: 'cb.frm.jnspelayanan', 
				fieldLabel: 'Pelayanan',
				store: ds_jpelayanan, triggerAction: 'all',
				valueField: 'idjnspelayanan', displayField: 'nmjnspelayanan',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 250,
				editable: false
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveStpasien();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wStpasien.close();
				}
			}]
		});
			
		var wStpasien = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [stpasien_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setStpasienForm(isUpdate, record);
		wStpasien.show();

	/**
	FORM FUNCTIONS
	*/	
		function setStpasienForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idstpasien'));
					RH.setCompValue('tf.frm.idstpasien', record.get('idstpasien'));
					RH.setCompValue('tf.frm.kdstpasien', record.get('kdstpasien'));
					RH.setCompValue('tf.frm.nmstpasien', record.get('nmstpasien'));
					RH.setCompValue('cb.frm.jnspelayanan', record.data['idjnspelayanan']);
					return;
				}
			}
		}
		
		function fnSaveStpasien(){
			var idForm = 'frm.stpasien';
			var sUrl = BASE_URL +'stspasien_controller/insert_stpasien';
			var sParams = new Object({
				idstpasien		:	RH.getCompValue('tf.frm.idstpasien'),
				kdstpasien		:	RH.getCompValue('tf.frm.kdstpasien'),
				nmstpasien		:	RH.getCompValue('tf.frm.nmstpasien'),
				idjnspelayanan		:	RH.getCompValue('cb.frm.jnspelayanan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'stspasien_controller/update_stpasien';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wStpasien, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}