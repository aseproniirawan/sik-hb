function Mextrabed(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_extrabed = dm_extrabed();
	
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
		store: ds_extrabed,
		displayInfo: true,
		displayMsg: 'Data Extra Bed Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_extrabed',
		store: ds_extrabed,
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
				fnAddExtrabed();
				//Ext.getCmp('tf.frm.kdextrabed').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdextrabed',
			sortable: true
		},
		{
			header: 'Extra Bed',
			width: 200,
			dataIndex: 'nmextrabed',
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
						fnEditExtrabed(grid, rowIndex);
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
						fnDeleteExtrabed(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Extra Bed', iconCls:'silk-calendar',
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
	
	function reloadExtrabed(){
		ds_extrabed.reload();
	}
	
	function fnAddExtrabed(){
		var grid = grid_nya;
		wEntryExtrabed(false, grid, null);	
	}
	
	function fnEditExtrabed(grid, record){
		var record = ds_extrabed.getAt(record);
		wEntryExtrabed(true, grid, record);		
	}
	
	function fnDeleteExtrabed(grid, record){
		var record = ds_extrabed.getAt(record);
		var url = BASE_URL + 'extrabed_controller/delete_extrabed';
		var params = new Object({
						idextrabed	: record.data['idextrabed']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryExtrabed(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Extra Bed (Edit)':'Extra Bed (Entry)';
	var extrabed_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.extrabed',
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
            id: 'tf.frm.idextrabed', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdextrabed', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmextrabed', 
            fieldLabel: 'Extra Bed',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveExtrabed();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wExtrabed.close();
            }
        }]
    });
		
    var wExtrabed = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [extrabed_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setExtrabedForm(isUpdate, record);
	wExtrabed.show();

/**
FORM FUNCTIONS
*/	
	function setExtrabedForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idExtrabed'));
				RH.setCompValue('tf.frm.idextrabed', record.get('idextrabed'));
				RH.setCompValue('tf.frm.kdextrabed', record.get('kdextrabed'));
				RH.setCompValue('tf.frm.nmextrabed', record.get('nmextrabed'));
				//Ext.getCmp('tf.frm.kdextrabed').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveExtrabed(){
		var idForm = 'frm.extrabed';
		var sUrl = BASE_URL +'extrabed_controller/insert_extrabed';
		var sParams = new Object({
			idextrabed		:	RH.getCompValue('tf.frm.idextrabed'),
			kdextrabed		:	RH.getCompValue('tf.frm.kdextrabed'),
			nmextrabed		:	RH.getCompValue('tf.frm.nmextrabed'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'extrabed_controller/update_extrabed';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wExtrabed, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}