function Mstperpembelian(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_stperpembelian = dm_stperpembelian();
	
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
		store: ds_stperpembelian,
		displayInfo: true,
		displayMsg: 'Data Status Permintaan Pembelian Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stperpembelian',
		store: ds_stperpembelian,
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
				fnAddStperpembelian();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstpp',
			sortable: true
		},
		{
			header: 'Status',
			width: 300,
			dataIndex: 'nmstpp',
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
						fnEditStperpembelian(grid, rowIndex);
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
						fnDeleteStperpembelian(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Permintaan Pembelian', iconCls:'silk-calendar',
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
	
	function reloadStperpembelian(){
		ds_stperpembelian.reload();
	}
	
	function fnAddStperpembelian(){
		var grid = grid_nya;
		wEntryStperpembelian(false, grid, null);	
	}
	
	function fnEditStperpembelian(grid, record){
		var record = ds_stperpembelian.getAt(record);
		wEntryStperpembelian(true, grid, record);		
	}
	
	function fnDeleteStperpembelian(grid, record){
		var record = ds_stperpembelian.getAt(record);
		var url = BASE_URL + 'stperpembelian_controller/delete_stperpembelian';
		var params = new Object({
						idstpp	: record.data['idstpp']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStperpembelian(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Permintaan Pembelian (Edit)':'Status Permintaan Pembelian (Entry)';
	var stperpembelian_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stperpembelian',
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
            id: 'tf.frm.idstpp', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstpp', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstpp', 
            fieldLabel: 'Status',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStperpembelian();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStperpembelian.close();
            }
        }]
    });
		
    var wStperpembelian = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stperpembelian_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStperpembelianForm(isUpdate, record);
	wStperpembelian.show();

/**
FORM FUNCTIONS
*/	
	function setStperpembelianForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstpp'));
				RH.setCompValue('tf.frm.idstpp', record.get('idstpp'));
				RH.setCompValue('tf.frm.kdstpp', record.get('kdstpp'));
				RH.setCompValue('tf.frm.nmstpp', record.get('nmstpp'));
				return;
			}
		}
	}
	
	function fnSaveStperpembelian(){
		var idForm = 'frm.stperpembelian';
		var sUrl = BASE_URL +'stperpembelian_controller/insert_stperpembelian';
		var sParams = new Object({
			idstpp		:	RH.getCompValue('tf.frm.idstpp'),
			kdstpp		:	RH.getCompValue('tf.frm.kdstpp'),
			nmstpp		:	RH.getCompValue('tf.frm.nmstpp')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stperpembelian_controller/update_stperpembelian';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStperpembelian, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}