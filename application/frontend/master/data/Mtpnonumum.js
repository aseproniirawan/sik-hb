function Mtpnonumum(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_tpnonumum = dm_tpnonumum();
	var ds_idpenjamin = dm_idpenjamin();
	var ds_kdpelayanan = dm_kdpelayanan();
	var ds_klstarif = dm_klstarif();	
	var ds_klsrawat = dm_klsrawat();
	
	var arr_cari = [['tarif.kdpelayanan', 'Kode Pelayanan'],['nmpelayanan', 'Nama Pelayanan'],['nmjnspelayanan', 'Jenis Pelayanan']];
	
	var ds_cari = new Ext.data.ArrayStore({
		fields: ['id', 'nama'],
		data : arr_cari 
	});
	
	var cari_pelayanan = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'remote',
		width: 200
	})];

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
		store: ds_kdpelayanan,
		displayInfo: true,
		displayMsg: 'Data Daftar Pelayanan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
		//Checkbox pada Grid
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
	
	var grid_pelayanan = new Ext.grid.GridPanel({
		id: 'grid_pelayanan',
		sm: cbGrid,
		store: ds_kdpelayanan,		
		autoScroll: true,
		//autoHeight: true,
		columnLines: true,
		height: 230,
		plugins: cari_pelayanan,
		tbar: [],
		//sm: sm_nya,
		frame: true,
		columns: [new Ext.grid.RowNumberer(),
		cbGrid,
		{
			header: 'Kode',
			width: 80,
			dataIndex: 'kdpelayanan',
			sortable: true
		},
		{
			header: 'Nama Pelayanan',
			width: 320,
			dataIndex: 'nmpelayanan',
			sortable: true
		},
		{
			header: 'Jenis Pelayanan',
			width: 110,
			dataIndex: 'nmjnspelayanan',
			sortable: true
		},
		{
			header: 'Jenis Hirarki',
			width: 75,
			dataIndex: 'nmjnshirarki',
			sortable: true
		},
		{
			header: 'Status',
			width: 80,
			dataIndex: 'nmstatus',
			sortable: true
		}],
		/* listeners: {
            'rowclick': function() {
                var sm = grid_pelayanan.getSelectionModel();
                var sel = sm.getSelections();
                    if (sel.length == 0) {
                        Ext.getCmp('btn_add').setDisabled(true);
                    }else {
                        Ext.getCmp('btn_add').setDisabled(false);
                    }
            }
        }, */
		bbar: paging
	});
	
	var grid_klsrawat = new Ext.grid.GridPanel({
		id: 'grid_klsrawat',
		store: ds_klsrawat,
		height: 230,
		columnLines: true,
		frame: true,
		pageSize: pageSize,
		//tbar: [],
		//sm: sm_nya,
		columns: [
		{
			header: 'Bagian (Unit/Ruangan)',
			width: 168,
			dataIndex: 'nmbagian',
			sortable: true
		},{
			header: 'Kelas Traif',
			width: 100,
			dataIndex: 'nmklstarif',
			sortable: true
		}],
		//bbar: paging_klsrawat,
		
	});
	
	function add(btn){
		/* console.log(btn);
		if(btn == 'yes')
		{ */			
			var m = grid_pelayanan.getSelectionModel().getSelections();
			var store = grid_pelayanan.getStore();			
			for(var i=0; i< m.length; i++){
				var rec = m[i];
				console.log(rec);
				if(rec){
					console.log(rec.get("kdpelayanan"));
					var kdpelayanan = rec.data['kdpelayanan'];
					Ext.Ajax.request({
						url: BASE_URL +'tpnonumum_controller/insert_tpnonumum',
						method: 'POST',
						params: {
							idpenjamin		: RH.getCompValue('cb.frm.penjamin'),
							kdpelayanan 	: kdpelayanan,
							idklstarif		: RH.getCompValue('cb.frm.klstarif')
						},
						success: function(){
							Ext.getCmp('gp.grid_tpnonumum').store.reload();
						}
					});
				}
			}			
		//}
	}
	
	function fncekkdpelyanan(){
		var m = grid_pelayanan.getSelectionModel().getSelections();
		for(var i=0; i< m.length; i++){
			var rec = m[i];
			console.log(rec);
			if(rec){
				console.log(rec.get("kdpelayanan"));
				var kdpelayanan = rec.data['kdpelayanan'];
				Ext.Ajax.request({
					url: BASE_URL + 'tpnonumum_controller/cekkdpelayanan',
					method: 'POST',
					params: {
						idpenjamin 	: Ext.getCmp('cb.frm.penjamin').getValue(),
						idklstarif 	: Ext.getCmp('cb.frm.klstarif').getValue(),
						kdpelayanan : kdpelayanan
					},
					success: function(response){
						pelayanan = response.responseText;
						if (pelayanan =='1') {
							Ext.MessageBox.alert('Message', 'Data Sudah Ada...');
						} else {
							//Ext.MessageBox.confirm('Message', 'Tambah Data Yang Di Pilih..?' , add);
							add();
						}
					}
				});
			}
		}
	}
	
	function fnSearchgrid(){		
		var idcombo, nmcombo;
		idcombo= Ext.getCmp('cb.search').getValue();
		nmcombo= Ext.getCmp('cek').getValue();
			ds_tpnonumum.setBaseParam('key',  '1');
			ds_tpnonumum.setBaseParam('id',  idcombo);
			ds_tpnonumum.setBaseParam('name',  nmcombo);
		ds_tpnonumum.load();
	}
	
	function render_klstarif(value) {
		var val = RH.getRecordFieldValue(ds_klstarif, 'nmklstarif', 'idklstarif', value);
		return RH.qtipEdit(val,'12px');
    }
	
	var fnSelect = function(combo, record){
		//The ID of THE combo must equals the field (key) to be updated
		var field = combo.getId(); 
		var value = '';
		if(record.data['nmklstarif'])
			value = record.data['nmklstarif'];
		if(record.data['idklstarif'])
			value = record.data['idklstarif'];
			
		//Update tpnonumum set the field with the value
		updateTpumum(field, value);
	};
	
	var editor = new Ext.ux.grid.RowEditor({
        saveText: 'Update',
		clicksToEdit: 2
    });
	
	var row_gridnya = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	
	var vw_grid_nya = new Ext.grid.GridView({
		emptyText: '< Belum ada Data >'
	});
	
	var grid_nya = new Ext.grid.EditorGridPanel({
		id: 'gp.grid_tpnonumum',
		store: ds_tpnonumum,
		sm: row_gridnya,
		view: vw_grid_nya,
		tbar: [{
			xtype: 'tbtext',
			style: 'marginLeft: 10px',
			text: 'Search :'
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
							Ext.getCmp('btn_cari').enable();
							Ext.getCmp('cek').focus();
						}
						return;
				}
			}
		},{
			xtype: 'textfield',
			style: 'marginLeft: 7px',
			id: 'cek',
			width: 185,
			disabled: true,
			validator: function(){
				var cek = Ext.getCmp('cek').getValue();
				if(cek == ''){
					fnSearchgrid();
				}
				return;
			}
		},{ 
			text: 'Cari',
			id:'btn_cari',
			iconCls: 'silk-find',
			style: 'marginLeft: 7px',
			disabled: true,
			handler: function() {
				var btncari = Ext.getCmp('cek').getValue();
					if(btncari != ''){
						fnSearchgrid();
					}else{
						Ext.MessageBox.alert('Message', 'Tidak ada data yang di cari');
					}
				return;
			}
		}],
		//plugins: editor, //cari_data,
		autoScroll: true,
		columnLines: true,
		height: 260, 
		forceFit: true,		
        loadMask: true,
		frame: true,
		clicksToEdit: 1,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'ID',
			width: 70,
			dataIndex: 'tarif.idpenjamin',
			sortable: true,
			hidden: true
		},{
			header: 'Kode',
			width: 75,
			dataIndex: 'tarif.kdpelayanan',
			sortable: true
		},
		{
			header: 'Nama Pelayanan',
			width: 300,
			dataIndex: 'nmpelayanan',
			sortable: true
		},
		{
			header: 'Jenis Pelayanan',
			width: 130,
			dataIndex: 'nmjnspelayanan',
			sortable: true
		},
		{
			header: 'Kelas Tarif',
			width: 70,
			dataIndex: 'nmklstarif',
			sortable: true,
			//renderer: render_klstarif,
			//editor: RH.getComboEditor('idklstarif', false, ds_klstarif, 'idklstarif', 'nmklstarif', fnSelect),
			/* editor :new Ext.form.ComboBox({
						id: 'cb.klstarif',
						store: ds_klstarif,
						triggerAction: 'all',
						valueField: 'idklstarif',
						displayField: 'nmklstarif',
						forceSelection: true,
						submitValue: true, 
						mode: 'local',
						typeAhead: false,
						selectOnFocus: true,
						editable: false,
                        listeners: {
                            change: function(){
                                fnEditKlstarif(); 
							}
						}
					}) */
		},
		{
			header: 'Tarif JS',
			width: 75,
			dataIndex: 'tarifjs',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			/* editor: {
				xtype: 'numericfield', 
				id: 'tarifjs',
				useThousandSeparator: true, 
				thousandSeparator: ','
			} */
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
			header: 'Tarif JM',
			width: 75,
			dataIndex: 'tarifjm',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			/* editor: {
				xtype: 'numericfield', 
				id: 'tarifjm',
				useThousandSeparator: true, 
				thousandSeparator: ','
			} */
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
			header: 'Tarif JP',
			width: 75,
			dataIndex: 'tarifjp',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			/* editor: {
				xtype: 'numericfield', 
				id: 'tarifjp',
				useThousandSeparator: true, 
				thousandSeparator: ','
			} */
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
			header: 'Tarif BHP',
			width: 75,
			dataIndex: 'tarifbhp',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			/* editor: {
				xtype: 'numericfield', 
				id: 'tarifbhp',
				useThousandSeparator: true, 
				thousandSeparator: ','
			} */
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
			header: 'Total Tarif',
			width: 100,
			dataIndex: 'total',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
		},{
                xtype: 'actioncolumn',
                width: 45,
				header: 'Hapus',
				align:'center',
                items: [{
					getClass: function(v, meta, record) {
						meta.attr = "style='cursor:pointer;'";
					},
                    icon   : 'application/framework/img/rh_delete.gif',
					tooltip: 'Hapus record',
                    handler: function(grid, rowIndex) {
						fnHapusTpnonumum(rowIndex);
                    }
                }]
        }],
		/* bbar: [
		{
			xtype:'tbfill'	
		},
		{
			xtype: 'fieldset',
			height: 45,
			border: false,
			items: [{
				xtype: 'numericfield', fieldLabel: 'Total Jumlah', 
				id:'tf.total', readOnly: true, disabled: false, width:100,
			}]
		}], */
		listeners: {	
			rowclick: Addrecord
		}
	});
	
	function Addrecord(grid, rowIndex, columnIndex){	
		//RH.setCompValue('tf.total', RH.sumRecVal(ds_tpnonumum, 'total'));
		
		var record = grid.getStore().getAt(rowIndex);
		RH.setCompValue('tf.frm.kdpelayanan', record.data['tarif.kdpelayanan']);
		RH.setCompValue('tf.frm.klstarif', record.data['tarif.idklstarif']);
		RH.setCompValue('tf.frm.idpenjamin', record.data['tarif.idpenjamin']);
		
		var rec = ds_tpnonumum.getAt(rowIndex);
		kdpelayanan = rec.data["tarif.kdpelayanan"];
	}
	
	editor.on({
	scope: this,
	afteredit: function(roweditor, changes, record, rowIndex) {
		
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update',
			params: {
				idpenjamin	: record.get('tarif.idpenjamin'),
				kdpelayanan	: record.get('tarif.kdpelayanan'),
				idklstarif	: record.get('tarif.idklstarif'),
				tarifjs		: record.get('tarifjs'),
				tarifjm		: record.get('tarifjm'),
				tarifjp		: record.get('tarifjp'),
				tarifbhp	: record.get('tarifbhp')
			},
			success: function() {
				// Ext.MessageBox.alert("Informasi", "Ubah Data Berhasil");
				ds_tpnonumum.reload();
				//RH.setCompValue('tf.total', RH.sumRecVal(ds_tpnonumum, 'total'));
			},
			failure: function() {
				//  Ext.MessageBox.alert("Informasi", "Ubah Data Gagal");
			}
		});
     
		}
	});
	
	function fnEditKlstarif(){
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update_klstarif',
			params: {
				idpenjamin	: Ext.getCmp('tf.frm.idpenjamin').getValue(),
				kdpelayanan	: Ext.getCmp('tf.frm.kdpelayanan').getValue(),
				idklstarif	: Ext.getCmp('cb.klstarif').getValue(),
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				//fTotal();
				Ext.getCmp('gp.grid_tpnonumum').store.reload();
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
            ds_tpnonumum.reload();
        } 
		else if(tarifjs.match(simbol)){
            alert('Masukan Angka');
            ds_tpnonumum.reload();
        } 
        else {           
            fnTarifjs(tarifjs);   
        }      
    }
	
	function fnTarifjs(tarifjs){
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update_tarifjs',
			params: {
				idpenjamin	: Ext.getCmp('tf.frm.idpenjamin').getValue(),
				kdpelayanan	: Ext.getCmp('tf.frm.kdpelayanan').getValue(),
				idklstarif	: Ext.getCmp('tf.frm.klstarif').getValue(),
                tarifjs    	: tarifjs
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				//fTotal();
				Ext.getCmp('gp.grid_tpnonumum').store.reload();
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
            ds_tpnonumum.reload();
        } 
		else if(tarifjm.match(simbol)){
            alert('Masukan Angka');
            ds_tpnonumum.reload();
        } 
        else {           
            fnTarifjm(tarifjm);   
        }      
    }
	
	function fnTarifjm(tarifjm){
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update_tarifjm',
			params: {
				idpenjamin	: Ext.getCmp('tf.frm.idpenjamin').getValue(),
				kdpelayanan	: Ext.getCmp('tf.frm.kdpelayanan').getValue(),
				idklstarif	: Ext.getCmp('tf.frm.klstarif').getValue(),
                tarifjm    : tarifjm
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				//fTotal();
				Ext.getCmp('gp.grid_tpnonumum').store.reload();
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
            ds_tpnonumum.reload();
        } 
		else if(tarifjp.match(simbol)){
            alert('Masukan Angka');
            ds_tpnonumum.reload();
        } 
        else {           
            fnTarifjp(tarifjp);   
        }      
    }
	
	function fnTarifjp(tarifjp){
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update_tarifjp',
			params: {
				idpenjamin	: Ext.getCmp('tf.frm.idpenjamin').getValue(),
				kdpelayanan	: Ext.getCmp('tf.frm.kdpelayanan').getValue(),
				idklstarif	: Ext.getCmp('tf.frm.klstarif').getValue(),
                tarifjp    : tarifjp
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				//fTotal();
				Ext.getCmp('gp.grid_tpnonumum').store.reload();
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
            ds_tpnonumum.reload();
        } 
		else if(tarifbhp.match(simbol)){
            alert('Masukan Angka');
            ds_tpnonumum.reload();
        } 
        else {           
            fnTarifbhp(tarifbhp);   
        }      
    }
	
	function fnTarifbhp(tarifbhp){
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update_tarifbhp',
			params: {
				idpenjamin	: Ext.getCmp('tf.frm.idpenjamin').getValue(),
				kdpelayanan	: Ext.getCmp('tf.frm.kdpelayanan').getValue(),
				idklstarif	: Ext.getCmp('tf.frm.klstarif').getValue(),
                tarifbhp    : tarifbhp
			},
			success: function() {
				//Ext.Msg.alert("Info", "Ubah Berhasil");
				//fTotal();
				Ext.getCmp('gp.grid_tpnonumum').store.reload();
			},
			failure: function() {
				Ext.Msg.alert("Info", "Ubah Data Gagal");
			}
		});
	}
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Tarif Pelayanan Non Umum', iconCls:'silk-user',
		width: 900, Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		//defaults: { labelWidth: 150, labelAlign: 'right', width: 910, },
		items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.70,
			//defaults: { labelWidth: 87, labelAlign: 'right'},
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Daftar Pelayanan',
				layout: 'form',
				height: 250,
				boxMaxHeight:265,
				items: [grid_pelayanan]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.30,
			layout: 'fit',
			//defaults: { labelWidth: 87, labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', 
				title: 'Informasi Kelas Perawatan',
				layout: 'form',
				height: 250,
				boxMaxHeight:265,
				items: [grid_klsrawat]
			}]
		},
		{
			xtype: 'container',
			style: 'padding: 5px; margin: -10px 0 -12px 0',
			columnWidth: 1,
			layout: 'fit',
			items: [{
				xtype: 'fieldset', 
				title: 'Daftar Tarif Pelayanan Non Umum',
				layout: 'form',
				height: 310,
				boxMaxHeight:325,
				items: [{
					xtype: 'panel', layout:'form', columnWidth: 0.99,
					id:'fp.master',
					items: [grid_nya],
					tbar: [{
						text: 'Tambah',
						id: 'btn_add',
						iconCls: 'silk-add',
						handler: function()
						{
							var m = grid_pelayanan.getSelectionModel().getSelections();
							if(m.length > 0)
							{
								fncekkdpelyanan(); 
							}
							else
							{
								Ext.MessageBox.alert('Message', 'Data Belum Di Pilih...!');
							}
						}
					},'-' ,
					{
						xtype: 'tbtext',
						text: 'Penjamin :'
					},
					{
						xtype: 'combo', id: 'cb.frm.penjamin', 
						store: ds_idpenjamin, triggerAction: 'all',
						valueField: 'idpenjamin', displayField: 'nmpenjamin',
						forceSelection: true, submitValue: true, 
						mode: 'local', emptyText:'Pilih Penjamin...', width: 250,
						editable: false,
						allowBlank: false,
						listeners: {
							select: function() {
								var ada = Ext.getCmp('cb.frm.penjamin').getValue();
								if (ada){
									Ext.getCmp('cb.frm.klstarif').setDisabled(false);
									Ext.getCmp('tf.idpenjamin').setValue(ada);
								} else {
									Ext.getCmp('cb.frm.klstarif').setDisabled(true);
								}
							}
						}						
					},'-' ,
					{
						xtype: 'tbtext',
						text: 'Kelas Tarif :'
					},
					{
						xtype: 'combo', id: 'cb.frm.klstarif', 
						store: ds_klstarif, triggerAction: 'all',
						valueField: 'idklstarif', displayField: 'nmklstarif',
						forceSelection: true, submitValue: true, 
						mode: 'local', emptyText:'Pilih Kelas Tarif...', width: 150,
						editable: false,
						allowBlank: false,
						listeners: {
							select: function() {
								var isi = Ext.getCmp('cb.frm.klstarif').getValue();
								if (isi){
									Ext.getCmp('btn_add').enable();
									Ext.getCmp('cb.search').enable();
									Ext.getCmp('tf.klstarif').setValue(isi);
								} else {
									Ext.getCmp('btn_add').disable();
									Ext.getCmp('cb.search').disable(); 
								}
							}
						}
					},/*'-',
					{
						text: 'Refresh',
						iconCls: 'silk-arrow-refresh',
						handler: function(){
							ds_tpnonumum.reload();
							Ext.getCmp('cb.frm.penjamin').reset();
							Ext.getCmp('cb.frm.klstarif').reset();
							Ext.getCmp('btn_add').disable();
							fTotal();							
						}						
					}, */		
					{
						xtype: 'textfield',
						fieldLabel: 'Kode',
						id:'tf.frm.kdpelayanan',
						width: 100,
						hidden: true
					},		
					{
						xtype: 'textfield',
						fieldLabel: 'kls',
						id:'tf.frm.klstarif',
						width: 100,
						hidden: true
					},		
					{
						xtype: 'textfield',
						fieldLabel: 'penjamin',
						id:'tf.frm.idpenjamin',
						width: 100,
						hidden: true
					},		
					{
						xtype: 'textfield',
						fieldLabel: 'penjamin',
						id:'tf.idpenjamin',
						emptyText: 'idpenjamin',
						width: 70,
						hidden: true,
						validator: function() {
							ds_tpnonumum.setBaseParam('idpenjamin', Ext.getCmp('tf.idpenjamin').getValue());
							Ext.getCmp('gp.grid_tpnonumum').store.reload();
							//fTotal();
						}
					},	
					{
						xtype: 'textfield',
						fieldLabel: 'kls',
						id:'tf.klstarif',
						emptyText: 'klstarif',
						width: 70,
						hidden: true,
						validator: function() {
							ds_tpnonumum.setBaseParam('klstarif', Ext.getCmp('tf.klstarif').getValue());
							Ext.getCmp('gp.grid_tpnonumum').store.reload();
							//fTotal();
						}
					}]
				}]
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
		//fTotal();
		Ext.getCmp('btn_add').setDisabled(true);		
		Ext.getCmp('cb.search').setDisabled(true);
		Ext.getCmp('cb.frm.klstarif').setDisabled(true);
		ds_tpnonumum.reload();
		
		//Ext.getCmp('btn_klstarif').disable();
	}
	
	/* function fTotal(){
		ds_tpnonumum.reload({
			scope   : this,
			callback: function(records, operation, success) {
				sum = 0; 
				ds_tpnonumum.each(function (rec) { sum += parseFloat(rec.get('total')); });
				Ext.getCmp("tf.total").setValue(sum);
			}
		});
	} */
	
	function reloadTpumum(){
		ds_tpnonumum.reload();
	}
	
	function fnEditTpnonumum(grid, record){
		var record = ds_tpnonumum.getAt(record);
		wEntryTpnonumum(true, grid, record);		
	}
	
	function fnDeleteTpnonumum(grid, record){
		var record = ds_tpnonumum.getAt(record);
		var url = BASE_URL + 'tpnonumum_controller/delete_tpnonumum';
		var params = new Object({
						idpenjamin	: record.data['tarif.idpenjamin'],
						kdpelayanan	: record.data['tarif.kdpelayanan'],
						idklstarif	: record.data['tarif.idklstarif']
					});
		RH.deleteGridRecord(url, params, grid );
		fTotal();
	}
	
	function fnHapusTpnonumum(record){
		var record = ds_tpnonumum.getAt(record);
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
				url: BASE_URL + 'tpnonumum_controller/delete_tpnonumum',
				params: {				
					idpenjamin	: record.data['tarif.idpenjamin'],
					kdpelayanan	: record.data['tarif.kdpelayanan'],
					idklstarif	: record.data['tarif.idklstarif']
				},
				success: function(response){
					Ext.MessageBox.alert('Informasi', 'Hapus Data Berhasil');
					ds_tpnonumum.reload();
				},
				failure: function() {
					//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
				}
			});
			
			}            
		});	
	}
	
	function updateTpumum(field, value){		
		Ext.Ajax.request({
			url: BASE_URL + 'tpnonumum_controller/update1field_tpnonumum',
			params: {
				idpenjamin		: RH.getCompValue('tf.frm.idpenjamin',true),
				kdpelayanan		: RH.getCompValue('tf.frm.kdpelayanan',true),
				idklstarif		: RH.getCompValue('tf.frm.klstarif',true),
				field			: field,
				value 			: value,
			},
			success: function() {
				//RH.setCompValue('tf.total', record.data['total']);				
				//Ext.Msg.alert("Informasi", "Ubah Data Berhasil");
				//RH.setCompValue('tf.total', RH.sumRecVal(ds_tpnonumum, 'total'));
				//fTotal();
				ds_tpnonumum.reload();
			},
			failure: function() {
				//Ext.Msg.alert("Informasi", "Ubah Data Gagal");
			}
		});
	}
}
