function Mstsdokter(){
	var pageSize = 18;
	var ds_stdokter = dm_stdokter();
	
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
		store: ds_stdokter,
		displayInfo: true,
		displayMsg: 'Data Status Dokter Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_status_dokter',
		store: ds_stdokter,
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
				fnAddstdokter();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstdokter',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmstdokter',
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
						fnEditStdokter(grid, rowIndex);
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
						fnDeleteStdokter(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Dokter',
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
	
	function reloadStdokter(){
		ds_stdokter.reload();
	}
	
	function fnAddstdokter(){
		var grid = grid_nya;
		wEntryStdokter(false, grid, null);	
	}
	
	function fnEditStdokter(grid, record){
		var record = ds_stdokter.getAt(record);
		wEntryStdokter(true, grid, record);		
	}
	
	function fnDeleteStdokter(grid, record){
		var record = ds_stdokter.getAt(record);
		var url = BASE_URL + 'stsdokter_controller/delete_stdokter';
		var params = new Object({
						idstdokter	: record.data['idstdokter']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStdokter(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Dokter (Edit)':'Status Dokter (Entry)';
	var stdokter_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stdokter',
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
            id: 'tf.frm.idstdokter', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstdokter', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstdokter', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStdokter();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStdokter.close();
            }
        }]
    });
		
    var wStdokter = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stdokter_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStdokterForm(isUpdate, record);
	wStdokter.show();

/**
FORM FUNCTIONS
*/	
	function setStdokterForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idstdokter', record.get('idstdokter'));
				RH.setCompValue('tf.frm.kdstdokter', record.get('kdstdokter'));
				RH.setCompValue('tf.frm.nmstdokter', record.get('nmstdokter'));
				return;
			}
		}
	}
	
	function fnSaveStdokter(){
		var idForm = 'frm.stdokter';
		var sUrl = BASE_URL +'stsdokter_controller/insert_stdokter';
		var sParams = new Object({
			idstdokter		:	RH.getCompValue('tf.frm.idstdokter'),
			kdstdokter		:	RH.getCompValue('tf.frm.kdstdokter'),
			nmstdokter		:	RH.getCompValue('tf.frm.nmstdokter'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stsdokter_controller/update_stdokter';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStdokter, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}