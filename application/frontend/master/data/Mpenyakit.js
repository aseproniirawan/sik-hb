function Mpenyakit(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 20;
	var ds_penyakit = dm_penyakit();
	var ds_jhirarki = dm_jhirarki();
	
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
		store: ds_penyakit,
		displayInfo: true,
		displayMsg: 'Data Penyakit Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_penyakit',
		store: ds_penyakit,		
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
				fnAddPenyakit();
				//Ext.getCmp('tf.frm.kdpenyakit').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 70,
			dataIndex: 'kdpenyakit',
			sortable: true
		},
		{
			header: 'Nama Penyakit(Indonesia)',
			width: 250,
			dataIndex: 'nmpenyakit',
			sortable: true
		},
		{
			header: 'Nama Penyakit(English)',
			width: 580,
			dataIndex: 'nmpenyakiteng',
			sortable: true
		},
		{
			header: 'Jenis Hirarki',
			width: 100,
			dataIndex: 'nmjnshirarki',
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
						fnEditPenyakit(grid, rowIndex);
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
						fnDeletePenyakit(grid, rowIndex);
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
		title: 'Penyakit', iconCls:'silk-calendar',
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
	
	function reloadPenyakit(){
		ds_penyakit.reload();
	}
	
	function fnAddPenyakit(){
		var grid = grid_nya;
		wEntryPenyakit(false, grid, null);	
	}
	
	function fnEditPenyakit(grid, record){
		var record = ds_penyakit.getAt(record);
		wEntryPenyakit(true, grid, record);		
	}
	
	function fnDeletePenyakit(grid, record){
		var record = ds_penyakit.getAt(record);
		var url = BASE_URL + 'penyakit_controller/delete_penyakit';
		var params = new Object({
						idpenyakit	: record.data['idpenyakit']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
/**
WIN - FORM ENTRY/EDIT 
*/
	function wEntryPenyakit(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Penyakit (Edit)':'Penyakit (Entry)';
		var penyakit_form = new Ext.form.FormPanel({
			xtype:'form',
			id: 'frm.penyakit',
			buttonAlign: 'left',
			labelWidth: 150, labelAlign: 'right',
			bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
			monitorValid: true,
			height: 230, width: 500,
			layout: 'form', 
			frame: false, 
			defaultType:'textfield',		
			items: [ 
			{
				id: 'tf.frm.idpenyakit', 
				hidden: true,
			},
			{
				fieldLabel: 'Kode',
				id:'tf.frm.kdpenyakit',
				width: 100,
				sortable: true,
				allowBlank: false
			},
			{
				fieldLabel: 'Nama Penyakit',
				id:'tf.frm.nmpenyakit',
				width: 300,
				sortable: true,
				allowBlank: false
			},
			{
				fieldLabel: 'Nama Penyakit(Eng)',
				id:'tf.frm.nmpenyakiteng',
				width: 300,
				sortable: true,
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
			/* {
				id:'tf.frm.pen_idpenyakit',
				width: 100,
				sortable: true,
				hidden: true
			} */
			{
				xtype: 'compositefield',
				name: 'comp_pen_idpenyakit',
				fieldLabel: 'Parent',
				id: 'comp_pen_idpenyakit',
				items: [{
					xtype: 'textfield',
					id: 'tf.frm.pen_idpenyakit',				
					fieldLabel: 'Parent',
					width: 220, emptyText:'Pilih...'
				},
				{
					xtype: 'button',
					iconCls: 'silk-find',
					id: 'btn_data_pen_idpenyakit',
					width: 3,
					handler: function() {
						parentPenyakit();
					}
				}]
			}],
			buttons: [{
				text: 'Simpan', iconCls:'silk-save',
				handler: function() {
					fnSavePenyakit();                           
				}
			}, {
				text: 'Kembali', iconCls:'silk-arrow-undo',
				handler: function() {
					wPenyakit.close();
				}
			}]
		});
			
		var wPenyakit = new Ext.Window({
			title: winTitle,
			modal: true, closable:false,
			items: [penyakit_form]
		});

	/**
	CALL SET FORM AND SHOW THE FORM (WINDOW)
	*/
		setPenyakitForm(isUpdate, record);
		wPenyakit.show();

	/**
	FORM FUNCTIONS
	*/	
		function setPenyakitForm(isUpdate, record){
			if(isUpdate){
				if(record != null){
					Ext.Ajax.request({
						url:BASE_URL + 'penyakit_controller/getNmpenyakit',
						params:{
							pen_idpenyakit : record.get('pen_idpenyakit')
						},
						method:'POST',
						success: function(response){
							var r = Ext.decode(response.responseText);
							RH.setCompValue('tf.frm.pen_idpenyakit', r);
						}
					});
					
					RH.setCompValue('tf.frm.idpenyakit', record.get('idpenyakit'));
					RH.setCompValue('tf.frm.kdpenyakit', record.get('kdpenyakit'));
					RH.setCompValue('tf.frm.nmpenyakit', record.get('nmpenyakit'));
					RH.setCompValue('tf.frm.nmpenyakiteng', record.get('nmpenyakiteng'));
					RH.setCompValue('cb.frm.jhirarki', record.data['idjnshirarki']);
					RH.setCompValue('tf.frm.pen_idpenyakit', record.get('pen_idpenyakit'));
					//Ext.getCmp('tf.frm.kdpenyakit').setReadOnly(true);
					return;
				}
			}
		}
		
		function fnSavePenyakit(){
			var idForm = 'frm.penyakit';
			var sUrl = BASE_URL +'penyakit_controller/insert_penyakit';
			var sParams = new Object({
				idpenyakit		:	RH.getCompValue('tf.frm.idpenyakit'),
				idjnshirarki	:	RH.getCompValue('cb.frm.jhirarki'),
				kdpenyakit		:	RH.getCompValue('tf.frm.kdpenyakit'),
				nmpenyakit		:	RH.getCompValue('tf.frm.nmpenyakit'),
				nmpenyakiteng	:	RH.getCompValue('tf.frm.nmpenyakiteng'),
				pen_idpenyakit	:	RH.getCompValue('tf.frm.pen_idpenyakit'),
			});
			var msgWait = 'Tunggu, sedang proses menyimpan...';
			var msgSuccess = 'Tambah data berhasil';
			var msgFail = 'Tambah data gagal';
			var msgInvalid = 'Data belum valid (data primer belum terisi)!';
			
			if(isUpdate){
				sUrl = BASE_URL +'penyakit_controller/update_penyakit';
				msgSuccess = 'Update data berhasil';
				msgFail = 'Update data gagal';
			}
			
			//call form grid submit function (common function by RH)
			RH.submitGridForm(idForm, sUrl, sParams, grid, wPenyakit, 
				msgWait, msgSuccess, msgFail, msgInvalid);
		}
					
	}

	function parentPenyakit(){
		var ds_penyakit_parent = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
								url: BASE_URL + 'penyakit_controller/get_parent_penyakit',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'data',
			fields: [{
				name: 'idpenyakit',
				mapping: 'idpenyakit'
			},{
				name: 'nmpenyakit',
				mapping: 'nmpenyakit'
			}]
		});
		var cm_penyakit_parent = new Ext.grid.ColumnModel([
			{
				hidden:true,
				dataIndex: 'idpenyakit',
				width: 30
			},{
				header: 'Nama Penyakit',
				dataIndex: 'nmpenyakit',
				width: 300
			}
		]);
		var sm_penyakit_parent = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_penyakit_parent = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_penyakit_parent = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_penyakit_parent,
			displayInfo: true,
			displayMsg: 'Data Penyakit Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_penyakit_parent = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_penyakit_parent = new Ext.grid.GridPanel({
			ds: ds_penyakit_parent,
			cm: cm_penyakit_parent,
			sm: sm_penyakit_parent,
			view: vw_penyakit_parent,
			height: 350,
			width: 400,
			plugins: cari_penyakit_parent,
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
			bbar: paging_penyakit_parent,
			listeners: {
				rowdblclick: klik_penyakit_parent
			}
		});
		var win_find_penyakit_parent = new Ext.Window({
			title: 'Sub Penyakit',
			modal: true,
			items: [grid_find_penyakit_parent]
		}).show();

		function klik_penyakit_parent(grid, rowIdx){
			var rec_penyakit_parent = ds_penyakit_parent.getAt(rowIdx);
			var var_penyakit_parent = rec_penyakit_parent.data["nmpenyakit"];
						
			Ext.getCmp('tf.frm.pen_idpenyakit').focus()
			Ext.getCmp("tf.frm.pen_idpenyakit").setValue(var_penyakit_parent);
						win_find_penyakit_parent.close();
		}
	}
}
