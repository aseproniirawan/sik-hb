function PPpensupplier(){
Ext.form.Field.prototype.msgTarget = 'side';
	var ds_pensupplier = dm_pensupplier();
	var ds_pensupplierdet = dm_pensupplierdet();
	var ds_carihrgbrgsup = dm_carihrgbrgsup();
	
	var arr_cari = [['nopp', 'No. PP'],['nmstsetuju', 'Status']];
	
	var ds_cari = new Ext.data.ArrayStore({
		fields: ['id', 'nama'],
		data : arr_cari 
	});
	
	var arr_cari2 = [['nmsupplier', 'Nama Supplier']];
	
	var ds_carisup = new Ext.data.ArrayStore({
		fields: ['ids', 'namas'],
		data : arr_cari2 
	});
	
	var paging_head = new Ext.PagingToolbar({
		pageSize: 20,
		store: ds_pensupplier,
		displayInfo: true,
		displayMsg: 'Data {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
		
	var grid_head = new Ext.grid.GridPanel({
		id: 'grid_head',
		store: ds_pensupplier,		
		autoScroll: true,
		//autoHeight: true,
		columnLines: true,
		height: 200,
		//plugins: cari_pelayanan,
		tbar: [{
			xtype: 'textfield',
			id:'tf.searchppdet',
			width: 100,
			hidden: true,
			validator: function(){
				ds_pensupplierdet.setBaseParam('nopp', Ext.getCmp('tf.searchppdet').getValue());
				//Ext.getCmp('grid_detail').store.reload();
				ds_pensupplierdet.reload({
					scope   : this,
					callback: function(records, operation, success) {
						ds_pensupplierdet.each(function (rec) {
							Ext.getCmp("tf.reckdbrg").setValue(parseFloat(rec.get('kdbrg')));
						});
					}
				});
			}				
		}],
		//sm: sm_nya,
		frame: true,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'No. PP',
			dataIndex: 'nopp',			
			sortable: true,
			width: 120
		},{
			header: 'Tanggal PP',
			dataIndex: 'tglpp',
			width: 100,
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},{
			header: 'Bagian PP',
			dataIndex: 'nmbagian',
			width: 250,
			sortable: true,
		},{
			header: 'Status',
			dataIndex: 'nmstsetuju',
			width: 150,
			sortable: true,
		}],
		bbar: paging_head,
		listeners: {
			rowclick: function(grid, rowIndex, columnIndex){
				var record = grid.getStore().getAt(rowIndex);
				/* Ext.getCmp('tf.searchppdet').setValue(record.data['nopp']);
				Ext.getCmp('tf.searchppbrg').setValue(record.data['idstsetuju']); */
				
				var rec_idstsetuju = record.data['idstsetuju'];
				if (rec_idstsetuju != 2){
					Ext.getCmp('tf.searchppdet').setValue();
					Ext.MessageBox.alert('Informasi', 'Status Belum Disetujui');
				}else{
					Ext.getCmp('tf.searchppdet').setValue(record.data['nopp']);
				}
				return;
			}
		}
	});
	
	/* function Addrecord(grid, rowIndex, columnIndex){
		var record = grid.getStore().getAt(rowIndex);
		Ext.getCmp('tf.kdbrg').setValue(record.data['kdbrg']);
	} */
	
	var paging_detail = new Ext.PagingToolbar({
		pageSize: 18,
		store: ds_pensupplierdet,
		displayInfo: true,
		displayMsg: 'Data Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var vw_grid_detail = new Ext.grid.GridView({
		emptyText: '< Belum ada Data >'
	});
	
	var grid_detail = new Ext.grid.GridPanel({
		id: 'grid_detail',
		store: ds_pensupplierdet,
		view: vw_grid_detail,
		autoScroll: true,
		tbar: [{
			xtype: 'textfield',
			id:'tf.reckdbrg',
			width: 100,
			hidden: true,
			/* validator: function(){
				ds_pensupplierdet.setBaseParam('nopp', Ext.getCmp('tf.searchppdet').getValue());
				Ext.getCmp('grid_detail').store.reload();
			}	 */			
		}],
		//autoHeight: true,
		columnLines: true,
		height: 210,
		//plugins: cari_pelayanan,
		//sm: sm_nya,
		frame: true,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode Barang ',
			dataIndex: 'kdbrg',
			width: 100,
			sortable: true,
		},{
			header: 'Nama Barang',
			dataIndex: 'nmbrg',
			width: 230,
			sortable: true,
		},{
			header: 'Satuan',
			dataIndex: 'nmsatuan',
			width: 100,
			sortable: true,
		},{
			header: 'Qty',
			dataIndex: 'qty',
			width: 100,
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
		},{
			header: 'Supplier',
			dataIndex: 'nmsupplier',
			width: 220,
			sortable: true,
		},{
			header: 'Mata Uang',
			dataIndex: 'nmmatauang',
			width: 100,
			sortable: true,
		},{
			header: 'Harga',
			dataIndex: 'harga',
			width: 100,
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),

		},{
			xtype: 'checkcolumn',
			header: '<center>Pilih</center>',
			width: 50,
			dataIndex: 'pilih',
			sortable: true,
			editor:{
				xtype: 'checkbox',
				id:'cbpilih',
				listeners: {
					change: function() {
							var selectedValues = []; //Array of selected values 
							this.items.each(function(checkbox){
								if(checkbox.checked)
									//selectedValues.push(checkbox.inputValue);
									alert('AAA');
							});                                    
							/* var allSelected = selectedValues.indexOf('pilih') >= 0; //Whether the 'ALL' option was selected           
							Store1.filterBy(function(record){
							   //If all was selected or if the name is included in the selectedValues, include the item in the filter
							   return allSelected || selectedValues.indexOf(record.get('Name')) >= 0;                                         
							}); */
					}
				}
			}
		}],
		bbar: paging_detail,
		listeners: {
			rowdblclick: Add
		}
		
	});
	
	function Add(grid, record){
		var record = ds_pensupplierdet.getAt(record);
		wEntryPensupplier(true, grid, record);	
		var searchkdbrg = RH.getCompValue('tf.kdbrg', true);
		if(searchkdbrg != ''){
			RH.setCompValue('tf.searchkdbrg', searchkdbrg);
		}
		return;
	}
	
	function fnSearchgrid(){
		ds_pensupplier.setBaseParam('chb_periode', Ext.getCmp('chb.periode').getValue());
		ds_pensupplier.setBaseParam('chb_nopp', Ext.getCmp('chb.nopp').getValue());
		
		ds_pensupplier.setBaseParam('tglawal', Ext.getCmp('tglawal').getValue());
		ds_pensupplier.setBaseParam('tglakhir', Ext.getCmp('tglakhir').getValue());
		
		var idcombo, nmcombo;
		idcombo= Ext.getCmp('cb.search').getValue();
		nmcombo= Ext.getCmp('cek').getValue();
			ds_pensupplier.setBaseParam('key',  '1');
			ds_pensupplier.setBaseParam('id',  idcombo);
			ds_pensupplier.setBaseParam('name',  nmcombo);
		ds_pensupplier.load();
	}
	
	var form_penseupplier = new Ext.form.FormPanel({
		id: 'form_penseupplier',
		title: 'Penetapan Seupplier', iconCls:'silk-calendar',
		width: 900, Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		//tbar: [],
		tbar: [
			{ text: 'Cari', id:'btn.cari', iconCls: 'silk-find', handler: function() {
			
				var interval =DateDiff(Ext.getCmp('tglawal').getValue(), Ext.getCmp('tglakhir').getValue());
				
				if (Ext.getCmp('chb.periode').getValue()==true) {
					if (interval < 0) {
					Ext.MessageBox.alert('Informasi', 'Format Tanggal Tidak Valid');
					return false
					}
				}
					fnSearchgrid();
				
				}
			},'-',
			{ text: 'Cetak', id:'btn.simpan', iconCls: 'silk-printer', handler: function(){} }
		],
		items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.52,
			//defaults: { labelWidth: 87, labelAlign: 'right'},
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: '',
				layout: 'form',
				height: 60,
				boxMaxHeight:80,
				items: [{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: 0.99,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_tgl',
							items:[{
								xtype: 'checkbox',
								id:'chb.periode',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tglawal').enable();
											Ext.getCmp('tglakhir').enable();
										} else if(val == false){
											Ext.getCmp('tglawal').disable();
											Ext.getCmp('tglakhir').disable();
										}
									}
								}
							},{
								xtype: 'label', id: 'lb.lb', text: 'Periode Tanggal PP', margins: '3 10 0 0',
							},{
								xtype: 'datefield',
								id: 'tglawal',
								value: new Date().format('d/m/Y'),
								format: "d/m/Y",
								width: 150, disabled: true
							},
							{
								xtype: 'label', id: 'lb.lbt', text: 's/d', margins: '3 4 0 0',
							},
							{
								xtype: 'datefield',
								id: 'tglakhir',
								value: new Date().format('d/m/Y'),
								format: "d/m/Y",
								width: 150, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_nopp',
							items:[{
								xtype: 'checkbox',
								id:'chb.nopp',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cek').enable();
											Ext.getCmp('cb.search').enable();
										} else if(val == false){
											Ext.getCmp('cek').disable();
											Ext.getCmp('cb.search').disable();
											Ext.getCmp('cek').setValue('');
											Ext.getCmp('cb.search').setValue('');
										}
									}
								}
							},{
								xtype: 'label', id: 'lb.lbl', text: 'Pencarian', margins: '3 65px 0 0',
							},{
								xtype: 'combo',
								id: 'cb.search', width: 150, 
								store: ds_cari, 
								valueField: 'id', displayField: 'nama',
								editable: false, triggerAction: 'all',
								forceSelection: true, submitValue: true, mode: 'local',
								emptyText:'Pilih...', disabled: true,
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
								width: 230,
								disabled: true,
								validator: function(){
									var cek = Ext.getCmp('cek').getValue();
									if(cek == ''){
										fnSearchgrid();
									}
									return;
								}
							}]
						}]
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
				title: '',
				layout: 'form',
				height: 210,
				boxMaxHeight:225,
				items: [grid_head]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 1,
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Detail Permintaan Barang',
				layout: 'form',
				height: 230,
				boxMaxHeight:245,
				items: [grid_detail]
			}]
		}]
	});
	SET_PAGE_CONTENT(form_penseupplier);
	
	function DateDiff(date1,date2) {
		return date2.getTime() - date1.getTime();
	}
	
	function wEntryPensupplier(isUpdate, grid, record){		
		
		var paging_hrgbrgsup = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_carihrgbrgsup,
			displayInfo: true,
			displayMsg: 'Data Daftar Harga Supplier Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
				
		var grid_carisup = new Ext.grid.GridPanel({
			id: 'grid_carisup',
			store: ds_carihrgbrgsup,
			autoScroll: true,
			columnLines: true,
			tbar: [{
			xtype: 'textfield',
			id: 'tf.searchkdbrg',
			width: 100,
			hidden: true,
			validator: function(){
				ds_carihrgbrgsup.setBaseParam('kdbrg', Ext.getCmp('tf.searchkdbrg').getValue());
				ds_carihrgbrgsup.reload();
			}
			}],
			height: 189,
			//plugins: cari_pelayanan,
			//sm: sm_nya,
			frame: true,
			columns: [new Ext.grid.RowNumberer(),
			{
				header: 'Nama Supplier',
				width: 250,
				dataIndex: 'nmsupplier',
				sortable: true
			},{
				header: 'Mata Uang',
				width: 100,
				dataIndex: 'nmmatauang',
				sortable: true
			},{
				header: 'Harga',
				width: 100,
				dataIndex: 'harga',
				sortable: true,
				align:'right',
				renderer: Ext.util.Format.numberRenderer('0,000.00'),
			},		
			{
				header: 'Tanggal Efektif',
				width: 100,
				dataIndex: 'tglefektif',
				sortable: true,
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			}],
			bbar: paging_hrgbrgsup,
			listeners: {
				rowdblclick: klik_update
			}
		});
		
		var paging_riwayatpo = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_carihrgbrgsup,
			displayInfo: true,
			displayMsg: 'Data Rowayat PO Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var grid_riwayatpo = new Ext.grid.GridPanel({
			id: 'grid_riwayatpo',
			store: ds_carihrgbrgsup,
			autoScroll: true,
			columnLines: true,
			tbar: [{
				text: 'Tampilkan Riwayat PO',
				id: 'btn_trpo',
			}],
			height: 180,
			//plugins: cari_pelayanan,
			//sm: sm_nya,
			frame: true,
			columns: [new Ext.grid.RowNumberer(),
			{
				header: 'No. PO',
				width: 120,
				dataIndex: '',
				sortable: true
			},{
				header: 'Tanggal PO',
				width: 100,
				dataIndex: '',
				sortable: true,
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			},{
				header: 'Bagian',
				width: 200,
				dataIndex: '',
				sortable: true
			},{
				header: 'Qty',
				width: 100,
				dataIndex: '',
				sortable: true,
				align:'right',
				renderer: Ext.util.Format.numberRenderer('0,000.00'),
			},		
			{
				header: 'Tanggal Kirim',
				width: 100,
				dataIndex: '',
				sortable: true,
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			}],
			bbar: paging_riwayatpo		
		});
		
		var pensupplier_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.pensupplier',
			buttonAlign: 'left',
			autoScroll: true,
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:5px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 603, width: 743,
			layout: {
				type: 'form',
				pack: 'center',
				align: 'center'
			},
			frame: true,	
			items: [{
				xtype: 'fieldset', title: 'Filter',
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Kode Barang',
					id: 'tf.kdbrg', 
					width: 200,
					readOnly: true,
					style : 'opacity:0.6',
				},{
					xtype: 'textfield',
					fieldLabel: 'Nama Barang',
					id: 'tf.nmbrg', 
					width: 200,
					readOnly: true,
					style : 'opacity:0.6',							
				},{
					xtype: 'combo',
					id: 'cb.carisup', width: 150, 
					store: ds_carisup, 
					valueField: 'ids', displayField: 'namas',
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true,
					mode: 'local', value: 'nmsupplier',	hidden: true			
				},{
					xtype: 'compositefield',
					id: 'com_add',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Supplier',
						id: 'tf.nmsupplier', 
						width: 200,
					},{ 
						xtype: 'button',
						text: 'Cari',
						id:'btn_cari',
						iconCls: 'silk-find',
						handler: function() {
							fncari();
						}
					},{ 
						xtype: 'button',
						text: 'Keluar',
						id:'btn_keluar',
						iconCls:'silk-arrow-undo',
						style: 'marginLeft: 3px',
						handler: function() {
							Ext.getCmp('tf.nmsupplier').setValue();
							fncari();
							wPensupplier.close();
						}
					}]
				}]
			},{
				xtype: 'fieldset',
				title: 'Daftar Harga Supplier',
				layout: 'form',
				items: [grid_carisup]
			},{
				xtype: 'fieldset',
				title: 'Riwatay PO',
				layout: 'form',
				items: [grid_riwayatpo]
			}
			]
		});
			
		var wPensupplier = new Ext.Window({
			title: 'Penetapan Supplier',
			modal: true, closable:false,
			items: [pensupplier_form]
		});
		
		function fncari(){
			var idcombo, nmcombo;
			idcombo= Ext.getCmp('cb.carisup').getValue();
			nmcombo= Ext.getCmp('tf.nmsupplier').getValue();
				ds_carihrgbrgsup.setBaseParam('key',  '1');
				ds_carihrgbrgsup.setBaseParam('id',  idcombo);
				ds_carihrgbrgsup.setBaseParam('name',  nmcombo);
			ds_carihrgbrgsup.load();
		}
	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setPensupplierForm(isUpdate, record);
		wPensupplier.show();

	/**
	FORM FUNCTIONS
	*/	
		function setPensupplierForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.kdbrg', record.get('kdbrg'));
					RH.setCompValue('tf.nmbrg', record.get('nmbrg'));
					RH.setCompValue('tf.nmsupplier', record.get('nmsupplier'));
					return;
				}
			}
		}
		
		function klik_update(grid, rowIdx){
			var rec_id = ds_carihrgbrgsup.getAt(rowIdx);
			var idhrgbrgsup = rec_id.data["idhrgbrgsup"];
			var kdbrg = rec_id.data["kdbrg"];
			var nopp = rec_id.data["nopp"];
			Ext.Ajax.request({
				url: BASE_URL + 'pensupplier_controller/update_pendetidhrgbrgsup',
				params: {
					nopp		: nopp,
					kdbrg		: kdbrg,
					idhrgbrgsup : idhrgbrgsup
				},
				success: function() {
					//Ext.Msg.alert("Info", "Ubah Berhasil");
					ds_pensupplierdet.reload();
					wPensupplier.close();
				},
				failure: function() {
					//Ext.Msg.alert("Info", "Ubah Data Gagal");
				}
			});
		}
					
	}		

}