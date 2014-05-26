function Mbrgbagian(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_brgbagian = dm_brgbagian();
	var ds_bagian = dm_bagian();	
	var ds_brgmedis = dm_brgmedis();
	
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
		store: ds_brgbagian,
		displayInfo: true,
		displayMsg: 'Data Barang Bagian Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_brgbagian',
		store: ds_brgbagian,		
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
				fnAddBrgbagian();
				//Ext.getCmp('cb.frm.bagian').setReadOnly(false);
			}
		},
			{
				xtype: 'textfield',
				name: 'txttampunghuruf',
				id: 'id.txttampunghuruf',
				hidden: true,
			}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Nama Bagian',
			width: 150,
			dataIndex: 'nmbagian',
			sortable: true
		},
		{
			header: 'Nama Barang',
			width: 400,
			dataIndex: 'nmbrg',
			sortable: true
		},
		{
			header: 'Stok Now Bagian',
			width: 115,
			dataIndex: 'stoknowbagian',
			sortable: true, 
			xtype: 'numbercolumn', format:'0,000', align:'right'
		},
		{
			header: 'Stok Min Bagian',
			width: 100,
			dataIndex: 'stokminbagian',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000', align:'right'
		},
		{
			header: 'Stok Max Bagian',
			width: 105,
			dataIndex: 'stokmaxbagian',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000', align:'right'
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
						fnEditBrgbagian(grid, rowIndex);
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
						fnDeleteBrgbagian(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {
				var rec = ds_brgbagian.getAt(rowIdx);
				Ext.getCmp("id.txttampunghuruf").setValue(rec.data["idbagian"]);
			}
		}
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Barang Bagian', iconCls:'silk-calendar',
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
	
	function reloadBrgbagian(){
		ds_brgbagian.reload();
	}
	
	function fnAddBrgbagian(){
		var grid = grid_nya;
		wEntryBrgbagian(false, grid, null);	
	}
	
	function fnEditBrgbagian(grid, record){
		var record = ds_brgbagian.getAt(record);
		wEntryBrgbagian(true, grid, record);		
	}
	
	function fnDeleteBrgbagian(grid, record){
		var record = ds_brgbagian.getAt(record);
		var url = BASE_URL + 'brgbagian_controller/delete_brgbagian';
		var params = new Object({
						idbagian	: record.data['idbagian'],
						kdbrg		: record.data['kdbrg']
					});
		RH.deleteGridRecord(url, params, grid );
	}

	/**
	WIN - FORM ENTRY/EDIT 
	*/
	function wEntryBrgbagian(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Barang Bagian (Edit)':'Barang Bagian (Entry)';
		var brgbagian_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.brgbagian',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 230, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				xtype: 'combo', id: 'cb.frm.bagian', 
				fieldLabel: 'Nama Bagian',
				store: ds_bagian, triggerAction: 'all',
				valueField: 'idbagian', displayField: 'nmbagian',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 200,
				editable: false,
				allowBlank: false
			},
			/* {
				xtype: 'compositefield',
				fieldLabel: 'Nama Barang',
				items: [{
				xtype: 'textfield',
				id:'kdbrg',
				width: 50,
				sortable: true,
				hidden: true
			},{
					xtype: 'textfield',
					id: 'nmbrg',
					width: 200,
					emptyText: 'Pilih...',
					listeners: {
						'render': function(c) {
								c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('btn_simpan_product').focus();
								}, c);
						}
					}
				},
				{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn_data_submenu',
					width: 3,
					handler: function() {
						find_x("Data Barang", 4);
					}
				}]
			}, */
			{
				xtype: 'compositefield',
				fieldLabel: 'Nama Barang',
				id: 'comp_barang',
				items: [
				{
					xtype: 'combo', id: 'cb.brg',					
					store: ds_brgmedis, triggerAction: 'all',
					valueField: 'kdbrg', displayField: 'nmbrg',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 275,
					editable: false,
					allowBlank: false,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.barang',
					width: 4,
					handler: function() {
						fnwBarang();
						ds_brgmedis.load();
					}
				}]
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Stok Now Bagian',
				id:'tf.frm.stoknowbagian',
				width: 150,
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Stok Min Bagian',
				id:'tf.frm.stokminbagian',
				width: 150,
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Stok Max Bagian',
				id:'tf.frm.stokmaxbagian',
				width: 150,
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveBrgbagian();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wBrgbagian.close();
				}
			}]
		});
			
		var wBrgbagian = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [brgbagian_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setBrgbagianForm(isUpdate, record);
		wBrgbagian.show();

	/**
	FORM FUNCTIONS
	*/	
		function setBrgbagianForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idhlibur'));
					RH.setCompValue('cb.frm.bagian', record.data['idbagian']);
					RH.setCompValue('cb.brg', record.data['kdbrg']);
					RH.setCompValue('tf.frm.stoknowbagian', record.get('stoknowbagian'));
					RH.setCompValue('tf.frm.stokminbagian', record.get('stokminbagian'));
					RH.setCompValue('tf.frm.stokmaxbagian', record.get('stokmaxbagian'));
					//Ext.getCmp('cb.frm.bagian').setReadOnly(true);
					return;
				}
			}
		}
		
		function fnSaveBrgbagian(){
			var idForm = 'frm.brgbagian';
			var sUrl = BASE_URL +'brgbagian_controller/insert_brgbagian';
			var sParams = new Object({
				idbagian		:	RH.getCompValue('cb.frm.bagian'),
				kdbrg			:	RH.getCompValue('cb.brg'),
				stoknowbagian	:	RH.getCompValue('tf.frm.stoknowbagian'),
				stokminbagian	:	RH.getCompValue('tf.frm.stokminbagian'),
				stokmaxbagian	:	RH.getCompValue('tf.frm.stokmaxbagian'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'brgbagian_controller/update_brgbagian';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wBrgbagian, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}					
	}
	
	function fnwBarang(){
		var cm_barang = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),
			{
				header: 'Kode Barang',
				dataIndex: 'kdbrg',
				width: 100
			},{
				header: 'Nama Barang',
				dataIndex: 'nmbrg',
				width: 400
			}
		]);
		
		var sm_barang = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_barang = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_barang = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_brgmedis,
			displayInfo: true,
			displayMsg: 'Data Barang Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_barang = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_barang = new Ext.grid.GridPanel({
			ds: ds_brgmedis,
			cm: cm_barang,
			sm: sm_barang,
			view: vw_barang,
			height: 460,
			width: 550,
			plugins: cari_barang,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			buttonAlign: 'left',
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: paging_barang,
			listeners: {
				rowdblclick: klik_cari_barang
			}
		});
		var win_find_cari_barang = new Ext.Window({
			title: 'Cari Barang',
			modal: true,
			items: [grid_find_cari_barang]
		}).show();

		function klik_cari_barang(grid, rowIdx){
			var rec_cari_barang = ds_brgmedis.getAt(rowIdx);
			var var_cari_kdbarang = rec_cari_barang.data["kdbrg"];
			//var var_cari_idsatuanbsr = rec_cari_barang.data["idsatuanbsr"];
						
			//Ext.getCmp('tf.barang').focus();
			Ext.getCmp("cb.brg").setValue(var_cari_kdbarang);
			//Ext.getCmp("cb.satuan").setValue(var_cari_idsatuanbsr);
						win_find_cari_barang.close();
		}
	}
}