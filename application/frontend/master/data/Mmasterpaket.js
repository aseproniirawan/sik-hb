function Mmasterpaket(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 20;
	var ds_masterpaket = dm_masterpaket();
	var ds_klstarif = dm_klstarif();
	
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
		store: ds_masterpaket,
		displayInfo: true,
		displayMsg: 'Data Master Paket Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'gp.grid_masterpaket',
		store: ds_masterpaket,
		autoHeight: true,
		autoScroll: true,
		columnLines: true,
		plugins: cari_data,
		pageSize: pageSize,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				//fnAddMasterpaket();
				fnwinMpaket();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Nama Paket',
			width: 300,
			dataIndex: 'nmpaket',
			sortable: true
		},
		{
			header: 'Kelas Tarif',
			width: 300,
			dataIndex: 'nmklstarif',
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
						fnEditMasterpaket(grid, rowIndex);
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
						fnDeleteMasterpaket(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Master Paket', iconCls:'silk-calendar',
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
		}],
	});
	SET_PAGE_CONTENT(form_bp_general);
/** 
FUNCTIONS
*/
	
	function reloadMasterpaket(){
		ds_masterpaket.reload();
	}
	
	function fnAddMasterpaket(){
		var grid = grid_nya;
		wEntryMasterpaket(false, grid, null);	
	}
	
	function fnEditMasterpaket(grid, record){
		var record = ds_masterpaket.getAt(record);
		wEntryMasterpaket(true, grid, record);		
	}
	
	function fnDeleteMasterpaket(grid, record){
		var record = ds_masterpaket.getAt(record);
		var url = BASE_URL + 'masterpaket_controller/delete_masterpaket';
		var params = new Object({
						idtarifpaket	: record.data['idtarifpaket'],
						idklstarif		: record.data['idklstarif']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function wEntryMasterpaket(isUpdate, grid, record){
		var winTitle = (isUpdate)?'Master Paket (Edit)':'Master Paket (Entry)';
		var Masterpaket_Form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.masterpaket',
        buttonAlign: 'left',
		labelWidth: 100, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 200, width: 550,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [
		{
            id: 'tf.idtarifpaket', 
            hidden: true,
        },
		{
            fieldLabel: 'Nama Paket',
			id: 'tf.frm.nmpaket',
            width: 400,
        },
		{
			xtype: 'combo', id: 'cb.frm.klstarif', 
			store: ds_klstarif, triggerAction: 'all',
			valueField: 'idklstarif', displayField: 'nmklstarif',
			forceSelection: true, submitValue: true, 
			mode: 'local', emptyText:'Pilih Kelas Tarif...', width: 150,
			editable: false,
			allowBlank: false
		}],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveMasterpaket();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wMasterpaket.close();
            }
        }]
    });
		
    var wMasterpaket = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [Masterpaket_Form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setMasterpaketForm(isUpdate, record);
	wMasterpaket.show();

/**
FORM FUNCTIONS
*/	
	function setMasterpaketForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idtarifpaket'));
				RH.setCompValue('tf.idtarifpaket', record.get('idtarifpaket'));
				RH.setCompValue('cb.frm.klstarif', record.get('idklstarif'));
				RH.setCompValue('tf.frm.nmpaket', record.get('nmpaket'));
				return;
			}
		}
	}
	
	function fnSaveMasterpaket(){
		var idForm = 'frm.masterpaket';
		var sUrl = BASE_URL +'masterpaket_controller/insert_update_masterpaket';
		var sParams = new Object({
			idtarifpaket	:	RH.getCompValue('tf.idtarifpaket'),
			idklstarif		:	RH.getCompValue('cb.frm.klstarif'),
			nmpaket			:	RH.getCompValue('tf.frm.nmpaket'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'masterpaket_controller/insert_update_masterpaket';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wMasterpaket, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}

	function fnwinMpaket(){
		var sm_cbGrid = new Ext.grid.CheckboxSelectionModel({
			header: false,
			listeners: {
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
		
		var cm_klstarif = new Ext.grid.ColumnModel([
			sm_cbGrid,
			{
				header: 'Id',
				dataIndex: 'idklstarif',
				width: 100,
				hidden: true
			},{
				header: 'Kelas Tarif',
				dataIndex: 'nmklstarif',
				width: 600
			}
		]);
		
		var vw_klstarif = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		
		var paging_klstarif = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_klstarif,
			displayInfo: true,
			displayMsg: 'Data Kelas Tarif Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		
		var grid_klstarif = new Ext.grid.GridPanel({
			ds: ds_klstarif,
			cm: cm_klstarif,
			sm: sm_cbGrid,
			view: vw_klstarif,
			height: 350,
			width: 650,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			autoScroll: true,
			loadMask: true,
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			//bbar: paging_klstarif,
		});
		var win_master_paket = new Ext.Window({
			title: 'Master Paket (Entry)',
			modal: true,
			closable: false,
			items: [{
					xtype: 'container',
					style: 'padding: 10px; margin: 5px 0 10px 0',
					layout: 'column',
					defaults: {labelWidth: 100, labelAlign: 'right'},
					items:[{
						xtype: 'fieldset',
						columnWidth: 1,
						border: false,
						items: [{
							xtype: 'textfield',
							fieldLabel: 'Kode Paket',
							width: 200,
							id: 'tf.idtarifpaket',
							hidden: true
						},{
							xtype: 'compositefield',
							id: 'comp_cnorm',
							items:[{
								xtype: 'textfield',
								id: 'tf.nmpaket',
								fieldLabel: 'Nama Paket',	
								width: 505,
							}]
						}]
					}]
				},
				grid_klstarif,
				{
					xtype: 'compositefield',
					buttonAlign: 'left',
					style: 'marginTop: 20px; marginBottom: 10px;',
					items:[{
						xtype: 'button',
						text: 'Simpan',
						id: 'btn.simpan',
						iconCls:'silk-save',
						style: 'marginLeft: 10px',
						width: 70,
						handler: function()
						{
							var m = grid_klstarif.getSelectionModel().getSelections();
							if(m.length > 0)
							{				
								add();	 
							}
							else
							{
								Ext.MessageBox.alert('Message', 'Data Belum Di Pilih...!');
							}						
						}
					},{
						xtype: 'button',
						text: 'Kembali',
						id: 'btn.kembali',
						iconCls:'silk-arrow-undo',
						style: 'marginLeft: 15px',
						width: 70,
						handler: function() {
							win_master_paket.close();
						}
					}]
				}
			]
		}).show();
		
		function add(btn){		
			var m = grid_klstarif.getSelectionModel().getSelections();
			var store = grid_klstarif.getStore();			
			for(var i=0; i< m.length; i++){
				var rec = m[i];
				console.log(rec);
				if(rec){
					console.log(rec.get("idklstarif"));
					var idklstarif = rec.data['idklstarif'];
					Ext.Ajax.request({
						url: BASE_URL +'masterpaket_controller/insert_update_masterpaket',
						method: 'POST',
						params: {
							idklstarif 	: idklstarif,
							nmpaket		: RH.getCompValue('tf.nmpaket'),
						},
						success: function(){
							Ext.getCmp('gp.grid_masterpaket').store.reload();
						}
					});
				}
				Ext.MessageBox.alert('Message', 'Tambah Data Berhasil..');
				//Ext.getCmp('gp.grid_masterpaket').store.reload();
			}
				win_master_paket.close();
				//Ext.getCmp('gp.grid_masterpaket').store.reload();
		}
	}	
}
