function Ksrkuitansi(){
	var myVar=setInterval(function(){myTimer()},1000);
	function myTimer(){
		var d=new Date();
		var formattedValue = Ext.util.Format.date(d, 'H:i:s');
		if(Ext.getCmp("tf.time"))
				RH.setCompValue("tf.time",formattedValue);
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

Ext.form.Field.prototype.msgTarget = 'side';
	var jmltemp = 0;
	var ds_nota = dm_nota();
	ds_nota.setBaseParam('grupby', 1);
	var ds_registrasi = dm_registrasi();
	var ds_jsbtnm = dm_jsbtnm();
	var ds_bank = dm_bank();
	ds_bank.setBaseParam('blank', 0);
	
	var cbGrid = new Ext.grid.CheckboxSelectionModel({
		listeners: {
			rowselect : function( selectionModel, rowIndex, record){
				Ext.Ajax.request({
					url: BASE_URL + 'nota_controller/get_kuinota',
					params: {
						noreg : Ext.getCmp('tf.noreg').getValue(),
						nonota : record.get("nonota")
					},
					success: function(response){
						obj = Ext.util.JSON.decode(response.responseText);
						//jmltemp += parseFloat(obj.tarif);
						Ext.getCmp('tf.jumlah').setValue(obj.ctotal);
						Ext.getCmp('tf.total').setValue(obj.ctotal);
						Ext.getCmp('tf.pembulatan').setValue(obj.ctotal);
						Ext.getCmp('tf.ttlbiaya').setValue(obj.ctotal);
					},
					failure: function() {
						//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
					}
				});
			},
			rowdeselect : function( selectionModel, rowIndex, record){
				Ext.Ajax.request({
					url: BASE_URL + 'nota_controller/get_kuinota',
					params: {
						noreg : Ext.getCmp('tf.noreg').getValue(),
						kditem : record.get("kditem"),
						idjnstarif : record.get("idjnstarif")
					},
					success: function(response){
						obj = Ext.util.JSON.decode(response.responseText);
						jmltemp -= parseFloat(obj.tarif);
						Ext.getCmp('tf.jumlah').setValue(jmltemp);
						Ext.getCmp('tf.total').setValue(jmltemp);
						Ext.getCmp('tf.pembulatan').setValue(jmltemp);
						Ext.getCmp('tf.ttlbiaya').setValue(jmltemp);
					},
					failure: function() {
						//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
					}
				});
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
		id: 'grid_nota',
		sm: cbGrid,
		store: ds_nota,		
		autoScroll: true,
		//autoHeight: true,
		columnLines: true,
		height: 200,
		//plugins: cari_pelayanan,
		tbar: [],
		//sm: sm_nya,
		frame: true,
		columns: [new Ext.grid.RowNumberer(),
		cbGrid,
		{
			header: 'No. Nota',
			dataIndex: 'nonota',
			width: 150
		},{
			header: 'Tgl. Nota',
			dataIndex: 'tglnota',
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			width: 150
		},{
			header: 'Unit / Ruangan',
			dataIndex: 'nmbagian',
			width: 150
		},{
			header: 'Dokter',
			dataIndex: 'nmdoktergelar',
			width: 150
		},{
			header: 'Total',
			dataIndex: 'ctotal',
			width: 150
		}],
		bbar: [{ xtype:'tbfill' },'Jumlah :',
			{
					xtype: 'numericfield',
					id: 'tf.total',
					width: 100,
					readOnly:true, style: 'opacity:0.6'
			}
		]
	});
	
	var cbGridPembayaran = new Ext.grid.CheckboxSelectionModel();
		
	var grid_pembayaran = new Ext.grid.GridPanel({
		store: ds_bank,
		frame: true,
		height: 255,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_det_product',
		forceFit: true,
		sm: cbGridPembayaran,
		autoScroll: true,
		columnLines: true,
		loadMask: true,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				/* fnAddBank();
				Ext.getCmp('tf.frm.kdbank').setReadOnly(false); */
			}
		}],
		columns: [
		cbGridPembayaran,
		{
			header: 'Cara Bayar',
			width: 150,
		},{
			header: 'Nama Bank',
			width: 150,
			dataIndex: 'nmbank'
		},{
			header: 'No. Kartu',
			width: 150,
			//dataIndex: 'nmbank'
		},{
			header: 'Total',
			width: 150,
			align: 'right',
			//dataIndex: 'nmbank'
		},{
                xtype: 'actioncolumn',
                width: 45,
				header: 'Edit',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_edit.png',
					tooltip: 'Edit record',
                    handler: function(grid, rowIndex) {
						//fnEditBank(grid, rowIndex);
                    }
                }]
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
						//fnDeleteBank(grid, rowIndex);
                    }
                }]
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
						xtype: 'label', id: 'lb.jml', text: 'Jumlah :', margins: '0 10 0 90',
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
       
	var form_kuitansi = new Ext.form.FormPanel({
		id: 'form_kuitansi',
		title: 'Kuitansi', iconCls:'silk-calendar',
		width: 900, Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', id:'btn.baru', iconCls: 'silk-add', handler: function(){bersihKsrkuitansi();} },'-',
			{ text: 'Simpan', id:'btn.simpan', disabled:true, iconCls: 'silk-save', handler: function(){simpanKsrkui();} },'-',
			{ text: 'Cetak', id:'btn.cetak',  disabled:true, iconCls: 'silk-printer', handler: function(){cetakKsrkui();} },'-',
			{ text: 'Cetak Nota & Kuitansi', id:'btn.cetaknk',  disabled:true, iconCls: 'silk-printer', handler: function(){cetakNK();} },'-',
			{ xtype: 'tbfill' },'->',
		],
		items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.5,
			defaults: { labelWidth: 87, labelAlign: 'right'},
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Pencarian',
				layout: 'form',
				height: 90,
				boxMaxHeight:110,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'No. RM',
						id: 'tf.norm',
						width: 80, style: "opacity:0.6",
						readOnly: true,
					},{
						xtype: 'label', id: 'lb.norg', text: 'No. Registrasi :', margins: '0 8 0 5',
					},{
						xtype: 'textfield',
						id: 'tf.noreg',
						width: 80,
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
						width: 40,
						handler: function() {
							fReg();
						}
					}]
				},{
					xtype: 'textfield',
					fieldLabel: 'Nama Pasien ',
					id: 'tf.nmpasien',
					readOnly: true,
					width: 400,
					style : 'opacity:0.6',
					anchor: "93%"
				}/* ,{
					xtype: 'compositefield',
					fieldLabel: 'Pencarian',
					items:[{
						xtype: 'combo',
						id: 'cb.pencarian',
						emptyText: 'Pilih...',
						width: 150
					},{
						xtype: 'textfield',
						id: 'tf.cb.pencarian',
						width: 244,
					}]
				} */]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.5,
			layout: 'fit',
			defaults: { labelWidth: 87, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', 
				title: 'Kuitansi',
				layout: 'form',
				height: 100,
				boxMaxHeight:110,
				items: [{
					xtype: 'textfield',
					fieldLabel: 'No. Kuitansi',
					id:'tf.nokuitansi',
					width: 80,
					readOnly: true,
				},{
					xtype: 'compositefield',
					fieldLabel: 'Tgl/Jam/Shift',
					items:[{
						xtype: 'datefield',
						id: 'df.date',
						format: "d-m-Y",
						value: new Date(),
						width: 100,
					},{
						xtype: 'label', id: 'lb.time', text: '/', margins: '0 10 0 5',
					},{ 	
						xtype: 'textfield',
						id: 'tf.time',
						width: 65, 
						readOnly: true,
					},{
						xtype: 'label', id: 'lb.shift', text: '/', margins: '0 10 0 5',
					},{ 	
						xtype: 'textfield',
						id: 'tf.shift',
						width: 60, 
						readOnly: true,
						style : 'opacity:0.6'
					}]
				},
				{ 	
					xtype: 'textfield',
					fieldLabel: 'Petugas',
					id: 'tf.nmpetugas',
					width: 400,
					value: USERNAME,
					readOnly: true,
					style : 'opacity:0.6',
					anchor: "93%"
				}]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px; margin: -10px 0 -12px 0',
			columnWidth: 1,
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Daftar Nota Transaksi',
				layout: 'form',
				height: 210,
				boxMaxHeight:235,
				items: [grid_nota]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px; marginTop: 10px',
			columnWidth: 1,
			layout: 'fit',
			items: [{
				xtype: 'fieldset',
				layout: 'column',
				height: 50,
				boxMaxHeight:80,
				defaults: { labelWidth: 87, labelAlign: 'right' },
				items:[{
						columnWidth: 0.7,
						xtype: 'container',
						layout: 'form',
						items:[{
							xtype: 'compositefield',
							fieldLabel: 'A/n',
							items: [{
								xtype: 'combo',
								id: 'cb.an', width: 100, 
								store: ds_jsbtnm, valueField: 'idsbtnm', displayField: 'nmsbtnm',
								editable: false, triggerAction: 'all',
								forceSelection: true, submitValue: true, mode: 'local',
								emptyText:'', disabled: true
							},{
								xtype: 'textfield',
								id: 'tf.an',
								width: 200,
							}]
						},
						{
							xtype: 'combo',
							fieldLabel: 'Kuitansi',
							id: 'cb.kuitansi',
							width: 305,
						}]					
					},
					{
						columnWidth: 0.3,
						xtype: 'container',
						layout: 'form',
						items:[{
							xtype: 'numericfield',
							fieldLabel: 'Pembulatan',
							id: 'tf.pembulatan',
							width: 220, 
							readOnly: true,
							style : 'opacity:0.6',
							anchor: "93%"
						},
						{
							xtype: 'numericfield',
							fieldLabel: 'Total Biaya',
							id: 'tf.ttlbiaya',
							width: 220, 
							readOnly: true,
							style : 'opacity:0.6',
							anchor: "93%"
						}]					
					}]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px; margin: -10px 0 -12px 0',
			columnWidth: 1,
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Pembayaran',
				layout: 'form',
				height: 265,
				boxMaxHeight:290,
				items: [grid_pembayaran]
			}]
		}]
	});
	SET_PAGE_CONTENT(form_kuitansi);
	
	function bersihKsrkuitansi() {
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.noreg').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.an').setValue();
		Ext.getCmp('cb.an').setValue();
		Ext.getCmp('tf.total').setValue();
		Ext.getCmp('tf.pembulatan').setValue();
		Ext.getCmp('tf.ttlbiaya').setValue();
		Ext.getCmp('tf.jumlah').setValue();
		Ext.getCmp('tf.utyd').setValue();
		Ext.getCmp('tf.kembalian').setValue();
		ds_nota.setBaseParam('idregdet',null);
		ds_nota.reload();
		jmltemp=0;
	}
	
	function hitungKembalian() {
		var jml = Ext.getCmp('tf.jumlah').getValue();
		if(jml != ''){
			var utyd = Ext.getCmp('tf.utyd').getValue();
			var kmblian = utyd - jml;
			Ext.getCmp('tf.kembalian').setValue(kmblian);
			if(kmblian >= 0)Ext.getCmp('btn.simpan').enable();
		}
	}
	
	function simpanKsrkui(){
		Ext.Ajax.request({
			url: BASE_URL + 'kuitansi_controller/insert_kuitansi',
			params: {
				noreg		: Ext.getCmp('tf.noreg').getValue(),
				nmshift	: Ext.getCmp('tf.shift').getValue(),
				pembulatan	: Ext.getCmp('tf.pembulatan').getValue(),
				total		: Ext.getCmp('tf.ttlbiaya').getValue()
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
				obj = Ext.util.JSON.decode(response.responseText);
				Ext.getCmp("tf.nokuitansi").setValue(obj.nokuitansi);
				Ext.getCmp("btn.cetak").enable();
				Ext.getCmp("btn.cetaknk").enable();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function cetakKsrkui(){
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printkasir/ksrkui/'
                +noreg);
	}
	
	function cetakNK(){
		var noreg		= Ext.getCmp('tf.noreg').getValue();
		RH.ShowReport(BASE_URL + 'print/printnotakasir/notakui/'
                +noreg);
	}
	
	function dataRegistrasi(){
		Ext.Ajax.request({
			url: BASE_URL + 'vregistrasi_controller/getDataRegistrasi',
			params: {
				noreg		: Ext.getCmp('tf.noreg').getValue()
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				var freg_noreg = obj.noreg;
				var freg_idregdet = obj.idregdet;
				var freg_norm = obj.norm;
				var freg_nmpasien = obj.nmpasien;
				
				Ext.getCmp("tf.noreg").setValue(freg_noreg);
				Ext.getCmp("tf.norm").setValue(freg_norm);
				Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
				Ext.getCmp("tf.an").setValue(freg_nmpasien);
				ds_nota.setBaseParam('idregdet',freg_idregdet);
				ds_nota.reload();
				Ext.getCmp('tf.total').setValue();
				Ext.getCmp('tf.pembulatan').setValue();
				Ext.getCmp('tf.ttlbiaya').setValue();
				Ext.getCmp('tf.jumlah').setValue();
				Ext.getCmp('tf.utyd').setValue();
				Ext.getCmp('tf.kembalian').setValue();
				//Ext.getCmp('btn.cetak').enable();
				//Ext.getCmp('btn.cetaknk').enable();
				jmltemp=0;
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function fReg(){
		var ds_bagian = dm_bagian();
		var ds_dokter = dm_dokter();
		var cm_freg = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'noreg'
			},{
				header: 'No. Registrasi',
				dataIndex: 'registrasi.noreg',
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
				dataIndex: 'pasien.alamat',
				width: 200
			},{
				header: 'Jenis Kelamin',
				dataIndex: 'nmjnskelamin',
				width: 200
			}
		]);
		var sm_freg = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_freg = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_freg = new Ext.PagingToolbar({
			store: ds_registrasi,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_freg= new Ext.grid.GridPanel({
			id: 'gp.find_freg',
			ds: ds_registrasi,
			cm: cm_freg,
			sm: sm_freg,
			view: vw_freg,
			height: 350,
			width: 800,
			//plugins: cari_freg,
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
		
		Ext.getCmp('gp.find_freg').store.reload();
		function klik_freg(grid, rowIdx){
			var rec_freg = ds_registrasi.getAt(rowIdx);
			var freg_noreg = rec_freg.data["registrasi.noreg"];
			var freg_idregdet = rec_freg.data["idregdet"];
			var freg_norm = rec_freg.data["norm"];
			var freg_nmpasien = rec_freg.data["nmpasien"];
			
			Ext.getCmp("tf.noreg").setValue(freg_noreg);
			Ext.getCmp("tf.norm").setValue(freg_norm);
			Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
			Ext.getCmp("tf.an").setValue(freg_nmpasien);
			ds_nota.setBaseParam('idregdet',freg_idregdet);
			ds_nota.reload();
			Ext.getCmp('tf.total').setValue();
			Ext.getCmp('tf.pembulatan').setValue();
			Ext.getCmp('tf.ttlbiaya').setValue();
			Ext.getCmp('tf.jumlah').setValue();
			Ext.getCmp('tf.utyd').setValue();
			Ext.getCmp('tf.kembalian').setValue();
			//Ext.getCmp('btn.cetak').enable();
			//Ext.getCmp('btn.cetaknk').enable();
			jmltemp=0;
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
}