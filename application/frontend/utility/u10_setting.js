function u10_setting(){
Ext.form.Field.prototype.msgTarget = 'side';
	pageSize = 15;
	var ds_setting = dm_setting();
	var ds_kelompoksetting = dm_kelompoksetting();
	
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
		store: ds_setting,
		displayInfo: true,
		displayMsg: 'Data Setting Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_setting = new Ext.grid.GridPanel({
		id: 'gp.grid_setting',
		store: ds_setting,		
		autoScroll: true,
		columnLines: true,
		height: 295,
		//plugins: cari_data,
		tbar: [],
		//sm: sm_nya,
		frame: true,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kelompok Setting',
			dataIndex: 'nmklpsetting',
			width: 350
		},{
			header: 'Kode',
			dataIndex: 'kdset',
			width: 80
		},{
			header: 'Nama',
			dataIndex: 'nmset',
			width: 200
		},{
			header: 'Nilai',
			dataIndex: 'nilai',
			width: 80
		},{
			header: 'Keterangan',
			dataIndex: 'ketset',
			width: 270
		},{
			header: 'No. Urut',
			dataIndex: 'nourut',
			width: 80
		}],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {
				var rec = ds_setting.getAt(rowIdx);
				var cbidklstarif = rec.data["idklpsetting"];
				
				Ext.getCmp("idset").setValue(rec.data["idset"]);
				Ext.getCmp("cb.klpseting").setValue(cbidklstarif);
				Ext.getCmp("tf.kdset").setValue(rec.data["kdset"]);
				Ext.getCmp("tf.nmset").setValue(rec.data["nmset"]);
				Ext.getCmp("tf.nilai").setValue(rec.data["nilai"]);
				Ext.getCmp("tf.nourut").setValue(rec.data["nourut"]);
				Ext.getCmp("ta.ketset").setValue(rec.data["ketset"]);
			}
		}
	});
	
	var form_setting = new Ext.form.FormPanel({
		id: 'fp.form_setting',
		title: 'Setting', iconCls:'silk-calendar',
		width: 900, Height: 1000,
		layout: {
            type: 'form',
            pack: 'center',
            align: 'center'
        },
		frame: true,
		autoScroll: true,
		tbar: [
			{ text: 'Baru', id:'btn.baru', iconCls: 'silk-add', handler: function(){bersihSetting();} },'-',
			{ text: 'Simpan', id:'btn.simpan', iconCls: 'silk-save', 
					handler: function(){
						var ada = RH.getCompValue('tf.idklpsetting', true);
							if (ada != ''){
								simpan("fp.form_setting");
							}else if(ada == ''){
								Ext.MessageBox.alert('Message', 'Input Data Terlebih Dahulu...!');
						}
						return;
					}
			},'-',
			{ text: 'Hapus', id:'btn.hapus', iconCls: 'silk-delete',
					handler: function(){
						var ada = RH.getCompValue('idset', true);
							if (ada != ''){
								hapus_data('fp.form_setting');
							}else if(ada == ''){
								Ext.MessageBox.alert('Message', 'Data Belum Di Pilih...!');
						}
						return;
					}
			},
			{ xtype: 'tbfill' },
		],
		items: [{
			xtype: 'fieldset', title: 'Data Pasien', layout: 'column', style: 'marginTop: 8px',
			defaults: { labelWidth: 150, labelAlign: 'right' },
			items: [{
				////COLUMN 1
				layout: 'form', columnWidth: 0.50,
				items: [{
					xtype: 'textfield',
					id: 'idset',
					width: 70,
					hidden:true,
				},{
					xtype: 'combo',
					id: 'cb.klpseting',
					fieldLabel: 'Kelompok Setting',
					store: ds_kelompoksetting, width: 360,
					valueField: 'idklpsetting', displayField: 'nmklpsetting',
					editable: false, triggerAction: 'all',
					forceSelection: true, submitValue: true, mode: 'local',
					emptyText:'Pilih...',
					listeners: {
							select: function() {
								var isi = Ext.getCmp('cb.klpseting').getValue();
								if (isi){
									Ext.getCmp("tf.idklpsetting").setValue(isi);
									fnClear();
								}
							}
						}
				},{
					xtype: 'textfield',
					id: 'tf.idklpsetting',
					width: 100,
					emptyText: 'idklpsetting.',
					hidden: true,
					validator: function() {
						ds_setting.setBaseParam('klpsetting', Ext.getCmp('tf.idklpsetting').getValue());
						Ext.getCmp('gp.grid_setting').store.reload();
					}
				},{
					xtype: 'textfield',
					fieldLabel: 'Kode',
					id: 'tf.kdset',
					width: 130
				},{
					xtype: 'textfield',
					fieldLabel: 'Nama',
					id: 'tf.nmset',
					width: 360
				},{
					xtype: 'textfield',
					fieldLabel: 'Nilai',
					id: 'tf.nilai',
					width: 360
				},{
					xtype: 'textfield',
					fieldLabel: 'No. Urut',
					id: 'tf.nourut',
					width: 130
				}]
			},{
				////COLUMN 2
				layout: 'form', columnWidth: 0.50,
				items: [{
					xtype: 'textarea', fieldLabel: 'Keterangan',
					id  : 'ta.ketset', width : 320, height: 120
				}]
			}]
		},{
			xtype: 'fieldset', layout: 'form',
			title: 'Daftar Reservasi Rawat Jalan',
			items: [grid_setting]
		}]
	});
	SET_PAGE_CONTENT(form_setting);
	
	function bersihSetting() {
		form_setting.getForm().reset();
	}
	
	function fnClear(){
		Ext.getCmp('idset').setValue();
		Ext.getCmp('tf.kdset').setValue();
		Ext.getCmp('tf.nmset').setValue();
		Ext.getCmp('tf.nilai').setValue();
		Ext.getCmp('tf.nourut').setValue();
		Ext.getCmp('ta.ketset').setValue();
	}
	
	function simpan(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'setting_controller/insert_update_setting',
			method: 'POST',
			success: function(form_setting, o) {
				if (o.result.success==true) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
						fnClear();
						ds_setting.reload();
				} else if (o.result.success==false) {
					Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
				}
			}
		});
	}
	
	function hapus_data(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk menghapus Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'setting_controller/delete_setting',
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
								fnClear();
								ds_setting.load();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Gagal");
						}
					});
				}
			}
		})
	}
}