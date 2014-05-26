function Mwnegara(){
	var pageSize = 18;
	var ds_wnegara = dm_wnegara();
	
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
		store: ds_wnegara,
		displayInfo: true,
		displayMsg: 'Data Warga Negara Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_wnegara',
		store: ds_wnegara,
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
				fnAddWnegara();
				//xt.getCmp('tf.frm.kdwn').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdwn',
			sortable: true
		},
		{
			header: 'Warga Negara',
			width: 300,
			dataIndex: 'nmwn',
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
						fnEditWnegara(grid, rowIndex);
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
						fnDeleteWnegara(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Warga Negara', iconCls:'silk-calendar',
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
	
	function reloadWnegara(){
		ds_wnegara.reload();
	}
	
	function fnAddWnegara(){
		var grid = grid_nya;
		wEntryWnegara(false, grid, null);	
	}
	
	function fnEditWnegara(grid, record){
		var record = ds_wnegara.getAt(record);
		wEntryWnegara(true, grid, record);		
	}
	
	function fnDeleteWnegara(grid, record){
		var record = ds_wnegara.getAt(record);
		var url = BASE_URL + 'wnegara_controller/delete_wnegara';
		var params = new Object({
						idwn	: record.data['idwn']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryWnegara(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Warga Negara (Edit)':'Warga Negara (Entry)';
	var wnegara_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.wnegara',
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
            id: 'tf.frm.idwn', 
            hidden: true,
        },
		{
            id: 'tf.frm.kdwn', 
            fieldLabel: 'Kode',
            width: 100, allowBlank: false,
        },{
            id: 'tf.frm.nmwn', 
            fieldLabel: 'Warga Negara',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveWnegara();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wWnegara.close();
            }
        }]
    });
		
    var wWnegara = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [wnegara_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setWnegaraForm(isUpdate, record);
	wWnegara.show();

/**
FORM FUNCTIONS
*/	
	function setWnegaraForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idwn'));
				RH.setCompValue('tf.frm.idwn', record.get('idwn'));
				RH.setCompValue('tf.frm.kdwn', record.get('kdwn'));
				RH.setCompValue('tf.frm.nmwn', record.get('nmwn'));
				//Ext.getCmp('tf.frm.kdwn').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveWnegara(){
		var idForm = 'frm.wnegara';
		var sUrl = BASE_URL +'wnegara_controller/insert_wnegara';
		var sParams = new Object({
			idwn		:	RH.getCompValue('tf.frm.idwn'),
			kdwn		:	RH.getCompValue('tf.frm.kdwn'),
			nmwn		:	RH.getCompValue('tf.frm.nmwn'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'wnegara_controller/update_wnegara';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wWnegara, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}