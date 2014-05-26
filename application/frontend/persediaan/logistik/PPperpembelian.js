function PPperpembelian(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_perpembelian = dm_perpembelian();
	var ds_perpembeliandet = dm_perpembeliandet();
	var ds_bagian = dm_bagian();
	var ds_stsetuju = dm_stsetuju();
	var ds_pengguna = dm_pengguna();
	var ds_brgmedis = dm_brgmedis();
	var ds_hbrgsupplier = dm_hbrgsupplier();
	var ds_idhrgbrgsup = dm_idhrgbrgsup();
	var ds_idhrgbrgsup2 = dm_idhrgbrgsup2();
	
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
		store: ds_perpembelian,
		displayInfo: true,
		displayMsg: 'Data Daftar Permintaan Pembelian Barang Medis Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var vw_grid_nya = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_perpembelian',
		store: ds_perpembelian,
		view: vw_grid_nya,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		pageSize: pageSize,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddPerpembelian();
				Ext.getCmp('btn_tmb').disable();
				Ext.getCmp('btn_simpan').enable();
				Ext.getCmp('tf.searchppdet').setValue();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'No PP',
			width: 120,
			dataIndex: 'nopp',
			sortable: true
		},
		{
			header: 'Tanggal PP',
			width: 100,
			dataIndex: 'tglpp',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Bagian',
			width: 200,
			dataIndex: 'nmbagian',
			sortable: true
		},
		{
			header: 'Status',
			width: 120,
			dataIndex: 'nmstsetuju',
			sortable: true
		},
		{
			header: 'Keterangan',
			width: 225,
			dataIndex: 'keterangan',
			sortable: true
		},
		{
			header: 'Pengguan',
			width: 130,
			dataIndex: 'nmlengkap',
			sortable: true,
		},{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Edit',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_edit.png',
					tooltip: 'Edit record',
                    handler: function(grid, rowIndex) {
						fnEditPerpembelian(grid, rowIndex);
						var searchppdet = RH.getCompValue('tf.nopp', true);
						if(searchppdet != ''){
							RH.setCompValue('tf.searchppdet', searchppdet);
							//Ext.getCmp('cb.hrgbrgsup').setValue();
						}
						var setuju = RH.getCompValue('cb.setuju', true);
						if(setuju != 1){
							Ext.getCmp('btn_tmb').disable();
							Ext.getCmp('btn_simpan').disable();
						}
						return;
                    }
                }]
        },{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Hapus',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_delete.gif',
					tooltip: 'Hapus record',
                    handler: function(grid, rowIndex) {
						fnDeletePerpembelian(grid, rowIndex);
                    }
                }]
        },{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Cetak',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_print.gif',
					tooltip: 'Cetak record',
                    handler: function(grid, rowIndex) {
						fnPrint(grid, record);
                    }
                }]
        }],
		bbar: paging
	});
	
	
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Daftar Permintaan Pembelian Barang Medis', iconCls:'silk-calendar',
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
		}]
	});
	SET_PAGE_CONTENT(form_bp_general);
/** 
FUNCTIONS
*/
	
	function reloadPerpembelian(){
		ds_perpembelian.reload();
	}
	
	function fnAddPerpembelian(){
		var grid = grid_nya;
		wEntryPerpembelian(false, grid, null);
		var userid = RH.getCompValue('tf.userid', true);
			if(userid != ''){
				RH.setCompValue('cb.user', userid);
			}
			return;
	}
	
	function fnEditPerpembelian(grid, record){
		var record = ds_perpembelian.getAt(record);
		wEntryPerpembelian(true, grid, record);		
	}
	
	function fnDeletePerpembelian(grid, record){
		var record = ds_perpembelian.getAt(record);
		var url = BASE_URL + 'perpembelian_controller/delete_perpembelian';
		var params = new Object({
						nopp	: record.data['nopp']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function fnPrint(grid, record){        
        /* var nopp = record.data['nopp'] 
		RH.ShowReport(BASE_URL + 'print/surat_biaya_kuliah/get_srtbiaya/'+nopp); */
    }

	function wEntryPerpembelian(isUpdate, grid, record){
		
		/* function fnrec(){
			ds_idhrgbrgsup.reload({
				scope   : this,
				callback: function(records, operation, success) {
					ds_idhrgbrgsup.each(function (rec) {
						Ext.getCmp("tf.recidhrgbrgsup").setValue(parseFloat(rec.get('idhrgbrgsup'))); 
					});
				}
			});
		} */
		
		var winTitle = (isUpdate)?'Daftar Permintaan Pembelian Barang Medis (Edit)':'Daftar Permintaan Pembelian Barang Medis (Entry)';
		
		var paging_brg = new Ext.PagingToolbar({
			pageSize: pageSize,
			store: ds_perpembeliandet,
			displayInfo: true,
			displayMsg: 'Data Permintaan Pembelian (PP) Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var vw_grid_perpembeliandet = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		function cariHD(){
			ds_idhrgbrgsup2.setBaseParam('kdbrg', Ext.getCmp('carikdbrg').getValue());
			ds_idhrgbrgsup2.setBaseParam('harga', Ext.getCmp('tf.recharga').getValue());
			//ds_idhrgbrgsup2.setBaseParam('tgl', Ext.getCmp('tf.recharga').getValue(), 'Y-m-d'));
			//ds_idhrgbrgsup2.reload();
			ds_idhrgbrgsup2.reload({
				scope   : this,
				callback: function(records, operation, success) {
					ds_idhrgbrgsup2.each(function (rec) {
						Ext.getCmp("tf.recidhrgbrgsup").setValue(parseFloat(rec.get('idhrgbrgsup')));
					});
				}
			});
		}
		
		var grid_perpembeliandet = new Ext.grid.EditorGridPanel({
			id: 'gp.grid_brg',
			store: ds_perpembeliandet,			
			view: vw_grid_perpembeliandet,
			columnLines: true,
			height: 225,
			pageSize: pageSize,
			clicksToEdit: 1,
			frame: true,
			tbar: [{
				text: 'Tambah',
				id: 'btn_tmb',
				iconCls: 'silk-add',
				handler: function() {
					fncariBarang();
					ds_brgmedis.load();
				}
			},{
				xtype: 'textfield',
				id:'tf.searchppdet',
				width: 100,
				hidden: true,
				validator: function(){
					ds_perpembeliandet.setBaseParam('nopp', Ext.getCmp('tf.searchppdet').getValue());
					Ext.getCmp('gp.grid_brg').store.reload();
				}				
			},{
				xtype: 'textfield',
				id:'tf.updatekdbrg',
				width: 100,
				hidden: true,				
			},{
				xtype: 'textfield',
				id:'carikdbrg',
				width: 100,
				hidden: true,	
				validator: function(){
					ds_idhrgbrgsup.setBaseParam('kdbrg', Ext.getCmp('carikdbrg').getValue());
					ds_idhrgbrgsup.reload();
				}
			},{
				xtype: 'textfield',
				id:'tf.recharga',
				width: 100,
				hidden: true,
				validator: function(){
					cariHD();
				}
			},{
				xtype: 'datefield',
				id:'tf.rectgl',
				width: 100,
				hidden: true,
				validator: function(){
					//cariHD();
				}
			},{
				xtype: 'textfield',
				id:'tf.recidhrgbrgsup',
				width: 100,
				hidden: true,
				validator: function(){					
					var idhrgbrgsup = Ext.getCmp('tf.recidhrgbrgsup').getValue();
					Ext.Ajax.request({
						url: BASE_URL + 'perpembelian_controller/update_ppdetidhrgbrgsup',
						params: {
							nopp		: Ext.getCmp('tf.searchppdet').getValue(),
							kdbrg		: Ext.getCmp('carikdbrg').getValue(),
							idhrgbrgsup : idhrgbrgsup
						},
						success: function() {
							//Ext.Msg.alert("Info", "Ubah Berhasil");
							ds_perpembeliandet.reload();
						},
						failure: function() {
							//Ext.Msg.alert("Info", "Ubah Data Gagal");
						}
					});
				}
			}],
			//sm: sm_nya,
			columns: [new Ext.grid.RowNumberer(),
			{
				header: 'Nama Barang',
				width: 250,
				dataIndex: 'nmbrg',
				sortable: true
			},
			{
				header: 'Satuan',
				width: 100,
				dataIndex: 'nmsatuan',
				sortable: true
			},
			{
				header: 'Qty',
				width: 70,
				dataIndex: 'qty',
				sortable: true,
				align:'right',
				renderer: Ext.util.Format.numberRenderer('0,000.00'),
				editor: new Ext.form.TextField({
					id: 'qty',
					enableKeyEvents: true,
					listeners: {
						change: function(){
							fnEditQty(); 
						}
					}
				})
			},
			{
				header: 'Catatan',
				width: 200,
				dataIndex: 'catatan',
				sortable: true,
				editor: new Ext.form.TextField({
					id: 'catatan',
					enableKeyEvents: true,
					listeners: {
						change: function(){
							fnEditCatatan(); 
						}
					}
				})
			},
			{
				header: 'Status',
				width: 100,
				dataIndex: 'nmstpp',
				sortable: true
			},{
				header: 'No PO',
				width: 120,
				dataIndex: 'nopo',
				sortable: true,
				hidden: true
			}/* ,{
				header: 'Supplier',
				width: 120,
				dataIndex: 'kdsupplier',
				sortable: true,
			} */,{
					xtype: 'actioncolumn',
					width: 50,
					header: 'Hapus',
					align:'center',
					items: [{
						getClass: function(v, meta, record) {
							meta.attr = "style='cursor:pointer;'";
						},
						icon   : 'application/framework/img/rh_delete.gif',
						tooltip: 'Hapus record',
						handler: function(grid, rowIndex) {
							fnHapusPerpembeliandet(grid, rowIndex);
						}
					}]
			}],
			bbar: paging_brg,
			listeners: {
				rowclick: Addrecord
			}
		});
		
		function Addrecord(grid, rowIndex, columnIndex){
			var record = grid.getStore().getAt(rowIndex);
			Ext.getCmp('tf.updatekdbrg').setValue(record.data['kdbrg']);
		}
		
		function fnHapusPerpembeliandet(grid, record){
			var record = ds_perpembeliandet.getAt(record);
			Ext.Msg.show({
				title: 'Konfirmasi',
				msg: 'Hapus data yang dipilih..?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.MessageBox.QUESTION,
				fn: function (response) {
					if ('yes' !== response) {
						return;
					}
					Ext.Ajax.request({
					url: BASE_URL + 'perpembelian_controller/delete_perpembeliandet',
					params: {				
						nopp	: record.data['nopp'], //Ext.getCmp('tf.searchppdet').getValue(),
						kdbrg	: record.data['kdbrg']
					},
					success: function(response){
						Ext.MessageBox.alert('Informasi', 'Hapus Data Berhasil');
						ds_idhrgbrgsup.reload();
						ds_perpembeliandet.reload();
						Ext.getCmp('carikdbrg').setValue();
						Ext.getCmp('tf.recidhrgbrgsup').setValue();
						Ext.getCmp('tf.recharga').setValue();
						Ext.getCmp('tf.rectgl').setValue();
					},
					failure: function() {
						//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
					}
				});
				
				}            
			});	
		}
		
		var grid_hbrgsupplier = new Ext.grid.GridPanel({
			id: 'grid_hbrgsupplier',
			store: ds_idhrgbrgsup,		
			autoScroll: true,
			autoHeight: true,
			columnLines: true,
			plugins: cari_data,
			tbar: [],
			//sm: sm_nya,
			columns: [new Ext.grid.RowNumberer(),
			{
				header: 'idhrgbrgsup',
				width: 100,
				dataIndex: 'idhrgbrgsup',
				sortable: true
			},{
				header: 'kdsupplier',
				width: 100,
				dataIndex: 'kdsupplier',
				sortable: true
			},{
				header: 'kdbrg',
				width: 100,
				dataIndex: 'kdbrg',
				sortable: true
			},{
				header: 'idmatauang',
				width: 100,
				dataIndex: 'idmatauang',
				sortable: true
			},{
				header: 'h_termurah',
				width: 150,
				dataIndex: 'h_termurah',
				sortable: true
			},{
				header: 'tgl_muda',
				width: 100,
				dataIndex: 'tgl_muda',
				sortable: true
			}]
			
		});
		
		var grid_carisup = new Ext.grid.GridPanel({
			id: 'grid_carisup',
			store: ds_idhrgbrgsup2,
			autoScroll: true,
			//autoHeight: true,
			columnLines: true,
			height: 180,
			//plugins: cari_pelayanan,
			//sm: sm_nya,
			frame: true,
			columns: [new Ext.grid.RowNumberer(),
			{
				header: 'idhrgbrgsup',
				width: 100,
				dataIndex: 'idhrgbrgsup',
				sortable: true
			},{
				header: 'kdsupplier',
				width: 100,
				dataIndex: 'kdsupplier',
				sortable: true
			},{
				header: 'kdbrg',
				width: 100,
				dataIndex: 'kdbrg',
				sortable: true
			},{
				header: 'idmatauang',
				width: 100,
				dataIndex: 'idmatauang',
				sortable: true
			},{
				header: 'Harga',
				width: 150,
				dataIndex: 'harga',
				sortable: true
			},{
				header: 'tanggal',
				width: 100,
				dataIndex: 'tglefektif',
				sortable: true
			}],			
		});
		
		var perpembelian_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.perpembelian',
			buttonAlign: 'left',
			//autoScroll: true,
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 500, width: 900,
			layout: {
				type: 'form',
				pack: 'center',
				align: 'center'
			},
			frame: false,	
			items: [{
				xtype: 'panel', layout:'fit', height:215,
				title:'Permintaan Pembelian (PP)', id:'fp.wpp', frame:true,
				items: [{
					xtype: 'fieldset', title: '', layout: 'column',
					items: [{
						columnWidth: 0.50, border: false, layout: 'form',					
						items: [{
							xtype: 'textfield',
							fieldLabel: 'No PP',
							id: 'tf.nopp', 
							width: 200,
							readOnly: true,
							style : 'opacity:0.6',							
						},{
							xtype: 'datefield',
							fieldLabel: 'Tanggal PP',
							id: 'df.tglpp',
							value: new Date(),
							width: 200
						},{
							xtype: 'combo', id: 'cb.bagian', fieldLabel: 'Bagian',
							store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
							triggerAction: 'all', forceSelection: true, submitValue: true, 
							mode: 'local', emptyText:'Pilih...', selectOnFocus:false, 
							width: 200, allowBlank: false, editable: false,
							value: 11, readOnly: true,
							style : 'opacity:0.6',
							
						},{
							xtype: 'combo', id: 'cb.setuju', fieldLabel: 'Disetujui',
							store: ds_stsetuju, valueField: 'idstsetuju', displayField: 'nmstsetuju',
							triggerAction: 'all',
							forceSelection: true, submitValue: true, mode: 'local',
							emptyText:'Pilih...', selectOnFocus:false,
							width: 200, allowBlank: false, editable: false,
							value: 1,
						}]
					},
					{
						columnWidth: 0.50, border: false, layout: 'form',
						items: [{
							xtype: 'textarea',
							fieldLabel: 'Keterangan',
							id  : 'ta.keterangan',
							width : 200,
							height: 70,
						},{
							xtype: 'combo', id: 'cb.user', 
							fieldLabel: 'User Input',
							store: ds_pengguna, triggerAction: 'all',
							valueField: 'userid', displayField: 'nmlengkap',
							forceSelection: true, submitValue: true, 
							mode: 'local', emptyText:'Pilih...', width: 200,
							editable: false,
							readOnly: true,
							style : 'opacity:0.6',
						},{
							xtype: 'textfield',
							fieldLabel: 'User Id',
							id:'tf.userid',
							width: 150,
							value: USERID,
							hidden: true,
							
						}]
					}]
				}],
				bbar: [{
					id:'btn_simpan',text: 'Simpan', iconCls:'silk-save',
					handler: function() {
							fnSavePerpembelian();						
						}
					}, 
					{
						text: 'Kembali', iconCls:'silk-arrow-undo',
						handler: function() {
							Ext.getCmp('tf.searchppdet').setValue();
							wPerpembelian.close();
							ds_perpembelian.reload();
					}
				}]
				
			},{
				xtype: 'fieldset',
				title: 'Permintaan Barang',
				layout: 'form',
				items: [grid_perpembeliandet]
			}/* ,{
				xtype: 'fieldset',
				title: '---',
				layout: 'form',
				items: [grid_hbrgsupplier]
			},{
				xtype: 'fieldset',
				title: 'AAA',
				layout: 'form',
				items: [grid_carisup]
			} */]
		});
			
		var wPerpembelian = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [perpembelian_form]
		});
		
		/* function fnDeletePerpembeliandet(grid, record){
			var record = ds_perpembeliandet.getAt(record);
			var url = BASE_URL + 'perpembelian_controller/delete_perpembeliandet';
			var params = new Object({
							nopp	: record.data['nopp'],
							kdbrg	: record.data['kdbrg']
						});
			RH.deleteGridRecord(url, params, grid );
		} */
		
		function fnEditQty(){
			var qty = Ext.getCmp('qty').getValue();
			var letters = /^[a-zA-Z]+$/;
			var simbol = /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/;
			if(qty.match(letters)){
				alert('Masukan Angka');
				ds_perpembeliandet.reload();
			} 
			else if(qty.match(simbol)){
				alert('Masukan Angka');
				ds_perpembeliandet.reload();
			} 
			else {           
				fnQty(qty);   
			}      
		}
		
		function fnQty(qty){
			Ext.Ajax.request({
				url: BASE_URL + 'perpembelian_controller/update_qty',
				params: {
					nopp	: Ext.getCmp('tf.searchppdet').getValue(),
					kdbrg	: Ext.getCmp('tf.updatekdbrg').getValue(),
					qty    	: qty
				},
				success: function() {
					//Ext.Msg.alert("Info", "Ubah Berhasil");
					Ext.getCmp('gp.grid_brg').store.reload();
				},
				failure: function() {
					Ext.Msg.alert("Info", "Ubah Data Gagal");
				}
			});
		}
		
		function fnEditCatatan(){
			var catatan = Ext.getCmp('catatan').getValue();
			Ext.Ajax.request({
				url: BASE_URL + 'perpembelian_controller/update_catatan',
				params: {
					nopp		: Ext.getCmp('tf.searchppdet').getValue(),
					kdbrg		: Ext.getCmp('tf.updatekdbrg').getValue(),
					catatan    	: catatan
				},
				success: function() {
					//Ext.Msg.alert("Info", "Ubah Berhasil");
					Ext.getCmp('gp.grid_brg').store.reload();
				},
				failure: function() {
					Ext.Msg.alert("Info", "Ubah Data Gagal");
				}
			});
		}

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setPerpembelianForm(isUpdate, record);
		wPerpembelian.show();

	/**
	FORM FUNCTIONS
	*/	
		function setPerpembelianForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.nopp', record.get('nopp'));
					RH.setCompValue('df.tglpp', record.get('tglpp'));
					RH.setCompValue('cb.bagian', record.get('idbagian'));
					RH.setCompValue('cb.setuju', record.get('idstsetuju'));
					RH.setCompValue('ta.keterangan', record.get('keterangan'));
					RH.setCompValue('cb.user', record.get('userid'));
					return;
				}
			}
		}
		
		function fnSavePerpembelian(){
			var idForm = 'frm.perpembelian';
			var sUrl = BASE_URL +'perpembelian_controller/insert_update_perpembelian';
			var sParams = new Object({
				nopp		:	RH.getCompValue('tf.nopp'),
				tglpp		:	RH.getCompValue('df.tglpp'),
				idbagian	:	RH.getCompValue('cb.bagian'),
				idstsetuju	:	RH.getCompValue('cb.setuju'),
				keterangan	:	RH.getCompValue('ta.keterangan'),
				userid		:	RH.getCompValue('cb.user'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'perpembelian_controller/insert_update_perpembelian';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			submitGridForm(idForm, sUrl, sParams, grid, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
	
	function getForm(idform){
		var form;
		if(Ext.getCmp(idform)){
			var comp = Ext.getCmp(idform);
			if(comp.getForm()){
				return comp.getForm();
			}
		}
	}

	function submitGridForm (idForm, sUrl, sParams, grid, msgWait, msgSuccess, msgFail, msgInvalid){
		var form = getForm(idForm);
		if(form.isValid()){
			form.submit({
				url: sUrl,
				method: 'POST',
				params: sParams, 		
				waitMsg: msgWait,				
				/* success: function(){
					Ext.Msg.alert("Info:", msgSuccess);	
					//grid.getStore().reload();
					//fTotal();
					//win.close();
					Ext.getCmp('btn_tmb').enable();
					Ext.getCmp('btn_simpan').disable();				
				}, */
				success: function(perpembelian_form, o) {
					if(o.result.success == true) {
						Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
						Ext.getCmp('tf.nopp').setValue(o.result.nopp);
						Ext.getCmp('tf.searchppdet').setValue(o.result.nopp);
						Ext.getCmp('btn_tmb').enable();
						ds_perpembelian.reload();
					}
				},
				failure: function(){
					Ext.Msg.alert("Info:", msgFail);
				}
			});
		} else {
			Ext.Msg.alert("Info:", msgInvalid);
		}	
	}
	
	function fncariBarang(){
		var cm_barang = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdbrg',
			sortable: true
		},
		{
			header: 'Nama Barang',
			width: 300,
			dataIndex: 'nmbrg',
			sortable: true
		},
		{
			header: 'Jenis Barang',
			width: 100,
			dataIndex: 'nmjnsbrg',
			sortable: true,
		},
		{
			header: 'Satuan',
			width: 100,
			dataIndex: 'nmsatuanbsr',
			sortable: true
		}
		]);
		
		var sm_barang = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_barang = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_barang = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_brgmedis,
			displayInfo: true,
			displayMsg: 'Data Barang Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_barang = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_barang = new Ext.grid.GridPanel({
			ds: ds_brgmedis,
			cm: cm_barang,
			sm: sm_barang,
			view: vw_barang,
			height: 460,
			width: 630,
			plugins: cari_barang,
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
			bbar: paging_barang,
			listeners: {
				rowdblclick: klik_cari_barang
			}
		});
		var win_find_cari_barang = new Ext.Window({
			title: 'Cari Barang',
			modal: true,
			items: [grid_find_cari_barang]
		}).show();

		function klik_cari_barang(grid, rowIdx){
			var rec_cari_barang = ds_brgmedis.getAt(rowIdx);
			var kdbrg = rec_cari_barang.data["kdbrg"];					
			var idsatuanbsr = rec_cari_barang.data["idsatuanbsr"];
			Ext.getCmp('carikdbrg').setValue(kdbrg);
			Ext.Ajax.request({
				url: BASE_URL + 'perpembelian_controller/cekbarang',
				method: 'POST',
				params: {
					nopp	: Ext.getCmp('tf.searchppdet').getValue(),
					kdbrg	: kdbrg
				},
				success: function(response){
					cekbarang = response.responseText;
					if (cekbarang =='1') {
						Ext.MessageBox.alert('Message', 'Data Sudah Ada..');
						//Ext.getCmp('gp.grid_barang').store.reload();
					} else {
						Ext.Ajax.request({
							url: BASE_URL +'perpembelian_controller/insert_perpembeliandet',
							method: 'POST',
							params: { 
								nopp		 : RH.getCompValue('tf.searchppdet'),
								kdbrg		 : kdbrg,
								idsatuanbsr	 : idsatuanbsr
							},
							//waitMsg: 'Tunggu, sedang proses menyimpan...',
							success: function() {
								//Ext.Msg.alert("Info", "Simpan Data Berhasil");
								Ext.getCmp('gp.grid_brg').store.reload();
								//ds_idhrgbrgsup.reload();
								ds_idhrgbrgsup.reload({
									scope   : this,
									callback: function(records, operation, success) {
										ds_idhrgbrgsup.each(function (rec) {
											//Ext.getCmp("tf.recidhrgbrgsup").setValue(parseFloat(rec.get('idhrgbrgsup'))); 
											Ext.getCmp("tf.recharga").setValue(parseFloat(rec.get('h_termurah'))); 
											Ext.getCmp("tf.rectgl").setValue(parseFloat(rec.get('tgl_muda'))); 
										});
									}
								});
								ds_idhrgbrgsup2.reload();
								win_find_cari_barang.close();
							},				
							failure: function(result){
								Ext.Msg.alert("Info", "Simpan Data Gagal");
							}					
						});
					}
				}
			});
		}
	}
}