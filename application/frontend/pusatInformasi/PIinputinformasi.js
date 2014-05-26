function PIinputinformasi(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 22;
	var ds_inputinformasi = dm_inputinformasi();
	var ds_stpublish = dm_stpublish();
	
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
		store: ds_inputinformasi,
		displayInfo: true,
		displayMsg: 'Data Input Informasi Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_inputinformasi',
		store: ds_inputinformasi,		
		autoScroll: true,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddInputinformasi();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Tanggal',
			width: 120,
			dataIndex: 'tglinfo',
			sortable: true,
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
		},
		{
			header: 'Judul',
			width: 250,
			dataIndex: 'judul',
			sortable: true
		},
		/* {
			header: 'Deskripsi',
			width: 300,
			dataIndex: 'deskripsi',
			sortable: true
		}, */
		{
			header: 'User',
			width: 100,
			dataIndex: 'nmlengkap',
			sortable: true
		},
		{
			header: 'Status',
			width: 100,
			dataIndex: 'nmstpublish',
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
						fnEditInputinformasi(grid, rowIndex);
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
						fnDeleteInputinformasi(grid, rowIndex);
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
		title: 'Input Informasi', iconCls:'silk-calendar',
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
	
	function reloadInputinformasi(){
		ds_inputinformasi.reload();
	}
	
	function fnAddInputinformasi(){
		var grid = grid_nya;
		wEntryInputinformasi(false, grid, null);	
	}
	
	function fnEditInputinformasi(grid, record){
		var record = ds_inputinformasi.getAt(record);
		wEntryInputinformasi(true, grid, record);		
	}
	
	function fnDeleteInputinformasi(grid, record){
		var record = ds_inputinformasi.getAt(record);
		var url = BASE_URL + 'inputinformasi_controller/delete_inputinformasi';
		var params = new Object({
						idinfo	: record.data['idinfo']
					});
		RH.deleteGridRecord(url, params, grid );
	}

	/**
	WIN - FORM ENTRY/EDIT 
	*/
	function wEntryInputinformasi(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Input Informasi (Edit)':'Input Informasi (Entry)';
		var inputinformasi_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.inputinformasi',
			buttonAlign: 'left',
			labelWidth: 145, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 360, width: 700,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.idinfo', 
				hidden: true,
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Tanggal',
				id: 'df.frm.tglinfo',
				format: "d/m/Y",
				value: new Date(),
				width: 150,
				editable: false
			},
			{
				fieldLabel: 'Judul',
				id: 'tf.judul',
				width: 520,
			},
			/* {
				xtype: 'textarea',
				fieldLabel: 'Deskripsi',
				id: 'ta.deskripsi',
				width: 300,
			}, */
			{	
				xtype: 'htmleditor',
				fieldLabel: 'Deskripsi',
				anchor:'97% 55%',
				name:'deskripsiind',
				id: 'ta.deskripsi'
			},
			{
				fieldLabel: 'User',
				id: 'tf.user',
				width: 150,
				value: USERNAME,
				readOnly : true,
				style: 'opacity:0.6',
			},
			{
				fieldLabel: 'UserId',
				id: 'tf.userid',
				width: 100,
				value: USERID,
				hidden: true,
			},
			{
				xtype: 'combo', id: 'cb.stpublish', 
				fieldLabel: 'Status',
				store: ds_stpublish, triggerAction: 'all',
				valueField: 'idstpublish', displayField: 'nmstpublish',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false, value: 2,
				allowBlank: false
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSaveInputinformasi();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wInputinformasi.close();
				}
			}]
		});
			
		var wInputinformasi = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [inputinformasi_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setInputinformasiForm(isUpdate, record);
		wInputinformasi.show();

	/**
	FORM FUNCTIONS
	*/	
		function setInputinformasiForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					//alert(record.get('idhlibur'));
					RH.setCompValue('tf.frm.idinfo', record.get('idinfo'));
					RH.setCompValue('df.frm.tglinfo', record.get('tglinfo'));
					RH.setCompValue('tf.judul', record.get('judul'));
					RH.setCompValue('ta.deskripsi', record.get('deskripsi'));
					RH.setCompValue('cb.stpublish', record.data['idstpublish']);
					return;
				}
			}
		}
		
		function fnSaveInputinformasi(){
			var idForm = 'frm.inputinformasi';
			var sUrl = BASE_URL +'inputinformasi_controller/insert_inputinformasi';
			var sParams = new Object({
				idinfo			:	RH.getCompValue('tf.frm.idinfo'),
				tglinfo			:	RH.getCompValue('df.frm.tglinfo'),
				judul			:	RH.getCompValue('tf.judul'),
				deskripsi		:	RH.getCompValue('ta.deskripsi'),
				userid			:	RH.getCompValue('tf.userid'),
				idstpublish		:	RH.getCompValue('cb.stpublish'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'inputinformasi_controller/update_inputinformasi';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wInputinformasi, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
}