function Mdosis(){
	var pageSize = 18;
	var ds_dosis = dm_dosis();
	
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
		store: ds_dosis,
		displayInfo: true,
		displayMsg: 'Data Dosis {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_dosis',
		store: ds_dosis,
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
				fnAddDosis();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kddosis',
			sortable: true
		},
		{
			header: 'Nama Dosis',
			width: 300,
			dataIndex: 'nmdosis',
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
						fnEditDosis(grid, rowIndex);
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
						fnDeleteDosis(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Dosis', iconCls:'silk-calendar',
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
	
	function reloadDosis(){
		ds_dosis.reload();
	}
	
	function fnAddDosis(){
		var grid = grid_nya;
		wEntryDosis(false, grid, null);	
	}
	
	function fnEditDosis(grid, record){
		var record = ds_dosis.getAt(record);
		wEntryDosis(true, grid, record);		
	}
	
	function fnDeleteDosis(grid, record){
		var record = ds_dosis.getAt(record);
		var url = BASE_URL + 'dosis_controller/delete_dosis';
		var params = new Object({
						iddosis	: record.data['iddosis']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryDosis(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Dosis (Edit)':'Dosis (Entry)';
	var dosis_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.dosis',
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
            id: 'tf.frm.iddosis', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kddosis', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmdosis', 
            fieldLabel: 'Nama Dosis',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveDosis();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wDosis.close();
            }
        }]
    });
		
    var wDosis = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [dosis_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setDosisForm(isUpdate, record);
	wDosis.show();

/**
FORM FUNCTIONS
*/	
	function setDosisForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('iddosis'));
				RH.setCompValue('tf.frm.iddosis', record.get('iddosis'));
				RH.setCompValue('tf.frm.kddosis', record.get('kddosis'));
				RH.setCompValue('tf.frm.nmdosis', record.get('nmdosis'));
				return;
			}
		}
	}
	
	function fnSaveDosis(){
		var idForm = 'frm.dosis';
		var sUrl = BASE_URL +'dosis_controller/insert_dosis';
		var sParams = new Object({
			iddosis		:	RH.getCompValue('tf.frm.iddosis'),
			kddosis		:	RH.getCompValue('tf.frm.kddosis'),
			nmdosis		:	RH.getCompValue('tf.frm.nmdosis'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'dosis_controller/update_dosis';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wDosis, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}