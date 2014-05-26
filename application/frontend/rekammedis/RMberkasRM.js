/**
 * @author RONI
 * Berkas Rekas RM, berfungsi untuk : 
 * Mengelola data lokasi dan status berkas rm 
 * Menampilkan riwayat berkas rm
 */

function RMberkasRM(){
	var pageSize = 50;
	var xxx;
	// data store
	var ds_history = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getHistory',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 50
		},
		root: 'data', 
		totalProperty: 'results',
		autoLoad: true,
		fields: [{
				name: "norm", mapping: "norm"
			},{
				name: "nmbagian", mapping: "nmbagian"
			},{
				name: "tglminta", mapping: "tglminta"
			},{
				name: "jamminta", mapping: "jamminta"
			},{
				name: "tglkeluar", mapping: "tglkeluar"
			},{
				name: "jamkeluar", mapping: "jamkeluar"
			},{
				name: "useridkeluar", mapping: "useridkeluar"
			},{
				name: "tglkembali", mapping: "tglkembali"
			},{
				name: "jamkembali", mapping: "jamkembali"
			},{
				name: "useridkembali", mapping: "useridkembali"
			}]
		});	
	ds_history.setBaseParam('norm','a');

	var ds_rm = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getHistoryRM',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 50
		},
		root: 'data', 
		totalProperty: 'results',
		autoLoad: true,
		fields: [{
				name: 'norm',
				mapping: 'norm'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'idstkawin',
				mapping: 'idstkawin'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'idwn',
				mapping: 'idwn'
			},{
				name: 'iddaerah',
				mapping: 'iddaerah'
			},{
				name: 'nmdaerah',
				mapping: 'nmdaerah'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'tptlahir',
				mapping: 'tptlahir'
			},{
				name: 'tgllahir',
				mapping: 'tgllahir'
			},{
				name: 'nmibu',
				mapping: 'nmibu'
			},{
				name: 'idpekerjaan',
				mapping: 'idpekerjaan'
			},{
				name: 'idagama',
				mapping: 'idagama'
			},{
				name: 'noidentitas',
				mapping: 'noidentitas'
			},{
				name: 'idgoldarah',
				mapping: 'idgoldarah'
			},{
				name: 'idpendidikan',
				mapping: 'idpendidikan'
			},{
				name: 'idsukubangsa',
				mapping: 'idsukubangsa'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'negara',
				mapping: 'negara'
			},{
				name: 'alergi',
				mapping: 'alergi'
			},{
				name: 'idstpelayanan',
				mapping: 'idstpelayanan'
			},{
				name: 'tgldaftar',
				mapping: 'tgldaftar'
			},{
				name: 'idlokasi',
				mapping: 'idlokasi'
			}]
	});
	
	


	var ds_lokasi = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getLokasi',
			method: 'POST'
		}),
		params: {
			start: 0, limit: 50
		},
		root: 'data', totalProperty: 'results', autoLoad: true,
		fields: [{
			name: "idlokasi", mapping: "idlokasi"
		},{
			name: "idbagian", mapping: "idbagian"
		},{
			name: "kdlokasi", mapping: "kdlokasi"
		},{
			name: "nmlokasi", mapping: "nmlokasi"
		}]
	});
	
	var ds_status = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getStatusBerkasRM',
			method: 'POST'
		}),
		params: {
			start: 0, limit: 50
		},
		root: 'data', totalProperty: 'results', autoLoad: true,
		fields: [{
			name: "idjnsstkrm", mapping: "idjnsstkrm"
		},{
			name: "kdjnsstkrm", mapping: "kdjnsstkrm"
		},{
			name: "nmjnsstkrm", mapping: "nmjnsstkrm"
		}]
	});
	
	// component
	var pagging = new Ext.PagingToolbar({
		pageSize: pageSize, store: ds_history,
		displayInfo: true,
		displayMsg: 'Data Riwayat Berkas RM Dari {0} - {1} of {2}',
		emptyMsg: 'Tidak ada data untuk ditampilkan'
	});
	
	var cari = [new Ext.ux.grid.Search({
		iconCls: 'btn_search', minChars: 1, autoFocus: true, position: 'top',mode: 'local', width: 200
	})];
	
	var gridna = new Ext.grid.GridPanel({
		id: 'gBerkas', store: ds_history, height: 300, frame: true, 
		columnLines: true, plugins: cari, pageSize: true, forceFit: true,
		autoScroll: true, autoSizeColumns: true, enableColumnResize: true,
		enableHdaccess: false, columnLines: true, loadMask: true,
		tbar: [{
			xtype: 'tbtext',
			text: ''
		}],
		columns: [new Ext.grid.RowNumberer(),{
			header: 'Tujuan<br>(Unit/Ruangan)', width: 150, 
			dataIndex: 'nmbagian', sortable: true
		},{
			header: 'Tgl. Minta', width: 75, align: 'center', 
			dataIndex: 'tglminta', sortable: true
		},{
			header: 'Jam Minta', width: 75, align: 'center', 
			dataIndex: 'jamminta', sortable: true
		},{
			header: 'Tgl. Keluar', width: 75, align: 'center', 
			dataIndex: 'tglkeluar', sortable: true
		},{
			header: 'Jam Keluar', width: 75, align: 'center', 
			dataIndex: 'jamkeluar', sortable: true
		},{
			header: 'Petugas<br>yang memberi', width: 100, 
			dataIndex: 'useridkeluar', sortable: true
		},{
			header: 'Tgl. Kembali', width: 75, align: 'center', 
			dataIndex: 'tglkembali', sortable: true
		},{
			header: 'Jam Kembali', width: 75, align: 'center', 
			dataIndex: 'jamkembali', sortable: true
		},{
			header: 'Petugas<br>yang menerima', width: 100, 
			dataIndex: 'useridkembali', sortable: true
		}], bbar: pagging
	});
	
	var main_form = new Ext.form.FormPanel({
		id: 'formBerkasRM', region: 'center',
		border: false, frame: true, bodyStyle: 'padding: 5px',
		title: 'BERKAS RM', autoScroll: true,
		tbar: [{
			text: 'Simpan', iconCls: 'silk-save', handler: function(){
				ubahHistory();
			}
		},{
			text: 'Cetak Berkas RM', iconCls: 'silk-printer', handler: function(){
				cetakBerkasRM();
			}
		}],
		items: [{
			xtype: 'fieldset',title: 'Data Berkas RM Pasien',
			items: [{
				xtype: 'container', style: 'padding: 5px',
				layout: 'column', defaults: {labelWidth: 1, labelAlign: 'right'},
				items: [{
					xtype: 'fieldset', columnWidth: .47,
					border: false,
					items: [{
						xtype: 'compositefield', id: 'comp1',
						items: [{
							xtype: 'tbtext', text: 'No. RM :', margins: '5 5 0 40'
						},{
							xtype: 'textfield', id: 'tNoRM',name: 'tNoRM', width: 100,
							enableKeyEvents: true,
							listeners:{
								specialkey: function(field, e){
									if (e.getKey() == e.ENTER) {
										dataBerkasRM();
									}
								}
							}
						},{
							xtype: 'button',text: ' ... ',
							id: 'btn.norm', width: 30,
							handler: function(){
								cariRM();
							}
						}]
					},{
						xtype: 'compositefield', id: 'comp2',
						items: [{
							xtype: 'tbtext', text: 'Nama Pasien :', margins: '5 5 0 10'
						},{
							xtype: 'textfield', id: 'tNmPasien',name: 'tNmPasien', width: 350, disabled: true
						}]
					},{
						xtype: 'compositefield', id: 'comp3',
						items: [{
							xtype: 'tbtext', text: 'Jenis Kelamin :', margins: '5 5 0 7'
						},{
							xtype: 'textfield', id: 'tJenkel',name: 'tJenkel', width: 100, disabled: true
						}]					
					}]
				},{
					xtype: 'fieldset', columnWidth: .25, border: false,
					items: [{
						xtype: 'compositefield',id: 'com1',
						items: [{
							xtype: 'tbtext', text: 'Tgl. Daftar :', margins: '5 5 0 21'
						},{
							xtype: 'textfield', id: 'tglDaftar',name: 'tglDaftar', width: 130, disabled: true
						}]
					},{
						xtype: 'compositefield',id: 'com2',
						items: [{
							xtype: 'tbtext', text: 'Lokasi Berkas :', margins: '5 5 0 8'
						},{
							xtype: 'combo', id: 'cbLokasiBerkas', name: 'cbLokasiBerkas', store: ds_lokasi, valueField: 'idlokasi',
							displayField: 'kdlokasi', width: 130, triggerAction: 'all',
							editable: false, submitValue: true, typeAhead: true, mode: 'local',
							emptyText: 'Pilih...', selectOnFocus: true,
							margins: {top:0, right:0, bottom:0, left:0}
						}]
					},{
						xtype: 'compositefield',id: 'com3',
						items: [{
							xtype: 'tbtext', text: 'Status :', margins: '5 5 0 43'
						},{
							xtype: 'combo', id: 'cbStatus', name: 'cbStatus', store: ds_status, valueField: 'idjnsstkrm',
							displayField: 'nmjnsstkrm', width: 130, triggerAction: 'all',
							editable: false, submitValue: true, typeAhead: true, mode: 'local',
							emptyText: 'Pilih...', selectOnFocus: true,
							margins: {top:0, right:0, bottom:0, left: 0}
						}]
					}]
				},{
					xtype: 'fieldset', columnWidth: .15, border: false,
					items: [{
						xtype: 'compositefield', id: 'hid',
						items:[{
							xtype: 'textfield', id: 'tIdregdet', name: 'tIdregdet',width: 100, hidden: true
						}]
					}]
				}]
			}]
		},{
			xtype: 'fieldset', title: 'Riwayat Berkas RM Pasien',
			items: [{
				layout: 'form', border: false,
				items: [gridna]
			}]			
		}]
	});	
	
	
	
	//FORM LOAD
	SET_PAGE_CONTENT(main_form);
	
	function cetakBerkasRM(){
		var nomor = Ext.getCmp('tNoRM').getValue()
		if(nomor){
			window.open( BASE_URL + 'print/print_rekammedis/cetakKartuRM/'+ nomor);
		}else{
			Ext.MessageBox.alert('Info','Tentukan No. RM yang akan dicetak');
			Ext.getCmp('tNoRM').focus();
		}
		
		
	}

	function dataBerkasRM(){
		// Ext.Ajax.request({
		// 	url: BASE_URL + 'rekammedis_controller/getRiwayatPasien',
		// 	// url: BASE_URL + 'pasien_controller/getDataPasien',
		// 	params: {
		// 		norm: Ext.getCmp('tNoRM').getValue()
		// 	},
		// 	success: function(response){
		// 		obj = Ext.util.JSON.decode(response.responseText);
		// 		var cari_namapasien = obj.nmpasien;
		// 		var jk = obj.nmjnskelamin;
		// 		var tgldaftar = obj.tgldaftar;
		// 		var kdlokasi = obj.kdlokasi;
		// 		// var status = obj.nmjnsstkrm;

		// 		Ext.getCmp('tNmPasien').setValue(cari_namapasien);
		// 		Ext.getCmp('tJenkel').setValue(jk);
		// 		Ext.getCmp('tglDaftar').setValue(tgldaftar);
		// 		Ext.getCmp('cbLokasiBerkas').setValue(kdlokasi);
		// 		// Ext.getCmp('cbStatus').setValue(status);				
		// 	},
		// 	failure: function(){

		// 	}
		// });
	}

	function ubahHistory(){
		Ext.Ajax.request({
			url: BASE_URL + 'rekammedis_controller/ubahRiwayatRM',
			params: {
				lok : Ext.getCmp('cbLokasiBerkas').getValue(),
				status : Ext.getCmp('cbStatus').getValue(),
				norm : Ext.getCmp('tNoRM').getValue(),
				idregdet: Ext.getCmp('tIdregdet').getValue()
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi', 'Data Riwayat berhasil diubah');
				ds_rm.reload();
			},
			failure: function() {
				Ext.Msg.alert("Informasi", "Data Riwayat gagal diubah");
			}
		});
	}

	function cariRM (){
		
		var cmnya = new Ext.grid.ColumnModel([{
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
			}]);
		
		var smnya = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var viewnya = new Ext.grid.GridView({
			emptyText: '< Tidak ada Data >'
		});
		
		var pagginnya = new Ext.PagingToolbar({
			pageSize: 50, store: ds_rm, displayInfo: true,
			displayMsg: 'Data Riwayat Registrasi Pasien Dari {0} - {1} of {2}', emptyMsg: 'Tidak ada data untuk ditampilkan'
		});
		
		var gridRM = new Ext.grid.GridPanel({
			ds: ds_rm, cm: cmnya, sm: smnya, view: viewnya,
			height: 350, forceFit: true, autoSizeColumns: true, enableColumnResize: true, enableColumnHide: false,
			enableColumnMove: false, enableHdaccess: false, columnLines: true, loadMask: true, buttonAlign: 'left', layout: 'anchor',
			anchorSize: {
				width: 400, height: 400
			},
			tbar: [],
			bbar: pagginnya,
			listeners: {
				rowdblclick: cariRMDetail
			}
		});
		
		function cariRMDetail(grid, rowIdx){
			var databag = ds_rm.getAt(rowIdx);
			var namabag = databag.data["norm"];
			var nama = databag.data["nmpasien"];
			var jeniskelamin = databag.data["nmjnskelamin"];
			var tgldaftar = databag.data["tgldaftar"];
			var lokasi = databag.data["idlokasi"];
			var status = databag.data["idjnsstkrm"];

			Ext.getCmp("tNoRM").setValue(namabag);
			Ext.getCmp("tNmPasien").setValue(nama);
			Ext.getCmp("tJenkel").setValue(jeniskelamin);
			Ext.getCmp("tglDaftar").setValue(tgldaftar);
			Ext.getCmp("cbLokasiBerkas").setValue(lokasi);
			Ext.getCmp("cbStatus").setValue(status);

			ds_history.setBaseParam('norm', namabag);
			ds_history.reload();
			formCariRuangan.close();
		}
		
		function cariRMPasien(){
			if(Ext.getCmp('chb.ctgllhr').getValue() == true){
				ds_rm.setBaseParam('tgllahir',Ext.getCmp('df.ctgllhr').getValue());
			} else {
				ds_rm.setBaseParam('tgllahir','');
			}
		
			ds_rm.setBaseParam('norm',Ext.getCmp('tf.crm').getValue());
			ds_rm.setBaseParam('nmpasien',Ext.getCmp('tf.cnmpasien').getValue());
			ds_rm.setBaseParam('tptlahir',Ext.getCmp('tf.ctmplhr').getValue());
			ds_rm.setBaseParam('nmibu',Ext.getCmp('tf.cnmibu').getValue());
			ds_rm.setBaseParam('notelp',Ext.getCmp('tf.ctelp').getValue());
			ds_rm.reload();
		}

		var formCariRuangan = new Ext.Window({
			title: 'Cari Registrasi Pasien', modal: true,
			items: [{
					xtype: 'button',
					text: 'Cari',
					id: 'btn.cari',
					style: 'padding: 10px',
					width: 100,
					handler: function() {
						cariRMPasien();
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
											Ext.getCmp('tf.crm').focus();
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
											Ext.getCmp('tf.cnmpasien').focus();
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
											Ext.getCmp('df.ctgllhr').focus();
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
											Ext.getCmp('tf.ctmplhr').focus();
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
											Ext.getCmp('tf.cnmibu').focus();
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
											Ext.getCmp('tf.ctelp').focus();
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
				},gridRM]
		}).show();
				
	}
}
