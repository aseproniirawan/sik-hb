/**
 * @author RONI
 */


function RMbatalPengirimanKartuRM(){
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
		title: 'BATAL KIRIM KARTU RM',
		autoScroll: true,
		tbar: [{
			text: 'Kembali', iconCls: 'silk-arrow-undo', handler: function(){alert("Cari");}
		}],
		items: [{
			xtype: 'container',	style: 'padding: 5px', defaults: { labelAlign: 'right'},
			items: [{				
				xtype: 'fieldset',columnWidth: 0.5, labelWidth: 140,			
				border: false,
				items: [{
					xtype: 'compositefield', name: 'comp_norm', fieldLabel: 'No. RM', id: 'comp_norm',
					items: [{
						xtype: 'textfield', id: 'tf.norm', width: 100
					},{
						xtype: 'label', text: 'No. Registrasi', margins: '2 0 0 10', width:85
					},{
						xtype: 'textfield', id: 'tf.ruangann', width: 120
					},{
						xtype: 'button', text: ' ... ',	id: 'btn.ruangan', width: 30,
						handler: function() {
							alert('No. Registrasi');
						}
					}]
				},{					
					xtype: 'textfield', fieldLabel: 'Nama Pasien',
					id: 'tf.nmpasien', disabled: true, width: 355				
				},{
					xtype: 'compositefield', name: 'comp2', id: 'comp2', fieldLabel: 'Jenis Kelamin',
					items:[{
						xtype: 'textfield', id: 'tf.noregis', width: 100, emptyText: 'Laki-laki'
					},{
						xtype: 'label', id: 'lb.tgllahir', text: 'Tgl. Lahir', margins: '2 10 0 90',
					},{
						xtype: 'datefield', id: 'df.tglrencanamsk', width: 100, value: new Date()
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Alamat',
					id: 'tAlamat', disabled: true, width: 355
				},{
					xtype: 'textfield', fieldLabel: 'Lokasi Kartu RM Saat ini',
					id: 'tLokasiRM', disabled: true, width: 355
				},{
					xtype: 'textarea', fieldLabel: 'Catatan', id : 'ta.catatan', width : 355,
					disabled: true, autoScroll: true
				}]
			}]
		}]		
	});
	//Main Layout
	SET_PAGE_CONTENT(main_form);
}