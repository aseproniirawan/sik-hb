function Maturanpakai(){
	var pageSize = 18;
	var ds_aturanpakai = dm_aturanpakai();
	
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
		store: ds_aturanpakai,
		displayInfo: true,
		displayMsg: 'Data Aturan Pakai Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_aturanpakai',
		store: ds_aturanpakai,
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
				fnAddAturanpakai();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdaturanpakai',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmaturanpakai',
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
						fnEditAturanpakai(grid, rowIndex);
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
						fnDeleteAturanpakai(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Aturan Pakai', iconCls:'silk-calendar',
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
	
	function reloadAturanpakai(){
		ds_aturanpakai.reload();
	}
	
	function fnAddAturanpakai(){
		var grid = grid_nya;
		wEntryAturanpakai(false, grid, null);	
	}
	
	function fnEditAturanpakai(grid, record){
		var record = ds_aturanpakai.getAt(record);
		wEntryAturanpakai(true, grid, record);		
	}
	
	function fnDeleteAturanpakai(grid, record){
		var record = ds_aturanpakai.getAt(record);
		var url = BASE_URL + 'aturanpakai_controller/delete_aturanpakai';
		var params = new Object({
						idaturanpakai	: record.data['idaturanpakai']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryAturanpakai(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Aturan Pakai (Edit)':'Aturan Pakai (Entry)';
	var aturanpakai_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.aturanpakai',
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
            id: 'tf.frm.idaturanpakai', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdaturanpakai', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmaturanpakai', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveAturanpakai();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wAturanpakai.close();
            }
        }]
    });
		
    var wAturanpakai = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [aturanpakai_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setAturanpakaiForm(isUpdate, record);
	wAturanpakai.show();

/**
FORM FUNCTIONS
*/	
	function setAturanpakaiForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idaturanpakai'));
				RH.setCompValue('tf.frm.idaturanpakai', record.get('idaturanpakai'));
				RH.setCompValue('tf.frm.kdaturanpakai', record.get('kdaturanpakai'));
				RH.setCompValue('tf.frm.nmaturanpakai', record.get('nmaturanpakai'));
				return;
			}
		}
	}
	
	function fnSaveAturanpakai(){
		var idForm = 'frm.aturanpakai';
		var sUrl = BASE_URL +'aturanpakai_controller/insert_aturanpakai';
		var sParams = new Object({
			idaturanpakai		:	RH.getCompValue('tf.frm.idaturanpakai'),
			kdaturanpakai		:	RH.getCompValue('tf.frm.kdaturanpakai'),
			nmaturanpakai		:	RH.getCompValue('tf.frm.nmaturanpakai'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'aturanpakai_controller/update_aturanpakai';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wAturanpakai, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}