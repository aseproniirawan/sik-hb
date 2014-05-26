function u3_usergroup() {
	var ds_jdashboard = dm_jdashboard();
	var ds_klppengguna = dm_klppengguna();
	var ds_status = dm_status();
	
	var kodex;
	
	var sm_nya = new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {}
	});
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
		pageSize: 50,
		store: ds_klppengguna,
		displayInfo: true,
		displayMsg: 'Data Kelompok Pengguna Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var grid_nya = new Ext.grid.GridPanel({
		store: ds_klppengguna,
		frame: true,
		//width: 630,
		height: 530,
		plugins: cari_data,
		id: 'grid_det_product',
		forceFit: true,
		tbar: [{
			hidden: true,
			text: 'Print',
			iconCls: 'silk-printer',
			handler: function() {
				var parsing = '';
				parsing = parsing + 'var1';
				parsing = parsing + 'qie' + 'var2';
				parsing = parsing + 'qie' + 'var3';
				parsing = parsing + 'qie' + 'var4';
				var win = window.open();
				win.location.reload();
				win.location = BASE_URL + 'print_topdf/print_Dproducts';
			}
		}, '->'],
		sm: sm_nya,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		columns: [{
			header: 'ID',
			width: 50,
                        hidden:true,
			dataIndex: 'idklppengguna',
			sortable: true
		},{
			header: 'Kode',
			width: 50,
			dataIndex: 'kdklppengguna',
			sortable: true
		},
		{
			header: 'Nama',
			width: 150,
			dataIndex: 'nmklppengguna',
			sortable: true
		},
		{
			header: 'Deskripsi',
			width: 150,
			dataIndex: 'deskripsi',
			sortable: true
		},
		{
			header: 'Dashboard',
			width: 150,
			dataIndex: 'idjnsdashboard',
			sortable: true
		},
		{
			header: 'Status',
			width: 150,
			dataIndex: 'idstatus',
			sortable: true
		}],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {
				var rec = ds_klppengguna.getAt(rowIdx);
				Ext.getCmp("id").setValue(rec.data["idklppengguna"]);
				Ext.getCmp("kode").setValue(rec.data["kdklppengguna"]);
				kodex = rec.data["kdklppengguna"];
				Ext.getCmp("nama").setValue(rec.data["nmklppengguna"]);
				Ext.getCmp("deskripsi").setValue(rec.data["deskripsi"]);
				Ext.getCmp("dashboard").setValue(rec.data["idjnsdashboard"]);
				Ext.getCmp("status").setValue(rec.data["idstatus"]);
				Ext.getCmp('btn_simpan').disable();
				Ext.getCmp('btn_ubah').enable();
				Ext.getCmp('btn_hapus').enable();
				Ext.getCmp('form_bp_general').enable();
			}
		}
	});
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		forceFit: true,
		title: 'Kelompok Pengguna',
		layout: 'column',
		items: [{
			columnWidth: .42,
			xtype: 'panel',
			border: false,
			bodyStyle: 'padding:3px 3px 3px 3px',
			items: [{
				layout: 'form',
				bodyStyle: 'padding:3px 3px 3px 3px',
				border: false,
				items: [{
					xtype: 'fieldset',
					title: 'Detail Kelompok Pengguna',
                                        defaults: {
						labelWidth: 100,
						labelAlign: 'right'
					},
					height: 595,
					items: [{
						columnWidth: 1,
						border: false,
						layout: 'form',
						items: [{
							xtype: 'textfield',
							//fieldLabel: 'ID',
							id: 'id',
							width: 70,
                                                        hidden:true,
							allowBlank: true,
							disabled: true,
							listeners: {}
						},{
							xtype: 'textfield',
							fieldLabel: 'Kode',
							id: 'kode',
							width: 70,
							allowBlank: false,
							disabled: true,
							listeners: {}
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Nama ',
							id: 'nama',
							allowBlank: false,
							width: 250
						},
						{
							xtype: 'textarea',
							fieldLabel: 'Deskripsi',
							id: 'deskripsi',
							width: 300
						},
						{
							xtype: 'combo',
							width: 125,
							height: 50,
							allowBlank: false,
							store: ds_jdashboard,
							fieldLabel: 'Dashboard',
							id: 'dashboard',
							triggerAction: 'all',
							editable: false,
							valueField: 'kdjnsdashboard',
							displayField: 'nmjnsdashboard',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_dashboard',
							listeners: {},
							typeAhead: true,
							mode: 'local',
							emptyText: 'Pilih...',
							selectOnFocus: true
						},
						{
							xtype: 'combo',
							width: 125,
							height: 50,
							allowBlank: false,
							store: ds_status,
							fieldLabel: 'Status',
							id: 'status',
							triggerAction: 'all',
							editable: false,
							valueField: 'idstatus',
							displayField: 'nmstatus',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_status',
							listeners: {},
							typeAhead: true,
							mode: 'local',
							emptyText: 'Pilih...',
							selectOnFocus: true
						},
						{
							columnWidth: 1,
							xtype: 'panel',
							border: false,
							buttonAlign: 'left',
							buttons: [{
								text: 'Baru',
								id: 'btn_baru_product',
								iconCls: 'silk-add',
								handler: function() {
									enable();
									Ext.getCmp('kode').focus();
								}
							}, '->',
							{
								text: 'Simpan',
								id: 'btn_simpan',
								iconCls: 'silk-save',
								handler: function() {
									simpan_grid("form_bp_general");
								}
							},
							{
								text: 'Hapus',
								id: 'btn_hapus',
								iconCls: 'silk-delete',
								handler: function() {
									hapus_grid("form_bp_general");
								}
							},
							{
								text: 'Ubah',
								id: 'btn_ubah',
								iconCls: 'silk-edit',
								handler: function() {
									ubah_grid("form_bp_general");
								}
							}]
						}]
					}]
				}]
			}]
		},
		{
			columnWidth: .58,
			xtype: 'panel',
			border: false,
			bodyStyle: 'padding:3px 3px 3px 3px',
			items: [{
				layout: 'form',
				//bodyStyle: 'padding:10px 3px 3px 5px',
				border: false,
				items: [grid_nya]
			}]
		}],
		listeners: {
			afterrender: disable
		}
	});

	function disable() {
		form_bp_general.getForm().reset();
		Ext.getCmp('form_bp_general').enable();
		Ext.getCmp('btn_simpan').disable();
		Ext.getCmp('btn_hapus').disable();
		Ext.getCmp('btn_ubah').disable();
		Ext.getCmp('kode').disable();
		Ext.getCmp('nama').disable();
		Ext.getCmp('deskripsi').disable();
		Ext.getCmp('dashboard').disable();
		Ext.getCmp('status').disable();
	}
	
	function enable(){
        form_bp_general.getForm().reset();
        Ext.getCmp('kode').focus();
        Ext.getCmp('btn_simpan').enable();
        Ext.getCmp('btn_hapus').disable();
        Ext.getCmp('btn_ubah').disable();
		Ext.getCmp('kode').enable();
		Ext.getCmp('nama').enable();
		Ext.getCmp('deskripsi').enable();
		Ext.getCmp('dashboard').enable();
		Ext.getCmp('status').enable();
    }

	function simpan_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'c_utility/s_JKP',
			method: 'POST',
			success: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Berhasil");
				ds_klppengguna.load();
				disable();
			},
			failure: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Gagal");
			}
		});
	}

	function hapus_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk menghapus Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_utility/d_JKP',
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
							ds_klppengguna.load();
							disable();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Gagal");
						}
					});
				}
			}
		})
	}

	function ubah_grid(namaForm) {
		var msgplus;
//		if (kodex != Ext.getCmp('kode').getValue()) {
//			msgplus = '<center>Semua field dapat berubah terkecuali field "KODE"!? </br> </center>';
//		} else {
			msgplus = '';
//		}
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			width: 350,
			msg: msgplus + "<center> Anda Yakin Untuk Mengubah Data ini?</center>",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_utility/u_JKP',
						params: {
							//	kriteria: kriteria
						},
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Berhasil");
							ds_klppengguna.load();
							disable();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Gagal");
						}
					});
				}
			}
		});
	}
	SET_PAGE_CONTENT(form_bp_general);
}