function RIregistrasi(namaForm){
	var myVar=setInterval(function(){myTimer()},1000);
	function myTimer(){
		var d=new Date();
		//var t=d.toLocaleTimeString();
		var formattedValue = Ext.util.Format.date(d, 'H:i:s');
		if(Ext.getCmp("tf.jamshift"))
				RH.setCompValue("tf.jamshift",formattedValue);
		else myStopFunction();
	}
	
	function myStopFunction(){
		clearInterval(myVar);
	}
	
	Ext.Ajax.request({
		url:BASE_URL + 'shift_controller/getNmField',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			//Ext.getCmp("idshift").setValue(obj.idshift);
			Ext.getCmp("tf.waktushift").setValue(obj.nmshift);
		}
	});
	
	var ds_pasien = dm_pasien();
	var ds_jkelamin = dm_jkelamin();
	var ds_caradatang = dm_caradatang();
	var ds_hubkeluarga = dm_hubkeluarga();
	var ds_vregistrasi = dm_vregistrasi();
	var ds_klsrawat = dm_klsrawat();
	var ds_kamarbagian = dm_kamarbagian();
	var ds_penjamin = dm_penjamin();
	var ds_bagian = dm_bagian();
	var ds_bagianri = dm_bagianri();
	var ds_dokter = dm_dokter();
	var ds_dokterri = dm_dokterri();
	ds_vregistrasi.setBaseParam('cek','RI');
            
	var registrasiri_form = new Ext.form.FormPanel({ 
		id: 'fp.registrasiri',
		title: 'Registasi RI',
		width: 900, Height: 1000,
		layout: {
            type: 'form',
            pack: 'center',
            align: 'center'
        },
		frame: true, //margin: '0 0 15',
		autoScroll: true,
		//monitorValid: true,
		tbar: [
			{ text: 'Kembali', iconCls: 'silk-house', handler: function(){page_controller('0501');} },'-',
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpanRI("fp.registrasiri");} },'-',
			{ text: 'Batal Registrasi', id:'bt.batal', iconCls: 'silk-cancel', handler: function(){batalRI("fp.registrasiri");} },'-',
			{ text: 'Cari Registrasi', iconCls: 'silk-find', handler: function(){cariRegRI();} },'-',
			//{ text: 'Cari Reservasi', iconCls: 'silk-find', handler: function(){} },'-',
			//{ text: 'Cari Jaminan', iconCls: 'silk-find', handler: function(){} },'-',
			{xtype: 'tbfill' }
		],
		defaults: { labelWidth: 150, labelAlign: 'right', autoWidth: true},
        items: [{
			xtype: 'fieldset', title: '',
			id:'fs.registrasiri', layout: 'column', 
			defaults: { labelWidth: 150, labelAlign: 'right' }, 
			items: [{
				//COLUMN 1
				layout: 'form', columnWidth: 0.50,
				items: [{
					xtype: 'textfield',
					id: 'idjnspelayanan',
					value:Ext.getCmp('cb.stpelayanan').value,
					hidden:true
				}/* ,{
					xtype: 'textfield',
					id: 'idcaradatang',
					value: 1,
					hidden:true
				} */,{
					xtype: 'textfield',
					id: 'alamat',
					value: Ext.getCmp('tf.alamat').value,
					hidden:true
				},{
					xtype: 'textfield',
					id: 'notelp',
					value: Ext.getCmp('tf.notelp').value,
					hidden:true
				},{
					xtype: 'textfield',
					id: 'nohp',
					value: Ext.getCmp('tf.nohp').value,
					hidden:true
				},{
					xtype: 'textfield', fieldLabel: 'No. RM',
					id: 'tf.norm',
					value:Ext.getCmp('tf.norm').value,
					width: 150, readOnly: true,
					style : 'opacity:0.6'
				},{
					xtype: 'textfield', fieldLabel: 'Nama Pasien',
					id: 'tf.nmpasien',
					value:Ext.getCmp('tf.nmpasien').value,
					width: 300, readOnly: true,
					style : 'opacity:0.6'
				},{
					xtype: 'combo', fieldLabel: 'Jenis Kelamin',
					id: 'cb.jkelamin', width: 100, 
					store: ds_jkelamin, valueField: 'idjnskelamin', displayField: 'nmjnskelamin',
					value:Ext.getCmp('cb.jkelamin').lastSelectionText,
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true, mode: 'local',
					readOnly: true, style : 'opacity:0.6'
				},{
					xtype: 'container', fieldLabel: 'Umur',
					layout: 'hbox',
					items: [{
						xtype: 'textfield', id: 'tf.umurthn',
						value:Ext.getCmp('tf.umurthn').value,
						width: 30, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'label', id: 'lb.umurthn', text: 'Tahun', margins: '0 10 0 5',
					},{ 	
						xtype: 'textfield', id: 'tf.umurbln', 
						value:Ext.getCmp('tf.umurbln').value,
						width: 30, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'label', id: 'lb.umurbln', text: 'Bulan', margins: '0 10 0 5',
					},{
						xtype: 'textfield', id: 'tf.umurhari', 
						value:Ext.getCmp('tf.umurhari').value,
						width: 30, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'label', id: 'lb.umurhari', text: 'Hari', margins: '0 10 0 5'
					}]
				},{
					xtype: 'compositefield',
					name: 'comp_penanggungbiaya',
					fieldLabel: 'Penjamin',
					id: 'comp_penanggungbiaya',
					items: [/* {
						xtype: 'textfield',
						id: 'idpenjamin',
						hidden:true
					}, */{
						xtype: 'textfield',
						id: 'tf.penjamin', allowBlank: false,
						value:'Pasien Umum',
						width: 250
					},{
						xtype: 'label', id: 'lb.bintang',
						text: '*', margins: '0 5 0 5',
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.penjamin',
						width: 28,
						handler: function() {
							dftPenjamin();
						}
					}]
				},{
					xtype: 'combo', fieldLabel : 'Asal Rujukan',
					id: 'cb.caradatang', width: 300, 
					store: ds_caradatang, valueField: 'idcaradatang', displayField: 'nmcaradatang',
					editable: false, triggerAction: 'all', value:'Datang Sendiri',
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...',
					listeners:{
						select:function(combo, records, eOpts){
							if(records.get('idcaradatang') != 1)
							{
								//Ext.getCmp('idcaradatang').setValue(records.get('idcaradatang'));
								//console.log(Ext.getCmp('tf.upengirim'));
								Ext.getCmp('tf.upengirim').setReadOnly(false);
								Ext.getCmp('tf.upengirim').el.setStyle('opacity', 1);
								Ext.getCmp('btn.upengirim').enable();
								Ext.getCmp('tf.dkirim').setReadOnly(false);
								Ext.getCmp('tf.dkirim').el.setStyle('opacity', 1);
								Ext.getCmp('btn.dkirim').enable();
							} else {
								//Ext.getCmp('idcaradatang').setValue(records.get('idcaradatang'));
								Ext.getCmp('tf.upengirim').setReadOnly(false);
								Ext.getCmp('tf.upengirim').setValue('');
								Ext.getCmp('tf.upengirim').el.setStyle('opacity', 0.6);
								Ext.getCmp('btn.upengirim').disable();
								Ext.getCmp('tf.dkirim').setReadOnly(true);
								Ext.getCmp('tf.dkirim').setValue('');
								Ext.getCmp('tf.dkirim').el.setStyle('opacity', 0.6);
								Ext.getCmp('btn.dkirim').disable();
							}
						}
					}
				},{
					xtype: 'compositefield',
					name: 'comp_upengirim',
					fieldLabel: 'Unit Pengirim',
					id: 'comp_upengirim',
					items: [{
						xtype: 'textfield',
						id: 'tf.upengirim',
						width: 250, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.upengirim',
						width: 45, disabled: true,
						handler: function() {
							dftBagian();
						}
					}]
				},{
					xtype: 'compositefield',
					name: 'comp_dkirim',
					fieldLabel: 'Dokter Pengirim',
					id: 'comp_dkirim',
					items: [{
						xtype: 'textfield',
						id: 'tf.dkirim',
						width: 250, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.dkirim',
						width: 45, disabled: true,
						handler: function() {
							dftDokter();
						}
					}]
				},{
					xtype: 'textarea', fieldLabel: 'Keluhan',
					id  : 'ta.keluhan', width : 300
				}]
			}, {
				//COLUMN 2
				layout: 'form', columnWidth: 0.50,
				items: [{
					xtype :'textfield', fieldLabel: 'No. Registrasi',
					id :'tf.noreg',width:150, readOnly: true,
					style : 'opacity:0.6'
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
					}/* ,{
						xtype: 'textfield', id: 'idshift', 
						hidden: true
					} */]
				},{
					xtype: 'compositefield',
					name: 'comp_klsperawatan',
					fieldLabel: 'Kelas Perawatan',
					id: 'comp_klsperawatan',
					items: [{
						xtype :'textfield', allowBlank: false,
						id :'tf.klsperawatan', width:250, readOnly: true
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.klsperawatan',
						width: 45,
						handler: function() {
							dftKlsrawat();
						}
					}]
				},{
					xtype: 'compositefield',
					name: 'comp_ruangan',
					fieldLabel: 'Ruangan',
					id: 'comp_ruangan',
					items: [{
						xtype :'textfield', allowBlank: false,
						id :'tf.ruangan', width:250, readOnly: true
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.ruangan',
						width: 45,
						handler: function() {
							dftBagianRI();
						}
					}]
				},{
					xtype: 'compositefield',
					name: 'comp_kamarbed',
					fieldLabel: 'Kamar / Bed',
					id: 'comp_kamarbed',
					items: [{
						xtype: 'textfield', allowBlank: false,
						id: 'tf.nmkamar', width: 130, readOnly: true
					},{
						xtype: 'label', id: 'lb.garing3', text: '/', margins: '0 10 0 10',
					},{
						xtype: 'textfield', allowBlank: false,
						id: 'tf.nmbed', width: 90, readOnly: true
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.kamarbed',
						width: 45,
						handler: function() {
							dftBed();
						}
					}]
				},{
					xtype: 'compositefield',
					name: 'comp_dokterrawat',
					fieldLabel: 'Dokter Rawat',
					id: 'comp_dokterrawat',
					items: [{
						xtype: 'textfield', allowBlank: false,
						id: 'tf.dokterrawat', width: 250, readOnly: true
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.dokterrawat',
						width: 45,
						handler: function() {
							dftDRawat();
						}
					}]
				},{
					xtype: 'container', //fieldLabel: '',
					layout: 'hbox',
					items: [{
						xtype: 'label', id: 'lb.ket',
						html: '<h3 style="font-style:italic;color:red;">Dalam Keadaan Darurat Hubungi :</h3>', margins: '0 0 0 155',
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Nama',
					id  : 'tf.nmkerabat', width : 300
				},{
					xtype: 'textfield', fieldLabel: 'No. Telp./HP',
					id  : 'tf.notelpkerabat', width : 300
				},/* {
					xtype: 'textfield', id  : 'idhubkeluarga',
					hidden:true
				}, */{
					xtype: 'combo', fieldLabel : 'Hubungan Keluarga',
					id: 'cb.hubkeluarga', width: 300, 
					store: ds_hubkeluarga, valueField: 'idhubkeluarga', displayField: 'nmhubkeluarga',
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...'/* ,
					listeners:{
						select:function(combo, records, eOpts){
							Ext.getCmp('idhubkeluarga').setValue(records.get('idhubkeluarga'));
						}
					} */
				},{
					xtype: 'textarea', fieldLabel: 'Catatan Registrasi',
					id  : 'ta.catatan', width : 300
				}]
			}]
		}]
	}); SET_PAGE_CONTENT(registrasiri_form);
	
	function bersihri() {
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('cb.jkelamin').setValue();
		Ext.getCmp('tf.umurthn').setValue();
		Ext.getCmp('tf.umurbln').setValue();
		Ext.getCmp('tf.umurhari').setValue();
		Ext.getCmp('tf.penjamin').setValue('Pasien Umum');
		Ext.getCmp('cb.caradatang').setValue(1);
		Ext.getCmp('tf.upengirim').setValue();
		Ext.getCmp('tf.dkirim').setValue(); 
		Ext.getCmp('ta.keluhan').setValue();
		Ext.getCmp('tf.noreg').setValue(); 
		Ext.getCmp('df.tglshift').setValue(new Date()); 
		Ext.getCmp('tf.klsperawatan').setValue(' ');
		Ext.getCmp('tf.ruangan').setValue(' ');
		Ext.getCmp('tf.nmkamar').setValue(' ');
		Ext.getCmp('tf.nmbed').setValue(' ');
		Ext.getCmp('tf.dokterrawat').setValue(' ');
		Ext.getCmp('tf.nmkerabat').setValue();
		Ext.getCmp('tf.notelpkerabat').setValue();
		Ext.getCmp('cb.hubkeluarga').setValue();
		Ext.getCmp('ta.catatan').setValue();
		Ext.getCmp('tf.upengirim').disable();
		Ext.getCmp('btn.upengirim').disable();
		Ext.getCmp('tf.dkirim').disable();
		Ext.getCmp('btn.dkirim').disable();
	}

	function simpanRI(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/insorupd_registrasi',
			method: 'POST',
			params: {
				ureg : 'RI'
			},
			success: function(registrasiri_form, o) {
				if (o.result.success == true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					Ext.getCmp('tf.noreg').setValue(o.result.noreg);
					Ext.getCmp('bt.simpan').disable();
					myStopFunction();
				} else if (o.result.success == false) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
				}
			}
		});
	}
	
	function batalRI(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/batal_registrasi',
			method: 'POST',
			success: function(registrasiri_form, o) {
				if (o.result.success == true) {
					Ext.MessageBox.alert('Informasi', 'Registrasi Berhasil Dibatalkan');
					bersihri();
				} else if (o.result.success == 'false') {
					Ext.MessageBox.alert('Informasi', 'Registrasi Gagal Dibatalkan');
				}
			}
		});
	}
	
	function cariRegRI(){
		var cm_cari_regri = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'noreg'
			},{
				header: 'No. Registrasi',
				dataIndex: 'noreg',
				width: 100
			},{
				header: 'No. RM',
				dataIndex: 'norm',
				width: 100
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'Alamat',
				dataIndex: 'alamatp',
				width: 200
			},{
				header: 'Jenis Kelamin',
				dataIndex: 'nmjnskelamin',
				width: 200
			}
		]);
		var sm_cari_regri = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_regri = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_regri = new Ext.PagingToolbar({
			store: ds_vregistrasi,
			pageSize: 18,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_regri = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_find_cari_regri= new Ext.grid.GridPanel({
			id: 'gp.find_regri',
			ds: ds_vregistrasi,
			cm: cm_cari_regri,
			sm: sm_cari_regri,
			view: vw_cari_regri,
			height: 350,
			width: 800,
			plugins: cari_cari_regri,
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
			bbar: paging_cari_regri,
			listeners: {
				rowdblclick: klik_cari_regri
			}
		});
		var win_find_cari_regri = new Ext.Window({
			title: 'Cari Registrasi',
			modal: true,
			items: [grid_find_cari_regri]
		}).show();
		Ext.getCmp('gp.find_regri').store.reload();
		function klik_cari_regri(grid, rowIdx){
			var rec_cari_regri = ds_vregistrasi.getAt(rowIdx);
			var regri_noreg = rec_cari_regri.data["noreg"];
			var regri_norm = rec_cari_regri.data["norm"];
			var regri_nmpasien = rec_cari_regri.data["nmpasien"];
			var regri_jkelamin = rec_cari_regri.data["idjnskelamin"];
			var regri_umurtahun = rec_cari_regri.data["umurtahun"];
			var regri_umurbulan = rec_cari_regri.data["umurbulan"];
			var regri_umurhari = rec_cari_regri.data["umurhari"];
			var regri_penjamin = rec_cari_regri.data["nmpenjamin"];
			var regri_idcaradatang = rec_cari_regri.data["idcaradatang"];
			var regri_nmbagiankirim = rec_cari_regri.data["nmbagiankirim"];
			var regri_dokterkirim = rec_cari_regri.data["nmdokterkirim"];
			var regri_keluhan = rec_cari_regri.data["keluhan"];
			var regri_klsrawat = rec_cari_regri.data["nmklsrawat"];
			var regri_ruangan = rec_cari_regri.data["nmbagian"];
			var regri_kamar = rec_cari_regri.data["nmkamar"];
			var regri_bed = rec_cari_regri.data["nmbed"];
			var regri_dokter = rec_cari_regri.data["nmdokter"];
			var regri_kerabat = rec_cari_regri.data["nmkerabat"];
			var regri_telpkerabat = rec_cari_regri.data["notelpkerabat"];
			var regri_hubkeluarga = rec_cari_regri.data["idhubkeluarga"];
			var regri_catatan = rec_cari_regri.data["catatanr"];
			
			Ext.getCmp("tf.noreg").setValue(regri_noreg);
			Ext.getCmp("tf.norm").setValue(regri_norm);
			Ext.getCmp("tf.nmpasien").setValue(regri_nmpasien);
			Ext.getCmp("cb.jkelamin").setValue(regri_jkelamin);
			Ext.getCmp("tf.umurthn").setValue(regri_umurtahun);
			Ext.getCmp("tf.umurbln").setValue(regri_umurbulan);
			Ext.getCmp("tf.umurhari").setValue(regri_umurhari);
			Ext.getCmp("tf.penjamin").setValue(regri_penjamin);
			Ext.getCmp("cb.caradatang").setValue(regri_idcaradatang);
			Ext.getCmp("tf.upengirim").setValue(regri_nmbagiankirim);
			Ext.getCmp("tf.dkirim").setValue(regri_dokterkirim);
			Ext.getCmp("ta.keluhan").setValue(regri_keluhan);
			Ext.getCmp("tf.klsperawatan").setValue(regri_klsrawat);
			Ext.getCmp("tf.ruangan").setValue(regri_ruangan);
			Ext.getCmp("tf.nmkamar").setValue(regri_kamar);
			Ext.getCmp("tf.nmbed").setValue(regri_bed);
			Ext.getCmp("tf.dokterrawat").setValue(regri_dokter);
			Ext.getCmp("tf.nmkerabat").setValue(regri_kerabat);
			Ext.getCmp("tf.notelpkerabat").setValue(regri_telpkerabat);
			Ext.getCmp("cb.hubkeluarga").setValue(regri_hubkeluarga);
			Ext.getCmp("ta.catatan").setValue(regri_catatan);
			
			if(regri_idcaradatang != 1)
			{
				Ext.getCmp('tf.upengirim').enable();
				Ext.getCmp('tf.upengirim').setReadOnly(false);
				Ext.getCmp('tf.upengirim').el.setStyle('opacity', 1);
				Ext.getCmp('btn.upengirim').enable();
				Ext.getCmp('tf.dkirim').setReadOnly(false);
				Ext.getCmp('tf.dkirim').el.setStyle('opacity', 1);
				Ext.getCmp('btn.dkirim').enable();
			} else {
				Ext.getCmp('tf.upengirim').disable();
				Ext.getCmp('btn.upengirim').disable();
				Ext.getCmp('btn.dkirim').disable();
			}
						win_find_cari_regri.close();
		}
	}
	
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
			pageSize: 18,
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
			
			Ext.getCmp("tf.klsperawatan").setValue(var_cari_klsrawat);
						win_find_cari_klsrawat.close();
		}
	}
	
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
			
			Ext.getCmp("tf.nmkamar").setValue(var_cari_nmkamar);
			Ext.getCmp("tf.nmbed").setValue(var_cari_nmbed);
						win_find_cari_bedbagian.close();
		}
	}
	
	function dftPenjamin(){
		var cm_cari_penjamin = new Ext.grid.ColumnModel([
			/* {
				hidden:true,
				dataIndex: 'idpenjamin'
			}, */{
				header: 'Nama Penjamin',
				dataIndex: 'nmpenjamin',
				width: 100
			},{
				header: 'Alamat',
				dataIndex: 'alamat',
				width: 200
			},{
				header: 'No. Telp',
				dataIndex: 'notelp',
				width: 50
			}
		]);
		var sm_cari_penjamin = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_penjamin = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_penjamin = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_penjamin,
			displayInfo: true,
			displayMsg: 'Data Penjamin Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_penjamin = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_penjamin= new Ext.grid.GridPanel({
			ds: ds_penjamin,
			cm: cm_cari_penjamin,
			sm: sm_cari_penjamin,
			view: vw_cari_penjamin,
			height: 350,
			width: 400,
			plugins: cari_cari_penjamin,
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
			bbar: paging_cari_penjamin,
			listeners: {
				rowdblclick: klik_cari_penjamin
			}
		});
		var win_find_cari_penjamin = new Ext.Window({
			title: 'Cari Penjamin',
			modal: true,
			items: [grid_find_cari_penjamin]
		}).show();

		function klik_cari_penjamin(grid, rowIdx){
			var rec_cari_penjamin = ds_penjamin.getAt(rowIdx);
			/* var var_cari_idpenjamin = rec_cari_penjamin.data["idpenjamin"]; */
			var var_cari_nmpenjamin = rec_cari_penjamin.data["nmpenjamin"];
			
			Ext.getCmp("tf.penjamin").setValue(var_cari_nmpenjamin);
			/* Ext.getCmp("idpenjamin").setValue(var_cari_idpenjamin); */
						win_find_cari_penjamin.close();
		}
	}
	
	function dftBagian(){
		var cm_cari_bagian = new Ext.grid.ColumnModel([
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
		var sm_cari_bagian = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_bagian = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_bagian = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_bagian,
			displayInfo: true,
			displayMsg: 'Data Bagian Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_bagian = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_bagian= new Ext.grid.GridPanel({
			ds: ds_bagian,
			cm: cm_cari_bagian,
			sm: sm_cari_bagian,
			view: vw_cari_bagian,
			height: 350,
			width: 400,
			plugins: cari_cari_bagian,
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
			bbar: paging_cari_bagian,
			listeners: {
				rowdblclick: klik_cari_bagian
			}
		});
		var win_find_cari_bagian = new Ext.Window({
			title: 'Cari Bagian',
			modal: true,
			items: [grid_find_cari_bagian]
		}).show();

		function klik_cari_bagian(grid, rowIdx){
			var rec_cari_bagian = ds_bagian.getAt(rowIdx);
			var var_cari_nmbagian = rec_cari_bagian.data["nmbagian"];
			
			Ext.getCmp("tf.upengirim").setValue(var_cari_nmbagian);
						win_find_cari_bagian.close();
		}
	}
	
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
			var var_cari_idbagianri = rec_cari_bagianri.data["idbagian"];
			
			Ext.getCmp("tf.ruangan").setValue(var_cari_nmbagianri);
			ds_kamarbagian.setBaseParam('idbagian', var_cari_idbagianri);
			ds_kamarbagian.reload();
						win_find_cari_bagianri.close();
		}
	}
	
	function dftDokter(){
		var cm_cari_dokter = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'iddokter'
			},{
				header: 'Nama Dokter',
				dataIndex: 'nmdokter',
				width: 100
			},{
				header: 'Spesialisasi',
				dataIndex: 'nmspesialisasi',
				width: 100
			}
		]);
		var sm_cari_dokter = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_dokter = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_dokter = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_dokter,
			displayInfo: true,
			displayMsg: 'Data Dokter Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_dokter = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_dokter= new Ext.grid.GridPanel({
			ds: ds_dokter,
			cm: cm_cari_dokter,
			sm: sm_cari_dokter,
			view: vw_cari_dokter,
			height: 350,
			width: 400,
			plugins: cari_cari_dokter,
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
			bbar: paging_cari_dokter,
			listeners: {
				rowdblclick: klik_cari_dokter
			}
		});
		var win_find_cari_dokter = new Ext.Window({
			title: 'Cari Dokter',
			modal: true,
			items: [grid_find_cari_dokter]
		}).show();

		function klik_cari_dokter(grid, rowIdx){
			var rec_cari_dokter = ds_dokter.getAt(rowIdx);
			var var_cari_nmdokter = rec_cari_dokter.data["nmdokter"];
			
			Ext.getCmp("tf.dkirim").setValue(var_cari_nmdokter);
						win_find_cari_dokter.close();
		}
	}
	
	function dftDRawat(){
		var cm_cari_drawat = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'iddokter'
			},{
				header: 'Nama Dokter',
				dataIndex: 'nmdokter',
				width: 100
			},{
				header: 'Spesialisasi',
				dataIndex: 'nmspesialisasi',
				width: 100
			}
		]);
		var sm_cari_drawat = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_drawat = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_drawat = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_dokterri,
			displayInfo: true,
			displayMsg: 'Data Dokter Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_drawat = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_find_cari_drawat= new Ext.grid.GridPanel({
			ds: ds_dokterri,
			cm: cm_cari_drawat,
			sm: sm_cari_drawat,
			view: vw_cari_drawat,
			height: 350,
			width: 400,
			plugins: cari_cari_drawat,
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
			bbar: paging_cari_drawat,
			listeners: {
				rowdblclick: klik_cari_drawat
			}
		});
		var win_find_cari_drawat = new Ext.Window({
			title: 'Cari Dokter',
			modal: true,
			items: [grid_find_cari_drawat]
		}).show();

		function klik_cari_drawat(grid, rowIdx){
			var rec_cari_drawat = ds_dokterri.getAt(rowIdx);
			var var_cari_nmdrawat = rec_cari_drawat.data["nmdokter"];
			
			Ext.getCmp("tf.dokterrawat").setValue(var_cari_nmdrawat);
						win_find_cari_drawat.close();
		}
	}
}