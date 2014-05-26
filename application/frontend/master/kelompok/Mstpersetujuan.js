function Mstpersetujuan(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_stsetuju = dm_stsetuju();
	
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
		store: ds_stsetuju,
		displayInfo: true,
		displayMsg: 'Data Status Persetujuan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stsetuju',
		store: ds_stsetuju,
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
				fnAddStsetuju();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstsetuju',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmstsetuju',
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
						fnEditStsetuju(grid, rowIndex);
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
						fnDeleteStsetuju(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Persetujuan', iconCls:'silk-calendar',
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
	
	function reloadStsetuju(){
		ds_stsetuju.reload();
	}
	
	function fnAddStsetuju(){
		var grid = grid_nya;
		wEntryStsetuju(false, grid, null);	
	}
	
	function fnEditStsetuju(grid, record){
		var record = ds_stsetuju.getAt(record);
		wEntryStsetuju(true, grid, record);		
	}
	
	function fnDeleteStsetuju(grid, record){
		var record = ds_stsetuju.getAt(record);
		var url = BASE_URL + 'stpersetujuan_controller/delete_stpersetujuan';
		var params = new Object({
						idstsetuju	: record.data['idstsetuju']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStsetuju(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Persetujuan (Edit)':'Status Persetujuan (Entry)';
	var stsetuju_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stsetuju',
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
            id: 'tf.frm.idstsetuju', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstsetuju', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstsetuju', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStsetuju();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStsetuju.close();
            }
        }]
    });
		
    var wStsetuju = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stsetuju_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStsetujuForm(isUpdate, record);
	wStsetuju.show();

/**
FORM FUNCTIONS
*/	
	function setStsetujuForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstsetuju'));
				RH.setCompValue('tf.frm.idstsetuju', record.get('idstsetuju'));
				RH.setCompValue('tf.frm.kdstsetuju', record.get('kdstsetuju'));
				RH.setCompValue('tf.frm.nmstsetuju', record.get('nmstsetuju'));
				return;
			}
		}
	}
	
	function fnSaveStsetuju(){
		var idForm = 'frm.stsetuju';
		var sUrl = BASE_URL +'stpersetujuan_controller/insert_stpersetujuan';
		var sParams = new Object({
			idstsetuju		:	RH.getCompValue('tf.frm.idstsetuju'),
			kdstsetuju		:	RH.getCompValue('tf.frm.kdstsetuju'),
			nmstsetuju		:	RH.getCompValue('tf.frm.nmstsetuju')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stpersetujuan_controller/update_stpersetujuan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStsetuju, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}