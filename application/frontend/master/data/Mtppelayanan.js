function Mtppelayanan(){
Ext.form.Field.prototype.msgTarget = 'side';
	var ds_masterpaket_parent = dm_masterpaket();
	var ds_tppelayanan = dm_tppelayanan();
	var ds_kdpelayanan = dm_kdpelayanan();
	var ds_masterpaket = dm_masterpaket();
	var ds_brgmedis = dm_brgmedis();
		
	var cbGrid = new Ext.grid.CheckboxSelectionModel({
		listeners: {
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
	
	var grid_tppelayanan = new Ext.grid.EditorGridPanel({
		id: 'gp.grid_tppelayanan',
		store: ds_tppelayanan,
		sm: cbGrid,
		border: false,
		height: 560,
		columnLines: true,
		autoScroll: true,
		//autoHeight: true,
		//plugins: cari_data,
		//sm: sm_nya,
		clicksToEdit: 1,
		tbar: [{
			text: 'Tambah Pelayanan',
			id: 'btn_addp',
			iconCls: 'silk-add',
			handler: function() {
				var pen_nmpaket = RH.getCompValue('tf.frm.pen_nmpaket', true);
				//var jnstarif = RH.getCompValue('tf.jnstarif', true);
					if(pen_nmpaket != ''){
						var grid = grid_tppelayanan;
						fnwinPelayanan(grid);
						Ext.getCmp('cb.frm.pelayanan').disable();
						RH.setCompValue('cb.frm.pelayanan', pen_nmpaket);
					/* if (jnstarif == 1){
							Ext.getCmp('cb.frm.jenis').disable();
							RH.setCompValue('cb.frm.jenis', 'J');
							}else if (jnstarif == 2){
							Ext.getCmp('cb.frm.jenis').disable();
							RH.setCompValue('cb.frm.jenis', 'B');
						} */
					}else if(pen_nmpaket == ''){
						Ext.MessageBox.alert('Message', 'Nama Paket Belum Di isi...!');
					}
					return;
					}
				},'-',
				{
					text: 'Tambah Barang(Obat/Alkes)',
					id: 'btn_addb',
					iconCls: 'silk-add',
					handler: function(){
						var pen_nmpaket = RH.getCompValue('tf.frm.pen_nmpaket', true);
						if(pen_nmpaket != ''){
							var grid = grid_tppelayanan;
							fnwinBarang(grid);
							Ext.getCmp('cb.frm.pelayanan').disable();
							RH.setCompValue('cb.frm.pelayanan', pen_nmpaket);
						}else if(pen_nmpaket == ''){
							Ext.MessageBox.alert('Message', 'Nama Paket Belum Di isi...!');
						}
						return;
					}
				},'-',
				{
					text: 'Hapus',
					id: 'btn_hapus',
					icon : 'application/framework/img/rh_delete.gif',
					handler: function() {
						var m = grid_tppelayanan.getSelectionModel().getSelections();
							if(m.length > 0)
							{				
								Ext.MessageBox.confirm('Message', 'Hapus Data Yang Di Pilih..?' , del);		 
							}
							else
							{
								Ext.MessageBox.alert('Message', 'Data Belum Di Pilih...!');
							}		
					}
				},/* '-',
				{
					text: 'Refresh',
					id: 'btn_refresh',
					iconCls: 'silk-arrow-refresh',
					handler: function(){
						ds_tppelayanan.reload();
						fTotal();
						//Ext.getCmp('tf.frm.pen_nmpaket').reset();
					}
				}, */{
					xtype: 'textfield',
					id: 'tf.idtarifpaket',
					width: 70,
					emptyText: 'idtarifpaket',
					hidden: true,
					validator: function() {
						ds_tppelayanan.setBaseParam('idtarifpaket', Ext.getCmp('tf.idtarifpaket').getValue());
						Ext.getCmp('gp.grid_tppelayanan').store.reload();
						fTotal();
					}
				},{
					xtype: 'textfield',
					id: 'tf.frm.idtarifpaketdet',
					emptyText: 'idtarifpaketdet',
					hidden: true,
				}
		],
		columns: [new Ext.grid.RowNumberer(),
		cbGrid,
		{
			header: '<center>Nama Pelayanan</center>',
			width: 310,
			dataIndex: 'nmpaket',
			sortable: true
		},
		{
			header: 'Jenis',
			width: 50,
			dataIndex: 'kdjnstarif',
			sortable: true
		},{
			header: '<center>Satuan Kecil</center>',
			width: 90,
			dataIndex: 'nmsatuan',
			sortable: true
		},{
			header: 'Qty',
			width: 60,
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
		},{
			header: '<center>Tarif JS</center>',
			width: 100,
			dataIndex: 'tarifjs',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			editor: new Ext.form.TextField({
						id: 'tarifjs',
                        enableKeyEvents: true,
                        listeners: {
                            change: function(){
                                fnEdiTarifjs(); 
							}
						}
					})
		},
		{
			header: '<center>Tarif JM</center>',
			width: 100,
			dataIndex: 'tarifjm',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			editor: new Ext.form.TextField({
						id: 'tarifjm',
                        enableKeyEvents: true,
                        listeners: {
                            change: function(){
                                fnEdiTarifjm(); 
							}
						}
					})
		},
		{
			header: '<center>Tarif JP</center>',
			width: 100,
			dataIndex: 'tarifjp',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			editor: new Ext.form.TextField({
						id: 'tarifjp',
                        enableKeyEvents: true,
                        listeners: {
                            change: function(){
                                fnEdiTarifjp(); 
							}
						}
					})
		},
		{
			header: '<center>Tarif BHP</center>',
			width: 100,
			dataIndex: 'tarifbhp',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			editor: new Ext.form.TextField({
						id: 'tarifbhp',
                        enableKeyEvents: true,
                        listeners: {
                            change: function(){
                                fnEdiTarifbhp(); 
							}
						}
					})
		},
		{
			header: '<center>Total Tarif</center>',
			width: 120,
			dataIndex: 'total',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
		}],
		bbar: [
			{ xtype:'tbfill' },
			{
				xtype: 'fieldset',
				border: false,
				width: 370,
				height:65,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'label', id: 'lb.jml', text: 'Jumlah :', margins: '0 10 0 90',
					},{
						xtype: 'numericfield',
						id:'tf.total',
						readOnly: true,
						disabled: false,
						width:100,
						decimalPrecision: 2,		
						decimalSeparator: ',',						
						thousandSeparator: '.',
						alwaysDisplayDecimals: true,
						useThousandSeparator: true,
					}]
				}]
			}
		],
		listeners:{
			rowclick: Addrecord
		}
	});
	
	function Addrecord(grid, rowIndex, columnIndex){
		var record = grid.getStore().getAt(rowIndex);
		Ext.getCmp('tf.frm.idtarifpaketdet').setValue(record.data['idtarifpaketdet']);
	}
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Tarif Paket Pelayanan', iconCls:'silk-calendar',
		layout: 'fit',		
		autoScroll: true,
		items: [
		{
			xtype: 'panel',
			border: false,
			items: [{
				layout: 'form',
				border: false,
				tbar: [{
					xtype: 'compositefield',
					style: 'padding: 5px; marginLeft: 15px',
					name: 'comp_pen_nmpaket',
					id: 'comp_pen_nmpaket',
					width:550,
					items: [{
						xtype: 'label', id: 'lb.nmpenyakit', text: 'Nama Tarif Paket :', margins: '3 10 0 5',
					},{
						xtype: 'textfield',
						id: 'tf.frm.pen_nmpaket',
						width: 370,
						emptyText:'Tarif Paket...',
						readOnly: true,
						
					},
					{
						xtype: 'button',
						iconCls: 'silk-find',
						id: 'btn_data_pen_nmpaket',
						width: 3,
						handler: function() {
							parentMasterpaket();
						}
					}]
				}],
				items: [grid_tppelayanan]
			}]
		}],
		listeners: {
			afterrender: mulai
		}
	});
	SET_PAGE_CONTENT(form_bp_general);
/** 
FUNCTIONS
*/
	function mulai(){
		fTotal();
		Ext.getCmp('gp.grid_tppelayanan').store.reload();
	}
	
	function fnEditQty(){
        var qty = Ext.getCmp('qty').getValue();
        var letters = /^[a-zA-Z]+$/;
		var simbol = /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/;
        if(qty.match(letters)){
			alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
		else if(qty.match(simbol)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
        else {           
            fnQty(qty);   
        }      
    }
	
	function fnQty(qty){
		Ext.Ajax.request({
			url: BASE_URL + 'tppelayanan_controller/update_qty',
			params: {
				idtarifpaketdet	: Ext.getCmp('tf.frm.idtarifpaketdet').getValue(),
                qty    		: qty
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				fTotal();
				Ext.getCmp('gp.grid_tppelayanan').store.reload();
			},
			failure: function() {
				Ext.Msg.alert("Info", "Ubah Data Gagal");
			}
		});
	}
	
	function fnEdiTarifjs(){
        var tarifjs = Ext.getCmp('tarifjs').getValue();
        var letters = /^[a-zA-Z]+$/;
		var simbol = /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/;
        if(tarifjs.match(letters)){
			alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
		else if(tarifjs.match(simbol)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
        else {           
            fnTarifjs(tarifjs);   
        }      
    }
	
	function fnTarifjs(tarifjs){
		Ext.Ajax.request({
			url: BASE_URL + 'tppelayanan_controller/update_tarifjs',
			params: {
				idtarifpaketdet	: Ext.getCmp('tf.frm.idtarifpaketdet').getValue(),
                tarifjs    		: tarifjs
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				fTotal();
				Ext.getCmp('gp.grid_tppelayanan').store.reload();
			},
			failure: function() {
				Ext.Msg.alert("Info", "Ubah Data Gagal");
			}
		});
	}
	
	function fnEdiTarifjm(){
        var tarifjm = Ext.getCmp('tarifjm').getValue();
        var letters = /^[a-zA-Z]+$/;
		var simbol = /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/;
        if(tarifjm.match(letters)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
		else if(tarifjm.match(simbol)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
        else {           
            fnTarifjm(tarifjm);   
        }      
    }
	
	function fnTarifjm(tarifjm){
		Ext.Ajax.request({
			url: BASE_URL + 'tppelayanan_controller/update_tarifjm',
			params: {
				idtarifpaketdet	: Ext.getCmp('tf.frm.idtarifpaketdet').getValue(),
                tarifjm    		: tarifjm
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				fTotal();
				Ext.getCmp('gp.grid_tppelayanan').store.reload();
			},
			failure: function() {
				Ext.Msg.alert("Info", "Ubah Data Gagal");
			}
		});
	}
	
	function fnEdiTarifjp(){
        var tarifjp = Ext.getCmp('tarifjp').getValue();
        var letters = /^[a-zA-Z]+$/;
		var simbol = /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/;
        if(tarifjp.match(letters)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
		else if(tarifjp.match(simbol)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
        else {           
            fnTarifjp(tarifjp);   
        }      
    }
	
	function fnTarifjp(tarifjp){
		Ext.Ajax.request({
			url: BASE_URL + 'tppelayanan_controller/update_tarifjp',
			params: {
				idtarifpaketdet	: Ext.getCmp('tf.frm.idtarifpaketdet').getValue(),
                tarifjp    		: tarifjp
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				fTotal();
				Ext.getCmp('gp.grid_tppelayanan').store.reload();
			},
			failure: function() {
				Ext.Msg.alert("Info", "Ubah Data Gagal");
			}
		});
	}
	
	function fnEdiTarifbhp(){
        var tarifbhp = Ext.getCmp('tarifbhp').getValue();
        var letters = /^[a-zA-Z]+$/;
		var simbol = /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/;
        if(tarifbhp.match(letters)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
		else if(tarifbhp.match(simbol)){
            alert('Masukan Angka');
            ds_tppelayanan.reload();
        } 
        else {           
            fnTarifbhp(tarifbhp);   
        }      
    }
	
	function fnTarifbhp(tarifbhp){
		Ext.Ajax.request({
			url: BASE_URL + 'tppelayanan_controller/update_tarifbhp',
			params: {
				idtarifpaketdet	: Ext.getCmp('tf.frm.idtarifpaketdet').getValue(),
                tarifbhp    	: tarifbhp
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				fTotal();
				Ext.getCmp('gp.grid_tppelayanan').store.reload();
			},
			failure: function() {
				Ext.Msg.alert("Info", "Ubah Data Gagal");
			}
		});
	}
	
	function fTotal(){
		ds_tppelayanan.reload({
			scope   : this,
			callback: function(records, operation, success) {
				sum = 0; 
				ds_tppelayanan.each(function (rec) {
					sum += parseFloat(rec.get('total')); 
				});
				Ext.getCmp("tf.total").setValue(sum);
			}
		});
	}
	
	function reloadTppelayanan(){
		ds_tppelayanan.reload();
	}
	
	function fnAddPenyakit(){
		var grid = grid_tppelayanan;
		wEntryTppelayanan(false, grid, null);	
	}
	
	function fnEditTppelayanan(grid, record){
		var record = ds_tppelayanan.getAt(record);
		wEntryTppelayanan(true, grid, record);		
	}
	
	function del(btn){
		console.log(btn);
		if(btn == 'yes')
		{			
			var m = grid_tppelayanan.getSelectionModel().getSelections();
			for(var i=0; i< m.length; i++){
				var rec = m[i];
				console.log(rec);
				if(rec){
					console.log(rec.get("idtarifpaketdet"));
					var idtarifpaketdet = rec.data['idtarifpaketdet'];
					Ext.Ajax.request({
						url: BASE_URL +'tppelayanan_controller/delete_tppelayanan',
						method: 'POST',
						params: {
							idtarifpaketdet 	: idtarifpaketdet
						},
						success: function(){
							fTotal();
							Ext.getCmp('gp.grid_tppelayanan').store.reload();
						}
					});
				}
					Ext.MessageBox.alert('Message', 'Hapus Data Berhasil..');
			}
		}
	}
	
/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryTppelayanan(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Tarif Paket Pelayanan (Edit)':'Tarif Paket Pelayanan (Entry)';
		var tppelayanan_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.tppelayanan',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 250, width: 460,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.idtarifpaketdet', 
				hidden: true,
			},
			{
				fieldLabel: 'Nama Tarif Paket',
				id: 'tf.frm.nmpaket', 
				width: 250,
				readOnly: true,
				style : 'opacity:0.6'
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Qty',
				id:'tf.frm.qty',
				width: 100,
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Tarif JS',
				id:'tf.frm.tarifjs',
				width: 100,
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Tarif JM',
				id:'tf.frm.tarifjm',
				width: 100,
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Tarif JP',
				id:'tf.frm.tarifjp',
				width: 100,
			},
			{
				xtype: 'numericfield',
				fieldLabel: 'Tarif BHP',
				id:'tf.frm.tarifbhp',
				width: 100,
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveTppelayanan();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wTppelayanan.close();
				}
			}]
		});
			
		var wTppelayanan = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [tppelayanan_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setTppelayananForm(isUpdate, record);
		wTppelayanan.show();

	/**
	FORM FUNCTIONS
	*/	
		function setTppelayananForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.frm.idtarifpaketdet', record.get('idtarifpaketdet'));
					RH.setCompValue('tf.frm.nmpaket', record.get('nmpaket'));
					RH.setCompValue('tf.frm.qty', record.get('qty'));
					RH.setCompValue('tf.frm.tarifjs', record.get('tarifjs'));
					RH.setCompValue('tf.frm.tarifjm', record.get('tarifjm'));
					RH.setCompValue('tf.frm.tarifjp', record.get('tarifjp'));
					RH.setCompValue('tf.frm.tarifbhp', record.get('tarifbhp'));
					return;
				}
			}
		}
		
		function fnSaveTppelayanan(){
			var idForm = 'frm.tppelayanan';
			var sUrl = BASE_URL +'tppelayanan_controller/insert_tppelayanan';
			var sParams = new Object({
				idtarifpaketdet	:	RH.getCompValue('tf.frm.idtarifpaketdet'),
				qty				:	RH.getCompValue('tf.frm.qty'),
				tarifjs			:	RH.getCompValue('tf.frm.tarifjs'),
				tarifjm			:	RH.getCompValue('tf.frm.tarifjm'),
				tarifjp			:	RH.getCompValue('tf.frm.tarifjp'),
				tarifbhp		:	RH.getCompValue('tf.frm.tarifbhp'),	
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'tppelayanan_controller/update_tppelayanan';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			submitGridForm(idForm, sUrl, sParams, grid, wTppelayanan, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}

	function parentMasterpaket(){
		var cm_masterpaket_parent = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idtarifpaket',
				width: 30
			},{
				header: 'Nama Tarif Paket',
				dataIndex: 'nmpaket',
				width: 400
			},{
				header: 'Kelas Tarif',
				dataIndex: 'nmklstarif',
				width: 150
			}
		]);
		var sm_masterpaket_parent = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_masterpaket_parent = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_masterpaket_parent = new Ext.PagingToolbar({
			pageSize: 22,
			store: ds_masterpaket_parent,
			displayInfo: true,
			displayMsg: 'Data Master Paket Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_masterpaket_parent = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1000,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200,
			disableIndexes:['idtarifpaket'],
		})];
		var grid_find_masterpaket_parent = new Ext.grid.GridPanel({
			ds: ds_masterpaket_parent,
			cm: cm_masterpaket_parent,
			sm: sm_masterpaket_parent,
			view: vw_masterpaket_parent,
			height: 460,
			width: 575,
			plugins: cari_masterpaket_parent,
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
			bbar: paging_masterpaket_parent,
			listeners: {
				rowdblclick: klik_masterpaket_parent
			}
		});
		var win_find_masterpaket_parent = new Ext.Window({
			title: 'Master Paket',
			modal: true,
			items: [grid_find_masterpaket_parent]
		}).show();

		function klik_masterpaket_parent(grid, rowIdx){
			var rec_masterpaket_parent = ds_masterpaket_parent.getAt(rowIdx);
			var var_idtarifpaket_parent = rec_masterpaket_parent.data["idtarifpaket"];
			var var_masterpaket_parent = rec_masterpaket_parent.data["nmpaket"];
						
			Ext.getCmp('tf.frm.pen_nmpaket').focus()
			Ext.getCmp("tf.idtarifpaket").setValue(var_idtarifpaket_parent);
			Ext.getCmp("tf.frm.pen_nmpaket").setValue(var_masterpaket_parent);
						win_find_masterpaket_parent.close();
		}
	}
	
	function fnwinPelayanan(grid){
		/* var sm_Pelayanan = new Ext.grid.RowSelectionModel({
			singleSelect: true
		}); */
		
		var sm_cbGridPelayanan = new Ext.grid.CheckboxSelectionModel({
			listeners: {
				rowselect : function( selectionModel, rowIndex, record){
					Ext.Ajax.request({
						url: BASE_URL + 'tppelayanan_controller/cekkdpelayanan',
						method: 'POST',
						params: {
							idtarifpaket	: Ext.getCmp('tf.idtarifpaket').getValue(),
							kdpelayanan		: record.get("kdpelayanan"),
							idjnstarif 		: Ext.getCmp('tf.jnstarif').getValue(),
						},
						success: function(response){
							pelayanan = response.responseText;
							if (pelayanan =='1') {
								Ext.MessageBox.alert('Message', 'Data Sudah Ada Yang Sama...');
								Ext.getCmp('gp.grid_pelayanan').store.reload();
								fTotal();
							} else {
								Ext.Ajax.request({
									url: BASE_URL + 'tppelayanan_controller/insert_win_pelayanan',
									params: {
										idtarifpaket	: Ext.getCmp('tf.idtarifpaket').getValue(),
										kdpelayanan 	: record.get("kdpelayanan"),
										idjnstarif 		: Ext.getCmp('tf.jnstarif').getValue(),
									},
									success: function(){
										fTotal();
									},
									failure: function() {
										//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
									}
								});
							}
						}
					});
				},
				rowdeselect : function( selectionModel, rowIndex, record){
					Ext.Ajax.request({
						url: BASE_URL + 'tppelayanan_controller/delete_win_pelayanan',
						params: {
							idtarifpaket	: Ext.getCmp('tf.idtarifpaket').getValue(),
							kdpelayanan 	: record.get("kdpelayanan"),
						},
						success: function(){
							fTotal();
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
		
		var cm_pelayanan = new Ext.grid.ColumnModel([
			sm_cbGridPelayanan,
			{
				//header: 'Id',
				dataIndex: 'kdpelayanan',
				width: 100,
				hidden: true
			},{
				header: 'Nama Pelayanan',
				dataIndex: 'nmpelayanan',
				width: 410
			}
		]);
		
		var paging_pelayanan = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_kdpelayanan,
			displayInfo: true,
			displayMsg: 'Data Barang Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_pelayanan = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var vw_pelayanan = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
				
		var grid_pelayanan = new Ext.grid.GridPanel({
			id: 'gp.grid_pelayanan',
			ds: ds_kdpelayanan,
			cm: cm_pelayanan,
			sm: sm_cbGridPelayanan, //sm_Pelayanan,
			tbar: [],
			plugins: cari_pelayanan,
			view: vw_pelayanan,
			height: 389,
			width: 460,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			autoScroll: true,
			loadMask: true,
			layout: 'anchor',
			style: 'marginTop: 10px',
			anchorSize: {
				width: 400,
				height: 400
			},
			bbar: paging_pelayanan,
			listeners: {	
				//rowclick: add_pelayanan
			}
		});
		
		/* function add_pelayanan(grid, rowIndex, columnIndex){
			var record = grid.getStore().getAt(rowIndex);
			RH.setCompValue('tf.kdpelayanan', record.data['kdpelayanan']);
		} */
		
		var form_input_pelayanan = new Ext.FormPanel({
			xtype:'form',
			id: 'frm.pelayanan',
			buttonAlign: 'left',
			labelWidth: 120, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 462, width: 472,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',
			items: [{
				xtype: 'fieldset',
				columnWidth: .90,
				border: false,
				items: [{
					xtype: 'combo', id: 'cb.frm.pelayanan', 
					fieldLabel: 'Nama Tarif Paket',
					store: ds_masterpaket, triggerAction: 'all',
					valueField: 'idtarifpaket', displayField: 'nmpaket',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 250,
					editable: false,
				}]
			},
				{
					xtype: 'textfield',
					id: 'tf.jnstarif',
					name: 'tf.jnstarif',
					fieldLabel: 'Jenis Tarif',
					width: 30,
					value: 2,
					hidden: true
				},/* {
					xtype: 'textfield',
					fieldLabel: 'Kode Pelayanan',
					id: 'tf.kdpelayanan',
					name: 'tf.kdpelayanan',
					width: 100,
					hidden: false
				},{
					xtype: 'textfield',
					fieldLabel: 'Id Satuan',
					id: 'tf.idsatuan',
					width: 100,
					hidden: false
				}, */
				grid_pelayanan
			],
			/* buttons: [
				{
					text: 'Simpan',
					iconCls:'silk-save',
					handler: function(){
						var kdtrarif = RH.getCompValue('tf.kdpelayanan', true);
						if(kdtrarif == ''){
							Ext.MessageBox.alert('Message', 'Pelayanan Belum Di Pilih...!');
						}else if(kdtrarif != ''){
							fnSavepelayanan();
						}
							return;
					}
				},
				{
					text: 'Kembali',
					iconCls:'silk-arrow-undo',
					handler: function() {
						win_pelayanan.close();
					}
			}] */
		});
		
		var win_pelayanan = new Ext.Window({
			title: 'Pelayanan (Entry)',
			modal: true,
			//closable: false,
			items: [form_input_pelayanan]
		}).show();
		
		function fnSavepelayanan(){
			var idForm = 'frm.pelayanan';
			var sUrl = BASE_URL +'tppelayanan_controller/insert_win_pelayanan';
			var sParams = new Object({
				//idtarifpaketdet	:	RH.getCompValue('tf.frm.idtarifpaketdet'),
				kdpelayanan		:	RH.getCompValue('tf.kdpelayanan'),
				idjnstarif		:	RH.getCompValue('tf.jnstarif'),
				idtarifpaket	:	RH.getCompValue('tf.idtarifpaket')
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			//call form grid submit function (common function by RH)
			submitGridForm(idForm, sUrl, sParams, grid, win_pelayanan, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		} 
		
	}
	
	function fnwinBarang(grid){
		/* var sm_barang = new Ext.grid.RowSelectionModel({
			singleSelect: true
		}); */
		
		var sm_cbGridBarang = new Ext.grid.CheckboxSelectionModel({
			listeners: {
				rowselect : function( selectionModel, rowIndex, record){
					Ext.Ajax.request({
						url: BASE_URL + 'tppelayanan_controller/cekkdbarang',
						method: 'POST',
						params: {
							idtarifpaket	: Ext.getCmp('tf.idtarifpaket').getValue(),
							kdbrg		 	: record.get("kdbrg"),
							idjnstarif 		: Ext.getCmp('tf.jnstarif').getValue(),
							idsatuan	 	: record.get("idsatuankcl"),
						},
						success: function(response){
							pelayanan = response.responseText;
							if (pelayanan =='1') {
								Ext.MessageBox.alert('Message', 'Data Sudah Ada Yang Sama...');
								Ext.getCmp('gp.grid_barang').store.reload();
								fTotal();
							} else {
								Ext.Ajax.request({
									url: BASE_URL + 'tppelayanan_controller/insert_win_barang',
									params: {
										idtarifpaket	: Ext.getCmp('tf.idtarifpaket').getValue(),
										kdbrg		 	: record.get("kdbrg"),
										idjnstarif 		: Ext.getCmp('tf.jnstarif').getValue(),
										idsatuan	 	: record.get("idsatuankcl"),
									},
									success: function(){
										fTotal();
									},
									failure: function() {
										//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
									}
								});
							}
						}
					});
				},
				rowdeselect : function( selectionModel, rowIndex, record){
					Ext.Ajax.request({
						url: BASE_URL + 'tppelayanan_controller/delete_win_Barang',
						params: {
							idtarifpaket	: Ext.getCmp('tf.idtarifpaket').getValue(),
							kdbrg		 	: record.get("kdbrg"),
							idsatuan	 	: record.get("idsatuankcl"),
						},
						success: function(){
							fTotal();
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
		
		var cm_barang = new Ext.grid.ColumnModel([
			sm_cbGridBarang,
			{
				//header: 'Id',
				dataIndex: 'kdbrg',
				width: 100,
				hidden: true
			},{
				header: 'Nama Barang',
				dataIndex: 'nmbrg',
				width: 400
			}
		]);
		
		var paging_barang = new Ext.PagingToolbar({
			pageSize: 12,
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
		
		var vw_barang = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var grid_barang = new Ext.grid.GridPanel({
			id: 'gp.grid_barang',
			ds: ds_brgmedis,
			cm: cm_barang,
			sm: sm_cbGridBarang, //sm_barang,
			view: vw_barang,
			tbar: [],
			plugins: cari_barang,
			height: 389,
			width: 450,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			autoScroll: true,
			loadMask: true,
			layout: 'anchor',
			style: 'marginTop: 10px',
			anchorSize: {
				width: 400,
				height: 400
			},
			bbar: paging_barang,
			listeners: {	
				//rowclick: add_barang
			}
		});
		
		/* function add_barang(grid, rowIndex, columnIndex){
			var record = grid.getStore().getAt(rowIndex);
			RH.setCompValue('tf.kdbrg', record.data['kdbrg']);
			RH.setCompValue('tf.idsatuan', record.data['idsatuankcl']);
		} */
		
		var form_input_barang = new Ext.FormPanel({
			xtype:'form',
			id: 'frm.barang',
			buttonAlign: 'left',
			labelWidth: 120, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 462, width: 462,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',
			items: [{
				xtype: 'fieldset',
				columnWidth: .90,
				border: false,
				items: [{
					xtype: 'combo', id: 'cb.frm.pelayanan', 
					fieldLabel: 'Nama Tarif Paket',
					store: ds_masterpaket, triggerAction: 'all',
					valueField: 'idtarifpaket', displayField: 'nmpaket',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 250,
					editable: false,
				}]
			},
				{
					xtype: 'textfield',
					id: 'tf.jnstarif',
					fieldLabel: 'Jenis Tarif',
					width: 30,
					value: 1,
					hidden: true
				},/* {
					xtype: 'textfield',
					fieldLabel: 'Kode Barang',
					id: 'tf.kdbrg',
					width: 100,
					hidden: true
				},{
					xtype: 'textfield',
					fieldLabel: 'Id Satuan',
					id: 'tf.idsatuan',
					width: 100,
					hidden: true
				}, */
				grid_barang
			],
			/* buttons: [
				{
					text: 'Simpan',
					iconCls:'silk-save',
					handler: function(){
						var kdbrg = RH.getCompValue('tf.kdbrg', true);
						if(kdbrg == ''){
							Ext.MessageBox.alert('Message', 'Pelayanan Belum Di Pilih...!');
						}else if(kdbrg != ''){
							fnSavebarang();
						}
							return;
					} 
				},
				{
					text: 'Kembali',
					iconCls:'silk-arrow-undo',
					handler: function() {
						win_barang.close();
					}
			}] */
		});
		
		var win_barang = new Ext.Window({
			title: 'Barang (Entry)',
			modal: true,
			//closable: false,
			items: [form_input_barang]
		}).show();
		
		function fnSavebarang(){
			var idForm = 'frm.barang';
			var sUrl = BASE_URL +'tppelayanan_controller/insert_win_pelayanan';
			var sParams = new Object({
				//idtarifpaketdet	:	RH.getCompValue('tf.frm.idtarifpaketdet'),
				kdpelayanan		:	RH.getCompValue('tf.kdbrg'),
				idjnstarif		:	RH.getCompValue('tf.jnstarif'),
				idtarifpaket	:	RH.getCompValue('tf.idtarifpaket'),
				idsatuan		:	RH.getCompValue('tf.idsatuan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			//call form grid submit function (common function by RH)
			submitGridForm(idForm, sUrl, sParams, grid, win_barang, 
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

	function submitGridForm (idForm, sUrl, sParams, grid, win, msgWait, msgSuccess, msgFail, msgInvalid){
		var form = getForm(idForm);
		if(form.isValid()){
			form.submit({
				url: sUrl,
				method: 'POST',
				params: sParams, 		
				waitMsg: msgWait,				
				success: function(){
					Ext.Msg.alert("Info:", msgSuccess);	
					grid.getStore().reload();
					fTotal();
					win.close();
				},
				failure: function(){
					Ext.Msg.alert("Info:", msgFail);
				}
			});
		} else {
			Ext.Msg.alert("Info:", msgInvalid);
		}	
	}
	
}
