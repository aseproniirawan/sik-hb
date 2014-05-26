function Mklsperawatan(){
	var pageSize = 18;
	var ds_klsrawat = dm_klsrawat();
	var ds_klstarif = dm_klstarif();
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
		store: ds_klsrawat,
		displayInfo: true,
		displayMsg: 'Data Kelas Perawatan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_klsrawat',
		store: ds_klsrawat,
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
				fnAddKlsrawat();
				Ext.getCmp('tf.frm.idklsrawat').focus();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Bagian (Unit/Ruangan)',
			width: 250,
			dataIndex: 'nmbagian',
			sortable: true
		},{
			header: 'Kelas Traif',
			width: 150,
			dataIndex: 'nmklstarif',
			sortable: true
		},{
			header: 'Kode Kelas Perawatan',
			width: 150,
			dataIndex: 'kdklsrawat',
			sortable: true
		},
		{
			header: 'Nama Kelas Perawatan',
			width: 150,
			dataIndex: 'nmklsrawat',
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
						fnEditKlsrawat(grid, rowIndex);
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
						fnDeleteKlsrawat(grid, rowIndex);
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
		title: 'Kelas Perawatan', iconCls:'silk-calendar',
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
	
	function reloadKlsrawat(){
		ds_klsrawat.reload();
	}
	
	function fnAddKlsrawat(){
		var grid = grid_nya;
		wEntryKlsrawat(false, grid, null);	
	}
	
	function fnEditKlsrawat(grid, record){
		var record = ds_klsrawat.getAt(record);
		wEntryKlsrawat(true, grid, record);		
	}
	
	function fnDeleteKlsrawat(grid, record){
		var record = ds_klsrawat.getAt(record);
		var url = BASE_URL + 'klsperawatan_controller/delete_klsperawatan';
		var params = new Object({
						idklsrawat	: record.data['idklsrawat']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function wEntryKlsrawat(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Kelas Perawatan (Edit)':'Kelas Perawatan (Entry)';
		var klsrawat_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.klsrawat',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 200, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [     
			{
				id: 'tf.frm.idklsrawat', 
				hidden: true,
			},{
				xtype: 'compositefield',
				fieldLabel: 'Bagian (Unit/Ruangan)',
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
			},{
				xtype: 'combo', id: 'cb.frm.klstarif', 
				fieldLabel: 'Kelas Tarif',
				store: ds_klstarif, triggerAction: 'all',
				valueField: 'idklstarif', displayField: 'nmklstarif',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 275,
				editable: false, allowBlank: false,
			},    
			{
				id: 'tf.frm.kdklsrawat', 
				fieldLabel: 'Kode Kelas',
				width: 150,
			},{
				id: 'tf.frm.nmklsrawat', 
				fieldLabel: 'Nama Kelas',
				width: 300,       
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveklsrawat();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wKlsrawat.close();
				}
			}]
		});
			
		var wKlsrawat = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [klsrawat_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setKlsrawatForm(isUpdate, record);
		wKlsrawat.show();

	/**
	FORM FUNCTIONS
	*/	
		function setKlsrawatForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idklsrawat'));
					RH.setCompValue('tf.frm.idklsrawat', record.get('idklsrawat'));
					RH.setCompValue('tf.frm.kdklsrawat', record.get('kdklsrawat'));
					RH.setCompValue('tf.frm.nmklsrawat', record.get('nmklsrawat'));
					RH.setCompValue('cb.frm.klstarif', record.data['idklstarif']);
					RH.setCompValue('cb.bagian', record.data['idbagian']);
					return;
				}
			}
		}
		
		function fnSaveklsrawat(){
			var idForm = 'frm.klsrawat';
			var sUrl = BASE_URL +'klsperawatan_controller/insert_klsperawatan';
			var sParams = new Object({
				idklsrawat		:	RH.getCompValue('tf.frm.idklsrawat'),
				idbagian		:	RH.getCompValue('cb.bagian'),
				idklstarif		:	RH.getCompValue('cb.frm.klstarif'),
				kdklsrawat		:	RH.getCompValue('tf.frm.kdklsrawat'),
				nmklsrawat		:	RH.getCompValue('tf.frm.nmklsrawat'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'klsperawatan_controller/update_klsperawatan';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wKlsrawat, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
	}
	
	function fnwBagian(){
		var cm_bagian = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),
			{
				header: 'Bagian (Unit/Ruangan)',
				dataIndex: 'nmbagian',
				width: 200,
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
			displayMsg: 'Data Bagian (Unit/Ruangan) Dari {0} - {1} of {2}',
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
			title: 'Cari Bagian (Unit/Ruangan)',
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
}