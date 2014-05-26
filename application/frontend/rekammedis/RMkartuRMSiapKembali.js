function RMkartuRMSiapKembali(){
	var pageSize = 50;
	
	//Data Store
	var ds_kembali = new Ext.data.JsonStore({		
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + '',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 5
		},
		totalProperty: 'results',
		root: 'data',
		autoLoad: true,
		fields: [{}]
	});
	
	//other component
	var cbGrid = new Ext.grid.CheckboxSelectionModel();
	
	var paging = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_kembali,
		displayInfo: true,
		displayMsg: 'Data Kartu RM Siap Kembali Dari {0} - {1} of {2}',
		emptyMsg: 'Tidak ada data untuk ditampilkan'
	});


	//data grid
	var grid_nya = new Ext.grid.GridPanel({
		id: 'gPengirimanKartuRM', sm: cbGrid, store: ds_kembali,		
		autoScroll: true, columnLines: true, height: 375, flex: 1,
		columns: [cbGrid,{
			header: 'No. RM',
			width: 80,
			dataIndex: '',
			align: 'center',
			sortable: true
		},
		{
			header: 'No. Registrasi',
			width: 90,
			dataIndex: '',
			align: 'center',
			sortable: true
		},
		{
			header: 'Nama Pasien',
			width: 150,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Status<br>Pasien',
			align: 'center',
			width: 50,
			dataIndex: '',
			sortable: true
		},{
			header: 'Tanggal<br>Keluar',
			width: 75,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Jam<br>Keluar',
			width: 50,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Tanggal<br>Kembali',
			width: 75,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Jam<br>Kembali',
			width: 50,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Petugas Yang<br>Mengembalikan',
			width: 150,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Status<br>Kartu RM',
			width: 100,
			dataIndex: '',
			align: 'center',
			sortable: true
		},{
			header: 'Catatan',
			width: 100,
			dataIndex: '',
			align: 'center',
			sortable: true
		}],		
		bbar: paging
	});
	
	
	//Main Form
	var main_form = new Ext.form.FormPanel({		
		id: 'formRMpengirimanKartuRM',
		region: 'center',
		bodyStyle: 'padding: 5px;',		
		border: false,
		title: 'KARTU RM SIAP KEMBALI',
		autoScroll: true,
		tbar: [{
			text: 'Cari', iconCls: 'silk-find', handler: function(){alert("Cari");}
		},{
			text: 'Kembali', iconCls: 'silk-accept', handler: function(){alert("Kembali");}
		},'->',{
			xtype: 'tbtext',
			text: 'Lokasi Kerja'	
		},{
			xtype: 'combo', id: 'cbLokasiKerja', name: 'cbLokasiKerja',
			width: 200,	height: 50, allowBlank: false, triggerAction: 'all',
			editable: false, submitValue: true, typeAhead: true, mode: 'local',
			emptyText: 'Pilih...', selectOnFocus: true
		}],
		items: [{
			xtype: 'fieldset',
			title: 'Daftar Kartu RM Siap Kembali',
			items: [{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: .35,
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
								text: 'No. RM',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'textfield',
								id: 'tNamaPasien',								
								width: 130, disabled: true
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
											Ext.getCmp('cbStatus').enable();
										} else if(val == false){
											Ext.getCmp('cbStatus').disable();
											Ext.getCmp('cbStatus').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'Pelayanan',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'textfield',
								id: 'tNamaPasien',								
								width: 230, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .48,
						border: false,
						items: []
					},{
						xtype: 'fieldset',
						columnWidth: .23,
						border: false,						
						items: []
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
	            	xtype: 'textfield',	id: 'tNamaPasien',
					style: {fontSize: '15px', textAlign: 'center'},							
					width: 250, height: 30
	            }]				
            }]	        
		}]		
	});
	//Main Layout
	SET_PAGE_CONTENT(main_form);
}