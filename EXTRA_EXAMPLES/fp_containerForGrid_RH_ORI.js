var fp_ruangan = new Ext.Panel({
		title: 'Ruangan', iconCls:'silk-house',
		buttonAlign: 'left',
		bodyStyle: 'padding: 5px',
		border: false,
		layout: 'fit',
		waitMsg: 'Waiting...',
		maskDisabled: false,
		monitorValid: true,
		frame: true,
		items: [{
			xtype: 'panel', layout:'fit',
			items: [gp_ruangan],
		}], 
	}); SET_PAGE_CONTENT(fp_ruangan);
