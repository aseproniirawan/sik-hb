function Mstbypass(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 20;
	var ds_stbypass = dm_stbypass();
	
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
		store: ds_stbypass,
		displayInfo: true,
		displayMsg: 'Data Status By Pass Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stbypass',
		store: ds_stbypass,
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
				fnAddStbypass();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstbypass',
			sortable: true
		},
		{
			header: 'Status By Pass',
			width: 300,
			dataIndex: 'nmstbypass',
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
						fnEditStbypass(grid, rowIndex);
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
						fnDeleteStbypass(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status By Pass', iconCls:'silk-calendar',
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
	
	function reloadStbypass(){
		ds_stbypass.reload();
	}
	
	function fnAddStbypass(){
		var grid = grid_nya;
		wEntryStbypass(false, grid, null);	
	}
	
	function fnEditStbypass(grid, record){
		var record = ds_stbypass.getAt(record);
		wEntryStbypass(true, grid, record);		
	}
	
	function fnDeleteStbypass(grid, record){
		var record = ds_stbypass.getAt(record);
		var url = BASE_URL + 'stbypass_controller/delete_stbypass';
		var params = new Object({
						idstbypass	: record.data['idstbypass']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStbypass(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status By Pass (Edit)':'Status By Pass (Entry)';
	var stbypass_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stbypass',
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
            id: 'tf.frm.idstbypass', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstbypass', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstbypass', 
            fieldLabel: 'Status By Pass',
            width: 300,       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStbypass();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStbypass.close();
            }
        }]
    });
		
    var wStbypass = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stbypass_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStbypassForm(isUpdate, record);
	wStbypass.show();

/**
FORM FUNCTIONS
*/	
	function setStbypassForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstbypass'));
				RH.setCompValue('tf.frm.idstbypass', record.get('idstbypass'));
				RH.setCompValue('tf.frm.kdstbypass', record.get('kdstbypass'));
				RH.setCompValue('tf.frm.nmstbypass', record.get('nmstbypass'));
				return;
			}
		}
	}
	
	function fnSaveStbypass(){
		var idForm = 'frm.stbypass';
		var sUrl = BASE_URL +'stbypass_controller/insert_stbypass';
		var sParams = new Object({
			idstbypass		:	RH.getCompValue('tf.frm.idstbypass'),
			kdstbypass		:	RH.getCompValue('tf.frm.kdstbypass'),
			nmstbypass		:	RH.getCompValue('tf.frm.nmstbypass'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stbypass_controller/update_stbypass';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStbypass, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}