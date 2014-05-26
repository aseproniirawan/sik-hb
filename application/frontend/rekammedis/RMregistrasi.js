function RMregistrasi(){
	var ds_test = dm_registrasi();
	/*	 
	 * Plugin Declaration
	 * */
	var pageSize = 50;		
	var cari_order = [new Ext.ux.grid.Search({
		iconCls: 'btn_search', minChars: 1, autoFocus: true,
		position: 'top', mode: 'remote', width: 275
	})];
	
	var cari_stbed = [new Ext.ux.grid.Search({
		iconCls: 'btn_search', minChars: 1, autoFocus: true,
		position: 'top', mode: 'remote', width: 275
	})];
	
	/*	 
	 * Data Store Declaration
	 * */
	var ds_bagian = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'bagian_controller/get_bagian',
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
			name: "idbagian",
			mapping: "idbagian"
		},
		{
			name: "nmbagian",
			mapping: "nmbagian"
		}]
	});
	
	var ds_regis = new Ext.data.JsonStore({		
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'registrasi_controller/getRegistrasi',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 5
		},
		totalProperty: 'results',
		root: 'data',
		autoLoad: true,
		fields: [{name: 'idbagian', mapping : 'idbagian'},		
		{name: 'registrasi.noreg', mapping:'zzz'},
		{name: 'oruangan.nooruangan', mapping:'xy'},
		{name: 'tgloruangan', mapping:'tgloruangan'},
		{name: 'jamoruangan', mapping:'jamoruangan'},
		{name: 'tglrencanamasuk', mapping:'tglrencanamasuk'},
		{name: 'norm', mapping:'norm'},
		{name: 'nmpasien', mapping:'nmpasien'},
		{name: 'nmkamar', mapping:'nmkamar'},
		{name: 'nmbed', mapping:'nmbed'},
		{name: 'oruangan.catatan', mapping:'occ'}]
	});
	
	var ds_stbed= new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'registrasi_controller/getStatusBed',
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
			name: 'nmklsrawat',
			mapping:'nmklsrawat'
		},{
			name: 'nmkamar',
			mapping: 'nmkamar'
		},{
			name: 'nmbed',
			mapping: 'nmbed'
		},{
			name: 'nmstbed',
			mapping: 'nmstbed'
		},{
			name: 'tglmasuk',
			mapping: 'tglmasuk'
		},{
			name: 'jammasuk',
			mapping: 'jammasuk'
		},{
			name: 'hari',
			mapping: 'hari'
		},{
			name: 'jam',
			mapping: 'jam'
		},{
			name: 'nmpasien',
			mapping: 'nmpasien'
		},{
			name: 'nmdokter',
			mapping: 'nmdokter'
		},{
			name: 'tglrencanakeluar',
			mapping: 'tglrencanakeluar'
		}]
	});
	
	/*	 
	 * Paging Declaration
	 * */
	
	var paging = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_regis,
		displayInfo: true,
		displayMsg: 'Data Registrasi Ruangan Dari {0} - {1} of {2}',
		emptyMsg: 'Tidak ada data untuk ditampilkan'
	});
	
	var paging_stbed = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_stbed,
		displayInfo: true,
		displayMsg: 'Data Status Bed Per Ruangan Dari {0} - {1} of {2}',
		emptyMsg: 'Tidak ada data untuk ditampilkan'
	});
	/*	 
	 * Grid Declaration
	 * */
	var grid_registrasi = new Ext.grid.GridPanel({
		id: 'grid_regis',
		store: ds_regis,
		height: 350,
		frame: true,		
		columnLines: true,	
		plugins: cari_order,	
		pageSize: pageSize,
		forceFit: true,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		tbar: [{
			xtype: 'tbtext',
			text: ''
		}],		
		columns: [new Ext.grid.RowNumberer(),{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Pilih',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'resources/img/icons/fam/accept.png',
					
					tooltip: 'Pilih baris',
					
                    handler: function(grid, rowIndex) {
						masuk(grid, rowIndex);
                    }
                }]
        },{
			header: 'No Registrasi',
			width: 100,
			dataIndex: 'registrasi.noreg',
			sortable: true			
		},{
			header: 'No Order Ruangan',
			width: 100,
			dataIndex: 'oruangan.nooruangan',
			sortable: true			
		},{
			header: 'Tanggal Order Ruangan',
			width: 150,
			dataIndex: 'tgloruangan',
			sortable: true			
		},{
			header: 'Jam Order Ruangan',
			width: 125,
			dataIndex: 'jamoruangan',
			sortable: true			
		},{
			header: 'Tanggal Rencana Masuk',
			width: 150,
			dataIndex: 'tglrencanamasuk',
			sortable: true		
				
		},{
			header: 'No. RM',
			width: 100,
			dataIndex: 'norm',
			sortable: true			
		},{
			header: 'Nama Pasien',
			width: 150,
			dataIndex: 'nmpasien',
			sortable: true			
		},{
			header: 'Kamar',
			width: 75,
			dataIndex: 'nmkamar',
			sortable: true			
		},{
			header: 'Bed',
			width: 75,
			dataIndex: 'nmbed',
			sortable: true			
		},{
			header: 'Catatan',
			width: 125,
			dataIndex: 'oruangan.catatan',
			sortable: true			
		}],
		bbar: paging
	});	
	
	var grid_stbed = new Ext.grid.GridPanel({
		id: 'grid_stbed',
		store: ds_stbed,
		height: 350,
		frame: true,		
		columnLines: true,	
		plugins: cari_stbed,	
		pageSize: pageSize,
		forceFit: true,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		tbar: [{
			xtype: 'tbtext',
			text: ''
		}],		
		columns: [new Ext.grid.RowNumberer(),{
			header: 'Kelas Perawatan',
			width: 100,
			dataIndex: 'nmklsrawat',
			sortable: true			
		},{
			header: 'Nama Kamar',
			width: 100,
			dataIndex: 'nmkamar',
			sortable: true			
		},{
			header: 'Bed',
			width: 50,
			dataIndex: 'nmbed',
			sortable: true			
		},{
			header: 'Status Bed',
			width: 100,
			dataIndex: 'nmstbed',
			sortable: true			
		},{
			header: "Tanggal Masuk",
			width: 100, 
			sortable: true,
			dataIndex: 'tglmasuk'
		},{
			header: "Jam Masuk",
			width: 75, 
			sortable: true,
			dataIndex: 'jammasuk'
		},{
			header: "Lama (Hari,Jam)",
			width: 130, 
			sortable: true,
			renderer: function(value, p, r){
					if(r.data['hari'] && r.data['jam']){
						return r.data['hari'] + ' Hari, ' + r.data['jam'] + ' Jam';	
					};
				} 
		},{
			header: "Nama Pasien",
			width: 150, 
			sortable: true,
			dataIndex: 'nmpasien'
		},{
			header: "Nama Dokter",
			width: 150, 
			sortable: true,
			dataIndex: 'nmdokter'
		},{
			header: "Tgl. Rencana Keluar",
			width: 150, 
			sortable: true,
			dataIndex: 'tglrencanakeluar'
		}],
		bbar: paging_stbed
	});	
	
	
	/*	 
	 * Main Layout Declaration
	 * */		
	var main_form = new Ext.form.FormPanel({		
		id: 'form_bp_general2',
		region: 'center',
		bodyStyle: 'padding: 5px;',		
		border: false,
		title: 'REGISTRASI PASIEN MASUK',
		autoScroll: true,
		tbar: [
			'->',
			{
					xtype: 'tbtext',
					text: 'Lokasi Kerja',
			},{			
				xtype: 'combo',
				width: 200,
				height: 50,			
				allowBlank: false,
				store: ds_bagian,
				id: 'combox',
				name: 'combox',
				triggerAction: 'all',
				editable: false,
				valueField: 'idbagian',
				displayField: 'nmbagian',
				forceSelection: true,
				submitValue: true,
				hiddenName: 'h_combox',
				fieldLabel:'Lokasi Kerja',
				typeAhead: true,
				mode: 'local',
				emptyText: 'Pilih...',			
				selectOnFocus: true,
				listeners: {
					'select' : comboEvent
				}		
		}],
		items: [{
			xtype:'fieldset',            
            title: 'Daftar Registrasi/Order Ruangan:',
            layout: 'fit',            
            items :[{
                    layout: 'form',
                    border: false,
                    items: [grid_registrasi]
            }]            
		},{
			xtype:'fieldset',            
            title: 'Informasi Status Bed Per Ruangan:',
            layout: 'fit',            
            items :[{
                    layout: 'form',
                    border: false,
                    items: [grid_stbed]
            }]
		}]
	});
	//Main Layout
	SET_PAGE_CONTENT(main_form);
	
	/*	 
	 * Event Handler 
	 * */
	function comboEvent(){				
		var isi = Ext.getCmp('combox').getValue();				
		//Ext.MessageBox.alert("Combo", isi);		
		ds_regis.clearFilter();		
		ds_regis.filter('idbagian',isi);
	}
	function masuk(grid, record){
		var rec = ds_test.getAt(record);
		var record = grid.getStore().getAt(record);
		
		Update(true,grid,record);
	}
	
	function Update(isUpdate,grid,record){
		var winTitle = 'Masuk Ruangan/Kamar/Bed';
		var reg_form = new Ext.form.FormPanel({
			xtype:'form',
        id: 'frm.agama',
        buttonAlign: 'left',
		labelWidth: 150, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 200, width: 500,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [     
		{
            id: 'tf.frm.noregis', 
            hidden: true,
        },    
		{
            id: 'tf.frm.noreg', 
            fieldLabel: 'No. Registrasi',
			readOnly : true,
			style: 'opacity: 0.6',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmpasien', 
            fieldLabel: 'Nama Pasien',
			readOnly : true,
			style: 'opacity: 0.6',
            width: 300, allowBlank: false,        
        },{
			id: 'tf.frm.klsperawatan',
			fieldLabel: 'Kelas Perawatan',
			readOnly : true,
			style: 'opacity: 0.6',
			width: 300, allowBlank:false,
		},{
			id: 'tf.frm.ruangan',
			fieldLabel: 'Ruangan',
			readOnly : true,
			style: 'opacity: 0.6',
			width: 300, allowBlank: false,
		}],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveAgama();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wAgama.close();
            }
        }]
    });
		
    var wAgama = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [reg_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setRegForm(isUpdate, record);
	wAgama.show();
	
/* form Funtion */

function setRegForm(isUpdate, record){
	if(isUpdate){
		if(record != null){
			RH.setCompValue('tf.frm.noreg',record.get('registrasi.noreg'));
			RH.setCompValue('tf.frm.nmpasien',record.get('nmpasien'));
			RH.setCompValue('tf.frm.klsperawatan',record.get('nmklsrawat'));
			
			RH.setCompValue('tf.frm.ruangan',record.get('nmkamar'));
			
			return;
		}
	}
}

	}
}
