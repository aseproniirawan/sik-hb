function Mjkelamin(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jkelamin = dm_jkelamin();
	
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
		store: ds_jkelamin,
		displayInfo: true,
		displayMsg: 'Data Jenis Kelamin Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jkelamin',
		store: ds_jkelamin,
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
				fnAddJkelamin();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnskelamin',
			sortable: true
		},
		{
			header: 'Jenis Kelamin',
			width: 200,
			dataIndex: 'nmjnskelamin',
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
						fnEditJkelamin(grid, rowIndex);
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
						fnDeleteJkelamin(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Kelamin', iconCls:'silk-calendar',
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
	
	function reloadJkelamin(){
		ds_jkelamin.reload();
	}
	
	function fnAddJkelamin(){
		var grid = grid_nya;
		wEntryJkelamin(false, grid, null);	
	}
	
	function fnEditJkelamin(grid, record){
		var record = ds_jkelamin.getAt(record);
		wEntryJkelamin(true, grid, record);		
	}
	
	function fnDeleteJkelamin(grid, record){
		var record = ds_jkelamin.getAt(record);
		var url = BASE_URL + 'jkelamin_controller/delete_jnskelamin';
		var params = new Object({
						idjnskelamin	: record.data['idjnskelamin']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJkelamin(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Kelamin (Edit)':'Jenis Kelamin (Entry)';
	var jkelamin_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jkelamin',
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
            id: 'tf.frm.idjnskelamin', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnskelamin', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnskelamin', 
            fieldLabel: 'Jenis Kelamin',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJkelamin();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJkelamin.close();
            }
        }]
    });
		
    var wJkelamin = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jkelamin_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJkelaminForm(isUpdate, record);
	wJkelamin.show();

/**
FORM FUNCTIONS
*/	
	function setJkelaminForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnskelamin'));
				RH.setCompValue('tf.frm.idjnskelamin', record.get('idjnskelamin'));
				RH.setCompValue('tf.frm.kdjnskelamin', record.get('kdjnskelamin'));
				RH.setCompValue('tf.frm.nmjnskelamin', record.get('nmjnskelamin'));
				return;
			}
		}
	}
	
	function fnSaveJkelamin(){
		var idForm = 'frm.jkelamin';
		var sUrl = BASE_URL +'jkelamin_controller/insert_jnskelamin';
		var sParams = new Object({
			idjnskelamin		:	RH.getCompValue('tf.frm.idjnskelamin'),
			kdjnskelamin		:	RH.getCompValue('tf.frm.kdjnskelamin'),
			nmjnskelamin		:	RH.getCompValue('tf.frm.nmjnskelamin'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jkelamin_controller/update_jnskelamin';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJkelamin, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}