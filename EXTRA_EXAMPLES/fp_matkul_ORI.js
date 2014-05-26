var fp_matkul = new Ext.Panel({
		//xtype: 'form', 
		title: 'Mata Kuliah', iconCls:'silk-book',
		buttonAlign: 'left',
		bodyStyle: 'padding: 5px',
		border: false,
		layout: 'border',
		waitMsg: 'Waiting...',
		maskDisabled: false,
		monitorValid: true,
		frame: true,
		items: [{
			xtype: 'fieldset', flex: 1, 
			region:'north', layout:'form', autoHeight:true,
			labelWidth:100, labelAlign:'right',
			items: [{
				xtype: 'combo', id: 'cb.prodi-matkul', fieldLabel: 'Program Studi',
				width: 300, editable: false, //allowBlank: false,
				store: ds_prodireg,	triggerAction: 'all',
				valueField: 'kdprodi', displayField: 'lnmprodi',
				forceSelection: true, submitValue: true, mode: 'local',
				emptyText:'Pilih...',
				listeners:{ 
					scope: this, select: function(combo){ 
						ds_matkul.reload({
							params: { 
								//kdprodi: RH.getCompValue('cb.prodi-matkul', true)
								kdprodi: combo.getValue()
							}
						});
					} 
				}
			}]
		}, {
			xtype: 'panel', layout:'fit', region:'center',
			items: [gp_matkul],
		}], 
	}); SET_PAGE_CONTENT(fp_matkul);
	