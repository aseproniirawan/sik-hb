function Mjampraktek(){
	var pageSize = 18;
	var ds_jampraktek = dm_jampraktek();
	
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
		store: ds_jampraktek,
		displayInfo: true,
		displayMsg: 'Data Jam Praktek Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jampraktek',
		store: ds_jampraktek,
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
				fnAddJampraktek();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjampraktek',
			sortable: true
		},
		{
			header: 'Jam Praktek',
			width: 300,
			dataIndex: 'nmjampraktek',
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
						fnEditJampraktek(grid, rowIndex);
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
						fnDeleteJampraktek(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jam Praktek', iconCls:'silk-calendar',
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
	
	function reloadJampraktek(){
		ds_jampraktek.reload();
	}
	
	function fnAddJampraktek(){
		var grid = grid_nya;
		wEntryJampraktek(false, grid, null);	
	}
	
	function fnEditJampraktek(grid, record){
		var record = ds_jampraktek.getAt(record);
		wEntryJampraktek(true, grid, record);		
	}
	
	function fnDeleteJampraktek(grid, record){
		var record = ds_jampraktek.getAt(record);
		var url = BASE_URL + 'jampraktek_controller/delete_jampraktek';
		var params = new Object({
						idjampraktek	: record.data['idjampraktek']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJampraktek(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jam Praktek (Edit)':'Jam Praktek (Entry)';
	var jampraktek_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jampraktek',
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
            id: 'tf.frm.idjampraktek', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjampraktek', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjampraktek', 
            fieldLabel: 'Jam Praktek',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJampraktek();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJampraktek.close();
            }
        }]
    });
		
    var wJampraktek = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jampraktek_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJampraktekForm(isUpdate, record);
	wJampraktek.show();

/**
FORM FUNCTIONS
*/	
	function setJampraktekForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjampraktek'));
				RH.setCompValue('tf.frm.idjampraktek', record.get('idjampraktek'));
				RH.setCompValue('tf.frm.kdjampraktek', record.get('kdjampraktek'));
				RH.setCompValue('tf.frm.nmjampraktek', record.get('nmjampraktek'));
				return;
			}
		}
	}
	
	function fnSaveJampraktek(){
		var idForm = 'frm.jampraktek';
		var sUrl = BASE_URL +'jampraktek_controller/insert_jampraktek';
		var sParams = new Object({
			idjampraktek		:	RH.getCompValue('tf.frm.idjampraktek'),
			kdjampraktek		:	RH.getCompValue('tf.frm.kdjampraktek'),
			nmjampraktek		:	RH.getCompValue('tf.frm.nmjampraktek'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jampraktek_controller/update_jampraktek';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJampraktek, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}