function Mhlibur(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_hlibur = dm_hlibur();
	var ds_jlibur = dm_jlibur();
	
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
		store: ds_hlibur,
		displayInfo: true,
		displayMsg: 'Data Hari Libur Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_hlibur',
		store: ds_hlibur,		
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
				fnAddHlibur();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Nama Libur',
			width: 150,
			dataIndex: 'nmjnslibur',
			sortable: true
		},
		{
			header: 'Tanggal',
			width: 80,
			dataIndex: 'tgllibur',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Keterangan',
			width: 250,
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
						fnEditHlibur(grid, rowIndex);
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
						fnDeleteHlibur(grid, rowIndex);
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
		title: 'Hari Libur', iconCls:'silk-calendar',
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
	
	function reloadHlibur(){
		ds_hlibur.reload();
	}
	
	function fnAddHlibur(){
		var grid = grid_nya;
		wEntryHlibur(false, grid, null);	
	}
	
	function fnEditHlibur(grid, record){
		var record = ds_hlibur.getAt(record);
		wEntryHlibur(true, grid, record);		
	}
	
	function fnDeleteHlibur(grid, record){
		var record = ds_hlibur.getAt(record);
		var url = BASE_URL + 'hlibur_controller/delete_hlibur';
		var params = new Object({
						idhlibur	: record.data['idhlibur']
					});
		RH.deleteGridRecord(url, params, grid );
	}

	/**
	WIN - FORM ENTRY/EDIT 
	*/
	function wEntryHlibur(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Hari Libur (Edit)':'Hari Libur (Entry)';
		var hlibur_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.hlibur',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 230, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.idlibur', 
				hidden: true,
			},
			{
				xtype: 'combo', id: 'cb.frm.jlibur', 
				fieldLabel: 'Nama Libur',
				store: ds_jlibur, triggerAction: 'all',
				valueField: 'idjnslibur', displayField: 'nmjnslibur',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},		
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal',
				id: 'df.frm.tgllibur',
				name: 'df.frm.tgllibur',
				format: "d/m/Y",
				allowBlank: false,
				width: 100,
				editable: false
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Keterangan',
				id:'ta.frm.keterangan',
				width: 300,
				sortable: true
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveHlibur();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wHlibur.close();
				}
			}]
		});
			
		var wHlibur = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [hlibur_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setHliburForm(isUpdate, record);
		wHlibur.show();

	/**
	FORM FUNCTIONS
	*/	
		function setHliburForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idhlibur'));
					RH.setCompValue('tf.frm.idlibur', record.get('idlibur'));
					RH.setCompValue('cb.frm.jlibur', record.data['idjnslibur']);
					RH.setCompValue('df.frm.tgllibur', record.get('tgllibur'));
					RH.setCompValue('ta.frm.keterangan', record.get('keterangan'));
					return;
				}
			}
		}
		
		function fnSaveHlibur(){
			var idForm = 'frm.hlibur';
			var sUrl = BASE_URL +'hlibur_controller/insert_hlibur';
			var sParams = new Object({
				idlibur			:	RH.getCompValue('tf.frm.idlibur'),
				idjnslibur		:	RH.getCompValue('cb.frm.jlibur'),
				tgllibur		:	RH.getCompValue('df.frm.tgllibur'),
				keterangan		:	RH.getCompValue('ta.frm.keterangan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'hlibur_controller/update_hlibur';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wHlibur, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}