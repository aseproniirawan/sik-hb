function Mjpenyakit(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jpenyakit = dm_jpenyakit();
	
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
		store: ds_jpenyakit,
		displayInfo: true,
		displayMsg: 'Data Jenis Penyakit Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jpenyakit',
		store: ds_jpenyakit,
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
				fnAddJpenyakit();
				//Ext.getCmp('tf.frm.kdjnspenyakit').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnspenyakit',
			sortable: true
		},
		{
			header: 'Jenis Penyakit',
			width: 300,
			dataIndex: 'nmjnspenyakit',
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
						fnEditJpenyakit(grid, rowIndex);
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
						fnDeleteJpenyakit(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Penyakit', iconCls:'silk-calendar',
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
	
	function reloadJpenyakit(){
		ds_jpenyakit.reload();
	}
	
	function fnAddJpenyakit(){
		var grid = grid_nya;
		wEntryJpenyakit(false, grid, null);	
	}
	
	function fnEditJpenyakit(grid, record){
		var record = ds_jpenyakit.getAt(record);
		wEntryJpenyakit(true, grid, record);		
	}
	
	function fnDeleteJpenyakit(grid, record){
		var record = ds_jpenyakit.getAt(record);
		var url = BASE_URL + 'jpenyakit_controller/delete_jpenyakit';
		var params = new Object({
						idjnspenyakit	: record.data['idjnspenyakit']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJpenyakit(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Penyakit (Edit)':'Jenis Penyakit (Entry)';
	var jpenyakit_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.Jpenyakit',
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
            id: 'tf.frm.idjnspenyakit', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdjnspenyakit', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmjnspenyakit', 
            fieldLabel: 'Jenis Penyakit',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJpenyakit();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJpenyakit.close();
            }
        }]
    });
		
    var wJpenyakit = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jpenyakit_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJpenyakitForm(isUpdate, record);
	wJpenyakit.show();

/**
FORM FUNCTIONS
*/	
	function setJpenyakitForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnspenyakit'));
				RH.setCompValue('tf.frm.idjnspenyakit', record.get('idjnspenyakit'));
				RH.setCompValue('tf.frm.kdjnspenyakit', record.get('kdjnspenyakit'));
				RH.setCompValue('tf.frm.nmjnspenyakit', record.get('nmjnspenyakit'));
				//Ext.getCmp('tf.frm.kdjnspenyakit').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveJpenyakit(){
		var idForm = 'frm.Jpenyakit';
		var sUrl = BASE_URL +'jpenyakit_controller/insert_jpenyakit';
		var sParams = new Object({
			idjnspenyakit		:	RH.getCompValue('tf.frm.idjnspenyakit'),
			kdjnspenyakit		:	RH.getCompValue('tf.frm.kdjnspenyakit'),
			nmjnspenyakit		:	RH.getCompValue('tf.frm.nmjnspenyakit'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jpenyakit_controller/update_jpenyakit';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJpenyakit, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}