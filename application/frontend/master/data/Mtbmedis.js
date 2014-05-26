function Mtbmedis(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_tbmedis = dm_tbmedis();
	var ds_jnsbrg = dm_jnsbrg();
	
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
		store: ds_tbmedis,
		displayInfo: true,
		displayMsg: 'Data Tarif Barang Medis Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_tbmedis',
		store: ds_tbmedis,		
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
				fnAddTbmedis();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Jenis Barang',
			width: 200,
			dataIndex: 'nmjnsbrg',
			sortable: true
		},
		{
			header: 'Margin Barang Medis',
			width: 150,
			dataIndex: 'margin',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
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
						fnEditTbmedis(grid, rowIndex);
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
						fnDeleteTbmedis(grid, rowIndex);
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
		title: 'Tarif Barang Medis', iconCls:'silk-calendar',
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
	
	function reloadTbmedis(){
		ds_tbmedis.reload();
	}
	
	function fnAddTbmedis(){
		var grid = grid_nya;
		wEntryTbmedis(false, grid, null);	
	}
	
	function fnEditTbmedis(grid, record){
		var record = ds_tbmedis.getAt(record);
		wEntryTbmedis(true, grid, record);		
	}
	
	function fnDeleteTbmedis(grid, record){
		var record = ds_tbmedis.getAt(record);
		var url = BASE_URL + 'tbmedis_controller/delete_tbmedis';
		var params = new Object({
						idmarginbrg	: record.data['idmarginbrg']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryTbmedis(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Tarif Barang Medis (Edit)':'Tarif Barang Medis (Entry)';
		var tbmedis_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.tbmedis',
			buttonAlign: 'left',
			labelWidth: 130, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 180, width: 400,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.idmarginbrg', 
				hidden: true,
			},
			{
				xtype: 'compositefield',
				fieldLabel: 'Jenis Barang',
				id: 'comp_jnsbrg',
				items: [{
					xtype: 'combo', id: 'cb.jbarang', 
					store: ds_jnsbrg, triggerAction: 'all',
					valueField: 'idjnsbrg', displayField: 'nmjnsbrg',
					forceSelection: true, submitValue: true, 
					mode: 'local', emptyText:'Pilih...', width: 150,
					editable: false, allowBlank: false,
					readOnly: true
				},{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn.jnsbrg',
					width: 4,
					handler: function() {
						fnwJbarang();
						ds_jnsbrg.load();
					}
				}]
			},
			{
				xtype: 'compositefield',
				fieldLabel: 'Margin Barang Medis',
				id:'com_margin',
				items: [
					{
					xtype: 'numericfield',
					fieldLabel: 'Margin Barang Medis',
					id:'tf.frm.margin',
					width: 100,
					decimalPrecision: 2,		
					decimalSeparator: ',',						
					thousandSeparator: '.',
					alwaysDisplayDecimals: true,
					useThousandSeparator: true,
				},{
					xtype: 'label', id: 'lb.lb', text: '%', margins: '3 0 0 0',
				}]				
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveTbmedis();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wTbmedis.close();
				}
			}]
		});
			
		var wTbmedis = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [tbmedis_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setTbmedisForm(isUpdate, record);
		wTbmedis.show();

	/**
	FORM FUNCTIONS
	*/	
		function setTbmedisForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('iddokter'));
					RH.setCompValue('tf.frm.idmarginbrg', record.get('idmarginbrg'));
					RH.setCompValue('cb.jbarang', record.data['idjnsbrg']);
					RH.setCompValue('tf.frm.margin', record.get('margin'));
					return;
				}
			}
		}
		
		function fnSaveTbmedis(){
			var idForm = 'frm.tbmedis';
			var sUrl = BASE_URL +'tbmedis_controller/insert_tbmedis';
			var sParams = new Object({
				idmarginbrg		:	RH.getCompValue('tf.frm.idmarginbrg'),
				idjnsbrg		:	RH.getCompValue('cb.jbarang'),
				margin			:	RH.getCompValue('tf.frm.margin'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'tbmedis_controller/update_tbmedis';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wTbmedis, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}					
	}
	
	function fnwJbarang(){
		var cm_jnsbrg = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
			{
				header: 'Jenis Barang',
				dataIndex: 'nmjnsbrg',
				width: 400
			}
		]);
		
		var sm_jnsbrg = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		
		var vw_jnsbrg = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_jnsbrg = new Ext.PagingToolbar({
			pageSize: 18,
			store: ds_jnsbrg,
			displayInfo: true,
			displayMsg: 'Data Jenis Barang Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var cari_jnsbrg = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		
		var grid_find_cari_jnsbrg = new Ext.grid.GridPanel({
			ds: ds_jnsbrg,
			cm: cm_jnsbrg,
			sm: sm_jnsbrg,
			view: vw_jnsbrg,
			height: 460,
			width: 430,
			plugins: cari_jnsbrg,
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
			bbar: paging_jnsbrg,
			listeners: {
				rowdblclick: klik_cari_jnsbrg
			}
		});
		var win_find_cari_jnsbrg = new Ext.Window({
			title: 'Cari Jenis Barang',
			modal: true,
			items: [grid_find_cari_jnsbrg]
		}).show();

		function klik_cari_jnsbrg(grid, rowIdx){
			var rec_cari_jnsbrg = ds_jnsbrg.getAt(rowIdx);
			var var_cari_idjnsbrg = rec_cari_jnsbrg.data["idjnsbrg"];
			//var var_cari_jnsbrg = rec_cari_jnsbrg.data["nmjnsbrg"];
						
			//Ext.getCmp('tf.jnsbrg').focus();
			//Ext.getCmp("tf.jnsbrg").setValue(var_cari_jnsbrg);
			Ext.getCmp("cb.jbarang").setValue(var_cari_idjnsbrg);
						win_find_cari_jnsbrg.close();
		}
	}	
}
