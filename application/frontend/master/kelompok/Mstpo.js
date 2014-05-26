function Mstpo(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_stpo = dm_stpo();
	
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
		store: ds_stpo,
		displayInfo: true,
		displayMsg: 'Data Status PO Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stpo',
		store: ds_stpo,
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
				fnAddStpo();
				//Ext.getCmp('tf.frm.kdstpo').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstpo',
			sortable: true
		},
		{
			header: 'Status',
			width: 200,
			dataIndex: 'nmstpo',
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
						fnEditStpo(grid, rowIndex);
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
						fnDeleteStpo(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status PO', iconCls:'silk-calendar',
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
	
	function reloadStpo(){
		ds_stpo.reload();
	}
	
	function fnAddStpo(){
		var grid = grid_nya;
		wEntryStpo(false, grid, null);	
	}
	
	function fnEditStpo(grid, record){
		var record = ds_stpo.getAt(record);
		wEntryStpo(true, grid, record);		
	}
	
	function fnDeleteStpo(grid, record){
		var record = ds_stpo.getAt(record);
		var url = BASE_URL + 'stpo_controller/delete_stpo';
		var params = new Object({
						idstpo	: record.data['idstpo']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStpo(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status PO (Edit)':'Status PO (Entry)';
	var stpo_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stpo',
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
            id: 'tf.frm.idstpo', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdstpo', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmstpo', 
            fieldLabel: 'Status',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStpo();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStpo.close();
            }
        }]
    });
		
    var wStpo = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stpo_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStpoForm(isUpdate, record);
	wStpo.show();

/**
FORM FUNCTIONS
*/	
	function setStpoForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstpo'));
				RH.setCompValue('tf.frm.idstpo', record.get('idstpo'));
				RH.setCompValue('tf.frm.kdstpo', record.get('kdstpo'));
				RH.setCompValue('tf.frm.nmstpo', record.get('nmstpo'));
				//Ext.getCmp('tf.frm.kdstpo').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveStpo(){
		var idForm = 'frm.stpo';
		var sUrl = BASE_URL +'stpo_controller/insert_stpo';
		var sParams = new Object({
			idstpo		:	RH.getCompValue('tf.frm.idstpo'),
			kdstpo		:	RH.getCompValue('tf.frm.kdstpo'),
			nmstpo		:	RH.getCompValue('tf.frm.nmstpo'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stpo_controller/update_stpo';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStpo, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}