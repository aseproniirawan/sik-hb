function Mbagian(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_bagian = dm_bagian();
	var ds_lvlbagian = dm_lvlbagian();
	var ds_jhirarki = dm_jhirarki();
	var ds_lvldaerah = dm_lvldaerah();
	var ds_jpelayanan = dm_jpelayanan();
	var ds_bdgrawat = dm_bdgrawat();
	
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
		store: ds_bagian,
		displayInfo: true,
		displayMsg: 'Data Bagian Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_bagian',
		store: ds_bagian,		
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
				fnAddBagian();
				//Ext.getCmp('tf.frm.kdbagian').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 70,
			dataIndex: 'kdbagian',
			sortable: true
		},
		{
			header: 'Nama Bagian',
			width: 250,
			dataIndex: 'nmbagian',
			sortable: true
		},
		{
			header: 'Level Bagian',
			width: 120,
			dataIndex: 'nmlvlbagian',
			sortable: true
		},
		{
			header: 'Jenis Hirarki',
			width: 100,
			dataIndex: 'nmjnshirarki',
			sortable: true
		},
		{
			header: 'Jenis Pelayanan',
			width: 180,
			dataIndex: 'nmjnspelayanan',
			sortable: true
		},
		{
			header: 'Bidang Perawatan',
			width: 200,
			dataIndex: 'nmbdgrawat',
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
						fnEditBagian(grid, rowIndex);
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
						fnDeleteBagian(grid, rowIndex);
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
		title: 'Bagian', iconCls:'silk-user',
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
	
	function reloadBagian(){
		ds_bagian.reload();
	}
	
	function fnAddBagian(){
		var grid = grid_nya;
		wEntryBagian(false, grid, null);	
	}
	
	function fnEditBagian(grid, record){
		var record = ds_bagian.getAt(record);
		wEntryBagian(true, grid, record);		
	}
	
	function fnDeleteBagian(grid, record){
		var record = ds_bagian.getAt(record);
		var url = BASE_URL + 'bagian_controller/delete_bagian';
		var params = new Object({
						idbagian	: record.data['idbagian']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
function wEntryBagian(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Bagian (Edit)':'Bagian (Entry)';
	var bagian_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.bagian',
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
            id: 'tf.frm.idbagian', 
            hidden: true,
        },
		{
			fieldLabel: 'Kode',
			id:'tf.frm.kdbagian',
			width: 100,
			dataIndex: 'kdbagian',
			sortable: true,
			allowBlank: false
		},
		{
			fieldLabel: 'Nama Bagian',
			id:'tf.frm.nmbagian',
			width: 300,
			dataIndex: 'nmbagian',
			sortable: true,
			allowBlank: false
		},
		{
            xtype: 'combo', id: 'cb.frm.lvlbagian', 
            fieldLabel: 'Level Bagian',
			store: ds_lvlbagian, triggerAction: 'all',
            valueField: 'idlvlbagian', displayField: 'nmlvlbagian',
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
            xtype: 'combo', id: 'cb.frm.jpelayanan', 
            fieldLabel: 'Jenis Pelayanan',
			store: ds_jpelayanan, triggerAction: 'all',
            valueField: 'idjnspelayanan', displayField: 'nmjnspelayanan',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 300,
			editable: false
        },
		{
            xtype: 'combo', id: 'cb.frm.bdgrawat', 
            fieldLabel: 'Bidang Perawatan',
			store: ds_bdgrawat, triggerAction: 'all',
            valueField: 'idbdgrawat', displayField: 'nmbdgrawat',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 300,
			editable: false
        },
		{
			xtype: 'compositefield',
			name: 'comp_bag_idbagian',
			fieldLabel: 'Parent',
			id: 'comp_bag_idbagian',
			items: [{
				xtype: 'textfield',
				id: 'tf.frm.bag_idbagian', 
				fieldLabel: 'Parent',
				width: 275, emptyText:'Pilih...'
			},
			{
				xtype: 'button',
				iconCls: 'silk-find',
				id: 'btn_data_bag_idbagian',
				width: 3,
				handler: function() {
					parentBagian();
				}
			}]
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveBagian();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wBagian.close();
            }
        }]
    });
		
    var wBagian = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [bagian_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setBagianForm(isUpdate, record);
	wBagian.show();

/**
FORM FUNCTIONS
*/	
	function setBagianForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				Ext.Ajax.request({
					url:BASE_URL + 'bagian_controller/getNmbagian',
					params:{
						bag_idbagian : record.get('bag_idbagian')
					},
					method:'POST',
					success: function(response){
						var r = Ext.decode(response.responseText);
						RH.setCompValue('tf.frm.bag_idbagian', r);
					}
				});
				
				RH.setCompValue('tf.frm.idbagian', record.get('idbagian'));
				RH.setCompValue('tf.frm.kdbagian', record.get('kdbagian'));
				RH.setCompValue('tf.frm.nmbagian', record.get('nmbagian'));
				RH.setCompValue('cb.frm.lvlbagian', record.data['idlvlbagian']);	
				RH.setCompValue('cb.frm.jhirarki', record.get('idjnshirarki'));
				RH.setCompValue('cb.frm.jpelayanan', record.data['idjnspelayanan']);
				RH.setCompValue('cb.frm.bdgrawat', record.get('idbdgrawat'));
				RH.setCompValue('tf.frm.bag_idbagian', record.get('bag_idbagian'));
				//Ext.getCmp('tf.frm.kdbagian').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveBagian(){
		var idForm = 'frm.bagian';
		var sUrl = BASE_URL +'bagian_controller/insert_bagian';
		var sParams = new Object({
			idbagian		:	RH.getCompValue('tf.frm.idbagian'),
			idlvlbagian		:	RH.getCompValue('cb.frm.lvlbagian'),
			idjnshirarki	:	RH.getCompValue('cb.frm.jhirarki'),
			idjnspelayanan	:	RH.getCompValue('cb.frm.jpelayanan'),
			idbdgrawat		:	RH.getCompValue('cb.frm.bdgrawat'),
			kdbagian		:	RH.getCompValue('tf.frm.kdbagian'),
			nmbagian		:	RH.getCompValue('tf.frm.nmbagian'),
			bag_idbagian	:	RH.getCompValue('tf.frm.bag_idbagian'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'bagian_controller/update_bagian';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wBagian, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}

function parentBagian(){
	var ds_bagian_parent = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
							url: BASE_URL + 'bagian_controller/get_parent_bagian',
			method: 'POST'
		}),
		autoLoad: true,
		root: 'data',
		fields: [{
			name: 'idbagian',
			mapping: 'idbagian'
		},{
			name: 'nmbagian',
			mapping: 'nmbagian'
		}]
	});
	var cm_bagian_parent = new Ext.grid.ColumnModel([
		{
			hidden:true,
			dataIndex: 'idbagian',
			width: 30
		},{
			header: 'Nama Bagian',
			dataIndex: 'nmbagian',
			width: 300
		}
	]);
	var sm_bagian_parent = new Ext.grid.RowSelectionModel({
		singleSelect: true
	});
	var vw_bagian_parent = new Ext.grid.GridView({
		emptyText: '< Belum ada Data >'
	});
	var paging_bagian_parent = new Ext.PagingToolbar({
		pageSize: 50,
		store: ds_bagian_parent,
		displayInfo: true,
		displayMsg: 'Data Bagian Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	var cari_bagian_parent = [new Ext.ux.grid.Search({
		iconCls: 'btn_search',
		minChars: 1,
		autoFocus: true,
		position: 'top',
		mode: 'local',
		width: 200
	})];
	var grid_find_bagian_parent = new Ext.grid.GridPanel({
		ds: ds_bagian_parent,
		cm: cm_bagian_parent,
		sm: sm_bagian_parent,
		view: vw_bagian_parent,
		height: 350,
		width: 400,
		plugins: cari_bagian_parent,
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
		bbar: paging_bagian_parent,
		listeners: {
			rowdblclick: klik_bagian_parent
		}
	});
	var win_find_bagian_parent = new Ext.Window({
		title: 'Sub Bagian',
		modal: true,
		items: [grid_find_bagian_parent]
	}).show();

	function klik_bagian_parent(grid, rowIdx){
		var rec_bagian_parent = ds_bagian_parent.getAt(rowIdx);
		var var_bagian_parent = rec_bagian_parent.data["nmbagian"];
					
		Ext.getCmp('tf.frm.bag_idbagian').focus()
		Ext.getCmp("tf.frm.bag_idbagian").setValue(var_bagian_parent);
					win_find_bagian_parent.close();
	}
}
}
