function Mstkrm(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_stkrm = dm_stkrm();
	
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
		store: ds_stkrm,
		displayInfo: true,
		displayMsg: 'Data Status Krm Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stkrm',
		store: ds_stkrm,
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
				fnAddStkrm();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstkrm',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmstkrm',
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
						fnEditStkrm(grid, rowIndex);
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
						fnDeleteStkrm(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Krm', iconCls:'silk-calendar',
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
	
	function reloadStkrm(){
		ds_stkrm.reload();
	}
	
	function fnAddStkrm(){
		var grid = grid_nya;
		wEntryStkrm(false, grid, null);	
	}
	
	function fnEditStkrm(grid, record){
		var record = ds_stkrm.getAt(record);
		wEntryStkrm(true, grid, record);		
	}
	
	function fnDeleteStkrm(grid, record){
		var record = ds_stkrm.getAt(record);
		var url = BASE_URL + 'stkrm_controller/delete_stkrm';
		var params = new Object({
						idstkrm	: record.data['idstkrm']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStkrm(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Krm (Edit)':'Status Krm (Entry)';
	var stkrm_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stkrm',
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
            id: 'tf.frm.idstkrm', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstkrm', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstkrm', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStkrm();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStkrm.close();
            }
        }]
    });
		
    var wStkrm = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stkrm_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStkrmForm(isUpdate, record);
	wStkrm.show();

/**
FORM FUNCTIONS
*/	
	function setStkrmForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstkrm'));
				RH.setCompValue('tf.frm.idstkrm', record.get('idstkrm'));
				RH.setCompValue('tf.frm.kdstkrm', record.get('kdstkrm'));
				RH.setCompValue('tf.frm.nmstkrm', record.get('nmstkrm'));
				return;
			}
		}
	}
	
	function fnSaveStkrm(){
		var idForm = 'frm.stkrm';
		var sUrl = BASE_URL +'stkrm_controller/insert_stkrm';
		var sParams = new Object({
			idstkrm		:	RH.getCompValue('tf.frm.idstkrm'),
			kdstkrm		:	RH.getCompValue('tf.frm.kdstkrm'),
			nmstkrm		:	RH.getCompValue('tf.frm.nmstkrm')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stkrm_controller/update_stkrm';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStkrm, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}