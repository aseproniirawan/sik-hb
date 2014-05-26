function Mstregistrasi(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_stregistrasi = dm_stregistrasi();
	
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
		store: ds_stregistrasi,
		displayInfo: true,
		displayMsg: 'Data Status Registrasi Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stregistrasi',
		store: ds_stregistrasi,
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
				fnAddStregistrasi();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstregistrasi',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmstregistrasi',
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
						fnEditStregistrasi(grid, rowIndex);
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
						fnDeleteStregistrasi(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Registrasi', iconCls:'silk-calendar',
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
	
	function reloadStregistrasi(){
		ds_stregistrasi.reload();
	}
	
	function fnAddStregistrasi(){
		var grid = grid_nya;
		wEntryStregistrasi(false, grid, null);	
	}
	
	function fnEditStregistrasi(grid, record){
		var record = ds_stregistrasi.getAt(record);
		wEntryStregistrasi(true, grid, record);		
	}
	
	function fnDeleteStregistrasi(grid, record){
		var record = ds_stregistrasi.getAt(record);
		var url = BASE_URL + 'stregistrasi_controller/delete_stregistrasi';
		var params = new Object({
						idstregistrasi	: record.data['idstregistrasi']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStregistrasi(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Registrasi (Edit)':'Status Registrasi (Entry)';
	var stregistrasi_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stregistrasi',
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
            id: 'tf.frm.idstregistrasi', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstregistrasi', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstregistrasi', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStregistrasi();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStregistrasi.close();
            }
        }]
    });
		
    var wStregistrasi = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stregistrasi_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStregistrasiForm(isUpdate, record);
	wStregistrasi.show();

/**
FORM FUNCTIONS
*/	
	function setStregistrasiForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstregistrasi'));
				RH.setCompValue('tf.frm.idstregistrasi', record.get('idstregistrasi'));
				RH.setCompValue('tf.frm.kdstregistrasi', record.get('kdstregistrasi'));
				RH.setCompValue('tf.frm.nmstregistrasi', record.get('nmstregistrasi'));
				return;
			}
		}
	}
	
	function fnSaveStregistrasi(){
		var idForm = 'frm.stregistrasi';
		var sUrl = BASE_URL +'stregistrasi_controller/insert_stregistrasi';
		var sParams = new Object({
			idstregistrasi		:	RH.getCompValue('tf.frm.idstregistrasi'),
			kdstregistrasi		:	RH.getCompValue('tf.frm.kdstregistrasi'),
			nmstregistrasi		:	RH.getCompValue('tf.frm.nmstregistrasi')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stregistrasi_controller/update_stregistrasi';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStregistrasi, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}