function Ksrtutupkasir(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_bukakasir = dm_bukakasir();
	var ds_bagian = dm_bagian();
	var ds_stkasir = dm_stkasir();
	
	var cari_data = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		autoHeight: true,
		position: 'top',
		mode: 'remote',
		width: 200,
		disableIndexes:['catatanbuka'],
	})];
	
	var paging = new Ext.PagingToolbar({
		pageSize: pageSize,
		store: ds_bukakasir,
		displayInfo: true,
		displayMsg: 'Data Tutup Kasir Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var vw_bukakasir = new Ext.grid.GridView({
		emptyText: '< Belum ada Data >'
	});
	
	function keyToDetil(value){
		Ext.QuickTips.init();
		return '<div class="keyMasterDetail" ext:qtip="Lihat detail" style="cursor:pointer;color:#000099;font-size:12px;text-decoration:underline;">'
			+ value +'</div>';
	}
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_bukakasir',
		store: ds_bukakasir,
		view: vw_bukakasir,
		autoScroll: true,
		height: 530, //autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'No. Kasir',
			width: 105,
			dataIndex: 'nokasir',
			sortable: true,
			align:'center',
			renderer: keyToDetil
		},
		{
			header: 'Loket Bagian',
			width: 120,
			dataIndex: 'nmbagian',
			sortable: true,
			align:'center',
		},
		{
			header: 'Tgl Buka',
			width: 100,
			dataIndex: 'tglbuka',
			sortable: true,
			align:'center',
		},
		{
			header: 'Jam Buka',
			width: 100,
			dataIndex: 'jambuka',
			sortable: true,
			align:'center',
		},
		{
			header: 'Shift Buka',
			width: 100,
			dataIndex: 'nmshiftbuka',
			sortable: true,
			align:'center',
		},
		{
			header: 'Saldo Awal',
			width: 100,
			dataIndex: 'saldoawal',
			sortable: true,
			align:'right',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
		},
		{
			header: '<center>Catatan</center> </br> <center>(Buka Kasir)</center>',
			width: 290,
			dataIndex: 'catatanbuka',
			sortable: true
		},
		{
			header: 'Tgl Tutup',
			width: 100,
			dataIndex: 'tgltutup',
			sortable: true,
			align:'center',
		},
		{
			header: 'Jam Tutup',
			width: 100,
			dataIndex: 'jamtutup',
			sortable: true,
			align:'center',
		},
		{
			header: 'Shift Tutup',
			width: 100,
			dataIndex: 'nmshifttutup',
			sortable: true,
			align:'center',
		},
		{
			header: 'Saldo Akhi',
			width: 100,
			dataIndex: 'saldoakhir',
			sortable: true,
			align:'center',
		},
		{
			header: 'Selisih',
			width: 100,
			dataIndex: 'saldoakhir',
			sortable: true,
			align:'left',
			renderer: Ext.util.Format.numberRenderer('0,000.00'),
		},
		{
			header: '<center>Catatan</center> </br> <center>(Tutup Kasir)</center>',
			width: 290,
			dataIndex: 'catatanbuka',
			sortable: true
		},
		{
			header: '<center>Status</center> </br> <center>Kasir</center>',
			width: 80,
			dataIndex: 'nmstkasir',
			sortable: true,
			align:'center',
		},
		{
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
						fnEditBukakasir(grid, rowIndex);
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
						fnDeleteBukakasir(grid, rowIndex);
					}
				}]
		}],
		bbar: paging,
		listeners: {
			cellclick: fnAddBukakasir//onCellClick
		}
	});
	
	function onCellClick(grid, rowIndex, columnIndex, e) {
		var t = e.getTarget();
		var record = grid.getStore().getAt(rowIndex); 
		
		if (e.className == 'keyMasterDetail') {
				fnEditBukakasir(grid, record);
			return true;
		}			
		return true;
	}
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Tutup Kasir', iconCls:'silk-calendar',
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
	
	function reloadBukakasir(){
		ds_bukakasir.reload();
	}
	
	function fnAddBukakasir(){
		var grid = grid_nya;
		wEntryBukakasir(false, grid, null);	
	}
	
	function fnEditBukakasir(grid, record){
		var record = ds_bukakasir.getAt(record);
		wEntryBukakasir(true, grid, record); 
		
		/*var cekidstkasir = Ext.getCmp('cb.stkasir').getValue();
		if(cekidstkasir == 2){
			Ext.getCmp('df.date').disable();
			Ext.getCmp('cb.loketbagian').disable();
			Ext.getCmp('nf.saldoawal').disable();
			Ext.getCmp('ta.catatanbuka').disable();
			Ext.getCmp('bt.simpan').disable();
		} return; */
		
	}
	
	function fnDeleteBukakasir(grid, record){
		var record = ds_bukakasir.getAt(record);
		var url = BASE_URL + 'bukakasir_controller/delete_bukakasir';
		var params = new Object({
						nokasir	: record.data['nokasir']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryBukakasir(isUpdate, grid, record){
		Ext.Ajax.request({
			url:BASE_URL + 'shift_controller/getNmField',
			method:'POST',
			success: function(response){
				obj = Ext.util.JSON.decode(response.responseText);
				Ext.getCmp("tf.idsifttutup").setValue(obj.idshift);
				Ext.getCmp("tf.sifttutup").setValue(obj.nmshift);
			}
		});
			
		var myVar=setInterval(function(){myTimer()},1000);
		function myTimer(){
			var d=new Date();
			var formattedValue = Ext.util.Format.date(d, 'H:i:s');
			if(Ext.getCmp("tf.timetutup"))
					RH.setCompValue("tf.timetutup",formattedValue);
			else myStopFunction();
		}
		
		function myStopFunction(){
			clearInterval(myVar);
		}
		
		var winTitle = (isUpdate)?'Tutup Kasir (Edit)':'Tutup Kasir (Entry)';
		var bukakasir_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.bukakasir',
			buttonAlign: 'left',
			labelWidth: 110, labelAlign: 'right',
			//bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 600, width: 900,
			layout: {
				type: 'form',
				pack: 'center',
				align: 'center'
			},
			frame: true, 
			defaultType:'textfield',			
			items: [{
				xtype: 'fieldset', title: '', layout: 'column', height: 100,
				items: [{
					columnWidth: 0.55, border: false, layout: 'form',					
					items: [{
						xtype: 'textfield',
						fieldLabel: 'No. Kasir',
						id:'tf.nokasir',
						width: 150,
						readOnly: true,
						style : 'opacity:0.6'
					},{
						xtype: 'compositefield',
						fieldLabel: 'Tgl/Jam/Shif',
						items:[{
							xtype: 'datefield',
							id: 'df.datebuka',
							format: "d/m/Y",
							value: new Date(),
							width: 150,
						},{
							xtype: 'label', id: 'lb.time', text: '/', margins: '3 10 0 5',
						},{ 	
							xtype: 'textfield',
							id: 'tf.timebuka',
							width: 60, 
							readOnly: true,
						},{
							xtype: 'label', id: 'lb.sift', text: '/', margins: '3 10 0 5',
						},{ 	
							xtype: 'textfield',
							id: 'tf.siftbuka',
							width: 60, 
							readOnly: true,
							style : 'opacity:0.6'
						},{ 	
							xtype: 'textfield',
							id: 'tf.idsiftbuka',
							width: 60,
							hidden: true
						}]
					},{
						xtype: 'compositefield',
						fieldLabel: 'Tgl/Jam/Shif',
						items:[{
							xtype: 'datefield',
							id: 'df.datetutup',
							format: "d/m/Y",
							value: new Date(),
							width: 150,
						},{
							xtype: 'label', id: 'lb.time', text: '/', margins: '3 10 0 5',
						},{ 	
							xtype: 'textfield',
							id: 'tf.timetutup',
							width: 60, 
							readOnly: true,
						},{
							xtype: 'label', id: 'lb.sift', text: '/', margins: '3 10 0 5',
						},{ 	
							xtype: 'textfield',
							id: 'tf.sifttutup',
							width: 60, 
							readOnly: true,
							style : 'opacity:0.6'
						},{ 	
							xtype: 'textfield',
							id: 'tf.idsifttutup',
							width: 60,
							hidden: true
						}]
					}]
				},
				{
					columnWidth: 0.40, border: false, layout: 'form',
					labelWidth: 110, labelAlign: 'right',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'User ID',
						id: 'tf.idpenerima',
						width: 220,
						readOnly: true,
						value: USERID,
						style : 'opacity:0.6'
						
					},{
						xtype: 'textfield',
						fieldLabel: 'Nama Lengkap',
						id: 'tf.nmpenerima',
						width: 220,
						readOnly: true,
						value: USERNAME,
						style : 'opacity:0.6'
						
					},{
						xtype: 'combo', id: 'cb.stkasir', fieldLabel: 'Status',
						store: ds_stkasir, 
						valueField: 'idstkasir', displayField: 'nmstkasir',
						triggerAction: 'all', forceSelection: true, submitValue: true, 
						mode: 'local', emptyText:'Pilih...', selectOnFocus:false, 
						width: 220, allowBlank: false, editable: false,
						value: 1, readOnly: true,
						style : 'opacity:0.6',
						
					}]
				}]
			},{
				xtype: 'fieldset',
				title: 'Laporan Penerimaan Kas',
				layout: 'form',
				items: []
			},{
				xtype: 'fieldset',
				title: 'Summary',
				layout: 'form',
				items: []
			}]
		});
			
		var wBukakasir = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			tbar: [{
				text: 'Kembali', iconCls:'silk-arrow-undo', style: 'marginLeft: 10px',
				handler: function() {
					wBukakasir.close();
				}
			},{
				text: 'Tutup Kasir', iconCls:'silk-save', id: 'bt.simpan', style: 'marginLeft: 5px',
				handler: function() {
					fnSaveBukakasir();                           
				}
			},{
				text: 'Cetak', iconCls:'silk-printer', style: 'marginLeft: 5px',
				handler: function() {
					
				}
			}],
			items: [bukakasir_form]
		});
		
		function fncatatanbuka(){
			var var_ket = "Saldo awal untuk uang kembalian : " +
				"\n@50.000 	= " +
				"\n@20.000 	= " +
				"\n@10.000 	= " +
				"\n@5.000  	= " +
				"\n@2.000  	= " +
				"\n@1.000  	= ";
			Ext.getCmp("ta.catatanbuka").setValue(var_ket);
		}

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setBukakasirForm(isUpdate, record);
		wBukakasir.show();

	/**
	FORM FUNCTIONS
	*/	
		function setBukakasirForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.nokasir', record.get('nokasir'));
					RH.setCompValue('df.date', record.data['tglbuka']);
					RH.setCompValue('tf.time', record.get('jambuka'));
					RH.setCompValue('tf.idsift', record.get('idshiftbuka'));
					RH.setCompValue('tf.sift', record.get('nmshiftbuka'));
					RH.setCompValue('cb.loketbagian', record.get('idbagian'));
					RH.setCompValue('nf.saldoawal', record.get('saldoawal'));
					RH.setCompValue('ta.catatanbuka', record.get('catatanbuka'));
					RH.setCompValue('cb.stkasir', record.get('idstkasir'));
					return;
				}
			}
		}
		
		function fnSaveBukakasir(){
			var idForm = 'frm.bukakasir';
			var sUrl = BASE_URL +'bukakasir_controller/insert_update_bukakasir';
			var sParams = new Object({
				nokasir			:	RH.getCompValue('tf.nokasir'),
				tglbuka			:	RH.getCompValue('df.date'),
				jambuka			:	RH.getCompValue('tf.time'),
				idshiftbuka		:	RH.getCompValue('tf.idsift'),
				userid			:	USERID,
				idbagian		:	RH.getCompValue('cb.loketbagian'),
				saldoawal		:	RH.getCompValue('nf.saldoawal'),
				catatanbuka		:	RH.getCompValue('ta.catatanbuka'),
				idstkasir		:	RH.getCompValue('cb.stkasir'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'bukakasir_controller/insert_update_bukakasir';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wBukakasir, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}