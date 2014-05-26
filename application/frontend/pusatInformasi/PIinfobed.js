function PIinfobed(){
	ds_infobed = dm_infobed();
	ds_cmbinfobed = dm_cmbinfobed();
	ds_infobed.load();
	
	var cm_infobed = new Ext.grid.ColumnModel({
        columns: [{
			header: 'Bagian', width: 300,
			dataIndex: 'nmbagian',
		},{
			header: 'Kamar', width: 130,
			dataIndex: 'nmkamar', 
		}, {
			header: 'Bed', width: 70,
			dataIndex: 'nmbed', 
		}, {
			header: 'Status Bed', width: 80,
			dataIndex: 'nmstbed', 			
		}, {
			header: 'No. Reg', width: 140,
			dataIndex: 'noreg', 
		}, {
			header: 'Tgl Masuk', width: 100,
			dataIndex: 'tglmasuk', 
		}, {
			header: 'Jam Masuk', width: 100,
			dataIndex: 'jammasuk', 
		}, {
			header: 'No. Rm', width: 130,
			dataIndex: 'norm', 
		}, {
			header: 'Nama Pasien', width: 250,
			dataIndex: 'nmpasien', 
		}, {
			header: 'L/P', width: 100,
			dataIndex: 'kdjnskelamin', 
		}, {
			header: 'Umur', width: 90,
			dataIndex: 'Umur', 
		}]
    });
		
	var gp_infobed = new Ext.grid.GridPanel({
		id: 'gp.infobed',
		store: ds_infobed,
		cm: cm_infobed,
		sm: new Ext.grid.RowSelectionModel({ singleSelect: true}),
		view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {["Kamar"]})',
			enableGroupingMenu: false,	// don't show a grouping menu
			enableNoGroups: false,		// don't let the user ungroup
			hideGroupedColumn: true,	// don't show the column that is being used to create the heading
			showGroupName: false,		// don't show the field name with the group heading
			startCollapsed: false		// the groups start closed/no
        }),
		forceFit: true, autoHeight: true, //250, //width: 720,		
		frame: true,
		autoScroll: true,
		autoSizeColumns: true,
		autoExpandColumn: 'nmbagian',
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,		
		loadMask: true,
		layout: 'anchor'
	});

	//THE FORM PANEL
	var fp_infobed = new Ext.form.FormPanel({ 
		id: 'fp.infobed',
		title:'Info Bed',
		layout: 'form',
		forceFit: true,
		autoScroll: true,
		//width:500, height:400,
        margin: '0 0 10',
		tbar: [{
			xtype: 'compositefield',
			style: 'padding: 5px; margin: 3px 0 0 15px',
			width:568,
			items: [{
				xtype: 'label', id: 'lb.dkr', text: 'Cari Berdasarkan :', margins: '3 10 0 5',
			},{
				xtype: 'combo',
				store: ds_cmbinfobed,
				id: 'cb.search',
				triggerAction: 'all',
				editable: false,
				valueField: 'id',
				displayField: 'name',
				forceSelection: true,
				submitValue: true,
				typeAhead: true,
				mode: 'local',
				emptyText:'Pilih...',
				selectOnFocus:true,
				width: 150,
				listeners: {
					select: function() {
						var cbsearchh = Ext.getCmp('cb.search').getValue();
							if(cbsearchh != ''){
								Ext.getCmp('cek').enable();
								Ext.getCmp('cek').focus();
							}
							return;
					}
				}
			},{
				xtype: 'textfield',
				id: 'cek',
				width: 200,
				validator: function(){
					var cek = Ext.getCmp('cek').getValue();
					if(cek == ''){
						fnSearchgrid();
					}
					return;
				}
			},
			{
				xtype: 'button',
				text: 'Cari',
				iconCls: 'silk-find',
				id: 'btn_data',
				width: 3,
				handler: function() {
					var cbsearch = Ext.getCmp('cb.search').getValue();
					var cek = Ext.getCmp('cek').getValue();
						if(cbsearch != ''){
							if(cek != ''){
								fnSearchgrid();
							}else if(cek == ''){
								Ext.MessageBox.alert('Message', 'Isi Data Yang Akan Di Cari..!');
							}
						}else if(cbsearch == ''){
							Ext.MessageBox.alert('Message', 'Cari Berdasarkan Belum Di Pilih..!');
						}
						return;
				}
			}]
		}],
		frame: true,
		defaults: { labelWidth: 100, labelAlign: 'right'},
		items: [gp_infobed],
		listeners: {
			afterrender: baru
		}
	}); SET_PAGE_CONTENT(fp_infobed);	
	
	function baru(){
		Ext.getCmp('cek').disable();
	}
	
	function fnSearchgrid(){
		var idcombo, nmcombo;
		idcombo= Ext.getCmp('cb.search').getValue();
		nmcombo= Ext.getCmp('cek').getValue();
			ds_infobed.setBaseParam('key',  '1');
			ds_infobed.setBaseParam('id',  idcombo);
			ds_infobed.setBaseParam('name',  nmcombo);
		ds_infobed.load(); 
	}
	
}