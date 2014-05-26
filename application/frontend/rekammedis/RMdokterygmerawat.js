function RMdokterygmerawat(){
	var ds_tarifpaketdet = dm_tarifpaketdet();
	ds_tarifpaketdet.setBaseParam('start',0);
	ds_tarifpaketdet.setBaseParam('limit',50);
	
	var ds_nota = dm_nota();
	ds_nota.setBaseParam('start',0);
	ds_nota.setBaseParam('limit',50);
	ds_nota.setBaseParam('idregdet',null);
	
	var ds_dokterrawat = dm_dokterrawat();
	ds_dokterrawat.setBaseParam('start', 0);
	ds_dokterrawat.setBaseParam('limit',50);
	ds_dokterrawat.setBaseParam('idregdet', null);
	
	var ds_vregistrasi = dm_vregistrasi();
	ds_vregistrasi.setBaseParam('cek','RJ');
	
	var ds_bagian = dm_bagian();
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
		height: 400,
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
		cbGrid,
		{
			header: 'Nama Dokter',
			dataIndex: 'iddokterrawat',
			width: 150
		},{
			header: 'Status Dokter',
			dataIndex: '',
			width: 150
		},{
			header: 'Tgl. Mulai',
			dataIndex: '',
			width: 150
		},{
			header: 'Jam Mulai',
			dataIndex: '',
			width: 150
		},{
			header: 'Tgl. Akhir',
			dataIndex: '',
			width: 150
		},{
			header: 'Jam Akhir',
			dataIndex: '',
			width: 100
		},{
			header: 'Diagnosa',
			dataIndex: '',
			width: 100
		}]
	
	});
	
	var ritransaksi_form = new Ext.form.FormPanel({
		id: 'fp.ritransaksi',
		title: 'Dokter Yang Merawat',
		//width: 900,
		Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){bersihRitransaksi();} },'-',
			{ text: 'Simpan', id:'btn.simpan', iconCls: 'silk-save', disabled:true, handler: function(){simpanRIT();} },'-',
			//{ text: 'Cari', iconCls: 'silk-find', handler: function(){} },'-',
			//{ text: 'Batal', iconCls: 'silk-cancel', handler: function(){} },'-',
			{ text: 'Cetak', id:'btn.cetak', iconCls: 'silk-printer', disabled:true, handler: function(){cetakRIT();} },'-',
			//{ text: 'Cetak Ulang', iconCls: 'silk-printer', handler: function(){} },'-',
			{xtype: 'tbfill' }
		],
        items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.4,
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
						id: 'tf.nopasien', readOnly: true,
						style : 'opacity:0.6',
						width: 100
					},{
						xtype: 'label', id: 'lb.noreg', text: 'No. Registrasi'
					},{
						xtype: 'textfield',
						id: 'tf.noreg',
						width: 100,
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
					width: 320
				},{
					xtype: 'compositefield',
					items: [{
						xtype: 'combo', fieldLabel: 'Ruangan',
						id: 'cb.ruangan', width: 155, 
						store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
						editable: false, triggerAction: 'all',
						forceSelection: true, submitValue: true, mode: 'local',
						readOnly: true, style : 'opacity:0.6'
					},{
						xtype: 'label', id: 'lb.klstarif', text: 'Kelas Tarif'
					},{
						xtype: 'textfield',
						id: 'tf.klstarif', readOnly: true,
						style : 'opacity:0.6',
						width: 100
					}]
				},{
					xtype: 'textfield', fieldLabel:'Dokter',
					id: 'tf.dokter',
					readOnly: true, style : 'opacity:0.6',
					width: 320
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
					xtype: 'textarea',
					id: 'ta.keluhan',
					fieldLabel: 'Keluhan',
				//	style: 'opacity:0.6',
					width: 300,
				},{
					xtype: 'textarea',
					id: 'ta.catatan',
					fieldLabel: 'Catatan',
					width: 300,
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 1,
			defaults: {labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', title:'Daftar Dokter yang Merawat',
				items: [{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'button',
						text: 'Hapus',
						id: 'btn.hitem',
						margins: '5',
						disabled:true,
						width: 100,
						handler: function() {
							hapusItem();
						}
					},{
						xtype: 'button',
						text: 'Tambah',
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
	}); SET_PAGE_CONTENT(ritransaksi_form);
	
	function fTotal(){
		ds_dokterrawat.reload({
			scope   : this,
			callback: function(records, operation, success) {
				sum = 0; 
			//	ds_nota.each(function (rec) { sum += parseFloat(rec.get('tarif')); });
			//	Ext.getCmp("tf.total").setValue(sum);
			}
		});
	}
	
	function simpanRIT(){
		Ext.Ajax.request({
			url: BASE_URL + 'dokterygmerawat_controller/insert_dok',
			params: {
				noreg		: Ext.getCmp('tf.noreg').getValue()
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
				obj = Ext.util.JSON.decode(response.responseText);
			//	Ext.getCmp("tf.nonota").setValue(obj.nonota);
				Ext.getCmp("btn.cetak").enable();
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
				fTotal();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
	
	function cetakRIT(){
	//	var nonota		= Ext.getCmp('tf.nonota').getValue();
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
				/* var freg_noreg = obj.noreg;
				var freg_nopasien = obj.nopasien;
				var freg_nmpasien = obj.nmpasien;
				var freg_penjamin = obj.nmpenjamin;
				var freg_idbagian = obj.idbagian;
				var freg_nmklstarif = obj.nmklstarif;
				var freg_nmdokter = obj.nmdokter;
				var freg_nonota = obj.nonota;
				
				Ext.getCmp("tf.noreg").setValue(freg_noreg);
				Ext.getCmp("tf.nopasien").setValue(freg_nopasien);
				Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
				Ext.getCmp("tf.penjamin").setValue(freg_penjamin);
				Ext.getCmp("cb.ruangan").setValue(freg_idbagian);
				Ext.getCmp("tf.klstarif").setValue(freg_nmklstarif);
				Ext.getCmp("tf.dokter").setValue(freg_nmdokter);
			//	Ext.getCmp("tf.nonota").setValue(freg_nonota);
				Ext.getCmp("btn.hitem").enable();
				Ext.getCmp("btn.titem").enable();
				Ext.getCmp("btn.simpan").enable();
				Ext.getCmp("btn.cetak").enable(); */
				ds_nota.setBaseParam('idregdet',obj.idregdet);
				fTotal();
			},
			failure: function() {
				Ext.Msg.alert("Informasi", "Data Tidak Ada atau Berbeda Bagian");
			}
		});
	}
	
	function fReg(){
		var cm_freg = new Ext.grid.ColumnModel([
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
		var sm_freg = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_freg = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_freg = new Ext.PagingToolbar({
			store: ds_vregistrasi,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_freg = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_freg= new Ext.grid.GridPanel({
			id: 'gp.find_freg',
			ds: ds_vregistrasi,
			cm: cm_freg,
			sm: sm_freg,
			view: vw_freg,
			height: 350,
			width: 800,
			plugins: cari_freg,
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
			items: [grid_freg]
		}).show();
		
		Ext.getCmp('gp.find_freg').store.reload();
		function klik_freg(grid, rowIdx){
			var rec_freg = ds_vregistrasi.getAt(rowIdx);
			var freg_noreg = rec_freg.data["noreg"];
			var freg_norm = rec_freg.data["norm"];
			var freg_nmpasien = rec_freg.data["nmpasien"];
			var freg_penjamin = rec_freg.data["nmpenjamin"];
			var freg_idbagian = rec_freg.data["idbagian"];
			var freg_nmklstarif = rec_freg.data["nmklstarif"];
			var freg_nmdokter = rec_freg.data["nmdokter"];
			var freg_nonota = rec_freg.data["nonota"];
			
			Ext.getCmp("tf.noreg").setValue(freg_noreg);
		//	Ext.getCmp("tf.norm").setValue(freg_norm);
			Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
		//	Ext.getCmp("tf.penjamin").setValue(freg_penjamin);
			Ext.getCmp("cb.ruangan").setValue(freg_idbagian);
			Ext.getCmp("tf.klstarif").setValue(freg_nmklstarif);
			Ext.getCmp("tf.dokter").setValue(freg_nmdokter);
		//	Ext.getCmp("tf.nonota").setValue(freg_nonota);
			Ext.getCmp("btn.hitem").enable();
			Ext.getCmp("btn.titem").enable();
			Ext.getCmp("btn.simpan").enable();
			Ext.getCmp("btn.cetak").enable();
			ds_nota.setBaseParam('idregdet',rec_freg.data["idregdet"]);
			fTotal();
			
						win_freg.close();
		}
	}

	function fPel(){
		var cbGridPel = new Ext.grid.CheckboxSelectionModel({
			listeners: {
				rowselect : function( selectionModel, rowIndex, record){
					Ext.Ajax.request({
						url: BASE_URL + 'nota_controller/insert_nota',
						params: {
							noreg		: Ext.getCmp('tf.noreg').getValue(),
							kditem : record.get("kdtarif"),
							idjnstarif : record.get("idjnstarif"),
							idtarifpaketdet : record.get("idtarifpaketdet"),
						//	nonota : Ext.getCmp('tf.nonota').getValue(),
							nmshift : Ext.getCmp('tf.shift').getValue(),
							catatan : Ext.getCmp('tf.catatan').getValue()
						},
						success: function(response){
							obj = Ext.util.JSON.decode(response.responseText);
							fTotal();
						//	Ext.getCmp("tf.nonota").setValue(obj.nonota);
						},
						failure: function() {
							//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
						}
					});
				},
				rowdeselect : function( selectionModel, rowIndex, record){
					Ext.Ajax.request({
						url: BASE_URL + 'nota_controller/delete_notadet',
						params: {
							noreg		: Ext.getCmp('tf.noreg').getValue(),
							kditem : record.get("kdtarif"),
							idjnstarif : record.get("idjnstarif"),
						//	nonota : Ext.getCmp('tf.nonota').getValue()
						},
						success: function(response){
							obj = Ext.util.JSON.decode(response.responseText);
							fTotal();
						//	Ext.getCmp("tf.nonota").setValue(obj.nonota);
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
		
		Ext.getCmp('gp.find_fpel').store.reload();
	}
}