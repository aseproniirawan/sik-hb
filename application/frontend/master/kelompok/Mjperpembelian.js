function Mjperpembelian(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_jperpembelian = dm_jperpembelian();
	
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
		store: ds_jperpembelian,
		displayInfo: true,
		displayMsg: 'Data Jenis Permintaan Pembelian Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jperpembelian',
		store: ds_jperpembelian,
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
				fnAddJperpembelian();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnspp',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmjnspp',
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
						fnEditJperpembelian(grid, rowIndex);
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
						fnDeleteJperpembelian(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Permintaan Pembelian', iconCls:'silk-calendar',
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
	
	function reloadJperpembelian(){
		ds_jperpembelian.reload();
	}
	
	function fnAddJperpembelian(){
		var grid = grid_nya;
		wEntryJperpembelian(false, grid, null);	
	}
	
	function fnEditJperpembelian(grid, record){
		var record = ds_jperpembelian.getAt(record);
		wEntryJperpembelian(true, grid, record);		
	}
	
	function fnDeleteJperpembelian(grid, record){
		var record = ds_jperpembelian.getAt(record);
		var url = BASE_URL + 'jperpembelian_controller/delete_jperpembelian';
		var params = new Object({
						idjnspp	: record.data['idjnspp']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJperpembelian(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Permintaan Pembelian (Edit)':'Jenis Permintaan Pembelian (Entry)';
	var jperpembelian_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jperpembelian',
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
            id: 'tf.frm.idjnspp', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnspp', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnspp', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJperpembelian();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJperpembelian.close();
            }
        }]
    });
		
    var wJperpembelian = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jperpembelian_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJperpembelianForm(isUpdate, record);
	wJperpembelian.show();

/**
FORM FUNCTIONS
*/	
	function setJperpembelianForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnspp'));
				RH.setCompValue('tf.frm.idjnspp', record.get('idjnspp'));
				RH.setCompValue('tf.frm.kdjnspp', record.get('kdjnspp'));
				RH.setCompValue('tf.frm.nmjnspp', record.get('nmjnspp'));
				return;
			}
		}
	}
	
	function fnSaveJperpembelian(){
		var idForm = 'frm.jperpembelian';
		var sUrl = BASE_URL +'jperpembelian_controller/insert_jperpembelian';
		var sParams = new Object({
			idjnspp		:	RH.getCompValue('tf.frm.idjnspp'),
			kdjnspp		:	RH.getCompValue('tf.frm.kdjnspp'),
			nmjnspp		:	RH.getCompValue('tf.frm.nmjnspp')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jperpembelian_controller/update_jperpembelian';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJperpembelian, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}