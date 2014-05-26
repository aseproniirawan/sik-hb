function Mjlibur(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jlibur = dm_jlibur();
	
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
		store: ds_jlibur,
		displayInfo: true,
		displayMsg: 'Data Jenis Libur Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jlibur',
		store: ds_jlibur,
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
				fnAddJlibur();
				//Ext.getCmp('tf.frm.kdjnslibur').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnslibur',
			sortable: true
		},
		{
			header: 'Jenis Libur',
			width: 300,
			dataIndex: 'nmjnslibur',
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
						fnEditJlibur(grid, rowIndex);
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
						fnDeleteJlibur(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Libur', iconCls:'silk-calendar',
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
	
	function reloadJlibur(){
		ds_jlibur.reload();
	}
	
	function fnAddJlibur(){
		var grid = grid_nya;
		wEntryJlibur(false, grid, null);	
	}
	
	function fnEditJlibur(grid, record){
		var record = ds_jlibur.getAt(record);
		wEntryJlibur(true, grid, record);		
	}
	
	function fnDeleteJlibur(grid, record){
		var record = ds_jlibur.getAt(record);
		var url = BASE_URL + 'jlibur_controller/delete_jlibur';
		var params = new Object({
						idjnslibur	: record.data['idjnslibur']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJlibur(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Libur (Edit)':'Jenis Libur (Entry)';
	var jlibur_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jlibur',
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
            id: 'tf.frm.idjnslibur', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdjnslibur', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmjnslibur', 
            fieldLabel: 'Jenis Libur',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJlibur();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJlibur.close();
            }
        }]
    });
		
    var wJlibur = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jlibur_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJliburForm(isUpdate, record);
	wJlibur.show();

/**
FORM FUNCTIONS
*/	
	function setJliburForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idJlibur'));
				RH.setCompValue('tf.frm.idjnslibur', record.get('idjnslibur'));
				RH.setCompValue('tf.frm.kdjnslibur', record.get('kdjnslibur'));
				RH.setCompValue('tf.frm.nmjnslibur', record.get('nmjnslibur'));
				//Ext.getCmp('tf.frm.kdjnslibur').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveJlibur(){
		var idForm = 'frm.jlibur';
		var sUrl = BASE_URL +'jlibur_controller/insert_jlibur';
		var sParams = new Object({
			idjnslibur		:	RH.getCompValue('tf.frm.idjnslibur'),
			kdjnslibur		:	RH.getCompValue('tf.frm.kdjnslibur'),
			nmjnslibur		:	RH.getCompValue('tf.frm.nmjnslibur'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jlibur_controller/update_jlibur';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJlibur, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}