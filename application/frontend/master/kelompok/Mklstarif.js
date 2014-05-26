function Mklstarif(){
	var pageSize = 18;
	var ds_klstarif = dm_klstarif();
	
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
		store: ds_klstarif,
		displayInfo: true,
		displayMsg: 'Data Kelas Tarif Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_kelas_tarif',
		store: ds_klstarif,
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
				fnAddklstarif();
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 100,
			dataIndex: 'kdklstarif',
			sortable: true
		},
		{
			header: 'Nama',
			width: 300,
			dataIndex: 'nmklstarif',
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
						fnEditKlstarif(grid, rowIndex);
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
						fnDeleteKlstarif(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Kelas Tarif',
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
	
	function reloadKlstarif(){
		ds_klstarif.reload();
	}
	
	function fnAddklstarif(){
		var grid = grid_nya;
		wEntryKlstarif(false, grid, null);	
	}
	
	function fnEditKlstarif(grid, record){
		var record = ds_klstarif.getAt(record);
		wEntryKlstarif(true, grid, record);		
	}
	
	function fnDeleteKlstarif(grid, record){
		var record = ds_klstarif.getAt(record);
		var url = BASE_URL + 'klstarif_controller/delete_klstarif';
		var params = new Object({
						idklstarif	: record.data['idklstarif']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}


function wEntryKlstarif(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Kelas Tarif (Edit)':'Kelas Tarif (Entry)';
	var klstarif_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.klstarif',
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
            id: 'tf.frm.idklstarif', 
            hidden: true,
        },    
		{
            id: 'tf.frm.kdklstarif', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmklstarif', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveKlstarif();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wKlstarif.close();
            }
        }]
    });
		
    var wKlstarif = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [klstarif_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setKlstarifForm(isUpdate, record);
	wKlstarif.show();

/**
FORM FUNCTIONS
*/	
	function setKlstarifForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('idhari'));
				RH.setCompValue('tf.frm.idklstarif', record.get('idklstarif'));
				RH.setCompValue('tf.frm.kdklstarif', record.get('kdklstarif'));
				RH.setCompValue('tf.frm.nmklstarif', record.get('nmklstarif'));
				return;
			}
		}
	}
	
	function fnSaveKlstarif(){
		var idForm = 'frm.klstarif';
		var sUrl = BASE_URL +'klstarif_controller/insert_klstarif';
		var sParams = new Object({
			idklstarif		:	RH.getCompValue('tf.frm.idklstarif'),
			kdklstarif		:	RH.getCompValue('tf.frm.kdklstarif'),
			nmklstarif		:	RH.getCompValue('tf.frm.nmklstarif'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'klstarif_controller/update_klstarif';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wKlstarif, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}