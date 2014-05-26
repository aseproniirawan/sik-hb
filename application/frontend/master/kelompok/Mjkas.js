function Mjkas(){
	var pageSize = 18;
	var ds_jkas = dm_jkas();
        
        
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
		store: ds_jkas,
		displayInfo: true,
		displayMsg: 'Data Jenis Kas Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
       var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jkas',
		store: ds_jkas,
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
				fnAddJkas();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnskas',
			sortable: true
		},
		{
			header: 'Nama Jenis Kas',
			width: 300,
			dataIndex: 'nmjnskas',
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
						fnEditJkas(grid, rowIndex);
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
						fnDeleteJkas(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
        
        var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Kas', iconCls:'silk-calendar',
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
	
	function reloadJkas(){
		ds_jkas.reload();
	}
	
	function fnAddJkas(){
		var grid = grid_nya;
		wEntryJkas(false, grid, null);	
	}
	
	function fnEditJkas(grid, record){
		var record = ds_jkas.getAt(record);
		wEntryJkas(true, grid, record);		
	}
	
	function fnDeleteJkas(grid, record){
		var record = ds_jkas.getAt(record);
		var url = BASE_URL + 'jkas_controller/delete_jkas';
		var params = new Object({
						idjnskas	: record.data['idjnskas']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJkas(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jkas (Edit)':'Jkas (Entry)';
	var jkas_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jkas',
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
            id: 'tf.frm.idjnskas', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnskas', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnskas', 
            fieldLabel: 'Nama Jenis Kas',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJkas();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJkas.close();
            }
        }]
    });
		
    var wJkas = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jkas_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJkasForm(isUpdate, record);
	wJkas.show();

/**
FORM FUNCTIONS
*/	
	function setJkasForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				RH.setCompValue('tf.frm.idjnskas', record.get('idjnskas'));
				RH.setCompValue('tf.frm.kdjnskas', record.get('kdjnskas'));
				RH.setCompValue('tf.frm.nmjnskas', record.get('nmjnskas'));
				return;
			}
		}
	}
	
	function fnSaveJkas(){
		var idForm = 'frm.jkas';
		var sUrl = BASE_URL +'jkas_controller/insert_jkas';
		var sParams = new Object({
			idjnskas		:	RH.getCompValue('tf.frm.idjnskas'),
			kdjnskas		:	RH.getCompValue('tf.frm.kdjnskas'),
			nmjnskas		:	RH.getCompValue('tf.frm.nmjnskas'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jkas_controller/update_jkas';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJkas, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
			
}