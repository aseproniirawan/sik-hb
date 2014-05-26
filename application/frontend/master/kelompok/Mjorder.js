function Mjorder(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jorder = dm_jorder();
	
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
		store: ds_jorder,
		displayInfo: true,
		displayMsg: 'Data Jenis Order Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jorder',
		store: ds_jorder,
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
				fnAddJorder();
				//Ext.getCmp('tf.frm.kdjnsorder').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnsorder',
			sortable: true
		},
		{
			header: 'Nama Order',
			width: 200,
			dataIndex: 'nmjnsorder',
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
						fnEditJorder(grid, rowIndex);
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
						fnDeleteJorder(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Order', iconCls:'silk-calendar',
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
	
	function reloadJorder(){
		ds_jorder.reload();
	}
	
	function fnAddJorder(){
		var grid = grid_nya;
		wEntryJorder(false, grid, null);	
	}
	
	function fnEditJorder(grid, record){
		var record = ds_jorder.getAt(record);
		wEntryJorder(true, grid, record);		
	}
	
	function fnDeleteJorder(grid, record){
		var record = ds_jorder.getAt(record);
		var url = BASE_URL + 'jorder_controller/delete_jorder';
		var params = new Object({
						idjnsorder	: record.data['idjnsorder']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJorder(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Order (Edit)':'Jenis Order (Entry)';
	var jorder_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jorder',
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
            id: 'tf.frm.idjnsorder', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdjnsorder', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmjnsorder', 
            fieldLabel: 'Jenis Order',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJorder();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJorder.close();
            }
        }]
    });
		
    var wJorder = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jorder_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJorderForm(isUpdate, record);
	wJorder.show();

/**
FORM FUNCTIONS
*/	
	function setJorderForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnsorder'));
				RH.setCompValue('tf.frm.idjnsorder', record.get('idjnsorder'));
				RH.setCompValue('tf.frm.kdjnsorder', record.get('kdjnsorder'));
				RH.setCompValue('tf.frm.nmjnsorder', record.get('nmjnsorder'));
				//Ext.getCmp('tf.frm.kdjnsorder').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveJorder(){
		var idForm = 'frm.jorder';
		var sUrl = BASE_URL +'jorder_controller/insert_jorder';
		var sParams = new Object({
			idjnsorder		:	RH.getCompValue('tf.frm.idjnsorder'),
			kdjnsorder		:	RH.getCompValue('tf.frm.kdjnsorder'),
			nmjnsorder		:	RH.getCompValue('tf.frm.nmjnsorder'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jorder_controller/update_jorder';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJorder, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}