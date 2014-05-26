function RJtransaksi(){
	var myVar=setInterval(function(){myTimer()},1000);
	function myTimer(){
		var d=new Date();
		var formattedValue = Ext.util.Format.date(d, 'H:i:s');
		if(Ext.getCmp("tf.jam"))
				RH.setCompValue("tf.jam",formattedValue);
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
			Ext.getCmp("tf.shift").setValue(obj.nmshift);
		}
	});
	
	var ds_nota = dm_nota();
	ds_nota.setBaseParam('start',0);
	ds_nota.setBaseParam('limit',50);
	ds_nota.setBaseParam('idregdet',null);
	
	var ds_bagian = dm_bagianrjriugd();
	var ds_dokter = dm_dokter();
	var arr = [];
	var zkditem = '';
	
	var cbGrid = new Ext.grid.CheckboxSelectionModel({
		listeners: {
			rowselect : function( selectionModel, rowIndex, record){
				zkditem = record.get("kditem");
				zidjnstarif = record.get("idjnstarif");
				arr[rowIndex] = zkditem + '-' + zidjnstarif;
			},
			rowdeselect : function( selectionModel, rowIndex, record){
				arr.splice(rowIndex, 1);
			},
			beforerowselect : function (sm, rowIndex, keep, rec) {
				if (this.deselectingFlag && this.grid.enableDragDrop){
					this.deselectingFlag = false;
					this.deselectRow(rowIndex);
					return this.deselectingFlag;
				}
				return keep;
			}
		}
	});
	
	var grid_nota = new Ext.grid.GridPanel({
		store: ds_nota,
		frame: true,
		height: 300,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_nota',
		forceFit: true,
		sm: cbGrid,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		columns: [
		//cbGrid,
		{
			header: 'Item Pelayanan',
			dataIndex: 'nmitem',
			width: 150
		},{
			header: 'Dokter',
			dataIndex: 'nmdoktergelar',
			width: 150
		},{
			header: 'Tarif',
			dataIndex: 'tarif',
			width: 150,
			xtype: 'numbercolumn', format:'0,000.00'
		},{
			header: 'Qty',
			dataIndex: 'qty',
			width: 100
		},{
			header: 'Satuan',
			dataIndex: 'nmsatuan',
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
			header: 'Subtotal',
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
			{ xtype:'tbfill' },'TOTAL : ',
			{
				xtype: 'numericfield',
				fieldLabel: 'Total',
				id: 'tf.total',
				readOnly:true,
				style : 'opacity:0.6',
				width: 100,
				thousandSeparator:','
			}
		]
	});
	
	var rjtransaksi_form = new Ext.form.FormPanel({
		id: 'fp.rjtransaksi',
		title: 'Nota Transaksi RJ',
		width: 900,
		Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){bersihRjtransaksi();} },'-',
			{ text: 'Simpan', id:'btn.simpan', iconCls: 'silk-save', disabled:true, handler: function(){simpanRJT();} },'-',
			{ text: 'Batal', id:'btn.batal', iconCls: 'silk-cancel', disabled:true, handler: function(){batalRJT();} },'-',
			{ text: 'Cetak', id:'btn.cetak', iconCls: 'silk-printer', disabled:true, handler: function(){cetakRJT();} },'-',
			{ text: 'Cari Transaksi RJ', id:'btn.ctransaksi', iconCls: 'silk-find', handler: function(){fTrans();} },'-',
			{xtype: 'tbfill' }
		],
        items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.4, autowidth: true,
			layout: 'fit',
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:130,
				boxMaxHeight:140,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'No. RM',
						id: 'tf.norm',
						width: 80,
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
						xtype: 'label', id: 'lb.noreg', text: 'No. Registrasi'
					},{
						xtype: 'textfield',
						id: 'tf.noreg',
						width: 80,
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
									dataRegistrasi();
								}
							}
						}
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.noreg',
						width: 30,
						handler: function() {
							fReg();
						}
					}]
				},{
					xtype: 'textfield', fieldLabel:'Nama Pasien',
					id: 'tf.nmpasien',
					readOnly: true, style : 'opacity:0.6',
					width: 280
				},{
					xtype: 'combo', fieldLabel: 'Unit Pelayanan',
					id: 'cb.upel', width: 280, 
					store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true, mode: 'local',
				},{
					xtype: 'textfield', fieldLabel:'Dokter',
					id: 'tf.dokter',
					readOnly: true, style : 'opacity:0.6',
					width: 280
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.6,
			layout: 'fit',
			defaults: { labelWidth: 150, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:130,
				boxMaxHeight:140,
				items: [{
					xtype: 'textfield', fieldLabel:'No. Nota',
					id: 'tf.nonota',
					readOnly: true, style : 'opacity:0.6',
					width: 100
				},{
					xtype: 'compositefield',
					items: [{	
						xtype: 'datefield', fieldLabel:'Tgl./Jam/Shift', id: 'df.tgl',
						width: 100, value: new Date(),
						format: 'd-m-Y',
					},{
						xtype: 'label', id: 'lb.garing3', text: '/'
					},{ 	
						xtype: 'textfield', id: 'tf.jam', readOnly:true,
						width: 65
					},{
						xtype: 'label', id: 'lb.garing4', text: '/'
					},{
						xtype: 'textfield', id: 'tf.shift', 
						width: 60, disabled: true
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Penjamin',
					id: 'tf.penjamin', anchor: "100%", disabled: true
				},{
					xtype: 'textfield', fieldLabel: 'Catatan',
					id: 'tf.catatan', anchor: "100%"
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 1,
			defaults: {labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', title:'Daftar Nota Transaksi', autowidth: true,
				items: [{
					xtype: 'container',
					layout: 'hbox',
					items: [/* {
						xtype: 'button',
						text: 'Hapus Item',
						id: 'btn.hitem',
						margins: '5',
						disabled:true,
						width: 100,
						handler: function() {
							hapusItem();
						}
					}, */{
						xtype: 'button',
						text: 'Tambah Item',
						id: 'btn.titem',
						margins: '5',
						disabled:true,
						width: 100,
						handler: function() {
							fPel();
						}
					}]
				},{
					layout: 'form',
					border: false,
					items: [grid_nota]
				}]
			}]
		}]
	}); SET_PAGE_CONTENT(rjtransaksi_form);
	
	function bersihRjtransaksi() {
		Ext.getCmp('tf.noreg').setValue();
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('cb.upel').setValue();
		Ext.getCmp('tf.dokter').setValue();
		Ext.getCmp('tf.nonota').setValue();
		Ext.getCmp('df.tgl').setValue(new Date());
		Ext.getCmp('tf.penjamin').setValue();
		Ext.getCmp('tf.catatan').setValue();
		Ext.getCmp('tf.total').setValue();
		ds_nota.setBaseParam('idregdet',null);
		fTotal();
	}
	
	function fTotal(){
		ds_nota.reload({
			scope   : this,
			callback: function(records, operation, success) {
				sum = 0; 
				ds_nota.each(function (rec) { sum += parseFloat(rec.get('tarif')); });
				Ext.getCmp("tf.total").setValue(sum);
			}
		});
	}
	
	function simpanRJT(){
		var arrnota = [];
		
		for (var zx = 0; zx <ds_nota.data.items.length; zx++) {
			var record = ds_nota.data.items[zx].data;
			zkditem = record.kditem;
			zidjnstarif = record.idjnstarif;
			arrnota[zx] = zkditem;
		}
		Ext.Ajax.request({
			url: BASE_URL + 'nota_controller/insorupd_nota',
			params: {
				noreg		: Ext.getCmp('tf.noreg').getValue(),
				nonota		: Ext.getCmp('tf.nonota').getValue(),
				nmshift 	: Ext.getCmp('tf.shift').getValue(),
				catatan 	: Ext.getCmp('tf.catatan').getValue(),
				jpel 		: 'Rawat Jalan',
				arrnota	:  Ext.encode(arrnota)
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
				obj = Ext.util.JSON.decode(response.responseText);
				Ext.getCmp("tf.nonota").setValue(obj.nonota);
				Ext.getCmp("btn.cetak").enable();
				myStopFunction();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function hapusItem(){
		Ext.Ajax.request({
			url: BASE_URL + 'nota_controller/delete_bnotadet',
			params: {
				noreg		: Ext.getCmp('tf.noreg').getValue(),
				nonota		: Ext.getCmp('tf.nonota').getValue(),
				arr			:  Ext.encode(arr)
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi', 'Hapus Data Berhasil');
				bersihRjtransaksi();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function batalRJT(){
		Ext.Ajax.request({
			url: BASE_URL + 'nota_controller/batal_nota',
			params: {
				nonota		: Ext.getCmp('tf.nonota').getValue(),
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi', 'Batal Nota Berhasil');
				bersihRjtransaksi();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function cetakRJT(){
		var nonota		= Ext.getCmp('tf.nonota').getValue();
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printnota/nota_ri/'
                +nonota+'/'+noreg);
	}
	
	function dataRegistrasi(){
		Ext.Ajax.request({
			url: BASE_URL + 'vregistrasi_controller/getDataRegistrasi',
			params: {
				cek			: 'RJ',
				noreg		: Ext.getCmp('tf.noreg').getValue()
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				var freg_noreg = obj.noreg;
				var freg_norm = obj.norm;
				var freg_nmpasien = obj.nmpasien;
				var freg_penjamin = obj.nmpenjamin;
				var freg_idbagian = obj.idbagian;
				var freg_nmdokter = obj.nmdoktergelar;
				var freg_nonota = obj.nonota;
				var freg_nokuitansi = obj.nokuitansi;
				
				Ext.getCmp("tf.noreg").setValue(freg_noreg);
				Ext.getCmp("tf.norm").setValue(freg_norm);
				Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
				Ext.getCmp("tf.penjamin").setValue(freg_penjamin);
				Ext.getCmp("cb.upel").setValue(freg_idbagian);
				Ext.getCmp("tf.dokter").setValue(freg_nmdokter);
				Ext.getCmp("tf.nonota").setValue(freg_nonota);
				//Ext.getCmp("btn.hitem").enable();
				Ext.getCmp("btn.titem").enable();
				Ext.getCmp("btn.simpan").enable();
				Ext.getCmp("btn.cetak").enable();
				if(freg_nokuitansi == null) Ext.getCmp("btn.batal").enable();
				else Ext.getCmp("btn.batal").disable();
				ds_nota.setBaseParam('idregdet',obj.idregdet);
				fTotal();
				ds_vtarifall.reload();
			},
			failure: function() {
				Ext.Msg.alert("Informasi", "Data Tidak Ada atau Berbeda Bagian");
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
					
				Ext.getCmp('tf.norm').focus()
				Ext.getCmp("tf.norm").setValue(var_cari_pasienno);
				Ext.getCmp("tf.nmpasien").setValue(var_cari_pasiennm);
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function fReg(){
		var ds_vregistrasi = dm_vregistrasi();
		ds_vregistrasi.setBaseParam('cek','RJ');
		var cm_freg = new Ext.grid.ColumnModel([
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
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
				width: 80
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
				width: 110
			},{
				header: 'Dokter',
				dataIndex: 'nmdoktergelar',
				width: 180
			},{
				header: 'Posisi Pasien',
				dataIndex: 'nmstposisipasien',
				width: 110
			},{
				header: 'Cara Datang',
				dataIndex: 'nmcaradatang',
				width: 130
			}
		]);
		var sm_freg = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_freg = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_freg = new Ext.PagingToolbar({
			pageSize:50,
			store: ds_vregistrasi,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_freg= new Ext.grid.GridPanel({
			id: 'gp.find_freg',
			ds: ds_vregistrasi,
			cm: cm_freg,
			sm: sm_freg,
			view: vw_freg,
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
			bbar: page_freg,
			listeners: {
				rowdblclick: klik_freg
			}
		});
		var win_freg = new Ext.Window({
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
								store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
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
								width: 100, value: new Date(),
								format: 'd-m-Y'
							}]
						}]
					}]
				},grid_freg]
		}).show();
		ds_vregistrasi.setBaseParam('ctglreg',Ext.util.Format.date(new Date(), 'Y-m-d'));
		ds_vregistrasi.reload();
		function klik_freg(grid, rowIdx){
			var rec_freg = ds_vregistrasi.getAt(rowIdx);
			var freg_noreg = rec_freg.data["noreg"];
			var freg_norm = rec_freg.data["norm"];
			var freg_nmpasien = rec_freg.data["nmpasien"];
			var freg_penjamin = rec_freg.data["nmpenjamin"];
			var freg_idbagian = rec_freg.data["idbagian"];
			var freg_nmdokter = rec_freg.data["nmdoktergelar"];
			var freg_nonota = rec_freg.data["nonota"];
			var freg_nokuitansi = rec_freg.data["nokuitansi"];
			
			Ext.getCmp("tf.noreg").setValue(freg_noreg);
			Ext.getCmp("tf.norm").setValue(freg_norm);
			Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
			Ext.getCmp("tf.penjamin").setValue(freg_penjamin);
			Ext.getCmp("cb.upel").setValue(freg_idbagian);
			Ext.getCmp("tf.dokter").setValue(freg_nmdokter);
			Ext.getCmp("tf.nonota").setValue(freg_nonota);
			//Ext.getCmp("btn.hitem").enable();
			Ext.getCmp("btn.titem").enable();
			Ext.getCmp("btn.simpan").enable();
			Ext.getCmp("btn.cetak").enable();
			if(freg_nokuitansi == null) Ext.getCmp("btn.batal").enable();
			else Ext.getCmp("btn.batal").disable();
			ds_nota.setBaseParam('idregdet',rec_freg.data["idregdet"]);
			fTotal();
						win_freg.close();
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
	}
	
	function fPel(){
		var ds_vtarifall = dm_vtarifall();
		ds_vtarifall.setBaseParam('start',0);
		ds_vtarifall.setBaseParam('limit',50);
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
					//tpd();
					ds_vtarifall.removeAt(rowIndex);
					var ttl = Ext.getCmp('tf.total').getValue();
					var jml = parseFloat(ttl) + parseFloat(starif);
					Ext.getCmp('tf.total').setValue(jml);
					/* Ext.Ajax.request({
						url: BASE_URL + 'nota_controller/insorupd_nota',
						params: {
							noreg			: Ext.getCmp('tf.noreg').getValue(),
							kditem			: record.get("kdtarif"),
							idjnstarif		: record.get("idjnstarif"),
							idtarifpaketdet : record.get("idtarifpaketdet"),
							nonota			: Ext.getCmp('tf.nonota').getValue(),
							nmshift 		: Ext.getCmp('tf.shift').getValue(),
							catatan 		: Ext.getCmp('tf.catatan').getValue(),
							jpel 			: 'Rawat Jalan'
						},
						success: function(response){
							obj = Ext.util.JSON.decode(response.responseText);
							fTotal();
							Ext.getCmp("tf.nonota").setValue(obj.nonota);
							ds_tarifpaketdet.removeAt(rowIndex);
						},
						failure: function() {
							//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
						}
					}); */
				},
				rowdeselect : function( selectionModel, rowIndex, record){
					/* Ext.Ajax.request({
						url: BASE_URL + 'nota_controller/delete_notadet',
						params: {
							noreg		: Ext.getCmp('tf.noreg').getValue(),
							kditem : record.get("kdtarif"),
							idjnstarif : record.get("idjnstarif"),
							nonota : Ext.getCmp('tf.nonota').getValue()
						},
						success: function(response){
							obj = Ext.util.JSON.decode(response.responseText);
							fTotal();
							Ext.getCmp("tf.nonota").setValue(obj.nonota);
						},
						failure: function() {
							//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
						}
					}); */
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
			pageSize:50,
			store: ds_vtarifall,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
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

	function fTrans(){
		var ds_notax = dm_notax();
		ds_notax.setBaseParam('jpel',1);
		ds_notax.setBaseParam('batal',2);
		var cm_ftrans = new Ext.grid.ColumnModel([
			{
				header: 'No. Nota',
				dataIndex: 'nonota',
				width: 100
			},{
				header: 'Tgl. Nota',
				dataIndex: 'tglnota',
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
				width: 80
			},{
				header: 'No. Registrasi',
				dataIndex: 'noreg',
				width: 100
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 200
			}
		]);
		var sm_ftrans = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_ftrans = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_ftrans = new Ext.PagingToolbar({
			pageSize:50,
			store: ds_notax,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_ftrans= new Ext.grid.GridPanel({
			id: 'gp.find_ftrans',
			ds: ds_notax,
			cm: cm_ftrans,
			sm: sm_ftrans,
			view: vw_ftrans,
			height: 300,
			width: 510,
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
			bbar: page_ftrans,
			listeners: {
				rowdblclick: klik_ftrans
			}
		});
		var win_ftrans = new Ext.Window({
			title: 'Cari Nota',
			modal: true,
			items: [/* {
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
								store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
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
								width: 100, value: new Date(),
								format: 'd-m-Y'
							}]
						}]
					}]
				}, */grid_ftrans]
		}).show();
		
		function klik_ftrans(grid, rowIdx){
			var rec_ftrans = ds_notax.getAt(rowIdx);
			var ftrans_noreg = rec_ftrans.data["noreg"];
			var ftrans_norm = rec_ftrans.data["norm"];
			var ftrans_nmpasien = rec_ftrans.data["nmpasien"];
			var ftrans_penjamin = rec_ftrans.data["nmpenjamin"];
			var ftrans_idbagian = rec_ftrans.data["idbagian"];
			var ftrans_nmdokter = rec_ftrans.data["nmdoktergelar"];
			var ftrans_nonota = rec_ftrans.data["nonota"];
			var ftrans_nokuitansi = rec_ftrans.data["nokuitansi"];
			
			Ext.getCmp("tf.noreg").setValue(ftrans_noreg);
			Ext.getCmp("tf.norm").setValue(ftrans_norm);
			Ext.getCmp("tf.nmpasien").setValue(ftrans_nmpasien);
			Ext.getCmp("tf.penjamin").setValue(ftrans_penjamin);
			Ext.getCmp("cb.upel").setValue(ftrans_idbagian);
			Ext.getCmp("tf.dokter").setValue(ftrans_nmdokter);
			Ext.getCmp("tf.nonota").setValue(ftrans_nonota);
			//Ext.getCmp("btn.hitem").enable();
			Ext.getCmp("btn.titem").enable();
			Ext.getCmp("btn.simpan").enable();
			Ext.getCmp("btn.cetak").enable();
			if(ftrans_nokuitansi == null) Ext.getCmp("btn.batal").enable();
			else Ext.getCmp("btn.batal").disable();
			ds_nota.setBaseParam('idregdet',rec_ftrans.data["idregdet"]);
			fTotal();
						win_ftrans.close();
		}
	
		/* function cAdvance(){
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
		} */
	}

	function fTrans(){
		var ds_notax = dm_notax();
		ds_notax.setBaseParam('jpel',1);
		ds_notax.setBaseParam('batal',2);
		var cm_ftrans = new Ext.grid.ColumnModel([
			{
				header: 'No. Nota',
				dataIndex: 'nonota',
				width: 100
			},{
				header: 'Tgl. Nota',
				dataIndex: 'tglnota',
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
				width: 80
			},{
				header: 'No. Registrasi',
				dataIndex: 'noreg',
				width: 100
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 200
			}
		]);
		var sm_ftrans = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_ftrans = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_ftrans = new Ext.PagingToolbar({
			pageSize:50,
			store: ds_notax,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_ftrans= new Ext.grid.GridPanel({
			id: 'gp.find_ftrans',
			ds: ds_notax,
			cm: cm_ftrans,
			sm: sm_ftrans,
			view: vw_ftrans,
			height: 300,
			width: 510,
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
			bbar: page_ftrans,
			listeners: {
				rowdblclick: klik_ftrans
			}
		});
		var win_ftrans = new Ext.Window({
			title: 'Cari Nota',
			modal: true,
			items: [/* {
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
								store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
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
								width: 100, value: new Date(),
								format: 'd-m-Y'
							}]
						}]
					}]
				}, */grid_ftrans]
		}).show();
		
		function klik_ftrans(grid, rowIdx){
			var rec_ftrans = ds_notax.getAt(rowIdx);
			var ftrans_noreg = rec_ftrans.data["noreg"];
			var ftrans_norm = rec_ftrans.data["norm"];
			var ftrans_nmpasien = rec_ftrans.data["nmpasien"];
			var ftrans_penjamin = rec_ftrans.data["nmpenjamin"];
			var ftrans_idbagian = rec_ftrans.data["idbagian"];
			var ftrans_nmdokter = rec_ftrans.data["nmdokter"];
			var ftrans_nonota = rec_ftrans.data["nonota"];
			var ftrans_nokuitansi = rec_ftrans.data["nokuitansi"];
			
			Ext.getCmp("tf.noreg").setValue(ftrans_noreg);
			Ext.getCmp("tf.norm").setValue(ftrans_norm);
			Ext.getCmp("tf.nmpasien").setValue(ftrans_nmpasien);
			Ext.getCmp("tf.penjamin").setValue(ftrans_penjamin);
			Ext.getCmp("cb.upel").setValue(ftrans_idbagian);
			Ext.getCmp("tf.dokter").setValue(ftrans_nmdokter);
			Ext.getCmp("tf.nonota").setValue(ftrans_nonota);
			//Ext.getCmp("btn.hitem").enable();
			Ext.getCmp("btn.titem").enable();
			Ext.getCmp("btn.simpan").enable();
			Ext.getCmp("btn.cetak").enable();
			if(ftrans_nokuitansi == null) Ext.getCmp("btn.batal").enable();
			else Ext.getCmp("btn.batal").disable();
			ds_nota.setBaseParam('idregdet',rec_ftrans.data["idregdet"]);
			fTotal();
						win_ftrans.close();
		}
	
		/* function cAdvance(){
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
		} */
	}
}