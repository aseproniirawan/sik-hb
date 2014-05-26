function PIinfojpraktekdokter(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 22;
	var ds_infojpraktekdokter = dm_infojpraktekdokter();
	var ds_dokter = dm_dokter();
	var ds_bagian = dm_bagian();
	var ds_hari = dm_hari();
	var ds_shift = dm_shift();
	var ds_jampraktek = dm_jampraktek();
	
	var arr_cari = [['nmbagian', 'Unit Pelayanan'],['nmdoktergelar', 'Nama Dokter']];
	
	var ds_cari = new Ext.data.ArrayStore({
		fields: ['id', 'nama'],
		data : arr_cari 
	});
	
	var cari_data = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'remote',
		width: 200
	})];
	
	var paging = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_infojpraktekdokter,
		displayInfo: true,
		displayMsg: 'Data Info Jadwal Praktek Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	function fnSearchgrid(){
		var idcombo, nmcombo;
		idcombo= Ext.getCmp('cb.search').getValue();
		nmcombo= Ext.getCmp('cek').getValue();
			ds_infojpraktekdokter.setBaseParam('key',  '1');
			ds_infojpraktekdokter.setBaseParam('id',  idcombo);
			ds_infojpraktekdokter.setBaseParam('name',  nmcombo);
		ds_infojpraktekdokter.load(); 
	}
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'gp.jadwalpraktek',
		store: ds_infojpraktekdokter,		
		autoScroll: true,
		//autoHeight: true,
		height: 610,
		columnLines: true,
		//plugins: cari_data,
		tbar: [{
			xtype: 'compositefield',
			style: 'padding: 5px; margin: 3px 0 0 15px',
			width:568,
			items: [{
				xtype: 'label', id: 'lb.dkr', text: 'Cari Berdasarkan :', margins: '3 10 0 5',
			},{
				xtype: 'combo',
				store: ds_cari,
				id: 'cb.search',
				triggerAction: 'all',
				editable: false,
				valueField: 'id',
				displayField: 'nama',
				forceSelection: true,
				submitValue: true,
				typeAhead: true,
				mode: 'local',
				emptyText:'Pilih...',
				selectOnFocus:true,
				width: 150,
				listeners: {
					select: function() {
						var cbsearchh = Ext.getCmp('cb.search').getValue();
							if(cbsearchh != ''){
								Ext.getCmp('cek').enable();
								Ext.getCmp('cek').focus();
							}
							return;
					}
				}

			},{
				xtype: 'textfield',
				id: 'cek',
				width: 245,
				validator: function(){
					var cek = Ext.getCmp('cek').getValue();
					if(cek == ''){
						fnSearchgrid();
					}
					return;
				}
			},
			{
				xtype: 'button',
				text: 'Cari',
				iconCls: 'silk-find',
				id: 'btn_data',
				width: 3,
				handler: function() {
					var cbsearch = Ext.getCmp('cb.search').getValue();
					var cek = Ext.getCmp('cek').getValue();
						if(cbsearch != ''){
							if(cek != ''){
								fnSearchgrid();
							}else if(cek == ''){
								Ext.MessageBox.alert('Message', 'Isi Data Yang Akan Di Cari..!');
							}
						}else if(cbsearch == ''){
							Ext.MessageBox.alert('Message', 'Cari Berdasarkan Belum Di Pilih..!');
						}
						return;
				}
			}]
		},
		/* {
			xtype: 'textfield',
			id: 'tf.iddokter',
			width: 70,
			emptyText: 'iddokter',
			hidden: true,
		},  */
		
		{ 	text: 'Cetak', id:'bt.cetak', iconCls: 'silk-printer',
			handler: function(){
				//Ext.MessageBox.confirm('Informasi', 'Cetak Data..?');
				if (grid_nya.getStore().getCount() == 0) {
					Ext.MessageBox.alert("Informasi", "Data Kosong");
				}else{
					//Ext.MessageBox.confirm('Informasi', 'Cetak Data..?');
					var parsing = '';
						parsing = parsing + Ext.getCmp('cb.search').getValue() + 'istra' ;
						parsing = parsing + Ext.getCmp('cek').getValue() + 'istra' ;
					
					var win = window.open();
					win.location.reload();
					win.location = BASE_URL + 'print/print_topdf/infojpraktekdokter/'+parsing;
					
				}
			}
		},
		{ 	
			xtype: 'tbfill'
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Unit Pelayanan',
			width: 147,
			dataIndex: 'nmbagian',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmdoktergelar',
			sortable: true
		},
		{
			header: 'Senin',
			width: 87,
			dataIndex: 'senin',
			sortable: true
		},
		{
			header: 'Selasa',
			width: 87,
			dataIndex: 'selasa',
			sortable: true
		},
		{
			header: 'Rabu',
			width: 87,
			dataIndex: 'rabu',
			sortable: true
		},
		{
			header: 'Kamis',
			width: 87,
			dataIndex: 'kamis',
			sortable: true
		},
		{
			header: 'Jumat',
			width: 87,
			dataIndex: 'jumat',
			sortable: true
		},
		{
			header: 'Sabtu',
			width: 87,
			dataIndex: 'sabtu',
			sortable: true
		},
		{
			header: 'Minggu',
			width: 87,
			dataIndex: 'minggu',
			sortable: true
		},
		/* {
			header: 'Shift',
			width: 80,
			dataIndex: 'nmshift',
			sortable: true
		}, 
		{
			header: 'Jam Praktek',
			width: 80,
			dataIndex: 'jampraktek',
			sortable: true
		},*/
		{
			header: 'Keterangan',
			width: 300,
			dataIndex: 'catatan',
			sortable: true
		}],
		//bbar: paging,
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Info Jadwal Praktek Dokter', iconCls:'silk-calendar',
		layout: 'fit',
		items: [
		{
			xtype: 'panel',
			border: false,
			items: [{
				layout: 'form',
				border: false,
				items: [grid_nya]
			}]
		}],
		listeners: {
			afterrender: baru
		}
	});
	SET_PAGE_CONTENT(form_bp_general);
/** 
FUNCTIONS
*/
	function baru(){
		Ext.getCmp('cek').disable();
	}
	
	/* function parentdokter(){
		var cm_dokter_parent = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'iddokter',
				width: 30
			},{
				header: 'Kode',
				dataIndex: 'kddokter',
				width: 100
			},{
				header: 'Nama Dokter Gelar',
				dataIndex: 'nmdoktergelar',
				width: 300
			}
		]);
		var sm_dokter_parent = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_dokter_parent = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_dokter_parent = new Ext.PagingToolbar({
			pageSize: 22,
			store: ds_dokter,
			displayInfo: true,
			displayMsg: 'Data Dokter Paket Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_dokter_parent = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1000,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_dokter_parent = new Ext.grid.GridPanel({
			ds: ds_dokter,
			cm: cm_dokter_parent,
			sm: sm_dokter_parent,
			view: vw_dokter_parent,
			height: 350,
			width: 430,
			plugins: cari_dokter_parent,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			autoScroll: true,
			buttonAlign: 'left',
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: paging_dokter_parent,
			listeners: {
				rowdblclick: klik_dokter_parent
			}
		});
		var win_find_dokter_parent = new Ext.Window({
			title: 'Dokter',
			modal: true,
			items: [grid_find_dokter_parent]
		}).show();

		function klik_dokter_parent(grid, rowIdx){
			var rec_dokter_parent = ds_dokter.getAt(rowIdx);
			var var_iddokter_parent = rec_dokter_parent.data["iddokter"];
			var var_nmdokter_parent = rec_dokter_parent.data["nmdoktergelar"];
						
			//Ext.getCmp('tf.frm.pen_nmpaket').focus()
			Ext.getCmp("tf.iddokter").setValue(var_iddokter_parent);
			Ext.getCmp("tf.nmdokter").setValue(var_nmdokter_parent);
			
			ds_infojpraktekdokter.setBaseParam('iddokter',var_iddokter_parent);
			ds_infojpraktekdokter.reload();
						win_find_dokter_parent.close();
		}
	} */
}