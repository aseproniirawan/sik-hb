//-- Look Up ID
var lu_mhs = 200;
var lu_dosen3 = 201;
var lu_kota = 202;
var lu_prov = 203;
var lu_negara = 204;
var lu_univ = 205;
var lu_prodi = 206;
var lu_kelbid = 207;
var lu_promotor = 208;
var lu_pmb = 209;
//var lu_home = 100; //home dosen --. PT/Univ

// URL DATA CONTROLLER:
var URL_DC = 'data_controller/';
//COLUMN MODEL

//PMB
function cm_pmb(){
	return new Ext.grid.ColumnModel([{
		header: 'No PMB', width: 100,
		dataIndex: 'nopmb', sortable: true
	},
	{
		header: 'Tgl PMB', width: 150,
		dataIndex: 'tglpmb', sortable: true
	},{
		header: 'Nama Pendaftar', width: 170,
		dataIndex: 'nama', sortable: true		
	},{
		header: 'Jenis Kelamin', width: 100,
		dataIndex: 'kdjk', sortable: true		
	},{
		header: 'Tgl Lahir', width: 120,
		dataIndex: 'tgllahir', sortable: true		
	},
	{
		header: 'Program Studi', width: 180,
		dataIndex: 'nmprodi', sortable: true		
	},
	{
		header: 'Status USM', width: 160,
		dataIndex: 'nmstusm', sortable: true		
	}]
	);
}


//-- Mhs
function cm_mhs(){
	return new Ext.grid.ColumnModel([{
		header: 'NPM', width: 80,
		dataIndex: 'nim', sortable: true
	}, {
		header: 'Nama Mahasiswa', width: 200,
		dataIndex: 'nmmhs', sortable: true
	}, {
		header: '(L/P)', width: 40,
		dataIndex: 'kdjnskelamin', sortable: true
	}, {
		header: 'Program Studi', width: 160,
		dataIndex: 'nmprodi', sortable: true	
	}, {
		header: 'Tahun Masuk', width: 70,
		dataIndex: 'thnmasuk', sortable: true
	}, {
		header: 'Status Pendaftar', width: 80,
		dataIndex: 'nmstawal', sortable: true	
	}, {
		header: 'Status Aktv', width: 80,
		dataIndex: 'nmstaktiv', sortable: true	
	}]
	);
}
//-- Dosen-3 (nidu,nidn,nama)
function cm_dosen3(){
	return new Ext.grid.ColumnModel([{
		header: 'NIDU', width: 70,
		dataIndex: 'nidu', sortable: true
	}, {
		header: 'NIDN', width: 100,
		dataIndex: 'nidn', sortable: true
	}, {
		header: 'Nama Dosen', width: 220,
		dataIndex: 'nmdosen', sortable: true
	}, {
		header: 'No. Telp', width: 100,
		dataIndex: 'notelp', sortable: true
	}]
	);
}
//-- Kota
function cm_kota(){
	return new Ext.grid.ColumnModel([{
		header: 'Kode', width: 50,
		dataIndex: 'kdkota', sortable: true
	}, {
		header: 'Nama Kota/Kabupaten', width: 250,
		dataIndex: 'nmkota', sortable: true
	}, {
		header: 'Propinsi', width: 180,
		dataIndex: 'nmprov', sortable: true		
	}]
	);
}
//-- Provinsi
function cm_prov(){
	return new Ext.grid.ColumnModel([{
		header: 'Kode', width: 50,
		dataIndex: 'kdprov', sortable: true
	}, {
		header: 'Propinsi', width: 200,
		dataIndex: 'nmprov', sortable: true		
	}]
	);
}
//NEGARA
function cm_negara(){
	return new Ext.grid.ColumnModel([{
		header: 'Kode', width: 50,
		dataIndex: 'kdnegara', sortable: true
	}, {
		header: 'Negara', width: 200,
		dataIndex: 'nmnegara', sortable: true		
	}]
	);
}
//-- Perguruan Tinggi
function cm_univ(){
	return new Ext.grid.ColumnModel([{
		header: 'Kode', width: 50,
		dataIndex: 'kdpt', sortable: true
	}, {
		header: 'Nama Perguruan Tinggi', width: 250,
		dataIndex: 'nmpt', sortable: true
	}, {
		header: 'Kota', width: 150,
		dataIndex: 'kota', sortable: true
	}]
	);
}
//-- Program Studi
function cm_prodi(){
	return new Ext.grid.ColumnModel([{
		header: 'Kode', width: 80,
		dataIndex: 'kdprodi', sortable: true
	}, {
		header: 'Program Studi', width: 330,
		dataIndex: 'nmprodi', sortable: true
	}, {
		header: 'No. Prodi', width: 55,
		dataIndex: 'nomor', sortable: true
	}]
	);
}
//-- Dosen / Promotor
function cm_promotor(){
	return new Ext.grid.ColumnModel([{
		header: 'No. Induk', width: 100,
		dataIndex: 'iddosen', sortable: true
	}, {
		header: 'Nama Dosen/Promotor', width: 330,
		dataIndex: 'nmdosen', sortable: true
	}]
	);
}

// Selection Model
var sm_common = new Ext.grid.RowSelectionModel({
	singleSelect: true
});
// Grid View
var gv_common = new Ext.grid.GridView({
	emptyText: '< Belum ada Data >'
});

// GET GRID PROPERTIES (return Object)
function getGridProperties(idLook) {	
	var LookupUrl = '';
	var dataFields = new Object();
	var columnModel = new Object();
	var searchFields = new Array();
	var idCode=''; var idName='';
		
	switch(idLook){
		case lu_mhs:
			LookupUrl = URL_DC + 'look_mhs';
			dataFields = RH.storeFields('nim','nmmhs','kdjnskelamin','nmprodi','thnmasuk','nmstawal','nmstaktiv');
			columnModel = cm_mhs();
			searchFields = ['nim:NPM','nmmhs:Nama Mahasiswa'];
			idCode = 'nim'; idName = 'nmmhs';			
			break;
		case lu_dosen3:
			LookupUrl = URL_DC + 'get_dosen3';
			dataFields = RH.storeFields('nidu','nidn','nmdosen','notelp');
			columnModel = cm_dosen3();
			searchFields = ['nidu:NIDU','nidn:NIDN','nmdosen:Nama Dosen'];
			idCode = 'nidu'; idName = 'nmdosen';			
			break;
		case lu_kota:
			LookupUrl = URL_DC + 'get_city';
			dataFields = RH.storeFields('kdkota','nmkota','nmprov');
			columnModel = cm_kota();
			searchFields = ['nmkota:Kota','nmprov:Propinsi'];
			idCode = 'kdkota'; idName = 'nmkota';
			break;
		case lu_prov:
			LookupUrl = URL_DC + 'get_prov';
			dataFields = RH.storeFields('kdprov','nmprov');
			columnModel = cm_prov();
			searchFields = ['nmprov:Nama Propinsi'];
			idCode = 'kdprov'; idName = 'nmprov';
			break;
		case lu_negara:
			LookupUrl = URL_DC + 'get_negara';
			dataFields = RH.storeFields('kdnegara','nmnegara');
			columnModel = cm_negara();
			searchFields = ['nmnegara:Nama Negara'];
			idCode = 'kdnegara'; idName = 'nmnegara';
			break;
		case lu_univ:
			LookupUrl = URL_DC + 'get_univ';
			dataFields = RH.storeFields('kdpt','nmpt','kota');
			columnModel = cm_univ();
			searchFields = ['nmpt:Perguruan Tinggi','kota:Kota/Negara'];
			idCode = 'kdpt'; idName = 'nmpt';
			break;
		case lu_prodi:
			LookupUrl = URL_DC + 'get_prodi';
			dataFields = RH.storeFields('kdprodi','nmprodi','nomor');
			columnModel = cm_prodi();
			searchFields = ['kdprodi:Kode Program Studi','nmprodi:Nama Program Studi','nomor:Nomor Urut Prodi'];
			idCode = 'kdprodi'; idName = 'nmprodi';
			break;
		case lu_promotor:
			LookupUrl = URL_DC + 'get_promotor';
			dataFields = RH.storeFields('iddosen','nmdosen');
			columnModel = cm_promotor();
			idCode = 'iddosen'; idName = 'nmdosen';
			break;
		case lu_pmb:
			LookupUrl = URL_DC + 'get_pmb';
			dataFields = RH.storeFields('nopmb','nama','tglpmb','kdjk','tgllahir','nmprodi','nmstusm','tptlahir','alamatasal','alamatsurat',
                                        'kelurahanasal','kecamatanasal','kdkotkabasal','notelp','nmslta','kdkotkabslta','thnlulusslta','kdpossurat',
                                        'nemslta','rangkingslta','noijazahslta','tglijazahslta','nmortu','idpekerjaanortu','alamatortu','kdprodi1',
                                        'nmtptbekerjamhs','idklsmhs1','idstmskmhs','alamatkerjamhs','kdptasal','nmptasal','kdkotkabptasal','fakultasasal','kdprodiasal',
                                        'nmprodiasal');
			columnModel = cm_pmb();
			searchFields = ['nama:Nama Pendaftar','nmprodi:Program Studi'];
			idCode = 'nopmb'; idName = 'nopmb';
			break;	
	};
	
	var gridObj = new Object({	
		lookupUrl	: LookupUrl,
		dataFields	: dataFields,
		columnModel	: columnModel,
		searchFields: searchFields,
		idCode		: idCode,
		idName		: idName
	});	
	return gridObj; 
};

// LOOK-UP wLookup
/**idLook dari constant
* vtitle: judul
* idCode: id textfield kode yg akan di set, jika '0', maka di-pass
* idName: id textfield nama yg akan di set, jika '0', maka di-pass
*/
function wLookup(idLook, vtitle, idCode, idName, width, height, fnDblClick){
	height = (height!=null)? height : 350; //default window height 350
	width = (width!=null)? width : 350; //default window width 350
	
	var gridObj = getGridProperties(idLook);
	//DATA STORE
	var pageSize = 20;
	var ds_lookup = RH.JsonStore({	
        url : BASE_URL + gridObj.lookupUrl,  
		fields : gridObj.dataFields,
		limit: pageSize,
		enableSearch: true,
	});
	//SEARCH COMPONENT
	var sb_lookup = RH.searchComp({
		id : 'sb_lookup',
		fields : gridObj.searchFields,
		selected : 'kode',
		store : ds_lookup
	});
	//GRID PANEL	
	var gp_lookup = new Ext.grid.GridPanel({
		//id: 'gp.'+idLook,
		ds: ds_lookup,
		cm: gridObj.columnModel, 
		sm: sm_common,
		view: gv_common,
		forceFit: true,
		autoSizeColumns: true,
		enableColumnResize: true,
		enableColumnHide: false,
		enableColumnMove: false,
		enableHdaccess: false,
		columnLines: true,		
		loadMask: true,
		//buttonAlign: 'left',
		layout: 'anchor',
		anchorSize: {//width: 400,//height: 300
		},		
		tbar:[sb_lookup],
		bbar: new Ext.PagingToolbar({
			store: ds_lookup,
			pageSize: pageSize,
            displayInfo: true,
            displayMsg: 'Data {0} - {1} dari {2}',
            emptyMsg: "Belum ada data",			
		}),
		listeners: {
			rowdblclick: rowLookupDblclick
		}
	});
	
	/** FOR DEBUGGING */
	//RH.warning('debug: '+ gridObj.searchFields[0]);	
	/** ====================*/
	
	var win_lookup = new Ext.Window({
		title: vtitle, 
		modal: true, 
		layout: 'fit',
		items: [gp_lookup],
		height: height,
		width: width,
	}).show();
	
	function rowLookupDblclick(grid, rowIdx) {
		var rec = ds_lookup.getAt(rowIdx);
		var gridObject = getGridProperties(idLook);
		var kode = gridObject.idCode;
		var nama = gridObject.idName;
		var kdval = rec.data[kode]; 
		var nmval = rec.data[nama];
        
        //untuk load pada saat double klik
        var nama = rec.data['nama']; 
        var kdjk = rec.data['kdjk'];
        var tempat_lahir = rec.data['tptlahir'];
        var tgl_lahir = rec.data['tgllahir'];
        var notelp = rec.data['notelp'];
        var alamat = rec.data['alamatasal'];
        var kelurahan = rec.data['kelurahanasal'];
        var kecamatan = rec.data['kecamatanasal'];
        var kotkabasal = rec.data['kdkotkabasal'];
        var kodepos = rec.data['kdpossurat'];
        var alamatsurat = rec.data['alamatsurat'];
        var nmortu = rec.data['nmortu'];
        var pekerjaan_ortu = rec.data['idpekerjaanortu'];
        var alamat_ortu = rec.data['alamatortu'];
        var prodi = rec.data['kdprodi1'];
        var kelas = rec.data['idklsmhs1'];
        var status = rec.data['kdstmskmhs'];
				
		if(idCode != '0') {
			//Ext.getCmp(idCode).focus();
			RH.setCompValue(idCode, kdval);
		}
		if(idName != '0') {
			//Ext.getCmp(idName).focus();
			RH.setCompValue(idName, nmval);
		}
		if(idLook == lu_mhs){
			/*if(idPage == MENU.mahasiswa)
				setMhsForm(kdval, nmval); //di fnMahasiswa.js
			*/
			
		}
		if(idLook == lu_dosen3){
			if(Ext.getCmp('tf.notelpketua')){
				RH.setCompValue('tf.notelpketua', rec.data['notelp']);
			}			
		}
        
        if(idLook == lu_pmb){
					
            Ext.getCmp('tf.nama-mhs').setValue(nama);
            Ext.getCmp('cb.gender-mhs').setValue(kdjk);
            Ext.getCmp('tf.tplahir-mhs').setValue(tempat_lahir);
            //Ext.getCmp('df.tglahir-mhs').setValue(tgl_lahir);
            Ext.getCmp('tf.telp-mhs').setValue(notelp);
            Ext.getCmp('tf.alamat_asal-mhs').setValue(alamat);
            Ext.getCmp('tf.kel_asal-mhs').setValue(kelurahan);
            Ext.getCmp('tf.kec_asal-mhs').setValue(kecamatan);
            Ext.getCmp('lu.kdkotkabasal').setValue(kotkabasal);
            Ext.getCmp('tf.kdpos_asal-mhs').setValue(kodepos);
            Ext.getCmp('tf.alamat_surat-mhs').setValue(alamatsurat);
            Ext.getCmp('tf.namaortu').setValue(nmortu);
            Ext.getCmp('cb.jobortu').setValue(pekerjaan_ortu);
            Ext.getCmp('tf.alamatortu').setValue(alamat_ortu);
            Ext.getCmp('cb.prodireg').setValue(prodi);
		    Ext.getCmp('cb.class').setValue(kelas); 
            //Ext.getCmp('cb.stawal').setValue(status);  
        }
        
		if(fnDblClick){
			fnDblClick();
		}
		win_lookup.close();		
	}	
}
