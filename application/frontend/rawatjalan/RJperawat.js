function RJperawat(){
	var ds_pasien = dm_pasien();
	var ds_jkelamin = dm_jkelamin();
	var ds_jpelayanan = dm_jpelayanan();
	var ds_bagian = dm_bagian();
	ds_bagian.setBaseParam('jpel',1);
	
	var ds_stposisipasien = dm_stposisipasien();
	var ds_dokter = dm_dokter();
	var ds_reservasix = dm_reservasix();
	var rowidreservasi = '';
	ds_reservasix.setBaseParam('tglreservasi', Ext.util.Format.date(new Date(), 'Y-m-d'));
	ds_reservasix.setBaseParam('start',0);
	ds_reservasix.setBaseParam('limit',100);
	
	var row_reservasi = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	
	var grid_reservasi = new Ext.grid.EditorGridPanel({
		store: ds_reservasix,
		sm: row_reservasi,
		height: 200,
		id: 'grid_reservasi',
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		clicksToEdit: 1,
		listeners	: {
            rowclick : function(grid, rowIndex, e){
				var record = grid.getStore().getAt(rowIndex);
				Ext.getCmp("tf.noreg").setValue(record.get('noreg'));
				Ext.getCmp("tf.tglreg").setValue(record.get('tglreg'));
				Ext.getCmp("tf.stpas").setValue(record.get('nmstpasien'));
				Ext.getCmp("tf.norm").setValue(record.get('norm'));
				Ext.getCmp("tf.nmpasien").setValue(record.get('nmpasien'));
				Ext.getCmp("tf.umurthn").setValue(record.get('umurtahun'));
				Ext.getCmp("tf.umurbln").setValue(record.get('umurbulan'));
				Ext.getCmp("tf.umurhari").setValue(record.get('umurhari'));
				Ext.getCmp("cb.jkelamin").setValue(record.get('nmjnskelamin'));
				Ext.getCmp("ta.alergiobat").setValue(record.get('alergi'));
				Ext.getCmp("ta.catatanreg").setValue(record.get('catatan'));
				Ext.getCmp("tf.tinggi").setValue(record.get('tinggibadan'));
				Ext.getCmp("tf.berat").setValue(record.get('beratbadan'));
				Ext.getCmp("tf.systole").setValue(record.get('systole'));
				Ext.getCmp("tf.diastole").setValue(record.get('diastole'));
				Ext.getCmp("ta.keluhan").setValue(record.get('keluhan'));
				Addrecord('grid_reservasi',rowIndex);
            }
        },
		columns: [{
			header: 'No. Antrian',
			dataIndex: 'noantrian',
            align: 'center',
			width: 65
		},{
			header: 'Jam Reg.',
			dataIndex: 'jamreg',
            align: 'center',
			width: 55
		},{
			header: 'No. Registrasi',
			dataIndex: 'noreg',
            align: 'center',
			width: 80
		},{
			header: 'No. RM',
			dataIndex: 'norm',
			width: 70
		},{
			header: 'Nama Pasien',
			dataIndex: 'nmpasien',
			width: 120
		},{
			header: '(L/P)',
			dataIndex: 'nmjnskelamin',
            align: 'center',
			width: 35,
			renderer: function(value, p, r){
				var jkelamin = '';
				if(r.data['idjnskelamin'] == 1) jkelamin = 'L';
				if(r.data['idjnskelamin'] == 2) jkelamin = 'P';
				
				return jkelamin ;
			}
		},{
			header: 'Status Pasien',
			dataIndex: 'nmstpasien',
			width: 75
		},{
			header: 'Dokter',
			dataIndex: 'nmdoktergelar',
			width: 160
		},{
			header: 'TB(cm)',
			dataIndex: 'tinggibadan',
			width: 45
		},{
			header: 'BB(Kg)',
			dataIndex: 'beratbadan',
			width: 45
		},{
			header: 'Tekanan Darah',
			dataIndex: 'systole',
			width: 85,
			renderer: function(value, p, r){
				var sysdia = '';
				if(r.data['diastole'] && r.data['systole']) sysdia = r.data['systole'] + ' / ' + r.data['diastole'] + ' mmHg';
				
				return sysdia ;
			}
		},{
			header: 'Anamnesa/Keluhan',
			dataIndex: 'keluhan',
			width: 150
		},{
			header: 'Posisi Pasien',
			dataIndex: 'nmstposisipasien',
			width: 110,
			editor: {
				xtype: 'combo',
				id: 'cb.posisipasien', width: 150, 
				store: ds_stposisipasien, valueField: 'idstposisipasien', displayField: 'nmstposisipasien',
				editable: false, triggerAction: 'all',
				forceSelection: true, submitValue: true, mode: 'local',
				listeners:{
					select:function(combo, records, eOpts){
						var obj= records.data;
						fnEditPosisiPasien(obj.idstposisipasien);
					}
				}
			}
		}],
		/* listeners: {	
			rowclick: Addrecord
		} */
	});
	
	var rjperawat_form = new Ext.form.FormPanel({ 
		id: 'fp.rjperawat',
		title: 'Daftar Pasien Rawat Jalan (Untuk Perawat)',
		width: 900, Height: 1000,
		layout: {
            type: 'form',
            pack: 'center',
            align: 'center'
        },
		frame: true,
		autoScroll: true,
		tbar: [
			'Tanggal',{
				xtype: 'datefield',
				id: 'df.tglreservasi',
				value: new Date(),
				format: 'd-m-Y',
				width: 100 },'-',
			'Unit Pelayanan',{
				xtype: 'combo',
				id: 'cb.upelayanan', width: 150, 
				store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
				editable: false, triggerAction: 'all',
				forceSelection: true, submitValue: true, mode: 'local',
				listeners: {
					afterrender: function(combo) {
						/* ComboRecord = new Ext.data.Record.create([{name: 'idjnspelayanan'}, {name: 'nmjnspelayanan'}]);
						ds_jpelayanan.add(new ComboRecord({idjnspelayanan: 1000, nmjnspelayanan: 'Inserisci Nuovo'}));
						ds_jpelayanan.reload(); */
						
						/* var store = combo.getStore();
						var data = [];
						data.push(new Ext.data.Record({
							idjnspelayanan: 100,
							nmjnspelayanan:'zzzaaaaaaaaaaaaaaa'
						}));
						ds_jpelayanan.insert(6,data);
						console.log(data);
						console.log(ComboRecord); */
					}
				}},'-',
			'Dokter',{
				xtype: 'combo',
				id: 'cb.dokter', width: 150, 
				store: ds_dokter, valueField: 'iddokter', displayField: 'nmdoktergelar',
				editable: false, triggerAction: 'all',
				forceSelection: true, submitValue: true, mode: 'local'},'-',
			{
				xtype: 'button',
				text: 'Cari',
				id: 'btn.cari',
				width: 50,
				style: { 
					background:'-webkit-gradient(linear, left top, left bottom, color-stop(0.5, #fff), color-stop(0.8, #dddddd))',
					background:'-moz-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'-webkit-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'-o-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'-ms-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'linear-gradient(to bottom, #fff 50%, #dddddd 80%)',
					'-moz-border-radius':'15px',
					'-webkit-border-radius':'15px',
					'border-radius':'5px',
					border:'1px solid #d6bcd6' },
				handler: function() {
					cari();
				}},'-',
			{
				xtype: 'button',
				text: 'Ulangi Pencarian',
				id: 'btn.ulang',
				width: 100,
				style: { 
					background:'-webkit-gradient(linear, left top, left bottom, color-stop(0.5, #fff), color-stop(0.8, #dddddd))',
					background:'-moz-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'-webkit-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'-o-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'-ms-linear-gradient(top, #fff 50%, #dddddd 80%)',
					background:'linear-gradient(to bottom, #fff 50%, #dddddd 80%)',
					'-moz-border-radius':'15px',
					'-webkit-border-radius':'15px',
					'border-radius':'5px',
					border:'1px solid #d6bcd6' },
				handler: function() {
					ulangCari();
				}},'-',
			{xtype: 'tbfill' }
		],
		defaults: { labelWidth: 150, labelAlign: 'right'},
        items: [{
			xtype: 'fieldset', layout: 'form', autowidth: true,
			items: [grid_reservasi]
		},{
			xtype: 'container',
			id:'fs.pasien', layout: 'column', border:false,
			defaults: { labelWidth: 150, labelAlign: 'right' }, 
			items: [{
				////COLUMN 1
				xtype: 'container',style: 'padding:10px',
				layout: 'form', columnWidth: 0.50,border:false,
				defaults: { labelWidth: 150 }, 
				items: [{
					xtype: 'fieldset',style: 'padding:10px',
					layout: 'form', columnWidth: 1, title: 'Data Registrasi Pasien',
					items: [{
						xtype: 'compositefield', layout:'anchor',
						fieldLabel: 'No. / Tgl. Registrasi',
						items: [{
							xtype: 'textfield',
							id: 'tf.noreg', width: '20%', readOnly: true, 
							style : 'opacity:0.6'
						},{
							xtype: 'label', id: 'lb.reg', text: '/', margins: '0 5 0 5',
						},{
							xtype: 'textfield',
							id: 'tf.tglreg', width: '20%', readOnly: true, 
							style : 'opacity:0.6'
						},{
							xtype: 'label', id: 'lb.pasreg', text: 'Pasien :', margins: '0 5 0 20',
						},{
							xtype: 'textfield',
							id: 'tf.stpas', width: '24%', readOnly: true, 
							style : 'opacity:0.6'
						}]
					},{
						xtype: 'container', fieldLabel: 'No. RM / Nama Pasien',
						layout: 'hbox',
						items: [{
							xtype: 'textfield',
							id  : 'tf.norm', width : '20%', readOnly: true, 
							style : 'opacity:0.6'
						},{
							xtype: 'label', id: 'lb.garing', text: '/', margins: '0 5 0 10',
						},{
							xtype: 'textfield',
							id  : 'tf.nmpasien', width : '66.6%', readOnly: true, 
							style : 'opacity:0.6'
						}]
					},{
						xtype: 'container', fieldLabel: 'Umur',
						layout: 'hbox',
						items: [{
							xtype: 'textfield', id: 'tf.umurthn', 
							width: '5%', readOnly: true, value:12,
							style : 'opacity:0.6'
						},{
							xtype: 'label', id: 'lb.umurthn', text: 'Tahun', margins: '0 10 0 5',
						},{ 	
							xtype: 'textfield', id: 'tf.umurbln', 
							width: '5%', readOnly: true, 
							style : 'opacity:0.6'
						},{
							xtype: 'label', id: 'lb.umurbln', text: 'Bulan', margins: '0 10 0 5',
						},{
							xtype: 'textfield', id: 'tf.umurhari', 
							width: '5%', readOnly: true, 
							style : 'opacity:0.6'
						},{
							xtype: 'label', id: 'lb.umurhari', text: 'Hari', margins: '0 10 0 5'
						},{
							xtype: 'label', id: 'lb.jkel', text: 'Jenis Kelamin', margins: '0 10 0 10'
						},{
							xtype: 'textfield', id: 'cb.jkelamin', 
							width: '12%', readOnly: true, 
							style : 'opacity:0.6'
							/*xtype: 'combo',
							id: 'cb.jkelamin', width: 52,
							store: ds_jkelamin, valueField: 'idjnskelamin', displayField: 'nmjnskelamin',
							editable: false, triggerAction: 'all',
							forceSelection: true, submitValue: true, mode: 'local',
							readOnly: true, style : 'opacity:0.6'*/
						}]
					},{
						xtype: 'textarea', fieldLabel: 'Alergi Obat',
						id  : 'ta.alergiobat', width : '94.5%', height:80
					},{
						xtype: 'textarea', fieldLabel: 'Catatan Registrasi',
						id  : 'ta.catatanreg', width : '94.5%', height:80, readOnly: true, 
						style : 'opacity:0.6'
					}]
				}]
			},{
				////COLUMN 2
				xtype: 'fieldset',style: 'padding:10px',
				layout: 'form', columnWidth: 0.50,border:false,
				defaults: { labelWidth: 150 }, 
				items: [{
					xtype: 'fieldset',style: 'padding:10px',
					layout: 'form', columnWidth: 0.50, title: 'Pemeriksaan Fisik',
					defaults: { labelWidth: 1 }, 
					items: [{
						xtype: 'compositefield', layout:'anchor',
						fieldLabel: 'Tinggi / Berat Badan',
						items: [{
							xtype: 'numericfield',
							id: 'tf.tinggi', width: '20%',
							enableKeyEvents: true,
							listeners:{
								keyup:function(){
									hitungBMI();
								}
							}
						},{
							xtype: 'label', id: 'lb.tinggi', text: 'cm /', margins: '0 5 0 5',
						},{
							xtype: 'numericfield',
							id: 'tf.berat', width: '20%',
							enableKeyEvents: true,
							listeners:{
								keyup:function(){
									hitungBMI();
								}
							}
						},{
							xtype: 'label', id: 'lb.berat', text: 'Kg', margins: '0 54 0 5',
						},{
							xtype: 'button',
							text: 'Simpan',
							id: 'btn.penjamin',
							width: '20%',
							handler: function() {
								simpan('fp.rjperawat');
							}
						}]
					},{
						xtype: 'compositefield', layout:'anchor',
						fieldLabel: 'BMI',
						items: [{
							xtype: 'textfield',
							id: 'tf.bmi1', width: '20%', readOnly: true, readOnly: true, 
							style : 'opacity:0.6'
						},{
							xtype: 'textfield',
							id: 'tf.bmi2', width: '67%',margins: '0 0 0 15', readOnly: true, 
							style : 'opacity:0.6'
						}]
					},{
						xtype: 'compositefield', layout:'anchor',
						fieldLabel: 'Tekanan Darah',
						items: [{
							xtype: 'numericfield',
							id: 'tf.systole', width: '20%'
						},{
							xtype: 'label', id: 'lb.tkndrh1', text: '/', margins: '0 5 0 5',
						},{
							xtype: 'numericfield',
							id: 'tf.diastole', width: '24%',
						},{
							xtype: 'label', id: 'lb.tkndrh2', text: 'mmHg', margins: '0 5 0 5',
						}]
					},{
						xtype: 'textarea', fieldLabel: 'Anamnesa / Keluhan',
						id  : 'ta.keluhan', width : '94.5%', height:160
					}]
				}]
			}]
		}]
	}); SET_PAGE_CONTENT(rjperawat_form);
	
	function Addrecord(grid, rowIndex){
		var record = ds_reservasix.getAt(rowIndex);
		rowidreservasi = record.data['idreservasi'];
	}
	
	function bersihrjper() {
		Ext.getCmp('tf.noreg').setValue();
		Ext.getCmp('tf.tglreg').setValue();
		Ext.getCmp('tf.stpas').setValue();
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.umurthn').setValue();
		Ext.getCmp('tf.umurbln').setValue();
		Ext.getCmp('tf.umurhari').setValue(); 
		Ext.getCmp('cb.jkelamin').setValue();
		Ext.getCmp('ta.alergiobat').setValue(); 
		Ext.getCmp('ta.catatanreg').setValue(); 
		Ext.getCmp('tf.tinggi').setValue();
		Ext.getCmp('tf.berat').setValue();
		Ext.getCmp('tf.bmi1').setValue();
		Ext.getCmp('tf.bmi2').setValue();
		Ext.getCmp('tf.systole').setValue();
		Ext.getCmp('tf.diastole').setValue();
		Ext.getCmp('ta.keluhan').setValue();
		ds_reservasix.reload();
	}

	function simpan(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/insorupd_regperawat',
			method: 'POST',
			success: function(rjperawat_form, o) {
				if (o.result.success==true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					Ext.getCmp('tf.norm').setValue(o.result.norm);
				} else if (o.result.success==false) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
				}
				bersihrjper();
			}
		});
	}
	
	function cari() {
		ds_reservasix.setBaseParam('tglreservasi',Ext.getCmp('df.tglreservasi').getValue());
		ds_reservasix.setBaseParam('upel',Ext.getCmp('cb.upelayanan').getValue());
		ds_reservasix.setBaseParam('dokter',Ext.getCmp('cb.dokter').getValue());
		ds_reservasix.reload();
	}
	
	function ulangCari() {
		Ext.getCmp('df.tglreservasi').setValue(new Date());
		Ext.getCmp('cb.upelayanan').setValue();
		Ext.getCmp('cb.dokter').setValue();
		
		ds_reservasix.setBaseParam('upel','');
		ds_reservasix.setBaseParam('dokter','');
		ds_reservasix.setBaseParam('tglreservasi', Ext.util.Format.date(new Date(), 'Y-m-d'));
		ds_reservasix.reload();
	}
	
	function hitungBMI(){
		var tinggi = Ext.getCmp('tf.tinggi').getValue();
		var berat = Ext.getCmp('tf.berat').getValue();
		if(tinggi != '' && berat != ''){
			var tinggirt = tinggi/100;
			var keterangan = '';
			var bmi = berat / (tinggirt * tinggirt);
			if(bmi < 18.5) keterangan = 'Underweight';
			else if(bmi < 25) keterangan = 'Normal';
			else if(bmi < 30) keterangan = 'Overweight';
			else keterangan = 'Obesitas';
			
			Ext.getCmp('tf.bmi1').setValue(Ext.util.Format.number(bmi, '0.0'));
			Ext.getCmp('tf.bmi2').setValue(keterangan);
		} else {
			Ext.getCmp('tf.bmi1').setValue();
			Ext.getCmp('tf.bmi2').setValue();
		}
		
	}

	function fnEditPosisiPasien(idstposisipasien){
		Ext.Ajax.request({
			url: BASE_URL + 'reservasi_controller/updateStposisipasien',
			params: {
				idreservasi : rowidreservasi,
				idstposisipasien : idstposisipasien
			},
			success: function(){
				Ext.getCmp('grid_reservasi').store.reload();
				Ext.Msg.alert("Informasi", "Posisi Pasien Berhasil Dirubah");
			},
			failure: function(){
				Ext.Msg.alert("Informasi", "Posisi Pasien Gagal Dirubah");
			}
			
		});
	}
}