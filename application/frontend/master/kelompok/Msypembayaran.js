function Msypembayaran(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_sypembayaran = dm_sypembayaran();
	
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
		store: ds_sypembayaran,
		displayInfo: true,
		displayMsg: 'Data Syarat Pembayaran Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_sypembayaran',
		store: ds_sypembayaran,
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
				fnAddSypembayaran();
				//Ext.getCmp('tf.frm.kdsypembayaran').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdsypembayaran',
			sortable: true
		},
		{
			header: 'Syarat Pembayaran',
			width: 200,
			dataIndex: 'nmsypembayaran',
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
						fnEditSypembayaran(grid, rowIndex);
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
						fnDeleteSypembayaran(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Syarat Pembayaran', iconCls:'silk-calendar',
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
	
	function reloadSypembayaran(){
		ds_sypembayaran.reload();
	}
	
	function fnAddSypembayaran(){
		var grid = grid_nya;
		wEntrySypembayaran(false, grid, null);	
	}
	
	function fnEditSypembayaran(grid, record){
		var record = ds_sypembayaran.getAt(record);
		wEntrySypembayaran(true, grid, record);		
	}
	
	function fnDeleteSypembayaran(grid, record){
		var record = ds_sypembayaran.getAt(record);
		var url = BASE_URL + 'sypembayaran_controller/delete_sypembayaran';
		var params = new Object({
						idsypembayaran	: record.data['idsypembayaran']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntrySypembayaran(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Syarat Pembayaran (Edit)':'Syarat Pembayaran (Entry)';
	var sypembayaran_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.sypembayaran',
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
            id: 'tf.frm.idsypembayaran', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdsypembayaran', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmsypembayaran', 
            fieldLabel: 'Syarat Pembayaran',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveSypembayaran();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wSypembayaran.close();
            }
        }]
    });
		
    var wSypembayaran = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [sypembayaran_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setSypembayaranForm(isUpdate, record);
	wSypembayaran.show();

/**
FORM FUNCTIONS
*/	
	function setSypembayaranForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idSypembayaran'));
				RH.setCompValue('tf.frm.idsypembayaran', record.get('idsypembayaran'));
				RH.setCompValue('tf.frm.kdsypembayaran', record.get('kdsypembayaran'));
				RH.setCompValue('tf.frm.nmsypembayaran', record.get('nmsypembayaran'));
				//Ext.getCmp('tf.frm.kdsypembayaran').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveSypembayaran(){
		var idForm = 'frm.sypembayaran';
		var sUrl = BASE_URL +'sypembayaran_controller/insert_sypembayaran';
		var sParams = new Object({
			idsypembayaran		:	RH.getCompValue('tf.frm.idsypembayaran'),
			kdsypembayaran		:	RH.getCompValue('tf.frm.kdsypembayaran'),
			nmsypembayaran		:	RH.getCompValue('tf.frm.nmsypembayaran'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'sypembayaran_controller/update_sypembayaran';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wSypembayaran, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}