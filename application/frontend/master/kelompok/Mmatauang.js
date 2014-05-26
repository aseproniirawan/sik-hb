function Mmatauang(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_matauang = dm_matauang();
	
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
		store: ds_matauang,
		displayInfo: true,
		displayMsg: 'Data Mata Uang Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_matauang',
		store: ds_matauang,
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
				fnAddMatauang();
				//Ext.getCmp('tf.frm.kdmatauang').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdmatauang',
			sortable: true
		},
		{
			header: 'Nama Mata Uang',
			width: 300,
			dataIndex: 'nmmatauang',
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
						fnEditMatauang(grid, rowIndex);
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
						fnDeleteMatauang(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Mata Uang', iconCls:'silk-calendar',
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
	
	function reloadMatauang(){
		ds_matauang.reload();
	}
	
	function fnAddMatauang(){
		var grid = grid_nya;
		wEntryMatauang(false, grid, null);	
	}
	
	function fnEditMatauang(grid, record){
		var record = ds_matauang.getAt(record);
		wEntryMatauang(true, grid, record);		
	}
	
	function fnDeleteMatauang(grid, record){
		var record = ds_matauang.getAt(record);
		var url = BASE_URL + 'matauang_controller/delete_matauang';
		var params = new Object({
						idmatauang	: record.data['idmatauang']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryMatauang(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Mata Uang (Edit)':'Mata Uang (Entry)';
	var matauang_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.matauang',
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
            id: 'tf.frm.idmatauang', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdmatauang', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmmatauang', 
            fieldLabel: 'Nama Mata Uang',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveMatauang();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wMatauang.close();
            }
        }]
    });
		
    var wMatauang = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [matauang_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setMatauangForm(isUpdate, record);
	wMatauang.show();

/**
FORM FUNCTIONS
*/	
	function setMatauangForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idmatauang'));
				RH.setCompValue('tf.frm.idmatauang', record.get('idmatauang'));
				RH.setCompValue('tf.frm.kdmatauang', record.get('kdmatauang'));
				RH.setCompValue('tf.frm.nmmatauang', record.get('nmmatauang'));
				//Ext.getCmp('tf.frm.kdmatauang').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveMatauang(){
		var idForm = 'frm.matauang';
		var sUrl = BASE_URL +'matauang_controller/insert_matauang';
		var sParams = new Object({
			idmatauang		:	RH.getCompValue('tf.frm.idmatauang'),
			kdmatauang		:	RH.getCompValue('tf.frm.kdmatauang'),
			nmmatauang		:	RH.getCompValue('tf.frm.nmmatauang'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'matauang_controller/update_matauang';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wMatauang, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}