function u9_kelompoksetting(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_kelompoksetting = dm_kelompoksetting();
	
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
		store: ds_kelompoksetting,
		displayInfo: true,
		displayMsg: 'Data Kelompok Setting Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_kelompoksetting',
		store: ds_kelompoksetting,
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
				fnAddKelompokSetting();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdklpsetting',
			sortable: true
		},
		{
			header: 'Nama Kelompok',
			width: 350,
			dataIndex: 'nmklpsetting',
			sortable: true
		},
		{
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
						fnEditKelompokSetting(grid, rowIndex);
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
						fnDeleteKelompokSetting(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Kelompok Setting', iconCls:'silk-calendar',
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
	
	function reloadKelompokSetting(){
		ds_kelompoksetting.reload();
	}
	
	function fnAddKelompokSetting(){
		var grid = grid_nya;
		wEntryKelompokSetting(false, grid, null);	
	}
	
	function fnEditKelompokSetting(grid, record){
		var record = ds_kelompoksetting.getAt(record);
		wEntryKelompokSetting(true, grid, record);		
	}
	
	function fnDeleteKelompokSetting(grid, record){
		var record = ds_kelompoksetting.getAt(record);
		var url = BASE_URL + 'kelompoksetting_controller/delete_klpsetting';
		var params = new Object({
						idklpsetting	: record.data['idklpsetting']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryKelompokSetting(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Kelompok Setting (Edit)':'Kelompok Setting (Entry)';
	var kelompoksetting_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.kelompoksetting',
        buttonAlign: 'left',
		labelWidth: 120, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 200, width: 510,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [     
		{
            id: 'tf.frm.idklpsetting', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdklpsetting', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmklpsetting', 
            fieldLabel: 'Nama Kelompok',
            width: 360, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveKelompokSetting();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wKelompokSetting.close();
            }
        }]
    });
		
    var wKelompokSetting = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [kelompoksetting_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setKelompokSettingForm(isUpdate, record);
	wKelompokSetting.show();

/**
FORM FUNCTIONS
*/	
	function setKelompokSettingForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idklpsetting'));
				RH.setCompValue('tf.frm.idklpsetting', record.get('idklpsetting'));
				RH.setCompValue('tf.frm.kdklpsetting', record.get('kdklpsetting'));
				RH.setCompValue('tf.frm.nmklpsetting', record.get('nmklpsetting'));
				return;
			}
		}
	}
	
	function fnSaveKelompokSetting(){
		var idForm = 'frm.kelompoksetting';
		var sUrl = BASE_URL +'kelompoksetting_controller/insert_klpsetting';
		var sParams = new Object({
			idklpsetting		:	RH.getCompValue('tf.frm.idklpsetting'),
			kdklpsetting		:	RH.getCompValue('tf.frm.kdklpsetting'),
			nmklpsetting		:	RH.getCompValue('tf.frm.nmklpsetting')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'kelompoksetting_controller/update_klpsetting';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wKelompokSetting, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}