function pJruangan(){
	var fields_jruangan = RH.storeFields('idjnsruangan','kdjnsruangan','nmjnsruangan','deskripsi');
	var pageSize = 18;
	var ds_jruangan = RH.JsonStore({	
        url : BASE_URL + 'jruangan_controller/get_jruangan',  
		fields : fields_jruangan,
		limit: pageSize,
		enableSearch: true,
	});	
//SEARCH COMPONENT
	var sb_jruangan = RH.searchComp({
		id : 'sb_jruangan',
		fields : ['kdjnsruangan:Kode','nmjnsruangan:Nama'],
		selected : 'nmjnsruangan',
		store : ds_jruangan
	});
	// COLUMN MODEL
	var cm_jruangan = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{
			header: 'Kode',width: 100,
			dataIndex: 'kdjnsruangan', 
			sortable: true
		}, {
			header: 'Nama',  width: 300,
			dataIndex: 'nmjnsruangan', 
			sortable: true
		}, {
			header: 'Deskripsi', width: 300,
			dataIndex: 'deskripsi', 
			sortable: true
		}, 
		{
			xtype: 'checkcolumn',
			header: '<center>Ambil</center>',
			width: 50,
			dataIndex: 'ambil',
			sortable: true ,
                        editor:{
                                    xtype: 'checkbox',
                                    id:'cbambil',
                                    name:'cbambil',
                                    //disabled:cbambil,
                                    listeners: {
                                        change: function() {
                                              if(Ext.getCmp('cbambil').getValue()==true){
                                                   type='update';
                                                   //simpanambil();
                                              }else{
                                                  type='update';
                                                   //simpanambil();
                                              }                                           
                                        },
                                        render: function(c) {
                                            c.getEl().on('keypress', function(e) {
                                            //    edit();
                                            }, c);
                                        }
                                    }
                        }
		},
			RH.EditColumn(), RH.DeleteColumn()
		]
	);    
	/** THE GRID */       
    var gp_jruangan = RH.GridPanel_T1({
		ds: ds_jruangan,
        cm: cm_jruangan,
        singleSelect: true,
        searchComp: sb_jruangan,
		allowAdd: true,
		fnAdd: fnAddJnsRuangan,
		pageSize: pageSize,
		cellclick: onCellJnsRuanganClick
	});
    
	var fp_jruangan = RH.GPContainer1({
		title: 'Jenis Ruangan', iconCls:'silk-house',
		gridPanel: gp_jruangan,
	}); SET_PAGE_CONTENT(fp_jruangan);
	
/** 
FUNCTIONS
*/
	function onCellJnsRuanganClick(grid, rowIndex, columnIndex, e) {
		var record = grid.getStore().getAt(rowIndex);  // Get the Record
        
        RH.EditClick(e, function(){fnEditJnsRuangan(grid, record)});
        RH.DeleteClick(e, function(){fnDeleteJnsRuangan(grid, record)});
    }

	function reloadJnsRuangan(){
		ds_jruangan.reload();
	}
	
	function fnAddJnsRuangan(){
		var grid = gp_jruangan;
		wEntryJruangan(false, grid, null);	
	}
	
	function fnEditJnsRuangan(grid, record){
		wEntryJruangan(true, grid, record);		
	}
	
	function fnDeleteJnsRuangan(grid, record){
		var url = BASE_URL + 'jruangan_controller/delete_jruangan';
		var params = new Object({
						idjnsruangan	: record.data['idjnsruangan']
					});
		RH.deleteGridRecord(url, params, grid );
	}
}

/**
WIN - FORM ENTRY/EDIT JENIS RUANGAN
*/
function wEntryJruangan(isUpdate, grid, record){
	var winTitle = 'Jenis Ruangan ' + ((isUpdate)?'(Edit)':'(Tambah)');		
/**
FORM ENTRY/EDIT MATA-KULIAH
*/		
	var jnsruangan_form = new Ext.form.FormPanel({
		xtype:'form',
        id: 'frm.jnsruangan',
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
            id: 'tf.frm.kdjnsruangan', 
            fieldLabel: 'Kode',
            width: 150, allowBlank: false,
        },{
            id: 'tf.frm.nmjnsruangan', 
            fieldLabel: 'Nama',
            width: 300, allowBlank: false,        
        },{
            xtype: 'textarea',
			id: 'ta.frm.deskripsi', 
            fieldLabel: 'Deskripsi',
            width: 300,
		}],
        buttons: [{
            text: 'Simpan', iconCls:'silk-save',
            handler: function() {
                fnSaveJnsRuangan();                           
            }
        }, {
            text: 'Kembali', iconCls:'silk-arrow-undo',
            handler: function() {
                wJnsRuangan.close();
            }
        }]
    });
		
    var wJnsRuangan = new Ext.Window({
        title: winTitle,
        modal: true, closable:false,
        items: [jnsruangan_form]
    });

/**
CALL SET FORM AND SHOW THE FORM (WINDOW)
*/
	setJnsRuanganForm(isUpdate, record);
	wJnsRuangan.show();

/**
FORM FUNCTIONS
*/	
	function setJnsRuanganForm(isUpdate, record){
		var kdprodi = RH.getCompValue('cb.prodi-matkul', true);
		if(isUpdate){
			if(record != null){
				RH.disableComp('tf.frm.kdjnsruangan');
				RH.setCompValue('tf.frm.kdjnsruangan', record.data['kdjnsruangan']);
				RH.setCompValue('tf.frm.nmjnsruangan', record.data['nmjnsruangan']);
				RH.setCompValue('ta.frm.deskripsi', record.data['deskripsi']);
				return;
			}
		}
	}
	
	function fnSaveJnsRuangan(){
		var idForm = 'frm.jnsruangan';
		var sUrl = 'jruangan_controller/insert_jruangan';
		var sParams = new Object({
			kdjnsruangan		:	RH.getCompValue('tf.frm.kdjnsruangan'),
			nmjnsruangan		:	RH.getCompValue('tf.frm.nmjnsruangan'),
			deskripsi			:	RH.getCompValue('ta.frm.deskripsi'),
		});
		var msgWait = 'Tunggu, sedang proses menyimpan...';
		var msgSuccess = 'Tambah data berhasil';
		var msgFail = 'Tambah data gagal';
		var msgInvalid = 'Data belum valid (data primer belum terisi)!';
		
		if(isUpdate){
			sUrl = 'jruangan_controller/update_jruangan';
			sParams.idjnsruangan = record.data['idjnsruangan'];
			msgSuccess = 'Update data berhasil';
			msgFail = 'Update data gagal';
		}
		
		//call form grid submit function (common function by RH)
		RH.submitGridForm(idForm, sUrl, sParams, grid, wJnsRuangan, 
			msgWait, msgSuccess, msgFail, msgInvalid);
	}
				
}