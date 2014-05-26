function Mstposisipasien(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_stposisipasien = dm_stposisipasien();
	
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
		store: ds_stposisipasien,
		displayInfo: true,
		displayMsg: 'Data Status Posisi Pasien Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stposisipasien',
		store: ds_stposisipasien,
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
				fnAddStposisipasien();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstposisipasien',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmstposisipasien',
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
						fnEditStposisipasien(grid, rowIndex);
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
						fnDeleteStposisipasien(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Posisi Pasien', iconCls:'silk-calendar',
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
	
	function reloadStposisipasien(){
		ds_stposisipasien.reload();
	}
	
	function fnAddStposisipasien(){
		var grid = grid_nya;
		wEntryStposisipasien(false, grid, null);	
	}
	
	function fnEditStposisipasien(grid, record){
		var record = ds_stposisipasien.getAt(record);
		wEntryStposisipasien(true, grid, record);		
	}
	
	function fnDeleteStposisipasien(grid, record){
		var record = ds_stposisipasien.getAt(record);
		var url = BASE_URL + 'stposisipasien_controller/delete_stposisipasien';
		var params = new Object({
						idstposisipasien	: record.data['idstposisipasien']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStposisipasien(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Posisi Pasien (Edit)':'Status Posisi Pasien (Entry)';
	var stposisipasien_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stposisipasien',
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
            id: 'tf.frm.idstposisipasien', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstposisipasien', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstposisipasien', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStposisipasien();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStposisipasien.close();
            }
        }]
    });
		
    var wStposisipasien = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stposisipasien_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStposisipasienForm(isUpdate, record);
	wStposisipasien.show();

/**
FORM FUNCTIONS
*/	
	function setStposisipasienForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstposisipasien'));
				RH.setCompValue('tf.frm.idstposisipasien', record.get('idstposisipasien'));
				RH.setCompValue('tf.frm.kdstposisipasien', record.get('kdstposisipasien'));
				RH.setCompValue('tf.frm.nmstposisipasien', record.get('nmstposisipasien'));
				return;
			}
		}
	}
	
	function fnSaveStposisipasien(){
		var idForm = 'frm.stposisipasien';
		var sUrl = BASE_URL +'stposisipasien_controller/insert_stposisipasien';
		var sParams = new Object({
			idstposisipasien		:	RH.getCompValue('tf.frm.idstposisipasien'),
			kdstposisipasien		:	RH.getCompValue('tf.frm.kdstposisipasien'),
			nmstposisipasien		:	RH.getCompValue('tf.frm.nmstposisipasien')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stposisipasien_controller/update_stposisipasien';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStposisipasien, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}