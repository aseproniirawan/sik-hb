function u4_otority() {
	var pageSize = 50;
	var ds_klppengguna = dm_klppengguna();
	var ds_gridotoritas = dm_gridotoritas();
	var oto = '';
	
	ds_gridotoritas.load({
		callback: function() {
//			Ext.Msg.show({
//				title: 'Perhatian',
//				msg: 'Silahkan Anda Pilih Kelompok Pengguna Diatas!?',
//				modal: true,
//				icon: Ext.Msg.INFO,
//				buttons: Ext.Msg.OK
//			});
                Ext.getCmp('combox').focus();
		}
	});
	var vw = new Ext.grid.GridView({
		emptyText: '< Otoritas Belum Dipilih  >'
	});
	var sm_nya = new Ext.grid.CheckboxSelectionModel({
		listeners: {
			selectionchange: function(sm) {
			
			if (Ext.getCmp('combox').getValue() !="" || Ext.getCmp('combox').getValue() !="Pilih..."){
				if (sm.getCount()) {
					var c = sm_nya.getSelected().data['user_aktif'];
					//  alert(c);
					if (c == true) { //isi
						Ext.getCmp('aktiftbar').disable();
						Ext.getCmp('noaktiftbar').enable();
					} else {
						Ext.getCmp('aktiftbar').enable();
						Ext.getCmp('noaktiftbar').disable();
					}
				} else {
					Ext.getCmp('aktiftbar').disable();
					Ext.getCmp('noaktiftbar').enable();
					}
				}
			}
		}
	});
	var cm = new Ext.grid.ColumnModel({
		// specify any defaults for each column
		defaults: {
			sortable: true // columns are not sortable by default           
		},
		columns: [//sm_nya,
		{
			header: 'Kode',
			width: 45,
			dataIndex: 'kdmenu',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmmenu',
			sortable: true
		},
		{
			header: 'Deskripsi',
			width: 500,
			dataIndex: 'deskripsi',
			sortable: true
		},
		{
			header: 'Hierarki',
			width: 50,
			dataIndex: 'idjnshirarki',
			sortable: true
		},
		{
			header: 'Status',
			width: 50,
			dataIndex: 'idstatus',
			sortable: true
		},
		{
			header: 'Submenu',
			width: 60,
			dataIndex: 'men_idmenu',
			sortable: true
		},
		{
			xtype: 'checkcolumn',
			header: 'Status',
			dataIndex: 'user_aktif',
			id: 'user_aktif',
			width: 60,
			readonly: false,
			listeners: {
				rowClick: function() {
					//  ds_gridotoritas().setBaseParam('dodol','b');
				}
			},
			editor:{
                                    xtype: 'checkbox',
                                    id:'cbpilih',
                                    name:'cbpilih',
                                    listeners: {
                                        change: function() {
                                                                                           
                                        }
                                    }
                        }
			//sortable: true
		}]
	});
	var cari_data = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'remote',
		disableIndexes:['user_aktif'],
		width: 200
	})];
	var paging = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_gridotoritas,
		displayInfo: true,
		displayMsg: 'Data Otoritas Dari {0} - {1} of {2}',
		emptyMsg: 'Data Otoritas Belum Dipilih.'
	});
	var grid_nya = new Ext.grid.EditorGridPanel({
		store: ds_gridotoritas,
		frame: true,
		height: 530,
		loadMask: true,
		autoScroll: true,
		autoWidth: true,
		plugins: cari_data,
		pageSize: 50,
		id: 'grid_det_product',
		forceFit: true,
		tbar: [
		{
			text: 'Kelompok Pengguna',
			//			iconCls: 'silk-printer'                        },{
			xtype: 'combo',
			width: 200,
			height: 50,
			allowBlank: false,
			store: ds_klppengguna,
			id: 'combox',
			name: 'combox',
			triggerAction: 'all',
			editable: false,
			valueField: 'kdklppengguna',
			displayField: 'nmklppengguna',
			forceSelection: true,
			submitValue: true,
			hiddenName: 'h_combox',
			listeners: {
				select: function() {
					var isi = Ext.getCmp('combox').getValue();
					
					if (isi){
					Ext.getCmp('btn_simpan').enable(); 
					} else {
					Ext.getCmp('btn_simpan').disable(); 
					}
					
					ds_gridotoritas.setBaseParam('klppengguna', isi);
					ds_gridotoritas.load();
				}
			},
			typeAhead: true,
			mode: 'local',
			emptyText: 'Pilih...',
			selectOnFocus: true
		},{
			text: 'Aktif',
			id: 'aktiftbar',
			iconCls: 'silk-accept',
			disabled: true,
			hidden: true,
			handler: function() {
				//alert(USERNAME);
				oto = 'aktif';
				verifyoto();
			}
		},
		{
			text: 'Non-Aktif',
			id: 'noaktiftbar',
			iconCls: 'silk-disaccept',
			disabled: true,
			hidden: true,
			handler: function() {
				//alert(USERNAME);
				oto = 'naktif';
				verifyoto();
			},
		},
		{
			text: 'Simpan',
			id: 'btn_simpan',
			iconCls: 'silk-accept',
			disabled:true,
			handler: function() {
				simpanotoritas();
			}
		}],
		sm: sm_nya,
		vw: vw,
		cm: cm,
		bbar: paging,
		//autoExpandColumn: 'common',
		clicksToEdit: 1,
		listeners: {
			rowdblclick: function rowdblClick(grid, rowIdx) {
				var rec = ds_gridotoritas.getAt(rowIdx);
				alert(rec.data["kdmenu"] + ', ' + Ext.getCmp('combox').getValue());
				//                                Ext.Ajax.request({
				//                                    method: 'POST',
				//                                    url: BASE_URL + 'c_utility/u_OT',
				//                                    params: {
				//                                            bool: rec.data["user_aktif"],
				//                                            kpengguna: Ext.getCmp('combox').getValue(),
				//                                            kdmenu: rec.data["kdmenu"]
				//                                    },
				//                                    success: function() {
				//                                            ds_gridotoritas.load();
				//                                            alert('Data telah diupdate!?')
				//                                    }
				//			});
			}
		}
	});
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general_id',
		region: 'center',
		buttonAlign: 'left',
		bodyStyle: 'padding: 5px',
		border: false,
		disabled: true,
		title: 'Otoritas',
		waitMsg: 'Waiting...',
		maskDisabled: false,
		monitorValid: true,
		items: [{
			layout: 'form',
			border: false,
			items: [grid_nya]
		}],
                listeners:{
                    afterrender:function(){
                        Ext.getCmp('combox').focus();
                    }
                }
	});
	
	function simpan_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		form_nya.getForm().submit({
			url: BASE_URL + 'c_utility/s_JKP',
			method: 'POST',
			success: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Berhasil");
				ds_gridotoritas.load();
			},
			failure: function() {
				Ext.MessageBox.alert("Informasi", "Simpan Data Gagal");
			}
		});
	}

	function hapus_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk menghapus Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_utility/d_JKP',
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
							ds_gridotoritas.load();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Hapus Data Gagal");
						}
					});
				}
			}
		})
	}

	function ubah_grid(namaForm) {
		var form_nya = Ext.getCmp(namaForm);
		Ext.MessageBox.show({
			title: "Konfirmasi",
			msg: "Anda Yakin Untuk Mengubah Data ini?",
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					form_nya.getForm().submit({
						url: BASE_URL + 'c_utility/u_JKP',
						params: {
							//	kriteria: kriteria
						},
						method: 'POST',
						success: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Berhasil");
							ds_gridotoritas.load();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Gagal");
						}
					});
				}
			}
		});
	}

	function verifyoto() {
		//  var cannot= cek(sm_nya);
		// alert(cannot);
		// if(cannot==0){
		Ext.MessageBox.show({
			title: "Konfirmasi",
			width: 350,
			msg: "<center> Anda Yakin Untuk Mengubah Data ini?</center>",
			buttons: Ext.MessageBox.YESNOCANCEL,
			fn: function(btn) {
				if (btn == 'yes') {
					var hasil_akhir = get_detail_item(sm_nya);
					Ext.Ajax.request({
						url: BASE_URL + 'c_utility/updateaktif',
						params: {
							details: hasil_akhir
						},
						success: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Berhasil");
							ds_gridotoritas.load();
							//window.location = BASE_URL + 'user/index.html';
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Ubah Data Gagal");
						}
					});
				}
			}
		});
		//           }else{
		//               Ext.MessageBox.alert("Perhatian", "Ada data [Cara bayar] yang masih kosong?!");
		//           }
	}

	function get_detail_item(sm) {
		var par = '';
		var c = ';';
		var i = 0;
		var cntrec = sm.getCount();
		var arr = sm.getSelections();
		for (i = 0; i < cntrec; i++) {
			if (i == cntrec - 1) {
				c = ''
			}
			par += arr[i].data['kdmenu'] + 'x' + Ext.getCmp('combox').getValue() + 'x' + oto + c;
		}
		return par;
	}

	function cek(sm) {
		var i = 0;
		var j = 0;
		var cntrec = sm.getCount();
		var arr = sm.getSelections();
		for (i = 0; i < cntrec; i++) {
			var y = arr[i].data['kdmenu'];
			if (y == "" || y == null) {
				j++;
			}
		}
		return j;
	}
	
	function get_otoritas() {
	var par='';
	var a= 1;
	var c = ';';
	
		  grid_nya.getStore().each(function(rec){ // ambil seluruh grid prodi
									var rowData = rec.data; 
									if (a == grid_nya.getStore().getCount()) {
										c = ''
									}
									var j = (rowData['user_aktif']) ? 1 : 0;
									
									par += Ext.getCmp('combox').getValue() + 'x' +
									rowData['kdmenu'] + 'x' +
									j + 'x' + // pilih
									c;
									
									a= a+1;
								});
								return par;
	}
	
	function simpanotoritas(){

					    var otoritas = get_otoritas();
                                            Ext.Ajax.request({
						url: BASE_URL + 'c_utility/simpan_otoritas',
						params: {
							selectotoritas: otoritas,
//    
						},
						success: function() {
							Ext.MessageBox.alert("Informasi", "Simpan Data Berhasil");
							ds_gridotoritas.load();
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "SImpan Data Gagal");
						}
                                            });
                                        
        }
		
	SET_PAGE_CONTENT(form_bp_general);
}