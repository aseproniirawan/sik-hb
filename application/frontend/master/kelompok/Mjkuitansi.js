function Mjkuitansi(){
	var pageSize = 18;
	var ds_jkuitansi = dm_jkuitansi();
	var ds_jkas = dm_jkas();
        
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
		store: ds_jkuitansi,
		displayInfo: true,
		displayMsg: 'Data Jenis Kuitansi Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
       var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jkuitansi',
		store: ds_jkuitansi,
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
				fnAddJkuitansi();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnskuitansi',
			sortable: true
		},
		{
			header: 'Nama Jenis Kuitansi',
			width: 300,
			dataIndex: 'nmjnskuitansi',
			sortable: true
		},
		{
			header: 'Jenis Kas',
			width: 150,
			dataIndex: 'nmjnskas',
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
						fnEditJkuitansi(grid, rowIndex);
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
						fnDeleteJkuitansi(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
        
        var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Kuitansi', iconCls:'silk-calendar',
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
	
	function reloadJkuitansi(){
		ds_jkuitansi.reload();
	}
	
	function fnAddJkuitansi(){
		var grid = grid_nya;
		wEntryJkuitansi(false, grid, null);	
	}
	
	function fnEditJkuitansi(grid, record){
		var record = ds_jkuitansi.getAt(record);
		wEntryJkuitansi(true, grid, record);		
	}
	
	function fnDeleteJkuitansi(grid, record){
		var record = ds_jkuitansi.getAt(record);
		var url = BASE_URL + 'jkuitansi_controller/delete_jkuitansi';
		var params = new Object({
						idjnskuitansi	: record.data['idjnskuitansi']
					});
		RH.deleteGridRecord(url, params, grid );
	}

	function wEntryJkuitansi(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Jkuitansi (Edit)':'Jkuitansi (Entry)';
		var jkuitansi_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.Jkuitansi',
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
				id: 'tf.frm.idjnskuitansi', 
				hidden: true,
			},    
			{
				id: 'tf.frm.kdjnskuitansi', 
				fieldLabel: 'Kode',
				width: 150,
			},{
				id: 'tf.frm.nmjnskuitansi', 
				fieldLabel: 'Nama Jenis Kuitansi',
				width: 300,     
			},{
				xtype: 'combo',
				fieldLabel: 'Jenis Kas',
				id: 'cb.frm.jkas',
				store: ds_jkas,
				triggerAction: 'all',
				valueField: 'idjnskas',
				displayField: 'nmjnskas',
				forceSelection: true,
				submitValue: true,
				mode: 'local',
				emptyText:'Pilih...',
				width: 150,
				editable: false,
				allowBlank: false
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveJkuitansi();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wJkuitansi.close();
				}
			}]
		});
			
		var wJkuitansi = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [jkuitansi_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setJkuitansiForm(isUpdate, record);
		wJkuitansi.show();

	/**
	FORM FUNCTIONS
	*/	
		function setJkuitansiForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.frm.idjnskuitansi', record.get('idjnskuitansi'));
					RH.setCompValue('tf.frm.kdjnskuitansi', record.get('kdjnskuitansi'));
					RH.setCompValue('tf.frm.nmjnskuitansi', record.get('nmjnskuitansi'));
					RH.setCompValue('cb.frm.jkas', record.get('idjnskas'));
					return;
				}
			}
		}
		
		function fnSaveJkuitansi(){
			var idForm = 'frm.Jkuitansi';
			var sUrl = BASE_URL +'jkuitansi_controller/insert_jkuitansi';
			var sParams = new Object({
				idjnskuitansi		:	RH.getCompValue('tf.frm.idjnskuitansi'),
				kdjnskuitansi		:	RH.getCompValue('tf.frm.kdjnskuitansi'),
				nmjnskuitansi		:	RH.getCompValue('tf.frm.nmjnskuitansi'),
				idjnskas			:	RH.getCompValue('cb.frm.jkas'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'jkuitansi_controller/update_jkuitansi';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wJkuitansi, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}	
	}
}