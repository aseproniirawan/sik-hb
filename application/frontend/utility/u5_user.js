function u5_user() {
	var ds_jpengguna = dm_jpengguna();
	var ds_klppengguna = dm_klppengguna();
	var ds_pengguna = dm_pengguna();
	var ds_status = dm_status();
	
	var SYS_DATE = new Date();
	var hapusfotox = 0;
	
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
	var cari_data_nya = [new Ext.ux.grid.Search({
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
		store: ds_pengguna,
		displayInfo: true,
		displayMsg: 'Data Pengguna Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var grid_nya = new Ext.grid.GridPanel({
		store: ds_pengguna,
		frame: true,
		//width: 630,
		height: 530,
		plugins: cari_data_nya,
		id: 'grid_det_nya',
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
			header: 'User Id',
			width: 50,
			dataIndex: 'userid',
			sortable: true
		},
		{
			header: 'Password',
			width: 150,
			dataIndex: 'password',
			sortable: true
		},
		{
			header: 'Nama Lengkap',
			width: 150,
			dataIndex: 'nmlengkap',
			sortable: true
		},
		{
			header: 'Email',
			width: 50,
			dataIndex: 'email',
			sortable: true
		},
		{
			header: 'No Handphone',
			width: 50,
			dataIndex: 'nohp',
			sortable: true
		},
		{
			header: 'No. Ref(NPM/NIP/NIDN)',
			width: 100,
			dataIndex: 'noref',
			sortable: true
		},
		{
			header: 'ID Kel Pengguna',
			width: 80,
			dataIndex: 'nmklppengguna',
			sortable: true
		},
		{
			header: 'ID Jenis Pengguna',
			width: 80,
			dataIndex: 'nmjnspengguna',
			sortable: true
		},
		{
			header: 'Status',
			width: 80,
			dataIndex: 'nmstatus',
			sortable: true
		},
		{
			header: 'Tanggal Daftar',
			width: 90,
			dataIndex: 'tgldaftar',
			sortable: true
		},
		{
			header: 'Foto',
			width: 90,
			dataIndex: 'foto',
			sortable: true
		}],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {
				var rec = ds_pengguna.getAt(rowIdx);
				Ext.getCmp("userid").setValue(rec.data["userid"]);
                                Ext.getCmp("userid").setReadOnly(true);
				Ext.getCmp("password").setValue(zzz(rec.data["password"]));
				Ext.getCmp("nama_lengkap").setValue(rec.data["nmlengkap"]);
				Ext.getCmp("email").setValue(rec.data["email"]);
				Ext.getCmp("handphone").setValue(rec.data["nohp"]);
				Ext.getCmp("no_ref").setValue(rec.data["noref"]);
				Ext.getCmp("kelompok_pengguna").setValue(rec.data["idklppengguna"]);
				Ext.getCmp("jenis_pengguna").setValue(rec.data["idjnspengguna"]);
				Ext.getCmp("status").setValue(rec.data["idstatus"]);
				Ext.getCmp("tgldaftar").setValue(rec.data["tgldaftar"]);
				Ext.getCmp("file_gambar").setValue(rec.data["foto"]);
				Ext.getCmp("temp_foto").setValue(rec.data["foto"]);
				user_foto_ori(Ext.getCmp("file_gambar").getValue());
				Ext.getCmp('btn_simpan').disable();
				Ext.getCmp('btn_ubah').enable();
				Ext.getCmp('btn_hapus').enable();
				Ext.getCmp('form_bp_general').enable();
			}
		}
	});
	
	function zzz(encStr){
        if (typeof atob === 'function') {
            return atob(encStr); 
        }
        var base64s = this.base64s;        
        var bits;
        var decOut = "";
        var i = 0;
        for(; i<encStr.length; i += 4){
            bits = (base64s.indexOf(encStr.charAt(i)) & 0xff) <<18 | (base64s.indexOf(encStr.charAt(i +1)) & 0xff) <<12 | (base64s.indexOf(encStr.charAt(i +2)) & 0xff) << 6 | base64s.indexOf(encStr.charAt(i +3)) & 0xff;
            decOut += String.fromCharCode((bits & 0xff0000) >>16, (bits & 0xff00) >>8, bits & 0xff);
        }
        if(encStr.charCodeAt(i -2) == 61){
            return(decOut.substring(0, decOut.length -2));
        }
        else if(encStr.charCodeAt(i -1) == 61){
            return(decOut.substring(0, decOut.length -1));
        }
        else {
            return(decOut);
        }
	}
	var paging_nya = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_pengguna,
		displayInfo: true,
		displayMsg: 'Data Produk Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		//forceFit: true,
		fileUpload: true,
		autoScroll: true,
		monitorValid: true,
		title: 'Pengguna',
		layout: 'column',
		items: [{
			columnWidth: .42,
			xtype: 'panel',
			border: false,
			bodyStyle: 'padding:3px 3px 3px 3px',
			items: [{
				layout: 'form',
				bodyStyle: 'padding:0px 0px 0px 0px',
				border: false,
				items: [{
					xtype: 'fieldset',
					title: 'Detail Pengguna',
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
							fieldLabel: 'Userid',
							labelStyle: 'width:160px',
							id: 'userid',
							width: 175,
							allowBlank: false,
							listeners: {}
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Password',
							labelStyle: 'width:160px',
							id: 'password',
							allowBlank: false,
							width: 175
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Nama Lengkap',
							labelStyle: 'width:160px',
							id: 'nama_lengkap',
							width: 175
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Email',
							labelStyle: 'width:160px',
							id: 'email',
							width: 175
						},
						{
							xtype: 'textfield',
							fieldLabel: 'No. Handphone',
							labelStyle: 'width:160px',
							id: 'handphone',
							width: 175
						},
						{
							xtype: 'combo',
							width: 125,
							//  height: 50,
							allowBlank: false,
							store: ds_jpengguna,
							fieldLabel: 'Jenis Pengguna',
							labelStyle: 'width:160px',
							id: 'jenis_pengguna',
							triggerAction: 'all',
							editable: false,
							valueField: 'idjnspengguna',
							displayField: 'nmjnspengguna',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_jpengguna',
							listeners: {},
							typeAhead: true,
							mode: 'local',
							emptyText: 'Pilih...',
							selectOnFocus: true
						},
						{
//							xtype: 'compositefield',
//							name: 'comp_no_ref',
//							labelStyle: 'width:160px',
//							fieldLabel: 'No. Ref. (NPM/NIP/NIDN)',
//							id: 'comp_no_ref',
//							items: [
//                                                            {
								xtype: 'textfield',
                                                                fieldLabel: 'No. Ref. (NPM/NIP/NIDN)',
                                                                labelStyle: 'width:160px',
								id: 'no_ref',
								width: 175,
								listeners: {
									'render': function(c) {
										c.getEl().on('keypress', function(e) {
											if (e.getKey() == 13) Ext.getCmp('btn_simpan').focus();
										}, c);
									}
								}
							},
							{
								xtype: 'button',
								text: ' ... ',
								id: 'btn_no_ref',
                                                                hidden:true,
								width: 3,
								handler: function() {
									find_x("Data Gambar", 6);
								}
//							}]
						},
						{
							xtype: 'combo',
							width: 125,
							height: 50,
							allowBlank: false,
							store: ds_klppengguna,
							fieldLabel: 'Kelompok Pengguna',
							labelStyle: 'width:160px',
							id: 'kelompok_pengguna',
							triggerAction: 'all',
							editable: false,
							valueField: 'idklppengguna',
							displayField: 'nmklppengguna',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_klppengguna',
							listeners: {},
							typeAhead: true,
							mode: 'local',
							emptyText: 'Pilih...',
							selectOnFocus: true
						},
						{
							xtype: 'combo',
							width: 100,
							height: 50,
							allowBlank: false,
							store: ds_status,
							fieldLabel: 'Status',
							labelStyle: 'width:160px',
							id: 'status',
							triggerAction: 'all',
							editable: false,
							valueField: 'idstatus',
							displayField: 'nmstatus',
							forceSelection: true,
							submitValue: true,
							hiddenName: 'h_st',
							listeners: {},
							typeAhead: true,
							mode: 'local',
							emptyText: 'Pilih...',
							selectOnFocus: true
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Tanggal Daftar',
							labelStyle: 'width:160px',
							id: 'tgldaftar',
							name: 'tgldaftar',
							format: "d/m/Y",
							allowBlank: false,
							width: 100,
							listeners: {
                                                                'afterrender': function(t, d) {
                                                                       
                                                                        Ext.getCmp('tgldaftar').setValue(SYS_DATE);
                                                                }
                                                        }
						}/* ,
						{
							xtype: 'compositefield',
							name: 'comp_file_gambar',
							fieldLabel: 'File Gambar',
							labelStyle: 'width:160px',
							id: 'comp_file_gambar',
							items: [{
								xtype: 'textfield',
								id: 'file_gambar',
								width: 200,
								listeners: {
									'change': function(c) {
										user_foto_ori(Ext.getCmp("file_gambar").getValue());
									}
								}
							},
							{
								xtype: 'button',
								text: ' ... ',
								id: 'btn_data_gambar',
								width: 3,
								handler: function() {
									find_x("Data Gambar", 1);
								}
							}]
						} */,
						{
							xtype: 'compositefield',
							name: 'comp_file_gambar',
							fieldLabel: 'File Gambar',
							labelStyle: 'width:160px',
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
							bodyStyle: 'padding:0px 3px 0px 163px',
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
								id: 'btn_baru_nya',
								iconCls: 'silk-add',
								handler: function() {
									enable();
									Ext.getCmp("userid").setReadOnly(false);
									Ext.getCmp('userid').focus(); 
									user_foto_ori('');
									Ext.getCmp('tgldaftar').setValue(SYS_DATE);
								}
							},
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
							}, '-',
							{
								text: 'Keluar',
								id: 'btn_keluar_nya',
								iconCls: 'silk-move_room',
								hidden: true,
								handler: function() {}
							},
							{
								text: 'Upload Gambar ',
								hidden: true,
								id: 'btn_data_Upload',
								handler: function() {
									upload_x();
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
			afterrender: disable
		}
	});

	function disable() {
		Ext.getCmp('form_bp_general').enable();
		Ext.getCmp('btn_simpan').disable();
		Ext.getCmp('btn_hapus').disable();
		Ext.getCmp('btn_ubah').disable();
		Ext.getCmp('userid').disable();
		Ext.getCmp('password').disable();
		Ext.getCmp('nama_lengkap').disable();
		Ext.getCmp('email').disable();
		Ext.getCmp('handphone').disable();
		Ext.getCmp('jenis_pengguna').disable();
		Ext.getCmp('no_ref').disable();
		Ext.getCmp('kelompok_pengguna').disable();
		Ext.getCmp('status').disable();
		Ext.getCmp('tgldaftar').disable();
		Ext.getCmp('comp_file_gambar').disable();
		Ext.getCmp('file_gambar').disable();
	}
	
	function enable() {
		form_bp_general.getForm().reset();
		Ext.getCmp('form_bp_general').enable();
		Ext.getCmp('btn_simpan').enable();
		Ext.getCmp('btn_hapus').disable();
		Ext.getCmp('btn_ubah').disable();
		Ext.getCmp('userid').enable();
		Ext.getCmp('password').enable();
		Ext.getCmp('nama_lengkap').enable();
		Ext.getCmp('email').enable();
		Ext.getCmp('handphone').enable();
		Ext.getCmp('jenis_pengguna').enable();
		Ext.getCmp('no_ref').enable();
		Ext.getCmp('kelompok_pengguna').enable();
		Ext.getCmp('status').enable();
		Ext.getCmp('tgldaftar').enable();
		Ext.getCmp('comp_file_gambar').enable();
		Ext.getCmp('file_gambar').enable();
	}

	function simpan_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'c_utility/upload',
			method: 'POST',
			params: {
				table:'pengguna',
				get_foto:Ext.getCmp('file_gambar').getValue()
			},
			success: function(form_bp_general, o) {
				if (o.result.success == 'true') {
					if (o.result.nama != '') {
						Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil, File ' + o.result.nama + ' berhasil di upload');
					} else {
						Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					}
					ds_pengguna.load();					
					form_nya.getForm().reset();
					disable();
					user_foto_ori('');
					Ext.getCmp('tgldaftar').setValue(SYS_DATE);
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
						url: BASE_URL + 'c_utility/d_PG',
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
							ds_pengguna.load();
							form_nya.getForm().reset();
							disable();
							user_foto_ori('');
							Ext.getCmp('tgldaftar').setValue(SYS_DATE);
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
							table:'pengguna',
							get_foto:Ext.getCmp('file_gambar').getValue()
						},
						success: function(form_bp_general, o) {
							if (o.result.success == 'true') {
								if (o.result.nama != '') {
									Ext.MessageBox.alert('Informasi', 'Ubah Data Berhasil' + o.result.nama + o.result.data);
								} else {
									Ext.MessageBox.alert('Informasi', 'Ubah Data Berhasil');
								}
								ds_pengguna.load();
								form_nya.getForm().reset();
								disable();
								user_foto_ori('');
								Ext.getCmp('tgldaftar').setValue(SYS_DATE);
							} else if (o.result.success == 'false') {
								Ext.MessageBox.alert('Informasi', 'Ubah Data Gagal, File ' + o.result.nama + ' gagal di upload' + o.result.data);
							}
						}
					});
				}
			}
		});
	}
	SET_PAGE_CONTENT(form_bp_general);
	
}