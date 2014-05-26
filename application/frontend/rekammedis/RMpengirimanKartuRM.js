/**
 * @author RONI
 */
function RMpengirimanKartuRM(){	
	
	var pageSize = 50;
	
	//Data Store
	
	var ds_pelayanan = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'jpelayanan_controller/get_jpelayanan',
			method: 'POST'
		}),
		params: {
			start: 0, limit: 50
		},
		root: 'data', totalProperty: 'results', autoLoad: true,
		fields: [{
			name: "idjnspelayanan", mapping: "idjnspelayanan"
		},{
			name: "nmjnspelayanan", mapping: "nmjnspelayanan"
		}]	
	});
	
	var ds_lvlbagian = new Ext.data.JsonStore({		
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getBagian',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 5
		},
		totalProperty: 'results',
		root: 'data',
		autoLoad: true,
		fields: [{
			name: "nmbagian", mapping: "nmbagian"
		},{
			name: "nmjnspelayanan", mapping: "nmjnspelayanan"
		},{
			name: "nmbdgrawat", mapping: "nmbdgrawat"
		}]
	});
	
	var ds_status = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'stspasien_controller/getStPasien',
			method: 'POST'
		}),
		params: {
			start: 0, limit: 50
		},
		root: 'data', totalProperty: 'results', autoLoad: true,
		fields: [{
			name: "nmstpasien", mapping: "nmstpasien"
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
	
	var ds_permintaan = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getPermintaanKartuRM',
			method: 'POST'
		}),
		params: {
			start: 0, limit: 50
		},
		root: 'data', totalProperty: 'results', autoLoad: true,
		fields: [{
			name: "norm", mapping: "norm"
		},{
			name: "noreg", mapping: "noreg"
		},{
			name: "idstpasien", mapping: "idstpasien"
		},{
			name: "nmpasien", mapping: "nmpasien"
		},{
			name: "nmstpasien", mapping: "nmstpasien"
		},{
			name: "tglminta", mapping: "tglminta"
		},{
			name: "jamminta", mapping: "jamminta"
		},{
			name: "idbagian", mapping: "idbagian"
		},{
			name: "nmbagian", mapping: "nmbagian"
		},{
			name: "nmdoktergelar", mapping: "nmdoktergelar"
		},{
			name: "userinput", mapping: "userinput"
		},{
			name: "kdlokasi", mapping: "kdlokasi"
		},{
			name: "nmjnspelayanan", mapping: "nmjnspelayanan"
		},{
			name: "idregdet", mapping: "idregdet"
		}]	
	});
	
	//other component
	var arr = [];
	var norm = '';
	var idregdet = '';
	var cbGrid = new Ext.grid.CheckboxSelectionModel({
		listeners: {
			rowselect: function(selectionModel, rowIndex, record){
				norm = record.get("norm");
				idregdet = record.get("idregdet");
				arr[rowIndex] = norm + '-' + idregdet;
				console.log(arr);
			},
			rowdeselect: function(sm, rowIndex, keep, rec){
				arr.splice(rowIndex,1);
			}
		}
	});
	
	var paging = new Ext.PagingToolbar({
	pageSize: pageSize,
		store: ds_permintaan,
		displayInfo: true,
		displayMsg: 'Data Pengiriman Berkas RM Dari {0} - {1} of {2}',
		emptyMsg: 'Tidak ada data untuk ditampilkan'
	});

	
	//data grid	
	var grid_nya = new Ext.grid.EditorGridPanel({
		id: 'gPengirimanKartuRM', sm: cbGrid, store: ds_permintaan,	forceFit: true,	
		autoScroll: true, columnLines: true, height: 300, frame: true,
		columns: [cbGrid,{
			header: 'No. RM', width: 70, dataIndex: 'norm',
			align: 'center', sortable: true
		},
		{
			header: 'No. Registrasi', width: 80, dataIndex: 'noreg',
			align: 'center', sortable: true
		},
		{
			header: 'Nama Pasien',width: 130, dataIndex: 'nmpasien',
			align: 'left',sortable: true
		},{
			header: 'Status<br>Pasien',	align: 'center', width: 50,
			dataIndex: 'nmstpasien', sortable: true
		},{
			header: 'Tanggal<br>Minta',	width: 75, dataIndex: 'tglminta',
			align: 'center', sortable: true
		},{
			header: 'Jam<br>Minta', width: 75, dataIndex: 'jamminta',
			align: 'center', sortable: true
		},{
			header: 'Unit/Ruangan<br>Minta', width: 140, dataIndex: 'nmbagian',
			align: 'left', sortable: true
		},{
			header: 'Dokter', width: 200, dataIndex: 'nmdoktergelar',
			align: 'left', sortable: true
		},{
			header: 'Petugas Yang<br>Meminta', width: 100,
			dataIndex: 'userinput', align: 'center', sortable: true
		},{
			header: 'Lokasi<br>Berkas RM', width: 100,
			dataIndex: 'kdlokasi',
			editor: new Ext.form.ComboBox({
                typeAhead: true, triggerAction: 'all',
			    lazyRender:true, mode: 'local',
			    store: ds_lokasi, valueField: 'idlokasi',
			    displayField: 'kdlokasi', listeners: {
			    	select: function(combo, records, eOpts){
			    		updateLokasi(records);
			    	}
			    }
            })
		},{
			header: 'Idregdet', width: 100, hidden: true,
			dataIndex: 'idregdet', align: 'center', sortable: true
		}],		
		bbar: paging
	});
	
	
	//Main Form
	var main_form = new Ext.form.FormPanel({		
		id: 'formRMpengirimanKartuRM',
		region: 'center',
		bodyStyle: 'padding: 5px;',		
		border: false, frame: true,
		title: 'PENGELUARAN BERKAS RM',
		autoScroll: true,
		tbar: [{
			text: 'Cari', iconCls: 'silk-find', handler: function(){
				cariPermintaan();
			}
		},{
			text: 'Keluarkan/Kirim', iconCls: 'silk-accept', handler: function(){
				keluarkanRM();
			}
		}],
		items: [{
			xtype: 'fieldset',
			title: 'Daftar Permintaan Berkas RM',
			items: [{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: .26,
						border: false,				
						items: [{
							xtype: 'compositefield',
							id: 'composite1',
							items:[{
								xtype: 'checkbox',
								id:'chb.pelayanan',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cbPelayanan').enable();
										} else if(val == false){
											Ext.getCmp('cbPelayanan').disable();
											Ext.getCmp('cbPelayanan').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'Pelayanan',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'combo', id: 'cbPelayanan', name: 'cbPelayanan', store: ds_pelayanan,valueField: 'nmjnspelayanan',
								displayField: 'nmjnspelayanan',width: 130, height: 25, triggerAction: 'all',
								editable: false, submitValue: true, typeAhead: true, mode: 'local',
								emptyText: 'Pilih...', selectOnFocus: true, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_cnmpasien',
							items:[{
								xtype: 'checkbox',
								id:'chb.status',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cbStatusPasien').enable();
										} else if(val == false){
											Ext.getCmp('cbStatusPasien').disable();
											Ext.getCmp('cbStatusPasien').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'Status Pasien',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'combo', id: 'cbStatusPasien', name: 'cbStatusPasien', store: ds_status, valueField: 'nmstpasien',
								displayField: 'nmstpasien', width: 130, height: 25, triggerAction: 'all',
								editable: false, submitValue: true, typeAhead: true, mode: 'local',
								emptyText: 'Pilih...', selectOnFocus: true, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .43,
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
											Ext.getCmp('tUnitRuang').enable();
											Ext.getCmp('bRuang').enable();
										} else if(val == false){
											Ext.getCmp('tUnitRuang').disable();
											Ext.getCmp('bRuang').disable();
											Ext.getCmp('tUnitRuang').setValue();											
										}
									}
								}
							},{
								xtype: 'tbtext', text: 'Unit/Ruangan (Minta)', width: 130,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'textfield', id: 'tUnitRuang',name: 'tUnitRuang', width: 230, disabled: true
							},{
								xtype: 'button', text: ' ... ', id: 'bRuang', width: 28, disabled: true,
								handler: function() {
									cariRuangan();
								}
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
											Ext.getCmp('tNamaPasien').enable();
											Ext.getCmp('tNamaPasien').focus();
										} else if(val == false){
											Ext.getCmp('tNamaPasien').disable();
											Ext.getCmp('tNamaPasien').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext', text: 'Nama Pasien', width: 130,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'textfield', id: 'tNamaPasien', name:'tNamaPasien',width: 265, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .26,
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
											Ext.getCmp('tNoRM').enable();
											Ext.getCmp('tNoRM').focus();
										} else if(val == false){
											Ext.getCmp('tNoRM').disable();
											Ext.getCmp('tNoRM').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext', text: 'No. RM', width: 80,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'textfield', id: 'tNoRM', name: 'tNoRM',								
								margins : {top:0, right:0, bottom:10, left:20},
								width: 130, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_lokasi',
							items: [{
								xtype: 'checkbox',
								id: 'cbLokasi',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cmbLokasi').enable();
											Ext.getCmp('cmbLokasi').focus();
										} else if(val == false){
											Ext.getCmp('cmbLokasi').disable();
											Ext.getCmp('cmbLokasi').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext', text: 'Lokasi Berkas RM', width: 120,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'combo', id: 'cmbLokasi', name: 'cmbLokasi', store: ds_lokasi, valueField: 'kdlokasi',
								displayField: 'kdlokasi', width: 130, triggerAction: 'all',
								editable: false, submitValue: true, typeAhead: true, mode: 'local',
								emptyText: 'Pilih...', selectOnFocus: true, disabled: true,
								margins: {top:0, right:0, bottom:0, left:-20}
							}]
						}]
					}]
				},{
					xtype: 'container',
					layout: 'form',
					items: [grid_nya]
				}]
		},{			
            xtype: 'panel',
            frame: true,
            autoHeight: true,
            items: [{            
				xtype: 'compositefield',
            	id: 'scanout',
            	items: [{
            		xtype: 'tbtext',
					text: 'Scan Out',
					margins : {top:0, right:0, bottom:0, left:0},
					width: 100,
					style: {
						fontWeight: 'bold',
						fontSize: '20px'
					}
	            },{
	            	xtype: 'textfield',	id: 'tScanNorm',
					style: {fontSize: '15px', textAlign: 'center'},							
					width: 250, height: 30,
					listeners: {
		            	specialkey: function(f,e){
		            		if (e.getKey() == e.ENTER){
		                    	keluarkanRMScann();		                  
		                	}
		              	}
		            }
	            },{
	            	xtype: 'fieldset',
					columnWidth: .1, border: false,
					margins: {top:0, right:0, bottom:0, left:550},
					items: [{
						xtype: 'tbtext',width: 250, id: 'tPesan',
						text: '',margins: {top:0, right:0, bottom:0, left:0}
					}]
	            }]				
            }]	        
		}]		
	});
	
	function keluarkanRM(){
		Ext.Ajax.request({
			url: BASE_URL + 'rekammedis_controller/keluarkanRM',
			params: {
				arr : Ext.encode(arr)
			}, 
			success: function(response){
				Ext.getCmp("tPesan").setText('Berkas RM berhasil dikirm');
				ds_permintaan.reload();
			},
			failure: function(response){
				Ext.getCmp('tPesan').setText('Berkas RM gagal dikirm');
			}
		});
	}
	
	function keluarkanRMScann(){
		Ext.Ajax.request({
			url: BASE_URL + 'rekammedis_controller/keluarkanRMScan',
			params: {
				norm : Ext.getCmp('tScanNorm').getValue()
			}, 
			success: function(response){
				xxx = Ext.util.JSON.decode(response.responseText);
				if(xxx.success == 1){
					ds_permintaan.reload();
					Ext.getCmp('tScanNorm').setValue('');
					Ext.getCmp("tPesan").setText('Berkas RM berhasil dikirim');
					Ext.getCmp('tScanNorm').focus();
				}else {
					Ext.getCmp('tScanNorm').setValue('');
					Ext.getCmp("tPesan").setText('Berkas RM tidak ditemukan');
					Ext.getCmp('tScanNorm').focus();
				}
			},
			failure: function(response){
				Ext.getCmp('tPesan').setText('Berkas RM gagal dikirm');
			}
		});
	}
	
	function comboEvent(){		
		ds_permintaan.setBaseParam('idbagian',Ext.getCmp('cbLokasiKerja').getValue());
		ds_permintaan.reload();
	}
	
	function cariPermintaan(){				
		ds_permintaan.setBaseParam('nmjnspelayanan',Ext.getCmp('cbPelayanan').getValue());
		ds_permintaan.setBaseParam('nmstpasien',Ext.getCmp('cbStatusPasien').getValue());
		ds_permintaan.setBaseParam('nmpasien',Ext.getCmp('tNamaPasien').getValue());
		ds_permintaan.setBaseParam('norm',Ext.getCmp('tNoRM').getValue());
		ds_permintaan.setBaseParam('nmbagian',Ext.getCmp('tUnitRuang').getValue());
		ds_permintaan.setBaseParam('kdlokasi',Ext.getCmp('cmbLokasi').getValue());
		ds_permintaan.reload();
	}
	
	function updateLokasi(x){
		var data = x.get("idlokasi");		
		Ext.Ajax.request({
			url: BASE_URL + 'rekammedis_controller/ubahLokasi',
			params: {
				idlokasi : data,
				arr: Ext.encode(arr)
			}, 
			success: function(response){				
				Ext.MessageBox.alert('Infromasi','Lokasi berhasil diubah ');
				ds_permintaan.reload();	
				arr = [];			
			},
			failure: function(response){
				Ext.MessageBox.alert('Infromasi','Lokasi gagal diubah');
			}
		});
	}
		
	//Main Layout
	SET_PAGE_CONTENT(main_form);
	
	function cariRuangan(){
		var cmnya = new Ext.grid.ColumnModel([{
			header: 'Nama Bagian', width: 130, dataIndex: 'nmbagian', sortable: true
		},{
			header: 'Jenis Pelayanan', width: 130, dataIndex: 'nmjnspelayanan', sortable: true,align: 'center'
		},{
			header: 'Bidang Perawatan', width: 300,	dataIndex: 'nmbdgrawat', sortable: true
		}]);
		
		var smnya = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var viewnya = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var pagginnya = new Ext.PagingToolbar({
			pageSize: 50, store: ds_lvlbagian, displayInfo: true,
			displayMsg: 'Data Bagian Dari {0} - {1} of {2}', emptyMsg: 'Tidak ada data untuk ditampilkan'
		});
		
		var carinya = [new Ext.ux.grid.Search({
			iconCls: 'btn_search', minChars: 1, autoFocus: true, position: 'top',mode: 'local', width: 200
		})];
		
		var gridnya = new Ext.grid.GridPanel({
			ds: ds_lvlbagian, cm: cmnya, sm: smnya, view: viewnya, plugins: carinya,
			height: 350, width: 570, autoSizeColumns: true, enableColumnResize: true, enableColumnHide: false,
			enableColumnMove: false, enableHdaccess: false, columnLines: true, loadMask: true, buttonAlign: 'left', layout: 'anchor',
			anchorSize: {
				width: 400, height: 400
			},
			tbar: [],
			bbar: pagginnya,
			listeners: {
				rowdblclick: cariBagian
			}
		});
		
		var formCariRuangan = new Ext.Window({
			title: 'Cari Bagian (Unit/Ruangan)', modal: true,
			items: [gridnya]
		}).show();
		
		function cariBagian(grid, rowIdx){
			var databag = ds_lvlbagian.getAt(rowIdx);
			var namabag = databag.data["nmbagian"];
			Ext.getCmp("tUnitRuang").setValue(namabag);
			formCariRuangan.close();
		}
	}
}
