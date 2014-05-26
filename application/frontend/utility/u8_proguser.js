function u8_proguser() {
	var ds_klppengguna = dm_klppengguna();
	var ds_gridotoritas = dm_gridotoritas();
        
    var cm = new Ext.grid.ColumnModel({
        defaults: {
            sortable: true
        },
        columns: [{
			header: 'Kode Menu',
			width: 150,
			dataIndex: 'kdmenu',
			sortable: true
		},
		{
			header: 'Menu',
			width: 150,
			dataIndex: 'nmmenu',
			sortable: true
		},
		{
			xtype: 'checkcolumn',
            header: 'Status',
			dataIndex: 'user_aktif',
            id:'status_check',
            width: 150,
			readonly:false
		}]
    });
	
    var vw = new Ext.grid.GridView({emptyText:'< Pengguna Belum Dipilih  >'});
	
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
		store: ds_gridotoritas,
		displayInfo: true,
		displayMsg: 'Data Pengguna Dari {0} - {1} of {2}',
		emptyMsg: 'Kelompok Pengguna Belum Dipilih.'
	});
        
	var grid_nya = new Ext.grid.EditorGridPanel({
		store: ds_gridotoritas,
		frame: true,
		width: 1140,
		height: 520,
		//plugins: cari_data,
		id: 'grid_det_product',
                forceFit: true,
		tbar: [{
			text: 'Pengguna (Nama Lengkap)',
			handler: function() {
				
			}
		},{
			xtype: 'textfield',
			width: 125,
			height: 50,
			allowBlank: false,
			id: 'pengguna',
			listeners: {},
			typeAhead: true,
			emptyText:'Pilih...',
			selectOnFocus:true
                
		},{
			xtype: 'button',
			text: 'Pilih...',
			id: 'btn_data_gambar',
			width: 10,
			handler: function() {
				find_x("Data Pengguna", 3);
													
			}
		},
		'->'],
        vw:vw,
		autoScroll: true,
		cm:cm,
		bbar: paging,
        clicksToEdit: 1,
		listeners: {
			rowdblclick: function rowdblClick(grid, rowIdx) {
				var rec = ds_gridotoritas.getAt(rowIdx);
				Ext.Ajax.request({
					method: 'POST',
					url: BASE_URL + 'c_utility/u_OT',
					params: {
							bool: rec.data["user_aktif"],
							kpengguna: Ext.getCmp('combox').getValue(),
							kdmenu: rec.data["kdmenu"]
					},
					success: function() {
							ds_gridotoritas.load();
							alert('Data telah diupdate!?')
					}
				});
			}
		}
	});
	                    
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
			items: [grid_nya]
		}]
	});
        
	var o_m_product = new Ext.Panel({
		bodyStyle: 'padding: 5px',
		title: 'Pengguna Menu',
		defaults: {
			anchor: '-10'
		},
		border: true,
		margins: '0 0 5 0',
		plain: true,
		layout: 'border',
		items: [form_bp_general]
	});
        
	function simpan_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'c_utility/s_JKP',
			method: 'POST',
			success: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Berhasil");
				ds_gridotoritas.load();
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
							ds_gridotoritas.load();
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
						url: BASE_URL + 'c_utility/u_JKP',
						params: {
						//	kriteria: kriteria
						},
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Berhasil");
							ds_gridotoritas.load();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Gagal");
						}
					});
				}
			}
		});
	}
	SET_PAGE_CONTENT(o_m_product);
}