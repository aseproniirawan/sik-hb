function Mpelayanan(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_pelayanan = dm_pelayanan();
	var ds_jpelayanan = dm_jpelayanan();
	var ds_jhirarki = dm_jhirarki();
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
		store: ds_pelayanan,
		displayInfo: true,
		displayMsg: 'Data Pelayanan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_pelayanan',
		store: ds_pelayanan,		
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
				fnAddPelayanan();
				//Ext.getCmp('tf.kdpelayanan').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'No Urut',
			width: 70,
			dataIndex: 'nourut',
			sortable: true
		},
		{
			header: 'Kode',
			width: 70,
			dataIndex: 'kdpelayanan',
			sortable: true
		},
		{
			header: 'Nama Pelayanan',
			width: 520,
			dataIndex: 'nmpelayanan',
			sortable: true
		},
		{
			header: 'Jenis Pelayanan',
			width: 120,
			dataIndex: 'nmjnspelayanan',
			sortable: true
		},
		{
			header: 'Jenis Hirarki',
			width: 100,
			dataIndex: 'nmjnshirarki',
			sortable: true
		},
		{
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
						fnEditPelayanan(grid, rowIndex);
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
						fnDeletePelayanan(grid, rowIndex);
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
		title: 'Pelayanan', iconCls:'silk-user',
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
	
	function reloadPelayanan(){
		ds_pelayanan.reload();
	}
	
	function fnAddPelayanan(){
		var grid = grid_nya;
		wEntryPelayanan(false, grid, null);	
	}
	
	function fnEditPelayanan(grid, record){
		var record = ds_pelayanan.getAt(record);
		wEntryPelayanan(true, grid, record);		
	}
	
	function fnDeletePelayanan(grid, record){
		var record = ds_pelayanan.getAt(record);
		var url = BASE_URL + 'pelayanan_controller/delete_pelayanan';
		var params = new Object({
						kdpelayanan	: record.data['kdpelayanan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryPelayanan(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Pelayanan (Edit)':'Pelayanan (Entry)';
		var pelayanan_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.pelayanan',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 250, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				fieldLabel: 'No Urut',
				id:'tf.frm.nourut',
				width: 100,
				allowBlank: false
			},
			{
				fieldLabel: 'Kode',
				id:'tf.kdpelayanan',
				width: 100,
				readOnly: true,
				style : 'opacity:0.6',
			},
			{
				fieldLabel: 'Nama Pelayanan',
				id:'tf.frm.nmpelayanan',
				width: 300,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.jpelayanan', 
				fieldLabel: 'Jenis Pelayanan',
				store: ds_jpelayanan, triggerAction: 'all',
				valueField: 'idjnspelayanan', displayField: 'nmjnspelayanan',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.jhirarki', 
				fieldLabel: 'Jenis Hirarki',
				store: ds_jhirarki, triggerAction: 'all',
				valueField: 'idjnshirarki', displayField: 'nmjnshirarki',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'combo', id: 'cb.frm.status', 
				fieldLabel: 'Status',
				store: ds_status, triggerAction: 'all',
				valueField: 'idstatus', displayField: 'nmstatus',
				forceSelection: true, submitValue: true, 
				mode: 'local', emptyText:'Pilih...', width: 150,
				editable: false,
				allowBlank: false
			},
			{
				xtype: 'compositefield',
				name: 'comp_pel_kdpelayanan',
				fieldLabel: 'Parent',
				id: 'comp_pel_kdpelayanan',
				items: [{
					xtype: 'textfield',
					id: 'tf.frm.pel_kdpelayanan',				
					fieldLabel: 'Parent',
					width: 150, emptyText:'Pilih...'
				},
				{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn_data_pel_kdpelayanan',
					width: 3,
					handler: function() {
						perentPelayanan();
					}
				}]
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSavePelayanan();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wPelayanan.close();
				}
			}]
		});
			
		var wPelayanan = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [pelayanan_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setPelayananForm(isUpdate, record);
		wPelayanan.show();

	/**
	FORM FUNCTIONS
	*/	
		function setPelayananForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					Ext.Ajax.request({
						url:BASE_URL + 'pelayanan_controller/getNmpelayanan',
						params:{
							pel_kdpelayanan : record.get('pel_kdpelayanan')
						},
						method:'POST',
						success: function(response){
							var r = Ext.decode(response.responseText);
							RH.setCompValue('tf.frm.pel_kdpelayanan', r);
						}
					});
					
					RH.setCompValue('tf.kdpelayanan', record.get('kdpelayanan'));
					RH.setCompValue('tf.frm.nourut', record.get('nourut'));
					RH.setCompValue('tf.frm.nmpelayanan', record.get('nmpelayanan'));
					RH.setCompValue('cb.frm.jpelayanan', record.data['idjnspelayanan']);
					RH.setCompValue('cb.frm.jhirarki', record.get('idjnshirarki'));
					RH.setCompValue('cb.frm.status', record.get('idstatus'));
					RH.setCompValue('tf.frm.pel_kdpelayanan', record.get('pel_kdpelayanan'));
					/* Ext.getCmp('tf.kdpelayanan').setReadOnly(true);
					Ext.getCmp('tf.frm.nourut').setReadOnly(true); */
					return;
				}
			}
		}
		
		function fnSavePelayanan(){
			var idForm = 'frm.pelayanan';
			var sUrl = BASE_URL +'pelayanan_controller/insert_update_pelayanan';
			var sParams = new Object({		
				kdpelayanan		:	RH.getCompValue('tf.kdpelayanan'),
				nourut			:	RH.getCompValue('tf.frm.nourut'),
				nmpelayanan		:	RH.getCompValue('tf.frm.nmpelayanan'),
				idjnspelayanan	:	RH.getCompValue('cb.frm.jpelayanan'),
				idjnshirarki	:	RH.getCompValue('cb.frm.jhirarki'),
				idstatus		:	RH.getCompValue('cb.frm.status'),
				pel_kdpelayanan	:	RH.getCompValue('tf.frm.pel_kdpelayanan'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'pelayanan_controller/insert_update_pelayanan';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wPelayanan, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}
	
	function perentPelayanan(){
		var ds_pelayanan_parent = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
								url: BASE_URL + 'pelayanan_controller/get_parent_pelayanan',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'data',
			fields: [{
				name: 'kdpelayanan',
				mapping: 'kdpelayanan'
			},{
				name: 'nmpelayanan',
				mapping: 'nmpelayanan'
			}]
		});
		var cm_pelayanan_parent = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'kdpelayanan',
				width: 30
			},{
				header: 'Nama Pelayanan',
				dataIndex: 'nmpelayanan',
				width: 300
			}
		]);
		var sm_pelayanan_parent = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_pelayanan_parent = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_pelayanan_parent = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_pelayanan_parent,
			displayInfo: true,
			displayMsg: 'Data Pelayanan Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var car_pelayanan_parent = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_pelayanan_parent = new Ext.grid.GridPanel({
			ds: ds_pelayanan_parent,
			cm: cm_pelayanan_parent,
			sm: sm_pelayanan_parent,
			view: vw_pelayanan_parent,
			height: 350,
			width: 400,
			plugins: car_pelayanan_parent,
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
			bbar: paging_pelayanan_parent,
			listeners: {
				rowdblclick: klik_pelayanan_parent
			}
		});
		var win_find_pelayanan_parent = new Ext.Window({
			title: 'Sub Pelayanan',
			modal: true,
			items: [grid_find_pelayanan_parent]
		}).show();

		function klik_pelayanan_parent(grid, rowIdx){
			var rec_pelayanan_parent = ds_pelayanan_parent.getAt(rowIdx);
			var var_pelayanan_parent = rec_pelayanan_parent.data["nmpelayanan"];
						
			Ext.getCmp('tf.frm.pel_kdpelayanan').focus()
			Ext.getCmp("tf.frm.pel_kdpelayanan").setValue(var_pelayanan_parent);
						win_find_pelayanan_parent.close();
		}
	}
	
}
