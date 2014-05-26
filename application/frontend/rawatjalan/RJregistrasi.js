function RJregistrasi(namaForm){
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
			Ext.getCmp("idshift").setValue(obj.idshift);
			Ext.getCmp("tf.waktushift").setValue(obj.nmshift);
		}
	});
	
	Ext.Ajax.request({
		url:BASE_URL + 'vregistrasi_controller/cekRegistrasi',
		method:'POST',
		params: {
			norm		: Ext.getCmp('tf.norm').getValue(),
			jpel		: 'Rawat Jalan'
		},
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			if(obj.validasi > 0){
				var arr = [];
				var ind = 0;
				Ext.MessageBox.alert('Informasi', 'Pasien tersebut telah melakukan registrasi RJ');
				obj.arr.forEach(function(n) {
					arr[ind] = n;
					ind += 1;
				});
				ds_bagianrj.setBaseParam('val',Ext.encode(arr));
				ds_bagianrj.reload();
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
	var ds_bagianrjriugd = dm_bagianrjriugd();
	var ds_bagianrj = dm_bagian();
	ds_bagianrj.setBaseParam('jpel',1);
	var ds_dokter = dm_dokter();
	var ds_jpelayanan = dm_jpelayanan();
	var ds_dokterrj = dm_dokterri();
	var ds_carabayar = dm_carabayar();
	var ds_jadwalprakteknow = dm_jadwalprakteknow();
	ds_jadwalprakteknow.setBaseParam('idbagian',null);
	ds_vregistrasi.setBaseParam('cek','RJ');
	
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
				getNoAntrian();
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
					cetakNotaRJ();
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
					cetakKuiRJ();
				}},'-',
			{
				xtype: 'button',
				text: 'Cetak Nota & Kuitansi',
				id: 'btn.cetaknk',
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
					cetakNKRJ();
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
			width: 150,
			xtype: 'numbercolumn', format:'0,000.00'
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
			width: 100,
			xtype: 'numbercolumn', format:'0,000.00'
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
					totalnota();
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
						id: 'tf.total',
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
	
	var registrasirj_form = new Ext.form.FormPanel({ 
		id: 'fp.registrasirj',
		title: 'Registasi RJ',
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
			{ text: 'Kembali', iconCls: 'silk-house', handler: function(){page_controller('0401');} },'-',
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpanRJ("fp.registrasirj");} },'-',
			{ text: 'Batal Registrasi RJ', id:'bt.batal', iconCls: 'silk-cancel', handler: function(){batalRJ("fp.registrasirj");} },'-',
			{ text: 'Cari Registrasi RJ', iconCls: 'silk-find', handler: function(){cariRegRJ();} },'-',
			{xtype: 'tbfill' }
		],
		defaults: { labelWidth: 150, labelAlign: 'right'},
        items: [{
			xtype: 'fieldset', title: '',
			id:'fs.registrasirj', layout: 'column', autowidth: true,
			defaults: { labelWidth: 150, labelAlign: 'right' }, 
			items: [{
				//COLUMN 1
				layout: 'form', columnWidth: 0.5,
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
						value:'Pasien Umum', readOnly: true,
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
				layout: 'form', columnWidth: 0.5,
				items: [{
					xtype: 'container', fieldLabel: 'No. Registrasi',
					layout: 'hbox',
					items: [{
						xtype :'textfield',
						id :'tf.noreg',width:120, readOnly: true,
						style : 'opacity:0.6'
					}]
				},{
					xtype: 'container', fieldLabel: 'Tgl./Jam/Shift',
					layout: 'hbox',
					//defaults: { hideLabel: 'true' },
					items: [{	
						xtype: 'datefield', id: 'df.tglshift',
						width: 100, value: new Date(),
						format: 'd-m-Y'
					},{
						xtype: 'label', id: 'lb.garing1', text: '/', margins: '0 10 0 10',
					},{ 	
						xtype: 'textfield', id: 'tf.jamshift', readOnly:true,
						width: 65
					},{
						xtype: 'label', id: 'lb.garing2', text: '/', margins: '0 10 0 10',
					},{
						xtype: 'textfield', id: 'tf.waktushift', 
						width: 60, readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'textfield', id: 'idshift',
						hidden:true
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
					fieldLabel: 'Dokter Praktek', allowBlank:false,
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
				}/* {
					xtype: 'combo', fieldLabel : 'Jenis Pemeriksaan',
					id: 'cb.jpelayanan', width: 300, 
					store: ds_jpelayanan, valueField: 'idjnspelayanan', displayField: 'nmjnspelayanan',
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...', value: 'Rawat Jalan'
				}, {
					xtype: 'numericfield', fieldLabel: 'No. Karcis',
					id  : 'tf.nokarcis', width : 300
				},{
					xtype: 'numericfield', fieldLabel: 'Tarif',
					id  : 'tf.tarif', width : 150
				}*/]
			}]
		},{
			xtype: 'fieldset', layout: 'form',
			title: 'Biaya Pemeriksaan Standard RJ',
			items: [grid_notarj]
		}]
	}); SET_PAGE_CONTENT(registrasirj_form);
	
	function hitungKembalian() {
		var jml = Ext.getCmp('tf.total').getValue();
		if(jml != ''){
			var utyd = Ext.getCmp('tf.utyd').getValue();
			var kmblian = utyd - jml;
			Ext.getCmp('tf.kembalian').setValue(kmblian);
			if(kmblian >= 0)Ext.getCmp('bt.simpan').enable();
		}
	}
	
	function bersihrj() {
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

	function simpanRJ(namaForm) {
		var arrnota = [];
		
		for (var zx = 0; zx <ds_nota.data.items.length; zx++) {
			var record = ds_nota.data.items[zx].data;
			zkditem = record.kditem;
			zidjnstarif = record.idjnstarif;
			zidtarifpaketdet = record.idtarifpaketdet;
			arrnota[zx] = zkditem;
		}
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/insorupd_registrasi',
			method: 'POST',
			params: {
				ureg 	: 'RJ',
				arrnota	:  Ext.encode(arrnota)
			},
			success: function(registrasirj_form, o) {
				if(o.result.success == true) {
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
						Ext.getCmp('btn.cetaknk').enable();
					}
				}
			},
			failure: function (form, action) {
				Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
			}
		});
	}
	
	function batalRJ(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'registrasi_controller/batal_registrasi',
			method: 'POST',
			success: function(registrasirj_form, o) {
				if (o.result.success == true) {
					Ext.MessageBox.alert('Informasi', 'Registrasi Berhasil Dibatalkan');
					bersihrj();
				} else if (o.result.success == 'false') {
					Ext.MessageBox.alert('Informasi', 'Registrasi Gagal Dibatalkan');
				}
			}
		});
	}
	
	function getNoAntrian(){
		Ext.Ajax.request({
			url:BASE_URL + 'reservasi_controller/getNoantrian',
			method:'POST',
			params: {
				nmbagian		: Ext.getCmp('tf.upelayanan').getValue(),
				nmdokter		: Ext.getCmp('tf.dokter').getValue()
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				Ext.getCmp("tf.jmlpantri").setValue(obj.antrian);
			}
		});
	}
	
	function cetakNotaRJ(){
		var nonota		= Ext.getCmp('tf.nonota').getValue();
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printnota/nota_ri/'
                +nonota+'/'+noreg);
	}
	
	function cetakKuiRJ(){
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printkasir/ksrkui/'
                +noreg);
	}
	
	function cetakNKRJ(){
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printnotakasir/notakui/'
                +noreg);
	}
	
	function cariRegRJ(){
		var cm_cari_regrj = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'noreg'
			},{
				header: 'No. Registrasi',
				dataIndex: 'noreg',
				width: 80
			},{
				header: 'Tgl. Registrasi',
				dataIndex: 'tglreg',
				renderer: Ext.util.Format.dateRenderer('d-M-Y'),
				width: 100
			},{
				header: 'No. RM',
				dataIndex: 'norm',
				width: 80
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'Unit Pelayanan',
				dataIndex: 'nmbagian',
				width: 130
			},{
				header: 'Dokter',
				dataIndex: 'nmdoktergelar',
				width: 180
			},{
				header: 'No. Antrian',
				dataIndex: 'noantrian',
				width: 70
			},{
				header: 'Cara Datang',
				dataIndex: 'nmcaradatang',
				width: 130
			}
		]);
		var sm_cari_regrj = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_regrj = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_regrj = new Ext.PagingToolbar({
			store: ds_vregistrasi,
			pageSize:18,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_find_cari_regrj= new Ext.grid.GridPanel({
			id: 'gp.find_regrj',
			ds: ds_vregistrasi,
			cm: cm_cari_regrj,
			sm: sm_cari_regrj,
			view: vw_cari_regrj,
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
			tbar: [],
			bbar: paging_cari_regrj,
			listeners: {
				rowdblclick: klik_cari_regrj
			}
		});
		var win_find_cari_regrj = new Ext.Window({
			title: 'Cari Registrasi',
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
							id: 'comp_cnmibu',
							items:[{
								xtype: 'checkbox',
								id:'chb.cupel',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cb.cupelayanan').enable();
										} else if(val == false){
											Ext.getCmp('cb.cupelayanan').disable();
											Ext.getCmp('cb.cupelayanan').setValue('');
										}
									}
								}
							},{
								xtype: 'combo',
								id: 'cb.cupelayanan', width: 230, 
								store: ds_bagianrj, valueField: 'idbagian', displayField: 'nmbagian',
								editable: false, triggerAction: 'all',
								forceSelection: true, submitValue: true, mode: 'local',
								emptyText:'Unit Pelayanan', disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_cdokter',
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
							id: 'comp_cnoreg',
							items:[{
								xtype: 'checkbox',
								id:'chb.cnoreg',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cnoreg').enable();
										} else if(val == false){
											Ext.getCmp('tf.cnoreg').disable();
											Ext.getCmp('tf.cnoreg').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cnoreg',
								emptyText:'No. Registrasi',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctglreg',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctglreg',
								checked   : true,
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('df.ctglreg').enable();
										} else if(val == false){
											Ext.getCmp('df.ctglreg').disable();
											Ext.getCmp('df.ctglreg').setValue(new Date());
										}
									}
								}
							},{
								xtype: 'datefield',
								id: 'df.ctglreg',
								width: 100, value: new Date()
							}]
						}]
					}]
				},
				grid_find_cari_regrj
			]
		}).show();
		ds_vregistrasi.setBaseParam('ctglreg',Ext.util.Format.date(new Date(), 'Y-m-d'));
		ds_vregistrasi.reload();
		function klik_cari_regrj(grid, rowIdx){
			var rec_cari_regrj = ds_vregistrasi.getAt(rowIdx);
			var regrj_noreg = rec_cari_regrj.data["noreg"];
			var regrj_norm = rec_cari_regrj.data["norm"];
			var regrj_nmpasien = rec_cari_regrj.data["nmpasien"];
			var regrj_jkelamin = rec_cari_regrj.data["idjnskelamin"];
			var regrj_umurtahun = rec_cari_regrj.data["umurtahun"];
			var regrj_umurbulan = rec_cari_regrj.data["umurbulan"];
			var regrj_umurhari = rec_cari_regrj.data["umurhari"];
			var regrj_penjamin = rec_cari_regrj.data["nmpenjamin"];
			var regrj_idcaradatang = rec_cari_regrj.data["idcaradatang"];
			var regrj_nmbagiankirim = rec_cari_regrj.data["nmbagiankirim"];
			var regrj_idjnspelayanan = rec_cari_regrj.data["idjnspelayanan"];
			var regrj_ruangan = rec_cari_regrj.data["nmbagian"];
			var regrj_dokter = rec_cari_regrj.data["nmdokter"];
			var regrj_catatan = rec_cari_regrj.data["catatanr"];
			var regrj_noantrian = rec_cari_regrj.data["noantrian"];
			
			if(rec_cari_regrj.data["nmdokterkirimdlm"]){
				var regrj_dokterkirim = rec_cari_regrj.data["nmdokterkirimdlm"];
			} else {
				var regrj_dokterkirim = rec_cari_regrj.data["nmdokterkirim"];
			}
			
			Ext.getCmp("tf.noreg").setValue(regrj_noreg);
			Ext.getCmp("tf.norm").setValue(regrj_norm);
			Ext.getCmp("tf.nmpasien").setValue(regrj_nmpasien);
			Ext.getCmp("cb.jkelamin").setValue(regrj_jkelamin);
			Ext.getCmp("tf.umurthn").setValue(regrj_umurtahun);
			Ext.getCmp("tf.umurbln").setValue(regrj_umurbulan);
			Ext.getCmp("tf.umurhari").setValue(regrj_umurhari);
			Ext.getCmp("tf.penjamin").setValue(regrj_penjamin);
			Ext.getCmp("cb.caradatang").setValue(regrj_idcaradatang);
			//Ext.getCmp("cb.jpelayanan").setValue(regrj_idjnspelayanan);
			Ext.getCmp("tf.upengirim").setValue(regrj_nmbagiankirim);
			Ext.getCmp("tf.dkirim").setValue(regrj_dokterkirim);
			Ext.getCmp("tf.upelayanan").setValue(regrj_ruangan);
			Ext.getCmp("tf.dokter").setValue(regrj_dokter);
			Ext.getCmp("ta.catatan").setValue(regrj_catatan);
			Ext.getCmp("tf.noantrian").setValue(regrj_noantrian);
			
			if(regrj_idcaradatang != 1)
			{
				Ext.getCmp('tf.upengirim').enable();
				Ext.getCmp('tf.upengirim').setReadOnly(false);
				Ext.getCmp('tf.upengirim').el.setStyle('opacity', 1);
				Ext.getCmp('btn.upengirim').enable();
				Ext.getCmp('tf.dkirim').setReadOnly(false);
				Ext.getCmp('tf.dkirim').el.setStyle('opacity', 1);
				Ext.getCmp('btn.dkirim').enable();
			} else {
				Ext.getCmp('tf.upengirim').setReadOnly(true);
				Ext.getCmp('tf.upengirim').el.setStyle('opacity', 0.6);
				Ext.getCmp('btn.upengirim').disable();
				Ext.getCmp('tf.dkirim').setReadOnly(true);
				Ext.getCmp('tf.dkirim').el.setStyle('opacity', 0.6);
				Ext.getCmp('btn.dkirim').disable();
			}
						win_find_cari_regrj.close();
		}
	}
	
	function dftUpel(){
		var cm_cari_bagian = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idbagian'
			},{
				header: 'Kode Bagian',
				dataIndex: 'kdbagian',
				width: 100
			},{
				header: 'Unit Pelayanan',
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
			store: ds_bagianrj,
			//displayInfo: true,
			//displayMsg: 'Data Dari {0} - {1} of {2}',
			//emptyMsg: 'No data to display'
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
			ds: ds_bagianrj,
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
			var rec_cari_bagian = ds_bagianrj.getAt(rowIdx);
			var var_cari_nmbagian = rec_cari_bagian.data["nmbagian"];
			var var_cari_idbagian = rec_cari_bagian.data["idbagian"];
			
			Ext.getCmp("tf.upelayanan").setValue(var_cari_nmbagian);
			Ext.getCmp("idbagian").setValue(var_cari_idbagian);
			
			ds_jadwalprakteknow.setBaseParam('idbagian',var_cari_idbagian);
			ds_jadwalprakteknow.setBaseParam('shift',Ext.getCmp("idshift").getValue());
			ds_jadwalprakteknow.reload();
			getNoAntrian();
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
				width: 200
			},{
				header: 'Alamat',
				dataIndex: 'alamat',
				width: 300
			},{
				header: 'No. Telp',
				dataIndex: 'notelp',
				width: 150
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
			displayMsg: 'Data Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_cari_penjamin = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_find_cari_penjamin= new Ext.grid.GridPanel({
			ds: ds_penjamin,
			cm: cm_cari_penjamin,
			sm: sm_cari_penjamin,
			view: vw_cari_penjamin,
			height: 460,
			width: 680,
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
			store: ds_bagianrjriugd,
			//displayInfo: true,
			//displayMsg: 'Data Dari {0} - {1} of {2}',
			//emptyMsg: 'No data to display'
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
			ds: ds_bagianrjriugd,
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
			var rec_cari_bagian = ds_bagianrjriugd.getAt(rowIdx);
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
			mode: 'remote',
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
			var var_cari_nmdoktergelar = rec_cari_dokter.data["nmdoktergelar"];
			
			Ext.getCmp("tf.dkirim").setValue(var_cari_nmdoktergelar);
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
		var ds_vtarifall = dm_vtarifall();
		tpd();
		var cbGridPel = new Ext.grid.CheckboxSelectionModel({
			listeners: {
				rowselect : function( selectionModel, rowIndex, record){
					var skditem		= record.get("kditem");
					var snmitem			= record.get("nmitem");
					var starifjs		= record.get("tarifjs");
					var starifjm		= record.get("tarifjm");
					var starifjp		= record.get("tarifjp");
					var starifbhp		= record.get("tarifbhp");
					var starif			= record.get("ttltarif");
					
					var orgaListRecord = new Ext.data.Record.create([
						{
							name: 'kditem',
							name: 'nmitem',
							name: 'tarif'
						}
					]);
					
					ds_nota.add([
						new orgaListRecord({
							'kditem': skditem,
							'nmitem': snmitem,
							'nmdoktergelar':Ext.getCmp('tf.dokter').getValue(),
							'tarif': starif
						})
					]);
					ds_vtarifall.removeAt(rowIndex);
					var ttl = Ext.getCmp('tf.total').getValue();
					var jml = parseFloat(ttl) + parseFloat(starif);
					Ext.getCmp('tf.total').setValue(jml);
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
				dataIndex: 'satuankcl',
				width: 100
			},{
				header: 'Tarif',
				dataIndex: 'ttltarif',
				xtype: 'numbercolumn', format:'0,000.00',
				width: 100
			}
		]);
		var vw_fpel = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_fpel = new Ext.PagingToolbar({
			pageSize : 50,
			store: ds_vtarifall,
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
			ds: ds_vtarifall,
			cm: cm_fpel,
			sm: cbGridPel,
			view: vw_fpel,
			height: 350,
			width: 480,
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
			var zzz = 0;
			for (var zxc = 0; zxc <ds_nota.data.items.length; zxc++) {
				var record = ds_nota.data.items[zxc].data;
				zkditem = record.kditem;
				zzz += parseFloat(record.tarif);
				arr[zxc] = zkditem;
			}
			Ext.getCmp('tf.total').setValue(zzz);
			ds_vtarifall.setBaseParam('val',Ext.encode(arr));
			ds_vtarifall.reload();
		}
	}
	
	function totalnota(){
		var zzz = 0;
		for (var zxc = 0; zxc <ds_nota.data.items.length; zxc++) {
			var record = ds_nota.data.items[zxc].data;
			zzz += parseFloat(record.tarif);
		}
		Ext.getCmp('tf.total').setValue(zzz);
	}
}