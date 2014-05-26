function Mjbarang(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jnsbrg = dm_jnsbrg();
	
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
		store: ds_jnsbrg,
		displayInfo: true,
		displayMsg: 'Data Jenis Barang Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jnsbrg',
		store: ds_jnsbrg,
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
				fnAddJnsbrg();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnsbrg',
			sortable: true
		},
		{
			header: 'Jenis Barang',
			width: 300,
			dataIndex: 'nmjnsbrg',
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
						fnEditJnsbrg(grid, rowIndex);
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
						fnDeleteJnsbrg(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Barang', iconCls:'silk-calendar',
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
	
	function reloadJnsbrg(){
		ds_jnsbrg.reload();
	}
	
	function fnAddJnsbrg(){
		var grid = grid_nya;
		wEntryJnsbrg(false, grid, null);	
	}
	
	function fnEditJnsbrg(grid, record){
		var record = ds_jnsbrg.getAt(record);
		wEntryJnsbrg(true, grid, record);		
	}
	
	function fnDeleteJnsbrg(grid, record){
		var record = ds_jnsbrg.getAt(record);
		var url = BASE_URL + 'jbarang_controller/delete_jbarang';
		var params = new Object({
						idjnsbrg	: record.data['idjnsbrg']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJnsbrg(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Barang (Edit)':'Jenis Barang (Entry)';
	var jnsbrg_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jnsbrg',
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
            id: 'tf.frm.idjnsbrg', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnsbrg', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnsbrg', 
            fieldLabel: 'Jenis Barang',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJnsbrg();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJnsbrg.close();
            }
        }]
    });
		
    var wJnsbrg = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jnsbrg_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJnsbrgForm(isUpdate, record);
	wJnsbrg.show();

/**
FORM FUNCTIONS
*/	
	function setJnsbrgForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnsbrg'));
				RH.setCompValue('tf.frm.idjnsbrg', record.get('idjnsbrg'));
				RH.setCompValue('tf.frm.kdjnsbrg', record.get('kdjnsbrg'));
				RH.setCompValue('tf.frm.nmjnsbrg', record.get('nmjnsbrg'));
				return;
			}
		}
	}
	
	function fnSaveJnsbrg(){
		var idForm = 'frm.jnsbrg';
		var sUrl = BASE_URL +'jbarang_controller/insert_jbarang';
		var sParams = new Object({
			idjnsbrg		:	RH.getCompValue('tf.frm.idjnsbrg'),
			kdjnsbrg		:	RH.getCompValue('tf.frm.kdjnsbrg'),
			nmjnsbrg		:	RH.getCompValue('tf.frm.nmjnsbrg'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jbarang_controller/update_jbarang';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJnsbrg, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}