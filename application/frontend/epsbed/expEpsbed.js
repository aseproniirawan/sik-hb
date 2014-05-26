function expEpsbed() {
 
	var ds_grid = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'c_epsbed/get_all_table',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 5
		},
		root: 'data',
		totalProperty: 'results',
		autoLoad: true,
		fields: [{
			name: 'table_name',
			mapping: 'table_name'
		},
		{
			name: 'table_comment',
			mapping: 'table_comment'
		}]
	}); 
	
	
	var cm = new Ext.grid.ColumnModel({
		// specify any defaults for each column
		defaults: {
			sortable: true // columns are not sortable by default           
		},
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'File',
			width: 150,
			dataIndex: 'table_name',
			sortable: true
		},{
			header: 'Keterangan',
			width: 300,
			dataIndex: 'table_comment',
			sortable: true
		},{
                xtype: 'actioncolumn',
                width: 50,
				header: 'Export',
				align:'center',
                items: [{
                    icon   : 'resources/img/icons/fam/disk.png',
					tooltip: 'Export Data',
                    handler: function(grid, rowIndex) {
                         var rec = ds_grid.getAt(rowIndex);
						 var tabname = rec.get('table_name');
						 
						 var akademik = Ext.getCmp('thnakademik').getValue();
						 var prodi = Ext.getCmp('kdprodi').getValue();
			
						 if (akademik  && prodi) {
							exportdata(tabname);
						 } else {
							Ext.MessageBox.alert("Informasi", "Pilih Tahun Akademik dan Program Studi");
						 }
                    }
                }]
            }]
	});
	var vw = new Ext.grid.GridView({
		emptyText: '< No Data To Display >'
	});
	var sm_nya = new Ext.grid.CheckboxSelectionModel({
		singleSelect:true,
		listeners: {
			//	rowselect: select_action,
			//	rowdeselect: deselect_action
		}
	});
	var cari_data = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'local',
		width: 200
	})];
	var paging = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_grid,
		displayInfo: true,
		displayMsg: 'Data Tabel EPSBED Dari {0} - {1} of {2}',
		emptyMsg: 'Data Tabel EPSBED Belum Dipilih.'
	});
	var grid_nya = new Ext.grid.EditorGridPanel({
		store: ds_grid,
		frame: true,
		//width: 1140,
		height: 530,
		plugins: cari_data,
		id: 'grid_det',
		buttonAlign: 'left',
		defaults: {
			anchor: '-10'
		},
		forceFit: true,
		tbar: [{
			xtype: 'buttongroup',
			title: 'Pencarian',
			columns: 2,
			width: 800,
			defaults: {
				scale: 'small'
			},
			items: [{
				text: 'Tahun Akademik - Semester'
			},
			{
				xtype: 'combo',
				store: ds_thnakademik2,
				name: 'thnakademik',
				id: 'thnakademik',
				triggerAction: 'all',
				editable: false,
				valueField: 'kdstsemester',
				displayField: 'nmthnakademik',
				forceSelection: true,
				submitValue: true,
				hiddenName: 'h_thnkademik',
				listeners: {},
				typeAhead: true,
				mode: 'local',
				emptyText: 'Pilih...',
				selectOnFocus: true,
				width: 150
			},
			{
				text: 'Program Studi'
			},
			{
				xtype: 'combo',
				store: ds_prodi,
				name: 'kdprodi',
				id: 'kdprodi',
				triggerAction: 'all',
				editable: true,
				valueField: 'kdprodi',
				displayField: 'nmprodi',
				forceSelection: true,
				submitValue: true,
				hiddenName: 'h_kdprodi',
				listeners: {},
				typeAhead: true,
				mode: 'local',
				emptyText: 'Pilih...',
				selectOnFocus: true,
				width: 250
			}]
		},{
			text: 'Bersihkan Data Temporary',
			id: 'btn_add',
			iconCls: 'silk-arrow-refresh',
			handler: function() {
					Ext.Ajax.request({
					url: BASE_URL + 'c_epsbed/truncate_all',
					method: 'POST',
					success: function() {
							Ext.MessageBox.alert("Informasi", "Data Temporary Berhasil Dibersihkan");
						},
					failure: function() {
							Ext.MessageBox.alert("Informasi", "Data Temporary Gagal Dibersihkan");
						}
                    });
			}
		}],
		sm: sm_nya,
		vw: vw,
		autoScroll: true,
		cm: cm,
		bbar: paging,
		//autoExpandColumn: 'common',
		clicksToEdit: 1,
		listeners: {
			rowclick: function rowclick(grid, rowIdx) {
				var rec = ds_grid.getAt(rowIdx);
				nopmbx = rec.data["nopmb"];
				// alert(nopmbx);
			}
		}
	});
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general_id',
		title: 'Laporan EPSBED',
		region: 'center',
		//autoScroll: true,
		buttonAlign: 'left',
		bodyStyle: 'padding: 5px',
		border: false,
		disabled: true,
		waitMsg: 'Waiting...',
		maskDisabled: false,
		monitorValid: true,
		items: [{
			layout: 'form',
			border: false,
			items: [grid_nya]
		}]
	});
	SET_PAGE_CONTENT(form_bp_general);
	
	function exportdata(tablename){

						var procedure = "import_" + tablename + " (?,?)";
						var param = Ext.getCmp('thnakademik').getValue() + 'x' + Ext.getCmp('kdprodi').getValue();
                        var table = tablename;

						Ext.Ajax.request({
						url: BASE_URL + 'c_epsbed/export_data',
						params: {
							procedurename: procedure,
							parameter:param
						},
						success: function() {
							window.location = BASE_URL + 'c_epsbed/exportexcel/'+table;
						},
						failure: function() {
							Ext.MessageBox.alert("Informasi", "Export Data Gagal");
						}
                                            });

        }
		
}
