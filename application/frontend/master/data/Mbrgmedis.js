function Mbrgmedis(){
//Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_brgmedis = dm_brgmedis();
	var ds_klpbarang = dm_klpbarang();
	var ds_jnsbrg = dm_jnsbrg();
	var ds_jsatuan = dm_jsatuan();
	var ds_pabrik = dm_pabrik();
	
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
		store: ds_brgmedis,
		displayInfo: true,
		displayMsg: 'Data Barang Medis Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
		//render gambar1
	function renderGbr1(val1) {
		return '<img src="resources/gambar/'+ val1 +'" style="max-height:50%; max-width:50%;">';
	}
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_brgmedis',
		store: ds_brgmedis,		
		autoScroll: true,
		height: 530, //autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddBrgmedis();
				//Ext.getCmp('tf.kdpabrik').getEl().hide();
				//Ext.getCmp('tf.kdpabrik').getEl().show();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdbrg',
			sortable: true
		},
		{
			header: 'Nama Barang',
			width: 250,
			dataIndex: 'nmbrg',
			sortable: true
		},
		{
			header: 'Jenis Barang',
			width: 105,
			dataIndex: 'nmjnsbrg',
			sortable: true
		},
		{
			header: 'Satuan kecil',
			width: 100,
			dataIndex: 'nmsatuankcl',
			sortable: true,
		},
		{
			header: 'Rasio',
			width: 80,
			dataIndex: 'rasio',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000.00', align:'right'
		},
		{
			header: 'Satuan Besar',
			width: 100,
			dataIndex: 'nmsatuanbsr',
			sortable: true,
		},
		{
			header: 'Harga Vg',
			width: 80,
			dataIndex: 'hrgavg',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000.00', align:'right'
		},
		{
			header: 'Harga Beli',
			width: 80,
			dataIndex: 'hrgbeli',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000.00', align:'right'
		},
		{
			header: 'Nama Pabrik',
			width: 200,
			dataIndex: 'nmpabrik',
			sortable: true
		},
		{
			header: 'Stok Min',
			width: 70,
			dataIndex: 'stokmin',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000.00', align:'right'
		},
		{
			header: 'Stok Max',
			width: 70,
			dataIndex: 'stokmax',
			sortable: true,
			xtype: 'numbercolumn', format:'0,000.00', align:'right'
		},		
		{
			header: 'Keterangan',
			width: 180,
			dataIndex: 'keterangan',
			sortable: true
		},
		{
			header: "Gambar", 
			renderer: renderGbr1, 
			align:'center', 
			dataIndex: 'gambar', 
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
						fnEditBrgmedis(grid, rowIndex);
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
						fnDeleteBrgmedis(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {

			}
		}
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Barang Medis', iconCls:'silk-user',
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
	
	function reloadBrgmedis(){
		ds_brgmedis.reload();
	}
	
	function fnAddBrgmedis(){
		var grid = grid_nya;
		wEntryBrgmedis(false, grid, null);
		var userid = RH.getCompValue('tf.userid', true);
			if(userid != ''){
				RH.setCompValue('cb.user', userid);
			}
			return;
	}
	
	function fnEditBrgmedis(grid, record){
		var record = ds_brgmedis.getAt(record);
		wEntryBrgmedis(true, grid, record);		
	}
	
	function fnDeleteBrgmedis(grid, record){
		var record = ds_brgmedis.getAt(record);
		var url = BASE_URL + 'brgmedis_controller/delete_brgmedis';
		var params = new Object({
						kdbrg	: record.data['kdbrg']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryBrgmedis(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Barang Medis (Edit)':'Barang Medis (Entry)';
		var brgmedis_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.brgmedis',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 540, width: 450,
			layout: 'form', 
			frame: false,
			autoScroll: true,
			defaultType:'textfield',		
			items: [
			{
				fieldLabel: 'Kode',
				id:'tf.kdbrg',
				width: 100,
				style : 'opacity:0.6',
				readOnly: true
			},
			{
				fieldLabel: 'Nama Barang',
				id:'tf.nmbrg',
				width: 250,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.klpbarang', 
				fieldLabel: 'Kelompok Barang',
				store: ds_klpbarang, triggerAction: 'all',
				valueField: 'idklpbrg', displayField: 'nmklpbarang',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},{
				xtype: 'compositefield',
				fieldLabel: 'Jenis Barang',
				id: 'comp_jnsbrg',
				items: [{
					xtype: 'combo', id: 'cb.jbarang', 
					store: ds_jnsbrg, triggerAction: 'all',
					valueField: 'idjnsbrg', displayField: 'nmjnsbrg',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 150,
					editable: false, allowBlank: false,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.jnsbrg',
					width: 4,
					handler: function() {
						fnwJbarang();
						ds_jnsbrg.load();
					}
				}]
			},{
				xtype: 'combo', id: 'cb.jsatuan', 
				fieldLabel: 'Satuan Kecil',
				store: ds_jsatuan, triggerAction: 'all',
				valueField: 'idsatuan', displayField: 'nmsatuan',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},{
				xtype: 'numericfield',
				fieldLabel: 'Rasio',
				id: 'tf.rasio',
				width: 150,
				allowBlank: false
			},{
				xtype: 'combo', id: 'cb.jsatuanbsr', 
				fieldLabel: 'Satuan Besar',
				store: ds_jsatuan, triggerAction: 'all',
				valueField: 'idsatuan', displayField: 'nmsatuan',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},{
				xtype: 'numericfield',
				fieldLabel: 'Harga Avg',
				id:'tf.hrgavg',
				width: 150,
			},{
				xtype: 'numericfield',
				fieldLabel: 'Harga Beli',
				id:'tf.hrgbeli',
				width: 150,
			},{
				xtype: 'compositefield',
				fieldLabel: 'Pabrik',
				id: 'comp_pabrik',
				items: [{
					xtype: 'combo', id: 'cb.pabrik',
					store: ds_pabrik, triggerAction: 'all',
					valueField: 'idpabrik', displayField: 'nmpabrik',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 150,
					editable: false, allowBlank: false, value: 1,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.pabrik',
					width: 4,
					handler: function() {
						fnwPabrik();
						ds_pabrik.load();
					}
				}]
			},{
				xtype: 'numericfield',
				fieldLabel: 'Stok Min',
				id:'tf.stokmin',
				width: 150
			},		
			{
				xtype: 'numericfield',
				fieldLabel: 'Stok Max',
				id:'tf.stokmax',
				width: 150,
			},
			{
				xtype: 'textfield',
				id: 'idimage',
				fieldLabel: 'image',
				hidden: true
			},		
			{
				xtype: 'fileuploadfield',
				id: 'idgambar',
				fieldLabel: 'Gambar',
				emptyText: 'Select an image to upload...',
				width: 200,
				buttonText: 'Browse',
				listeners: {
					valid: function(){
						var idimage = RH.getCompValue('idgambar', true);
						if(idimage != ''){
							RH.setCompValue('idimage', idimage);
						}
						return;
					}
				}
			},
			{	
				xtype: 'textarea',
				fieldLabel: 'Keterangan',
				id:'ta.keterangan',
				width: 250,
			},	
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Input',
				id: 'df.tglinput',
				format: "d/m/Y",
				value: new Date(),
				width: 150,
				editable: false,
				style : 'opacity:0.6',
				readOnly: true
			},	
			{
				xtype: 'textfield',
				fieldLabel: 'User Input',
				id:'tf.userinput',
				width: 150,
				value: USERNAME,
				style : 'opacity:0.6',
				readOnly: true
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveBrgmedis();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wBrgmedis.close();
				}
			}]
		});
			
		var wBrgmedis = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [brgmedis_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setBrgmedisForm(isUpdate, record);
		wBrgmedis.show();

	/**
	FORM FUNCTIONS
	*/	
		function setBrgmedisForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.kdbrg', record.get('kdbrg'));
					RH.setCompValue('cb.klpbarang', record.get('idklpbrg'));
					RH.setCompValue('cb.jbarang', record.get('idjnsbrg'));
					RH.setCompValue('tf.nmbrg', record.get('nmbrg'));
					RH.setCompValue('cb.jsatuan', record.get('idsatuankcl'));
					RH.setCompValue('tf.rasio', record.get('rasio'));
					RH.setCompValue('cb.jsatuanbsr', record.get('idsatuanbsr'));
					RH.setCompValue('tf.hrgavg', record.get('hrgavg'));
					RH.setCompValue('tf.hrgbeli', record.get('hrgbeli'));
					RH.setCompValue('cb.pabrik', record.get('idpabrik'));
					RH.setCompValue('tf.stokmin', record.get('stokmin'));
					RH.setCompValue('tf.stokmax', record.get('stokmax'));
					RH.setCompValue('idimage', record.get('gambar'));
					RH.setCompValue('idgambar', record.get('gambar'));
					RH.setCompValue('ta.keterangan', record.get('keterangan'));
					RH.setCompValue('df.tglinput', record.data['tglinput']);
					RH.setCompValue('tf.userinput', record.get('userinput'));
					return;
				}
			}
		}
		
		function fnSaveBrgmedis(){
			var idForm = 'frm.brgmedis';
			var sUrl = BASE_URL +'brgmedis_controller/insert_update_brgmedis';
			var sParams = new Object({
				kdbrg			:	RH.getCompValue('tf.kdbrg'),
				idklpbrg		:	RH.getCompValue('cb.klpbarang'),
				idjnsbrg		:	RH.getCompValue('cb.jbarang'),
				nmbrg			:	RH.getCompValue('tf.nmbrg'),
				idsatuankcl		:	RH.getCompValue('cb.jsatuan'),
				rasio			:	RH.getCompValue('tf.rasio'),
				idsatuanbsr		:	RH.getCompValue('cb.jsatuanbsr'),
				hrgavg			:	RH.getCompValue('tf.hrgavg'),
				hrgbeli			:	RH.getCompValue('tf.hrgbeli'),
				idpabrik		:	RH.getCompValue('cb.pabrik'),
				stokmin			:	RH.getCompValue('tf.stokmin'),
				stokmax			:	RH.getCompValue('tf.stokmax'),
				gambar			:	RH.getCompValue('idimage'),
				keterangan		:	RH.getCompValue('ta.keterangan'),		
				tglinput		:	RH.getCompValue('df.tglinput'),
				userinput		:	RH.getCompValue('tf.userinput')
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'brgmedis_controller/insert_update_brgmedis';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wBrgmedis, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
	
	function fnwPabrik(){
		var cm_pabrik = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
			{
				header: 'Nama',
				dataIndex: 'nmpabrik',
				width: 400
			}
		]);
		
		var sm_pabrik = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_pabrik = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_pabrik = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_pabrik,
			displayInfo: true,
			displayMsg: 'Data Pabrik Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_pabrik = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_pabrik = new Ext.grid.GridPanel({
			ds: ds_pabrik,
			cm: cm_pabrik,
			sm: sm_pabrik,
			view: vw_pabrik,
			height: 460,
			width: 430,
			plugins: cari_pabrik,
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
			bbar: paging_pabrik,
			listeners: {
				rowdblclick: klik_cari_pabrik
			}
		});
		var win_find_cari_pabrik = new Ext.Window({
			title: 'Cari Pabrik',
			modal: true,
			items: [grid_find_cari_pabrik]
		}).show();

		function klik_cari_pabrik(grid, rowIdx){
			var rec_cari_pabrik = ds_pabrik.getAt(rowIdx);
			var var_cari_idpabrik = rec_cari_pabrik.data["idpabrik"];
			//var var_cari_pabrik = rec_cari_pabrik.data["nmpabrik"];
						
			//Ext.getCmp('tf.pabrik').focus();
			//Ext.getCmp("tf.pabrik").setValue(var_cari_pabrik);
			Ext.getCmp("cb.pabrik").setValue(var_cari_idpabrik);
						win_find_cari_pabrik.close();
		}
	}
	
	function fnwJbarang(){
		var cm_jnsbrg = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
			{
				header: 'Jenis Barang',
				dataIndex: 'nmjnsbrg',
				width: 400
			}
		]);
		
		var sm_jnsbrg = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_jnsbrg = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_jnsbrg = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_jnsbrg,
			displayInfo: true,
			displayMsg: 'Data Jenis Barang Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_jnsbrg = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_jnsbrg = new Ext.grid.GridPanel({
			ds: ds_jnsbrg,
			cm: cm_jnsbrg,
			sm: sm_jnsbrg,
			view: vw_jnsbrg,
			height: 460,
			width: 430,
			plugins: cari_jnsbrg,
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
			bbar: paging_jnsbrg,
			listeners: {
				rowdblclick: klik_cari_jnsbrg
			}
		});
		var win_find_cari_jnsbrg = new Ext.Window({
			title: 'Cari Jenis Barang',
			modal: true,
			items: [grid_find_cari_jnsbrg]
		}).show();

		function klik_cari_jnsbrg(grid, rowIdx){
			var rec_cari_jnsbrg = ds_jnsbrg.getAt(rowIdx);
			var var_cari_idjnsbrg = rec_cari_jnsbrg.data["idjnsbrg"];
			//var var_cari_jnsbrg = rec_cari_jnsbrg.data["nmjnsbrg"];
						
			//Ext.getCmp('tf.jnsbrg').focus();
			//Ext.getCmp("tf.jnsbrg").setValue(var_cari_jnsbrg);
			Ext.getCmp("cb.jbarang").setValue(var_cari_idjnsbrg);
						win_find_cari_jnsbrg.close();
		}
	}
}