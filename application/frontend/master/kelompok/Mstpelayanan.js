function Mstpelayanan(){
	var pageSize = 18;
	var ds_stpelayanan = dm_stpelayanan();
	
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
		store: ds_stpelayanan,
		displayInfo: true,
		displayMsg: 'Data Status Pelayanan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stpelayanan',
		store: ds_stpelayanan,
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
				fnAddStpelayanan();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstpelayanan',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmstpelayanan',
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
						fnEditStpelayanan(grid, rowIndex);
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
						fnDeleteStpelayanan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Pelayanan', iconCls:'silk-calendar',
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
	
	function reloadStpelayanan(){
		ds_stpelayanan.reload();
	}
	
	function fnAddStpelayanan(){
		var grid = grid_nya;
		wEntryStpelayanan(false, grid, null);	
	}
	
	function fnEditStpelayanan(grid, record){
		var record = ds_stpelayanan.getAt(record);
		wEntryStpelayanan(true, grid, record);		
	}
	
	function fnDeleteStpelayanan(grid, record){
		var record = ds_stpelayanan.getAt(record);
		var url = BASE_URL + 'stpelayanan_controller/delete_stpelayanan';
		var params = new Object({
						idstpelayanan	: record.data['idstpelayanan']
					});
		RH.deleteGridRecord(url, params, grid );
	}

	function wEntryStpelayanan(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Status Pelayanan (Edit)':'Status Pelayanan (Entry)';
		var Stpelayanan_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.stpelayanan',
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
				id: 'tf.frm.idstpelayanan', 
				hidden: true,
			},    
			{
				id: 'tf.frm.kdstpelayanan', 
				fieldLabel: 'Kode',
				width: 150, allowBlank: false,
			},{
				id: 'tf.frm.nmstpelayanan', 
				fieldLabel: 'Nama',
				width: 300, allowBlank: false,        
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveStpelayanan();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wStpelayanan.close();
				}
			}]
		});
			
		var wStpelayanan = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [Stpelayanan_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setStpelayananForm(isUpdate, record);
		wStpelayanan.show();

	/**
	FORM FUNCTIONS
	*/	
		function setStpelayananForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.frm.idstpelayanan', record.get('idstpelayanan'));
					RH.setCompValue('tf.frm.kdstpelayanan', record.get('kdstpelayanan'));
					RH.setCompValue('tf.frm.nmstpelayanan', record.get('nmstpelayanan'));
					return;
				}
			}
		}
		
		function fnSaveStpelayanan(){
			var idForm = 'frm.stpelayanan';
			var sUrl = BASE_URL +'stpelayanan_controller/insert_stpelayanan';
			var sParams = new Object({
				idstpelayanan		:	RH.getCompValue('tf.frm.idstpelayanan'),
				kdstpelayanan		:	RH.getCompValue('tf.frm.kdstpelayanan'),
				nmstpelayanan		:	RH.getCompValue('tf.frm.nmstpelayanan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'stpelayanan_controller/update_stpelayanan';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wStpelayanan, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}