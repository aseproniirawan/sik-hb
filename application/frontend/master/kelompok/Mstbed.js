function Mstbed(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_stbed = dm_stbed();
	
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
		store: ds_stbed,
		displayInfo: true,
		displayMsg: 'Data Status Bed Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stbed',
		store: ds_stbed,
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
				fnAddStbed();
				//Ext.getCmp('tf.frm.kdstbed').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstbed',
			sortable: true
		},
		{
			header: 'Status Bed',
			width: 300,
			dataIndex: 'nmstbed',
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
						fnEditStbed(grid, rowIndex);
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
						fnDeleteStbed(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Bed', iconCls:'silk-calendar',
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
	
	function reloadStbed(){
		ds_stbed.reload();
	}
	
	function fnAddStbed(){
		var grid = grid_nya;
		wEntryStbed(false, grid, null);	
	}
	
	function fnEditStbed(grid, record){
		var record = ds_stbed.getAt(record);
		wEntryStbed(true, grid, record);		
	}
	
	function fnDeleteStbed(grid, record){
		var record = ds_stbed.getAt(record);
		var url = BASE_URL + 'stbed_controller/delete_stbed';
		var params = new Object({
						idstbed	: record.data['idstbed']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStbed(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Bed (Edit)':'Status Bed (Entry)';
	var stbed_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stbed',
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
            id: 'tf.frm.idstbed', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdstbed', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmstbed', 
            fieldLabel: 'Status Bed',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStbed();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStbed.close();
            }
        }]
    });
		
    var wStbed = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stbed_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStbedForm(isUpdate, record);
	wStbed.show();

/**
FORM FUNCTIONS
*/	
	function setStbedForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idStbed'));
				RH.setCompValue('tf.frm.idstbed', record.get('idstbed'));
				RH.setCompValue('tf.frm.kdstbed', record.get('kdstbed'));
				RH.setCompValue('tf.frm.nmstbed', record.get('nmstbed'));
				//Ext.getCmp('tf.frm.kdstbed').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveStbed(){
		var idForm = 'frm.stbed';
		var sUrl = BASE_URL +'stbed_controller/insert_stbed';
		var sParams = new Object({
			idstbed		:	RH.getCompValue('tf.frm.idstbed'),
			kdstbed		:	RH.getCompValue('tf.frm.kdstbed'),
			nmstbed		:	RH.getCompValue('tf.frm.nmstbed'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stbed_controller/update_stbed';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStbed, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}