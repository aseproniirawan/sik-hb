function u6_userlog() {
	var tgl_aktivitas;
	var ds_logpengguna = dm_logpengguna();
	
	var cm_log_pengguna = new Ext.grid.ColumnModel([{
		header: 'Id Log',
		dataIndex: 'idlog',
		width: 90
	},
	{
		header: 'User Id',
		dataIndex: 'userid',
		width: 90
		//                ,
		//		renderer: function(v) {
		//			var d = new Date(v);
		//			return d.format('d/m/Y');
		//		}
	},
	{
		header: 'Nama Lengkap',
		dataIndex: 'userid',
		width: 135,
		hidden: false
	},
	{
		header: 'Tanggal & Jam Masuk',
		dataIndex: 'tglmasuk',
		width: 105,
		hidden: false
	},
	{
		header: 'Tanggal & Jam Keluar',
		dataIndex: 'tglkeluar',
		width: 100,
		hidden: false
	},
	{
		header: 'Ip Address',
		dataIndex: 'ipaddress',
		width: 110,
		hidden: true
	},
	{
		header: 'Status',
		dataIndex: 'idstatus',
		width: 100
	}]);
	var sm_log_pengguna = new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {
			rowselect: sale_detail_select
		}
	});

	function sale_detail_select() {
		var rec_fm = sm_log_pengguna.getSelected();
		var id_produk = sm_log_pengguna.getSelected().data['no_order'];
		tgl_aktivitas = sm_log_pengguna.getSelected().data['tglmasuk'];
		grid_detail_act.setTitle('Detail Aktivitas Per Tanggal ' + tgl_aktivitas, 'Detail Aktivitas Per Tanggal ');
		//	Ext.getCmp('btn_print').enable();
		ds_detail_act.setBaseParam('no_order', rec_fm.data['no_order']);
		ds_detail_act.load();
	}
	var vw_log_pengguna = new Ext.grid.GridView({
		emptyText: '< No data to display >',
		forceFit: true
	});
	var paging_log_pengguna = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_logpengguna,
		displayInfo: true,
		displayMsg: 'Displaying co list {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var paging_detail_act = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_logpengguna,
		displayInfo: true,
		displayMsg: 'Displaying co list {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var cari_data_co = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		//readonlyIndexes : ['nama_pemohon'],
		position: 'top',
		mode: 'local',
		width: 200
	})];
	var grid_co = new Ext.grid.GridPanel({
		title: 'Log Pengguna',
		id: 'grid_log_pengguna',
		margins: '0 0 5 0',
		plugins: cari_data_co,
		border: true,
                frame: true,
		autoWidth: true,
		store: ds_logpengguna,
		cm: cm_log_pengguna,
		sm: sm_log_pengguna,
		view: vw_log_pengguna,
		region: "center",
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdgallery: false,
		columnLines: true,
		loadMask: true,
		buttonAlign: 'left',
		layout: "fit",
		height: 550,
		tbar: [{
			xtype: 'radio',
			fieldLabel: 'Tanggal Masuk',
			id: 'rtglmasuk',
			name: 'rtglmasuk',
			checked: true,
			listeners: {
            check : function(cb, value) {
                                if (value) Ext.getCmp('rtglkeluar').setValue(false)
                           }
        }
		},'Tanggal Masuk',
		{text: ''},
		{
			xtype: 'radio',
			fieldLabel: 'Tanggal Keluar',
			id: 'rtglkeluar',
			name: 'rtglkeluar',
			listeners: {
            check : function(cb, value) {
                                if (value) Ext.getCmp('rtglmasuk').setValue(false);
                           }
		}
		},'Tanggal Keluar',
		{text: ''},{text: '|'},{text: ''},
		{
			xtype: 'datefield',
			fieldLabel: 'Tanggal Order',
			name: 'tglorder',
			id: 'tglorder',
			value: new Date().format('d/m/Y'),
			format: "d/m/Y",
			width: 120,
			listeners: {}
		}, ' s/d ',
		{
			xtype: 'datefield',
			fieldLabel: 'Tanggal Order',
			name: 'tglselesai',
			id: 'tglselesai',
			value: new Date().format('d/m/Y'),
			format: "d/m/Y",
			width: 120,
			listeners: {}
		},
		{
			xtype: 'button',
			text: ' Cari ',
			id: 'btn_cari',
			handler: function() {
				var interval =DateDiff(Ext.getCmp('tglorder').getValue(), Ext.getCmp('tglselesai').getValue());
				
				if (interval < 0) {
					Ext.MessageBox.alert('Informasi', 'Format Tanggal Tidak Valid');
				} else {
			
					if (Ext.getCmp('rtglmasuk').getValue() == true) {
						ds_logpengguna.setBaseParam('rtglmasuk',1);
						ds_logpengguna.setBaseParam('rtglkeluar',0);
					} else {
						ds_logpengguna.setBaseParam('rtglkeluar',1);
						ds_logpengguna.setBaseParam('rtglmasuk',0);
					}
						ds_logpengguna.setBaseParam('tglmasuk', Ext.getCmp('tglorder').getValue());
						ds_logpengguna.setBaseParam('tglkeluar', Ext.getCmp('tglselesai').getValue());
						ds_logpengguna.load();
				
				}
			}
		}, '->'],
		bbar: ['->', paging_log_pengguna, ]
	});
	// ========================================== sale_detail =====================================================================================================
	var search_detail_act = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		disableIndexes: [''],
		autoFocus: true,
		position: 'top',
		mode: 'local',
		width: 200
	})];
	var sm_detail_act = new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {
			rowdblclick: function(sm_log_pengguna, index, record) {
				ppa_form();
			}
		}
	});
	var vw_detail_act = new Ext.grid.GridView({
		emptyText: '< No data to display >',
		forceFit: true
	});
	var ds_detail_act = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'c_master_product/gridMaster_product_detail',
			method: 'POST'
		}),
		baseParams: {
			start: 0,
			limit: 50,
			opener: 'list_pencairan'
			//            ,id_cabang:BRANCH_ID
		},
		root: 'data',
		totalProperty: 'results',
		remoteSort: true,
		autoLoad: false,
		fields: [{
			name: "no_order",
			mapping: "no_order"
		},
		{
			name: "tglorder",
			mapping: "tglorder"
		},
		{
			name: "qty",
			mapping: "qty"
		},
		{
			name: "satuan",
			mapping: "satuan"
		},
		{
			name: "harga",
			mapping: "harga"
		},
		{
			name: "untung",
			mapping: "untung"
		},
		{
			name: "modal_pertgl",
			mapping: "modal_pertgl"
		},
		{
			name: "nama_produk",
			mapping: "nama_produk"
		},
		{
			name: "petugas",
			mapping: "petugas"
		},
		{
			name: "id_produk",
			mapping: "id_produk"
		}]
	});
	var cm_detail_act = new Ext.grid.ColumnModel([{
		header: 'Nama Menu',
		dataIndex: 'nama_produk',
		width: 100,
		hidden: false
	},
	{
		header: 'Aktivitas',
		dataIndex: 'qty',
		width: 20,
		hidden: false
	},
	{
		header: '???',
		dataIndex: 'satuan',
		width: 25,
		hidden: false
	}]);
	var grid_detail_act = new Ext.grid.GridPanel({
		title: 'Detail Aktivitas',
		id: 'grid_detail_act',
		margins: '0 0 5 0',
		forceFit: true,
		border: true,
		store: ds_detail_act,
		//plugins: search_detail_act,
		cm: cm_detail_act,
		sm: sm_detail_act,
		view: vw_detail_act,
		frame: true,
		//		width: 1140,
		height: 230,
		// width  : 600,
		autoScroll: true,
		//tbar: [],
		bbar: [{
			xtype: 'tbfill'
		},
		paging_detail_act]
	});
	//==============================================================================================================
	var panel_ = new Ext.form.FormPanel({
		id: 'form_bp_general_id',
		region: 'center',
		//autoScroll: true,
		buttonAlign: 'left',
		bodyStyle: 'padding: 5px',
		border: false,
		disabled: true,
		waitMsg: 'Waiting...',
		maskDisabled: false,
		monitorValid: true,
		items: [{
			layout: 'form',
			border: false,
			items: [grid_co]/* , grid_detail_act] */
		}]
	});
	SET_PAGE_CONTENT(panel_);
	
	function DateDiff(date1,date2) {
		return date2.getTime() - date1.getTime();
	}
}