function Mstpublish(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 20;
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
		store: ds_stpublish,
		displayInfo: true,
		displayMsg: 'Data Status Publish Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stpublish',
		store: ds_stpublish,
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
				fnAddStpublish();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstpublish',
			sortable: true
		},
		{
			header: 'Status',
			width: 150,
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
						fnEditStpublish(grid, rowIndex);
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
						fnDeleteStpublish(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Publish', iconCls:'silk-calendar',
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
	
	function reloadStpublish(){
		ds_stpublish.reload();
	}
	
	function fnAddStpublish(){
		var grid = grid_nya;
		wEntryStpublish(false, grid, null);	
	}
	
	function fnEditStpublish(grid, record){
		var record = ds_stpublish.getAt(record);
		wEntryStpublish(true, grid, record);		
	}
	
	function fnDeleteStpublish(grid, record){
		var record = ds_stpublish.getAt(record);
		var url = BASE_URL + 'stpublish_controller/delete_stpublish';
		var params = new Object({
						idstpublish	: record.data['idstpublish']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStpublish(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Publish (Edit)':'Status Publish (Entry)';
	var stpublish_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stpublish',
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
            id: 'tf.frm.idstpublish', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstpublish', 
            fieldLabel: 'Kode',
            width: 150
        },
		{
            id: 'tf.frm.nmstpublish', 
            fieldLabel: 'Status',
            width: 300       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStpublish();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStpublish.close();
            }
        }]
    });
		
    var wStpublish = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stpublish_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStpublishForm(isUpdate, record);
	wStpublish.show();

/**
FORM FUNCTIONS
*/	
	function setStpublishForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idStpublish'));
				RH.setCompValue('tf.frm.idstpublish', record.get('idstpublish'));
				RH.setCompValue('tf.frm.kdstpublish', record.get('kdstpublish'));
				RH.setCompValue('tf.frm.nmstpublish', record.get('nmstpublish'));
				return;
			}
		}
	}
	
	function fnSaveStpublish(){
		var idForm = 'frm.stpublish';
		var sUrl = BASE_URL +'stpublish_controller/insert_stpublish';
		var sParams = new Object({
			idstpublish		:	RH.getCompValue('tf.frm.idstpublish'),
			kdstpublish		:	RH.getCompValue('tf.frm.kdstpublish'),
			nmstpublish		:	RH.getCompValue('tf.frm.nmstpublish')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stpublish_controller/update_stpublish';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStpublish, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}