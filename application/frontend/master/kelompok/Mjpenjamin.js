function Mjpenjamin(){
	var pageSize = 18;
	var ds_jpenjamin = dm_jpenjamin();
	
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
		store: ds_jpenjamin,
		displayInfo: true,
		displayMsg: 'Data Jenis Penjamin Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jpenjamin',
		store: ds_jpenjamin,
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
				fnAddJpenjamin();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnspenjamin',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmjnspenjamin',
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
						fnEditJpenjamin(grid, rowIndex);
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
						fnDeleteJpenjamin(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Penjamin', iconCls:'silk-calendar',
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
	
	function reloadJpenjamin(){
		ds_jpenjamin.reload();
	}
	
	function fnAddJpenjamin(){
		var grid = grid_nya;
		wEntryJpenjamin(false, grid, null);	
	}
	
	function fnEditJpenjamin(grid, record){
		var record = ds_jpenjamin.getAt(record);
		wEntryJpenjamin(true, grid, record);		
	}
	
	function fnDeleteJpenjamin(grid, record){
		var record = ds_jpenjamin.getAt(record);
		var url = BASE_URL + 'jpenjamin_controller/delete_jpenjamin';
		var params = new Object({
						idjnspenjamin	: record.data['idjnspenjamin']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJpenjamin(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Penjamin (Edit)':'Jenis Penjamin (Entry)';
	var jpenjamin_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jpenjamin',
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
            id: 'tf.frm.idjnspenjamin', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnspenjamin', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnspenjamin', 
            fieldLabel: 'Nama Penjamin',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJpenjamin();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJpenjamin.close();
            }
        }]
    });
		
    var wJpenjamin = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jpenjamin_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJpenjaminForm(isUpdate, record);
	wJpenjamin.show();

/**
FORM FUNCTIONS
*/	
	function setJpenjaminForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnspenjamin'));
				RH.setCompValue('tf.frm.idjnspenjamin', record.get('idjnspenjamin'));
				RH.setCompValue('tf.frm.kdjnspenjamin', record.get('kdjnspenjamin'));
				RH.setCompValue('tf.frm.nmjnspenjamin', record.get('nmjnspenjamin'));
				return;
			}
		}
	}
	
	function fnSaveJpenjamin(){
		var idForm = 'frm.jpenjamin';
		var sUrl = BASE_URL +'jpenjamin_controller/insert_jpenjamin';
		var sParams = new Object({
			idjnspenjamin		:	RH.getCompValue('tf.frm.idjnspenjamin'),
			kdjnspenjamin		:	RH.getCompValue('tf.frm.kdjnspenjamin'),
			nmjnspenjamin		:	RH.getCompValue('tf.frm.nmjnspenjamin'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jpenjamin_controller/update_jpenjamin';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJpenjamin, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}