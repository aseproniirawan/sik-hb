function Mstkawin(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_stkawin = dm_stkawin();
	
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
		store: ds_stkawin,
		displayInfo: true,
		displayMsg: 'Data Status Perkawinan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stkawin',
		store: ds_stkawin,
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
				fnAddStkawin();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstkawin',
			sortable: true
		},
		{
			header: 'Status',
			width: 300,
			dataIndex: 'nmstkawin',
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
						fnEditStkawin(grid, rowIndex);
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
						fnDeleteStkawin(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Perkawinan', iconCls:'silk-calendar',
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
	
	function reloadStkawin(){
		ds_stkawin.reload();
	}
	
	function fnAddStkawin(){
		var grid = grid_nya;
		wEntryStkawin(false, grid, null);	
	}
	
	function fnEditStkawin(grid, record){
		var record = ds_stkawin.getAt(record);
		wEntryStkawin(true, grid, record);		
	}
	
	function fnDeleteStkawin(grid, record){
		var record = ds_stkawin.getAt(record);
		var url = BASE_URL + 'stkawin_controller/delete_stkawin';
		var params = new Object({
						idstkawin	: record.data['idstkawin']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStkawin(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Perkawinan (Edit)':'Status Perkawinan (Entry)';
	var stkawin_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stkawin',
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
            id: 'tf.frm.idstkawin', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstkawin', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstkawin', 
            fieldLabel: 'Status',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStkawin();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStkawin.close();
            }
        }]
    });
		
    var wStkawin = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stkawin_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStkawinForm(isUpdate, record);
	wStkawin.show();

/**
FORM FUNCTIONS
*/	
	function setStkawinForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstkawin'));
				RH.setCompValue('tf.frm.idstkawin', record.get('idstkawin'));
				RH.setCompValue('tf.frm.kdstkawin', record.get('kdstkawin'));
				RH.setCompValue('tf.frm.nmstkawin', record.get('nmstkawin'));
				return;
			}
		}
	}
	
	function fnSaveStkawin(){
		var idForm = 'frm.stkawin';
		var sUrl = BASE_URL +'stkawin_controller/insert_stkawin';
		var sParams = new Object({
			idstkawin		:	RH.getCompValue('tf.frm.idstkawin'),
			kdstkawin		:	RH.getCompValue('tf.frm.kdstkawin'),
			nmstkawin		:	RH.getCompValue('tf.frm.nmstkawin'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stkawin_controller/update_stkawin';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStkawin, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}