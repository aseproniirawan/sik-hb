function Mjtarif(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 20;
	var ds_jtarif = dm_jtarif();
	
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
		store: ds_jtarif,
		displayInfo: true,
		displayMsg: 'Data Jenis Tarif Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_tarif',
		store: ds_jtarif,
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
				fnAddJtarif();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnstarif',
			sortable: true
		},
		{
			header: 'Jenis Tarif',
			width: 300,
			dataIndex: 'nmjnstarif',
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
						fnEditJtarif(grid, rowIndex);
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
						fnDeleteJtarif(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Tarif', iconCls:'silk-calendar',
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
	
	function reloadJtarif(){
		ds_jtarif.reload();
	}
	
	function fnAddJtarif(){
		var grid = grid_nya;
		wEntryJtarif(false, grid, null);	
	}
	
	function fnEditJtarif(grid, record){
		var record = ds_jtarif.getAt(record);
		wEntryJtarif(true, grid, record);		
	}
	
	function fnDeleteJtarif(grid, record){
		var record = ds_jtarif.getAt(record);
		var url = BASE_URL + 'jtarif_controller/delete_jtarif';
		var params = new Object({
						idjnstarif	: record.data['idjnstarif']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJtarif(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Tarif (Edit)':'Jenis Tarif (Entry)';
	var jtarif_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jtarif',
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
            id: 'tf.frm.idjnstarif', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnstarif', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnstarif', 
            fieldLabel: 'Jenis Tarif',
            width: 300,       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJtarif();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJtarif.close();
            }
        }]
    });
		
    var wJtarif = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jtarif_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJtarifForm(isUpdate, record);
	wJtarif.show();

/**
FORM FUNCTIONS
*/	
	function setJtarifForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnstarif'));
				RH.setCompValue('tf.frm.idjnstarif', record.get('idjnstarif'));
				RH.setCompValue('tf.frm.kdjnstarif', record.get('kdjnstarif'));
				RH.setCompValue('tf.frm.nmjnstarif', record.get('nmjnstarif'));
				return;
			}
		}
	}
	
	function fnSaveJtarif(){
		var idForm = 'frm.jtarif';
		var sUrl = BASE_URL +'jtarif_controller/insert_jtarif';
		var sParams = new Object({
			idjnstarif		:	RH.getCompValue('tf.frm.idjnstarif'),
			kdjnstarif		:	RH.getCompValue('tf.frm.kdjnstarif'),
			nmjnstarif		:	RH.getCompValue('tf.frm.nmjnstarif'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jtarif_controller/update_jtarif';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJtarif, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}