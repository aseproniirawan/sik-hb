function Mbdgperawatan(){
	var pageSize = 18;
	var ds_bdgrawat = dm_bdgrawat();
	
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
		store: ds_bdgrawat,
		displayInfo: true,
		displayMsg: 'Data Bidang Perawatan Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_bidang_perawatan',
		store: ds_bdgrawat,
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
				fnAddbdgrawat();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdbdgrawat',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmbdgrawat',
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
						fnEditBdgrawat(grid, rowIndex);
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
						fnDeleteBdgrawat(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Bidang Perawatan',
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
	
	function reloadBdgrawat(){
		ds_bdgrawat.reload();
	}
	
	function fnAddbdgrawat(){
		var grid = grid_nya;
		wEntryBdgrawat(false, grid, null);	
	}
	
	function fnEditBdgrawat(grid, record){
		var record = ds_bdgrawat.getAt(record);
		wEntryBdgrawat(true, grid, record);		
	}
	
	function fnDeleteBdgrawat(grid, record){
		var record = ds_bdgrawat.getAt(record);
		var url = BASE_URL + 'bdgperawatan_controller/delete_bdgperawatan';
		var params = new Object({
						idbdgrawat	: record.data['idbdgrawat']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryBdgrawat(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Bidang Perawatan (Edit)':'Bidang Perawatan (Entry)';
	var bdgrawat_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.bdgrawat',
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
            id: 'tf.frm.idbdgrawat', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdbdgrawat', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmbdgrawat', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveBdgrawat();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wBdgrawat.close();
            }
        }]
    });
		
    var wBdgrawat = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [bdgrawat_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setBdgrawatForm(isUpdate, record);
	wBdgrawat.show();

/**
FORM FUNCTIONS
*/	
	function setBdgrawatForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idbdgrawat', record.get('idbdgrawat'));
				RH.setCompValue('tf.frm.kdbdgrawat', record.get('kdbdgrawat'));
				RH.setCompValue('tf.frm.nmbdgrawat', record.get('nmbdgrawat'));
				return;
			}
		}
	}
	
	function fnSaveBdgrawat(){
		var idForm = 'frm.bdgrawat';
		var sUrl = BASE_URL +'bdgperawatan_controller/insert_bdgperawatan';
		var sParams = new Object({
			idbdgrawat		:	RH.getCompValue('tf.frm.idbdgrawat'),
			kdbdgrawat		:	RH.getCompValue('tf.frm.kdbdgrawat'),
			nmbdgrawat		:	RH.getCompValue('tf.frm.nmbdgrawat'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'bdgperawatan_controller/update_bdgperawatan';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wBdgrawat, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}