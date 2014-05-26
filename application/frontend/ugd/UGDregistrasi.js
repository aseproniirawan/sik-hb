function UGDregistrasi(namaForm){
	var myVar=setInterval(function(){myTimer()},1000);
	function myTimer(){
		var d=new Date();
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
	
	Ext.Ajax.request({
		url:BASE_URL + 'reservasi_controller/getNoantrian',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			Ext.getCmp("tf.noantrian").setValue(obj.max);
			Ext.getCmp("tf.jmlpantri").setValue(obj.antrian);
		}
	});
	
	Ext.Ajax.request({
		url:BASE_URL + 'vregistrasi_controller/cekRegistrasi',
		method:'POST',
		params: {
			norm		: Ext.getCmp('tf.norm').getValue(),
			jpel		: 'Unit Gawat Darurat'
		},
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			if(obj.validasi > 0){
				var arr = [];
				var ind = 0;
				Ext.MessageBox.alert('Informasi', 'Pasien tersebut telah melakukan registrasi UGD');
				obj.arr.forEach(function(n) {
					arr[ind] = n;
					ind += 1;
				});
				ds_bagianug.setBaseParam('val',Ext.encode(arr));
				ds_bagianug.reload();
			}
		}
	});
	
	if(Ext.getCmp('tf.idreservasi').value != null){
		Ext.Ajax.request({
			url:BASE_URL + 'reservasi_controller/getRegres',
			method:'POST',
			params: {
				idreservasi		: Ext.getCmp('tf.idreservasi').value
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				Ext.getCmp("tf.dokter").setValue(obj.nmdoktergelar);
				Ext.getCmp("tf.upelayanan").setValue(obj.nmbagian);
				ds_jadwalprakteknow.setBaseParam('idbagian',obj.idbagian);
				ds_jadwalprakteknow.reload();
			}
		});
	}
	
	var ds_pasien = dm_pasien();
	var ds_jkelamin = dm_jkelamin();
	var ds_caradatang = dm_caradatang();
	//var ds_jpelayanan = dm_jpelayanan();
	var ds_vregistrasi = dm_vregistrasi();
	var ds_klsrawat = dm_klsrawat();
	var ds_kamarbagian = dm_kamarbagian();
	var ds_penjamin = dm_penjamin();
	var ds_bagian = dm_bagianrjriugd();
	var ds_bagianug = dm_bagian();
	ds_bagianug.setBaseParam('jpel',3);
	var ds_dokter = dm_dokter();
	var ds_jpelayanan = dm_jpelayanan();
	var ds_dokterugd = dm_dokterri();
	var ds_carabayar = dm_carabayar();
	var ds_tarifpaketdet = dm_tarifpaketdet();
	var ds_jadwalprakteknow = dm_jadwalprakteknow();
	ds_jadwalprakteknow.setBaseParam('idbagian',null);
	ds_vregistrasi.setBaseParam('cek','UGD');
	
	var ds_nota = dm_nota();
	ds_nota.setBaseParam('start',0);
	ds_nota.setBaseParam('limit',50);
	ds_nota.setBaseParam('idregdet',null);
	
	var grid_jdwldktr = new Ext.grid.GridPanel({
		store: ds_jadwalprakteknow,
		height: 100,
		width: 300,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_nota',
		hideHeaders: true,
		forceFit: true,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		listeners	: {
            rowclick : function(grid, rowIndex, e){
				var record = grid.getStore().getAt(rowIndex);
				Ext.getCmp("tf.dokter").setValue(record.get('nmdoktergelar'));
            }
        },  
		columns: [{
			dataIndex: 'jampraktek',
			width: 100
		},{
			dataIndex: 'nmdoktergelar',
			width: 192
		}]
	});
    
	var grid_notarj = new Ext.grid.GridPanel({
		store: ds_nota,
		frame: true,
		height: 300,
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
		tbar: [
			'No. Nota : ',{
				xtype: 'textfield',
				id: 'tf.nonota',
				width: 100, readOnly:true,
				style : 'opacity:0.6'},'-',
			'No. Kuitansi',{
				xtype: 'textfield',
				id: 'tf.nokuitansi',
				width: 100, readOnly:true,
				style : 'opacity:0.6'},'-',
			'Cara Bayar',{
				xtype: 'combo',
				id: 'cb.carabayar', width: 150, 
				store: ds_carabayar, valueField: 'idcarabayar', displayField: 'nmcarabayar',
				editable: false, triggerAction: 'all', value: 'Tunai',
				forceSelection: true, submitValue: true, mode: 'local'},'-',
			{
				xtype: 'button',
				text: 'Tambah Item Pelayanan',
				id: 'btn.tambahip',
				width: 120,
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
					fPel();
				}},'-',
			{
				xtype: 'button',
				text: 'Cetak Nota',
				id: 'btn.cetaknota',
				disabled:true,
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
					cetakNotaUG();
				}},'-',
			{
				xtype: 'button',
				text: 'Cetak Kuitansi',
				id: 'btn.cetakkuitansi',
				disabled:true,
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
					cetakKuiUG();
				}},'-',
			{xtype: 'tbfill' }
		],
		columns: [{
			header: 'Item Pelayanan',
			dataIndex: 'nmitem',
			width: 150
		},{
			header: 'Dokter',
			dataIndex: 'nmdoktergelar',
			width: 150
		},{
			header: '@Tarif',
			dataIndex: 'tarif',
			width: 150
		},{
			header: 'Qty',
			dataIndex: 'qty',
			width: 150
		},{
			header: 'Diskon %',
			dataIndex: '',
			width: 100
		},{
			header: 'Diskon Rp',
			dataIndex: '',
			width: 100
		},{
			header: 'Sub Total',
			dataIndex: 'tarif',
			width: 100
		},{
			xtype: 'actioncolumn',
			width: 45,
			header: 'Hapus',
			align:'center',
			items: [{
				getClass: function(v, meta, record) {
					meta.attr = "style='cursor:pointer;'";
				},
				icon   : 'application/framework/img/rh_delete.gif',
				tooltip: 'Hapus record',
				handler: function(grid, rowIndex) {
					ds_nota.removeAt(rowIndex);
				}
			}]
		},{
			dataIndex: 'kditem',
			hidden: true,
			hideable: false
		},{
			dataIndex: 'idjnstarif',
			hidden: true,
			hideable: false
		},{
			dataIndex: 'idtarifpaketdet',
			hidden: true,
			hideable: false
		}],
		bbar: [
			{ xtype:'tbfill' },
			{
				xtype: 'fieldset',
				border: false,
				width: 370,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'label', id: 'lb.jml', text: 'Total :', margins: '0 10 0 100',
					},{
						xtype: 'numericfield',
						id: 'tf.jumlah',
						width: 100,
						readOnly:true, style: 'opacity:0.6'
					}]
				},{
					xtype: 'compositefield',
					items: [{
						xtype: 'label', id: 'lb.ua', text: 'Uang Tunai Yang Diterima :', margins: '0 9 0 0',
					},{
						xtype: 'numericfield',
						id: 'tf.utyd',
						width: 100,
						enableKeyEvents: true,
						listeners:{
							keyup:function(){
								hitungKembalian();
							}
						}
					}]
				},{
					xtype: 'compositefield',
					items: [{
						xtype: 'label', id: 'lb.km', text: 'Kembalian :', margins: '0 10 0 74',
					},{
						xtype: 'numericfield',
						id: 'tf.kembalian',
						width: 100,
						readOnly:true, style: 'opacity=0.6'
					}]
				}]
			}
		]
	});
            
	var registrasiugd_form = new Ext.form.FormPanel({ 
		id: 'fp.registrasiugd',
		title: 'Registasi UGD',
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
			{ text: 'Kembali', iconCls: 'silk-house', handler: function(){page_controller('0601');} },'-',
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpanUGD("fp.registrasiugd");} },'-',
			{ text: 'Batal Registrasi', id:'bt.batal', iconCls: 'silk-cancel', handler: function(){batalUGD("fp.registrasiugd");} },'-',
			{ text: 'Cari Registrasi', iconCls: 'silk-find', handler: function(){cariRegUGD();} },'-',
			{xtype: 'tbfill' }
		],
		defaults: { labelWidth: 150, labelAlign: 'right', autoWidth: true},
        items: [{
			xtype: 'fieldset', title: '',
			id:'fs.registrasiugd', layout: 'column', 
			defaults: { labelWidth: 150, labelAlign: 'right' }, 
			items: [{
				//COLUMN 1
				layout: 'form', columnWidth: 0.50,
				items: [{
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
					id: 'cb.jkelamin', width: 150, 
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
					fieldLabel: 'Penjamin',
					items: [{
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
					xtype: 'combo', fieldLabel : 'Cara Datang',
					id: 'cb.caradatang', width: 300, 
					store: ds_caradatang, valueField: 'idcaradatang', displayField: 'nmcaradatang',
					editable: false, triggerAction: 'all', value:'Datang Sendiri',
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...',
					listeners:{
						select:function(combo, records, eOpts){
							if(records.get('idcaradatang') != 1)
							{
								Ext.getCmp('tf.upengirim').setReadOnly(false);
								Ext.getCmp('tf.upengirim').el.setStyle('opacity', 1);
								Ext.getCmp('btn.upengirim').enable();
								Ext.getCmp('tf.dkirim').setReadOnly(false);
								Ext.getCmp('tf.dkirim').el.setStyle('opacity', 1);
								Ext.getCmp('btn.dkirim').enable();
							} else {
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
					fieldLabel: 'Unit Pengirim',
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
					fieldLabel: 'Dokter Pengirim',
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
					xtype: 'textarea', fieldLabel: 'Catatan Registrasi',
					id  : 'ta.catatan', width : 300
				}]
			}, {
				//COLUMN 2
				layout: 'form', columnWidth: 0.50,
				items: [{
					xtype: 'container', fieldLabel: 'No. Registrasi',
					layout: 'hbox',
					items: [{
						xtype :'textfield',
						id :'tf.noreg',width:120, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'label', id: 'lb.noantrian', text: 'No. Antrian', margins: '0 10 0 10',
					},{
						xtype :'numericfield', fieldLabel: 'No. Antrian',
						id :'tf.noantrian',width:100, readOnly: true,
						style : 'opacity:0.6'
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
					}]
				},{
					xtype: 'compositefield',
					fieldLabel: 'Unit Pelayanan',
					items: [{
						xtype :'textfield',
						id :'idbagian', hidden: true
					},{
						xtype :'textfield', allowBlank: false,
						id :'tf.upelayanan', width:250, readOnly: true
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.upelayanan',
						width: 45,
						handler: function() {
							dftUpel();
						}
					}]
				},{
					xtype: 'textfield', id: 'tf.dokter', 
					fieldLabel: 'Dokter Praktek',
					width: 300, readOnly: true,
					style : 'opacity:0.6'
				},{
					xtype: 'container', fieldLabel: ' ',
					items: [grid_jdwldktr]
				},{
					xtype: 'container', fieldLabel: 'Dokter Pengganti',
					layout: 'hbox',
					items: [{	
						xtype:'checkbox',
						boxLabel: 'Tampilkan Dokter', id: 'chb.dpengganti',
						width: 130,
						handler:check
					}]
				},{
					xtype: 'numericfield', fieldLabel: 'Jml. Pasien Antri',
					id: 'tf.jmlpantri', width: 100, readOnly: true,
					style : 'opacity:0.6'
				},{
					xtype :'numericfield', fieldLabel: 'Antrian ke',
					id :'tf.noantrian',width:100, readOnly: true,
					style : 'opacity:0.6'
				}/* ,{
					xtype: 'combo', fieldLabel : 'Jenis Pemeriksaan',
					id: 'cb.jpelayanan', width: 300, 
					store: ds_jpelayanan, valueField: 'idjnspelayanan', displayField: 'nmjnspelayanan',
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...', value: 'Unit Gawat Darurat'
				} ,{
					xtype: 'numericfield', fieldLabel: 'No. Karcis',
					id  : 'tf.nokarcis', width : 300
				},{
					xtype: 'numericfield', fieldLabel: 'Tarif',
					id  : 'tf.tarif', width : 150
				}*/]
			}]
		},{
			xtype: 'fieldset', layout: 'form',
			title: 'Biaya Pemeriksaan Standard UGD',
			items: [grid_notarj]
		}]
	}); SET_PAGE_CONTENT(registrasiugd_form);
	
	function bersihugd() {
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
		Ext.getCmp('tf.noreg').setValue(); 
		Ext.getCmp('df.tglshift').setValue(new Date());
		Ext.getCmp('tf.upelayanan').setValue(' ');
		Ext.getCmp('tf.dokter').setValue(' ');
		Ext.getCmp('ta.catatan').setValue();
		Ext.getCmp('tf.upengirim').disable();
		Ext.getCmp('btn.upengirim').disable();
		Ext.getCmp('tf.dkirim').disable();
		Ext.getCmp('btn.dkirim').disable();
		ds_jadwalprakteknow.setBaseParam('idbagian',null);
	}
	
	function check(e) {
		var cek = e.checked;
		if(cek){
			ds_jadwalprakteknow.setBaseParam('idbagian','-1');
			ds_jadwalprakteknow.reload();
		}else{
			ds_jadwalprakteknow.setBaseParam('idbagian',Ext.getCmp('idbagian').getValue());
			ds_jadwalprakteknow.reload();
		}
	}

	function simpanUGD(namaForm) {
		var arrnota = [];
		
		for (var zx = 0; zx <ds_nota.data.items.length; zx++) {
			var record = ds_nota.data.items[zx].data;
			zkditem = record.kditem;
			zidjnstarif = record.idjnstarif;
			zidtarifpaketdet = record.idtarifpaketdet;
			arrnota[zx] = zkditem + '-' + zidjnstarif + '-' + zidtarifpaketdet;
		}
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/insorupd_registrasi',
			method: 'POST',
			params: {
				ureg : 'UG',
				arrnota	:  Ext.encode(arrnota)
			},
			success: function(registrasiugd_form, o) {
				if (o.result.success == true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
					Ext.getCmp('tf.noreg').setValue(o.result.noreg);
					Ext.getCmp('tf.noantrian').setValue(o.result.noantrian);
					Ext.getCmp('tf.jmlpantri').setValue(o.result.noantrian);
					Ext.getCmp('tf.nokuitansi').setValue(o.result.nokuitansi);
					Ext.getCmp('tf.nonota').setValue(o.result.nonota);
					Ext.getCmp('bt.simpan').disable();
					myStopFunction();
					if(o.result.nonota != ''){
						Ext.getCmp('btn.cetaknota').enable();
						Ext.getCmp('btn.cetakkuitansi').enable();
					}
				}
			},
			failure: function (form, action) {
				Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
			}
		});
	}
	
	function batalUGD(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/batal_registrasi',
			method: 'POST',
			success: function(registrasiugd_form, o) {
				if (o.result.success == true) {
					Ext.MessageBox.alert('Informasi', 'Registrasi Berhasil Dibatalkan');
					bersihugd();
				} else if (o.result.success == 'false') {
					Ext.MessageBox.alert('Informasi', 'Registrasi Gagal Dibatalkan');
				}
			}
		});
	}
	
	function cetakNotaUG(){
		var nonota		= Ext.getCmp('tf.nonota').getValue();
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printnota/nota_ri/'
                +nonota+'/'+noreg);
	}
	
	function cetakKuiUG(){
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printkasir/ksrkui/'
                +noreg);
	}
	
	function cariRegUGD(){
		var cm_cari_regugd = new Ext.grid.ColumnModel([
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
		var sm_cari_regugd = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_regugd = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_regugd = new Ext.PagingToolbar({
			store: ds_vregistrasi,
			pageSize: 18,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_regugd = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_find_cari_regugd= new Ext.grid.GridPanel({
			id: 'gp.find_regugd',
			ds: ds_vregistrasi,
			cm: cm_cari_regugd,
			sm: sm_cari_regugd,
			view: vw_cari_regugd,
			height: 350,
			width: 800,
			plugins: cari_cari_regugd,
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
			bbar: paging_cari_regugd,
			listeners: {
				rowdblclick: klik_cari_regugd
			}
		});
		var win_find_cari_regugd = new Ext.Window({
			title: 'Cari Registrasi',
			modal: true,
			items: [grid_find_cari_regugd]
		}).show();
		Ext.getCmp('gp.find_regugd').store.reload();
		function klik_cari_regugd(grid, rowIdx){
			var rec_cari_regugd = ds_vregistrasi.getAt(rowIdx);
			var regugd_noreg = rec_cari_regugd.data["noreg"];
			var regugd_norm = rec_cari_regugd.data["norm"];
			var regugd_nmpasien = rec_cari_regugd.data["nmpasien"];
			var regugd_jkelamin = rec_cari_regugd.data["idjnskelamin"];
			var regugd_umurtahun = rec_cari_regugd.data["umurtahun"];
			var regugd_umurbulan = rec_cari_regugd.data["umurbulan"];
			var regugd_umurhari = rec_cari_regugd.data["umurhari"];
			var regugd_penjamin = rec_cari_regugd.data["nmpenjamin"];
			var regugd_idcaradatang = rec_cari_regugd.data["idcaradatang"];
			var regugd_nmbagiankirim = rec_cari_regugd.data["nmbagiankirim"];
			var regugd_dokterkirim = rec_cari_regugd.data["nmdokterkirim"];
			var regugd_ruangan = rec_cari_regugd.data["nmbagian"];
			var regugd_dokter = rec_cari_regugd.data["nmdoktergelar"];
			var regugd_catatan = rec_cari_regugd.data["catatanr"];
			
			Ext.getCmp("tf.noreg").setValue(regugd_noreg);
			Ext.getCmp("tf.norm").setValue(regugd_norm);
			Ext.getCmp("tf.nmpasien").setValue(regugd_nmpasien);
			Ext.getCmp("cb.jkelamin").setValue(regugd_jkelamin);
			Ext.getCmp("tf.umurthn").setValue(regugd_umurtahun);
			Ext.getCmp("tf.umurbln").setValue(regugd_umurbulan);
			Ext.getCmp("tf.umurhari").setValue(regugd_umurhari);
			Ext.getCmp("tf.penjamin").setValue(regugd_penjamin);
			Ext.getCmp("cb.caradatang").setValue(regugd_idcaradatang);
			Ext.getCmp("tf.upengirim").setValue(regugd_nmbagiankirim);
			Ext.getCmp("tf.dkirim").setValue(regugd_dokterkirim);
			Ext.getCmp("tf.upelayanan").setValue(regugd_ruangan);
			Ext.getCmp("tf.dokter").setValue(regugd_dokter);
			Ext.getCmp("ta.catatan").setValue(regugd_catatan);
			
			if(regugd_idcaradatang != 1)
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
						win_find_cari_regugd.close();
		}
	}
	
	function dftUpel(){
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
			store: ds_bagianug,
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
			ds: ds_bagianug,
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
			var rec_cari_bagian = ds_bagianug.getAt(rowIdx);
			var var_cari_nmbagian = rec_cari_bagian.data["nmbagian"];
			var var_cari_idbagian = rec_cari_bagian.data["idbagian"];
			
			Ext.getCmp("tf.upelayanan").setValue(var_cari_nmbagian);
			Ext.getCmp("idbagian").setValue(var_cari_idbagian);
			
			ds_jadwalprakteknow.setBaseParam('idbagian',var_cari_idbagian);
			ds_jadwalprakteknow.reload();
			
						win_find_cari_bagian.close();
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
				header: 'Kode',
				dataIndex: 'kdbagian',
				width: 100
			},{
				header: 'Unit/Ruangan Pelayanan',
				dataIndex: 'nmbagian',
				width: 245
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
			height: 460,
			width: 350,
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
	
	function dftDokter(){
		var cm_cari_dokter = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'iddokter'
			},{
				header: 'Kode',
				dataIndex: 'kddokter',
				width: 50
			},{
				header: 'Nama Dokter',
				dataIndex: 'nmdoktergelar',
				width: 200
			},{
				header: 'Spesialisasi',
				dataIndex: 'nmspesialisasi',
				width: 155
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
			height: 460,
			width: 410,
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
	
	function cAdvance(){
		if(Ext.getCmp('chb.ctglreg').getValue() == true){
			ds_vregistrasi.setBaseParam('ctglreg',Ext.util.Format.date(Ext.getCmp('df.ctglreg').getValue(), 'Y-m-d'));
		} else {
			ds_vregistrasi.setBaseParam('ctglreg','');
		}
	
		ds_vregistrasi.setBaseParam('cnmjnspelayanan',Ext.getCmp('cb.cupelayanan').getValue());
		ds_vregistrasi.setBaseParam('cdokter',Ext.getCmp('cb.cdokter').getValue());
		ds_vregistrasi.setBaseParam('cnorm',Ext.getCmp('tf.crm').getValue());
		ds_vregistrasi.setBaseParam('cnmpasien',Ext.getCmp('tf.cnmpasien').getValue());
		ds_vregistrasi.setBaseParam('cnoreg',Ext.getCmp('tf.cnoreg').getValue());
		ds_vregistrasi.reload();
	}

	function fPel(){
		tpd();
		var cbGridPel = new Ext.grid.CheckboxSelectionModel({
			listeners: {
				rowselect : function( selectionModel, rowIndex, record){
					var skdtarif		= record.get("kdtarif");
					var sidjnstarif		= record.get("idjnstarif");
					var sidtarifpaketdet= record.get("idtarifpaketdet");
					var snmitem			= record.get("nmitem");
					var starifjs		= record.get("tarifjs");
					var starifjm		= record.get("tarifjm");
					var starifjp		= record.get("tarifjp");
					var starifbhp		= record.get("tarifbhp");
					var sqty			= record.get("qty");
					var starif			= parseInt(starifjs) + parseInt(starifjm) + parseInt(starifjp) + parseInt(starifbhp);
					
					var orgaListRecord = new Ext.data.Record.create([
						{
							name: 'kditem',
							name: 'idjnstarif',
							name: 'idtarifpaketdet',
							name: 'nmitem',
							name: 'nmdoktergelar',
							name: 'tarif',
							name: 'qty'
						}
					]);
					
					ds_nota.add([
						new orgaListRecord({
							'kditem': skdtarif,
							'idjnstarif': sidjnstarif,
							'idtarifpaketdet': sidtarifpaketdet,
							'nmitem': snmitem,
							'nmdoktergelar':Ext.getCmp('tf.dokter').getValue(),
							'tarif': starif,
							'qty': sqty
						})
					]);
					tpd();
				},
				rowdeselect : function( selectionModel, rowIndex, record){
					//ds_nota.fields.removeKey(ds_nota.fields.getKey(ds_nota.fields.itemAt(0)));
					//console.log(ds_nota.fields.getKey(ds_nota.fields.itemAt(0)));
					//console.log(ds_nota.fields.itemAt(0));
				},
				beforerowselect : function (sm, rowIndex, keep, rec) {
					if (this.deselectingFlag && this.grid.enableDragDrop){
						this.deselectingFlag = false;
						this.deselectRow(rowIndex);
						return this.deselectingFlag;
					}
					//return keep;
				}
			}
		});
		var cm_fpel = new Ext.grid.ColumnModel([
			cbGridPel,
			{
				header: 'Nama Pelayanan',
				width: 150,
				dataIndex: 'nmitem'
			},{
				header: 'Nama Satuan',
				dataIndex: 'nmsatuan',
				width: 100
			},{
				header: 'qty',
				dataIndex: 'qty',
				width: 100
			},{
				header: 'Tarif JS',
				dataIndex: 'tarifjs',
				width: 100
			},{
				header: 'Tarif JM',
				dataIndex: 'tarifjm',
				width: 100
			},{
				header: 'Tarif JP',
				dataIndex: 'tarifjp',
				width: 100
			},{
				header: 'Tarif BHP',
				dataIndex: 'tarifbhp',
				width: 100
			}
		]);
		var vw_fpel = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_fpel = new Ext.PagingToolbar({
			store: ds_tarifpaketdet,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display',
			listeners: {
				afterrender: function() {
					this.refresh.hide();
				}
			}
		});
		var cari_fpel = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_fpel= new Ext.grid.GridPanel({
			id: 'gp.find_fpel',
			ds: ds_tarifpaketdet,
			cm: cm_fpel,
			sm: cbGridPel,
			view: vw_fpel,
			height: 350,
			width: 800,
			plugins: cari_fpel,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: page_fpel
		});
		var win_fpel = new Ext.Window({
			title: 'Cari Pelayanan',
			modal: true,
			items: [grid_fpel]
		}).show();
		
		function tpd(){
			var arr = [];
			
			for (var zxc = 0; zxc <ds_nota.data.items.length; zxc++) {
				var record = ds_nota.data.items[zxc].data;
				zkditem = record.kditem;
				zidjnstarif = record.idjnstarif;
				zidtarifpaketdet = record.idtarifpaketdet;
				arr[zxc] = zkditem;
			}
			ds_tarifpaketdet.setBaseParam('val',Ext.encode(arr));
			ds_tarifpaketdet.reload();
		}
	}
}