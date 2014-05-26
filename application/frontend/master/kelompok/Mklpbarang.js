function Mklpbarang(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_klpbarang = dm_klpbarang();
	
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
		store: ds_klpbarang,
		displayInfo: true,
		displayMsg: 'Data Kelompok Barang Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_klpbarang',
		store: ds_klpbarang,
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
				fnAddKlpbarang();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdklpbarang',
			sortable: true
		},
		{
			header: 'Kelompok Barang',
			width: 300,
			dataIndex: 'nmklpbarang',
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
						fnEditKlpbarang(grid, rowIndex);
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
						fnDeleteKlpbarang(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Kelompok Barang', iconCls:'silk-calendar',
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
	
	function reloadKlpbarang(){
		ds_klpbarang.reload();
	}
	
	function fnAddKlpbarang(){
		var grid = grid_nya;
		wEntryKlpbarang(false, grid, null);	
	}
	
	function fnEditKlpbarang(grid, record){
		var record = ds_klpbarang.getAt(record);
		wEntryKlpbarang(true, grid, record);		
	}
	
	function fnDeleteKlpbarang(grid, record){
		var record = ds_klpbarang.getAt(record);
		var url = BASE_URL + 'klpbarang_controller/delete_klpbarang';
		var params = new Object({
						idklpbrg	: record.data['idklpbrg']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryKlpbarang(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Kelompok Barang (Edit)':'Kelompok Barang (Entry)';
	var klpbarang_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.klpbarang',
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
            id: 'tf.frm.idklpbrg', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdklpbarang', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmklpbarang', 
            fieldLabel: 'Kelompok Barang',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveKlpbarang();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wKlpbarang.close();
            }
        }]
    });
		
    var wKlpbarang = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [klpbarang_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setKlpbarangForm(isUpdate, record);
	wKlpbarang.show();

/**
FORM FUNCTIONS
*/	
	function setKlpbarangForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idklpbrg'));
				RH.setCompValue('tf.frm.idklpbrg', record.get('idklpbrg'));
				RH.setCompValue('tf.frm.kdklpbarang', record.get('kdklpbarang'));
				RH.setCompValue('tf.frm.nmklpbarang', record.get('nmklpbarang'));
				return;
			}
		}
	}
	
	function fnSaveKlpbarang(){
		var idForm = 'frm.klpbarang';
		var sUrl = BASE_URL +'klpbarang_controller/insert_klpbarang';
		var sParams = new Object({
			idklpbrg		:	RH.getCompValue('tf.frm.idklpbrg'),
			kdklpbarang		:	RH.getCompValue('tf.frm.kdklpbarang'),
			nmklpbarang		:	RH.getCompValue('tf.frm.nmklpbarang'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'klpbarang_controller/update_klpbarang';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wKlpbarang, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}