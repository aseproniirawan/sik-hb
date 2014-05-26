function Mcarakeluar(){
	var pageSize = 18;
	var ds_carakeluar = dm_carakeluar();
	
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
		store: ds_carakeluar,
		displayInfo: true,
		displayMsg: 'Data Cara Keluar Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_carakeluar',
		store: ds_carakeluar,
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
				fnAddCarakeluar();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdcarakeluar',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmcarakeluar',
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
						fnEditCarakeluar(grid, rowIndex);
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
						fnDeleteCarakeluar(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Cara Keluar', iconCls:'silk-calendar',
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
	
	function reloadCarakeluar(){
		ds_carakeluar.reload();
	}
	
	function fnAddCarakeluar(){
		var grid = grid_nya;
		wEntryCarakeluar(false, grid, null);	
	}
	
	function fnEditCarakeluar(grid, record){
		var record = ds_carakeluar.getAt(record);
		wEntryCarakeluar(true, grid, record);		
	}
	
	function fnDeleteCarakeluar(grid, record){
		var record = ds_carakeluar.getAt(record);
		var url = BASE_URL + 'jcarakeluar_controller/delete_carakeluar';
		var params = new Object({
						idcarakeluar	: record.data['idcarakeluar']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryCarakeluar(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Cara Keluar (Edit)':'Cara Keluar (Entry)';
	var carakeluar_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.carakeluar',
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
            id: 'tf.frm.idcarakeluar', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdcarakeluar', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmcarakeluar', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveCarakeluar();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wCarakeluar.close();
            }
        }]
    });
		
    var wCarakeluar = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [carakeluar_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setCarakeluarForm(isUpdate, record);
	wCarakeluar.show();

/**
FORM FUNCTIONS
*/	
	function setCarakeluarForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				RH.setCompValue('tf.frm.idcarakeluar', record.get('idcarakeluar'));
				RH.setCompValue('tf.frm.kdcarakeluar', record.get('kdcarakeluar'));
				RH.setCompValue('tf.frm.nmcarakeluar', record.get('nmcarakeluar'));
				return;
			}
		}
	}
	
	function fnSaveCarakeluar(){
		var idForm = 'frm.carakeluar';
		var sUrl = BASE_URL +'jcarakeluar_controller/insert_carakeluar';
		var sParams = new Object({
			idcarakeluar		:	RH.getCompValue('tf.frm.idcarakeluar'),
			kdcarakeluar		:	RH.getCompValue('tf.frm.kdcarakeluar'),
			nmcarakeluar		:	RH.getCompValue('tf.frm.nmcarakeluar'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jcarakeluar_controller/update_carakeluar';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wCarakeluar, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}