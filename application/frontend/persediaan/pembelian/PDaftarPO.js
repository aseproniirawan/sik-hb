function PDaftarPO(namaForm){

var ds_jperpembelian = dm_jperpembelian();
var ds_bagian = dm_bagian();
var ds_sypembayaran = dm_sypembayaran();
var ds_jpembayaran = dm_jpembayaran();
var ds_stpo = dm_stpo();
var ds_stsetuju = dm_stsetuju();
var ds_supplier = dm_supplier();
	var ds_hbrgsupplierx = dm_hbrgsupplierx();
	ds_hbrgsupplierx.setBaseParam('start',0);
	ds_hbrgsupplierx.setBaseParam('limit',50);
	var ds_po = dm_po();
	ds_po.setBaseParam('start',0);
	ds_po.setBaseParam('limit',50);
	ds_po.setBaseParam('idbagian',null);
var ds_stdiskon = dm_stdiskon();
	var ds_tarifpaketdet = dm_tarifpaketdet();
	ds_tarifpaketdet.setBaseParam('start',0);
	ds_tarifpaketdet.setBaseParam('limit',50);
	
var cbGrid = new Ext.grid.CheckboxSelectionModel({
		listeners: {
			rowselect : function( selectionModel, rowIndex, record){
				zkditem = record.get("kdbarang");
				zidjnstarif = record.get("idjnstarif");
				arr[rowIndex] = zkditem + '-' + zidjnstarif;
			},
			rowdeselect : function( selectionModel, rowIndex, record){
				arr.splice(rowIndex, 1);
			},
			beforerowselect : function (sm, rowIndex, keep, rec) {
				if (this.deselectingFlag && this.grid.enableDragDrop){
					this.deselectingFlag = false;
					this.deselectRow(rowIndex);
					return this.deselectingFlag;
				}
				return keep;
			}
		}
	});
/* GRID */
var row_gridnya = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	
var grid_nota = new Ext.grid.EditorGridPanel({
		store: ds_po,
		frame: true,
		height: 400,
		clicksToEdit: 1,
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
			header: 'Kode Barang',
			dataIndex: 'kdbrg',
			width: 150
		},{
			header: 'Nama Barang',
			dataIndex: 'nmdoktergelar',
			width: 150
		},{
			header: 'Satuan',
			dataIndex: 'idsatuan',
			width: 150,
		//	xtype: 'numbercolumn', format:'0,000'
		},{
			header: 'Qty',
			dataIndex: 'qty',
			width: 150,
		//	align: 'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
			editor: new Ext.form.TextField({
					id: 'qty',
					enableKeyEvents: true,
			})
		},{
			header: '@ Harga Barang',
			dataIndex: 'harga',
			width: 150,
			xtype: 'numbercolumn', format:'0,000'
		},{
			header: 'Subtotal',
			dataIndex: 'harga',
			width: 100,
			xtype: 'numbercolumn', format:'0,000'
		},{
			dataIndex: 'kdbrg',
			hidden: true,
			hideable: false
		},{
			dataIndex: 'idjnstarif',
			hidden: true,
			hideable: false
		},{
			dataIndex: 'idtarifpaketdet',
			hidden: true,
			hideable: false
		}],
		
	});
/* end GRID */		
			


/* BUAT PO FORM */
var po_form = new Ext.form.FormPanel({
			id: 'fp.daftarPO',
			region: 'center',
			bodyStyle: 'padding: 5px;',		
			border: false, frame: true,
			title: 'Buat PO',
			autoScroll: true,
			tbar: [
				{text: 'Simpan', id: 'btn.simpan', iconCls: 'silk-add', 
				handler: function(){simpanPO();}},
				{text: 'Cetak', id:'id.cetak', iconCls:'silk-printer', handler: function(){alert("cetak masih dalam proses")}},
				{text: 'Kembali', id: 'id.kembali', iconCls: 'silk-house', handler: function(){page_controller('120103');}},
				{xtype: 'tbfill'},
			],
			items: [{
				xtype: 'fieldset', title: 'Order Pembelian (PO)',
				id: 'fs.orderpo', layout: 'column',
				defaults: { labelWidth: 150, labelAlign: 'right' }, 
				items:[{
					//column 1 left
					layout: 'form', columnWidth: 0.50,
					items: [{
						xtype: 'textfield',
						id: 'tf.nopo',
						width: 300,
						disabled: true,
						fieldLabel: 'No PO'
					},{
						xtype: 'datefield', 
						id: 'df.tglpo', 
						value: new Date(), 
						width: 300,
						fieldLabel: 'Tanggal PO'
					},{
						xtype: 'combo', fieldLabel: 'Jenis PP',
						id:'cb.jnspp', width: 300, store: ds_jperpembelian,
						valueField: 'idjnspp', displayField: 'nmjnspp', editable: false,
						triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
						emptyText:'PILIH....',
						listeners: {
									select : function(combo, records, eOpts){
									var obj = records.data;
										if(obj.idjnspp == 2){
											Ext.getCmp('tf.nopp').disable();
											Ext.getCmp('df.tglpp').disable();
											Ext.getCmp('tf.nopp').setValue('');
											Ext.getCmp('tf.supplier').enable();
											Ext.getCmp('btn.sup').enable();
										//	Ext.getCmp('df.tglp').setValue('');
										} else if(obj.idjnspp == 1){
											Ext.getCmp('tf.nopp').enable();
											Ext.getCmp('df.tglpp').enable();
											Ext.getCmp('tf.supplier').disable();
											Ext.getCmp('btn.sup').disable();
										}
									}
								}
					},{
						xtype: 'textfield', fieldLabel: 'No PP', id:'tf.nopp'
					},{
						xtype: 'datefield', 
						id: 'df.tglpp', 
						value: new Date(), 
						width: 300,
						fieldLabel: 'Tanggal PP'
					},{
						xtype: 'combo', fieldLabel: 'Bagian',
						id:'cb.bagian', width: 300, store: ds_bagian,
						valueField: 'idbagian', displayField: 'nmbagian', editable: false,
						triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
						
					},{
						xtype: 'textfield', fieldLabel: 'No. Reff', id:'tf.reff', width: 300
					}]
				},{
				//column 2 right
					layout: 'form', columnWidth: 0.50,
					items:[{
						xtype: 'compositefield',
						fieldLabel: 'Supplier',
						items:[{
							xtype: 'textfield', id: 'tf.supplier', width: 250,
						},{
							xtype:'textfield', id: 'tf.kdsupplier', width: 250, hidden: true
						},{
							xtype: 'button', text: ' .... ',
							width: 30,id: 'btn.sup',
							handler: function(){
								dftSupplier();
							}
						}]
						
					},{
						xtype: 'container', fieldLabel: 'No. Tlp', layout: 'hbox',
						items:[{
							xtype: 'textfield', id: 'tf.tlp', width: 145, disabled: true
						},{
						xtype: 'label', id: 'lb.umurthn', text: 'Fax', margins: '0 10 0 5',
						},{
							xtype: 'textfield', id: 'tf.fax', width: 145, disabled: true
						}]
					},{
							xtype:'textfield', id:'tf.npwp', width: 300, disabled: true, fieldLabel: 'NPWP'	
					},{
							xtype: 'combo', fieldLabel: 'Syarat Pembayaran',
							id:'cb.syaratbayar', width: 300, store: ds_sypembayaran,
							valueField: 'idsypembayaran', displayField: 'nmsypembayaran', editable: false,
							triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
							emptyText:'PILIH....',
					},{
							xtype: 'combo', fieldLabel: 'Jenis Pembayaran',
							id:'cb.jnsbayar', width: 300, store: ds_jpembayaran,
							valueField: 'idjnspembayaran', displayField: 'nmjnspembayaran', editable: false,
							triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
							emptyText:'PILIH....',
					},{
							xtype: 'datefield', 
							id: 'df.tglkirim', 
							value: new Date(), 
							width: 300,
							fieldLabel: 'Tanggal Pengiriman'
					},{
						
							xtype: 'compositefield',
							fieldLabel: 'Status PO/Approval',
							items:[{
								xtype: 'combo', fieldLabel: '',
								id:'cb.stspo', width: 100, store: ds_stpo,
								valueField: 'idstpo', displayField: 'nmstpo', editable: false,
								triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
								emptyText:'PILIH....',
							},{
								xtype: 'combo', fieldLabel: '',
								id:'cb.stsetuju', width: 100, store: ds_stsetuju,
								valueField: 'idstsetuju', displayField: 'nmstsetuju', editable: false,
								triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
								emptyText:'PILIH....',
							}]
							
					}]
				}]
			},{
			xtype: 'container',
			style: 'padding: 5px',
			columnWidth: 1,
			defaults: {labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', title:'Daftar Nota Transaksi',
				items: [{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'button',
						text: 'Tambah',
						id: 'btn_add',
						margins: '5',
						disabled:true,
						width: 100,
						handler: function() {
							fPel();
						}
					}]
				},{
					layout: 'form',
					border: false,
					items: [grid_nota]
				}]
			}]
		},{
				xtype: 'fieldset', title: '',
				layout: 'column',
				defaults: { labelWidth: 150, labelAlign: 'right' },
				items:[{
				//column 2 left
					layout: 'form', columnWidth: 0.50,
					items: [{
						xtype: 'compositefield',
						fieldLabel: 'Mata Uang',
						items:[{
							xtype: 'textfield', id:'tf.matauang', width:200, disabled: true
						},{
							xtype:'textfield', id: 'tf.idr', width: 100, disabled: true
						}]
					},{
							xtype:'textarea', id:'ta.ket', width: 300,fieldLabel: 'Keterangan'
					},{
						xtype: 'fieldset', title: 'Approval',
						items:[{
							xtype: 'compositefield',
							//fieldLabel: '1',
							items:[{
								xtype: 'label', text: '1.', id: 'lb.satu'
							},{
								xtype: 'textfield', id:'tf.app1', width: 100
							},{
								xtype: 'label', text: '2.', id: 'lb.dua'
							},{
								xtype: 'textfield', id: 'tf.app2',width: 100
							}]
						}]
					}]
				},{
					layout: 'form', columnWidth: 0.50,
					items: [{
						xtype: 'textfield', 
						id: 'tf.jmlsubtot', 
						fieldLabel: 'Jumlah Sub Total',
						disabled: true, width: 300
					},{
						xtype: 'compositefield',fieldLabel: 'Diskon',
						items: [{
							xtype: 'combo', fieldLabel: '',
							id:'cb.diskon', width: 100, store: ds_stdiskon,
							valueField: 'idstdiskon', displayField: 'nmstdiskon', editable: false,
							triggerAction: 'all',forceSelection: true, submitValue: true, mode: 'local',
							emptyText:'PILIH....',
							listeners: {
									select : function(combo, records, eOpts){
									var obj = records.data;
										if(obj.idstdiskon == 2){
											Ext.getCmp('tf.diskon').enable();
											Ext.getCmp('tf.totdiskon').disable();
											
										} else{
											Ext.getCmp('tf.totdiskon').enable();
											Ext.getCmp('tf.diskon').disable();
										}
									}
								}
						},{
							xtype:'textfield', id: 'tf.diskon', width: 70,
							enableKeyEvents:true,
							listeners:{
								keyup : function(){
									totDiskon();
								}
							}
						},{
							xtype: 'label', text: '%', id: 'lb.persen',
						},{
							xtype: 'numericfield', id:'tf.totdiskon', width: 100
						}]
					},{
						xtype: 'numericfield', id: 'tf.jumlah', fieldLabel: 'Jumlah', width: 300, disabled: true
					},{
						
							xtype: 'compositefield',
							id: 'composite2',
							
							items:[{
								xtype: 'checkbox',
								id:'chb.aaa',
								margins: {top:3, right:0, bottom:0, left:0},
								listeners: {
									check: function(checkbox, val){
										if(val == true){
											Ext.getCmp('tf.ppn').enable();
										} else if(val == false){
											Ext.getCmp('tf.ppn').disable();
											Ext.getCmp('tf.ppn').setValue('');
										}
									}
								}
							},{
								xtype: 'tbtext',
								text: 'PPN (10%)',
								width: 100,
								margins: {top:3, right:0, bottom:0, left:0}
							},{
								xtype: 'numericfield', id: 'tf.ppn', width: 170,
						}]
					},{
							xtype:'numericfield', id: 'tf.total', width: 300, disabled: true, fieldLabel: 'Total'
					}]
				}]
			}]
}); SET_PAGE_CONTENT(po_form);
/*end PO FORM*/


/* Function */
function dftSupplier(){
		var cm_cari_supplier = new Ext.grid.ColumnModel([
            {
                header: 'Kode Supplier',
                dataIndex: 'kdsupplier',
                width: 100
            }, {
                header: 'Nama Supplier',
                dataIndex: 'nmsupplier',
                width: 150
            }, {
                header: 'Alamat',
                dataIndex: 'alamat',
                width: 200
            }, {
                header: 'Tanggal Daftar',
                dataIndex: 'tgldaftar',
                width: 100
            }, {
                header: 'Email',
                dataIndex: 'email',
                width: 100
            }, {
                header: 'No. Telp./HP',
                dataIndex: 'notelp',
                width: 150
            }
        ]);
		 var sm_cari_supplier = new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
        var vw_cari_supplier = new Ext.grid.GridView({
            emptyText: '< Belum ada Data >'
        });
		var paging_cari_supplier = new Ext.PagingToolbar({
            pageSize: 50,
            store: ds_supplier,
            displayInfo: true,
            displayMsg: 'Data Supplier Dari {0} - {1} of {2}',
            emptyMsg: 'No data to display'
        });
		var cari_supplier = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_find_cari_suppilier = new Ext.grid.GridPanel({
			id: 'gp.supplier',
            ds: ds_supplier,
            cm: cm_cari_supplier,
            sm: sm_cari_supplier,
            view: vw_cari_supplier,
            height: 300,
            width: 955,
			plugins: cari_supplier,
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
            bbar: paging_cari_supplier,
            listeners: {
                rowdblclick: klik_cari_supplier
            }
        });
		var win_supplier = new Ext.Window({
			title: 'Cari Supplier',
			modal: true,
			items: [grid_find_cari_suppilier]
		}).show();
		Ext.getCmp('gp.supplier').store.reload();
		function klik_cari_supplier(grid, rowIdx){
			var rec_fsupplier = ds_supplier.getAt(rowIdx);
			var fkdsupplier = rec_fsupplier.data["kdsupplier"];
			var fnmsupplier = rec_fsupplier.data["nmsupplier"];
			var fnotelp = rec_fsupplier.data["notelp"];
			var fnofax = rec_fsupplier.data["nofax"];
			var fnpwp = rec_fsupplier.data["npwp"];
		
			
			Ext.getCmp("tf.kdsupplier").setValue(fkdsupplier);
			Ext.getCmp("tf.supplier").setValue(fnmsupplier);
			Ext.getCmp("tf.tlp").setValue(fnotelp);
			Ext.getCmp("tf.fax").setValue(fnofax);
			Ext.getCmp("tf.npwp").setValue(fnpwp);
			Ext.getCmp("btn_add").enable();
			
						win_supplier.close();
		}
	}
	
function fPel(){
		tpd();
		var cbGridPel = new Ext.grid.CheckboxSelectionModel({
			listeners: {
				rowselect : function( selectionModel, rowIndex, record){
					var skdbrg		= record.get("kdbrg");
					var sidsatuan	= record.get("idsatuan");
					var sharga		= record.get("harga");
					var sqty		= record.get("qty");
					var starif		= parseInt(sqty) * parseInt(sharga) ;
					
					var orgaListRecord = new Ext.data.Record.create([
						{
							name: 'kdbrg',
							name: 'idsatuan',
							name: 'harga',
							name: 'tarif',
							name: 'qty'
						}
					]);
					
					ds_po.add([
						new orgaListRecord({
							'kdbrg': skdbrg,
							'idsatuan': sidsatuan,
							'harga': sharga,
							'tarif': starif,
							'qty': sqty
						})
					]);
					tpd();
					
				},
				rowdeselect : function( selectionModel, rowIndex, record){
					
				},
				beforerowselect : function (sm, rowIndex, keep, rec) {
					if (this.deselectingFlag && this.grid.enableDragDrop){
						this.deselectingFlag = false;
						this.deselectRow(rowIndex);
						return this.deselectingFlag;
					}
					//return keep;
				}
			}
		});
		var cm_fpel = new Ext.grid.ColumnModel([
			cbGridPel,
			{
				header: 'Kode barang',
				width: 150,
				dataIndex: 'kdbrg'
			},{
				header: 'Nama Satuan',
				dataIndex: 'nmsatuan',
				width: 100
			},{
				header: 'kdsupplier',
				dataIndex: 'kdsupplier',
				width: 100
			},{
				header: 'Harga',
				dataIndex: 'harga',
				width: 100
			}
		]);
		var vw_fpel = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var page_fpel = new Ext.PagingToolbar({
			store: ds_hbrgsupplierx,
			displayInfo: true,
			displayMsg: 'Data Registrasi Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_fpel = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'remote',
			width: 200
		})];
		var grid_fpel= new Ext.grid.GridPanel({
			id: 'gp.find_fpel',
			ds: ds_hbrgsupplierx,
			cm: cm_fpel,
			sm: cbGridPel,
			view: vw_fpel,
			height: 350,
			width: 480,
			plugins: cari_fpel,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: page_fpel
		});
		var win_fpel = new Ext.Window({
			title: 'Cari Pelayanan',
			modal: true,
			items: [grid_fpel]
		}).show();
		
		function tpd(){
			var arr = [];
			
			for (var zxc = 0; zxc <ds_po.data.items.length; zxc++) {
				var record = ds_po.data.items[zxc].data;
				zkditem = record.kdbarang;
				arr[zxc] = zkditem;
			}
			ds_hbrgsupplierx.setBaseParam('val',Ext.encode(arr));
			ftotal();
			ds_hbrgsupplierx.reload();
		}
	}
	
	//simpan
function simpanPO(){
		var arrpo = [];
		
		for(var zx = 0; zx < ds_po.data.items.length; zx++){
			var record = ds_po.data.items[zx].data;
			zkdbrg = record.kdbrg;
			zqty = record.qty;
			arrpo[zx] = zkdbrg + '-' + zqty;
		}
		Ext.Ajax.request({
			url: BASE_URL + 'purchaseorder_controller/insorupd_po',
			params: {
				nopo : Ext.getCmp('tf.nopo').getValue(),
				tglpo : Ext.getCmp('df.tglpo').getValue(),
				idjnspp : Ext.getCmp('cb.jnspp').getValue(),
				idbagian : Ext.getCmp('cb.bagian').getValue(),
				kdsupplier : Ext.getCmp('tf.kdsupplier').getValue(),
				idsypembayaran : Ext.getCmp('cb.syaratbayar').getValue(),
				idjnspembayaran : Ext.getCmp('cb.jnsbayar').getValue(),
				tglpengiriman : Ext.getCmp('df.tglkirim').getValue(),
				idstpo : Ext.getCmp('cb.stspo').getValue(),
				idstsetuju : Ext.getCmp('cb.stspo').getValue(),
				bpb : Ext.getCmp('tf.reff').getValue(),
				idstdiskon : Ext.getCmp('cb.diskon').getValue(),
				diskon : Ext.getCmp('tf.diskon').getValue(),
				keterangan : Ext.getCmp('ta.ket').getValue(),
				totalpo : Ext.getCmp('tf.total').getValue(),
				
				
				arrpo : Ext.encode(arrpo)
				
			},
			success: function(response){
				Ext.MessageBox.alert('Informasi','Simpan Data Berhasil');
			},
			failure : function(){
				Ext.MessageBox.alert('Informasi','Simpan Data Gagal');
			}
		});
	}

function ftotal(){
	ds_po.reload({
		scope : this,
		callback: function(records, operation, success){
			sum = 0;
			ds_po.each(function(rec){ sum += parseFloat(rec.get('harga')); });
			Ext.getCmp("tf.jmlsubtot").setValue(sum);
		}
	});
}
function totDiskon(){
	var aa = Ext.getCmp("tf.diskon").getValue();
	var bb = Ext.getCmp("tf.jmlsubtot").getValue();
//	var cc = aa * bb;
	var cc = (aa * bb) / 100;
	var dd = cc - aa;
	var tot = dd;
	Ext.getCmp("tf.totdiskon").setValue(cc);
	Ext.getCmp("tf.jumlah").setValue(dd);
	Ext.getCmp("tf.total").setValue(tot);

}
/* End Function */	
}
