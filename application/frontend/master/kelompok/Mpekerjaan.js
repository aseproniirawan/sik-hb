function Mpekerjaan(){
	var pageSize = 18;
	var ds_pekerjaan = dm_pekerjaan();
	
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
		store: ds_pekerjaan,
		displayInfo: true,
		displayMsg: 'Data Pekerjaan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_pekerjaan',
		store: ds_pekerjaan,
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
				fnAddPekerjaan();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdpekerjaan',
			sortable: true
		},
		{
			header: 'Nama Pekerjaan',
			width: 300,
			dataIndex: 'nmpekerjaan',
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
						fnEditPekerjaan(grid, rowIndex);
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
						fnDeletePekerjaan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Pekerjaan', iconCls:'silk-calendar',
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
	
	function reloadPekerjaan(){
		ds_pekerjaan.reload();
	}
	
	function fnAddPekerjaan(){
		var grid = grid_nya;
		wEntryPekerjaan(false, grid, null);	
	}
	
	function fnEditPekerjaan(grid, record){
		var record = ds_pekerjaan.getAt(record);
		wEntryPekerjaan(true, grid, record);		
	}
	
	function fnDeletePekerjaan(grid, record){
		var record = ds_pekerjaan.getAt(record);
		var url = BASE_URL + 'pekerjaan_controller/delete_pekerjaan';
		var params = new Object({
						idpekerjaan	: record.data['idpekerjaan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryPekerjaan(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Pekerjaan (Edit)':'Pekerjaan (Entry)';
	var pekerjaan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.pekerjaan',
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
            id: 'tf.frm.idpekerjaan', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdpekerjaan', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmpekerjaan', 
            fieldLabel: 'Nama Pekerjaan',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSavePekerjaan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wPekerjaan.close();
            }
        }]
    });
		
    var wPekerjaan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [pekerjaan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setPekerjaanForm(isUpdate, record);
	wPekerjaan.show();

/**
FORM FUNCTIONS
*/	
	function setPekerjaanForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idpekerjaan'));
				RH.setCompValue('tf.frm.idpekerjaan', record.get('idpekerjaan'));
				RH.setCompValue('tf.frm.kdpekerjaan', record.get('kdpekerjaan'));
				RH.setCompValue('tf.frm.nmpekerjaan', record.get('nmpekerjaan'));
				return;
			}
		}
	}
	
	function fnSavePekerjaan(){
		var idForm = 'frm.pekerjaan';
		var sUrl = BASE_URL +'pekerjaan_controller/insert_pekerjaan';
		var sParams = new Object({
			idpekerjaan		:	RH.getCompValue('tf.frm.idpekerjaan'),
			kdpekerjaan		:	RH.getCompValue('tf.frm.kdpekerjaan'),
			nmpekerjaan		:	RH.getCompValue('tf.frm.nmpekerjaan'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'pekerjaan_controller/update_pekerjaan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wPekerjaan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}