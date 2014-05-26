function KsrReturFarmasi(){
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
	var ds_pasien = dm_pasien();
	
	////table bayar nota
	var sm_nota = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	var page_nota = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_bagian,
		displayInfo: true,
		displayMsg: 'Data Menu Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var grid_nota = new Ext.grid.GridPanel({
		store: ds_bagian,
		frame: true,
		height: 424,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_nota',
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
		bbar: page_nota
	});
	
	////tabel bayar nota
	var sm_bnota = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	var page_bnota = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_bagian,
		displayInfo: true,
		displayMsg: 'Data Menu Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var grid_bnota = new Ext.grid.GridPanel({
		store: ds_bagian,
		frame: true,
		height: 460,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_bnota',
		forceFit: true,
		sm: sm_bnota,
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
	
	
	var ksrrf_form = new Ext.form.FormPanel({ 
		id: 'fp.ksrrf',
		title: 'Retur Farmasi',
		width: 900, Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', iconCls: 'silk-add', handler: function(){bersihKsrRF();} },
			{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){simpan("fp.ksrrf");} },
			{ text: 'Cari', iconCls: 'silk-find', handler: function(){} },
			{ text: 'Batal', iconCls: 'silk-cancel', handler: function(){} },
			{ text: 'Cetak', iconCls: 'silk-printer', handler: function(){} },
			{ text: 'Cetak Ulang', iconCls: 'silk-printer', handler: function(){} },
			{xtype: 'tbfill' }
		],
        items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.3,
			layout: 'fit',
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:90,
				boxMaxHeight:100,
				items: [{
					xtype: 'compositefield',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'No. RM',
						id: 'tf.norm',
						width: 150
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.norm',
						width: 30,
						handler: function() {
							dftPasien();
						}
					}]
				},{
					xtype: 'textfield', fieldLabel:'Nama Pasien',
					id: 'tf.nmpasien', anchor: "100%"
				},{
					xtype: 'textfield', fieldLabel:'Unit Penunjang',
					id: 'tf.upenunjang', anchor: "100%"
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.7,
			layout: 'fit',
			defaults: { labelWidth: 100, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:90,
				boxMaxHeight:100,
				items: [{
					xtype: 'textfield', fieldLabel:'No. Retur',
					id: 'tf.noretur',
					width: 280
				},{
					xtype: 'compositefield',
					items: [{	
						xtype: 'datefield', fieldLabel:'Tgl./Jam/Shift', id: 'df.tgl',
						width: 100, value: new Date()
					},{
						xtype: 'label', id: 'lb.garing1', text: '/'
					},{ 	
						xtype: 'textfield', id: 'tf.jam', readOnly:true,
						width: 90
					},{
						xtype: 'label', id: 'lb.garing2', text: '/'
					},{
						xtype: 'textfield', id: 'tf.shift', 
						width: 60, disabled: true
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Catatan',
					id: 'tf.catatan', anchor: "100%"
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px; marginTop: -10px',
			columnWidth: 0.3,
			layout: 'fit',
			items: [{
				xtype: 'fieldset', title:'Daftar Nota Farmasi',
				height:470,
				boxMaxHeight:493,
				items: [{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'button',
						text: 'Hapus Nota',
						id: 'btn.hnota',
						margins: '5',
						width: 100,
						handler: function() {
							dftPasien();
						}
					},{
						xtype: 'button',
						text: 'Tambah Nota',
						id: 'btn.tnota',
						margins: '5',
						width: 100,
					}]
				},{
					layout: 'form',
					border: false,
					items: [grid_nota]
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px; marginTop: -4px;',
			columnWidth: 0.7,
			layout: 'fit',
			defaults: {labelAlign: 'right'},
			items: [{
				xtype: 'fieldset',
				height:460,
				boxMaxHeight:485,
				items: [{
					xtype: 'container',
					columnWidth:1,
					items: [{
						layout: 'form',
						border: false,
						items: [grid_bnota]
					}]
				}]
			}]
		}]
	}); SET_PAGE_CONTENT(ksrrf_form);
	
	function bersihKsrRF() {
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.upenunjang').setValue();
		Ext.getCmp('tf.noretur').setValue();
		Ext.getCmp('df.tgl').setValue(new Date());
		Ext.getCmp('tf.catatan').setValue();
	}
	
	function dftPasien(){
		var cm_fpasien = new Ext.grid.ColumnModel([
			{
				header: 'No RM',
				dataIndex: 'norm',
				width: 100
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'L/P',
				dataIndex: 'nmjnskelamin',
				width: 100
			},{
				header: 'Tgl. Lahir',
				dataIndex: 'tgllahir',
				width: 100
			},{
				header: 'Alamat Pasien',
				dataIndex: 'alamat',
				width: 200
			},{
				header: 'No. Telp./HP',
				dataIndex: 'notelp',
				width: 150
			},{
				header: 'No. KTP/Paspor',
				dataIndex: 'noidentitas',
				width: 150
			}
		]);
		var sm_fpasien = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_fpasien = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_fpasien = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_pasien,
			displayInfo: true,
			displayMsg: 'Data Pasien Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var s_fpasien = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_fpasien = new Ext.grid.GridPanel({
			ds: ds_pasien,
			cm: cm_fpasien,
			sm: sm_fpasien,
			view: vw_fpasien,
			height: 600,
			width: 955,
			plugins: s_fpasien,
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
			bbar: page_fpasien,
			listeners: {
				rowdblclick: klik_fpasien
			}
		});
		var win_fpasien = new Ext.Window({
			title: 'Cari Pasien',
			modal: true,
			items: [grid_fpasien]
		}).show();

		function klik_fpasien(grid, rowIdx){
			var rec_fpasien = ds_pasien.getAt(rowIdx);
			var var_fpasienno = rec_fpasien.data["norm"];
			var var_fpasiennm = rec_fpasien.data["nmpasien"];
				
			Ext.getCmp('tf.norm').focus()
			Ext.getCmp("tf.norm").setValue(var_fpasienno);
			Ext.getCmp("tf.nmpasien").setValue(var_fpasiennm);
						win_fpasien.close();
		}
	}
}