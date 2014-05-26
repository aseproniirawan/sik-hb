function Mlokasi(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_lokasi = dm_lokasi();
	var ds_bagian = dm_bagian();
	
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
		store: ds_lokasi,
		displayInfo: true,
		displayMsg: 'Data Loakasi Barang Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_lokasi',
		store: ds_lokasi,		
		autoScroll: true,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddLokasi();
				//Ext.getCmp('tf.frm.kdlokasi').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 60,
			dataIndex: 'kdlokasi',
			sortable: true
		},
		{
			header: 'Lokasi Barang',
			width: 150,
			dataIndex: 'nmlokasi',
			sortable: true
		},
		{
			header: 'Bagian',
			width: 200,
			dataIndex: 'nmbagian',
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
						fnEditLokasi(grid, rowIndex);
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
						fnDeleteLokasi(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {

			}
		}
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Lokasi Barang', iconCls:'silk-calendar',
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
	
	function reloadLokasi(){
		ds_lokasi.reload();
	}
	
	function fnAddLokasi(){
		var grid = grid_nya;
		wEntryLokasi(false, grid, null);	
	}
	
	function fnEditLokasi(grid, record){
		var record = ds_lokasi.getAt(record);
		wEntryLokasi(true, grid, record);		
	}
	
	function fnDeleteLokasi(grid, record){
		var record = ds_lokasi.getAt(record);
		var url = BASE_URL + 'lokasi_controller/delete_lokasi';
		var params = new Object({
						idlokasi	: record.data['idlokasi']
					});
		RH.deleteGridRecord(url, params, grid );
	}

/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryLokasi(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Lokasi Barang (Edit)':'Lokasi Barang (Entry)';
		var lokasi_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.lokasi',
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
				id: 'tf.frm.idlokasi', 
				hidden: true,
			},
			{
				fieldLabel: 'Kode',
				id:'tf.frm.kdlokasi',
				width: 100,
				sortable: true,
				allowBlank: false
			},
			{
				fieldLabel: 'Lokasi Barang',
				id:'tf.frm.nmlokasi',
				width: 300,
				sortable: true,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.bagian', 
				fieldLabel: 'Bagian',
				store: ds_bagian, triggerAction: 'all',
				valueField: 'idbagian', displayField: 'nmbagian',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveLokasi();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wLokasi.close();
				}
			}]
		});
			
		var wLokasi = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [lokasi_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setLokasiForm(isUpdate, record);
		wLokasi.show();

	/**
	FORM FUNCTIONS
	*/	
		function setLokasiForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('iddokter'));
					RH.setCompValue('tf.frm.idlokasi', record.get('idlokasi'));
					RH.setCompValue('tf.frm.kdlokasi', record.get('kdlokasi'));
					RH.setCompValue('tf.frm.nmlokasi', record.get('nmlokasi'));
					RH.setCompValue('cb.frm.bagian', record.data['idbagian']);
					//Ext.getCmp('tf.frm.kdlokasi').setReadOnly(true);
					return;
				}
			}
		}
		
		function fnSaveLokasi(){
			var idForm = 'frm.lokasi';
			var sUrl = BASE_URL +'lokasi_controller/insert_lokasi';
			var sParams = new Object({
				idlokasi	:	RH.getCompValue('tf.frm.idlokasi'),
				idbagian	:	RH.getCompValue('cb.frm.bagian'),
				kdlokasi	:	RH.getCompValue('tf.frm.kdlokasi'),
				nmlokasi	:	RH.getCompValue('tf.frm.nmlokasi'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'lokasi_controller/update_lokasi';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wLokasi, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
	
}
