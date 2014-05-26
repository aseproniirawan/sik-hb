function RMrencanapulang(){

	//deklarasi data master
		var ds_registrasi = dm_registrasi();
		var ds_bagian = dm_bagian();
		var ds_bed = dm_bed();
		var ds_kamar = dm_kamar();
	
	//end deklarasi

	var rencanapulang_form = new Ext.form.FormPanel({
		id: 'fp.rencanaplg',
		title: 'Rencana Pulang',
		width: 900, Height: 1000,
		layout: {
			type: 'form',
			pack: 'center',
			align: 'center'
		},
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){alert("baru");}},
			{ text: 'Simpan', iconCls: 'bt.simpan', iconCls: 'silk-save', handler: function(){simpan("fp.rencanaplg");}},
			{ xytpe: 'tbfill'}
		],
	defaults: { labelWidth: 150, labelAlign: 'right', autoWidth: true},
	items: [{
			xytpe: 'fieldset', title: '',
			id: 'fs.rencanaplg', layout: 'column',
			defaults: { labelWidth: 150, labelAlign: 'right'},
			style : 'margin : 10px;',
			items: [{
				layout : 'form', columnWidth: 0.50,
				items: [{
					
					xtype: 'compositefield',
					name: 'comp_norm',
					fieldLabel: 'No. RM',
					id: 'comp_norm',
					items: [{
						xtype: 'textfield',
						id: 'tf.norm',
						width: 100
					},{
						xtype: 'label', id: 'lb.tgllahir', text: 'No. Registrasi', margins: '0 10 0 10',
					},{
						xtype: 'textfield',
						id: 'tf.noregis',
						width: 100
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.norm',
						width: 30,
						handler: function() {
							dftRegis();
						}
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Nama Pasien',
					id: 'tf.nmpasien',
					readOnly: true,
					style: 'opacity: 0.6',
					width: 300
				},{
					xtype: 'textfield', fieldLabel: 'Kelas Perawatan',
					id: 'tf.kdklsrawat',
					readOnly: true,
					style: 'opacity: 0.6',
					width: 300
				},{
					xtype: 'container', fieldLabel: 'Ruangan',
					layout: 'hbox',
					items: [{
						xtype: 'textfield', id: 'tf.ruangan', 
						readOnly: true,
						style : 'opacity:0.6',
						width: 95
					},{
						xtype: 'label', id: 'lb.kamar', text: 'Kamar', margins: '0 10 0 5',
					},{ 	
						xtype: 'textfield', id: 'tf.kamar',
						readOnly: true,
						style : 'opacity:0.6',
						width: 90
					},{
						xtype: 'label', id: 'lb.bed', text: 'Bed', margins: '0 10 0 5',
					},{
						xtype: 'textfield', id: 'tf.bed', 
						readOnly: true,
						style : 'opacity:0.6',
						width: 30
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Dokter Rawat',
					id: 'tf.dokter',
					readOnly: true,
					style: 'opacity: 0.6',
					width: 300
				},{
						xtype: 'compositefield',
						name: 'tglrencanamsk',
						id: 'tglrencanamsk',
					items:[{
						xtype: 'datefield', id: 'df.tglrencanakeluar',
						fieldLabel: 'Tgl. Rencana Pulang',
						width: 100, value: new Date()
					}]
				},{
					xtype: 'textarea', fieldLabel: 'Catatan',
					id: 'ta.catatan',
					width: 300
				}]
			}]
	}]
	}); SET_PAGE_CONTENT(rencanapulang_form);
	
	function simpan(namaForm){
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'rencanapulang_controller/update_rencana',
			method: 'POST',
			
			success: function(rencanapulang_form, o) {
				if (o.result.success == true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					Ext.getCmp('tf.noreg').setValue(o.result.noreg);
					Ext.getCmp('bt.simpan').disable();
				} else if (o.result.success == false) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
				}
			}
			});
		}
	
	
	
	
	// cari no regestrasi
	function dftRegis(){
		var cm_cari_pasien = new Ext.grid.ColumnModel([
			{
				header: 'No Registrasi',
				dataIndex: 'registrasi.noreg',
				width: 100
			},
			{
				header: 'No RM',
				dataIndex: 'norm',
				width: 100
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'L/P',
				dataIndex: 'nmjnskelamin',
				width: 100
			},{
				header: 'Alamat',
				dataIndex: 'pasien.alamat',
				width: 150
			},{
				header: 'Kelas Tarif',
				dataIndex: 'klsrawat.kdklsrawat',
				width: 150
			},{
				header: 'Kelas Tarif',
				dataIndex: 'idklsrawat',
				width: 150
			},{
				header: 'Nama Kamar',
				dataIndex: 'nmkamar',
				width: 150
			},{
				header: 'Kode Kamar',
				dataIndex: 'kdkamar',
				width: 100
			},
			{
				header: 'Bed',
				dataIndex: 'idstbed',
				width: 50
			},{
				header: 'tes',
				dataIndex: 'idklstarif'
			}
			
		]);
		var sm_cari_pasien = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_pasien = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_pasien = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_registrasi,
			displayInfo: true,
			displayMsg: 'Data Pasien Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_pasien = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_pasien = new Ext.grid.GridPanel({
			ds: ds_registrasi,
			cm: cm_cari_pasien,
			sm: sm_cari_pasien,
			view: vw_cari_pasien,
			height: 600,
			width: 955,
			plugins: cari_cari_pasien,
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
			bbar: paging_cari_pasien,
			listeners: {
				rowdblclick: klik_cari_pasien
			}
		});
		var win_find_cari_pasien = new Ext.Window({
			title: 'Cari Pasien',
			modal: true,
			items: [grid_find_cari_pasien]
		}).show();

		function klik_cari_pasien(grid, rowIdx){
			var rec_cari_pasien = ds_registrasi.getAt(rowIdx);
			var var_cari_pasienno = rec_cari_pasien.data["norm"];
			var var_nama_pasien = rec_cari_pasien.data["nmpasien"];
			var var_no_reg = rec_cari_pasien.data["registrasi.noreg"];
			var var_kode_kls = rec_cari_pasien.data["klsrawat.kdklsrawat"];
			
			var var_ruangan = rec_cari_pasien.data["nmkamar"];
			var var_kamar = rec_cari_pasien.data["kdkamar"];
		//	var var_bed = rec_cari_pasien.data["idstbed"];
		//	var var_idklsrawat = rec_cari_pasien.data["idklsrawat"];
			var var_idregdet = rec_cari_pasien.data["idregdet"];
		//	var var_idbagian = rec_cari_pasien.data["idbagian"];
			var var_idkamar = rec_cari_pasien.data["idkamar"];
		//	var var_idklstarif = rec_cari_pasien.data["idklstarif"];
			
				
			Ext.getCmp('tf.norm').focus()
			Ext.getCmp("tf.norm").setValue(var_cari_pasienno);
			Ext.getCmp("tf.nmpasien").setValue(var_nama_pasien);
			Ext.getCmp("tf.noregis").setValue(var_no_reg);
			Ext.getCmp("tf.kdklsrawat").setValue(var_kode_kls);
			Ext.getCmp("tf.ruangan").setValue(var_ruangan);
			Ext.getCmp("tf.kamar").setValue(var_kamar);
		//	Ext.getCmp("tf.bed").setValue(var_bed);
		//	Ext.getCmp("tf.idklsrawat").setValue(var_idklsrawat);
			//Ext.getCmp("tf.idregdet").setValue(var_idregdet);
		//	Ext.getCmp("tf.bagianid").setValue(var_idbagian);
		//	Ext.getCmp("tf.idkamar").setValue(var_idkamar);
	//		Ext.getCmp("tf.idklstarif").setValue(var_idklstarif);
			
						win_find_cari_pasien.close();
		}
	}
	
}