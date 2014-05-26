function PIreservasiRJ(namaForm) {
//    RH.startTimer('tf.jam');
    var myVar=setInterval(function(){myTimer()},1000);
    function myTimer(){
        var d=new Date();
        var formattedValue = Ext.util.Format.date(d, 'H:i:s');
       // if(Ext.getCmp("tf.jam"))
                RH.setCompValue("tf.jam",formattedValue);
         myStopFunction();
    }
    function myStopFunction(){
        clearInterval(myVar);
    }
    // Asterik //


    //--end asterik --//
    Ext.Ajax.request({
        url: BASE_URL + 'shift_controller/getNmField',
        method: 'POST',
        success: function(response) {
            obj = Ext.util.JSON.decode(response.responseText);
            Ext.getCmp("tf.idshift").setValue(obj.idshift);
            Ext.getCmp("tf.shift").setValue(obj.nmshift);
        }
    });
    Ext.Ajax.request({
        url: BASE_URL + 'setting_controller/statusNoAntrian',
        method: 'POST',
        success: function(response){
            obj = Ext.util.JSON.decode(response.responseText);
            if(obj.nilai == 0){
            Ext.getCmp("tf.antrian").setValue();
            } else {
            Ext.Ajax.request({
                url: BASE_URL  + 'reservasiRJ_controller/getNoantrian',
                method: 'POST',
                success: function(response){
                    obj = Ext.util.JSON.decode(response.responseText);
                    Ext.getCmp("tf.antrian").setValue(obj.antrian);
                    
                }
            })
            }
        }
    });
	
    var ds_pasien = dm_pasien();
    var ds_bagian = dm_bagian();
    var ds_dokter = dm_dokter();
    var ds_reservasi = dm_reservasi();
    ds_reservasi.setBaseParam('norm', null);
    ds_reservasi.setBaseParam('start', 0);
	var ds_vregistrasi = dm_vregistrasi();
    var ds_jadwalprakteknow = dm_jadwalprakteknow();
    ds_jadwalprakteknow.setBaseParam('idbagian', null);

    var ds_bagianrj = dm_bagian();
    ds_bagianrj.setBaseParam('jpel', 1);

    var grid_jdwldktr = new Ext.grid.GridPanel({
		store: ds_jadwalprakteknow,
		height: 100,
		width: 300,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_nota',
		hideHeaders: true,
		forceFit: true,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		listeners	: {
            rowclick : function(grid, rowIndex, e){
				var record = grid.getStore().getAt(rowIndex);
				Ext.getCmp("tf.dokter").setValue(record.get('nmdoktergelar'));
				getNoAntrian();
				  Ext.getCmp("tf.iddokter").setValue(record.get('iddokter'));
               // ds_reservasi.setBaseParam('idbagian', record.get('idbagian'));

               // ds_reservasi.reload();
			   cari();
			   reminder();
            }
        },
		columns: [{
			dataIndex: 'jampraktek',
			width: 100
		},{
			dataIndex: 'nmdoktergelar',
			width: 192
		}]
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
    var grid_regrwyt = new Ext.grid.GridPanel({
        store: ds_reservasi,
        frame: true,
        height: 200,
	//	plugins: cari_data,
        bodyStyle: 'padding:3px 3px 3px 3px',
        id: 'grid_reservasi',
        forceFit: true,
        autoScroll: true,
        autoSizeColumns: true,
        enableColumnResize: true,
        enableColumnHide: false,
        enableColumnMove: false,
        enableHdaccess: false,
        columnLines: true,
        loadMask: true,
        columns: [{
                header: 'No. Antrian',
                dataIndex: 'noantrian',
                width: 90
            }, {
                header: 'No. Registrasi',
                dataIndex: '',
                width: 100
            }, {
                header: 'No. RM',
                dataIndex: 'norm',
                width: 100
            }, {
                header: 'Nama Pasien',
                dataIndex: 'nmpasien',
                width: 150
            }, {
                header: 'No. Telp./Hanphone',
                dataIndex: 'notelp',
                width: 140
            }, {
                header: 'Email',
                dataIndex: 'email',
                width: 100
            }, {
                header: 'Tanggal Input',
                dataIndex: 'tglinput',
                width: 100,
            }, {
                header: 'User Input',
                dataIndex: 'userinput',
                width: 100
            }, {
                header: 'Posisi Pasien',
                dataIndex: 'namaposisipasien',
                width: 100
            }, {
                header: 'Status',
                dataIndex: 'nmstreservasi',
                width: 100
            }],
			
            listeners : {
                rowclick: function rowClick(grid, rowIdx) {
                var rec = ds_reservasi.getAt(rowIdx);
                var idreservasi = rec.data["idreservasi"];
                
                Ext.getCmp("tf.idreservasi").setValue(rec.data["idreservasi"]);
                Ext.getCmp("tf.norm").setValue(rec.data["norm"]);
                Ext.getCmp("tf.nmpasien").setValue(rec.data["nmpasien"]);
                Ext.getCmp("tf.hp").setValue(rec.data["nohp"]);
            //    Ext.getCmp("tf.nilai").setValue(rec.data["nilai"]);
                Ext.getCmp("tf.telp").setValue(rec.data["notelp"]);
                Ext.getCmp("tf.email").setValue(rec.data["email"]);
                Ext.getCmp("tf.catatan").setValue(rec.data["catatan"]);
            }
        }
    });

    var reservasi_form = new Ext.form.FormPanel({
        id: 'fp.reservasi',
        title: 'Daftar Reservasi Rawat Jalan',
        Height: 100,
        layout: 'column',
        frame: true,
        autoScroll: true,
        tbar: [
            {text: 'Baru', id: 'btn.baru', iconCls: 'silk-add', handler: function() {
                    bersih();
                }},
            {text: 'Simpan', id: 'btn.simpan', iconCls: 'silk-save', handler: function() {
                    simpan("fp.reservasi");
                }},
            {text: 'Batal', id: 'btn.batal', iconCls: 'silk-cancel', handler: function() {
                    var tes = RH.getCompValue('tf.idreservasi',true);
                    if(tes != ''){
                        batalSimpan("fp.reservasi");
                    }else if(tes == ''){
                        Ext.MessageBox.alert('Message', 'Pilih Pasien Reservasie dahulu...!');
                    }
                }},
            {text: 'Cetak', id: 'btn.cetak', iconCls: 'silk-printer', handler: function() {
                       var tgl=Ext.getCmp('df.tgl').getValue().format('Y-m-d');

                    //  window.location = BASE_URL + 'print//print_reservasiRJ/reservasi_pdf/'+tgl;
                        window.open( BASE_URL + 'print//print_reservasiRJ/reservasi_pdf/'+ tgl, '_blank');
                }},
            {text: 'Excel', id: 'btn.excel', iconCls: 'silk-printer', handler: function() {
                    exportdata();
                }},
            {xtype: 'tbfill'}
        ],
        items: [{
                xtype: 'container',
                style: 'padding: 5px',
                columnWidth: 0.5,
                layout: 'fit',
                defaults: {labelWidth: 150, labelAlign: 'right'},
                items: [{
                        xtype: 'fieldset', title: 'Data Pasien',
                        height: 300,
                        boxMaxHeight: 310,
                        items: [{
                                xtype: 'compositefield',
                                items: [{
                                        xtype: 'textfield',
                                        fieldLabel: 'No. RM',
                                        id: 'tf.norm',
                                        width: 200,
										maskRe: /[0-9.]/,
										autoCreate :  {
										tag: "input", 
										maxlength : 10, 
										type: "text", 
										size: "20", 
										autocomplete: "off"
										},
                                        enableKeyEvents: true,
                                        listeners: {
                                            specialkey: function(field, e) {
                                                if (e.getKey() == e.ENTER) {
                                                    dataPasien();
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: 'button',
                                        text: ' ... ',
                                        id: 'btn.noreg',
                                        width: 30,
                                        handler: function() {
                                            dftPasien();
                                        }
                                    }]
                            },{
                                xtype: 'textfield', hidden:true, id:'tf.idreservasi'
                            }, {
                                xtype: 'textfield', fieldLabel: 'Nama Pasien',
                                id: 'tf.nmpasien', anchor: "100%",// allowBlank: false
                            }, {
					xtype: 'compositefield',
					fieldLabel : 'No. Handphone',
					items: [{
						xtype: 'label', id: 'lb.nohp', text: '+62', margins: '0 5 0 0',
					},{
						xtype: 'numberfield',
						id  : 'tf.hp', width : 150,
						autoCreate :  {
							tag: "input", 
							maxlength : 12,
							type: "text", 
							size: "20", 
							autocomplete: "off"
						},
					}]
				}, {
                            xtype: 'numberfield', fieldLabel: 'No. Telp',autoCreate :  {

							tag: "input", 
							maxlength : 10, 
							type: "text", 
							size: "20", 
							autocomplete: "off"
						},
                                id: 'tf.telp', anchor: "100%", 
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Email', id: 'tf.email', anchor: "100%"
                            }, {
                                xtype: 'textarea', fieldLabel: 'Catatan',
                                id: 'tf.catatan', anchor: "100%"
                            }]
                    }]
            }, {
                xtype: 'container',
                style: 'padding: 5px',
                columnWidth: 0.5,
                layout: 'fit',
                defaults: {labelWidth: 150, labelAlign: 'right'},
                items: [{
                        xtype: 'fieldset', title: 'Data Reservasi',
                        height: 300,
                        boxMaxHeight: 310,
                        items: [{
                                xtype: 'compositefield',
                                items: [{
                                        xtype: 'datefield', fieldLabel: 'Tgl./Jam/Shift Berobat', id: 'df.tgl',
                                        width: 100, value: new Date(),              
                                    }, {
                                        xtype: 'label', id: 'lb.garing3', text: '/'
                                    }, {
                                        xtype: 'textfield', id: 'tf.jam', readOnly: true,
                                        width: 90
                                    }, {
                                        xtype: 'label', id: 'lb.garing4', text: '/'
                                    }, {
                                        xtype: 'textfield', id: 'tf.shift',
                                        width: 60, disabled: true
                                    }, {
                                        xtype: 'textfield', id: 'tf.idshift',
                                        width: 60, disabled: true, hidden: true
                                    }]
                            }, {
                    xtype: 'compositefield',
					fieldLabel: 'Unit Pelayanan',
					items: [{
						xtype :'textfield',
						id :'idbagian', hidden: true
					},{
						xtype :'textfield', allowBlank: false,
						id :'tf.upelayanan', width:250, readOnly: true
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.upelayanan',
						width: 45,
						handler: function() {
							dftUpel();
						}
					}]
                },{
                    xtype: 'textfield', id: 'tf.dokter', 
                    fieldLabel: 'Dokter Praktek', allowBlank:false,
                    width: 300, readOnly: true,
                    style : 'opacity:0.6'
                },{
                    xtype: 'textfield', id:'tf.iddokter', hidden: true
                },{
                    xtype: 'container', fieldLabel: ' ',
                    items: [grid_jdwldktr]
                },{
                    xtype: 'container', fieldLabel: 'Dokter Pengganti',
                    layout: 'hbox',
                    items: [{   
                        xtype:'checkbox',
                        boxLabel: 'Tampilkan Dokter', id: 'chb.dpengganti',
                        width: 130,
                        handler:check
                    }]
                }, {
                        xtype: 'numericfield', fieldLabel: 'Jml. Pasien Antri',
					id: 'tf.jmlpantri', width: 100, readOnly: true,
					style : 'opacity:0.6'
                    },{
								
						xtype :'numericfield', fieldLabel: 'Antrian ke',
						id :'tf.antrian',width:100, readOnly: true,
						style : 'opacity:0.6'
						}]
                    }]
            }, {
                xtype: 'container',
                style: 'padding: 5px',
                columnWidth: 1,
                defaults: {labelAlign: 'right'},
                items: [{
                        xtype: 'fieldset', title: 'Daftar Reservasi Rawat Jalan',
                        items: [{
                                layout: 'form',
                                border: false,
                                items: [grid_regrwyt]
                            }]
                    }]
            }]

    });
    SET_PAGE_CONTENT(reservasi_form);

    /* Function */
	function cari(){
		ds_reservasi.setBaseParam('idbagian',Ext.getCmp('idbagian').getValue());
	//	ds_reservasi.setBaseParam('iddokter','');
		ds_reservasi.setBaseParam('tglreservasi',Ext.getCmp('df.tgl').getValue());
		ds_reservasi.reload();
    }
    function dataPasien() {
        Ext.Ajax.request({
            url: BASE_URL + 'reservasiRJ_controller/getDataPasien',
            params: {
                norm: Ext.getCmp('tf.norm').getValue()
            },
            success: function(response) {
                obj = Ext.util.JSON.decode(response.responseText);
                var var_cari_norm = obj.norm;
                var var_cari_pasien = obj.nmpasien;
				var var_cari_pasiennotelp = obj.notelp;
				var var_cari_pasiennohp = obj.nohp;

                Ext.getCmp('tf.norm').focus();
                Ext.getCmp("tf.norm").setValue(var_cari_norm);
                Ext.getCmp("tf.nmpasien").setValue(var_cari_pasien);
				Ext.getCmp("tf.telp").setValue(var_cari_pasiennotelp);
            Ext.getCmp("tf.hp").setValue(var_cari_pasiennohp);
            }
        });
    }
    function simpan(namaForm) {
        var form_nya = Ext.getCmp(namaForm);
        form_nya.getForm().submit({
            url: BASE_URL + 'reservasiRJ_controller/insert_reservasi',
            method: 'POST',
            success: function() {
                Ext.MessageBox.alert('Informasi', 'Simpan Data Berhasil');
                ds_reservasi.reload();
                bersih2();
            },
            failure: function() {
                Ext.MessageBox.alert('Informasi', 'Simpan Data Gagal');
            }
        });
    }
    function batalSimpan(namaForm){
        var form_aa =  Ext.getCmp(namaForm);
        Ext.MessageBox.show({
            title: "Konfirmasi",
            msg: "Data dibatalkan ?",
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
                form_aa.getForm().submit({
                url: BASE_URL + 'reservasiRJ_controller/batal',
                method: 'POST',
                success: function() {
                    Ext.MessageBox.alert('Informasi', 'Batal Reservasi Berhasil');
					
                    ds_reservasi.reload();
                    bersih();
                },
                failure: function() {
                    Ext.MessageBox.alert('Informasi', 'Batal Reservasi Gagal');
                }

            }); 
                }
            }
        });
        
    }
//cari dokter berdasarkan bagian
    function dftUpel(){
		var cm_cari_bagian = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idbagian'
			},{
				header: 'Kode Bagian',
				dataIndex: 'kdbagian',
				width: 100
			},{
				header: 'Unit Pelayanan',
				dataIndex: 'nmbagian',
				width: 245
			}
		]);
		var sm_cari_bagian = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_bagian = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_bagian = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_bagianrj,
			//displayInfo: true,
			//displayMsg: 'Data Dari {0} - {1} of {2}',
			//emptyMsg: 'No data to display'
		});
		var cari_cari_bagian = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_cari_bagian= new Ext.grid.GridPanel({
			ds: ds_bagianrj,
			cm: cm_cari_bagian,
			sm: sm_cari_bagian,
			view: vw_cari_bagian,
			height: 460,
			width: 350,
			plugins: cari_cari_bagian,
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
			bbar: paging_cari_bagian,
			listeners: {
				rowdblclick: klik_cari_bagian
			}
		});
		var win_find_cari_bagian = new Ext.Window({
			title: 'Cari Bagian',
			modal: true,
			items: [grid_find_cari_bagian]
		}).show();

		function klik_cari_bagian(grid, rowIdx){
			var rec_cari_bagian = ds_bagianrj.getAt(rowIdx);
			var var_cari_nmbagian = rec_cari_bagian.data["nmbagian"];
			var var_cari_idbagian = rec_cari_bagian.data["idbagian"];
			
			Ext.getCmp("tf.upelayanan").setValue(var_cari_nmbagian);
			Ext.getCmp("idbagian").setValue(var_cari_idbagian);
			
			ds_jadwalprakteknow.setBaseParam('idbagian',var_cari_idbagian);
			ds_jadwalprakteknow.setBaseParam('shift',Ext.getCmp("tf.idshift").getValue());
			ds_jadwalprakteknow.reload();
			getNoAntrian();
						win_find_cari_bagian.close();
		}
	}
//cari pasien
    function dftPasien(){
		var cm_cari_pasien = new Ext.grid.ColumnModel([
			{
				header: 'No RM',
				dataIndex: 'norm',
				width: 80
			},{
				header: 'Nama Pasien',
				dataIndex: 'nmpasien',
				width: 150
			},{
				header: 'L/P',
				dataIndex: 'idjnskelamin',
				width: 30,
				renderer: function(value, p, r){
					var jkelamin = '';
					if(r.data['idjnskelamin'] == 1) jkelamin = 'L';
					if(r.data['idjnskelamin'] == 2) jkelamin = 'P';
					
					return jkelamin ;
				}
			},{
				header: 'Tgl. Lahir',
				dataIndex: 'tgllahir',
				renderer: Ext.util.Format.dateRenderer('d-m-Y'),
				width: 80
			},{
				header: 'Alamat Pasien',
				dataIndex: 'alamat',
				width: 210
			},{
				header: 'Nama Ibu',
				dataIndex: 'nmibu',
				width: 120
			},{
				header: 'No. HP/Telp.',
				dataIndex: 'notelp',
				renderer: function(value, p, r){
					var nohptelp = r.data['nohp'] + ' / ' + r.data['notelp'];
					
					return nohptelp ;
				},
				width: 180
			},{
				header: 'No. KTP/Paspor',
				dataIndex: 'noidentitas',
				width: 100
			}
		]);
		var sm_cari_pasien = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_cari_pasien = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_cari_pasien = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_pasien,
			displayInfo: true,
			displayMsg: 'Data Pasien Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var grid_find_cari_pasien = new Ext.grid.GridPanel({
			ds: ds_pasien,
			cm: cm_cari_pasien,
			sm: sm_cari_pasien,
			view: vw_cari_pasien,
			height: 350,
			width: 975,
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
			bbar: paging_cari_pasien,
			listeners: {
				rowdblclick: klik_cari_pasien
			}
		});
		var win_find_cari_pasien = new Ext.Window({
			title: 'Cari Pasien',
			modal: true,
			items: [{
					xtype: 'button',
					text: 'Cari',
					id: 'btn.cari',
					style: 'padding: 10px',
					width: 100,
					handler: function() {
						cAdvance();
					}
				},{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_cnorm',
							items:[{
								xtype: 'checkbox',
								id:'chb.crm',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.crm').enable();
										} else if(val == false){
											Ext.getCmp('tf.crm').disable();
											Ext.getCmp('tf.crm').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.crm',
								emptyText:'No. RM',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_cnmpasien',
							items:[{
								xtype: 'checkbox',
								id:'chb.cnmpasien',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cnmpasien').enable();
										} else if(val == false){
											Ext.getCmp('tf.cnmpasien').disable();
											Ext.getCmp('tf.cnmpasien').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cnmpasien',
								emptyText:'Nama Pasien',
								width: 230, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_ctgllhr',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctgllhr',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('df.ctgllhr').enable();
										} else if(val == false){
											Ext.getCmp('df.ctgllhr').disable();
											Ext.getCmp('df.ctgllhr').setValue(new Date());
										}
									}
								}
							},{
								xtype: 'datefield',
								id: 'df.ctgllhr',
								width: 100, value: new Date(),
								format: 'd-m-Y',
								disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctmplhr',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctmplhr',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.ctmplhr').enable();
										} else if(val == false){
											Ext.getCmp('tf.ctmplhr').disable();
											Ext.getCmp('tf.ctmplhr').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.ctmplhr',
								emptyText:'Tempat Lahir',
								width: 230, disabled: true
							}]
						}]
					},{
						xtype: 'fieldset',
						columnWidth: .33,
						border: false,
						items: [{
							xtype: 'compositefield',
							id: 'comp_cnmibu',
							items:[{
								xtype: 'checkbox',
								id:'chb.cnmibu',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.cnmibu').enable();
										} else if(val == false){
											Ext.getCmp('tf.cnmibu').disable();
											Ext.getCmp('tf.cnmibu').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.cnmibu',
								emptyText:'Nama Ibu',
								width: 230, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'comp_ctelp',
							items:[{
								xtype: 'checkbox',
								id:'chb.ctelp',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.ctelp').enable();
										} else if(val == false){
											Ext.getCmp('tf.ctelp').disable();
											Ext.getCmp('tf.ctelp').setValue('');
										}
									}
								}
							},{
								xtype: 'textfield',
								id: 'tf.ctelp',
								emptyText:'No. HP/Telp.',
								width: 230, disabled: true
							}]
						}]
					}]
				},
				grid_find_cari_pasien
			]
		}).show();

		function klik_cari_pasien(grid, rowIdx){
			var rec_cari_pasien = ds_pasien.getAt(rowIdx);
			var var_cari_pasienno = rec_cari_pasien.data["norm"];
            var var_cari_pasiennm = rec_cari_pasien.data["nmpasien"];
            var var_cari_pasiennotelp = rec_cari_pasien.data["notelp"];
            var var_cari_pasiennohp = rec_cari_pasien.data["nohp"];

            Ext.getCmp('tf.norm').focus()
            Ext.getCmp("tf.norm").setValue(var_cari_pasienno);
            Ext.getCmp("tf.nmpasien").setValue(var_cari_pasiennm);
            Ext.getCmp("tf.telp").setValue(var_cari_pasiennotelp);
            Ext.getCmp("tf.hp").setValue(var_cari_pasiennohp);
			ds_vregistrasi.setBaseParam('norm',var_cari_pasienno);
			ds_vregistrasi.load();
						win_find_cari_pasien.close();
		}
		
		function cAdvance(){
			if(Ext.getCmp('chb.ctgllhr').getValue() == true){
				ds_pasien.setBaseParam('tgllahir',Ext.util.Format.date(Ext.getCmp('df.ctgllhr').getValue(), 'Y-m-d'));
			} else {
				ds_pasien.setBaseParam('tgllahir','');
			}
		
			ds_pasien.setBaseParam('norm',Ext.getCmp('tf.crm').getValue());
			ds_pasien.setBaseParam('nmpasien',Ext.getCmp('tf.cnmpasien').getValue());
			ds_pasien.setBaseParam('tptlahir',Ext.getCmp('tf.ctmplhr').getValue());
			ds_pasien.setBaseParam('nmibu',Ext.getCmp('tf.cnmibu').getValue());
			ds_pasien.setBaseParam('notelp',Ext.getCmp('tf.ctelp').getValue());
			ds_pasien.load();
		}
	}
    //Clear
    function bersih() {
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.telp').setValue(); 
		Ext.getCmp('tf.hp').setValue(); 
		Ext.getCmp('df.tgl').setValue(new Date());
		Ext.getCmp('tf.catatan').setValue();
                Ext.getCmp('tf.email').setValue();
                Ext.getCmp('tf.catatan').setValue();
                Ext.getCmp('tf.antrian').setValue();
                Ext.getCmp('tf.upelayanan').setValue();
                Ext.getCmp('idbagian').setValue();
                Ext.getCmp('tf.dokter').setValue();
                Ext.getCmp('tf.iddokter').setValue();
                Ext.getCmp('tf.idreservasi').setValue();
                Ext.getCmp('chb.dpengganti').setValue();

				Ext.getCmp('btn.simpan').enable();
		ds_reservasi.setBaseParam('idbagian',null);
		ds_reservasi.reload();
		ds_jadwalprakteknow.setBaseParam('idbagian',null);
		ds_jadwalprakteknow.reload();
		
	}
	function bersih2() {
		Ext.getCmp('tf.norm').setValue();
		Ext.getCmp('tf.nmpasien').setValue();
		Ext.getCmp('tf.telp').setValue(); 
		Ext.getCmp('tf.hp').setValue(); 
		Ext.getCmp('df.tgl').setValue(new Date());
		Ext.getCmp('tf.catatan').setValue();
                Ext.getCmp('tf.email').setValue();
                Ext.getCmp('tf.catatan').setValue();
                Ext.getCmp('tf.antrian').setValue();
                Ext.getCmp('tf.upelayanan').disable();
            //    Ext.getCmp('idbagian').setValue();
                Ext.getCmp('tf.dokter').disable();
                Ext.getCmp('tf.iddokter').disable();
                Ext.getCmp('tf.idreservasi').disable();
            //    Ext.getCmp('chb.dpengganti').disable();
		ds_reservasi.setBaseParam('norm',null);
		ds_reservasi.reload();

		
	}
    function reloadGrid(){
        ds_reservasi.reload();
    }

    function exportdata(){
        var tgl=Ext.getCmp('df.tgl').getValue().format('Y-m-d');

            window.location = BASE_URL + 'reservasiRJ_controller/exportexcel/'+tgl;

    }
    function check(e) {
        var cek = e.checked;
        if(cek){
            ds_jadwalprakteknow.setBaseParam('idbagian','-1');
            ds_jadwalprakteknow.reload();
        }else{
            ds_jadwalprakteknow.setBaseParam('idbagian',Ext.getCmp('idbagian').getValue());
            ds_jadwalprakteknow.reload();
        }
    }
   
	function getNoAntrian(){
		Ext.Ajax.request({
			url:BASE_URL + 'reservasi_controller/getNoantrian',
			method:'POST',
			params: {
				nmbagian		: Ext.getCmp('tf.upelayanan').getValue(),
				nmdokter		: Ext.getCmp('tf.dokter').getValue()
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				Ext.getCmp("tf.jmlpantri").setValue(obj.antrian);
			}
		});
	}
	function reminder(){
		Ext.Ajax.request({
			url:BASE_URL + 'reservasiRJ_controller/reminderR',
			method:'POST',
			params: {
				tglreservasi		: Ext.getCmp('df.tgl').getValue().format('Y-m-d'),
				norm		: Ext.getCmp('tf.norm').getValue(),
				idbagian : Ext.getCmp('idbagian').getValue(),
				iddokter : Ext.getCmp('tf.iddokter').getValue(),
			},
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				if(obj.norm == null){
					
				}else{
					Ext.MessageBox.alert('Informasi', 'No RM sudah Reservasi');
					Ext.getCmp('btn.simpan').disable();
				}
			}
		});
	}
}