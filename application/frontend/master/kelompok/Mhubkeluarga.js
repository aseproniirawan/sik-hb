function Mhubkeluarga(){
	var pageSize = 18;
	var ds_hubkeluarga = dm_hubkeluarga();
	
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
		store: ds_hubkeluarga,
		displayInfo: true,
		displayMsg: 'Data Hubungan Keluarga Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_hubkeluarga',
		store: ds_hubkeluarga,
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
				fnAddHubkeluarga();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdhubkeluarga',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmhubkeluarga',
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
						fnEditHubkeluarga(grid, rowIndex);
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
						fnDeleteHubkeluarga(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Hubungan Keluarga', iconCls:'silk-calendar',
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
	
	function reloadHubkeluarga(){
		ds_hubkeluarga.reload();
	}
	
	function fnAddHubkeluarga(){
		var grid = grid_nya;
		wEntryHubkeluarga(false, grid, null);	
	}
	
	function fnEditHubkeluarga(grid, record){
		var record = ds_hubkeluarga.getAt(record);
		wEntryHubkeluarga(true, grid, record);		
	}
	
	function fnDeleteHubkeluarga(grid, record){
		var record = ds_hubkeluarga.getAt(record);
		var url = BASE_URL + 'hubkeluarga_controller/delete_hubkeluarga';
		var params = new Object({
						idhubkeluarga	: record.data['idhubkeluarga']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryHubkeluarga(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Hubungan Keluarga (Edit)':'Hubungan Keluarga (Entry)';
	var hubkeluarga_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.hubkeluarga',
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
            id: 'tf.frm.idhubkeluarga', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdhubkeluarga', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmhubkeluarga', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveHubkeluarga();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wHubkeluarga.close();
            }
        }]
    });
		
    var wHubkeluarga = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [hubkeluarga_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setHubkeluargaForm(isUpdate, record);
	wHubkeluarga.show();

/**
FORM FUNCTIONS
*/	
	function setHubkeluargaForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhubkeluarga'));
				RH.setCompValue('tf.frm.idhubkeluarga', record.get('idhubkeluarga'));
				RH.setCompValue('tf.frm.kdhubkeluarga', record.get('kdhubkeluarga'));
				RH.setCompValue('tf.frm.nmhubkeluarga', record.get('nmhubkeluarga'));
				return;
			}
		}
	}
	
	function fnSaveHubkeluarga(){
		var idForm = 'frm.hubkeluarga';
		var sUrl = BASE_URL +'hubkeluarga_controller/insert_hubkeluarga';
		var sParams = new Object({
			idhubkeluarga		:	RH.getCompValue('tf.frm.idhubkeluarga'),
			kdhubkeluarga		:	RH.getCompValue('tf.frm.kdhubkeluarga'),
			nmhubkeluarga		:	RH.getCompValue('tf.frm.nmhubkeluarga'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'hubkeluarga_controller/update_hubkeluarga';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wHubkeluarga, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}