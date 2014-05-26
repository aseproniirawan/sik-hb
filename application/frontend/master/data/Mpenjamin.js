function Mpenjamin(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 20;
	var ds_penjamin = dm_penjamin();
	var ds_jpenjamin = dm_jpenjamin();
	var ds_status = dm_status();
	
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
		store: ds_penjamin,
		displayInfo: true,
		displayMsg: 'Data Penjamin Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_penjamin',
		store: ds_penjamin,		
		autoScroll: true,
		height: 560,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddPenjamin();
				//Ext.getCmp('tf.frm.kdpenjamin').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 70,
			dataIndex: 'kdpenjamin',
			sortable: true
		},
		{
			header: 'Nama',
			width: 150,
			dataIndex: 'nmpenjamin',
			sortable: true
		},
		{
			header: 'Jenis Penjamin',
			width: 100,
			dataIndex: 'nmjnspenjamin',
			sortable: true
		},
		{
			header: 'Alamat',
			width: 200,
			dataIndex: 'alamat',
			sortable: true
		},
		{
			header: 'No. Telepon',
			width: 100,
			dataIndex: 'notelp',
			sortable: true
		},
		{
			header: 'No. fax',
			width: 100,
			dataIndex: 'nofax',
			sortable: true
		},
		{
			header: 'Email',
			width: 150,
			dataIndex: 'email',
			sortable: true
		},
		{
			header: 'Website',
			width: 150,
			dataIndex: 'website',
			sortable: true
		},
		{
			header: 'Contact Person',
			width: 150,
			dataIndex: 'nmcp',
			sortable: true
		},		
		{
			header: 'No. Handphone',
			width: 100,
			dataIndex: 'nohp',
			sortable: true
		},
		{
			header: 'Tanggal Awal',
			width: 100,
			dataIndex: 'tglawal',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Tanggal Akhir',
			width: 100,
			dataIndex: 'tglakhir',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Status',
			width: 80,
			dataIndex: 'nmstatus',
			sortable: true
		},
		{
			header: 'Info Umum',
			width: 150,
			dataIndex: 'infoumum',
			sortable: true
		},
		{
			header: 'Info RJ',
			width: 150,
			dataIndex: 'inforj',
			sortable: true
		},
		{
			header: 'Info RI',
			width: 150,
			dataIndex: 'infori',
			sortable: true
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
						fnEditePenjamin(grid, rowIndex);
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
						fnDeletePenjamin(grid, rowIndex);
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
		title: 'Penjamin', iconCls:'silk-user',
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
	
	function reloadPenjamin(){
		ds_penjamin.reload();
	}
	
	function fnAddPenjamin(){
		var grid = grid_nya;
		wEntryPenjamin(false, grid, null);	
	}
	
	function fnEditePenjamin(grid, record){
		var record = ds_penjamin.getAt(record);
		wEntryPenjamin(true, grid, record);		
	}
	
	function fnDeletePenjamin(grid, record){
		var record = ds_penjamin.getAt(record);
		var url = BASE_URL + 'penjamin_controller/delete_penjamin';
		var params = new Object({
						idpenjamin	: record.data['idpenjamin']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryPenjamin(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Penjamin (Edit)':'Penjamin (Entry)';
		var penjamin_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.penjamin',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 580, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',	
			items: [ 
			{
				id: 'tf.frm.idpenjamin', 
				hidden: true,
			},
			{
				fieldLabel: 'Kode',
				id:'tf.frm.kdpenjamin',
				width: 100,
				allowBlank: false
			},
			{
				fieldLabel: 'Nama penjamin',
				id:'tf.frm.nmpenjamin',
				width: 300,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.jpenjamin', 
				fieldLabel: 'Jenis penjamin',
				store: ds_jpenjamin, triggerAction: 'all',
				valueField: 'idjnspenjamin', displayField: 'nmjnspenjamin',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},		
			{
				xtype: 'textarea',
				fieldLabel: 'Alamat',
				id: 'ta.frm.alamat',
				width: 300,
			},
			{
				fieldLabel: 'No. Telepon',
				id:'tf.frm.notelp',
				width: 300,
			},		
			{
				fieldLabel: 'No. Fax',
				id: 'tf.frm.nofax',
				width: 300,
			},
			{
				fieldLabel: 'Email',
				id: 'tf.frm.email',
				width: 300,
				vtype: 'email',
			},
			{
				fieldLabel: 'Web Site',
				id: 'tf.frm.website',
				width: 300,
			},
			{
				fieldLabel: 'Contact Person',
				id: 'tf.frm.nmcp',
				width: 300,
			},
			{
				fieldLabel: 'No. Handphone',
				id:'tf.frm.nohp',
				width: 300,
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Awal',
				id: 'df.frm.tglawal',
				name: 'df.frm.tglawal',
				format: "d/m/Y",
				width: 100,
				editable: false,
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal Akhir',
				id: 'df.frm.tglakhir',
				name: 'df.frm.tglakhir',
				format: "d/m/Y",
				width: 100,
				editable: false,
			},
			{
				xtype: 'combo', id: 'cb.frm.status', 
				fieldLabel: 'Status',
				store: ds_status, triggerAction: 'all',
				valueField: 'idstatus', displayField: 'nmstatus',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Info Umum',
				id:'tf.frm.infoumum',
				width: 300,
				height: 45
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Info RJ',
				id:'tf.frm.inforj',
				width: 300,
				height: 45
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Info RI',
				id:'tf.frm.infori',
				width: 300,
				height: 45
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSavePenjamin();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wPenjamin.close();
				}
			}]
		});
			
		var wPenjamin = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [penjamin_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setPenjaminForm(isUpdate, record);
		wPenjamin.show();

	/**
	FORM FUNCTIONS
	*/	
		function setPenjaminForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('iddokter'));
					RH.setCompValue('tf.frm.idpenjamin', record.get('idpenjamin'));
					RH.setCompValue('tf.frm.kdpenjamin', record.get('kdpenjamin'));
					RH.setCompValue('tf.frm.nmpenjamin', record.get('nmpenjamin'));
					RH.setCompValue('cb.frm.jpenjamin', record.data['idjnspenjamin']);
					RH.setCompValue('ta.frm.alamat', record.get('alamat'));
					RH.setCompValue('tf.frm.notelp', record.get('notelp'));
					RH.setCompValue('tf.frm.nofax', record.get('nofax'));
					RH.setCompValue('tf.frm.email', record.get('email'));
					RH.setCompValue('tf.frm.website', record.get('website'));
					RH.setCompValue('tf.frm.nmcp', record.get('nmcp'));				
					RH.setCompValue('tf.frm.nohp', record.get('nohp'));
					RH.setCompValue('df.frm.tglawal', record.get('tglawal'));
					RH.setCompValue('df.frm.tglakhir', record.get('tglakhir'));
					RH.setCompValue('cb.frm.status', record.data['idstatus']);
					RH.setCompValue('tf.frm.infoumum', record.get('infoumum'));
					RH.setCompValue('tf.frm.inforj', record.get('inforj'));
					RH.setCompValue('tf.frm.infori', record.get('infori'));
					//Ext.getCmp('tf.frm.kdpenjamin').setReadOnly(true);
					return;
				}
			}
		}
		
		function fnSavePenjamin(){
			var idForm = 'frm.penjamin';
			var sUrl = BASE_URL +'penjamin_controller/insert_penjamin';
			var sParams = new Object({
				idpenjamin		:	RH.getCompValue('tf.frm.idpenjamin'),
				kdpenjamin		:	RH.getCompValue('tf.frm.kdpenjamin'),
				nmpenjamin		:	RH.getCompValue('tf.frm.nmpenjamin'),
				idjnspenjamin	:	RH.getCompValue('cb.frm.jpenjamin'),
				alamat			:	RH.getCompValue('ta.frm.alamat'),
				notelp			:	RH.getCompValue('tf.frm.notelp'),
				nofax			:	RH.getCompValue('tf.frm.nofax'),
				email			:	RH.getCompValue('tf.frm.email'),
				website			:	RH.getCompValue('tf.frm.website'),
				nmcp			:	RH.getCompValue('tf.frm.nmcp'),
				nohp			:	RH.getCompValue('tf.frm.nohp'),
				tglawal			:	RH.getCompValue('df.frm.tglawal'),
				tglakhir		:	RH.getCompValue('df.frm.tglakhir'),
				idstatus		:	RH.getCompValue('cb.frm.status'),
				infoumum		:	RH.getCompValue('tf.frm.infoumum'),
				inforj			:	RH.getCompValue('tf.frm.inforj'),
				infori			:	RH.getCompValue('tf.frm.infori'),			
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'penjamin_controller/update_penjamin';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wPenjamin, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}
