function PPhbrgsupplier(){
	var pageSize = 18;
	var ds_hbrgsupplier = dm_hbrgsupplier();	
	var ds_pengguna = dm_pengguna();
	var ds_jsatuan = dm_jsatuan();
	var ds_matauang = dm_matauang();
	var ds_brgmedis = dm_brgmedis();
	var ds_supplier = dm_supplier();
	
	var cari_data = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'remote',
		width: 200,
		disableIndexes:['keterangan'],
		//readonlyIndexes:['keterangan']
	})];
	
	var paging = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_hbrgsupplier,
		displayInfo: true,
		displayMsg: 'Data Harga Barang Supplier Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_hbrgsupplier',
		store: ds_hbrgsupplier,		
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
				fnAddHbrgsupplier();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Nama Barang',
			width: 250,
			dataIndex: 'nmbrg',
			sortable: true
		},
		{
			header: 'Satuan',
			width: 80,
			dataIndex: 'nmsatuan',
			sortable: true
		},
		{
			header: 'Supplier',
			width: 200,
			dataIndex: 'nmsupplier',
			sortable: true
		},
		{
			header: 'Mata Uang',
			width: 100,
			dataIndex: 'nmmatauang',
			sortable: true
		},
		{
			header: 'Harga Beli',
			width: 80,
			dataIndex: 'harga',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
		},		
		{
			header: 'Tanggal Efektif',
			width: 90,
			dataIndex: 'tglefektif',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Keterangan',
			width: 200,
			dataIndex: 'keterangan',
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
						fnEditHbrgsupplier(grid, rowIndex);
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
						fnDeleteHbrgsupplier(grid, rowIndex);
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
		title: 'Harga Barang Supplier', iconCls:'silk-user',
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
	
	function reloadHbrgsupplier(){
		ds_hbrgsupplier.reload();
	}
	
	function fnAddHbrgsupplier(){
		var grid = grid_nya;
		wEntryHbrgsupplier(false, grid, null);
		var userid = RH.getCompValue('tf.userid', true);
			if(userid != ''){
				RH.setCompValue('cb.user', userid);
			}
			return;
	}
	
	function fnEditHbrgsupplier(grid, record){
		var record = ds_hbrgsupplier.getAt(record);
		wEntryHbrgsupplier(true, grid, record);		
	}
	
	function fnDeleteHbrgsupplier(grid, record){
		var record = ds_hbrgsupplier.getAt(record);
		var url = BASE_URL + 'hbrgsupplier_controller/delete_hbrgsupplier';
		var params = new Object({
						idhrgbrgsup	: record.data['idhrgbrgsup']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryHbrgsupplier(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Harga Barang Supplier (Edit)':'Harga Barang Supplier (Entry)';
		var hbrgsupplier_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.hbrgsupplier',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 370, width: 485,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.idhrgbrgsup', 
				hidden: true,
			},
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
			},{
				xtype: 'combo', id: 'cb.satuan', 
				fieldLabel: 'Satuan',
				store: ds_jsatuan, triggerAction: 'all',
				valueField: 'idsatuan', displayField: 'nmsatuan',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				readOnly: true
			},{
				xtype: 'compositefield',
				fieldLabel: 'Supplier',
				id: 'comp_supplier',
				items: [{
					xtype: 'combo', id: 'cb.supplier',					
					store: ds_supplier, triggerAction: 'all',
					valueField: 'kdsupplier', displayField: 'nmsupplier',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 275,
					editable: false,
					allowBlank: false,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.supplier',
					width: 4,
					handler: function() {
						fnwSupplier();
						ds_supplier.load();
					}
				}]
			},{
				xtype: 'combo', id: 'cb.matauang', 
				fieldLabel: 'Mata Uang',
				store: ds_matauang, triggerAction: 'all',
				valueField: 'idmatauang', displayField: 'nmmatauang',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false, value: 1,
				allowBlank: false
			},{
				xtype: 'numericfield',
				fieldLabel: 'Harga Beli',
				id:'tf.harga',
				width: 150,
				decimalPrecision: 2,		
				decimalSeparator: ',',						
				thousandSeparator: '.',
				alwaysDisplayDecimals: true,
				useThousandSeparator: true,
			},	
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Efektif',
				id: 'df.tglefektif',
				format: "d/m/Y",
				value: new Date(),
				width: 150,
				editable: false
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Keterangan',
				id: 'ta.keterangan',
				width: 300,
			},{
				xtype: 'combo', id: 'cb.user', 
				fieldLabel: 'User Input',
				store: ds_pengguna, triggerAction: 'all',
				valueField: 'userid', displayField: 'nmlengkap',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				readOnly: true,
				style : 'opacity:0.6',
			},{
				xtype: 'textfield',
				fieldLabel: 'User Id',
				id:'tf.userid',
				width: 150,
				value: USERID,
				hidden: true,
				
			},{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Input',
				id: 'df.tglinput',
				format: "d/m/Y",
				value: new Date(),
				width: 150,
				editable: false,
				readOnly: true,
				style : 'opacity:0.6',
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveHbrgsupplier();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wHbrgsupplier.close();
				}
			}]
		});
			
		var wHbrgsupplier = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [hbrgsupplier_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setHbrgsupplierForm(isUpdate, record);
		wHbrgsupplier.show();

	/**
	FORM FUNCTIONS
	*/	
		function setHbrgsupplierForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.idhrgbrgsup', record.get('idhrgbrgsup'));
					RH.setCompValue('cb.brg', record.get('kdbrg'));
					RH.setCompValue('cb.satuan', record.get('idsatuan'));
					RH.setCompValue('cb.supplier', record.data['kdsupplier']);
					RH.setCompValue('cb.matauang', record.data['idmatauang']);				
					RH.setCompValue('tf.harga', record.get('harga'));
					RH.setCompValue('df.tglefektif', record.get('tglefektif'));
					RH.setCompValue('ta.keterangan', record.get('keterangan'));
					RH.setCompValue('cb.user', record.get('userid'));
					RH.setCompValue('df.tglinput', record.get('tglinput'));
					return;
				}
			}
		}
		
		function fnSaveHbrgsupplier(){
			var idForm = 'frm.hbrgsupplier';
			var sUrl = BASE_URL +'hbrgsupplier_controller/insert_hbrgsupplier';
			var sParams = new Object({
				idhrgbrgsup		:	RH.getCompValue('tf.idhrgbrgsup'),
				kdbrg			:	RH.getCompValue('cb.brg'),
				idsatuan		:	RH.getCompValue('cb.satuan'),
				kdsupplier		:	RH.getCompValue('cb.supplier'),
				idmatauang		:	RH.getCompValue('cb.matauang'),
				harga			:	RH.getCompValue('tf.harga'),
				tglefektif		:	RH.getCompValue('df.tglefektif'),
				keterangan		:	RH.getCompValue('ta.keterangan'),
				userid			:	RH.getCompValue('cb.user'),
				tglinput		:	RH.getCompValue('df.tglinput'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'hbrgsupplier_controller/update_hbrgsupplier';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wHbrgsupplier, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
	
	function fnwBarang(){
		var cm_barang = new Ext.grid.ColumnModel([
			{
				dataIndex: 'kdbrg',
				width: 100,
				hidden: true
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
			pageSize: 20,
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
			width: 430,
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
			var var_cari_idsatuanbsr = rec_cari_barang.data["idsatuanbsr"];
						
			//Ext.getCmp('tf.barang').focus();
			Ext.getCmp("cb.brg").setValue(var_cari_kdbarang);
			Ext.getCmp("cb.satuan").setValue(var_cari_idsatuanbsr);
						win_find_cari_barang.close();
		}
	}
	
	function fnwSupplier(){
		var cm_supplier = new Ext.grid.ColumnModel([
			{
				dataIndex: 'kdsupplier',
				width: 100,
				hidden: true
			},{
				header: 'Nama Supplier',
				dataIndex: 'nmsupplier',
				width: 400
			}
		]);
		
		var sm_supplier = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_supplier = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_supplier = new Ext.PagingToolbar({
			pageSize: 20,
			store: ds_supplier,
			displayInfo: true,
			displayMsg: 'Data Supplier Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_supplier = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_supplier = new Ext.grid.GridPanel({
			ds: ds_supplier,
			cm: cm_supplier,
			sm: sm_supplier,
			view: vw_supplier,
			height: 460,
			width: 430,
			plugins: cari_supplier,
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
			bbar: paging_supplier,
			listeners: {
				rowdblclick: klik_cari_supplier
			}
		});
		var win_find_cari_supplier = new Ext.Window({
			title: 'Cari Supplier',
			modal: true,
			items: [grid_find_cari_supplier]
		}).show();

		function klik_cari_supplier(grid, rowIdx){
			var rec_cari_supplier = ds_supplier.getAt(rowIdx);
			var var_cari_kdsupplier = rec_cari_supplier.data["kdsupplier"];
			//var var_cari_supplier = rec_cari_supplier.data["nmsupplier"];
						
			//Ext.getCmp('tf.supplier').focus();
			//Ext.getCmp("tf.supplier").setValue(var_cari_supplier);
			Ext.getCmp("cb.supplier").setValue(var_cari_kdsupplier);
						win_find_cari_supplier.close();
		}
	}
}