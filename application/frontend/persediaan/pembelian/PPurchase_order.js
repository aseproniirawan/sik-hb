/*
	author Yoga<yogagaga13@gmail.com>

*/
function PPurchase_order(namaForm){

/* Data Store */
var ds_tahun = dm_tahun();
var ds_bulan = dm_bulan();
var ds_po = dm_po();
var ds_stpo = dm_stpo();
var ds_stsetuju = dm_stsetuju();
/* End Data Store */

/* GRID */
	var pageSize = 50;
	var paging = new Ext.PagingToolbar({
	pageSize: pageSize,
		store: ds_po,
		displayInfo: true,
		displayMsg: 'Data PO Dari {0} - {1} of {2}',
		emptyMsg: 'Tidak ada data untuk ditampilkan'
	});
	var grid_nya = new Ext.grid.GridPanel({
		id: 'gridnya', //sm: cbGrid, 
		store: ds_po, 
		forceFit: true,		
		autoScroll: true, columnLines: true, frame: true,
		columns: [{
			header: 'No. PO',dataIndex: 'nopo',
			align: 'center', sortable: true, disabled: true,
		},
		{
			header: 'Tgl. PO',dataIndex: 'tglpo',
			align: 'center', sortable: true
		},
		{
			header: 'NO. PP', dataIndex: 'nopp',
			align: 'left',sortable: true
		},{
			header: 'No. BPB/JS',	align: 'center', 
			dataIndex: '', sortable: true
		},{
			header: 'Supplier', dataIndex: '',
			align: 'center', sortable: true
		},{
			header: 'Tgl.Kirim', dataIndex: '',
			align: 'center', sortable: true
		},{
			header: 'Status PO', dataIndex: '',
			align: 'left', sortable: true
		},{
			header: 'Status', dataIndex: '',
			align: 'left', sortable: true
		},{
			header: 'User Input',
			dataIndex: '', align: 'center', sortable: true
		}],		
		bbar: paging
	});
/* END GRID */
	/* Daftar PO */
		var po_form = new Ext.form.FormPanel({
			id: 'fp.po',
			region: 'center',
			bodyStyle: 'padding: 5px;',		
			border: false, frame: true,
			title: 'Daftar PO(Purchase Order)',
			autoScroll: true,
			tbar: [
				{text: 'Buat PO', id: 'btn.buat', iconCls: 'silk-application-form',
				handler: function(){
				PDaftarPO("fp.po");
				}
				},
				{xtype: 'tbfill'},
			],
			/* Container */
			items: [{
			//Start Filter
				xtype: 'fieldset',
				title: 'Filter',
				items: [{
					xtype: 'container',
					style: 'padding: 5px',
					layout: 'column',
					defaults: {labelWidth: 1, labelAlign: 'right'},
					items: [{
						xtype: 'fieldset',
						columnWidth: 0.5,
						border: false,
						items: [{
						
							xtype: 'compositefield',
							id: 'composite1',
							items:[{
								xtype: 'checkbox',
								id:'chb.pelayanan',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cbPelayanan').enable();
										} else if(val == false){
											Ext.getCmp('cbPelayanan').disable();
											Ext.getCmp('cbPelayanan').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'Cari Berdasarkan',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'combo', id: 'cbPelayanan', name: 'cbPelayanan', store: ds_bulan, valueField: 'nmbulan',
								displayField: 'nmbulan',width: 130, height: 25, triggerAction: 'all',
								editable: false, submitValue: true, typeAhead: true, mode: 'local',
								emptyText: 'Pilih...', selectOnFocus: true, disabled: true
							},{
								xtype: 'textfield', id:'tf.aa', width:100
							}]
						},{
						xtype: 'compositefield',
						id: 'aa',
						items:[{
							
								xtype: 'tbtext',
								text: 'Tahun / Bulan',
								width: 100,
								margins: {top:3, right:25, bottom:0, left:0}
							
						},{
							xtype: 'combo', fieldLabel: '',
							id: 'cb.tahun', width: 100,
							store: ds_tahun, valueField: 'tahun', displayField: 'tahun',
							editable: false, triggerAction: 'all',
							forceSelection: true, submitValue: true, mode: 'local',

						},{
							xtype: 'combo', fieldLabel: '',
							id: 'cb.bulan', width: 100,
							store: ds_bulan, valueField: 'kdbulan', displayField: 'nmbulan',
							editable: false, triggerAction: 'all',
							forceSelection: true, submitValue: true, mode: 'local',
							}]
					
						}]
					},{
						xtype: 'fieldset',
						columnWidth: 0.5,
						border: false,
						items: [{
						
							xtype: 'compositefield',
							id: 'composite2',
							items:[{
								xtype: 'checkbox',
								id:'chb.aaa',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cb.stspo').enable();
										} else if(val == false){
											Ext.getCmp('cb.stspo').disable();
											Ext.getCmp('cb.stspo').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'Status PO',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'combo', id: 'cb.stspo', store: ds_stpo, valueField: 'idstpo',
								displayField: 'nmstpo',width: 130, height: 25, triggerAction: 'all',
								editable: false, submitValue: true, typeAhead: true, mode: 'local',
								emptyText: 'Pilih...', selectOnFocus: true, disabled: true
							}]
						},{
							xtype: 'compositefield',
							id: 'composite3',
							items:[{
								xtype: 'checkbox',
								id:'chb.v',
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('cb.stsetuju').enable();
										} else if(val == false){
											Ext.getCmp('cb.stsetuju').disable();
											Ext.getCmp('cb.stsetuju').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'Status Approval',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'combo', id: 'cb.stsetuju', store: ds_stsetuju, valueField: 'idstsetuju',
								displayField: 'nmstsetuju',width: 130, height: 25, triggerAction: 'all',
								editable: false, submitValue: true, typeAhead: true, mode: 'local',
								emptyText: 'Pilih...', selectOnFocus: true, disabled: true
							}]
						}]
					}]
				}]
			}, /* end Filter */{
				items:[{
				xtype: 'fieldset',
				title: 'Daftar PO',
				items:[grid_nya]
				}]
			}/*,{
				xtype: 'fieldset',
				title: 'Daftar Terima Barang Supplier',
			},{
				xtype: 'fieldset',
				title: 'Detail Barang Terima',
			}*/]

			/* End Daftar PO */

		}); SET_PAGE_CONTENT(po_form);
	/* End Form */
	
	
}