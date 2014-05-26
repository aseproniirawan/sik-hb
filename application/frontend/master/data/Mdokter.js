function Mdokter(){
//Ext.form.Field.prototype.msgTarget = 'side';
	//var SYS_DATE = new Date();
	var pageSize = 18;
	var ds_dokter = dm_dokter();
	var ds_jkelamin = dm_jkelamin();
	var ds_spdokter = dm_spdokter();
	var ds_status = dm_status();
	var ds_stdokter = dm_stdokter();
	var ds_bagian = dm_bagian();
	var ds_bagianklsperawatan = dm_bagianklsperawatan();
	
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
		store: ds_dokter,
		displayInfo: true,
		displayMsg: 'Data Dokter Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_dokter',
		store: ds_dokter,		
		autoScroll: true,
		height: 530,//autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddDokter();
				//Ext.getCmp('tf.frm.kddokter').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 70,
			dataIndex: 'kddokter',
			sortable: true
		},
		{
			header: 'Nama Dokter Tanpa Gelar',
			width: 170,
			dataIndex: 'nmdokter',
			sortable: true
		},
		{
			header: 'Nama Dokter Dengan Gelar',
			width: 220,
			dataIndex: 'nmdoktergelar',
			sortable: true
		},
		{
			header: 'Jenis Kelamin',
			width: 100,
			dataIndex: 'nmjnskelamin',
			sortable: true
		},
		{
			header: 'Tempat lahir',
			width: 100,
			dataIndex: 'tptlahir',
			sortable: true
		},
		{
			header: 'Tanggal Lahir',
			width: 80,
			dataIndex: 'tgllahir',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Alamat',
			width: 200,
			dataIndex: 'alamat',
			sortable: true
		},
		{
			header: 'No. Telepon',
			width: 100,
			dataIndex: 'notelp',
			sortable: true
		},
		{
			header: ' No. Handphone',
			width: 100,
			dataIndex: 'nohp',
			sortable: true
		},
		{
			header: 'Spesialisasi',
			width: 300,
			dataIndex: 'nmspesialisasi',
			sortable: true
		},
		{
			header: 'Status',
			width: 100,
			dataIndex: 'nmstatus',
			sortable: true
		},
		{
			header: 'Status Dokter',
			width: 100,
			dataIndex: 'nmstdokter',
			sortable: true
		},
		{
			header: 'Catatan',
			width: 150,
			dataIndex: 'catatan',
			sortable: true
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
						fnEditDokter(grid, rowIndex);
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
						fnDeleteDokter(grid, rowIndex);
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
		title: 'Dokter', iconCls:'silk-user',
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
	
	function reloadDokter(){
		ds_dokter.reload();
	}
	
	function fnAddDokter(){
		var grid = grid_nya;
		wEntryDokter(false, grid, null);	
	}
	
	function fnEditDokter(grid, record){
		var record = ds_dokter.getAt(record);
		wEntryDokter(true, grid, record);		
	}
	
	function fnDeleteDokter(grid, record){
		var record = ds_dokter.getAt(record);
		var url = BASE_URL + 'dokter_controller/delete_dokter';
		var params = new Object({
						iddokter	: record.data['iddokter']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryDokter(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Dokter (Edit)':'Dokter (Entry)';
		var dokter_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.dokter',
			buttonAlign: 'left',
			labelWidth: 180, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 525, width: 525,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.iddokter', 
				hidden: true,
			},
			{
				fieldLabel: 'Kode',
				id:'tf.frm.kddokter',
				width: 100,
				allowBlank: false
			},
			{
				fieldLabel: 'Nama Dokter Tanpa Gelar',
				id:'tf.frm.nmdokter',
				width: 300,
				allowBlank: false
			},
			{
				fieldLabel: 'Nama Dokter Dengan Gelar',
				id:'tf.frm.nmdoktergelar',
				width: 300,
			},
			{
				xtype: 'combo', id: 'cb.frm.jkelamin', 
				fieldLabel: 'Jenis Kelamin',
				store: ds_jkelamin, triggerAction: 'all',
				valueField: 'idjnskelamin', displayField: 'nmjnskelamin',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},
			{
				fieldLabel: 'Tempat lahir',
				id:'tf.frm.tptlahir',
				width: 300,
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Lahir',
				id: 'df.frm.tgllahir',
				name: 'df.frm.tgllahir',
				format: "d/m/Y",
				width: 100,
				editable: false
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Alamat',
				id: 'ta.frm.alamat',
				name: 'ta.frm.alamat',
				width: 300,
			},
			{
				fieldLabel: 'No. Telepon',
				id:'tf.frm.notelp',
				width: 300,
			},
			{
				fieldLabel: 'No. Handphone',
				id:'tf.frm.nohp',
				width: 300,
			},
			{
				xtype: 'compositefield',
				fieldLabel: 'Spesialisasi',
				id: 'comp_sp',
				items: [{
					xtype: 'combo', id: 'cb.spesialisasi',					
					store: ds_spdokter, triggerAction: 'all',
					valueField: 'idspesialisasi', displayField: 'nmspesialisasi',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 275,
					editable: false, allowBlank: false,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.bagian',
					width: 4,
					handler: function() {
						fnwSpesialisasi();
						ds_spdokter.load();
					}
				}]
			},
			{
				xtype: 'combo', id: 'cb.frm.status', 
				fieldLabel: 'Status',
				store: ds_status, triggerAction: 'all',
				valueField: 'idstatus', displayField: 'nmstatus',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.stdokter', 
				fieldLabel: 'Status Dokter',
				store: ds_stdokter, triggerAction: 'all',
				valueField: 'idstdokter', displayField: 'nmstdokter',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false, allowBlank: false,
			},{
				xtype: 'compositefield',
				fieldLabel: 'Dokter Bagian',
				id: 'comp_bagian',
				items: [{
					xtype: 'combo', id: 'cb.bagian',					
					store: ds_bagian, triggerAction: 'all',
					valueField: 'idbagian', displayField: 'nmbagian',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 275,
					editable: false, allowBlank: false,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.bagian',
					width: 4,
					handler: function() {
						fnwBagian();
						ds_bagianklsperawatan.load();
					}
				}]
			},		
			{	xtype: 'textarea',
				fieldLabel: 'Catatan',
				id: 'ta.frm.catatan',
				name: 'ta.frm.catatan',
				width: 300
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveDokter();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wDokter.close();
				}
			}]
		});
			
		var wDokter = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [dokter_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setDokterForm(isUpdate, record);
		wDokter.show();

	/**
	FORM FUNCTIONS
	*/	
		function setDokterForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('iddokter'));
					RH.setCompValue('tf.frm.iddokter', record.get('iddokter'));
					RH.setCompValue('tf.frm.kddokter', record.get('kddokter'));
					RH.setCompValue('tf.frm.nmdokter', record.get('nmdokter'));
					RH.setCompValue('tf.frm.nmdoktergelar', record.data['nmdoktergelar']);
					RH.setCompValue('cb.frm.jkelamin', record.data['idjnskelamin']);				
					RH.setCompValue('tf.frm.tptlahir', record.get('tptlahir'));
					RH.setCompValue('df.frm.tgllahir', record.get('tgllahir'));
					RH.setCompValue('ta.frm.alamat', record.get('alamat'));
					RH.setCompValue('tf.frm.notelp', record.get('notelp'));
					RH.setCompValue('tf.frm.nohp', record.get('nohp'));
					RH.setCompValue('cb.spesialisasi', record.get('idspesialisasi'));
					RH.setCompValue('cb.frm.status', record.data['idstatus']);
					RH.setCompValue('cb.frm.stdokter', record.get('idstdokter'));
					RH.setCompValue('ta.frm.catatan', record.get('catatan'));	
					RH.setCompValue('cb.bagian', record.get('nmbagian'));	
					//Ext.getCmp('tf.frm.kddokter').setReadOnly(true);
					return;
				}
			}
		}
		
		function fnSaveDokter(){
			var idForm = 'frm.dokter';
			var sUrl = BASE_URL +'dokter_controller/insert_dokter';
			var sParams = new Object({
				iddokter		:	RH.getCompValue('tf.frm.iddokter'),
				kddokter		:	RH.getCompValue('tf.frm.kddokter'),
				nmdokter		:	RH.getCompValue('tf.frm.nmdokter'),
				nmdoktergelar	:	RH.getCompValue('tf.frm.nmdoktergelar'),
				idjnskelamin	:	RH.getCompValue('cb.frm.jkelamin'),
				tptlahir		:	RH.getCompValue('tf.frm.tptlahir'),
				tgllahir		:	RH.getCompValue('df.frm.tgllahir'),
				alamat			:	RH.getCompValue('ta.frm.alamat'),
				notelp			:	RH.getCompValue('tf.frm.notelp'),
				nohp			:	RH.getCompValue('tf.frm.nohp'),
				idspesialisasi	:	RH.getCompValue('cb.spesialisasi'),
				idstatus		:	RH.getCompValue('cb.frm.status'),
				idstdokter		:	RH.getCompValue('cb.frm.stdokter'),
				catatan			:	RH.getCompValue('ta.frm.catatan'),
				idbagian		:	RH.getCompValue('cb.bagian'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'dokter_controller/update_dokter';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wDokter, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
	
	function fnwBagian(){
		var cm_bagian = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),
			{
				header: 'Nama Bagian',
				dataIndex: 'nmbagian',
				width: 200
			},{
				header: 'Jenis Pelayanan',
				dataIndex: 'nmjnspelayanan',
				width: 150
			},{
				header: 'Bidang Perawatan',
				dataIndex: 'nmbdgrawat',
				width: 220
			}
		]);
		
		var sm_bagian = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_bagian = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_bagian = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_bagianklsperawatan,
			displayInfo: true,
			displayMsg: 'Data Bagian Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_bagian = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_bagian = new Ext.grid.GridPanel({
			ds: ds_bagianklsperawatan,
			cm: cm_bagian,
			sm: sm_bagian,
			view: vw_bagian,
			height: 460,
			width: 620,
			plugins: cari_bagian,
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
			bbar: paging_bagian,
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
			var rec_cari_bagian = ds_bagianklsperawatan.getAt(rowIdx);
			var var_cari_idbagian = rec_cari_bagian.data["idbagian"];
			//var var_cari_bagian = rec_cari_bagian.data["nmbagian"];
						
			//Ext.getCmp('tf.bagian').focus();
			//Ext.getCmp("tf.bagian").setValue(var_cari_bagian);
			Ext.getCmp("cb.bagian").setValue(var_cari_idbagian);
						win_find_cari_bagian.close();
		}
	}
	
	function fnwSpesialisasi(){
		var cm_spesialisasi = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),
			{
				header: 'Spesialisasi',
				dataIndex: 'nmspesialisasi',
				width: 350
			}
		]);
		
		var sm_spesialisasi = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_spesialisasi = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_spesialisasi = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_spdokter,
			displayInfo: true,
			displayMsg: 'Data Spesialisasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_spesialisasi = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_spesialisasi = new Ext.grid.GridPanel({
			ds: ds_spdokter,
			cm: cm_spesialisasi,
			sm: sm_spesialisasi,
			view: vw_spesialisasi,
			height: 460,
			width: 395,
			plugins: cari_spesialisasi,
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
			bbar: paging_spesialisasi,
			listeners: {
				rowdblclick: klik_cari_spesialisasi
			}
		});
		var win_find_cari_spesialisasi = new Ext.Window({
			title: 'Cari Spesialisasi',
			modal: true,
			items: [grid_find_cari_spesialisasi]
		}).show();

		function klik_cari_spesialisasi(grid, rowIdx){
			var rec_cari_spesialisasi = ds_spdokter.getAt(rowIdx);
			var var_cari_idspdokter = rec_cari_spesialisasi.data["idspesialisasi"];
			
			Ext.getCmp("cb.spesialisasi").setValue(var_cari_idspdokter);
						win_find_cari_spesialisasi.close();
		}
	}
}