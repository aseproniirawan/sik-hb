function Mgoldarah(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_goldarah = dm_goldarah();
	
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
		store: ds_goldarah,
		displayInfo: true,
		displayMsg: 'Data Golongan Darah Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_goldarah',
		store: ds_goldarah,
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
				fnAddGoldarah();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdgoldarah',
			sortable: true
		},
		{
			header: 'Jenis Golongan Darah',
			width: 300,
			dataIndex: 'nmgoldarah',
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
						fnEditGoldarah(grid, rowIndex);
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
						fnDeleteGoldarah(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Golongan Darah', iconCls:'silk-calendar',
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
	
	function reloadGoldarah(){
		ds_goldarah.reload();
	}
	
	function fnAddGoldarah(){
		var grid = grid_nya;
		wEntryGoldarah(false, grid, null);	
	}
	
	function fnEditGoldarah(grid, record){
		var record = ds_goldarah.getAt(record);
		wEntryGoldarah(true, grid, record);		
	}
	
	function fnDeleteGoldarah(grid, record){
		var record = ds_goldarah.getAt(record);
		var url = BASE_URL + 'goldarah_controller/delete_goldarah';
		var params = new Object({
						idgoldarah	: record.data['idgoldarah']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryGoldarah(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Golongan Darah (Edit)':'Golongan Darah (Entry)';
	var goldarah_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.goldarah',
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
            id: 'tf.frm.idgoldarah', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdgoldarah', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmgoldarah', 
            fieldLabel: 'Jenis Golongan Darah',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveGoldarah();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wGoldarah.close();
            }
        }]
    });
		
    var wGoldarah = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [goldarah_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setGoldarahForm(isUpdate, record);
	wGoldarah.show();

/**
FORM FUNCTIONS
*/	
	function setGoldarahForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idgoldarah'));
				RH.setCompValue('tf.frm.idgoldarah', record.get('idgoldarah'));
				RH.setCompValue('tf.frm.kdgoldarah', record.get('kdgoldarah'));
				RH.setCompValue('tf.frm.nmgoldarah', record.get('nmgoldarah'));
				return;
			}
		}
	}
	
	function fnSaveGoldarah(){
		var idForm = 'frm.goldarah';
		var sUrl = BASE_URL +'goldarah_controller/insert_goldarah';
		var sParams = new Object({
			idgoldarah		:	RH.getCompValue('tf.frm.idgoldarah'),
			kdgoldarah		:	RH.getCompValue('tf.frm.kdgoldarah'),
			nmgoldarah		:	RH.getCompValue('tf.frm.nmgoldarah'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'goldarah_controller/update_goldarah';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wGoldarah, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}