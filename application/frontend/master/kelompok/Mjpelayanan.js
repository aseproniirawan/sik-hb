function Mjpelayanan(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
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
		store: ds_jpelayanan,
		displayInfo: true,
		displayMsg: 'Data Jenis Pelayanan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jpelayanan',
		store: ds_jpelayanan,
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
				fnAddJpelayanan();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnspelayanan',
			sortable: true
		},
		{
			header: 'Jenis Layanan',
			width: 300,
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
						fnEditJpelayanan(grid, rowIndex);
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
						fnDeleteJpelayanan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Pelayanan', iconCls:'silk-calendar',
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
	
	function reloadJpelayanan(){
		ds_jpelayanan.reload();
	}
	
	function fnAddJpelayanan(){
		var grid = grid_nya;
		wEntryJpelayanan(false, grid, null);	
	}
	
	function fnEditJpelayanan(grid, record){
		var record = ds_jpelayanan.getAt(record);
		wEntryJpelayanan(true, grid, record);		
	}
	
	function fnDeleteJpelayanan(grid, record){
		var record = ds_jpelayanan.getAt(record);
		var url = BASE_URL + 'jpelayanan_controller/delete_jpelayanan';
		var params = new Object({
						idjnspelayanan	: record.data['idjnspelayanan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJpelayanan(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Pelayanan (Edit)':'Jenis Pelayanan (Entry)';
	var jpelayanan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jpelayanan',
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
            id: 'tf.frm.idjnspelayanan', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnspelayanan', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnspelayanan', 
            fieldLabel: 'Jenis Layanan',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJpelayanan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJpelayanan.close();
            }
        }]
    });
		
    var wJpelayanan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jpelayanan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJpelayananForm(isUpdate, record);
	wJpelayanan.show();

/**
FORM FUNCTIONS
*/	
	function setJpelayananForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnspelayanan'));
				RH.setCompValue('tf.frm.idjnspelayanan', record.get('idjnspelayanan'));
				RH.setCompValue('tf.frm.kdjnspelayanan', record.get('kdjnspelayanan'));
				RH.setCompValue('tf.frm.nmjnspelayanan', record.get('nmjnspelayanan'));
				return;
			}
		}
	}
	
	function fnSaveJpelayanan(){
		var idForm = 'frm.jpelayanan';
		var sUrl = BASE_URL +'jpelayanan_controller/insert_jpelayanan';
		var sParams = new Object({
			idjnspelayanan		:	RH.getCompValue('tf.frm.idjnspelayanan'),
			kdjnspelayanan		:	RH.getCompValue('tf.frm.kdjnspelayanan'),
			nmjnspelayanan		:	RH.getCompValue('tf.frm.nmjnspelayanan'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jpelayanan_controller/update_jpelayanan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJpelayanan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}