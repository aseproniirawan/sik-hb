function RMorderpemeriksaan(namaForm){ 
RH.startTimer('tf.jamshift');
	Ext.Ajax.request({
		url:BASE_URL + 'shift_controller/getNmField',
		method:'POST',
		success: function(response){
			obj = Ext.util.JSON.decode(response.responseText);
			//Ext.getCmp("idshift").setValue(obj.idshift);
			Ext.getCmp("tf.waktushift").setValue(obj.nmshift);
		}
	});
	var ds_bagian = dm_bagian();
	
	var cbGrid = new Ext.grid.CheckboxSelectionModel({
		listener: {
			rowselect: function(selectionModel, rowIndex, record){
				zkditem = record.get("kditem");
				arr[rowIndex] = zkditem;
			},
			rowdeselect: function(selectionModel, rowIndex, record){
				arr.splice(rowIndex, 1);
			},
			beforerowselect: function (sm, rowIndex, keep, rec){
				if(this.deselectingFlag && this.grid.enableDragDrop){
					this.deselectingFlag = false;
					this.deselectRow(rowIndex);
					return this.deselectingFlag;
				}
				return keep;
			}
		}
	});
	
	var grid_order = new Ext.grid.GridPanel({
	//	store: ds_orderpemeriksaan();
		frame: true,
		height: 400,
		bodyStyle: 'padding:3px 3px 3px 3px',
		id: 'grid_nota',
		forceFit: true,
		sm: cbGrid,
		autoScroll: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,
		loadMask: true,
		columns: [
		cbGrid,
		{
			header: 'Item Pelayanan',
			dataIndex: '',
			width:500
		},{
			header: 'Qty',
			dataIndex: '',
		},{
			
		}
		]
	})
	
	var order_form = new Ext.form.FormPanel({
		id: 'fp.order',
		title:'Order Pemeriksaan RJ',
		//width: 900, 
		Height: 1000,
		layout: 'column',
		frame: true,
		autoScroll: true,
		
		tbar:[
		{ text: 'Baru',iconCls: 'silk-add',handler: function(){alert("baru")} },
		{ text: 'Simpan', id:'bt.simpan', iconCls: 'silk-save', handler: function(){alert("simpan")} },
		{ text: 'Cari', id: 'bt.cari', iconCls: 'silk-find', handler: function(){alert("cari")} },
		{ text: 'Batal', id: 'bt.batal', iconCls:'silk-cancel', handler:function(){alert("batal")} },
		{ text: 'Cetak', id: 'bt.cetak', iconCls:'silk-printer', handler: function(){alert("cetak")} },
		{ text: 'Cetak Ulang', id: 'bt.cetakulang', iconCls:'silk-printer', handler: function(){alert("cetak Ulang")} },
		{ xtype: 'tbfill' },
		],
		items: [{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.5,
			layout: 'fit',
			defaults: { labelWidth: 120, labelAlign: 'right' },
			items: [{
				xtype: 'fieldset',
				height: 150,
				boxMaxHeight: 160,
				items:[{
					xtype: 'compositefield',
					items:[{
						xtype: 'textfield',
						fieldLabel: 'No. RM',
						id: 'tf.norm', readOnly: true,
						style: 'opacity:0.6',
						width: 100
					},{
						xtype: 'label', id:'lb.noreg', text: 'No. Registrasi'
					},{
						xtype: 'textfield',
						id: 'tf.noreg',
						width: 100,
						enableKeyEvents: true,
						listener: {
							specialkey: function(field, e){
								if(e.getKey() == e.ENTER){
									dataRegistrasi();
								}
							}
						}
					},{
						xtype: 'button',
						text: ' ... ',
						id: 'btn.noreg',
						width:30,
						handler: function(){
							fReg();
						}
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Nama Pasien',
					id: 'tf.nmpasien',
					readOnly: true, style: 'opacity: 0.6',
					width: 300
				},{
					xtype: 'combo', fieldLabel: 'Unit Pengirim',
					id: 'cb.unitp', width: 300,
					store: ds_bagian, valueField: 'idbagian', displayField: 'nmbagian',
					editable:false, triggerAction: 'all',
					forceSelection: true, submitValue: true, modeL: 'local',
					emptyText: 'Pilih...'
				},{
					xtype: 'textfield', fieldLabel: 'Dokter Pengirim',
					id: 'tf.dokter',readOnly: true, style: 'opacity: 0.6',
					width: 300
				},{
					xtype: 'textfield', fieldLabel: 'Penanggung Biaya',
					id: 'tf.penanggung', readOnly: true, style: 'opacity: 0.6',
					width: 300
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 0.5,
			layout: 'fit',
			defaults: { labelWidth: 150, labelAlign: 'right' },
			items: [{
				xtype: 'fieldset',
				height: 150,
				boxMaxHeight:160,
				items: [{
					xtype: 'textfield', fieldLabel: 'No. Order',
					id: 'tf.noorder', width: 300, readOnly: true,
					style: 'opacity: 0.6'
				},{
					xtype: 'container', fieldLabel: 'Tgl./Jam/Shift',
					layout: 'hbox',
					//defaults: { hideLabel: 'true' },
					items: [{	
						xtype: 'datefield', id: 'df.tglshift',
						width: 100, value: new Date()
					},{
						xtype: 'label', id: 'lb.garing1', text: '/', margins: '0 10 0 10',
					},{ 	
						xtype: 'textfield', id: 'tf.jamshift', readOnly:true,
						width: 90
					},{
						xtype: 'label', id: 'lb.garing2', text: '/', margins: '0 10 0 10',
					},{
						xtype: 'textfield', id: 'tf.waktushift', 
						width: 60, readOnly: true,
						style : 'opacity:0.6'
					}]
				},{
						xtype: 'compositefield',
						items:[{
							xtype: 'textfield', id: 'tf.unitujuan',
							width: 300, fieldLabel: 'Unit Tujuan',
							readOnly: true, style: 'opacity: 0.6'
						},{
							xtype: 'button', id: 'btn.unitujuan',
							text: ' ... ',width: 30,
							handler: function(){
								alert("dooor!!!!")
							}
						}]
				},{
					xtype: 'compositefield',
						items:[{
							xtype: 'textfield', id: 'tf.doktertujuan',
							width: 300, fieldLabel: 'Dokter Tujuan',
							readOnly: true, style: 'opacity: 0.6'
						},{
							xtype: 'button', id: 'btn.doktertujuan',
							text: ' ... ',width: 30,
							handler: function(){
								alert("dooor!!!!")
							}
						}]
				},{
					xtype: 'textfield', id: 'tf.catatan',
					width:300, fieldLabel: 'Catatan'
				}]
			}]
		},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 1,
			defaults: {labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', title:'',
				items: [{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'button',
						text: 'Hapus Item',
						id: 'btn.hitem',
						margins: '5',
						disabled:true,
						width: 100,
						handler: function() {
							hapusItem();
						}
					},{
						xtype: 'button',
						text: 'Tambah Item',
						id: 'btn.titem',
						margins: '5',
						disabled:true,
						width: 100,
						handler: function() {
							fPel();
						}
					}]
				}]
			}]
		}]
	}); SET_PAGE_CONTENT(order_form);
}