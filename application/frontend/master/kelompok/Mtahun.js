function Mtahun(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 20;
	var ds_tahun = dm_tahun();
	
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
		store: ds_tahun,
		displayInfo: true,
		displayMsg: 'Data Tahun Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_tahun',
		store: ds_tahun,
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
				fnAddTahun();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Tahun',
			width: 200,
			dataIndex: 'tahun',
			sortable: true
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
						fnDeleteTahun(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Tahun', iconCls:'silk-calendar',
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
	
	function reloadTahun(){
		ds_tahun.reload();
	}
	
	function fnAddTahun(){
		var grid = grid_nya;
		wEntryTahun(false, grid, null);	
	}
	
	function fnEditTahun(grid, record){
		var record = ds_tahun.getAt(record);
		wEntryTahun(true, grid, record);		
	}
	
	function fnDeleteTahun(grid, record){
		var record = ds_tahun.getAt(record);
		var url = BASE_URL + 'tahun_controller/delete_tahun';
		var params = new Object({
						tahun	: record.data['tahun']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryTahun(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Tahun (Edit)':'Tahun (Entry)';
	var tahun_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.tahun',
        buttonAlign: 'left',
		labelWidth: 100, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 150, width: 350,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [    
		{
            id: 'tf.frm.tahun', 
            fieldLabel: 'Tahun',
            width: 150, allowBlank: false
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveTahun();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wTahun.close();
            }
        }]
    });
		
    var wTahun = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [tahun_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setTahunForm(isUpdate, record);
	wTahun.show();

/**
FORM FUNCTIONS
*/	
	function setTahunForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				return;
			}
		}
	}
	
	function fnSaveTahun(){
		var idForm = 'frm.tahun';
		var sUrl = BASE_URL +'tahun_controller/insert_tahun';
		var sParams = new Object({
			tahun		:	RH.getCompValue('tf.frm.tahun')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'tahun_controller/update_tahun';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wTahun, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}