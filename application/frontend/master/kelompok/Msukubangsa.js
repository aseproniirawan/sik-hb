function Msukubangsa(){
	var pageSize = 18;
	var ds_sukubangsa = dm_sukubangsa();
	
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
		store: ds_sukubangsa,
		displayInfo: true,
		displayMsg: 'Data Suku Bangsa Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_sukubangsa',
		store: ds_sukubangsa,
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
				fnAddSukubangsa();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdsukubangsa',
			sortable: true
		},
		{
			header: 'Nama Suku Bangsa',
			width: 300,
			dataIndex: 'nmsukubangsa',
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
						fnEditSukubangsa(grid, rowIndex);
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
						fnDeleteSukubangsa(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Suku Bangsa', iconCls:'silk-calendar',
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
	
	function reloadSukubangsa(){
		ds_sukubangsa.reload();
	}
	
	function fnAddSukubangsa(){
		var grid = grid_nya;
		wEntrySukubangsa(false, grid, null);	
	}
	
	function fnEditSukubangsa(grid, record){
		var record = ds_sukubangsa.getAt(record);
		wEntrySukubangsa(true, grid, record);		
	}
	
	function fnDeleteSukubangsa(grid, record){
		var record = ds_sukubangsa.getAt(record);
		var url = BASE_URL + 'sukubangsa_controller/delete_sukubangsa';
		var params = new Object({
						idsukubangsa	: record.data['idsukubangsa']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntrySukubangsa(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Suku Bangsa (Edit)':'Suku Bangsa (Entry)';
	var sukubangsa_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.sukubangsa',
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
            id: 'tf.frm.idsukubangsa', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdsukubangsa', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmsukubangsa', 
            fieldLabel: 'Nama Suku Bangsa',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveSukubangsa();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wSukubangsa.close();
            }
        }]
    });
		
    var wSukubangsa = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [sukubangsa_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setSukubangsaForm(isUpdate, record);
	wSukubangsa.show();

/**
FORM FUNCTIONS
*/	
	function setSukubangsaForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idsukubangsa'));
				RH.setCompValue('tf.frm.idsukubangsa', record.get('idsukubangsa'));
				RH.setCompValue('tf.frm.kdsukubangsa', record.get('kdsukubangsa'));
				RH.setCompValue('tf.frm.nmsukubangsa', record.get('nmsukubangsa'));
				return;
			}
		}
	}
	
	function fnSaveSukubangsa(){
		var idForm = 'frm.sukubangsa';
		var sUrl = BASE_URL +'sukubangsa_controller/insert_sukubangsa';
		var sParams = new Object({
			idsukubangsa		:	RH.getCompValue('tf.frm.idsukubangsa'),
			kdsukubangsa		:	RH.getCompValue('tf.frm.kdsukubangsa'),
			nmsukubangsa		:	RH.getCompValue('tf.frm.nmsukubangsa'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'sukubangsa_controller/update_sukubangsa';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wSukubangsa, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}