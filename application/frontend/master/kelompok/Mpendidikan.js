function Mpendidikan(){
	var pageSize = 18;
	var ds_pendidikan = dm_pendidikan();
	
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
		store: ds_pendidikan,
		displayInfo: true,
		displayMsg: 'Data Pendidikan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_pendidikan',
		store: ds_pendidikan,
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
				fnAddPendidikan();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdpendidikan',
			sortable: true
		},
		{
			header: 'Nama Pendidikan',
			width: 300,
			dataIndex: 'nmpendidikan',
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
						fnEditPendidikan(grid, rowIndex);
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
						fnDeletePendidikan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Pendidikan', iconCls:'silk-calendar',
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
	
	function reloadPendidikan(){
		ds_pendidikan.reload();
	}
	
	function fnAddPendidikan(){
		var grid = grid_nya;
		wEntryPendidikan(false, grid, null);	
	}
	
	function fnEditPendidikan(grid, record){
		var record = ds_pendidikan.getAt(record);
		wEntryPendidikan(true, grid, record);		
	}
	
	function fnDeletePendidikan(grid, record){
		var record = ds_pendidikan.getAt(record);
		var url = BASE_URL + 'pendidikan_controller/delete_pendidikan';
		var params = new Object({
						idpendidikan	: record.data['idpendidikan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryPendidikan(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Pendidikan (Edit)':'Pendidikan (Entry)';
	var pendidikan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.pendidikan',
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
            id: 'tf.frm.idpendidikan', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdpendidikan', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmpendidikan', 
            fieldLabel: 'Nama Pendidikan',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSavePendidikan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wPendidikan.close();
            }
        }]
    });
		
    var wPendidikan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [pendidikan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setPendidikanForm(isUpdate, record);
	wPendidikan.show();

/**
FORM FUNCTIONS
*/	
	function setPendidikanForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idpendidikan'));
				RH.setCompValue('tf.frm.idpendidikan', record.get('idpendidikan'));
				RH.setCompValue('tf.frm.kdpendidikan', record.get('kdpendidikan'));
				RH.setCompValue('tf.frm.nmpendidikan', record.get('nmpendidikan'));
				return;
			}
		}
	}
	
	function fnSavePendidikan(){
		var idForm = 'frm.pendidikan';
		var sUrl = BASE_URL +'pendidikan_controller/insert_pendidikan';
		var sParams = new Object({
			idpendidikan		:	RH.getCompValue('tf.frm.idpendidikan'),
			kdpendidikan		:	RH.getCompValue('tf.frm.kdpendidikan'),
			nmpendidikan		:	RH.getCompValue('tf.frm.nmpendidikan'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'pendidikan_controller/update_pendidikan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wPendidikan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}