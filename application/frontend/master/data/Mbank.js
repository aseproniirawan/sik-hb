function Mbank(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_bank = dm_bank();
	
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
		store: ds_bank,
		displayInfo: true,
		displayMsg: 'Data Bank Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_bank',
		store: ds_bank,
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
				fnAddBank();
				//Ext.getCmp('tf.frm.kdbank').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdbank',
			sortable: true
		},
		{
			header: 'Nama Bank',
			width: 300,
			dataIndex: 'nmbank',
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
						fnEditBank(grid, rowIndex);
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
						fnDeleteBank(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Bank', iconCls:'silk-calendar',
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
	
	function reloadBank(){
		ds_bank.reload();
	}
	
	function fnAddBank(){
		var grid = grid_nya;
		wEntryBank(false, grid, null);	
	}
	
	function fnEditBank(grid, record){
		var record = ds_bank.getAt(record);
		wEntryBank(true, grid, record);		
	}
	
	function fnDeleteBank(grid, record){
		var record = ds_bank.getAt(record);
		var url = BASE_URL + 'bank_controller/delete_bank';
		var params = new Object({
						idbank	: record.data['idbank']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function wEntryBank(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Bank (Edit)':'Bank (Entry)';
	var Bank_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.bank',
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
            id: 'tf.frm.idbank', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdbank', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmbank', 
            fieldLabel: 'Nama Bank',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveBank();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wBank.close();
            }
        }]
    });
		
    var wBank = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [Bank_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setBankForm(isUpdate, record);
	wBank.show();

/**
FORM FUNCTIONS
*/	
	function setBankForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idbank'));
				RH.setCompValue('tf.frm.idbank', record.get('idbank'));
				RH.setCompValue('tf.frm.kdbank', record.get('kdbank'));
				RH.setCompValue('tf.frm.nmbank', record.get('nmbank'));
				//Ext.getCmp('tf.frm.kdbank').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveBank(){
		var idForm = 'frm.bank';
		var sUrl = BASE_URL +'bank_controller/insert_bank';
		var sParams = new Object({
			idbank		:	RH.getCompValue('tf.frm.idbank'),
			kdbank		:	RH.getCompValue('tf.frm.kdbank'),
			nmbank		:	RH.getCompValue('tf.frm.nmbank'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'bank_controller/update_bank';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wBank, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}
}
