function Mjpembayaran(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jpembayaran = dm_jpembayaran();
	
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
		store: ds_jpembayaran,
		displayInfo: true,
		displayMsg: 'Data Jenis Pembayaran Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jpembayaran',
		store: ds_jpembayaran,
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
				fnAddJpembayaran();
				//Ext.getCmp('tf.frm.kdjnspembayaran').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnspembayaran',
			sortable: true
		},
		{
			header: 'Jenis Pembayaran',
			width: 300,
			dataIndex: 'nmjnspembayaran',
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
						fnEditJpembayaran(grid, rowIndex);
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
						fnDeleteJpembayaran(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Pembayaran', iconCls:'silk-calendar',
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
	
	function reloadJpembayaran(){
		ds_jpembayaran.reload();
	}
	
	function fnAddJpembayaran(){
		var grid = grid_nya;
		wEntryJpembayaran(false, grid, null);	
	}
	
	function fnEditJpembayaran(grid, record){
		var record = ds_jpembayaran.getAt(record);
		wEntryJpembayaran(true, grid, record);		
	}
	
	function fnDeleteJpembayaran(grid, record){
		var record = ds_jpembayaran.getAt(record);
		var url = BASE_URL + 'jpembayaran_controller/delete_jpembayaran';
		var params = new Object({
						idjnspembayaran	: record.data['idjnspembayaran']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJpembayaran(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Pembayaran (Edit)':'Jenis Pembayaran (Entry)';
	var jpembayaran_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jpembayaran',
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
            id: 'tf.frm.idjnspembayaran', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdjnspembayaran', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmjnspembayaran', 
            fieldLabel: 'Jenis Pembayaran',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJpembayaran();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJpembayaran.close();
            }
        }]
    });
		
    var wJpembayaran = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jpembayaran_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJpembayaranForm(isUpdate, record);
	wJpembayaran.show();

/**
FORM FUNCTIONS
*/	
	function setJpembayaranForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idJpembayaran'));
				RH.setCompValue('tf.frm.idjnspembayaran', record.get('idjnspembayaran'));
				RH.setCompValue('tf.frm.kdjnspembayaran', record.get('kdjnspembayaran'));
				RH.setCompValue('tf.frm.nmjnspembayaran', record.get('nmjnspembayaran'));
				//Ext.getCmp('tf.frm.kdjnspembayaran').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveJpembayaran(){
		var idForm = 'frm.jpembayaran';
		var sUrl = BASE_URL +'jpembayaran_controller/insert_jpembayaran';
		var sParams = new Object({
			idjnspembayaran		:	RH.getCompValue('tf.frm.idjnspembayaran'),
			kdjnspembayaran		:	RH.getCompValue('tf.frm.kdjnspembayaran'),
			nmjnspembayaran		:	RH.getCompValue('tf.frm.nmjnspembayaran'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jpembayaran_controller/update_jpembayaran';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJpembayaran, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}