function Mloket(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_loket = dm_loket();
	
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
		store: ds_loket,
		displayInfo: true,
		displayMsg: 'Data Loket Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_loket',
		store: ds_loket,
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
				fnAddLoket();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdloket',
			sortable: true
		},
		{
			header: 'Nama',
			width: 250,
			dataIndex: 'nmloket',
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
						fnEditLoket(grid, rowIndex);
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
						fnDeleteLoket(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Loket', iconCls:'silk-calendar',
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
	
	function reloadLoket(){
		ds_loket.reload();
	}
	
	function fnAddLoket(){
		var grid = grid_nya;
		wEntryLoket(false, grid, null);	
	}
	
	function fnEditLoket(grid, record){
		var record = ds_loket.getAt(record);
		wEntryLoket(true, grid, record);		
	}
	
	function fnDeleteLoket(grid, record){
		var record = ds_loket.getAt(record);
		var url = BASE_URL + 'loket_controller/delete_loket';
		var params = new Object({
						idloket	: record.data['idloket']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryLoket(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Loket (Edit)':'Loket (Entry)';
	var loket_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.loket',
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
            id: 'tf.frm.idloket', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdloket', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmloket', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveLoket();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wLoket.close();
            }
        }]
    });
		
    var wLoket = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [loket_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setLoketForm(isUpdate, record);
	wLoket.show();

/**
FORM FUNCTIONS
*/	
	function setLoketForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idloket'));
				RH.setCompValue('tf.frm.idloket', record.get('idloket'));
				RH.setCompValue('tf.frm.kdloket', record.get('kdloket'));
				RH.setCompValue('tf.frm.nmloket', record.get('nmloket'));
				return;
			}
		}
	}
	
	function fnSaveLoket(){
		var idForm = 'frm.loket';
		var sUrl = BASE_URL +'loket_controller/insert_loket';
		var sParams = new Object({
			idloket		:	RH.getCompValue('tf.frm.idloket'),
			kdloket		:	RH.getCompValue('tf.frm.kdloket'),
			nmloket		:	RH.getCompValue('tf.frm.nmloket')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'loket_controller/update_loket';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wLoket, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}