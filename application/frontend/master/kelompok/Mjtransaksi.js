function Mjtransaksi(){
Ext.form.Field.prototype.msgTarget = 'side';

	var pageSize = 18;
	var ds_jnstransaksi = dm_jnstransaksi();
	
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
		store: ds_jnstransaksi,
		displayInfo: true,
		displayMsg: 'Data Jenis Transaksi Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_jnstransaksi',
		store: ds_jnstransaksi,
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
				fnAddJnstransaksi();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdjnstransaksi',
			sortable: true
		},
		{
			header: 'Jenis Transaksi',
			width: 350,
			dataIndex: 'nmjnstransaksi',
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
						fnEditJnstransaksi(grid, rowIndex);
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
						fnDeleteJnstransaksi(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Jenis Transaksi', iconCls:'silk-calendar',
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
	
	function reloadJnstransaksi(){
		ds_jnstransaksi.reload();
	}
	
	function fnAddJnstransaksi(){
		var grid = grid_nya;
		wEntryJnstransaksi(false, grid, null);	
	}
	
	function fnEditJnstransaksi(grid, record){
		var record = ds_jnstransaksi.getAt(record);
		wEntryJnstransaksi(true, grid, record);		
	}
	
	function fnDeleteJnstransaksi(grid, record){
		var record = ds_jnstransaksi.getAt(record);
		var url = BASE_URL + 'jtransaksi_controller/delete_jnstransaksi';
		var params = new Object({
						idjnstransaksi	: record.data['idjnstransaksi']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryJnstransaksi(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Jenis Transaksi (Edit)':'Jenis Transaksi (Entry)';
	var jnstransaksi_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jnstransaksi',
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
            id: 'tf.frm.idjnstransaksi', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdjnstransaksi', 
            fieldLabel: 'Kode',
            width: 150,
        },{
            id: 'tf.frm.nmjnstransaksi', 
            fieldLabel: 'Jenis Transaksi',
            width: 350,       
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJnstransaksi();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJnstransaksi.close();
            }
        }]
    });
		
    var wJnstransaksi = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jnstransaksi_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJnstransaksiForm(isUpdate, record);
	wJnstransaksi.show();

/**
FORM FUNCTIONS
*/	
	function setJnstransaksiForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idjnstransaksi'));
				RH.setCompValue('tf.frm.idjnstransaksi', record.get('idjnstransaksi'));
				RH.setCompValue('tf.frm.kdjnstransaksi', record.get('kdjnstransaksi'));
				RH.setCompValue('tf.frm.nmjnstransaksi', record.get('nmjnstransaksi'));
				return;
			}
		}
	}
	
	function fnSaveJnstransaksi(){
		var idForm = 'frm.jnstransaksi';
		var sUrl = BASE_URL +'jtransaksi_controller/insert_jnstransaksi';
		var sParams = new Object({
			idjnstransaksi		:	RH.getCompValue('tf.frm.idjnstransaksi'),
			kdjnstransaksi		:	RH.getCompValue('tf.frm.kdjnstransaksi'),
			nmjnstransaksi		:	RH.getCompValue('tf.frm.nmjnstransaksi'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'jtransaksi_controller/update_jnstransaksi';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJnstransaksi, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}