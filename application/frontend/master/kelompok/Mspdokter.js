function Mspdokter(){
	var pageSize = 18;
	var ds_spdokter = dm_spdokter();
	
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
		store: ds_spdokter,
		displayInfo: true,
		displayMsg: 'Data Spesialis Dokter Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_spesialis_dokter',
		store: ds_spdokter,
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
				fnAddspdokter();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdspesialisasi',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmspesialisasi',
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
						fnEditSpdokter(grid, rowIndex);
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
						fnDeleteSpdokter(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Spesialis Dokter',
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
	
	function reloadSpdokter(){
		ds_spdokter.reload();
	}
	
	function fnAddspdokter(){
		var grid = grid_nya;
		wEntrySpdokter(false, grid, null);	
	}
	
	function fnEditSpdokter(grid, record){
		var record = ds_spdokter.getAt(record);
		wEntrySpdokter(true, grid, record);		
	}
	
	function fnDeleteSpdokter(grid, record){
		var record = ds_spdokter.getAt(record);
		var url = BASE_URL + 'spdokter_controller/delete_spdokter';
		var params = new Object({
						idspesialisasi	: record.data['idspesialisasi']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntrySpdokter(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Spesialis Dokter (Edit)':'Spesialis Dokter (Entry)';
	var spdokter_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.spdokter',
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
            id: 'tf.frm.idspesialisasi', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdspesialisasi', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmspesialisasi', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveSpdokter();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wSpdokter.close();
            }
        }]
    });
		
    var wSpdokter = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [spdokter_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setSpdokterForm(isUpdate, record);
	wSpdokter.show();

/**
FORM FUNCTIONS
*/	
	function setSpdokterForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idspesialisasi', record.get('idspesialisasi'));
				RH.setCompValue('tf.frm.kdspesialisasi', record.get('kdspesialisasi'));
				RH.setCompValue('tf.frm.nmspesialisasi', record.get('nmspesialisasi'));
				return;
			}
		}
	}
	
	function fnSaveSpdokter(){
		var idForm = 'frm.spdokter';
		var sUrl = BASE_URL +'spdokter_controller/insert_spdokter';
		var sParams = new Object({
			idspesialisasi		:	RH.getCompValue('tf.frm.idspesialisasi'),
			kdspesialisasi		:	RH.getCompValue('tf.frm.kdspesialisasi'),
			nmspesialisasi		:	RH.getCompValue('tf.frm.nmspesialisasi'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'spdokter_controller/update_spdokter';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wSpdokter, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}