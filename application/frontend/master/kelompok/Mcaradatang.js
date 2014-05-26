function Mcaradatang(){
	var pageSize = 18;
	var ds_caradatang = dm_caradatang();
	
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
		store: ds_caradatang,
		displayInfo: true,
		displayMsg: 'Data Cara Datang Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_caradatang',
		store: ds_caradatang,
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
				fnAddCaradatang();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdcaradatang',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmcaradatang',
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
						fnEditCaradatang(grid, rowIndex);
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
						fnDeleteCaradatang(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Cara Datang', iconCls:'silk-calendar',
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
	
	function reloadCaradatang(){
		ds_caradatang.reload();
	}
	
	function fnAddCaradatang(){
		var grid = grid_nya;
		wEntryCaradatang(false, grid, null);	
	}
	
	function fnEditCaradatang(grid, record){
		var record = ds_caradatang.getAt(record);
		wEntryCaradatang(true, grid, record);		
	}
	
	function fnDeleteCaradatang(grid, record){
		var record = ds_caradatang.getAt(record);
		var url = BASE_URL + 'caradatang_controller/delete_caradatang';
		var params = new Object({
						idcaradatang	: record.data['idcaradatang']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryCaradatang(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Cara Datang (Edit)':'Cara Datang (Entry)';
	var caradatang_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.caradatang',
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
            id: 'tf.frm.idcaradatang', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdcaradatang', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmcaradatang', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveCaradatang();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wCaradatang.close();
            }
        }]
    });
		
    var wCaradatang = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [caradatang_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setCaradatangForm(isUpdate, record);
	wCaradatang.show();

/**
FORM FUNCTIONS
*/	
	function setCaradatangForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idcaradatang'));
				RH.setCompValue('tf.frm.idcaradatang', record.get('idcaradatang'));
				RH.setCompValue('tf.frm.kdcaradatang', record.get('kdcaradatang'));
				RH.setCompValue('tf.frm.nmcaradatang', record.get('nmcaradatang'));
				return;
			}
		}
	}
	
	function fnSaveCaradatang(){
		var idForm = 'frm.caradatang';
		var sUrl = BASE_URL +'caradatang_controller/insert_caradatang';
		var sParams = new Object({
			idcaradatang		:	RH.getCompValue('tf.frm.idcaradatang'),
			kdcaradatang		:	RH.getCompValue('tf.frm.kdcaradatang'),
			nmcaradatang		:	RH.getCompValue('tf.frm.nmcaradatang'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'caradatang_controller/update_caradatang';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wCaradatang, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}