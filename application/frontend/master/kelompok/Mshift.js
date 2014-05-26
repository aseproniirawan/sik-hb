function Mshift(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_shift = dm_shift();
	
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
		store: ds_shift,
		displayInfo: true,
		displayMsg: 'Data Shift Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_shift',
		store: ds_shift,
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
				fnAddShift();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdshift',
			sortable: true
		},
		{
			header: 'Nama',
			width: 150,
			dataIndex: 'nmshift',
			sortable: true
		},
		{
			header: 'Dari Jam',
			width: 80,
			dataIndex: 'darijam',
			sortable: true
		},
		{
			header: 'Sampai Jam',
			width: 80,
			dataIndex: 'sampaijam',
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
						fnEditShift(grid, rowIndex);
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
						fnDeleteShift(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Shift', iconCls:'silk-calendar',
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
	
	function reloadShift(){
		ds_shift.reload();
	}
	
	function fnAddShift(){
		var grid = grid_nya;
		wEntryShift(false, grid, null);	
	}
	
	function fnEditShift(grid, record){
		var record = ds_shift.getAt(record);
		wEntryShift(true, grid, record);		
	}
	
	function fnDeleteShift(grid, record){
		var record = ds_shift.getAt(record);
		var url = BASE_URL + 'shift_controller/delete_shift';
		var params = new Object({
						idshift	: record.data['idshift']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryShift(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Shift (Edit)':'Shift (Entry)';
	var shift_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.shift',
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
            id: 'tf.frm.idshift', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdshift', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmshift', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        },{
			xtype: 'timefield',
            id: 'tf.frm.darijam', 
            fieldLabel: 'Dari Jam',
			minValue: '06:00',
			maxValue: '23:00',
			format: 'H:i:s',
			increment: 10,
            width: 150, allowBlank: false,
        },{
			xtype: 'timefield',
            id: 'tf.frm.sampaijam', 
            fieldLabel: 'Sampai Jam',
			minValue: '06:00',
			maxValue: '23:00',
			format: 'H:i:s',
			increment: 10,
            width: 150, allowBlank: false,
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveShift();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wShift.close();
            }
        }]
    });
		
    var wShift = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [shift_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setShiftForm(isUpdate, record);
	wShift.show();

/**
FORM FUNCTIONS
*/	
	function setShiftForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idshift'));
				RH.setCompValue('tf.frm.idshift', record.get('idshift'));
				RH.setCompValue('tf.frm.kdshift', record.get('kdshift'));
				RH.setCompValue('tf.frm.nmshift', record.get('nmshift'));
				RH.setCompValue('tf.frm.darijam', record.get('darijam'));
				RH.setCompValue('tf.frm.sampaijam', record.get('sampaijam'));
				return;
			}
		}
	}
	
	function fnSaveShift(){
		var idForm = 'frm.shift';
		var sUrl = BASE_URL +'shift_controller/insert_shift';
		var sParams = new Object({
			idshift		:	RH.getCompValue('tf.frm.idshift'),
			kdshift		:	RH.getCompValue('tf.frm.kdshift'),
			nmshift		:	RH.getCompValue('tf.frm.nmshift'),
			darijam		:	RH.getCompValue('tf.frm.darijam'),
			sampaijam		:	RH.getCompValue('tf.frm.sampaijam'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'shift_controller/update_shift';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wShift, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}