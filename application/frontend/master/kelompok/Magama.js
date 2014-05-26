function Magama(){
	var pageSize = 18;
	var ds_agama = dm_agama();
	
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
		store: ds_agama,
		displayInfo: true,
		displayMsg: 'Data Agama Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_agama',
		store: ds_agama,
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
				fnAddAgama();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdagama',
			sortable: true
		},
		{
			header: 'Nama Agama',
			width: 300,
			dataIndex: 'nmagama',
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
						fnEditAgama(grid, rowIndex);
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
						fnDeleteAgama(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Agama', iconCls:'silk-calendar',
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
	
	function reloadAgama(){
		ds_agama.reload();
	}
	
	function fnAddAgama(){
		var grid = grid_nya;
		wEntryAgama(false, grid, null);	
	}
	
	function fnEditAgama(grid, record){
		var record = ds_agama.getAt(record);
		wEntryAgama(true, grid, record);		
	}
	
	function fnDeleteAgama(grid, record){
		var record = ds_agama.getAt(record);
		var url = BASE_URL + 'agama_controller/delete_agama';
		var params = new Object({
						idagama	: record.data['idagama']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryAgama(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Agama (Edit)':'Agama (Entry)';
	var agama_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.agama',
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
            id: 'tf.frm.idagama', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdagama', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmagama', 
            fieldLabel: 'Nama Agama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveAgama();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wAgama.close();
            }
        }]
    });
		
    var wAgama = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [agama_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setAgamaForm(isUpdate, record);
	wAgama.show();

/**
FORM FUNCTIONS
*/	
	function setAgamaForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idagama'));
				RH.setCompValue('tf.frm.idagama', record.get('idagama'));
				RH.setCompValue('tf.frm.kdagama', record.get('kdagama'));
				RH.setCompValue('tf.frm.nmagama', record.get('nmagama'));
				return;
			}
		}
	}
	
	function fnSaveAgama(){
		var idForm = 'frm.agama';
		var sUrl = BASE_URL +'agama_controller/insert_agama';
		var sParams = new Object({
			idagama		:	RH.getCompValue('tf.frm.idagama'),
			kdagama		:	RH.getCompValue('tf.frm.kdagama'),
			nmagama		:	RH.getCompValue('tf.frm.nmagama'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'agama_controller/update_agama';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wAgama, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}