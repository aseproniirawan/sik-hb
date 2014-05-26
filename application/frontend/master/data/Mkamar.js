function Mkamar(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_kamar = dm_kamar();
	var ds_bagian = dm_bagian();
	var ds_kmrbagian = dm_kmrbagian();
	
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
		store: ds_kamar,
		displayInfo: true,
		displayMsg: 'Data Kamar Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_kamar',
		store: ds_kamar,		
		autoScroll: true,
		autoHeight: true,
		columnLines: true,
		plugins: cari_data,
		tbar: [
		{
			text: 'Tambah',
			id: 'btn_add',
			iconCls: 'silk-add',
			handler: function() {
				fnAddKamar();
				//Ext.getCmp('tf.frm.kdkamar').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Ruang Perawatan',
			width: 200,
			dataIndex: 'nmbagian',
			sortable: true
		},
		{
			header: 'Kode Kamar',
			width: 100,
			dataIndex: 'kdkamar',
			sortable: true
		},
		{
			header: 'Nama Kamar',
			width: 150,
			dataIndex: 'nmkamar',
			sortable: true
		},
		{
			header: 'Fasilitas',
			width: 200,
			dataIndex: 'fasilitas',
			sortable: true
		},
		{
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
						fnEditKamar(grid, rowIndex);
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
						fnDeleteKamar(grid, rowIndex);
                    }
                }]
        }],
		bbar: paging,
		listeners: {
			rowclick: function rowClick(grid, rowIdx) {

			}
		}
	});
       
	var form_bp_general = new Ext.form.FormPanel({
		id: 'form_bp_general',
		title: 'Kamar', iconCls:'silk-calendar',
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
	
	function reloadKamar(){
		ds_kamar.reload();
	}
	
	function fnAddKamar(){
		var grid = grid_nya;
		wEntryKamar(false, grid, null);	
	}
	
	function fnEditKamar(grid, record){
		var record = ds_kamar.getAt(record);
		wEntryKamar(true, grid, record);		
	}
	
	function fnDeleteKamar(grid, record){
		var record = ds_kamar.getAt(record);
		var url = BASE_URL + 'kamar_controller/delete_kamar';
		var params = new Object({
						idkamar	: record.data['idkamar']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
function wEntryKamar(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Kamar (Edit)':'Kamar (Entry)';
	var kamar_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.kamar',
        buttonAlign: 'left',
		labelWidth: 150, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 230, width: 500,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [ 
		{
            id: 'tf.frm.idkamar', 
            hidden: true,
        },{
            xtype: 'combo', id: 'cb.frm.bagian', 
            fieldLabel: 'Ruang Perawatan',
			store: ds_kmrbagian, triggerAction: 'all',
            valueField: 'idbagian', displayField: 'nmbagian',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 200,
			editable: false,
			allowBlank: false
        },
		{
			fieldLabel: 'Kode Kamar',
			id:'tf.frm.kdkamar',
			width: 100
		},
		{
			fieldLabel: 'Nama Kamar',
			id:'tf.frm.nmkamar',
			width: 300
		},
		{
			fieldLabel: 'Fasilitas',
			id:'tf.frm.fasilitas',
			width: 300
		}],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveKamar();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wKamar.close();
            }
        }]
    });
		
    var wKamar = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [kamar_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setKamarForm(isUpdate, record);
	wKamar.show();

/**
FORM FUNCTIONS
*/	
	function setKamarForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('iddokter'));
				RH.setCompValue('tf.frm.idkamar', record.get('idkamar'));
				RH.setCompValue('cb.frm.bagian', record.data['idbagian']);
				RH.setCompValue('tf.frm.kdkamar', record.get('kdkamar'));
				RH.setCompValue('tf.frm.nmkamar', record.get('nmkamar'));
				RH.setCompValue('tf.frm.fasilitas', record.get('fasilitas'));
				//Ext.getCmp('tf.frm.kdkamar').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveKamar(){
		var idForm = 'frm.kamar';
		var sUrl = BASE_URL +'kamar_controller/insert_kamar';
		var sParams = new Object({
			idkamar			:	RH.getCompValue('tf.frm.idkamar'),
			idbagian		:	RH.getCompValue('cb.frm.bagian'),
			kdkamar			:	RH.getCompValue('tf.frm.kdkamar'),
			nmkamar			:	RH.getCompValue('tf.frm.nmkamar'),
			fasilitas		:	RH.getCompValue('tf.frm.fasilitas'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'kamar_controller/update_kamar';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wKamar, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}
}
