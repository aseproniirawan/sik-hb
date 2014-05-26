function Mlvlbagian(){
	var pageSize = 18;
	var ds_lvlbagian = dm_lvlbagian();
	
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
		store: ds_lvlbagian,
		displayInfo: true,
		displayMsg: 'Data Level Bagian Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_level_bagian',
		store: ds_lvlbagian,
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
				fnAddlvlbagian();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdlvlbagian',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmlvlbagian',
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
						fnEditLvlbagian(grid, rowIndex);
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
						fnDeleteLvlbagian(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Level Bagian',
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
	
	function reloadLvlbagian(){
		ds_lvlbagian.reload();
	}
	
	function fnAddlvlbagian(){
		var grid = grid_nya;
		wEntryLvlbagian(false, grid, null);	
	}
	
	function fnEditLvlbagian(grid, record){
		var record = ds_lvlbagian.getAt(record);
		wEntryLvlbagian(true, grid, record);		
	}
	
	function fnDeleteLvlbagian(grid, record){
		var record = ds_lvlbagian.getAt(record);
		var url = BASE_URL + 'lvlbagian_controller/delete_lvlbagian';
		var params = new Object({
						idlvlbagian	: record.data['idlvlbagian']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryLvlbagian(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Level Bagian (Edit)':'Level Bagian (Entry)';
	var lvlbagian_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.lvlbagian',
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
            id: 'tf.frm.idlvlbagian', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdlvlbagian', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmlvlbagian', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveLvlbagian();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wLvlbagian.close();
            }
        }]
    });
		
    var wLvlbagian = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [lvlbagian_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setLevelbagianForm(isUpdate, record);
	wLvlbagian.show();

/**
FORM FUNCTIONS
*/	
	function setLevelbagianForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idlvlbagian', record.get('idlvlbagian'));
				RH.setCompValue('tf.frm.kdlvlbagian', record.get('kdlvlbagian'));
				RH.setCompValue('tf.frm.nmlvlbagian', record.get('nmlvlbagian'));
				return;
			}
		}
	}
	
	function fnSaveLvlbagian(){
		var idForm = 'frm.lvlbagian';
		var sUrl = BASE_URL +'lvlbagian_controller/insert_lvlbagian';
		var sParams = new Object({
			idlvlbagian		:	RH.getCompValue('tf.frm.idlvlbagian'),
			kdlvlbagian		:	RH.getCompValue('tf.frm.kdlvlbagian'),
			nmlvlbagian		:	RH.getCompValue('tf.frm.nmlvlbagian'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'lvlbagian_controller/update_lvlbagian';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wLvlbagian, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}