function Mcarabayar(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 20;
	var ds_carabayar = dm_carabayar();
	
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
		store: ds_carabayar,
		displayInfo: true,
		displayMsg: 'Data Cara Bayar Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_carabayar',
		store: ds_carabayar,
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
				fnAddCarabayar();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdcarabayar',
			sortable: true
		},
		{
			header: 'Cara Bayar',
			width: 300,
			dataIndex: 'nmcarabayar',
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
						fnEditCarabayar(grid, rowIndex);
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
						fnDeleteCarabayar(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Cara Bayar', iconCls:'silk-calendar',
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
	
	function reloadCarabayar(){
		ds_carabayar.reload();
	}
	
	function fnAddCarabayar(){
		var grid = grid_nya;
		wEntryCarabayar(false, grid, null);	
	}
	
	function fnEditCarabayar(grid, record){
		var record = ds_carabayar.getAt(record);
		wEntryCarabayar(true, grid, record);		
	}
	
	function fnDeleteCarabayar(grid, record){
		var record = ds_carabayar.getAt(record);
		var url = BASE_URL + 'carabayar_controller/delete_carabayar';
		var params = new Object({
						idcarabayar	: record.data['idcarabayar']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryCarabayar(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Cara Bayar (Edit)':'Cara Bayar (Entry)';
	var carabayar_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.carabayar',
        buttonAlign: 'left',
		labelWidth: 120, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 200, width: 500,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [     
		{
            id: 'tf.frm.idcarabayar', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdcarabayar', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmcarabayar', 
            fieldLabel: 'Cara Bayar',
            width: 300,       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveCarabayar();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wCarabayar.close();
            }
        }]
    });
		
    var wCarabayar = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [carabayar_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setCarabayarForm(isUpdate, record);
	wCarabayar.show();

/**
FORM FUNCTIONS
*/	
	function setCarabayarForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idcarabayar'));
				RH.setCompValue('tf.frm.idcarabayar', record.get('idcarabayar'));
				RH.setCompValue('tf.frm.kdcarabayar', record.get('kdcarabayar'));
				RH.setCompValue('tf.frm.nmcarabayar', record.get('nmcarabayar'));
				return;
			}
		}
	}
	
	function fnSaveCarabayar(){
		var idForm = 'frm.carabayar';
		var sUrl = BASE_URL +'carabayar_controller/insert_carabayar';
		var sParams = new Object({
			idcarabayar		:	RH.getCompValue('tf.frm.idcarabayar'),
			kdcarabayar		:	RH.getCompValue('tf.frm.kdcarabayar'),
			nmcarabayar		:	RH.getCompValue('tf.frm.nmcarabayar'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'carabayar_controller/update_carabayar';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wCarabayar, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}