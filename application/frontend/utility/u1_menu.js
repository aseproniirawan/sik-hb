function u1_menu() {
	var hapusfotox = 0;
	var ds_jhirarki = dm_jhirarki();
	var ds_grid = dm_grid();
	var ds_status = dm_status();
	var kodex;
	
	p = new Ext.Panel({
		bodyBorder: false,
		width: 170,
		height: 160,
		html: '<p><i>PHOTO</i></p>'
	});
	
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
		store: ds_grid,
		displayInfo: true,
		displayMsg: 'Data Menu Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var grid_nya = new Ext.grid.GridPanel({
		store: ds_grid,
		frame: true,
		height: 530,
		bodyStyle: 'padding:3px 3px 3px 3px',
		plugins: cari_data,
		id: 'grid_det_product',
		forceFit: true,
		tbar: ['->'],
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
			header: 'IDmenu',
			width: 50,
                        hidden:true,
			dataIndex: 'idmenu',
			sortable: true
		},{
			header: 'Kode',
			width: 50,
			dataIndex: 'kdmenu',
			sortable: true
		},
		{
			header: 'Nama',
			width: 150,
			dataIndex: 'nmmenu',
			sortable: true
		},
		{
			header: 'Deskripsi',
			width: 150,
			dataIndex: 'deskripsi',
			sortable: true
		},
		{
			header: 'Hierarki',
			width: 150,
			dataIndex: 'nmjnshirarki',
			sortable: true
		},
		{
			header: 'Status',
			width: 150,
			dataIndex: 'nmstatus',
			sortable: true
		},
		{
			header: 'Parent',
			width: 150,
			dataIndex: 'nmsubmenu',
			sortable: true
		},
		{
			header: 'Url',
			width: 150,
			dataIndex: 'url',
			sortable: true
		},
		{
			header: 'Gambar',
			width: 150,
			dataIndex: 'gambar',
			sortable: true
		}],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {
				var rec = ds_grid.getAt(rowIdx);
				Ext.getCmp("idmenu").setValue(rec.data["idmenu"]);
				Ext.getCmp("kode").setValue(rec.data["kdmenu"]);
				kodex = rec.data["kdmenu"];
				Ext.getCmp("nama").setValue(rec.data["nmmenu"]);
				Ext.getCmp("deskripsi").setValue(rec.data["deskripsi"]);
				Ext.getCmp("hierarki").setValue(rec.data["nmjnshirarki"]);
				Ext.getCmp("status").setValue(rec.data["nmstatus"]);
				Ext.getCmp("submenu").setValue(rec.data["nmsubmenu"]);
				Ext.getCmp("url").setValue(rec.data["url"]);
				Ext.getCmp("file_gambar").setValue(rec.data["gambar"]);
				Ext.getCmp("temp_foto").setValue(rec.data["gambar"]);
				isi_foto_icons(Ext.getCmp("file_gambar").getValue());
				Ext.getCmp('btn_simpan').disable();
				Ext.getCmp('btn_ubah').enable();
				Ext.getCmp('btn_hapus').enable();
				Ext.getCmp('form_bp_general').enable();
				Ext.getCmp('btn_data_submenu').enable();
				//Ext.getCmp('kode').setReadOnly(true);
			}
		}
	});

	function awal() {
		Ext.getCmp('form_bp_general').enable();
		Ext.getCmp('btn_simpan').disable();
		Ext.getCmp('btn_hapus').disable();
		Ext.getCmp('btn_ubah').disable();
		Ext.getCmp('kode').disable();
		Ext.getCmp('nama').disable();
		Ext.getCmp('deskripsi').disable();
		Ext.getCmp('hierarki').disable();
		Ext.getCmp('status').disable();
		Ext.getCmp('submenu').disable(); 
		Ext.getCmp('btn_data_submenu').disable();
		Ext.getCmp('url').disable(); 
		Ext.getCmp('comp_file_gambar').disable(); 
		Ext.getCmp('file_gambar').disable();
	}
        
    function after(){
        form_bp_general.getForm().reset();
        Ext.getCmp('kode').focus();
        Ext.getCmp('btn_simpan').enable();
        Ext.getCmp('btn_hapus').disable();
        Ext.getCmp('btn_ubah').disable();
		Ext.getCmp('kode').enable();
		Ext.getCmp('nama').enable();
		Ext.getCmp('deskripsi').enable();
		Ext.getCmp('hierarki').enable();
		Ext.getCmp('status').enable();
		Ext.getCmp('submenu').enable(); 
		Ext.getCmp('btn_data_submenu').enable();
		Ext.getCmp('url').enable(); 
		Ext.getCmp('comp_file_gambar').enable(); 
		Ext.getCmp('file_gambar').enable();			
		isi_foto_icons('');
        }
        
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		fileUpload: true,
		forceFit: true,
		monitorValid: true,
		title: 'Menu',
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
					height: 595,
					//autoHeight:true,
					title: 'Detail Menu',
					defaults: {
						labelWidth: 100,
						labelAlign: 'right'
					},
					items: [{
						columnWidth: 1,
						border: false,
						layout: 'form',
						items: [{
							xtype: 'textfield',
							//fieldLabel: 'ID',
							id: 'idmenu',
							width: 70,
							allowBlank: true,
                                                        hidden:true,
							
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
							fieldLabel: 'Hierarki',
							id: 'hierarki',
							width: 125,
							height: 50,
							allowBlank: false,
							store: ds_jhirarki,
							triggerAction: 'all',
							editable: false,
							valueField: 'idjnshirarki',
							displayField: 'nmjnshirarki',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_hier',
							listeners: {},
							typeAhead: true,
							mode: 'local',
							emptyText: 'Pilih...',
							selectOnFocus: true
						},
						{
							xtype: 'combo',
							fieldLabel: 'Status',
							id: 'status',
							width: 125,
							height: 50,
							allowBlank: false,
							store: ds_status,
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
							xtype: 'compositefield',
							name: 'comp_submenu',
							fieldLabel: 'Parent',
							//labelStyle: 'width:160px',
							id: 'comp_submenu',
							items: [{
								xtype: 'textfield',
								id: 'submenu',
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
								//text: ' ... ',
								iconCls: 'silk-find',
								id: 'btn_data_submenu',
								width: 3,
								handler: function() {
									find_x("Data Submenu", 2);
								}
							}]
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Url',
							id: 'url',
							allowBlank: true,
							width: 250
						},
						{
							xtype: 'compositefield',
							name: 'comp_file_gambar',
							fieldLabel: 'File Gambar',
							
							id: 'comp_file_gambar',
							items: [{
								xtype: 'fileuploadfield',
								id: 'file_gambar',
								emptyText: 'Select an image',
								fieldLabel: '',
							
								//allowBlank:false,
								name: 'file_gambar',
								width: 200,
								buttonText: '',
								buttonCfg: {
									iconCls: 'silk-image'
									},
								listeners: {
									valid: function() {
									hapusfotox = 1;
									}
								}
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Poto',
									hidden:true,
									labelStyle: 'width:160px',
									id: 'temp_foto',
									name: 'temp_foto',
									width: 175
								}]
						},
						{
							layout: 'form',
							bodyStyle: 'padding:0px 3px 0px 105px',
							//atas kanan bawah kiri
							border: false,
							items: [{
								xtype: 'fieldset',
								id: 'fieldfoto',
								title: 'Gambar',
								height: 160,
								width: 130,
								items: [p]
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
                                    after();
									Ext.getCmp('kode').focus();
									Ext.getCmp('kode').setReadOnly(false);
                                                                       
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
				// bodyStyle: 'padding:10px 3px 3px 5px',
				border: false,
				items: [grid_nya]
			}]
		}],
		listeners: {
			afterrender: awal
		}
	});

	function simpan_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'c_utility/upload',
			method: 'POST',
			params: {
				table:'menu',
				get_foto:Ext.getCmp('file_gambar').getValue()
			},
			success: function(form_bp_general, o) {
				if (o.result.success == 'true') {
					if (o.result.nama != '') {
						Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil, File ' + o.result.nama + ' berhasil di upload');
					} else {
						Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					}
					  after();
					  awal();
					  ds_grid.reload();
				} else if (o.result.success == 'false') {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal, File ' + o.result.nama + ' gagal di upload' + o.result.data);
				}
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
						url: BASE_URL + 'c_utility/d_MN',
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
							after();
							awal();
							ds_grid.load();
							  
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
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk Mengubah Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_utility/upload_update',
						method: 'POST',
						params: {
							table:'menu',
							get_foto:Ext.getCmp('file_gambar').getValue()
						},
						success: function(form_bp_general, o) {
							if (o.result.success == 'true') {
								if (o.result.nama != '') {
									Ext.MessageBox.alert('Informasi', 'Ubah Data Berhasil' + o.result.nama + o.result.data);
								} else {
									Ext.MessageBox.alert('Informasi', 'Ubah Data Berhasil');
								}
								after();
								ds_grid.load();
							} else if (o.result.success == 'false') {
								Ext.MessageBox.alert('Informasi', 'Ubah Data Gagal, File ' + o.result.nama + ' gagal di upload' + o.result.data);
							}
						awal();
						}
					});
				}
			}
		});
	}
	SET_PAGE_CONTENT(form_bp_general);
}