function Mhari(){
	var pageSize = 18;
	var ds_hari = dm_hari();
	
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
		store: ds_hari,
		displayInfo: true,
		displayMsg: 'Data Hari Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_hari',
		store: ds_hari,
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
				fnAddHari();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdhari',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmhari',
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
						fnEditHari(grid, rowIndex);
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
						fnDeleteHari(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Hari', iconCls:'silk-calendar',
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
	
	function reloadHari(){
		ds_hari.reload();
	}
	
	function fnAddHari(){
		var grid = grid_nya;
		wEntryHari(false, grid, null);	
	}
	
	function fnEditHari(grid, record){
		var record = ds_hari.getAt(record);
		wEntryHari(true, grid, record);		
	}
	
	function fnDeleteHari(grid, record){
		var record = ds_hari.getAt(record);
		var url = BASE_URL + 'hari_controller/delete_hari';
		var params = new Object({
						idhari	: record.data['idhari']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryHari(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Hari (Edit)':'Hari (Entry)';
	var hari_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.hari',
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
            id: 'tf.frm.idhari', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdhari', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmhari', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveHari();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wHari.close();
            }
        }]
    });
		
    var wHari = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [hari_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setHariForm(isUpdate, record);
	wHari.show();

/**
FORM FUNCTIONS
*/	
	function setHariForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idhari', record.get('idhari'));
				RH.setCompValue('tf.frm.kdhari', record.get('kdhari'));
				RH.setCompValue('tf.frm.nmhari', record.get('nmhari'));
				return;
			}
		}
	}
	
	function fnSaveHari(){
		var idForm = 'frm.hari';
		var sUrl = BASE_URL +'hari_controller/insert_hari';
		var sParams = new Object({
			idhari		:	RH.getCompValue('tf.frm.idhari'),
			kdhari		:	RH.getCompValue('tf.frm.kdhari'),
			nmhari		:	RH.getCompValue('tf.frm.nmhari'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'hari_controller/update_hari';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wHari, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}