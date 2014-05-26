function Mkebangsaan(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_kebangsaan = dm_kebangsaan();
	
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
		store: ds_kebangsaan,
		displayInfo: true,
		displayMsg: 'Data Kebangsaan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_kebangsaan',
		store: ds_kebangsaan,
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
				fnAddKebangsaan();
				//Ext.getCmp('tf.frm.kdkebangsaan').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdkebangsaan',
			sortable: true
		},
		{
			header: 'Kebangsaan',
			width: 300,
			dataIndex: 'nmkebangsaan',
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
						fnEditKebangsaan(grid, rowIndex);
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
						fnDeleteKebangsaan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Kebangsaan', iconCls:'silk-calendar',
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
	
	function reloadKebangsaan(){
		ds_kebangsaan.reload();
	}
	
	function fnAddKebangsaan(){
		var grid = grid_nya;
		wEntryKebangsaan(false, grid, null);	
	}
	
	function fnEditKebangsaan(grid, record){
		var record = ds_kebangsaan.getAt(record);
		wEntryKebangsaan(true, grid, record);		
	}
	
	function fnDeleteKebangsaan(grid, record){
		var record = ds_kebangsaan.getAt(record);
		var url = BASE_URL + 'kebangsaan_controller/delete_kebangsaan';
		var params = new Object({
						idkebangsaan	: record.data['idkebangsaan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryKebangsaan(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Kebangsaan (Edit)':'Kebangsaan (Entry)';
	var kebangsaan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.kebangsaan',
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
            id: 'tf.frm.idkebangsaan', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdkebangsaan', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmkebangsaan', 
            fieldLabel: 'Kebangsaan',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveKebangsaan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wKebangsaan.close();
            }
        }]
    });
		
    var wKebangsaan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [kebangsaan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setKebangsaanForm(isUpdate, record);
	wKebangsaan.show();

/**
FORM FUNCTIONS
*/	
	function setKebangsaanForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idkebangsaan'));
				RH.setCompValue('tf.frm.idkebangsaan', record.get('idkebangsaan'));
				RH.setCompValue('tf.frm.kdkebangsaan', record.get('kdkebangsaan'));
				RH.setCompValue('tf.frm.nmkebangsaan', record.get('nmkebangsaan'));
				//Ext.getCmp('tf.frm.kdkebangsaan').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveKebangsaan(){
		var idForm = 'frm.kebangsaan';
		var sUrl = BASE_URL +'kebangsaan_controller/insert_kebangsaan';
		var sParams = new Object({
			idkebangsaan		:	RH.getCompValue('tf.frm.idkebangsaan'),
			kdkebangsaan		:	RH.getCompValue('tf.frm.kdkebangsaan'),
			nmkebangsaan		:	RH.getCompValue('tf.frm.nmkebangsaan'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'kebangsaan_controller/update_kebangsaan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wKebangsaan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}