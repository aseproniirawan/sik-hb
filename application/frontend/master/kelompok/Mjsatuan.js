function Mjsatuan(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jsatuan = dm_jsatuan();
	
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
		store: ds_jsatuan,
		displayInfo: true,
		displayMsg: 'Data Satuan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jsatuan',
		store: ds_jsatuan,
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
				fnAddJsatuan();
				//Ext.getCmp('tf.frm.kdsatuan').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdsatuan',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmsatuan',
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
						fnEditJsatuan(grid, rowIndex);
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
						fnDeleteJsatuan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Satuan', iconCls:'silk-calendar',
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
	
	function reloadJsatuan(){
		ds_jsatuan.reload();
	}
	
	function fnAddJsatuan(){
		var grid = grid_nya;
		wEntryJsatuan(false, grid, null);	
	}
	
	function fnEditJsatuan(grid, record){
		var record = ds_jsatuan.getAt(record);
		wEntryJsatuan(true, grid, record);		
	}
	
	function fnDeleteJsatuan(grid, record){
		var record = ds_jsatuan.getAt(record);
		var url = BASE_URL + 'Jsatuan_controller/delete_jsatuan';
		var params = new Object({
						idsatuan	: record.data['idsatuan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJsatuan(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Satuan (Edit)':'Satuan (Entry)';
	var jsatuan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jsatuan',
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
            id: 'tf.frm.idsatuan', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdsatuan', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmsatuan', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJsatuan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJsatuan.close();
            }
        }]
    });
		
    var wJsatuan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jsatuan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJsatuanForm(isUpdate, record);
	wJsatuan.show();

/**
FORM FUNCTIONS
*/	
	function setJsatuanForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idJsatuan'));
				RH.setCompValue('tf.frm.idsatuan', record.get('idsatuan'));
				RH.setCompValue('tf.frm.kdsatuan', record.get('kdsatuan'));
				RH.setCompValue('tf.frm.nmsatuan', record.get('nmsatuan'));
				//Ext.getCmp('tf.frm.kdsatuan').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveJsatuan(){
		var idForm = 'frm.jsatuan';
		var sUrl = BASE_URL +'Jsatuan_controller/insert_jsatuan';
		var sParams = new Object({
			idsatuan		:	RH.getCompValue('tf.frm.idsatuan'),
			kdsatuan		:	RH.getCompValue('tf.frm.kdsatuan'),
			nmsatuan		:	RH.getCompValue('tf.frm.nmsatuan'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'Jsatuan_controller/update_jsatuan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJsatuan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}