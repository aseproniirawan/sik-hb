function Msupplier(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_supplier = dm_supplier();
	var ds_bank = dm_bank();
	var ds_status = dm_status();
	var ds_pengguna = dm_pengguna();
	
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
		store: ds_supplier,
		displayInfo: true,
		displayMsg: 'Data Supplier Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_supplier',
		store: ds_supplier,		
		autoScroll: true,
		height: 530, //autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddSupplier();
				//Ext.getCmp('tf.kdsupplier').getEl().hide();
				//Ext.getCmp('tf.kdsupplier').getEl().show();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 60,
			dataIndex: 'kdsupplier',
			sortable: true
		},{
			header: 'Tanggal Daftar',
			width: 100,
			dataIndex: 'tgldaftar',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Nama',
			width: 200,
			dataIndex: 'nmsupplier',
			sortable: true
		},{
			header: 'Alamat',
			width: 200,
			dataIndex: 'alamat',
			sortable: true
		},{
			header: 'No Telephon',
			width: 100,
			dataIndex: 'notelp',
			sortable: true
		},
		{
			header: 'No Fax',
			width: 100,
			dataIndex: 'nofax',
			sortable: true
		},
		{
			header: 'Email',
			width: 100,
			dataIndex: 'email',
			sortable: true
		},{
			header: 'Web Site',
			width: 100,
			dataIndex: 'website',
			sortable: true
		},{
			header: 'Kontak Person',
			width: 100,
			dataIndex: 'kontakperson',
			sortable: true
		},		
		{
			header: 'No Hp',
			width: 100,
			dataIndex: 'nohp',
			sortable: true
		},{
			header: 'NpWp',
			width: 100,
			dataIndex: 'npwp',
			sortable: true
		},{
			header: 'Bank',
			width: 100,
			dataIndex: 'nmbank',
			sortable: true
		},
		{
			header: 'No. Rek',
			width: 100,
			dataIndex: 'norek',
			sortable: true
		},{
			header: 'Atas Nama',
			width: 200,
			dataIndex: 'atasnama',
			sortable: true
		},
		{
			header: 'Keterangan',
			width: 150,
			dataIndex: 'keterangan',
			sortable: true
		},{
			header: 'Status',
			width: 80,
			dataIndex: 'nmstatus',
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
						fnEditSupplier(grid, rowIndex);
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
						fnDeleteSupplier(grid, rowIndex);
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
		title: 'Supplier', iconCls:'silk-user',
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
	
	function reloadSupplier(){
		ds_supplier.reload();
	}
	
	function fnAddSupplier(){
		var grid = grid_nya;
		wEntrySupplier(false, grid, null);
		var userid = RH.getCompValue('tf.userid', true);
			if(userid != ''){
				RH.setCompValue('cb.user', userid);
			}
			return;
	}
	
	function fnEditSupplier(grid, record){
		var record = ds_supplier.getAt(record);
		wEntrySupplier(true, grid, record);		
	}
	
	function fnDeleteSupplier(grid, record){
		var record = ds_supplier.getAt(record);
		var url = BASE_URL + 'supplier_controller/delete_supplier';
		var params = new Object({
						kdsupplier	: record.data['kdsupplier']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntrySupplier(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Supplier (Edit)':'Supplier (Entry)';
		var supplier_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.supplier',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 620, width: 500,
			layout: 'form', 
			frame: false,
			autoScroll: true,
			defaultType:'textfield',		
			items: [
			{
				fieldLabel: 'Kode',
				id: 'tf.kdsupplier',
				width: 100,
				readOnly: true,
				style : 'opacity:0.6',
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Daftar',
				id: 'df.tgldaftar',
				format: "d/m/Y",
				value: new Date(),
				width: 150,
				editable: false
			},
			{
				fieldLabel: 'Nama supplier',
				id:'tf.nmsupplier',
				width: 300,
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Alamat',
				id: 'ta.alamat',
				width: 300,
				sortable: true
			},{
				fieldLabel: 'No Telephon',
				id:'tf.notelp',
				width: 300,
			},{
				fieldLabel: 'No Fax',
				id:'tf.nofax',
				width: 300,
			},{
				fieldLabel: 'Email',
				id:'tf.email',
				width: 300,
				vtype: 'email',
			},{
				fieldLabel: 'Web Site',
				id:'tf.website',
				width: 300,
			},{
				fieldLabel: 'Konta Person',
				id:'tf.kontakperson',
				width: 300,
			},{
				fieldLabel: 'No Hp',
				id:'tf.nohp',
				width: 300,
			},{
				fieldLabel: 'npwp',
				id:'tf.npwp',
				width: 300,
			},		
			{
				xtype: 'combo', id: 'cb.bank', 
				fieldLabel: 'Bank',
				store: ds_bank, triggerAction: 'all',
				valueField: 'idbank', displayField: 'nmbank',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},{
				fieldLabel: 'No Rekening',
				id:'tf.norek',
				width: 300,
			},{
				fieldLabel: 'Atas Nama',
				id:'tf.atasnama',
				width: 300,
			},
			{	xtype: 'textarea',
				fieldLabel: 'Keterangan',
				id: 'ta.keterangan',
				width: 300,
			},	
			{
				xtype: 'combo', id: 'cb.status', 
				fieldLabel: 'Status',
				store: ds_status, triggerAction: 'all',
				valueField: 'idstatus', displayField: 'nmstatus',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},	
			{
				xtype: 'combo', id: 'cb.user', 
				fieldLabel: 'User Input',
				store: ds_pengguna, triggerAction: 'all',
				valueField: 'userid', displayField: 'nmlengkap',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				readOnly: true,
				style : 'opacity:0.6',
			},{
				xtype: 'textfield',
				fieldLabel: 'User Id',
				id:'tf.userid',
				width: 150,
				value: USERID,
				hidden: true,
				
			},{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Input',
				id: 'df.tglinput',
				format: "d/m/Y",
				value: new Date(),
				width: 150,
				editable: false,
				readOnly: true,
				style : 'opacity:0.6',
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveSupplier();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wSupplier.close();
				}
			}]
		});
			
		var wSupplier = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [supplier_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setSupplierForm(isUpdate, record);
		wSupplier.show();

	/**
	FORM FUNCTIONS
	*/	
		function setSupplierForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					RH.setCompValue('tf.kdsupplier', record.get('kdsupplier'));
					RH.setCompValue('df.tgldaftar', record.get('tgldaftar'));
					RH.setCompValue('tf.nmsupplier', record.get('nmsupplier'));
					RH.setCompValue('ta.alamat', record.get('alamat'));
					RH.setCompValue('tf.notelp', record.get('notelp'));
					RH.setCompValue('tf.nofax', record.get('nofax'));
					RH.setCompValue('tf.email', record.get('email'));
					RH.setCompValue('tf.website', record.get('website'));
					RH.setCompValue('tf.kontakperson', record.get('kontakperson'));
					RH.setCompValue('tf.nohp', record.get('nohp'));
					RH.setCompValue('tf.npwp', record.get('npwp'));
					RH.setCompValue('cb.bank', record.get('idbank'));
					RH.setCompValue('tf.norek', record.get('norek'));
					RH.setCompValue('tf.atasnama', record.get('atasnama'));
					RH.setCompValue('ta.keterangan', record.get('keterangan'));
					RH.setCompValue('cb.status', record.data['idstatus']);
					RH.setCompValue('cb.user', record.get('userid'));
					RH.setCompValue('df.tglinput', record.get('tglinput'));
					return;
				}
			}
		}
		
		function fnSaveSupplier(){
			var idForm = 'frm.supplier';
			var sUrl = BASE_URL +'supplier_controller/insert_update_supplier';
			var sParams = new Object({
				kdsupplier		:	RH.getCompValue('tf.kdsupplier'),
				tgldaftar		:	RH.getCompValue('df.tgldaftar'),
				nmsupplier		:	RH.getCompValue('tf.nmsupplier'),
				alamat			:	RH.getCompValue('ta.alamat'),
				notelp			:	RH.getCompValue('tf.notelp'),
				nofax			:	RH.getCompValue('tf.nofax'),
				email			:	RH.getCompValue('tf.email'),
				website			:	RH.getCompValue('tf.website'),
				kontakperson	:	RH.getCompValue('tf.kontakperson'),
				nohp			:	RH.getCompValue('tf.nohp'),
				npwp			:	RH.getCompValue('tf.npwp'),
				idbank			:	RH.getCompValue('cb.bank'),
				norek			:	RH.getCompValue('tf.norek'),
				atasnama		:	RH.getCompValue('tf.atasnama'),
				keterangan		:	RH.getCompValue('ta.keterangan'),		
				idstatus		:	RH.getCompValue('cb.status'),
				userid			:	RH.getCompValue('cb.user'),		
				tglinput		:	RH.getCompValue('df.tglinput')
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'supplier_controller/insert_update_supplier';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wSupplier, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}
