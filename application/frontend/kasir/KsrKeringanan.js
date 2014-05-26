function KsrKeringanan(){
RH.startTimer('tf.jam');
	Ext.Ajax.request({
		url:BASE_URL + 'shift_controller/getNmField',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			//Ext.getCmp("idshift").setValue(obj.idshift);
			Ext.getCmp("tf.shift").setValue(obj.nmshift);
		}
	});
	
	var ds_bagian = dm_bagian();
	ds_bagian.setBaseParam('start',0);
	ds_bagian.setBaseParam('limit',100);
	
	var ds_registrasi = dm_registrasi();
	
	////table bayar nota
	var sm_nota = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	var grid_nota = new Ext.grid.GridPanel({
		store: ds_bagian,
		frame: true,
		height: 400,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_det_product',
		forceFit: true,
		sm: sm_nota,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		columns: [{
			header: 'Nama Bagian',
			width: 150,
			dataIndex: 'nmbagian'
		}],
		bbar: [
			{ xtype:'tbfill' },
			{
				xtype: 'fieldset',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Jumlah',
					id: 'tf.jumlah',
					width: 100
				},{
					xtype: 'textfield',
					fieldLabel: 'Keringanan',
					id: 'tf.keringanan',
					width: 100
				},{
					xtype: 'textfield',
					fieldLabel: 'Selisih',
					id: 'tf.selisih',
					width: 100
				}]
			}
		]
	});
	
	var ksrkrngn_form = new Ext.form.FormPanel({
		id: 'fp.ksrkrngn',
		title: 'Keringanan',
		//width: 900,
		Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){bersihKsrKrngn();} },
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpan("fp.ksrkrngn");} },
			{ text: 'Cari', iconCls: 'silk-find', handler: function(){} },
			{ text: 'Batal', iconCls: 'silk-cancel', handler: function(){} }
		],
        items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.4,
			layout: 'fit',
			defaults: { labelWidth: 150, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:150,
				boxMaxHeight:160,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'No. Registrasi',
						id: 'tf.noreg', readOnly: true,
						style : 'opacity:0.6',
						width: 150
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.noreg',
						width: 30,
						handler: function() {
							fReg();
						}
					}]
				},{
					xtype: 'compositefield',
					items: [{	
						xtype: 'datefield', fieldLabel:'Tgl./Jam/Shift', id: 'df.tglreg',
						readOnly: true,
						style : 'opacity:0.6',
						width: 100
					},{
						xtype: 'label', id: 'lb.garing1', text: '/'
					},{ 	
						xtype: 'textfield', id: 'tf.jamreg', 
						readOnly: true,
						style : 'opacity:0.6',
						width: 90
					},{
						xtype: 'label', id: 'lb.garing2', text: '/'
					},{
						xtype: 'textfield', id: 'tf.shiftreg', 
						width: 60, disabled: true
					}]
				},{
					xtype: 'textfield', fieldLabel:'No. RM',
					id: 'tf.norm',
					readOnly: true, style : 'opacity:0.6',
					width: 150
				},{
					xtype: 'textfield', fieldLabel:'Nama Pasien',
					id: 'tf.nmpasien',
					readOnly: true, style : 'opacity:0.6',
					width: 250
				},{
					xtype: 'textfield', fieldLabel:'Penanggung Biaya',
					id: 'tf.penjamin',
					readOnly: true, style : 'opacity:0.6',
					width: 250
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.6,
			layout: 'fit',
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:150,
				boxMaxHeight:160,
				items: [{
					xtype: 'textfield', fieldLabel:'No. Keringanan',
					id: 'tf.nokeringanan',
					readOnly: true, style : 'opacity:0.6',
					width: 280
				},{
					xtype: 'compositefield',
					items: [{	
						xtype: 'datefield', fieldLabel:'Tgl./Jam/Shift', id: 'df.tgl',
						width: 100, value: new Date()
					},{
						xtype: 'label', id: 'lb.garing3', text: '/'
					},{ 	
						xtype: 'textfield', id: 'tf.jam', readOnly:true,
						width: 90
					},{
						xtype: 'label', id: 'lb.garing4', text: '/'
					},{
						xtype: 'textfield', id: 'tf.shift', 
						width: 60, disabled: true
					}]
				},{
					xtype: 'textarea', fieldLabel: 'Catatan',
					id: 'ta.catatan', anchor: "100%"
				}]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px; margin: -10px 0 0 0',
			columnWidth: 1,
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Daftar Nota Transaksi',
				layout: 'form',
				height: 420,
				boxMaxHeight:435,
				items: [grid_nota]
			}]
		}]
	}); SET_PAGE_CONTENT(ksrkrngn_form);
	
	function bersihKsrKrngn() {
		Ext.getCmp('tf.noreg').setValue();
		Ext.getCmp('df.tglreg').setValue();
		Ext.getCmp('tf.jamreg').setValue();
		Ext.getCmp('tf.shiftreg').setValue();
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.penjamin').setValue();
		Ext.getCmp('tf.nokeringanan').setValue();
		Ext.getCmp('df.tgl').setValue(new Date());
		Ext.getCmp('ta.catatan').setValue();
		Ext.getCmp('tf.jumlah').setValue();
		Ext.getCmp('tf.keringanan').setValue();
		Ext.getCmp('tf.selisih').setValue();
	}
	
	
	
	function fReg(){
		var cm_freg = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'noreg'
			},{
				header: 'No. Registrasi',
				dataIndex: 'registrasi.noreg',
				width: 100
			},{
				header: 'No. RM',
				dataIndex: 'norm',
				width: 100
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'Alamat',
				dataIndex: 'pasien.alamat',
				width: 200
			},{
				header: 'Jenis Kelamin',
				dataIndex: 'nmjnskelamin',
				width: 200
			}
		]);
		var sm_freg = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_freg = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_freg = new Ext.PagingToolbar({
			store: ds_registrasi,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_freg = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_freg= new Ext.grid.GridPanel({
			id: 'gp.find_freg',
			ds: ds_registrasi,
			cm: cm_freg,
			sm: sm_freg,
			view: vw_freg,
			height: 350,
			width: 800,
			plugins: cari_freg,
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
			bbar: page_freg,
			listeners: {
				rowdblclick: klik_freg
			}
		});
		var win_freg = new Ext.Window({
			title: 'Cari Registrasi',
			modal: true,
			items: [grid_freg]
		}).show();
		
		Ext.getCmp('gp.find_freg').store.reload();
		function klik_freg(grid, rowIdx){
			var rec_freg = ds_registrasi.getAt(rowIdx);
			var freg_noreg = rec_freg.data["registrasi.noreg"];
			/* var freg_noreg = rec_freg.data["registrasi.noreg"];
			var freg_noreg = rec_freg.data["registrasi.noreg"];
			var freg_noreg = rec_freg.data["registrasi.noreg"]; */
			var freg_norm = rec_freg.data["norm"];
			var freg_nmpasien = rec_freg.data["nmpasien"];
			var freg_penjamin = rec_freg.data["nmpenjamin"];
			
			Ext.getCmp("tf.noreg").setValue(freg_noreg);
			/* Ext.getCmp("df.tglreg").setValue(freg_noreg);
			Ext.getCmp("tf.jamreg").setValue(freg_noreg);
			Ext.getCmp("tf.shiftreg").setValue(freg_noreg); */
			Ext.getCmp("tf.norm").setValue(freg_norm);
			Ext.getCmp("tf.nmpasien").setValue(freg_nmpasien);
			Ext.getCmp("tf.penjamin").setValue(freg_penjamin);
						win_freg.close();
		}
	}
}