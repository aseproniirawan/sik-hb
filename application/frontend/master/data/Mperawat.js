function Mperawat(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_perawat = dm_perawat();
	var ds_jkelamin = dm_jkelamin();
	var ds_status = dm_status();
	
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
		store: ds_perawat,
		displayInfo: true,
		displayMsg: 'Data Perawat Dari {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_perawat',
		store: ds_perawat,		
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
				fnAddPerawat();
				//Ext.getCmp('tf.frm.kdperawat').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Kode',
			width: 70,
			dataIndex: 'kdperawat',
			sortable: true
		},
		{
			header: 'Nama',
			width: 185,
			dataIndex: 'nmperawat',
			sortable: true
		},
		{
			header: 'Jenis Kelamin',
			width: 100,
			dataIndex: 'nmjnskelamin',
			sortable: true
		},
		{
			header: 'No. Telepon',
			width: 100,
			dataIndex: 'notelp',
			sortable: true
		},
		{
			header: 'No. Handphone',
			width: 100,
			dataIndex: 'nohp',
			sortable: true
		},
		{
			header: 'Alamat',
			width: 200,
			dataIndex: 'alamat',
			sortable: true
		},
		{
			header: 'Status',
			width: 80,
			dataIndex: 'nmstatus',
			sortable: true
		},
		{
			header: 'Keterangan',
			width: 150,
			dataIndex: 'keterangan',
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
						fnEditPerawat(grid, rowIndex);
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
						fnDeletePerawat(grid, rowIndex);
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
		title: 'Perawat', iconCls:'silk-user',
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
	
	function reloadPerawat(){
		ds_perawat.reload();
	}
	
	function fnAddPerawat(){
		var grid = grid_nya;
		wEntryPerawat(false, grid, null);	
	}
	
	function fnEditPerawat(grid, record){
		var record = ds_perawat.getAt(record);
		wEntryPerawat(true, grid, record);		
	}
	
	function fnDeletePerawat(grid, record){
		var record = ds_perawat.getAt(record);
		var url = BASE_URL + 'perawat_controller/delete_perawat';
		var params = new Object({
						idperawat	: record.data['idperawat']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
function wEntryPerawat(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Perawat (Edit)':'Perawat (Entry)';
	var perawat_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.perawat',
        buttonAlign: 'left',
		labelWidth: 150, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 400, width: 500,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [ 
		{
            id: 'tf.frm.idperawat', 
            hidden: true,
        },
		{
			fieldLabel: 'Kode',
			id:'tf.frm.kdperawat',
			width: 100,
			allowBlank: false
		},
		{
			fieldLabel: 'Nama Perawat',
			id:'tf.frm.nmperawat',
			width: 300,
			allowBlank: false
		},
		{
            xtype: 'combo', id: 'cb.frm.jkelamin', 
            fieldLabel: 'Jenis Kelamin',
			store: ds_jkelamin, triggerAction: 'all',
            valueField: 'idjnskelamin', displayField: 'nmjnskelamin',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 150,
			editable: false,
			allowBlank: false
        },
		{
			fieldLabel: 'No. Telepon',
			id:'tf.frm.notelp',
			width: 300,
		},
		{
			fieldLabel: 'No. Handphone',
			id:'tf.frm.nohp',
			width: 300,
		},		
		{
			xtype: 'textarea',
			fieldLabel: 'Alamat',
			id: 'ta.frm.alamat',
			width: 300,
		},
		{
            xtype: 'combo', id: 'cb.frm.status', 
            fieldLabel: 'Status',
			store: ds_status, triggerAction: 'all',
            valueField: 'idstatus', displayField: 'nmstatus',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 150,
			editable: false,
			allowBlank: false
        },
		{	xtype: 'textarea',
			fieldLabel: 'Keterangan',
			id: 'ta.frm.keterangan',
			width: 300,
		}],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSavePerawat();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wPerawat.close();
            }
        }]
    });
		
    var wPerawat = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [perawat_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setPerawatForm(isUpdate, record);
	wPerawat.show();

/**
FORM FUNCTIONS
*/	
	function setPerawatForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('iddokter'));
				RH.setCompValue('tf.frm.idperawat', record.get('idperawat'));
				RH.setCompValue('tf.frm.kdperawat', record.get('kdperawat'));
				RH.setCompValue('tf.frm.nmperawat', record.get('nmperawat'));
				RH.setCompValue('cb.frm.jkelamin', record.data['idjnskelamin']);
				RH.setCompValue('tf.frm.notelp', record.get('notelp'));
				RH.setCompValue('tf.frm.nohp', record.get('nohp'));
				RH.setCompValue('ta.frm.alamat', record.get('alamat'));
				RH.setCompValue('cb.frm.status', record.data['idstatus']);
				RH.setCompValue('ta.frm.keterangan', record.get('keterangan'));	
				//Ext.getCmp('tf.frm.kdperawat').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSavePerawat(){
		var idForm = 'frm.perawat';
		var sUrl = BASE_URL +'perawat_controller/insert_perawat';
		var sParams = new Object({
			idperawat		:	RH.getCompValue('tf.frm.idperawat'),
			kdperawat		:	RH.getCompValue('tf.frm.kdperawat'),
			nmperawat		:	RH.getCompValue('tf.frm.nmperawat'),
			idjnskelamin	:	RH.getCompValue('cb.frm.jkelamin'),
			notelp			:	RH.getCompValue('tf.frm.notelp'),
			nohp			:	RH.getCompValue('tf.frm.nohp'),
			alamat			:	RH.getCompValue('ta.frm.alamat'),
			idstatus		:	RH.getCompValue('cb.frm.status'),
			keterangan		:	RH.getCompValue('ta.frm.keterangan')
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'perawat_controller/update_perawat';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wPerawat, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}
}
