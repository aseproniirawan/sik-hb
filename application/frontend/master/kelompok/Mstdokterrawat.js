function Mstdokterrawat(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 20;
	var ds_stdokterrawat = dm_stdokterrawat();
	
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
		store: ds_stdokterrawat,
		displayInfo: true,
		displayMsg: 'Data Status Dokter Rawat Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_stdokterrawat',
		store: ds_stdokterrawat,
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
				fnAddStdokterrawat();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdstdokterrawat',
			sortable: true
		},
		{
			header: 'Status',
			width: 300,
			dataIndex: 'nmstdokterrawat',
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
						fnEditStdokterrawat(grid, rowIndex);
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
						fnDeleteStdokterrawat(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Dokter Rawat', iconCls:'silk-calendar',
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
	
	function reloadStdokterrawat(){
		ds_stdokterrawat.reload();
	}
	
	function fnAddStdokterrawat(){
		var grid = grid_nya;
		wEntryStdokterrawat(false, grid, null);	
	}
	
	function fnEditStdokterrawat(grid, record){
		var record = ds_stdokterrawat.getAt(record);
		wEntryStdokterrawat(true, grid, record);		
	}
	
	function fnDeleteStdokterrawat(grid, record){
		var record = ds_stdokterrawat.getAt(record);
		var url = BASE_URL + 'stdokterrawat_controller/delete_stdokterrawat';
		var params = new Object({
						idstdokterrawat	: record.data['idstdokterrawat']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryStdokterrawat(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Dokter Rawat (Edit)':'Status Dokter Rawat (Entry)';
	var stdokterrawat_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.stdokterrawat',
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
            id: 'tf.frm.idstdokterrawat', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdstdokterrawat', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmstdokterrawat', 
            fieldLabel: 'Status',
            width: 300,       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveStdokterrawat();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wStdokterrawat.close();
            }
        }]
    });
		
    var wStdokterrawat = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [stdokterrawat_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setStdokterrawatForm(isUpdate, record);
	wStdokterrawat.show();

/**
FORM FUNCTIONS
*/	
	function setStdokterrawatForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idstdokterrawat'));
				RH.setCompValue('tf.frm.idstdokterrawat', record.get('idstdokterrawat'));
				RH.setCompValue('tf.frm.kdstdokterrawat', record.get('kdstdokterrawat'));
				RH.setCompValue('tf.frm.nmstdokterrawat', record.get('nmstdokterrawat'));
				return;
			}
		}
	}
	
	function fnSaveStdokterrawat(){
		var idForm = 'frm.stdokterrawat';
		var sUrl = BASE_URL +'stdokterrawat_controller/insert_stdokterrawat';
		var sParams = new Object({
			idstdokterrawat		:	RH.getCompValue('tf.frm.idstdokterrawat'),
			kdstdokterrawat		:	RH.getCompValue('tf.frm.kdstdokterrawat'),
			nmstdokterrawat		:	RH.getCompValue('tf.frm.nmstdokterrawat'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'stdokterrawat_controller/update_stdokterrawat';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wStdokterrawat, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}