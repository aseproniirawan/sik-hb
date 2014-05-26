function Mpabrik(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_pabrik = dm_pabrik();
	
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
		store: ds_pabrik,
		displayInfo: true,
		displayMsg: 'Data Pabrik Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_pabrik',
		store: ds_pabrik,
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
				fnAddPabrik();
				//Ext.getCmp('tf.frm.kdpabrik').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdpabrik',
			sortable: true
		},
		{
			header: 'Nama Pabrik',
			width: 200,
			dataIndex: 'nmpabrik',
			sortable: true
		},{
			header: 'Alamat',
			width: 300,
			dataIndex: 'alamat',
			sortable: true
		},{
			header: 'keterangan',
			width: 300,
			dataIndex: 'keterangan',
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
						fnEditPabrik(grid, rowIndex);
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
						fnDeletePabrik(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Pabrik', iconCls:'silk-calendar',
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
	
	function reloadPabrik(){
		ds_pabrik.reload();
	}
	
	function fnAddPabrik(){
		var grid = grid_nya;
		wEntryPabrik(false, grid, null);	
	}
	
	function fnEditPabrik(grid, record){
		var record = ds_pabrik.getAt(record);
		wEntryPabrik(true, grid, record);		
	}
	
	function fnDeletePabrik(grid, record){
		var record = ds_pabrik.getAt(record);
		var url = BASE_URL + 'pabrik_controller/delete_pabrik';
		var params = new Object({
						idpabrik	: record.data['idpabrik']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function wEntryPabrik(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Pabrik (Edit)':'Pabrik (Entry)';
		var pabrik_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.pabrik',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 230, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [
			{
				id: 'tf.frm.idpabrik', 
				hidden: true,
			},
			{
				id: 'tf.frm.kdpabrik', 
				fieldLabel: 'Kode',
				width: 100, allowBlank: false,
			},{
				id: 'tf.frm.nmpabrik', 
				fieldLabel: 'Nama Pabrik',
				width: 300, allowBlank: false,        
			},{
				xtype: 'textarea',
				id: 'ta.frm.alamat', 
				fieldLabel: 'Alamat',
				width: 300,        
			},{
				id: 'tf.frm.keterangan', 
				fieldLabel: 'Keterangan',
				width: 300       
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSavePabrik();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wPabrik.close();
				}
			}]
		});
			
		var wPabrik = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [pabrik_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setPabrikForm(isUpdate, record);
		wPabrik.show();

	/**
	FORM FUNCTIONS
	*/	
		function setPabrikForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idpabrik'));
					RH.setCompValue('tf.frm.idpabrik', record.get('idpabrik'));
					RH.setCompValue('tf.frm.kdpabrik', record.get('kdpabrik'));
					RH.setCompValue('tf.frm.nmpabrik', record.get('nmpabrik'));
					RH.setCompValue('ta.frm.alamat', record.get('alamat'));
					RH.setCompValue('tf.frm.keterangan', record.get('keterangan'));
					//Ext.getCmp('tf.frm.kdpabrik').setReadOnly(true);
					return;
				}
			}
		}
		
		function fnSavePabrik(){
			var idForm = 'frm.pabrik';
			var sUrl = BASE_URL +'pabrik_controller/insert_pabrik';
			var sParams = new Object({
				idpabrik		:	RH.getCompValue('tf.frm.idpabrik'),
				kdpabrik		:	RH.getCompValue('tf.frm.kdpabrik'),
				nmpabrik		:	RH.getCompValue('tf.frm.nmpabrik'),
				alamat			:	RH.getCompValue('ta.frm.alamat'),
				keterangan		:	RH.getCompValue('tf.frm.keterangan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'pabrik_controller/update_pabrik';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wPabrik, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}
