function Msttransaksi(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 20;
	var ds_sttransaksi = dm_sttransaksi();
	
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
		store: ds_sttransaksi,
		displayInfo: true,
		displayMsg: 'Data Status Transaksi Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_sttransaksi',
		store: ds_sttransaksi,
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
				fnAddSttransaksi();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdsttransaksi',
			sortable: true
		},
		{
			header: 'Status',
			width: 300,
			dataIndex: 'nmsttransaksi',
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
						fnEditSttransaksi(grid, rowIndex);
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
						fnDeleteSttransaksi(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Status Transaksi', iconCls:'silk-calendar',
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
	
	function reloadSttransaksi(){
		ds_sttransaksi.reload();
	}
	
	function fnAddSttransaksi(){
		var grid = grid_nya;
		wEntrySttransaksi(false, grid, null);	
	}
	
	function fnEditSttransaksi(grid, record){
		var record = ds_sttransaksi.getAt(record);
		wEntrySttransaksi(true, grid, record);		
	}
	
	function fnDeleteSttransaksi(grid, record){
		var record = ds_sttransaksi.getAt(record);
		var url = BASE_URL + 'sttransaksi_controller/delete_sttransaksi';
		var params = new Object({
						idsttransaksi	: record.data['idsttransaksi']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntrySttransaksi(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Status Transaksi (Edit)':'Status Transaksi (Entry)';
	var sttransaksi_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.sttransaksi',
        buttonAlign: 'left',
		labelWidth: 115, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 200, width: 500,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [     
		{
            id: 'tf.frm.idsttransaksi', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdsttransaksi', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmsttransaksi', 
            fieldLabel: 'Status',
            width: 300,       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveSttransaksi();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wSttransaksi.close();
            }
        }]
    });
		
    var wSttransaksi = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [sttransaksi_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setSttransaksiForm(isUpdate, record);
	wSttransaksi.show();

/**
FORM FUNCTIONS
*/	
	function setSttransaksiForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idsttransaksi'));
				RH.setCompValue('tf.frm.idsttransaksi', record.get('idsttransaksi'));
				RH.setCompValue('tf.frm.kdsttransaksi', record.get('kdsttransaksi'));
				RH.setCompValue('tf.frm.nmsttransaksi', record.get('nmsttransaksi'));
				return;
			}
		}
	}
	
	function fnSaveSttransaksi(){
		var idForm = 'frm.sttransaksi';
		var sUrl = BASE_URL +'sttransaksi_controller/insert_sttransaksi';
		var sParams = new Object({
			idsttransaksi		:	RH.getCompValue('tf.frm.idsttransaksi'),
			kdsttransaksi		:	RH.getCompValue('tf.frm.kdsttransaksi'),
			nmsttransaksi		:	RH.getCompValue('tf.frm.nmsttransaksi'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'sttransaksi_controller/update_sttransaksi';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wSttransaksi, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}