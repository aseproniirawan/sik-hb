function m_productx() {
	function toMoney(v) {
		return formatmoney(v);
	}
        var ds_kelamin = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'c_master_product/gridMaster_kelamin',
			method: 'POST'
		}),
		totalProperty: 'results',
		root: 'data',
		fields: [{
			name: 'KDJNSKELAMIN',
			mapping: 'KDJNSKELAMIN'
		},
		{
			name: 'NMJNSKELAMIN',
			mapping: 'NMJNSKELAMIN'
		}]
	});
        
        var ds_status = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'c_master_product/gridMaster_status',
			method: 'POST'
		}),
		totalProperty: 'results',
		root: 'data',
		fields: [{
			name: 'KDSTPEGAWAI',
			mapping: 'KDSTPEGAWAI'
		},
		{
			name: 'NMSTPEGAWAI',
			mapping: 'NMSTPEGAWAI'
		}]
	});
        
	var f_m_product = new Ext.form.FormPanel({
		border: false,
		id: 'f_m_product',
		labelAlign: 'left',
		buttonAlign: 'left',
		bodyStyle: 'padding:3px 3px 3px 5px',
		monitorValid: true,
		width: 470,
		items: [{
			layout: 'column',
			border: false,
			items: [{
				columnWidth: 1,
				border: false,
				layout: 'form',
				items: [{
					xtype: 'fieldset',
					title: 'Detail Pegawai',
					height: 500,
					items: [{
						columnWidth: 1,
						border: false,
						layout: 'form',
						items: [{
							xtype: 'textfield',
							fieldLabel: 'NIP',
							id: 'nip',
							width: 70,
							allowBlank: false,
							disabled: true,
							listeners: {}
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Nama Lengkap',
							id: 'nama_lengkap',
							allowBlank: false,
							width: 175
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Nama Panggilan',
							id: 'nama_panggilan',
							width: 175
						},
						{
							xtype: 'combo',
							width: 125,
                                                        height: 50,
							allowBlank: false,
							store: ds_kelamin,
							fieldLabel: 'Jenis Kelamin',
							id: 'jenis_kelamin',
							triggerAction: 'all',
							editable: false,
							valueField: 'KDJNSKELAMIN',
							displayField: 'NMJNSKELAMIN',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_jk',
							listeners: {},
                                                        
                                                        typeAhead: true,
                                                        mode: 'remote',
                                                        emptyText:'Pilih...',
                                                        selectOnFocus:true
                                                        
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Tempat Lahir',
							id: 'tempat_lahir',
							allowBlank: false,
							width: 150,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('harga_juali').focus();
									}, c);
								},
								'change': function() {
									cek_input_number('harga_modal');
								},
								'focus': function() {}
							}
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Tanggal Lahir',
							id: 'tanggal_lahir',
                                                        format: "d/m/Y",
							allowBlank: false,
							width: 100,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('stok').focus();
									}, c);
								}
							}
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Alamat',
							id: 'alamat',
							width: 200,
							listeners: {
								
							}
						},
						{
							xtype: 'textfield',
							fieldLabel: 'No. Telp Rumah',
							readOnly: false,
							id: 'telp_rumah',
							width: 150,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('warna').focus();
									}, c);
								}
							}
						},
						{
							xtype: 'textfield',
							fieldLabel: 'No. Handphone',
							readOnly: false,
							id: 'handphone',
							width: 150,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('warna').focus();
									}, c);
								}
							}
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Tanggal Masuk',
							readOnly: false,
							id: 'tanggal_masuk',
                                                        format: "d/m/Y",
							width: 100,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('warna').focus();
									}, c);
								}
							}
						},{
							xtype: 'datefield',
							fieldLabel: 'Tanggal Keluar',
							readOnly: false,
							id: 'tanggal_keluar',
                                                        format: "d/m/Y",
							width: 100,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('warna').focus();
									}, c);
								}
							}
						},
						{
							xtype: 'combo',
							width: 100,
                                                        height: 50,
							allowBlank: false,
							store: ds_status,
							fieldLabel: 'Status',
							id: 'status',
							triggerAction: 'all',
							editable: false,
							valueField: 'KDSTPEGAWAI',
							displayField: 'NMSTPEGAWAI',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_st',
							listeners: {},
                                                        
                                                        typeAhead: true,
                                                        mode: 'remote',
                                                        emptyText:'Pilih...',
                                                        selectOnFocus:true
                                                        
						},
						{
							xtype: 'textarea',
							fieldLabel: 'Catatan',
							id: 'catatan',
							width: 270,
							listeners: {
								'render': function(c) {
									c.getEl().on('keypress', function(e) {
										if (e.getKey() == 13) Ext.getCmp('warna').focus();
									}, c);
								}
							}
						},
						{
							xtype: 'compositefield',
							name: 'comp_file_gambar',
							fieldLabel: 'File Gambar',
							id: 'comp_file_gambar',
							items: [{
								xtype: 'textfield',
								id: 'file_gambar',
								width: 200,
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
								text: ' ... ',
								id: 'btn_data_gambar',
								width: 3,
								handler: function() {
									find_x("Data Gambar", 6);
								}
							}]
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
									f_m_product.getForm().reset();
									Ext.getCmp('f_m_product').enable();
									Ext.getCmp('btn_simpan_product').enable();
									Ext.getCmp('btn_hapus_product').disable();
									Ext.getCmp('btn_ubah_product').disable();
									Ext.getCmp('nip').focus();
								}
							},
							{
								text: 'Simpan',
								id: 'btn_simpan_product',
								iconCls: 'silk-save',
								handler: function() {
									simpan_grid("employes", "f_m_product");
								}
							},
							{
								text: 'Hapus',
								id: 'btn_hapus_product',
								iconCls: 'silk-delete',
								handler: function() {
									hapus_grid("employes", "f_m_product");
								}
							},
							{
								text: 'Ubah',
								id: 'btn_ubah_product',
								iconCls: 'silk-edit',
								handler: function() {
									ubah_grid("employes", "f_m_product");
								}
							}, '-',
							{
								text: 'Keluar',
								id: 'btn_keluar_product',
								iconCls: 'silk-move_room',
								hidden: true,
								handler: function() {}
							},
							{
								text: 'Upload Gambar ',
								id: 'btn_data_Upload',
								handler: function() {
									upload_x();
								}
							}]
						}]
					}]
				}]
			}]
		}]
	});
	function cek_input_number(component_id) {
		var id = Ext.getCmp(component_id);
		if (isNaN(id.getValue()) && id.getValue() != '') {
			Ext.example.msg('Validasi Input', 'Input Harus Bilangan atau Numeric');
			id.setValue('');
		} else {
			id.setValue(formatmoney(id.getValue()));
		}
	}
	var ds_product = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'c_master_product/gridMaster_product',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 5
		},
		root: 'data',
		totalProperty: 'results',
		autoLoad: true,
		fields: [{
			name: "nip",
			mapping: "NIP"
		},
		{
			name: "nmlengkap",
			mapping: "NMLENGKAP"
		},
		{
			name: "nmpanggilan",
			mapping: "NMPANGGILAN"
		},
		{
			name: "kdjeniskelamin",
			mapping: "KDJNSKELAMIN"
		},
		{
			name: "tptlahir",
			mapping: "TPTLAHIR"
		},
		{
			name: "tgllahir",
			mapping: "TGLLAHIR"
		},
		{
			name: "alamat",
			mapping: "ALAMAT"
		},
		{
			name: "notelp",
			mapping: "NOTELP"
		},
		{
			name: "nohp",
			mapping: "NOHP"
		},
		{
			name: "foto",
			mapping: "FOTO"
		},
		{
			name: "tglmasuk",
			mapping: "TGLMASUK"
		},
		{
			name: "tglkeluar",
			mapping: "TGLKELUAR"
		},
		{
			name: "kdstpegawai",
			mapping: "KDSTPEGAWAI"
		},
		{
			name: "catatan",
			mapping: "CATATAN"
		}]
	});
	var sm_product = new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {}
	});
	var cari_data_product = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'local',
		width: 200
	})];
	var grid_product = new Ext.grid.GridPanel({
		store: ds_product,
		frame: true,
		width: 630,
		height: 400,
		plugins: cari_data_product,
		id: 'grid_det_product',
		forceFit: true,
		tbar: [{hidden:true,
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
		sm: sm_product,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		columns: [{
			header: 'NIP',
			width: 50,
			dataIndex: 'nip',
			sortable: true
		},
		{
			header: 'Nama Lengkap',
			width: 150,
			dataIndex: 'nmlengkap',
			sortable: true
		},
		{
			header: 'Nama Panggilan',
			width: 150,
			dataIndex: 'nmpanggilan',
			sortable: true
		},
		{
			header: 'Jenis Kelamin',
			width: 50,
			dataIndex: 'kdjeniskelamin',
			sortable: true
		},
		{
			header: 'Tempat Lahir',
			width: 100,
			dataIndex: 'tptlahir',
			sortable: true
		},
		{
			header: 'Tanggal Lahir',
			width: 80,
			dataIndex: 'tgllahir',
			sortable: true
//                        ,
//			renderer: toMoney
		},
		{
			header: 'Alamat',
			width: 80,
			dataIndex: 'alamat',
			sortable: true
		},
		{
			header: 'No Telp',
			width: 100,
			dataIndex: 'notelp',
			sortable: true
		}
                ,{  
			header: 'Handphone',
			width: 100,
			dataIndex: 'nohp',
			sortable: true
		},
		{
			header: 'Foto',
			width: 100,
			dataIndex: 'foto',
			
			sortable: true
		},
		{
			header: 'Tanggal Masuk',
			width: 100,
			dataIndex: 'tglmasuk',
			sortable: true
		},
		{
			header: 'Tanggal Keluar',
			width: 100,
			dataIndex: 'tglkeluar',
			sortable: true
		},
		{
			header: 'Status',
			width: 50,
			dataIndex: 'kdstpegawai',
			sortable: true
		},
		{
			header: 'Catatan',
			width: 100,
			dataIndex: 'catatan',
			sortable: true
		}],
		bbar: paging_product,
		listeners: {
			rowdblclick: function rowDbClick(grid, rowIdx) {
				var rec = ds_product.getAt(rowIdx);
				Ext.getCmp("nip").setValue(rec.data["nip"]);
				Ext.getCmp("nama_lengkap").setValue(rec.data["nmlengkap"]);
				Ext.getCmp("nama_panggilan").setValue(rec.data["nmpanggilan"]);
				Ext.getCmp("jenis_kelamin").setValue(rec.data["kdjeniskelamin"]);
				Ext.getCmp("tempat_lahir").setValue(rec.data["tptlahir"]);
				Ext.getCmp("tanggal_lahir").setValue(rec.data["tgllahir"]);
				Ext.getCmp("alamat").setValue(rec.data["alamat"]);
				Ext.getCmp("telp_rumah").setValue(rec.data["notelp"]);
				Ext.getCmp("handphone").setValue(rec.data["nohp"]);
				Ext.getCmp("file_gambar").setValue(rec.data["foto"]);
				Ext.getCmp("tanggal_masuk").setValue(rec.data["tglmasuk"]);
				Ext.getCmp("tanggal_keluar").setValue(rec.data["tglkeluar"]);
				Ext.getCmp("status").setValue(rec.data["kdstpegawai"]);
				Ext.getCmp("catatan").setValue(rec.data["catatan"]);
				Ext.getCmp('btn_simpan_product').disable();
				Ext.getCmp('btn_ubah_product').enable();
				Ext.getCmp('btn_hapus_product').enable();
				Ext.getCmp('f_m_product').enable();
				
			}
		}
	});
	var paging_product = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_product,
		displayInfo: true,
		displayMsg: 'Data Produk Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var tabs2 = new Ext.Panel({
		forceFit: true,
		layout: 'column',
		items: [{
			columnWidth: .42,
			xtype: 'panel',
			border: false,
			bodyStyle: 'padding:3px 3px 3px 10px',
			items: [f_m_product]
		},
		{
			columnWidth: .56,
			xtype: 'panel',
			border: false,
			bodyStyle: 'padding:20px 3px 3px 10px',
			items: [grid_product]
		}],
		listeners: {
			afterrender: awal
		}
	});
	function awal() {
		f_m_product.getForm().reset();
		Ext.getCmp('f_m_product').enable();
		Ext.getCmp('btn_simpan_product').disable();
		Ext.getCmp('btn_hapus_product').disable();
		Ext.getCmp('btn_ubah_product').disable();
	}
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general_id',
		region: 'center',
		autoScroll: true,
		buttonAlign: 'left',
		bodyStyle: 'padding: 5px',
		border: false,
		disabled: true,
		waitMsg: 'Waiting...',
		maskDisabled: false,
		monitorValid: true,
		items: [{
			layout: 'form',
			border: false,
			items: [tabs2]
		}]
	});
	var o_m_product = new Ext.Panel({
		bodyStyle: 'padding: 5px',
		title: 'Form Master Pegawai',
		defaults: {
			anchor: '-10'
		},
		border: true,
		margins: '0 0 5 0',
		plain: true,
		layout: 'border',
		items: [form_bp_general]
	});
	function simpan_grid(kriteria, namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'c_master_product/saveAllGrid',
			method: 'POST',
			success: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Berhasil");
				ds_product.load();
				f_m_product.getForm().reset();
				Ext.getCmp('f_m_product').enable();
				Ext.getCmp('btn_simpan_product').enable();
				Ext.getCmp('btn_hapus_product').disable();
				Ext.getCmp('btn_ubah_product').disable();
			},
			failure: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Gagal");
			}
		});
	}
	function hapus_grid(kriteria, namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk menghapus Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_master_product/deleteAllGrid',
						params: {
							kriteria: kriteria
						},
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
							ds_product.load();
							f_m_product.getForm().reset();
							Ext.getCmp('f_m_product').enable();
							Ext.getCmp('btn_simpan_product').enable();
							Ext.getCmp('btn_hapus_product').disable();
							Ext.getCmp('btn_ubah_product').disable();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Gagal");
						}
					});
				}
			}
		})
	}
	function ubah_grid(kriteria, namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk Mengubah Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_master_product/update',
						params: {
							kriteria: kriteria
						},
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Berhasil");
							ds_product.load();
							f_m_product.getForm().reset();
							Ext.getCmp('f_m_product').enable();
							Ext.getCmp('btn_simpan_product').enable();
							Ext.getCmp('btn_hapus_product').disable();
							Ext.getCmp('btn_ubah_product').disable();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Gagal");
						}
					});
				}
			}
		});
	}
	get_content(o_m_product);
}