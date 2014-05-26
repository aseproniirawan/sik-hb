function Mlvldaerah(){
	var pageSize = 18;
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
		store: ds_lvldaerah,
		displayInfo: true,
		displayMsg: 'Data Level Daerah Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_level_daerah',
		store: ds_lvldaerah,
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
				fnAddLvldaerah();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdlvldaerah',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmlvldaerah',
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
						fnEditLvldaerah(grid, rowIndex);
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
						fnDeleteLvldaerah(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Level Daerah',
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
	
	function reloadLvldaerah(){
		ds_lvldaerah.reload();
	}
	
	function fnAddLvldaerah(){
		var grid = grid_nya;
		wEntryLvldaerah(false, grid, null);	
	}
	
	function fnEditLvldaerah(grid, record){
		var record = ds_lvldaerah.getAt(record);
		wEntryLvldaerah(true, grid, record);		
	}
	
	function fnDeleteLvldaerah(grid, record){
		var record = ds_lvldaerah.getAt(record);
		var url = BASE_URL + 'lvldaerah_controller/delete_lvldaerah';
		var params = new Object({
						idlvldaerah	: record.data['idlvldaerah']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryLvldaerah(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Level Daerah (Edit)':'Level Daerah (Entry)';
	var lvldaerah_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.lvldaerah',
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
            id: 'tf.frm.idlvldaerah', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdlvldaerah', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmlvldaerah', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveLvldaerah();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wLvldaerah.close();
            }
        }]
    });
		
    var wLvldaerah = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [lvldaerah_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setLeveldaerahForm(isUpdate, record);
	wLvldaerah.show();

/**
FORM FUNCTIONS
*/	
	function setLeveldaerahForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idlvldaerah', record.get('idlvldaerah'));
				RH.setCompValue('tf.frm.kdlvldaerah', record.get('kdlvldaerah'));
				RH.setCompValue('tf.frm.nmlvldaerah', record.get('nmlvldaerah'));
				return;
			}
		}
	}
	
	function fnSaveLvldaerah(){
		var idForm = 'frm.lvldaerah';
		var sUrl = BASE_URL +'lvldaerah_controller/insert_lvldaerah';
		var sParams = new Object({
			idlvldaerah		:	RH.getCompValue('tf.frm.idlvldaerah'),
			kdlvldaerah		:	RH.getCompValue('tf.frm.kdlvldaerah'),
			nmlvldaerah		:	RH.getCompValue('tf.frm.nmlvldaerah'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'lvldaerah_controller/update_lvldaerah';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wLvldaerah, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}