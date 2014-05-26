function Mstkeluar(){
	var pageSize = 18;
	var ds_stkeluar = dm_stkeluar();
	
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
		store: ds_stkeluar,
		displayInfo: true,
		displayMsg: 'Data Status Keluar Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stkeluar',
		store: ds_stkeluar,
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
				fnAddStkeluar();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstkeluar',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmstkeluar',
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
						fnEditStkeluar(grid, rowIndex);
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
						fnDeleteStkeluar(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Keluar', iconCls:'silk-calendar',
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
	
	function reloadStkeluar(){
		ds_stkeluar.reload();
	}
	
	function fnAddStkeluar(){
		var grid = grid_nya;
		wEntryStkeluar(false, grid, null);	
	}
	
	function fnEditStkeluar(grid, record){
		var record = ds_stkeluar.getAt(record);
		wEntryStkeluar(true, grid, record);		
	}
	
	function fnDeleteStkeluar(grid, record){
		var record = ds_stkeluar.getAt(record);
		var url = BASE_URL + 'stkeluar_controller/delete_stkeluar';
		var params = new Object({
						idstkeluar	: record.data['idstkeluar']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStkeluar(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Keluar (Edit)':'Status Keluar (Entry)';
	var stkeluar_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stkeluar',
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
            id: 'tf.frm.idstkeluar', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstkeluar', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstkeluar', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStkeluar();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStkeluar.close();
            }
        }]
    });
		
    var wStkeluar = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stkeluar_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStkeluarForm(isUpdate, record);
	wStkeluar.show();

/**
FORM FUNCTIONS
*/	
	function setStkeluarForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				RH.setCompValue('tf.frm.idstkeluar', record.get('idstkeluar'));
				RH.setCompValue('tf.frm.kdstkeluar', record.get('kdstkeluar'));
				RH.setCompValue('tf.frm.nmstkeluar', record.get('nmstkeluar'));
				return;
			}
		}
	}
	
	function fnSaveStkeluar(){
		var idForm = 'frm.stkeluar';
		var sUrl = BASE_URL +'stkeluar_controller/insert_stkeluar';
		var sParams = new Object({
			idstkeluar		:	RH.getCompValue('tf.frm.idstkeluar'),
			kdstkeluar		:	RH.getCompValue('tf.frm.kdstkeluar'),
			nmstkeluar		:	RH.getCompValue('tf.frm.nmstkeluar'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stkeluar_controller/update_stkeluar';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStkeluar, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}