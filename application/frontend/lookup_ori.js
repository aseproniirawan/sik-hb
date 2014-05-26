// CONSTANT
//-- Properties ID
var idDS = 0;
var idCM = 1;
var idGetCode = 2;
var idGetName = 3
var idHeight = 4;
var idWidth = 5;

//-- Look Up ID
var lu_mhs = 200;
var lu_kota = 201;
var lu_prov = 202;
var lu_univ = 203;
var lu_prodi = 204;
var lu_dosen = 205;

//COLUMN MODEL
//-- Mhs
var cm_mhs = new Ext.grid.ColumnModel([{
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
//-- Kota
var cm_kota = new Ext.grid.ColumnModel([{
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
//-- Provinsi
var cm_prov = new Ext.grid.ColumnModel([{
		header: 'Kode', width: 50,
		dataIndex: 'kdprov', sortable: true
	}, {
		header: 'Propinsi', width: 200,
		dataIndex: 'nmprov', sortable: true		
	}]
);
//-- Perguruan Tinggi
var cm_univ = new Ext.grid.ColumnModel([{
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
//-- Program Studi
var cm_prodi = new Ext.grid.ColumnModel([{
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
//-- Dosen / Promotor
var cm_dosen = new Ext.grid.ColumnModel([{
		header: 'No. Induk', width: 100,
		dataIndex: 'iddosen', sortable: true
	}, {
		header: 'Nama Dosen/Promotor', width: 330,
		dataIndex: 'nmdosen', sortable: true
	}]
);

// Selection Model
var sm_common = new Ext.grid.RowSelectionModel({
	singleSelect: true
});
// Grid View
var gv_common = new Ext.grid.GridView({
	emptyText: '< Belum ada Data >'
});

// LOOK-UP
function wLookup(idLook, vtitle, idCode, idName){
	//DATA SOURCE
	//-- Mahasiswa
	var ds_mhs = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'data_controller/look_mhs', //ganti dengan look_city
			method: 'POST'
		}),
		//params: { start: 0, limit: 30 },
		//totalProperty: 'results', 
		autoLoad: true, 
		root: 'data',
		fields: [
		{ name: "nim", mapping: "nim" }
		, { name: "nmmhs", mapping: "nmmhs" }
		, { name: "kdjnskelamin", mapping: "kdjnskelamin" }
		, { name: "nmprodi", mapping: "nmprodi" }
		, { name: "thnmasuk", mapping: "thnmasuk" }
		, { name: "nmstawal", mapping: "nmstawal" }
		, { name: "nmstaktiv", mapping: "nmstaktiv" }
		]
	});
	//-- Kota
	var ds_kota = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'data_controller/get_city', //ganti dengan look_city
			method: 'POST'
		}),
		//params: { start: 0, limit: 30 },
		totalProperty: 'results', autoLoad: true, 
		root: 'data',
		fields: [
		{ name: "kdkota", mapping: "kdkota" }
		, { name: "nmkota", mapping: "nmkota" }
		, { name: "nmprov", mapping: "nmprov" }
		]
	});
	//-- Propinsi
	var ds_prov = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'data_controller/get_prov ',
			method: 'POST'
		}),
		autoLoad: true, 
		root: 'data',
		fields: [
		{ name: "kdprov", mapping: "kdprov" }
		, { name: "nmprov", mapping: "nmprov" }
		]
	});
	//--Perguruan Tinggi
	var ds_univ = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'data_controller/get_univ ',
			method: 'POST'
		}),
		autoLoad: true, 
		root: 'data',
		fields: [
		{ name: "kdpt", mapping: "kdpt" }
		, { name: "nmpt", mapping: "nmpt" }
		, { name: "kota", mapping: "kota" }
		]
	});
	//--Program Studi
	var ds_prodi = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'data_controller/get_prodi ',
			method: 'POST'
		}),
		autoLoad: true, 
		root: 'data',
		fields: [
		{ name: "kdprodi", mapping: "kdprodi" }
		, { name: "nmprodi", mapping: "nmprodi" }
		, { name: "nomor", mapping: "nomor" }
		]
	});
	//-- Dosen / Promotor
	var ds_dosen = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'data_controller/get_dosen ',
			method: 'POST'
		}),
		autoLoad: true, 
		root: 'data',
		fields: [
		{ name: "iddosen", mapping: "iddosen" }
		, { name: "nmdosen", mapping: "nmdosen" }
		]
	});


// FUNCTIONs
function getDataSource(idLook) {	
	var dataSource;
	switch(idLook){
		case lu_mhs:
			dataSource = ds_mhs;
			break;
		case lu_kota:
			dataSource = ds_kota;
			break;
		case lu_prov:
			dataSource = ds_prov;
			break;
		case lu_univ:
			dataSource = ds_univ;
			break;
		case lu_prodi:
			dataSource = ds_prodi;
			break;
		case lu_dosen:
			dataSource = ds_dosen;
			break;
	};
	return dataSource;
};
function getColumnModel(idLook) {	
	var columnModel;
	switch(idLook){
		case lu_mhs:
			columnModel = cm_mhs;
			break;
		case lu_kota:
			columnModel = cm_kota;
			break;
		case lu_prov:
			columnModel = cm_prov;
			break;
		case lu_univ:
			columnModel = cm_univ;
			break;
		case lu_prodi:
			columnModel = cm_prodi;
			break;
		case lu_dosen:
			columnModel = cm_dosen;
			break;
	};
	return columnModel; //.slice(start || 0, finish);
};
// get grid prop: DataSource & ColumnModel, Height, Width
function getGridProperties(idLook) {	
	var columnModel;
	var dataSource;
	var getCode; var getName;
	var gHeight; var gWidth;
	
	switch(idLook){
		case lu_mhs:
			dataSource = ds_mhs;
			columnModel = cm_mhs;
			getCode = 'nim'; getName = 'nmmhs';
			gHeight = 350; gWidth = 720;
			break;
		case lu_kota:
			dataSource = ds_kota();
			columnModel = cm_kota;
			getCode = 'kdkota'; getName = 'nmkota';
			gHeight = 300; gWidth = 500;
			break;
		case lu_prov:
			dataSource = ds_prov;
			columnModel = cm_prov;
			getCode = 'kdprov'; getName = 'nmprov';
			gHeight = 300; gWidth = 500;
			break;
		case lu_univ:
			dataSource = ds_univ;
			columnModel = cm_univ;
			getCode = 'kdpt'; getName = 'nmpt';
			gHeight = 300; gWidth = 500;
			break;
		case lu_prodi:
			dataSource = ds_prodi;
			columnModel = cm_prodi;
			getCode = 'kdprodi'; getName = 'nmprodi';
			gHeight = 300; gWidth = 500;
			break;
		case lu_dosen:
			dataSource = ds_dosen
			columnModel = cm_dosen;
			getCode = 'iddosen'; getName = 'nmdosen';
			gHeight = 300; gWidth = 500;
			break;
	};
	
	var ds_cm_array = new Array();	
	ds_cm_array[idDS] = dataSource;
	ds_cm_array[idCM] = columnModel;
	ds_cm_array[idGetCode] = getCode;
	ds_cm_array[idGetName] = getName;
	ds_cm_array[idHeight] = gHeight;
	ds_cm_array[idWidth] = gWidth;
	
	return ds_cm_array; 
};

// LOOK-UP
//function wLookup(idLook, vtitle, idCode, idName){
	/*idLook dari constant
	* vtitle: judul
	* idCode: id textfield kode yg akan di set, jika '0', maka di-pass
	* idName: id textfield nama yg akan di set, jika '0', maka di-pass
	*/
	//Grid Search (for Plugin)
	var gSearch = [new Ext.ux.grid.Search({
		iconCls: 'btn_search', minChars: 1, width: 200,
		autoFocus: true, autoHeight: true,
		position: 'top', mode: 'local', //'remote',		
	})];
	// Paging (for placement in bottom bar)
	var paging = new Ext.PagingToolbar({
        store: getGridProperties(idLook)[idDS], 
		pageSize: 30, displayInfo: false, mode: 'local',
        //displayMsg: 'Baris {0} sampai {1} dari {2}',
        emptyMsg: 'No data to display'
    });
	//Grid Panel
	var lookGridPanel = new Ext.grid.GridPanel({
		ds: getGridProperties(idLook)[idDS], //getDataSource(idLook),
		cm: getGridProperties(idLook)[idCM], //getColumnModel(idLook),
		sm: sm_common,
		view: gv_common,
		height: getGridProperties(idLook)[idHeight], //300,
		width: getGridProperties(idLook)[idWidth], //500,
		plugins: gSearch,
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
		anchorSize: {
			width: getGridProperties(idLook)[idWidth], //400,
			height: getGridProperties(idLook)[idHeight], //300
		},
		tbar: [{hidden:true,
			text: 'Print',
			iconCls: 'silk-printer',			
		}, '->'],
		/*// Belum terdefinisi di versi < 4
		dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom'//,
            //store: getDataSource(idLook)
        })],*/
		bbar: paging,
		listeners: {
			rowdblclick: selectRow
		}
	});
			
	var win_lookup = new Ext.Window({
		title: vtitle, 
		modal: true, //width:200, height:200
		items: [lookGridPanel]
	}).show();
	
	function selectRow(grid, rowIdx) {
		var rec = getGridProperties(idLook)[idDS].getAt(rowIdx);
		var kode = getGridProperties(idLook)[idGetCode];
		var nama = getGridProperties(idLook)[idGetName];
		var kdval = rec.data[kode]; 
		var nmval = rec.data[nama]; 
		if(idCode != '0') {
			//Ext.getCmp(idCode).focus();
			Ext.getCmp(idCode).setValue(kdval);
		}
		if(idName != '0') {
			//Ext.getCmp(idName).focus();
			Ext.getCmp(idName).setValue(nmval);
		}
		win_lookup.close();		
	}
};

