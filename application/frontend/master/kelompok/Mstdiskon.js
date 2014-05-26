function Mstdiskon(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_stdiskon = dm_stdiskon();
	
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
		store: ds_stdiskon,
		displayInfo: true,
		displayMsg: 'Data Status Diskon Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stdiskon',
		store: ds_stdiskon,
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
				fnAddStdiskon();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstdiskon',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmstdiskon',
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
						fnEditStdiskon(grid, rowIndex);
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
						fnDeleteStdiskon(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Diskon', iconCls:'silk-calendar',
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
	
	function reloadStdiskon(){
		ds_stdiskon.reload();
	}
	
	function fnAddStdiskon(){
		var grid = grid_nya;
		wEntryStdiskon(false, grid, null);	
	}
	
	function fnEditStdiskon(grid, record){
		var record = ds_stdiskon.getAt(record);
		wEntryStdiskon(true, grid, record);		
	}
	
	function fnDeleteStdiskon(grid, record){
		var record = ds_stdiskon.getAt(record);
		var url = BASE_URL + 'stdiskon_controller/delete_stdiskon';
		var params = new Object({
						idstdiskon	: record.data['idstdiskon']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStdiskon(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Diskon (Edit)':'Status Diskon (Entry)';
	var stdiskon_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stdiskon',
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
            id: 'tf.frm.idstdiskon', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstdiskon', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstdiskon', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStdiskon();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStdiskon.close();
            }
        }]
    });
		
    var wStdiskon = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stdiskon_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStdiskonForm(isUpdate, record);
	wStdiskon.show();

/**
FORM FUNCTIONS
*/	
	function setStdiskonForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstdiskon'));
				RH.setCompValue('tf.frm.idstdiskon', record.get('idstdiskon'));
				RH.setCompValue('tf.frm.kdstdiskon', record.get('kdstdiskon'));
				RH.setCompValue('tf.frm.nmstdiskon', record.get('nmstdiskon'));
				return;
			}
		}
	}
	
	function fnSaveStdiskon(){
		var idForm = 'frm.stdiskon';
		var sUrl = BASE_URL +'stdiskon_controller/insert_stdiskon';
		var sParams = new Object({
			idstdiskon		:	RH.getCompValue('tf.frm.idstdiskon'),
			kdstdiskon		:	RH.getCompValue('tf.frm.kdstdiskon'),
			nmstdiskon		:	RH.getCompValue('tf.frm.nmstdiskon')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stdiskon_controller/update_stdiskon';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStdiskon, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}