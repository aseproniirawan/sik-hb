function Mjadwalpraktek(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_jadwalpraktek = dm_jadwalpraktek();
	var ds_dokter = dm_dokter();
	var ds_bagian = dm_bagian();
	var ds_hari = dm_hari();
	var ds_shift = dm_shift();
	var ds_jampraktek = dm_jampraktek();
	
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
		store: ds_jadwalpraktek,
		displayInfo: true,
		displayMsg: 'Data Jadwal Praktek Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jadwalpraktek',
		store: ds_jadwalpraktek,		
		autoScroll: true,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddJadwalpraktek();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Bagian',
			width: 150,
			dataIndex: 'nmbagian',
			sortable: true
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmdokter',
			sortable: true
		},
		{
			header: 'Hari',
			width: 80,
			dataIndex: 'nmhari',
			sortable: true
		},
		{
			header: 'Shift',
			width: 80,
			dataIndex: 'nmshift',
			sortable: true
		},
		{
			header: 'Jam Praktek',
			width: 100,
			dataIndex: 'jampraktek',
			sortable: true
		},
		{
			header: 'Keterangan',
			width: 200,
			dataIndex: 'keterangan',
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
						fnEditJadwalpraktek(grid, rowIndex);
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
						fnDeleteJadwalpraktek(grid, rowIndex);
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
		title: 'Jadwal Praktek Dokter', iconCls:'silk-user',
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
	
	function reloadJadwalpraktek(){
		ds_jadwalpraktek.reload();
	}
	
	function fnAddJadwalpraktek(){
		var grid = grid_nya;
		wEntryJadwalpraktek(false, grid, null);	
	}
	
	function fnEditJadwalpraktek(grid, record){
		var record = ds_jadwalpraktek.getAt(record);
		wEntryJadwalpraktek(true, grid, record);		
	}
	
	function fnDeleteJadwalpraktek(grid, record){
		var record = ds_jadwalpraktek.getAt(record);
		var url = BASE_URL + 'jadwalpraktek_controller/delete_jadwalpraktek';
		var params = new Object({
						idjadwalpraktek	: record.data['idjadwalpraktek']
					});
		RH.deleteGridRecord(url, params, grid );
	}

	/**
	WIN - FORM ENTRY/EDIT 
	*/
	function wEntryJadwalpraktek(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Jadwal Praktek Dokter (Edit)':'Jadwal Praktek Dokter (Entry)';
		var jadwalpraktek_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.jadwalpraktek',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 300, width: 450,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.idjadwalpraktek', 
				hidden: true,
			},
			{
				xtype: 'combo', id: 'cb.frm.bagian', 
				fieldLabel: 'Bagian',
				store: ds_bagian, triggerAction: 'all',
				valueField: 'idbagian', displayField: 'nmbagian',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 200,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.dokter', 
				fieldLabel: 'Nama Dokter',
				store: ds_dokter, triggerAction: 'all',
				valueField: 'iddokter', displayField: 'nmdokter',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 200,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.hari', 
				fieldLabel: 'Hari',
				store: ds_hari, triggerAction: 'all',
				valueField: 'idhari', displayField: 'nmhari',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.shift', 
				fieldLabel: 'Shift',
				store: ds_shift, triggerAction: 'all',
				valueField: 'idshift', displayField: 'nmshift',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
			},{
				xtype: 'combo', id: 'cb.frm.jampraktek', 
				fieldLabel: 'Jam Praktek',
				store: ds_jampraktek, triggerAction: 'all',
				valueField: 'nmjampraktek', displayField: 'nmjampraktek',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Keterangan',
				id:'ta.frm.keterangan',
				width: 200,
				sortable: true,
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveJadwalpraktek();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wJadwalpraktek.close();
				}
			}]
		});
			
		var wJadwalpraktek = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [jadwalpraktek_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setJadwalpraktekForm(isUpdate, record);
		wJadwalpraktek.show();

	/**
	FORM FUNCTIONS
	*/	
		function setJadwalpraktekForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idjadwalpraktek'));
					RH.setCompValue('tf.frm.idjadwalpraktek', record.get('idjadwalpraktek'));
					RH.setCompValue('cb.frm.bagian', record.data['idbagian']);	
					RH.setCompValue('cb.frm.dokter', record.get('iddokter'));
					RH.setCompValue('cb.frm.hari', record.data['idhari']);
					RH.setCompValue('cb.frm.shift', record.get('idshift'));
					RH.setCompValue('cb.frm.jampraktek', record.get('jampraktek'));
					RH.setCompValue('ta.frm.keterangan', record.get('keterangan'));
					return;
				}
			}
		}
		
		function fnSaveJadwalpraktek(){
			var idForm = 'frm.jadwalpraktek';
			var sUrl = BASE_URL +'jadwalpraktek_controller/insert_jadwalpraktek';
			var sParams = new Object({
				idjadwalpraktek		:	RH.getCompValue('tf.frm.idjadwalpraktek'),
				idbagian			:	RH.getCompValue('cb.frm.bagian'),
				iddokter			:	RH.getCompValue('cb.frm.dokter'),
				idhari				:	RH.getCompValue('cb.frm.hari'),
				idshift				:	RH.getCompValue('cb.frm.shift'),
				jampraktek			:	RH.getCompValue('cb.frm.jampraktek'),
				keterangan			:	RH.getCompValue('ta.frm.keterangan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'jadwalpraktek_controller/update_jadwalpraktek';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wJadwalpraktek, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}