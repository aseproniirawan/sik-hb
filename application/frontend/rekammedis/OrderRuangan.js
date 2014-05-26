function OrderRuangan(namaForm){
RH.startTimer('tf.jamshift');
	Ext.Ajax.request({
		url:BASE_URL + 'shift_controller/getNmField',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			//Ext.getCmp("idshift").setValue(obj.idshift);
			//Ext.getCmp("tf.waktushift").setValue(obj.nmshift);
			Ext.getCmp("tf.waktushift").setValue(obj.nmshift);
                        
		}});
		var ds_registrasi = dm_registrasi();
		var ds_bagian = dm_bagian();
		var ds_bed = dm_bed();
		var ds_kamar = dm_kamar();
		var ds_klsrawat = dm_klsrawat();
		var ds_klstarif = dm_klstarif();
		var ds_hubkeluarga = dm_hubkeluarga();
		var ds_pengguna = dm_pengguna();
		var ds_orderruangan = dm_orderruangan();
		var ds_pasien = dm_pasien();
		var ds_bagianri = dm_bagianri();
		var ds_kamarbagian = dm_kamarbagian('27');
		
		var orderuangan_form = new Ext.form.FormPanel({ 
		id: 'fp.orderruangan',
		title: 'Order Ruangan',
		width: 900, Height: 1000,
		layout: 'column',
		/* layout: {
            type: 'form',
            pack: 'center',
            align: 'center'
        }, */
		
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){bersihor();} },
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpan("fp.orderruangan");} },
			{ text: 'Cari', iconCls: 'silk-find', handler: function(){alert("Cari")} },
			{ text: 'Batal', id:'bt.batal', iconCls: 'silk-printer', handler: function(){alert("Batal")} },
			{ text: 'Cetak', iconCls: 'silk-printer', handler: function(){alert("Cetak");} },
			
			
			{xtype: 'tbfill' }
		],
		//defaults: { labelWidth: 150, labelAlign: 'right', autoWidth: true, },
		items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.5,
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
			//layout: 'form',//columnWidth: 0.50,
			xtype: 'fieldset',title: 'Daftar Registrasi:',width: 550,height: 160,
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
					style : 'opacity:0.6',
					width: 300
				},{
					xtype: 'textfield', fieldLabel: 'Kelas Perawatan',
					id: 'tf.kdklsrawat',
					readOnly: true,
					style : 'opacity:0.6',
					width: 300
				},
				//start yang masuk id oruangan hidden
				{
					xtype: 'textfield',//fieldLabel: 'Tes',
					id: 'tf.idklsrawat',
					style : 'opacity:0.6',
					width: 300,
					hidden: true
				},{
					xtype: 'textfield',
					id: 'tf.bagianid',
					style : 'opacity:0.6',
					width: 300,
					hidden: true
				},{
					xtype: 'textfield',
					id: 'tf.idregdet',
					style : 'opacity:0.6',
					width: 300,
					hidden: true
				},{
					xtype: 'textfield',
					id: 'tf.idkamar',
					style : 'opacity:0.6',
					width: 300,
					hidden: true
				},{
					xtype: 'textfield',
					id: 'tf.idklstarif',
					style : 'opacity:0.6',
					width: 300,
					hidden: true
				}
				//end
				,{
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
				}]
				}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.5,
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',title: 'Daftar Order Ruangan:',width: 550,height: 160,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'textfield',
					//	fieldLabel: 'No. Order',
						id: 'tf.noorder',
						readOnly: true,
						style : 'opacity:0.6',
						hidden: true,
						width: 150,
						
					},{
						xtype: 'textfield',
						fieldLabel: 'No. Order',
						id: 'tf.nonono',
						readOnly: true,
						value: 'AUTOMATIC',
						style : 'opacity:0.6',
						width: 150,
					}]
				},{
					xtype: 'container', fieldLabel: 'Tgl./Jam/Shift',
					layout: 'hbox',
					//defaults: { hideLabel: 'true' },
					items: [{	
						xtype: 'datefield', id: 'df.tglshift',
						width: 100, value: new Date()
					},{
						xtype: 'label', id: 'lb.garing1', text: '/', margins: '0 10 0 10',
					},{ 	
						xtype: 'textfield', id: 'tf.jamshift', readOnly:true,
						width: 90
					},{
						xtype: 'label', id: 'lb.garing2', text: '/', margins: '0 10 0 10',
					},{
						xtype: 'textfield', id: 'tf.waktushift', 
						width: 60, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'textfield', id: 'idshift', 
						hidden: true
					}]
				},{
					xtype: 'textarea', fieldLabel: 'Catatan',
					id : 'ta.catatan', width : 301
				}]
			}]	
		},{
			xtype: 'container',
			style: 'padding: 0px',
			columnWidth: 1,
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',title: 'Data Persetujuan Keluarga Pasien:',//width: 500,
				layout: 'column', //columnWidth: 0.50,
				items: [{
					xtype: 'fieldset',
					border: false,
					columnWidth: 0.5,
					items:[{
						xtype: 'compositefield',
						items: [{
							xtype: 'textfield',
							fieldLabel: 'Nama',
							id: 'tf.nama',
							width: 300
						}]
					},{
						xtype: 'compositefield',
						items: [{
							xtype: 'textfield',
							fieldLabel: 'No. Telp/HP',
							id: 'tf.telp',
							width: 300
						}]
					},{
						xtype: 'combo', fieldLabel : 'Hubungan Keluarga',
						id: 'cb.hubkeluarga', width: 300, 
						store: ds_hubkeluarga, valueField: 'idhubkeluarga', displayField: 'nmhubkeluarga',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...'/*,
						listeners:{
							select:function(combo, records, eOpts){
								Ext.getCmp('idhubkeluarga').setValue(records.get('idhubkeluarga'));
							}
						}*/
					},{
						xtype: 'textarea', fieldLabel: 'Alasan Pindah',
						id: 'tf.alasan',
						width: 300
					}]
				},{
					xtype: 'fieldset',
					border: false,
					columnWidth: 0.4,
					items:[{
						xtype: 'compositefield',
						name: 'tglrencanamsk',
						id: 'tglrencanamsk',
						
						items: [{
							xtype: 'datefield', id: 'df.tglrencanamsk',
							fieldLabel: 'Tgl. Rencana Masuk',
							width: 100, value: new Date()
						}]
					},{
						xtype: 'compositefield',
						name: 'klsperawatan',
						id: 'klsperawatan',
						
						items: [{
							xtype: 'textfield',
							id: 'tf.klsperawatan',
							fieldLabel: 'Kelas Perawatan',
							width: 270
						},{
							xtype: 'button',
							text: ' ... ',
							id: 'btn.klsperwatan',
							width: 30,
							handler: function() {
								dftKlsrawat();
							}
						}]
					},{
						xtype: 'compositefield',
						name: 'ruangan',
						id: 'ruangan',
						items: [{
							xtype: 'textfield',
							id: 'tf.ruangann',
							fieldLabel: 'Ruangan',
							width: 270
						},{
							xtype: 'button',
							text: ' ... ',
							id: 'btn.ruangan',
							width: 30,
							handler: function() {
								dftBagianRI();
							}
						}]
					},{
						xtype: 'compositefield',
						name: 'kamarbed',
					//	fieldLabel: 'Kamar / Bed',
						id: 'kamarbed',
						items: [{
							xtype: 'textfield',
							id: 'tf.kamar_bed',
							fieldLabel: 'Kamar / Bed',
							width: 100
						},{
							xtype: 'label', id: 'lb.aaa', text: '/', margins: '0 10 0 10',
						},{
							xtype: 'textfield',
							id: 'tf.bed_kamar',
							width: 100
						},{
							xtype: 'button',
							text: ' ... ',
							id: 'btn.kb',
							width: 30,
							handler: function() {
								dftBed();
							}
						}]
					}]
				}]
				
			}]	
		}]
		
		
	}); SET_PAGE_CONTENT(orderuangan_form);
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
			var var_bed = rec_cari_pasien.data["idstbed"];
		//	var var_idklsrawat = rec_cari_pasien.data["idklsrawat"];
			var var_idregdet = rec_cari_pasien.data["idregdet"];
		//	var var_idbagian = rec_cari_pasien.data["idbagian"];
			var var_idkamar = rec_cari_pasien.data["idkamar"];
			var var_idklstarif = rec_cari_pasien.data["idklstarif"];
			
				
			Ext.getCmp('tf.norm').focus()
			Ext.getCmp("tf.norm").setValue(var_cari_pasienno);
			Ext.getCmp("tf.nmpasien").setValue(var_nama_pasien);
			Ext.getCmp("tf.noregis").setValue(var_no_reg);
			Ext.getCmp("tf.kdklsrawat").setValue(var_kode_kls);
			Ext.getCmp("tf.ruangan").setValue(var_ruangan);
			Ext.getCmp("tf.kamar").setValue(var_kamar);
			Ext.getCmp("tf.bed").setValue(var_bed);
		//	Ext.getCmp("tf.idklsrawat").setValue(var_idklsrawat);
			Ext.getCmp("tf.idregdet").setValue(var_idregdet);
		//	Ext.getCmp("tf.bagianid").setValue(var_idbagian);
			Ext.getCmp("tf.idkamar").setValue(var_idkamar);
			Ext.getCmp("tf.idklstarif").setValue(var_idklstarif);
			
						win_find_cari_pasien.close();
		}
	}
	// cari klsrawat
	function dftKlsrawat(){
		var cm_cari_klsrawat = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idklsrawat'
			},{
				header: 'Nama Kelas Perawatan',
				dataIndex: 'nmklsrawat',
				width: 150
			}
		]);
		var sm_cari_klsrawat = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_klsrawat = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_klsrawat = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_klsrawat,
			displayInfo: true,
			displayMsg: 'Data Kelas Perawatan Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_klsrawat = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_klsrawat= new Ext.grid.GridPanel({
			ds: ds_klsrawat,
			cm: cm_cari_klsrawat,
			sm: sm_cari_klsrawat,
			view: vw_cari_klsrawat,
			height: 350,
			width: 400,
			plugins: cari_cari_klsrawat,
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
			bbar: paging_cari_klsrawat,
			listeners: {
				rowdblclick: klik_cari_klsrawat
			}
		});
		var win_find_cari_klsrawat = new Ext.Window({
			title: 'Cari Kelas Perawatan',
			modal: true,
			items: [grid_find_cari_klsrawat]
		}).show();

		function klik_cari_klsrawat(grid, rowIdx){
			var rec_cari_klsrawat = ds_klsrawat.getAt(rowIdx);
			var var_cari_klsrawat = rec_cari_klsrawat.data["nmklsrawat"];
			var var_idklsrawat = rec_cari_klsrawat.data["idklsrawat"];
		
			Ext.getCmp("tf.klsperawatan").setValue(var_cari_klsrawat);
			Ext.getCmp("tf.idklsrawat").setValue(var_idklsrawat);
						win_find_cari_klsrawat.close();
		}
	}
	// mencari Ruangan
	function dftBagianRI(){
		var cm_cari_bagianri = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idbagian'
			},{
				header: 'Nama Level Bagian',
				dataIndex: 'nmlvlbagian',
				width: 100
			},{
				header: 'Nama Bagian',
				dataIndex: 'nmbagian',
				width: 100
			}
		]);
		var sm_cari_bagianri = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_bagianri = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_bagianri = new Ext.PagingToolbar({
			store: ds_bagianri,
			displayInfo: true,
			displayMsg: 'Data Bagian Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_bagianri = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_bagianri= new Ext.grid.GridPanel({
			ds: ds_bagianri,
			cm: cm_cari_bagianri,
			sm: sm_cari_bagianri,
			view: vw_cari_bagianri,
			height: 350,
			width: 400,
			plugins: cari_cari_bagianri,
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
			bbar: paging_cari_bagianri,
			listeners: {
				rowdblclick: klik_cari_bagianri
			}
		});
		var win_find_cari_bagianri = new Ext.Window({
			title: 'Cari Bagian',
			modal: true,
			items: [grid_find_cari_bagianri]
		}).show();

		function klik_cari_bagianri(grid, rowIdx){
			var rec_cari_bagianri = ds_bagianri.getAt(rowIdx);
			var var_cari_nmbagianri = rec_cari_bagianri.data["nmbagian"];
			var var_idbagian = rec_cari_bagianri.data["idbagian"];
			
			Ext.getCmp("tf.ruangann").setValue(var_cari_nmbagianri);
			Ext.getCmp("tf.bagianid").setValue(var_idbagian);
						win_find_cari_bagianri.close();
		}
	}
	//Mencari Kamar / Bed
	function dftBed(){
		var cm_cari_bedbagian = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idbed'
			},{
				header: 'Nama Kamar',
				dataIndex: 'nmkamar',
				width: 100
			},{
				header: 'Nama Bed',
				dataIndex: 'nmbed',
				width: 100
			}
		]);
		var sm_cari_bedbagian = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_bedbagian = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_bedbagian = new Ext.PagingToolbar({
			store: ds_kamarbagian,
			displayInfo: true,
			displayMsg: 'Data Bed Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_bedbagian = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_bedbagian= new Ext.grid.GridPanel({
			ds: ds_kamarbagian,
			cm: cm_cari_bedbagian,
			sm: sm_cari_bedbagian,
			view: vw_cari_bedbagian,
			height: 350,
			width: 400,
			plugins: cari_cari_bedbagian,
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
			bbar: paging_cari_bedbagian,
			listeners: {
				rowdblclick: klik_cari_bedbagian
			}
		});
		var win_find_cari_bedbagian = new Ext.Window({
			title: 'Cari Bed',
			modal: true,
			items: [grid_find_cari_bedbagian]
		}).show();

		function klik_cari_bedbagian(grid, rowIdx){
			var rec_cari_bedbagian = ds_kamarbagian.getAt(rowIdx);
			var var_cari_nmkamar = rec_cari_bedbagian.data["nmkamar"];
			var var_cari_nmbed = rec_cari_bedbagian.data["nmbed"];
			
			
			Ext.getCmp("tf.kamar_bed").setValue(var_cari_nmkamar);
			Ext.getCmp("tf.bed_kamar").setValue(var_cari_nmbed);
						win_find_cari_bedbagian.close();
		}
	}
	function simpan(namaForm) {
	
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'orderruangan_controller/insert_oruangan',
			method: 'POST',
			success: function(orderuangan_form, o) {
				if (o.result.success==true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					Ext.getCmp('tf.noorder').setValue(o.result.noorder);
				} else if (o.result.success==false) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
				}
				ds_orderruangan.load();
			}
		});
	}
	function bersihor(){
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.noregis').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.kdklsrawat').setValue();
		Ext.getCmp('tf.ruangan').setValue();
		Ext.getCmp('tf.kamar').setValue();
		Ext.getCmp('tf.bed').setValue();
		Ext.getCmp('ta.catatan').setValue();
		Ext.getCmp('tf.telp').setValue();
		Ext.getCmp('cb.hubkeluarga').setValue();
		Ext.getCmp('tf.alasan').setValue();
		Ext.getCmp('tf.klsperawatan').setValue();
		Ext.getCmp('tf.ruangann').setValue();
		Ext.getCmp('tf.kamar_bed').setValue();
		Ext.getCmp('tf.bed_kamar').setValue();
		
	}
}