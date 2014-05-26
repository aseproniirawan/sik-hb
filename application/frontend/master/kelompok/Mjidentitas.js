function Mjidentitas(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jidentitas = dm_jidentitas();
	
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
		store: ds_jidentitas,
		displayInfo: true,
		displayMsg: 'Data Jenis Identitas Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jidentitas',
		store: ds_jidentitas,
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
				fnAddJidentitas();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnsidentitas',
			sortable: true
		},
		{
			header: 'Jenis Identitas',
			width: 300,
			dataIndex: 'nmjnsidentitas',
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
						fnEditJidentitas(grid, rowIndex);
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
						fnDeleteJidentitas(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Identitas', iconCls:'silk-calendar',
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
	
	function reloadJidentitas(){
		ds_jidentitas.reload();
	}
	
	function fnAddJidentitas(){
		var grid = grid_nya;
		wEntryJidentitas(false, grid, null);	
	}
	
	function fnEditJidentitas(grid, record){
		var record = ds_jidentitas.getAt(record);
		wEntryJidentitas(true, grid, record);		
	}
	
	function fnDeleteJidentitas(grid, record){
		var record = ds_jidentitas.getAt(record);
		var url = BASE_URL + 'jidentitas_controller/delete_jnsidentitas';
		var params = new Object({
						idjnsidentitas	: record.data['idjnsidentitas']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJidentitas(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Identitas (Edit)':'Jenis Identitas (Entry)';
	var jidentitas_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jidentitas',
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
            id: 'tf.frm.idjnsidentitas', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnsidentitas', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnsidentitas', 
            fieldLabel: 'Jenis Identitas',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJidentitas();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJidentitas.close();
            }
        }]
    });
		
    var wJidentitas = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jidentitas_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJidentitasForm(isUpdate, record);
	wJidentitas.show();

/**
FORM FUNCTIONS
*/	
	function setJidentitasForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnsidentitas'));
				RH.setCompValue('tf.frm.idjnsidentitas', record.get('idjnsidentitas'));
				RH.setCompValue('tf.frm.kdjnsidentitas', record.get('kdjnsidentitas'));
				RH.setCompValue('tf.frm.nmjnsidentitas', record.get('nmjnsidentitas'));
				return;
			}
		}
	}
	
	function fnSaveJidentitas(){
		var idForm = 'frm.jidentitas';
		var sUrl = BASE_URL +'jidentitas_controller/insert_jnsidentitas';
		var sParams = new Object({
			idjnsidentitas		:	RH.getCompValue('tf.frm.idjnsidentitas'),
			kdjnsidentitas		:	RH.getCompValue('tf.frm.kdjnsidentitas'),
			nmjnsidentitas		:	RH.getCompValue('tf.frm.nmjnsidentitas'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jidentitas_controller/update_jnsidentitas';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJidentitas, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}