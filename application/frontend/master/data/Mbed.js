function Mbed(){
Ext.form.Field.prototype.msgTarget = 'side';
	var pageSize = 18;
	var ds_bed = dm_bed();
	var ds_extrabed = dm_extrabed();
	var ds_stbed = dm_stbed();
	var ds_status = dm_status();
	var ds_cbkamardibed = dm_cbkamardibed();
	
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
		store: ds_bed,
		displayInfo: true,
		displayMsg: 'Data Bed {0} - {1} of {2}',
		emptyMsg: 'No data to display'
	});
	
	var grid_nya = new Ext.grid.GridPanel({
		id: 'grid_bed',
		store: ds_bed,		
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
				fnAddBed();
				//Ext.getCmp('tf.frm.kdbed').setReadOnly(false);
			}
		}],
		//sm: sm_nya,
		columns: [new Ext.grid.RowNumberer(),
		{
			header: 'Ruangan Perawatan - Kamar',
			width: 200,
			dataIndex: 'rperawatan_kamar',
			sortable: true
		},
		{
			header: 'Kamar',
			width: 100,
			dataIndex: 'nmkamar',
			sortable: true
		},
		{
			header: 'Kode Bed',
			width: 100,
			dataIndex: 'kdbed',
			sortable: true
		},
		{
			header: 'Nama Bed',
			width: 150,
			dataIndex: 'nmbed',
			sortable: true
		},
		{
			header: 'Extra Bed',
			width: 100,
			dataIndex: 'nmextrabed',
			sortable: true
		},
		{
			header: 'Status Bed',
			width: 100,
			dataIndex: 'nmstbed',
			sortable: true
		},		
		{
			header: 'Status',
			width: 100,
			dataIndex: 'nmstatus',
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
						fnEditBed(grid, rowIndex);
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
						fnDeleteBed(grid, rowIndex);
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
		title: 'Bed', iconCls:'silk-calendar',
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
	
	function reloadBed(){
		ds_bed.reload();
	}
	
	function fnAddBed(){
		var grid = grid_nya;
		wEntryBed(false, grid, null);	
	}
	
	function fnEditBed(grid, record){
		var record = ds_bed.getAt(record);
		wEntryBed(true, grid, record);		
	}
	
	function fnDeleteBed(grid, record){
		var record = ds_bed.getAt(record);
		var url = BASE_URL + 'bed_controller/delete_bed';
		var params = new Object({
						idbed	: record.data['idbed']
					});
		RH.deleteGridRecord(url, params, grid );
	}
	
	/**
WIN - FORM ENTRY/EDIT 
*/
function wEntryBed(isUpdate, grid, record){
	var winTitle = (isUpdate)?'Bed (Edit)':'Bed (Entry)';
	var bed_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.bed',
        buttonAlign: 'left',
		labelWidth: 190, labelAlign: 'right',
        bodyStyle: 'padding:10px 3px 3px 5px', // atas, kanan, bawah, kiri
        monitorValid: true,
        height: 250, width: 545,
        layout: 'form', 
		frame: false, 
		defaultType:'textfield',		
		items: [ 
		{
            id: 'tf.frm.idbed', 
            hidden: true,
        },
		{
            xtype: 'combo', id: 'cb.frm.kamar', 
            fieldLabel: 'Ruangan Perawatan - Kamar',
			store: ds_cbkamardibed, triggerAction: 'all',
            valueField: 'idkamar', displayField: 'rperawatan_kamar',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 200,
			editable: false,
			allowBlank: false
        },
		{
			fieldLabel: 'Kode Bed',
			id:'tf.frm.kdbed',
			width: 200,
			allowBlank: false
		},
		{
			fieldLabel: 'Nama Bed',
			id:'tf.frm.nmbed',
			width: 300
		},
		{
            xtype: 'combo', id: 'cb.frm.extrabed', 
            fieldLabel: 'Extra Bed',
			store: ds_extrabed, triggerAction: 'all',
            valueField: 'idextrabed', displayField: 'nmextrabed',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 200,
			editable: false,
			allowBlank: false
        },
		{
            xtype: 'combo', id: 'cb.frm.stbed', 
            fieldLabel: 'Status Bed',
			store: ds_stbed, triggerAction: 'all',
            valueField: 'idstbed', displayField: 'nmstbed',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 200,
			editable: false,
			allowBlank: false
        },
		{
            xtype: 'combo', id: 'cb.frm.status', 
            fieldLabel: 'Status',
			store: ds_status, triggerAction: 'all',
            valueField: 'idstatus', displayField: 'nmstatus',
            forceSelection: true, submitValue: true, 
            mode: 'local', emptyText:'Pilih...', width: 200,
			editable: false,
			allowBlank: false
        }],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveBed();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wBed.close();
            }
        }]
    });
		
    var wBed = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [bed_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setBedForm(isUpdate, record);
	wBed.show();

/**
FORM FUNCTIONS
*/	
	function setBedForm(isUpdate, record){
		if(isUpdate){
			if(record != null){
				//alert(record.get('iddokter'));
				RH.setCompValue('cb.frm.kamar', record.data['idkamar']);
				RH.setCompValue('tf.frm.idbed', record.get('idbed'));
				RH.setCompValue('tf.frm.kdbed', record.get('kdbed'));
				RH.setCompValue('tf.frm.nmbed', record.get('nmbed'));
				RH.setCompValue('cb.frm.extrabed', record.get('idextrabed'));
				RH.setCompValue('cb.frm.stbed', record.get('idstbed'));	
				RH.setCompValue('cb.frm.status', record.data['idstatus']);
				//Ext.getCmp('tf.frm.kdbed').setReadOnly(true);
				return;
			}
		}
	}
	
	function fnSaveBed(){
		var idForm = 'frm.bed';
		var sUrl = BASE_URL +'bed_controller/insert_bed';
		var sParams = new Object({
			idkamar		:	RH.getCompValue('cb.frm.kamar'),
			idbed		:	RH.getCompValue('tf.frm.idbed'),
			kdbed		:	RH.getCompValue('tf.frm.kdbed'),
			nmbed		:	RH.getCompValue('tf.frm.nmbed'),
			idextrabed	:	RH.getCompValue('cb.frm.extrabed'),
			idstbed		:	RH.getCompValue('cb.frm.stbed'),
			idstatus	:	RH.getCompValue('cb.frm.status'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = BASE_URL +'bed_controller/update_bed';
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wBed, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}
}
