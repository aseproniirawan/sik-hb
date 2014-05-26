function Mbulan(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 20;
	var ds_bulan = dm_bulan();
	
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
		store: ds_bulan,
		displayInfo: true,
		displayMsg: 'Data Bulan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_bulan',
		store: ds_bulan,
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
				fnAddBulan();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode Bulan',
			width: 200,
			dataIndex: 'kdbulan',
			sortable: true 
		},{
			header: 'Bulan',
			width: 200,
			dataIndex: 'nmbulan',
			sortable: true 
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
						fnDeleteBulan(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Bulan', iconCls:'silk-calendar',
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
	
	function reloadBulan(){
		ds_bulan.reload();
	}
	
	function fnAddBulan(){
		var grid = grid_nya;
		wEntryBulan(false, grid, null);	
	}
	
	function fnEditBulan(grid, record){
		var record = ds_bulan.getAt(record);
		wEntryBulan(true, grid, record);		
	}
	
	function fnDeleteBulan(grid, record){
		var record = ds_bulan.getAt(record);
		var url = BASE_URL + 'bulan_controller/delete_bulan';
		var params = new Object({
						bulan	: record.data['bulan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryBulan(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Bulan (Edit)':'Bulan (Entry)';
	var bulan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.bulan',
        buttonAlign: 'left',
		labelWidth: 100, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 150, width: 350,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [    
		{
			id: 'tf.frm.kdbulan',
        	fieldLabel: 'Kode Bulan',
        	width: 150, allowBlank: false
            
        },{
        	id: 'tf.frm.bulan', 
            fieldLabel: 'bulan',
            width: 150, allowBlank: false
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveBulan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wBulan.close();
            }
        }]
    });
		
    var wBulan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [bulan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setBulanForm(isUpdate, record);
	wBulan.show();

/**
FORM FUNCTIONS
*/	
	function setBulanForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				return;
			}
		}
	}
	
	function fnSaveBulan(){
		var idForm = 'frm.bulan';
		var sUrl = BASE_URL +'bulan_controller/insert_bulan';
		var sParams = new Object({
			bulan		:	RH.getCompValue('tf.frm.bulan')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'bulan_controller/update_bulan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wBulan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}