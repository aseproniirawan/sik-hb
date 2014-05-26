function Mdaerah(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_daerah = dm_daerah();
	var ds_jhirarki = dm_jhirarki();
	var ds_lvldaerah = dm_lvldaerah();
	
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
		store: ds_daerah,
		displayInfo: true,
		displayMsg: 'Data Daerah Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_daerah',
		store: ds_daerah,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		pageSize: pageSize,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddDaerah();
				//Ext.getCmp('tf.frm.kddaerah').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kddaerah',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmdaerah',
			sortable: true
		},
		{
			header: 'Level Daerah',
			width: 150,
			dataIndex: 'nmlvldaerah',
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
						fnEditDaerah(grid, rowIndex);
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
						fnDeleteDaerah(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Daerah', iconCls:'silk-calendar',
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
	
	function reloadDaerah(){
		ds_daerah.reload();
	}
	
	function fnAddDaerah(){
		var grid = grid_nya;
		wEntryDaerah(false, grid, null);	
	}
	
	function fnEditDaerah(grid, record){
		var record = ds_daerah.getAt(record);
		wEntryDaerah(true, grid, record);		
	}
	
	function fnDeleteDaerah(grid, record){
		var record = ds_daerah.getAt(record);
		var url = BASE_URL + 'daerah_controller/delete_daerah';
		var params = new Object({
						iddaerah	: record.data['iddaerah']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	function wEntryDaerah(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Daerah (Edit)':'Daerah (Entry)';
	var daerah_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.daerah',
        buttonAlign: 'left',
		labelWidth: 150, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 200, width: 500,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [
		{
            id: 'tf.frm.iddaerah', 
            fieldLabel: 'Id Daerah',
            width: 150,
			hidden: true,
        },
		{
            id: 'tf.frm.kddaerah', 
            fieldLabel: 'Kode',
            width: 150
        },
		{
            id: 'tf.frm.nmdaerah', 
            fieldLabel: 'Nama',
            width: 300
        },{
            xtype: 'combo', id: 'cb.frm.jhirarki', 
            fieldLabel: 'Jenis Hirarki',
			store: ds_jhirarki, triggerAction: 'all',
            valueField: 'idjnshirarki', displayField: 'nmjnshirarki',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 250,
			editable: false, allowBlank: false,
        },
		{
            xtype: 'combo', id: 'cb.frm.idlvldaerah', 
            fieldLabel: 'Level Daerah',
			store: ds_lvldaerah, triggerAction: 'all',
            valueField: 'idlvldaerah', displayField: 'nmlvldaerah',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 250,
			editable: false, allowBlank: false,
        },
		{
			xtype: 'compositefield',
			name: 'comp_dae_iddaerah',
			fieldLabel: 'Parent',
			id: 'comp_dae_iddaerah',
			items: [{
				xtype: 'textfield',
				id: 'tf.frm.dae_iddaerah', 
				fieldLabel: 'Parent',
				width: 220, emptyText:'Pilih...'
			},
			{
				xtype: 'button',
				iconCls: 'silk-find',
				id: 'btn_data_dae_iddaerah',
				width: 3,
				handler: function() {
					parentDaerah();
				}
			}]
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveDaerah();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wDaerah.close();
            }
        }]
    });
		
    var wDaerah = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [daerah_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setDaerahForm(isUpdate, record);
	wDaerah.show();

/**
FORM FUNCTIONS
*/	
	function setDaerahForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				Ext.Ajax.request({
					url:BASE_URL + 'daerah_controller/getNmdaerah',
					params:{
						dae_iddaerah : record.get('dae_iddaerah')
					},
					method:'POST',
					success: function(response){
						var r = Ext.decode(response.responseText);
						RH.setCompValue('tf.frm.dae_iddaerah', r);
					}
				});
				
				RH.setCompValue('tf.frm.iddaerah', record.get('iddaerah'));
				RH.setCompValue('cb.frm.jhirarki', record.get('idjnshirarki'));
				RH.setCompValue('cb.frm.idlvldaerah', record.get('idlvldaerah'));
				RH.setCompValue('tf.frm.kddaerah', record.get('kddaerah'));
				RH.setCompValue('tf.frm.nmdaerah', record.get('nmdaerah'));
				RH.setCompValue('tf.frm.dae_iddaerah', record.get('dae_iddaerah'));
				//Ext.getCmp('tf.frm.kddaerah').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveDaerah(){
		var idForm = 'frm.daerah';
		var sUrl = BASE_URL +'daerah_controller/insert_daerah';
		var sParams = new Object({
			iddaerah		:	RH.getCompValue('tf.frm.iddaerah'),
			idjnshirarki	:	RH.getCompValue('cb.frm.jhirarki'),
			dae_iddaerah	:	RH.getCompValue('tf.frm.dae_iddaerah'),
			idlvldaerah		:	RH.getCompValue('cb.frm.idlvldaerah'),
			kddaerah		:	RH.getCompValue('tf.frm.kddaerah'),
			nmdaerah		:	RH.getCompValue('tf.frm.nmdaerah'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'daerah_controller/update_daerah';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wDaerah, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}

function parentDaerah(){
	var ds_daerah_parent = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
							url: BASE_URL + 'daerah_controller/get_parent',
			method: 'POST'
		}),
		autoLoad: true,
		root: 'data',
		fields: [{
			name: 'iddaerah',
			mapping: 'iddaerah'
		},{
			name: 'nmdaerah',
			mapping: 'nmdaerah'
		}]
	});
	var cm_daerah_parent = new Ext.grid.ColumnModel([
		{
			hidden:true,
			dataIndex: 'iddaerah',
			width: 30
		},{
			header: 'Nama Daerah',
			dataIndex: 'nmdaerah',
			width: 300
		}
	]);
	var sm_daerah_parent = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	var vw_daerah_parent = new Ext.grid.GridView({
		emptyText: '< Belum ada Data >'
	});
	var paging_daerah_parent = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_daerah_parent,
		displayInfo: true,
		displayMsg: 'Data Daerah Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var cari_daerah_parent = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		position: 'top',
		mode: 'local',
		width: 200
	})];
	var grid_find_daerah_parent = new Ext.grid.GridPanel({
		ds: ds_daerah_parent,
		cm: cm_daerah_parent,
		sm: sm_daerah_parent,
		view: vw_daerah_parent,
		height: 350,
		width: 400,
		plugins: cari_daerah_parent,
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
		bbar: paging_daerah_parent,
		listeners: {
			rowdblclick: klik_daerah_parent
		}
	});
	var win_find_daerah_parent = new Ext.Window({
		title: 'Sub Daerah',
		modal: true,
		items: [grid_find_daerah_parent]
	}).show();

	function klik_daerah_parent(grid, rowIdx){
		var rec_daerah_parent = ds_daerah_parent.getAt(rowIdx);
		var var_daerah_parent = rec_daerah_parent.data["nmdaerah"];
					
		Ext.getCmp('tf.frm.dae_iddaerah').focus()
		Ext.getCmp("tf.frm.dae_iddaerah").setValue(var_daerah_parent);
					win_find_daerah_parent.close();
	}
}
}
