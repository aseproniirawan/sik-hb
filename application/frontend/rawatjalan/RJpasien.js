function RJpasien(){
	var ds_pasien = dm_pasien();
	var ds_jkelamin = dm_jkelamin();
	var ds_stkawin = dm_stkawin();
	var ds_wnegara = dm_wnegara();
	var ds_stpelayanan = dm_stpelayanan();
	var ds_agama = dm_agama();
	var ds_goldarah = dm_goldarah();
	var ds_pendidikan = dm_pendidikan();
	var ds_pekerjaan = dm_pekerjaan();
	var ds_sukubangsa = dm_sukubangsa();
	var ds_daerah = dm_daerah();
	
	var ds_vregistrasi = dm_vregistrasi();
	ds_vregistrasi.setBaseParam('cek','pas');
	ds_vregistrasi.setBaseParam('norm',null);
	
	Ext.Ajax.request({
		url:BASE_URL + 'wnegara_controller/getFirst',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			Ext.getCmp("cb.wn").setValue(obj.kdwn);
		}
	});
	
	Ext.Ajax.request({
		url:BASE_URL + 'stpelayanan_controller/getFirst',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			Ext.getCmp("cb.stpelayanan").setValue(obj.nmstpelayanan);
		}
	});
	
	var grid_regrwyt = new Ext.grid.GridPanel({
		store: ds_vregistrasi,
		frame: true,
		height: 200,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_nota',
		forceFit: true,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		columns: [{
			header: 'No. Registrasi',
			dataIndex: 'noreg',
			width: 100
		},{
			header: 'Tgl. Registrasi',
			dataIndex: 'tglreg',
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			width: 100
		},{
			header: 'Jam Registrasi',
			dataIndex: 'jamreg',
			width: 100
		},{
			header: 'Nama Penjamin',
			dataIndex: 'nmpenjamin',
			width: 150
		},{
			header: 'Unit / Ruangan Pelayanan',
			dataIndex: 'nmbagian',
			width: 150
		},{
			header: 'Jenis Pelayanan',
			dataIndex: 'nmjnspelayanan',
			width: 200
		},{
			header: 'Nama Dokter',
			dataIndex: 'nmdoktergelar',
			width: 200
		}]
	});
	
	var pasienrj_form = new Ext.form.FormPanel({ 
		id: 'fp.pasienrj',
		title: 'Pasien',
		width: 900, Height: 1000,
		layout: {
            type: 'form',
            pack: 'center',
            align: 'center'
        },
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){bersihprj();} },'-',
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpan("fp.pasienrj");} },'-',
			{ text: 'Cetak Kartu Pasien', iconCls: 'silk-printer', handler: function(){cetakRJP();} },'-',
			{ text: 'Cari Reservasi RJ', iconCls: 'silk-find', handler: function(){dftReservasi();} },'-',
			{ text: 'Input Registrasi RJ', id:'bt.rjregistrasi', iconCls: 'silk-application-form',
					handler: function(){
						RJregistrasi("fp.pasienrj");
					} 
			},'-',
			{xtype: 'tbfill' }
		],
		defaults: { labelWidth: 150, labelAlign: 'right'},
        items: [{
			xtype: 'fieldset', title: '',
			id:'fs.pasien', layout: 'column', autowidth:true,
			defaults: { labelWidth: 150, labelAlign: 'right' }, 
			items: [{
				////COLUMN 1
				layout: 'form', columnWidth: 0.5,
				items: [{
					xtype: 'compositefield',
					fieldLabel: 'No. RM',
					id: 'comp_norm',
					items: [{
						xtype: 'textfield',
						id: 'tf.norm',
						width: 200,
						maskRe: /[0-9.]/,
						autoCreate :  {
							tag: "input", 
							maxlength : 10, 
							type: "text", 
							size: "20", 
							autocomplete: "off"
						},
						enableKeyEvents: true,
						listeners:{
							specialkey: function(field, e){
								if (e.getKey() == e.ENTER) {
									dataPasien();
								}
							}
						}
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.norm',
						width: 30,
						handler: function() {
							dftPasien();
						}
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Nama Pasien',
					id: 'tf.nmpasien',
					width: 300, allowBlank: false,
				},{
					xtype: 'container', fieldLabel: 'Jenis Kelamin',
					layout: 'hbox',
					//defaults: { hideLabel: 'true' },
					items: [{
						xtype: 'combo',
						id: 'cb.jkelamin', width: 100, 
						store: ds_jkelamin, valueField: 'idjnskelamin', displayField: 'nmjnskelamin',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...', allowBlank: false,
					},{
						xtype: 'label', id: 'lb.stkawin', text: 'Status Kawin', margins: '0 10 0 10',
					},{
						xtype: 'combo',
						id: 'cb.stkawin', width: 108, 
						store: ds_stkawin, valueField: 'idstkawin', displayField: 'nmstkawin',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...',
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Alamat',
					id: 'tf.alamat',
					width: 300
				},{
					xtype: 'container', fieldLabel: 'Kebangsaan',
					layout: 'hbox',
					items: [{
						xtype: 'combo',
						id: 'cb.wn', width: 100, 
						store: ds_wnegara, valueField: 'idwn', displayField: 'kdwn',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'remote',
						emptyText:'Pilih...',
					},{
						xtype: 'label', id: 'lb.negara', text: 'Negara', margins: '0 10 0 10',
					},{
						xtype: 'textfield',
						id  : 'tf.negara', width : 142
					}]
				},{
					xtype: 'compositefield',
					fieldLabel: 'Daerah',
					id: 'comp_daerah',
					items: [{
						xtype: 'textfield',
						id: 'tf.daerah',
						width: 250
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.daerah',
						width: 45,
						handler: function() {
							dftDaerah();
						}
					}]
				},{
					xtype: 'textarea', fieldLabel: '',
					id  : 'ta.daerahlkp', width : 300, height:100
				},{
					xtype: 'compositefield',
					fieldLabel : 'No. Handphone',
					items: [{
						xtype: 'label', id: 'lb.nohp', text: '+62', margins: '0 5 0 0',
					},{
						xtype: 'numberfield',
						id  : 'tf.nohp', width : 150,
						autoCreate :  {
							tag: "input", 
							maxlength : 12,
							type: "text", 
							size: "20", 
							autocomplete: "off"
						},
					}]
				},{
					xtype: 'numberfield',fieldLabel : 'No. Telepon',
					id  : 'tf.notelp', width : 150
				},{
					xtype: 'combo', fieldLabel : 'Status Pelayanan',
					id: 'cb.stpelayanan', width: 150, 
					store: ds_stpelayanan, valueField: 'idstpelayanan', displayField: 'nmstpelayanan',
					editable: false, triggerAction: 'all', allowBlank: false,
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...',
				}]
			},{
				////COLUMN 2
				layout: 'form', columnWidth: 0.5,
				items: [{
					xtype: 'container', fieldLabel: 'Tempat Lahir',
					layout: 'hbox',
					items: [{
						xtype: 'textfield', id: 'tf.tptlahir', 
						width: 140
					},{
						xtype: 'label', id: 'lb.tgllahir', text: 'Tgl. Lahir', margins: '0 10 0 10',
					},{ 	
						xtype: 'datefield', id: 'df.tgllahir',
						width: 100, value: new Date(), allowBlank: false,
						maxValue:new Date(),
						format: 'd-m-Y',
						listeners:{
							select: function(field, newValue){
								umur(newValue);
							},
							change : function(field, newValue){
								umur(newValue);
							}
						}
					}]
				},{
					xtype: 'container', fieldLabel: 'Umur',
					layout: 'hbox',
					items: [{
						xtype: 'textfield', id: 'tf.umurthn', readOnly:true,
						width: 30
					},{
						xtype: 'label', id: 'lb.umurthn', text: 'Tahun', margins: '0 10 0 5',
					},{ 	
						xtype: 'textfield', id: 'tf.umurbln',  readOnly:true,
						width: 30
					},{
						xtype: 'label', id: 'lb.umurbln', text: 'Bulan', margins: '0 10 0 5',
					},{
						xtype: 'textfield', id: 'tf.umurhari',  readOnly:true,
						width: 30
					},{
						xtype: 'label', id: 'lb.umurhari', text: 'Hari', margins: '0 10 0 5'
					}]
				},{
					xtype: 'container', fieldLabel: 'Agama',
					layout: 'hbox',
					items: [{
						xtype: 'combo',
						id: 'cb.agama', width: 100, 
						store: ds_agama, valueField: 'idagama', displayField: 'nmagama',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...',
					},{
						xtype: 'label', id: 'lb.goldarah', text: 'Gol. Darah', margins: '0 6 0 10',
					},{
						xtype: 'combo',
						id: 'cb.goldarah', width: 137, 
						store: ds_goldarah, valueField: 'idgoldarah', displayField: 'nmgoldarah',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...',
					}]
				},{
					xtype: 'container', fieldLabel: 'Pendidikan',
					layout: 'hbox',
					items: [{
						xtype: 'combo',
						id: 'cb.pendidikan', width: 100, 
						store: ds_pendidikan, valueField: 'idpendidikan', displayField: 'nmpendidikan',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...',
					},{
						xtype: 'label', id: 'lb.pekerjaan', text: 'Pekerjaan', margins: '0 10 0 10',
					},{
						xtype: 'combo',
						id: 'cb.pekerjaan', width: 137, 
						store: ds_pekerjaan, valueField: 'idpekerjaan', displayField: 'nmpekerjaan',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...',
					}]
				},{
					xtype: 'container', fieldLabel: 'Suku Bangsa',
					layout: 'hbox',
					//defaults: { hideLabel: 'true' },
					items: [{
						xtype: 'combo',
						id: 'cb.sukubangsa', width: 100, 
						store: ds_sukubangsa, valueField: 'idsukubangsa', displayField: 'nmsukubangsa',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'Pilih...',
					},{
						xtype: 'label', id: 'lb.ktppaspor', text: 'No. KTP/Paspor', margins: '0 10 0 10',
					},{
						xtype: 'textfield', id: 'tf.noidentitas', 
						width: 105
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Nama Ibu',
					id: 'tf.nmibu', width: 310
				},{
					xtype: 'textarea', fieldLabel: 'Alergi Obat',
					id  : 'ta.alergiobat', width : 310, height:90
				},{
					xtype: 'textarea', fieldLabel: 'Catatan',
					id  : 'ta.catatan', width : 310, height:90
				}]
			}]
		},{
			xtype: 'fieldset', layout: 'form',
			title: 'Riwayat Kedatangan Pasien',
			items: [grid_regrwyt]
		},{
			xtype: 'textfield', id:'tf.idreservasi',
			hidden:true
		}]
	}); SET_PAGE_CONTENT(pasienrj_form);
	
	function cetakRJP(){
		var norm		= Ext.getCmp('tf.norm').getValue();
		if(norm == '') Ext.MessageBox.alert('Informasi', 'Harap Diisi No. RM');
		else RH.ShowReport(BASE_URL + 'print/printpasien/kartu/' + norm);
	}
	
	function bersihprj() {
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('cb.jkelamin').setValue();
		Ext.getCmp('cb.stkawin').setValue();
		Ext.getCmp('tf.alamat').setValue();
		Ext.getCmp('cb.wn').setValue(1);
		Ext.getCmp('tf.negara').setValue('Indonesia');
		Ext.getCmp('tf.daerah').setValue(); 
		Ext.getCmp('ta.daerahlkp').setValue();
		Ext.getCmp('tf.notelp').setValue(); 
		Ext.getCmp('tf.nohp').setValue(); 
		Ext.getCmp('cb.stpelayanan').setValue(1);
		Ext.getCmp('tf.tptlahir').setValue();
		Ext.getCmp('df.tgllahir').setValue(new Date());
		Ext.getCmp('tf.umurthn').setValue();
		Ext.getCmp('tf.umurbln').setValue();
		Ext.getCmp('tf.umurhari').setValue();
		Ext.getCmp('cb.agama').setValue();
		Ext.getCmp('cb.goldarah').setValue();
		Ext.getCmp('cb.pendidikan').setValue();
		Ext.getCmp('cb.pekerjaan').setValue();
		Ext.getCmp('cb.sukubangsa').setValue();
		Ext.getCmp('tf.noidentitas').setValue();
		Ext.getCmp('tf.nmibu').setValue();
		Ext.getCmp('ta.alergiobat').setValue();
		Ext.getCmp('ta.catatan').setValue();
		ds_vregistrasi.setBaseParam('norm',null);
		ds_vregistrasi.load();
	}

	function simpan(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'pasien_controller/insorupd_pasien',
			method: 'POST',
			success: function(pasienrj_form, o) {
				if (o.result.success==true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					Ext.getCmp('tf.norm').setValue(o.result.norm);
				}
				ds_pasien.load();
			},
			failure: function (form, action) {
				Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
			}
		});
	}
	
	function dataPasien(){
		Ext.Ajax.request({
			url: BASE_URL + 'pasien_controller/getDataPasien',
			params: {
				norm		: Ext.getCmp('tf.norm').getValue()
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				var var_cari_pasienno = obj.norm;
				var var_cari_pasiennm = obj.nmpasien;
				var var_cari_pasienjkel = obj.idjnskelamin;
				var var_cari_pasienstk = obj.idstkawin;
				var var_cari_pasienalamat = obj.alamat;
				var var_cari_pasienwn = obj.idwn;
				var var_cari_pasiennegara = obj.negara;
				var var_cari_pasiendaerah = obj.nmdaerah;
				var var_cari_pasiennotelp = obj.notelp;
				var var_cari_pasiennohp = obj.nohp;
				var var_cari_pasienjpel = obj.idstpelayanan;
				var var_cari_pasientpl = obj.tptlahir;
				var var_cari_pasientgl = obj.tgllahir;
				var var_cari_pasienagama = obj.idagama;
				var var_cari_pasiengol = obj.idgoldarah;
				var var_cari_pasienpend = obj.idpendidikan;
				var var_cari_pasienpek = obj.idpekerjaan;
				var var_cari_pasiensuku = obj.idsukubangsa;
				var var_cari_pasiennoid = obj.noidentitas;
				var var_cari_pasienibu = obj.nmibu;
				var var_cari_pasienalergi = obj.alergi;
				var var_cari_pasiencttn = obj.catatan;
					
				Ext.getCmp('tf.norm').focus()
				Ext.getCmp("tf.norm").setValue(var_cari_pasienno);
				Ext.getCmp("tf.nmpasien").setValue(var_cari_pasiennm);
				Ext.getCmp("cb.jkelamin").setValue(var_cari_pasienjkel);
				Ext.getCmp("cb.stkawin").setValue(var_cari_pasienstk);
				Ext.getCmp("tf.alamat").setValue(var_cari_pasienalamat);
				Ext.getCmp("cb.wn").setValue(var_cari_pasienwn);
				Ext.getCmp("tf.negara").setValue(var_cari_pasiennegara);
				Ext.getCmp("tf.daerah").setValue(var_cari_pasiendaerah);
				Ext.getCmp("tf.notelp").setValue(var_cari_pasiennotelp);
				Ext.getCmp("tf.nohp").setValue(var_cari_pasiennohp);
				Ext.getCmp("cb.stpelayanan").setValue(var_cari_pasienjpel);
				Ext.getCmp("tf.tptlahir").setValue(var_cari_pasientpl);
				Ext.getCmp("df.tgllahir").setValue(var_cari_pasientgl);
				Ext.getCmp("cb.agama").setValue(var_cari_pasienagama);
				Ext.getCmp("cb.goldarah").setValue(var_cari_pasiengol);
				Ext.getCmp("cb.pendidikan").setValue(var_cari_pasienpend);
				Ext.getCmp("cb.pekerjaan").setValue(var_cari_pasienpek);
				Ext.getCmp("cb.sukubangsa").setValue(var_cari_pasiensuku);
				Ext.getCmp("tf.noidentitas").setValue(var_cari_pasiennoid);
				Ext.getCmp("tf.nmibu").setValue(var_cari_pasienibu);
				Ext.getCmp("ta.alergiobat").setValue(var_cari_pasienalergi);
				Ext.getCmp("ta.catatan").setValue(var_cari_pasiencttn);
				daerah_lengkap(obj.iddaerah);
				umur(new Date(var_cari_pasientgl));
				ds_vregistrasi.setBaseParam('norm',obj.norm);
				ds_vregistrasi.load();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}

	function umur(val) {
		var date = new Date();
		var td = date.dateFormat('d');var d = val.dateFormat('d');
		var tm = date.dateFormat('m');var m = val.dateFormat('m');
		var ty = date.dateFormat('Y');var y = val.dateFormat('Y');
		
		if(td-d<0){
			day=(parseInt(td)+30)-d;
			tm--;
		}
		else{
			day=td-d;
		}
		if(tm-m<0){
			month=(parseInt(tm)+12)-m;
			ty--;
		}
		else{
			month=tm-m;
		}
		year=ty-y;
		Ext.getCmp('tf.umurthn').setValue(year);
		Ext.getCmp('tf.umurbln').setValue(month);
		Ext.getCmp('tf.umurhari').setValue(day);
	}
	
	function dftReservasi(){
		var ds_dokter = dm_dokter();
		var ds_reservasix = dm_reservasix();
		ds_reservasix.setBaseParam('streservasi',0);
		ds_reservasix.setBaseParam('jpelayanan',1);
		var cm_creservasi = new Ext.grid.ColumnModel([
			{
				header: 'No. Antrian',
				dataIndex: 'noantrian',
				width: 80
			},{
				header: 'Tgl. Reservasi',
				dataIndex: 'tglreservasi',
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
				width: 80
			},{
				header: 'Jam Reservasi',
				dataIndex: 'jamreservasi',
				width: 100
			},{
				header: 'No RM',
				dataIndex: 'norm',
				width: 80
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 120
			},{
				header: 'Dokter',
				dataIndex: 'nmdoktergelar',
				width: 150
			}
		]);
		var sm_creservasi = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_creservasi = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_creservasi = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_reservasix,
			displayInfo: true,
			displayMsg: 'Data Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_creservasi = new Ext.grid.GridPanel({
			ds: ds_reservasix,
			cm: cm_creservasi,
			sm: sm_creservasi,
			view: vw_creservasi,
			height: 300,
			width: 955,
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
			bbar: paging_creservasi,
			listeners: {
				rowdblclick: klik_creservasi
			}
		});
		var win_creservasi = new Ext.Window({
			title: 'Cari Reservasi',
			modal: true,
			items: [{
					xtype: 'button',
					text: 'Cari',
					id: 'btn.cari',
					style: 'padding: 10px',
					width: 100,
					handler: function() {
						cAdvanceRes();
					}
				},{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_cnorm',
							items:[{
								xtype: 'checkbox',
								id:'chb.crmres',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.crmres').enable();
										} else if(val == false){
											Ext.getCmp('tf.crmres').disable();
											Ext.getCmp('tf.crmres').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.crmres',
								emptyText:'No. RM',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_cnmpasien',
							items:[{
								xtype: 'checkbox',
								id:'chb.cnmpasienres',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cnmpasienres').enable();
										} else if(val == false){
											Ext.getCmp('tf.cnmpasienres').disable();
											Ext.getCmp('tf.cnmpasienres').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cnmpasienres',
								emptyText:'Nama Pasien',
								width: 230, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_ctgllhr',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctglreservasi',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('df.ctglreservasi').enable();
										} else if(val == false){
											Ext.getCmp('df.ctglreservasi').disable();
											Ext.getCmp('df.ctglreservasi').setValue(new Date());
										}
									}
								}
							},{
								xtype: 'datefield',
								id: 'df.ctglreservasi',
								width: 100, value: new Date(),
								format: 'd-m-Y',
								disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctmplhr',
							items:[{
								xtype: 'checkbox',
								id:'chb.cdokter',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cb.cdokter').enable();
										} else if(val == false){
											Ext.getCmp('cb.cdokter').disable();
											Ext.getCmp('cb.cdokter').setValue('');
										}
									}
								}
							},{
								xtype: 'combo',
								id: 'cb.cdokter', width: 230, 
								store: ds_dokter, valueField: 'iddokter', displayField: 'nmdoktergelar',
								editable: false, triggerAction: 'all',
								forceSelection: true, submitValue: true, mode: 'local',
								emptyText:'Dokter', disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_cnmibu',
							items:[{
								xtype: 'checkbox',
								id:'chb.cemail',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cemail').enable();
										} else if(val == false){
											Ext.getCmp('tf.cemail').disable();
											Ext.getCmp('tf.cemail').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cemail',
								emptyText:'Email',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctelp',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctelpres',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.ctelpres').enable();
										} else if(val == false){
											Ext.getCmp('tf.ctelpres').disable();
											Ext.getCmp('tf.ctelpres').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.ctelpres',
								emptyText:'No. HP/Telp.',
								width: 230, disabled: true
							}]
						}]
					}]
				},
				grid_creservasi
			]
		}).show();

		function klik_creservasi(grid, rowIdx){
			var rec_creservasi = ds_reservasix.getAt(rowIdx);
			var creservasi_idreservasi = rec_creservasi.data["idreservasi"];
			var creservasi_norm = rec_creservasi.data["norm"];
			Ext.getCmp("tf.idreservasi").setValue(creservasi_idreservasi);
			Ext.getCmp("tf.norm").setValue(creservasi_norm);
			if(rec_creservasi.data["norm"] != ''){
				dataPasien();
			} else {
				var creservasi_nmpasien = rec_creservasi.data["nmpasien"];
				var creservasi_notelp = rec_creservasi.data["notelp"];
				var creservasi_nohp = rec_creservasi.data["nohp"];
				
				Ext.getCmp("tf.nmpasien").setValue(creservasi_nmpasien);
				Ext.getCmp("tf.notelp").setValue(creservasi_notelp);
				Ext.getCmp("tf.nohp").setValue(creservasi_nohp);
			}
						win_creservasi.close();
		}
		
		function cAdvanceRes(){
			if(Ext.getCmp('chb.ctglreservasi').getValue() == true){
				ds_reservasix.setBaseParam('tglreservasi',Ext.util.Format.date(Ext.getCmp('df.ctglreservasi').getValue(), 'Y-m-d'));
			} else {
				ds_reservasix.setBaseParam('tglreservasi','');
			}
		
			ds_reservasix.setBaseParam('norm',Ext.getCmp('tf.crmres').getValue());
			ds_reservasix.setBaseParam('nmpasien',Ext.getCmp('tf.cnmpasienres').getValue());
			ds_reservasix.setBaseParam('dokter',Ext.getCmp('cb.cdokter').getValue());
			ds_reservasix.setBaseParam('email',Ext.getCmp('tf.cemail').getValue());
			ds_reservasix.setBaseParam('notelp',Ext.getCmp('tf.ctelpres').getValue());
			ds_reservasix.load();
		}
	}
	
	function dftPasien(){
		var cm_cari_pasien = new Ext.grid.ColumnModel([
			{
				header: 'No RM',
				dataIndex: 'norm',
				width: 80
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'L/P',
				dataIndex: 'idjnskelamin',
				width: 30,
				renderer: function(value, p, r){
					var jkelamin = '';
					if(r.data['idjnskelamin'] == 1) jkelamin = 'L';
					if(r.data['idjnskelamin'] == 2) jkelamin = 'P';
					
					return jkelamin ;
				}
			},{
				header: 'Tgl. Lahir',
				dataIndex: 'tgllahir',
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
				width: 80
			},{
				header: 'Alamat Pasien',
				dataIndex: 'alamat',
				width: 210
			},{
				header: 'Nama Ibu',
				dataIndex: 'nmibu',
				width: 120
			},{
				header: 'No. HP/Telp.',
				dataIndex: 'notelp',
				renderer: function(value, p, r){
					var nohptelp = r.data['nohp'] + ' / ' + r.data['notelp'];
					
					return nohptelp ;
				},
				width: 180
			},{
				header: 'No. KTP/Paspor',
				dataIndex: 'noidentitas',
				width: 100
			}
		]);
		var sm_cari_pasien = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_pasien = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_pasien = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_pasien,
			displayInfo: true,
			displayMsg: 'Data Pasien Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_find_cari_pasien = new Ext.grid.GridPanel({
			ds: ds_pasien,
			cm: cm_cari_pasien,
			sm: sm_cari_pasien,
			view: vw_cari_pasien,
			height: 350,
			width: 975,
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
			bbar: paging_cari_pasien,
			listeners: {
				rowdblclick: klik_cari_pasien
			}
		});
		var win_find_cari_pasien = new Ext.Window({
			title: 'Cari Pasien',
			modal: true,
			items: [{
					xtype: 'button',
					text: 'Cari',
					id: 'btn.cari',
					style: 'padding: 10px',
					width: 100,
					handler: function() {
						cAdvance();
					}
				},{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_cnorm',
							items:[{
								xtype: 'checkbox',
								id:'chb.crm',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.crm').enable();
										} else if(val == false){
											Ext.getCmp('tf.crm').disable();
											Ext.getCmp('tf.crm').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.crm',
								emptyText:'No. RM',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_cnmpasien',
							items:[{
								xtype: 'checkbox',
								id:'chb.cnmpasien',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cnmpasien').enable();
										} else if(val == false){
											Ext.getCmp('tf.cnmpasien').disable();
											Ext.getCmp('tf.cnmpasien').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cnmpasien',
								emptyText:'Nama Pasien',
								width: 230, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_ctgllhr',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctgllhr',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('df.ctgllhr').enable();
										} else if(val == false){
											Ext.getCmp('df.ctgllhr').disable();
											Ext.getCmp('df.ctgllhr').setValue(new Date());
										}
									}
								}
							},{
								xtype: 'datefield',
								id: 'df.ctgllhr',
								width: 100, value: new Date(),
								format: 'd-m-Y',
								disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctmplhr',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctmplhr',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.ctmplhr').enable();
										} else if(val == false){
											Ext.getCmp('tf.ctmplhr').disable();
											Ext.getCmp('tf.ctmplhr').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.ctmplhr',
								emptyText:'Tempat Lahir',
								width: 230, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_cnmibu',
							items:[{
								xtype: 'checkbox',
								id:'chb.cnmibu',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cnmibu').enable();
										} else if(val == false){
											Ext.getCmp('tf.cnmibu').disable();
											Ext.getCmp('tf.cnmibu').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cnmibu',
								emptyText:'Nama Ibu',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctelp',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctelp',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.ctelp').enable();
										} else if(val == false){
											Ext.getCmp('tf.ctelp').disable();
											Ext.getCmp('tf.ctelp').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.ctelp',
								emptyText:'No. HP/Telp.',
								width: 230, disabled: true
							}]
						}]
					}]
				},
				grid_find_cari_pasien
			]
		}).show();

		function klik_cari_pasien(grid, rowIdx){
			var rec_cari_pasien = ds_pasien.getAt(rowIdx);
			var var_cari_pasienno = rec_cari_pasien.data["norm"];
			var var_cari_pasiennm = rec_cari_pasien.data["nmpasien"];
			var var_cari_pasienjkel = rec_cari_pasien.data["idjnskelamin"];
			var var_cari_pasienstk = rec_cari_pasien.data["idstkawin"];
			var var_cari_pasienalamat = rec_cari_pasien.data["alamat"];
			var var_cari_pasienwn = rec_cari_pasien.data["idwn"];
			var var_cari_pasiennegara = rec_cari_pasien.data["negara"];
			var var_cari_pasiendaerah = rec_cari_pasien.data["nmdaerah"];
			var var_cari_pasiennotelp = rec_cari_pasien.data["notelp"];
			var var_cari_pasiennohp = rec_cari_pasien.data["nohp"];
			var var_cari_pasienjpel = rec_cari_pasien.data["idstpelayanan"];
			var var_cari_pasientpl = rec_cari_pasien.data["tptlahir"];
			var var_cari_pasientgl = rec_cari_pasien.data["tgllahir"];
			var var_cari_pasienagama = rec_cari_pasien.data["idagama"];
			var var_cari_pasiengol = rec_cari_pasien.data["idgoldarah"];
			var var_cari_pasienpend = rec_cari_pasien.data["idpendidikan"];
			var var_cari_pasienpek = rec_cari_pasien.data["idpekerjaan"];
			var var_cari_pasiensuku = rec_cari_pasien.data["idsukubangsa"];
			var var_cari_pasiennoid = rec_cari_pasien.data["noidentitas"];
			var var_cari_pasienibu = rec_cari_pasien.data["nmibu"];
			var var_cari_pasienalergi = rec_cari_pasien.data["alergi"];
			var var_cari_pasiencttn = rec_cari_pasien.data["catatan"];
				
			Ext.getCmp('tf.norm').focus()
			Ext.getCmp("tf.norm").setValue(var_cari_pasienno);
			Ext.getCmp("tf.nmpasien").setValue(var_cari_pasiennm);
			Ext.getCmp("cb.jkelamin").setValue(var_cari_pasienjkel);
			Ext.getCmp("cb.stkawin").setValue(var_cari_pasienstk);
			Ext.getCmp("tf.alamat").setValue(var_cari_pasienalamat);
			Ext.getCmp("cb.wn").setValue(var_cari_pasienwn);
			Ext.getCmp("tf.negara").setValue(var_cari_pasiennegara);
			Ext.getCmp("tf.daerah").setValue(var_cari_pasiendaerah);
			Ext.getCmp("tf.notelp").setValue(var_cari_pasiennotelp);
			Ext.getCmp("tf.nohp").setValue(var_cari_pasiennohp);
			Ext.getCmp("cb.stpelayanan").setValue(var_cari_pasienjpel);
			Ext.getCmp("tf.tptlahir").setValue(var_cari_pasientpl);
			Ext.getCmp("df.tgllahir").setValue(var_cari_pasientgl);
			Ext.getCmp("cb.agama").setValue(var_cari_pasienagama);
			Ext.getCmp("cb.goldarah").setValue(var_cari_pasiengol);
			Ext.getCmp("cb.pendidikan").setValue(var_cari_pasienpend);
			Ext.getCmp("cb.pekerjaan").setValue(var_cari_pasienpek);
			Ext.getCmp("cb.sukubangsa").setValue(var_cari_pasiensuku);
			Ext.getCmp("tf.noidentitas").setValue(var_cari_pasiennoid);
			Ext.getCmp("tf.nmibu").setValue(var_cari_pasienibu);
			Ext.getCmp("ta.alergiobat").setValue(var_cari_pasienalergi);
			Ext.getCmp("ta.catatan").setValue(var_cari_pasiencttn);
			daerah_lengkap(rec_cari_pasien.data["iddaerah"]);
			umur(new Date(var_cari_pasientgl));
			ds_vregistrasi.setBaseParam('norm',var_cari_pasienno);
			ds_vregistrasi.load();
						win_find_cari_pasien.close();
		}
		
		function cAdvance(){
			if(Ext.getCmp('chb.ctgllhr').getValue() == true){
				ds_pasien.setBaseParam('tgllahir',Ext.util.Format.date(Ext.getCmp('df.ctgllhr').getValue(), 'Y-m-d'));
			} else {
				ds_pasien.setBaseParam('tgllahir','');
			}
		
			ds_pasien.setBaseParam('norm',Ext.getCmp('tf.crm').getValue());
			ds_pasien.setBaseParam('nmpasien',Ext.getCmp('tf.cnmpasien').getValue());
			ds_pasien.setBaseParam('tptlahir',Ext.getCmp('tf.ctmplhr').getValue());
			ds_pasien.setBaseParam('nmibu',Ext.getCmp('tf.cnmibu').getValue());
			ds_pasien.setBaseParam('notelp',Ext.getCmp('tf.ctelp').getValue());
			ds_pasien.load();
		}
	}
	
	function dftDaerah(){
		var cm_cari_daerah = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'iddaerah'
			},{
				header: 'Nama Daerah',
				dataIndex: 'nmdaerah',
				width: 350
			}
		]);
		var sm_cari_daerah = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_daerah = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_daerah = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_daerah,
			displayInfo: true,
			displayMsg: 'Data Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_daerah = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_find_cari_daerah = new Ext.grid.GridPanel({
			ds: ds_daerah,
			cm: cm_cari_daerah,
			sm: sm_cari_daerah,
			view: vw_cari_daerah,
			height: 460,
			width: 355,
			plugins: cari_cari_daerah,
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
			bbar: paging_cari_daerah,
			listeners: {
				rowdblclick: klik_cari_daerah
			}
		});
		var win_find_cari_daerah = new Ext.Window({
			title: 'Cari Daerah',
			modal: true,
			items: [grid_find_cari_daerah]
		}).show();

		function klik_cari_daerah(grid, rowIdx){
			var rec_cari_daerah = ds_daerah.getAt(rowIdx);
			var var_cari_daerah = rec_cari_daerah.data["nmdaerah"];
						
			Ext.getCmp('tf.daerah').focus();
			Ext.getCmp("tf.daerah").setValue(var_cari_daerah);
			daerah_lengkap(rec_cari_daerah.data["iddaerah"]);
						win_find_cari_daerah.close();
		}
	}
	
	function daerah_lengkap(iddaerah){
		Ext.Ajax.request({
			url:BASE_URL + 'daerah_controller/getDaerahlkp',
			params:{
				id : iddaerah
			},
			method:'POST',
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				var var_cari_daerahlkp = "Kode Pos : "+
					"\nKelurahan : "+ obj.Kelurahan +
					"\nKecamatan : "+ obj.Kecamatan +
					"\nKota/Kab : "+ obj.Kota +
					"\nPropinsi : "+ obj.Propinsi;
				Ext.getCmp("ta.daerahlkp").setValue(var_cari_daerahlkp);
			}
		});
	}
}