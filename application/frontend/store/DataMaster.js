// Utility
//=======================================================
	function dm_kelompoksetting(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'kelompoksetting_controller/get_klpsetting', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idklpsetting',
				mapping: 'idklpsetting'
			},{
				name: 'kdklpsetting',
				mapping: 'kdklpsetting'
			},
			{
				name: 'nmklpsetting',
				mapping: 'nmklpsetting'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_setting(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'setting_controller/get_setting',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idset',
				mapping: 'idset'
			},{
				name: 'idklpsetting',
				mapping: 'idklpsetting'
			},{
				name: 'nmklpsetting',
				mapping: 'nmklpsetting'
			},{
				name: 'kdset',
				mapping: 'kdset'
			},{
				name: 'nmset',
				mapping: 'nmset'
			},{
				name: 'ketset',
				mapping: 'ketset'
			},{
				name: 'nilai',
				mapping: 'nilai'
			},{
				name: 'nourut',
				mapping: 'nourut'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_status(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'status_controller/get_status',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'data',
			fields: [
				{ name: "idstatus", mapping: "idstatus" },
				{ name: "nmstatus", mapping: "nmstatus" }
			]
		});
		return master;
	}

// Master Kelompok
//=======================================================
	function dm_hari(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'hari_controller/get_hari', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhari',
				mapping: 'idhari'
			},{
				name: 'kdhari',
				mapping: 'kdhari'
			},
			{
				name: 'nmhari',
				mapping: 'nmhari'
			}]
		});
		return master;
	}
	
//=======================================================
function dm_statusKartuRM(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'status_controller/getStatusKartuRM',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
					name: 'idstkrm',
					mapping: 'idstkrm'
				},{
					name: 'nmstkrm',
					mapping: 'nmstkrm'
				}]
		});
		return master;
	}

//=======================================================
	function dm_shift(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'shift_controller/get_shift', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'kdshift',
				mapping: 'kdshift'
			},
			{
				name: 'nmshift',
				mapping: 'nmshift'
			},
			{
				name: 'darijam',
				mapping: 'darijam'
			},
			{
				name: 'sampaijam',
				mapping: 'sampaijam'
			}]
		});
		return master;
	}
	
//======================================================
	function dm_lvlbagian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'lvlbagian_controller/get_lvlbagian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idlvlbagian',
				mapping: 'idlvlbagian'
			},{
				name: 'kdlvlbagian',
				mapping: 'kdlvlbagian'
			},
			{
				name: 'nmlvlbagian',
				mapping: 'nmlvlbagian'
			}]
		});
		return master;
	}
	
//======================================================
	function dm_bdgrawat(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bdgperawatan_controller/get_bdgperawatan',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbdgrawat',
				mapping: 'idbdgrawat'
			},{
				name: 'kdbdgrawat',
				mapping: 'kdbdgrawat'
			},
			{
				name: 'nmbdgrawat',
				mapping: 'nmbdgrawat'
			}]
		});
		return master;
	}

//======================================================
	function dm_spdokter(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'spdokter_controller/get_spdokter',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idspesialisasi',
				mapping: 'idspesialisasi'
			},{
				name: 'kdspesialisasi',
				mapping: 'kdspesialisasi'
			},
			{
				name: 'nmspesialisasi',
				mapping: 'nmspesialisasi'
			}]
		});
		return master;
	}
	
//======================================================
	function dm_stdokter(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stsdokter_controller/get_stdokter',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstdokter',
				mapping: 'idstdokter'
			},{
				name: 'kdstdokter',
				mapping: 'kdstdokter'
			},
			{
				name: 'nmstdokter',
				mapping: 'nmstdokter'
			}]
		});
		return master;
	}
	
//======================================================
	function dm_jampraktek(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jampraktek_controller/get_jampraktek', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjampraktek',
				mapping: 'idjampraktek'
			},{
				name: 'kdjampraktek',
				mapping: 'kdjampraktek'
			},
			{
				name: 'nmjampraktek',
				mapping: 'nmjampraktek'
			}]
		});
		return master;
	}

//=======================================================
	function dm_klstarif(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'klstarif_controller/get_klstarif',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idklstarif',
				mapping: 'idklstarif'
			},{
				name: 'kdklstarif',
				mapping: 'kdklstarif'
			},
			{
				name: 'nmklstarif',
				mapping: 'nmklstarif'
			}]
		});
		return master;
	}
	
//=======================================================	
	function dm_klsrawat(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'klsperawatan_controller/get_klsperawatan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idklsrawat',
				mapping: 'idklsrawat'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'idklstarif',
				mapping: 'idklstarif'
			},{
				name: 'nmklstarif',
				mapping: 'nmklstarif'
			},{
				name: 'kdklsrawat',
				mapping: 'kdklsrawat'
			},{
				name: 'nmklsrawat',
				mapping: 'nmklsrawat'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_bagianklsperawatan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'klsperawatan_controller/get_bagianklsperawatan',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idbdgrawat',
				mapping: 'idbdgrawat'
			},{
				name: 'nmbdgrawat',
				mapping: 'nmbdgrawat'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jpenjamin(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jpenjamin_controller/get_jpenjamin', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnspenjamin',
				mapping: 'idjnspenjamin'
			},{
				name: 'kdjnspenjamin',
				mapping: 'kdjnspenjamin'
			},
			{
				name: 'nmjnspenjamin',
				mapping: 'nmjnspenjamin'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_hubkeluarga(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'hubkeluarga_controller/get_hubkeluarga', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhubkeluarga',
				mapping: 'idhubkeluarga'
			},{
				name: 'kdhubkeluarga',
				mapping: 'kdhubkeluarga'
			},
			{
				name: 'nmhubkeluarga',
				mapping: 'nmhubkeluarga'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_pekerjaan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'pekerjaan_controller/get_pekerjaan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idpekerjaan',
				mapping: 'idpekerjaan'
			},{
				name: 'kdpekerjaan',
				mapping: 'kdpekerjaan'
			},
			{
				name: 'nmpekerjaan',
				mapping: 'nmpekerjaan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_pendidikan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'pendidikan_controller/get_pendidikan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idpendidikan',
				mapping: 'idpendidikan'
			},{
				name: 'kdpendidikan',
				mapping: 'kdpendidikan'
			},
			{
				name: 'nmpendidikan',
				mapping: 'nmpendidikan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_agama(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'agama_controller/get_agama', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idagama',
				mapping: 'idagama'
			},{
				name: 'kdagama',
				mapping: 'kdagama'
			},
			{
				name: 'nmagama',
				mapping: 'nmagama'
			}]
		});
		return master;
	}
	
//=======================================================
        function dm_jkas(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jkas_controller/get_jkas', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnskas',
				mapping: 'idjnskas'
			},{
				name: 'kdjnskas',
				mapping: 'kdjnskas'
			},
			{
				name: 'nmjnskas',
				mapping: 'nmjnskas'
			}]
		});
		return master;
	}
//=======================================================
        function dm_jkuitansi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jkuitansi_controller/get_jkuitansi', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnskuitansi',
				mapping: 'idjnskuitansi'
			},{
				name: 'kdjnskuitansi',
				mapping: 'kdjnskuitansi'
			},{
				name: 'nmjnskuitansi',
				mapping: 'nmjnskuitansi'
			},{
				name: 'idjnskas',
				mapping: 'idjnskas'
			},{
				name: 'nmjnskas',
				mapping: 'nmjnskas'
			}]
		});
		return master;
	}
//=======================================================
	function dm_sukubangsa(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'sukubangsa_controller/get_sukubangsa', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idsukubangsa',
				mapping: 'idsukubangsa'
			},{
				name: 'kdsukubangsa',
				mapping: 'kdsukubangsa'
			},
			{
				name: 'nmsukubangsa',
				mapping: 'nmsukubangsa'
			}]
		});
		return master;
	}

//=======================================================
	function dm_caradatang(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'caradatang_controller/get_caradatang', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idcaradatang',
				mapping: 'idcaradatang'
			},{
				name: 'kdcaradatang',
				mapping: 'kdcaradatang'
			},
			{
				name: 'nmcaradatang',
				mapping: 'nmcaradatang'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_klpbarang(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'klpbarang_controller/get_klpbarang', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idklpbrg',
				mapping: 'idklpbrg'
			},{
				name: 'kdklpbarang',
				mapping: 'kdklpbarang'
			},
			{
				name: 'nmklpbarang',
				mapping: 'nmklpbarang'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jnsbrg(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jbarang_controller/get_jbarang', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnsbrg',
				mapping: 'idjnsbrg'
			},{
				name: 'kdjnsbrg',
				mapping: 'kdjnsbrg'
			},
			{
				name: 'nmjnsbrg',
				mapping: 'nmjnsbrg'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_dosis(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'dosis_controller/get_dosis', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'iddosis',
				mapping: 'iddosis'
			},{
				name: 'kddosis',
				mapping: 'kddosis'
			},
			{
				name: 'nmdosis',
				mapping: 'nmdosis'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_aturanpakai(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'aturanpakai_controller/get_aturanpakai', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idaturanpakai',
				mapping: 'idaturanpakai'
			},{
				name: 'kdaturanpakai',
				mapping: 'kdaturanpakai'
			},
			{
				name: 'nmaturanpakai',
				mapping: 'nmaturanpakai'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_goldarah(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'goldarah_controller/get_goldarah', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idgoldarah',
				mapping: 'idgoldarah'
			},{
				name: 'kdgoldarah',
				mapping: 'kdgoldarah'
			},
			{
				name: 'nmgoldarah',
				mapping: 'nmgoldarah'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stkawin(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'stkawin_controller/get_stkawin', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstkawin',
				mapping: 'idstkawin'
			},{
				name: 'kdstkawin',
				mapping: 'kdstkawin'
			},
			{
				name: 'nmstkawin',
				mapping: 'nmstkawin'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jidentitas(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jidentitas_controller/get_jnsidentitas', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnsidentitas',
				mapping: 'idjnsidentitas'
			},{
				name: 'kdjnsidentitas',
				mapping: 'kdjnsidentitas'
			},
			{
				name: 'nmjnsidentitas',
				mapping: 'nmjnsidentitas'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stpasien(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'stspasien_controller/get_stpasien', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstpasien',
				mapping: 'idstpasien'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'kdstpasien',
				mapping: 'kdstpasien'
			},{
				name: 'nmstpasien',
				mapping: 'nmstpasien'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jkelamin(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jkelamin_controller/get_jnskelamin', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'kdjnskelamin',
				mapping: 'kdjnskelamin'
			},
			{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jpelayanan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jpelayanan_controller/get_jpelayanan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'kdjnspelayanan',
				mapping: 'kdjnspelayanan'
			},
			{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stpelayanan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'stpelayanan_controller/get_stpelayanan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstpelayanan',
				mapping: 'idstpelayanan'
			},{
				name: 'kdstpelayanan',
				mapping: 'kdstpelayanan'
			},
			{
				name: 'nmstpelayanan',
				mapping: 'nmstpelayanan'
			}]
		});
		return master;
	}

//=======================================================
	function dm_lvldaerah(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'lvldaerah_controller/get_lvldaerah',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idlvldaerah',
				mapping: 'idlvldaerah'
			},{
				name: 'kdlvldaerah',
				mapping: 'kdlvldaerah'
			},
			{
				name: 'nmlvldaerah',
				mapping: 'nmlvldaerah'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jsatuan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'Jsatuan_controller/get_jsatuan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'kdsatuan',
				mapping: 'kdsatuan'
			},
			{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			}]
		});
		return master;
	}
	

//=======================================================
	function dm_jpenyakit(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jpenyakit_controller/get_jpenyakit', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnspenyakit',
				mapping: 'idjnspenyakit'
			},{
				name: 'kdjnspenyakit',
				mapping: 'kdjnspenyakit'
			},
			{
				name: 'nmjnspenyakit',
				mapping: 'nmjnspenyakit'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_kebangsaan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'kebangsaan_controller/get_kebangsaan', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idkebangsaan',
				mapping: 'idkebangsaan'
			},{
				name: 'kdkebangsaan',
				mapping: 'kdkebangsaan'
			},
			{
				name: 'nmkebangsaan',
				mapping: 'nmkebangsaan'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_jorder(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jorder_controller/get_jorder', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnsorder',
				mapping: 'idjnsorder'
			},{
				name: 'kdjnsorder',
				mapping: 'kdjnsorder'
			},
			{
				name: 'nmjnsorder',
				mapping: 'nmjnsorder'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_stpo(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'stpo_controller/get_stpo', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstpo',
				mapping: 'idstpo'
			},{
				name: 'kdstpo',
				mapping: 'kdstpo'
			},
			{
				name: 'nmstpo',
				mapping: 'nmstpo'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_matauang(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'matauang_controller/get_matauang', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'kdmatauang',
				mapping: 'kdmatauang'
			},
			{
				name: 'nmmatauang',
				mapping: 'nmmatauang'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_wnegara(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'wnegara_controller/get_wnegara', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idwn',
				mapping: 'idwn'
			},{
				name: 'kdwn',
				mapping: 'kdwn'
			},
			{
				name: 'nmwn',
				mapping: 'nmwn'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_extrabed(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'extrabed_controller/get_extrabed', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idextrabed',
				mapping: 'idextrabed'
			},{
				name: 'kdextrabed',
				mapping: 'kdextrabed'
			},
			{
				name: 'nmextrabed',
				mapping: 'nmextrabed'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stbed(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'stbed_controller/get_stbed', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstbed',
				mapping: 'idstbed'
			},{
				name: 'kdstbed',
				mapping: 'kdstbed'
			},
			{
				name: 'nmstbed',
				mapping: 'nmstbed'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jpembayaran(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jpembayaran_controller/get_jpembayaran', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnspembayaran',
				mapping: 'idjnspembayaran'
			},{
				name: 'kdjnspembayaran',
				mapping: 'kdjnspembayaran'
			},
			{
				name: 'nmjnspembayaran',
				mapping: 'nmjnspembayaran'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_sypembayaran(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'sypembayaran_controller/get_sypembayaran', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idsypembayaran',
				mapping: 'idsypembayaran'
			},{
				name: 'kdsypembayaran',
				mapping: 'kdsypembayaran'
			},
			{
				name: 'nmsypembayaran',
				mapping: 'nmsypembayaran'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jlibur(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'jlibur_controller/get_jlibur', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnslibur',
				mapping: 'idjnslibur'
			},{
				name: 'kdjnslibur',
				mapping: 'kdjnslibur'
			},
			{
				name: 'nmjnslibur',
				mapping: 'nmjnslibur'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jtarif(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'jtarif_controller/get_jtarif',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnstarif',
				mapping: 'idjnstarif'
			},{
				name: 'kdjnstarif',
				mapping: 'kdjnstarif'
			},{
				name: 'nmjnstarif',
				mapping: 'nmjnstarif'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_sttransaksi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'sttransaksi_controller/get_sttransaksi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idsttransaksi',
				mapping: 'idsttransaksi'
			},{
				name: 'kdsttransaksi',
				mapping: 'kdsttransaksi'
			},{
				name: 'nmsttransaksi',
				mapping: 'nmsttransaksi'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_carabayar(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'carabayar_controller/get_carabayar',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idcarabayar',
				mapping: 'idcarabayar'
			},{
				name: 'kdcarabayar',
				mapping: 'kdcarabayar'
			},{
				name: 'nmcarabayar',
				mapping: 'nmcarabayar'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stbypass(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stbypass_controller/get_stbypass',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstbypass',
				mapping: 'idstbypass'
			},{
				name: 'kdstbypass',
				mapping: 'kdstbypass'
			},{
				name: 'nmstbypass',
				mapping: 'nmstbypass'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stdokterrawat(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stdokterrawat_controller/get_stdokterrawat',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstdokterrawat',
				mapping: 'idstdokterrawat'
			},{
				name: 'kdstdokterrawat',
				mapping: 'kdstdokterrawat'
			},{
				name: 'nmstdokterrawat',
				mapping: 'nmstdokterrawat'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stpublish(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stpublish_controller/get_stpublish',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstpublish',
				mapping: 'idstpublish'
			},{
				name: 'kdstpublish',
				mapping: 'kdstpublish'
			},{
				name: 'nmstpublish',
				mapping: 'nmstpublish'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stregistrasi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stregistrasi_controller/get_stregistrasi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstregistrasi',
				mapping: 'idstregistrasi'
			},{
				name: 'kdstregistrasi',
				mapping: 'kdstregistrasi'
			},{
				name: 'nmstregistrasi',
				mapping: 'nmstregistrasi'
			}]
		});
		return master;
	}	
	
//=======================================================
	function dm_stposisipasien(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stposisipasien_controller/get_stposisipasien',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstposisipasien',
				mapping: 'idstposisipasien'
			},{
				name: 'kdstposisipasien',
				mapping: 'kdstposisipasien'
			},{
				name: 'nmstposisipasien',
				mapping: 'nmstposisipasien'
			}]
		});
		return master;
	}	
	
//=======================================================
	function dm_stkrm(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stkrm_controller/get_stkrm',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstkrm',
				mapping: 'idstkrm'
			},{
				name: 'kdstkrm',
				mapping: 'kdstkrm'
			},{
				name: 'nmstkrm',
				mapping: 'nmstkrm'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_tahun(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'tahun_controller/get_tahun',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'tahun',
				mapping: 'tahun'
			}]
		});
		return master;
	}

//=======================================================
	function dm_bulan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bulan_controller/get_bulan',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nmbulan',
				mapping: 'nmbulan'
			},{
				name:'kdbulan',
				mapping: 'kdbulan'
			}]
		});
		return master;
	}

//=======================================================
	function dm_jnstransaksi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'jtransaksi_controller/get_jnstransaksi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnstransaksi',
				mapping: 'idjnstransaksi'
			},{
				name: 'kdjnstransaksi',
				mapping: 'kdjnstransaksi'
			},{
				name: 'nmjnstransaksi',
				mapping: 'nmjnstransaksi'
			}]
		});
		return master;
	}	
	
//=======================================================
	function dm_stsetuju(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stpersetujuan_controller/get_stpersetujuan',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstsetuju',
				mapping: 'idstsetuju'
			},{
				name: 'kdstsetuju',
				mapping: 'kdstsetuju'
			},{
				name: 'nmstsetuju',
				mapping: 'nmstsetuju'
			}]
		});
		return master;
	}
		
//=======================================================
	function dm_stperpembelian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stperpembelian_controller/get_stperpembelian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstpp',
				mapping: 'idstpp'
			},{
				name: 'kdstpp',
				mapping: 'kdstpp'
			},{
				name: 'nmstpp',
				mapping: 'nmstpp'
			}]
		});
		return master;
	}
		
//=======================================================
	function dm_jperpembelian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'jperpembelian_controller/get_jperpembelian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnspp',
				mapping: 'idjnspp'
			},{
				name: 'kdjnspp',
				mapping: 'kdjnspp'
			},{
				name: 'nmjnspp',
				mapping: 'nmjnspp'
			}]
		});
		return master;
	}
			
//=======================================================
	function dm_stdiskon(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'stdiskon_controller/get_stdiskon',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstdiskon',
				mapping: 'idstdiskon'
			},{
				name: 'kdstdiskon',
				mapping: 'kdstdiskon'
			},{
				name: 'nmstdiskon',
				mapping: 'nmstdiskon'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_stkasir(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bukakasir_controller/get_stkasir',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idstkasir',
				mapping: 'idstkasir'
			},{
				name: 'kdstkasir',
				mapping: 'kdstkasir'
			},{
				name: 'nmstkasir',
				mapping: 'nmstkasir'
			}]
		});
		return master;
	}
	
//Master Data
//=======================================================
	function dm_daerah(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'daerah_controller/get_daerah', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'iddaerah',
				mapping: 'iddaerah'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'dae_iddaerah',
				mapping: 'dae_iddaerah'
			},{
				name: 'idlvldaerah',
				mapping: 'idlvldaerah'
			},{
				name: 'nmlvldaerah',
				mapping: 'nmlvldaerah'
			},{
				name: 'kddaerah',
				mapping: 'kddaerah'
			},
			{
				name: 'nmdaerah',
				mapping: 'nmdaerah'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_bagian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bagian_controller/get_bagian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'idlvlbagian',
				mapping: 'idlvlbagian'
			},{
				name: 'nmlvlbagian',
				mapping: 'nmlvlbagian'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idbdgrawat',
				mapping: 'idbdgrawat'
			},{
				name: 'nmbdgrawat',
				mapping: 'nmbdgrawat'
			},{
				name: 'kdbagian',
				mapping: 'kdbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'bag_idbagian',
				mapping: 'bag_idbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_bagianrjriugd(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bagian_controller/get_bagianrjriugd',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'idlvlbagian',
				mapping: 'idlvlbagian'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'idbdgrawat',
				mapping: 'idbdgrawat'
			},{
				name: 'kdbagian',
				mapping: 'kdbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'bag_idbagian',
				mapping: 'bag_idbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_bagianClean(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bagian_controller/getBagianClean',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'idlvlbagian',
				mapping: 'idlvlbagian'
			},{
				name: 'nmlvlbagian',
				mapping: 'nmlvlbagian'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idbdgrawat',
				mapping: 'idbdgrawat'
			},{
				name: 'nmbdgrawat',
				mapping: 'nmbdgrawat'
			},{
				name: 'kdbagian',
				mapping: 'kdbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'bag_idbagian',
				mapping: 'bag_idbagian'
			}]
		});
		return master;
	}
//=======================================================
	function dm_kmrbagian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bagian_controller/get_kmrbagian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_bagianri(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bagian_controller/get_bagianri',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'idlvlbagian',
				mapping: 'idlvlbagian'
			},{
				name: 'nmlvlbagian',
				mapping: 'nmlvlbagian'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idbdgrawat',
				mapping: 'idbdgrawat'
			},{
				name: 'nmbdgrawat',
				mapping: 'nmbdgrawat'
			},{
				name: 'kdbagian',
				mapping: 'kdbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'bag_idbagian',
				mapping: 'bag_idbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_kamar(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'kamar_controller/get_kamar',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idkamar',
				mapping: 'idkamar'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'kdkamar',
				mapping: 'kdkamar'
			},{
				name: 'nmkamar',
				mapping: 'nmkamar'
			},{
				name: 'fasilitas',
				mapping: 'fasilitas'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_kamarbagian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'kamar_controller/get_kamarbag',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idkamar',
				mapping: 'idkamar'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'kdkamar',
				mapping: 'kdkamar'
			},{
				name: 'nmkamar',
				mapping: 'nmkamar'
			},{
				name: 'fasilitas',
				mapping: 'fasilitas'
			},{
				name: 'nmbed',
				mapping: 'nmbed'
			}]
		});
		return master;
	}

//=======================================================
	function dm_cbkamardibed(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'kamar_controller/get_cbkamardibed',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idkamar',
				mapping: 'idkamar'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'kdkamar',
				mapping: 'kdkamar'
			},{
				name: 'nmkamar',
				mapping: 'nmkamar'
			},{
				name: 'rperawatan_kamar',
				mapping: 'rperawatan_kamar'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_bed(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bed_controller/get_bed',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idkamar',
				mapping: 'idkamar'
			},{
				name: 'nmkamar',
				mapping: 'nmkamar'
			},{
				name: 'rperawatan_kamar',
				mapping: 'rperawatan_kamar'
			},{
				name: 'idbed',
				mapping: 'idbed'
			},{
				name: 'kdbed',
				mapping: 'kdbed'
			},{
				name: 'nmbed',
				mapping: 'nmbed'
			},{
				name: 'idextrabed',
				mapping: 'idextrabed'
			},{
				name: 'nmextrabed',
				mapping: 'nmextrabed'
			},{
				name: 'idstbed',
				mapping: 'idstbed'
			},{
				name: 'nmstbed',
				mapping: 'nmstbed'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_dokter(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'dokter_controller/get_dokter',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'kddokter',
				mapping: 'kddokter'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'tptlahir',
				mapping: 'tptlahir'
			},{
				name: 'tgllahir',
				mapping: 'tgllahir'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'idspesialisasi',
				mapping: 'idspesialisasi'
			},{
				name: 'nmspesialisasi',
				mapping: 'nmspesialisasi'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			},{
				name: 'idstdokter',
				mapping: 'idstdokter'
			},{
				name: 'nmstdokter',
				mapping: 'nmstdokter'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_dokterri(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'dokter_controller/get_dokterri',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'kddokter',
				mapping: 'kddokter'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'tptlahir',
				mapping: 'tptlahir'
			},{
				name: 'tgllahir',
				mapping: 'tgllahir'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'idspesialisasi',
				mapping: 'idspesialisasi'
			},{
				name: 'nmspesialisasi',
				mapping: 'nmspesialisasi'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			},{
				name: 'idstdokter',
				mapping: 'idstdokter'
			},{
				name: 'nmstdokter',
				mapping: 'nmstdokter'
			},{
				name: 'catatan',
				mapping: 'catatan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_perawat(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'perawat_controller/get_perawat',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idperawat',
				mapping: 'idperawat'
			},{
				name: 'kdperawat',
				mapping: 'kdperawat'
			},{
				name: 'nmperawat',
				mapping: 'nmperawat'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_reservasix(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'reservasi_controller/get_reservasi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idreservasi',
				mapping: 'idreservasi'
			},{
				name: 'tglreservasi',
				mapping: 'tglreservasi'
			},{
				name: 'jamreservasi',
				mapping: 'jamreservasi'
			},{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'norm',
				mapping: 'rnorm'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'email',
				mapping: 'email'
			},{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'idstreservasi',
				mapping: 'idstreservasi'
			},{
				name: 'idregdet',
				mapping: 'idregdet'
			},{
				name: 'noantrian',
				mapping: 'noantrian'
			},{
				name: 'userinput',
				mapping: 'userinput'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			},{
				name: 'idstposisipasien',
				mapping: 'idstposisipasien'
			},{
				name: 'jamreg',
				mapping: 'jamreg'
			},{
				name: 'tglreg',
				mapping: 'tglreg'
			},{
				name: 'noreg',
				mapping: 'noreg'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'nmstpasien',
				mapping: 'nmstpasien'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'tinggibadan',
				mapping: 'tinggibadan'
			},{
				name: 'beratbadan',
				mapping: 'beratbadan'
			},{
				name: 'nmstregistrasi',
				mapping: 'nmstregistrasi'
			},{
				name: 'keluhan',
				mapping: 'keluhan'
			},{
				name: 'umurtahun',
				mapping: 'umurtahun'
			},{
				name: 'umurbulan',
				mapping: 'umurbulan'
			},{
				name: 'umurhari',
				mapping: 'umurhari'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'alergi',
				mapping: 'alergi'
			},{
				name: 'systole',
				mapping: 'systole'
			},{
				name: 'diastole',
				mapping: 'diastole'
			},{
				name: 'nmstposisipasien',
				mapping: 'nmstposisipasien'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_bank(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'bank_controller/get_bank', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbank',
				mapping: 'idbank'
			},{
				name: 'kdbank',
				mapping: 'kdbank'
			},{
				name: 'nmbank',
				mapping: 'nmbank'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_penjamin(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'penjamin_controller/get_penjamin',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'kdpenjamin',
				mapping: 'kdpenjamin'
			},{
				name: 'nmpenjamin',
				mapping: 'nmpenjamin'
			},{
				name: 'idjnspenjamin',
				mapping: 'idjnspenjamin'
			},{
				name: 'nmjnspenjamin',
				mapping: 'nmjnspenjamin'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nofax',
				mapping: 'nofax'
			},{
				name: 'email',
				mapping: 'email'
			},{
				name: 'website',
				mapping: 'website'
			},{
				name: 'nmcp',
				mapping: 'nmcp'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'tglawal',
				mapping: 'tglawal'
			},{
				name: 'tglakhir',
				mapping: 'tglakhir'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			},{
				name: 'infoumum',
				mapping: 'infoumum'
			},{
				name: 'inforj',
				mapping: 'inforj'
			},{
				name: 'infori',
				mapping: 'infori'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_penyakit(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'penyakit_controller/get_penyakit',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idpenyakit',
				mapping: 'idpenyakit'
			},{
				name: 'kdpenyakit',
				mapping: 'kdpenyakit'
			},{
				name: 'nmpenyakit',
				mapping: 'nmpenyakit'
			},{
				name: 'nmpenyakiteng',
				mapping: 'nmpenyakiteng'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'pen_idpenyakit',
				mapping: 'pen_idpenyakit'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_tbmedis(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'tbmedis_controller/get_tbmedis',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idmarginbrg',
				mapping: 'idmarginbrg'
			},{
				name: 'idjnsbrg',
				mapping: 'idjnsbrg'
			},{
				name: 'nmjnsbrg',
				mapping: 'nmjnsbrg'
			},{
				name: 'margin',
				mapping: 'margin'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_pabrik(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'pabrik_controller/get_pabrik', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idpabrik',
				mapping: 'idpabrik'
			},{
				name: 'kdpabrik',
				mapping: 'kdpabrik'
			},{
				name: 'nmpabrik',
				mapping: 'nmpabrik'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_brgmedis(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'brgmedis_controller/get_brgmedis',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'idklpbrg',
				mapping: 'idklpbrg'
			},{
				name: 'nmklpbarang',
				mapping: 'nmklpbarang'
			},{
				name: 'idjnsbrg',
				mapping: 'idjnsbrg'
			},{
				name: 'nmjnsbrg',
				mapping: 'nmjnsbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'idsatuankcl',
				mapping: 'idsatuankcl'
			},{
				name: 'nmsatuankcl',
				mapping: 'nmsatuankcl'
			},{
				name: 'rasio',
				mapping: 'rasio'
			},{
				name: 'idsatuanbsr',
				mapping: 'idsatuanbsr'
			},{
				name: 'nmsatuanbsr',
				mapping: 'nmsatuanbsr'
			},{
				name: 'hrgavg',
				mapping: 'hrgavg'
			},{
				name: 'hrgbeli',
				mapping: 'hrgbeli'
			},{
				name: 'idpabrik',
				mapping: 'idpabrik'
			},{
				name: 'nmpabrik',
				mapping: 'nmpabrik'
			},{
				name: 'stokmin',
				mapping: 'stokmin'
			},{
				name: 'stokmax',
				mapping: 'stokmax'
			},{
				name: 'gambar',
				mapping: 'gambar'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			},{
				name: 'userinput',
				mapping: 'userinput'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_lokasi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'lokasi_controller/get_lokasi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idlokasi',
				mapping: 'idlokasi'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'kdlokasi',
				mapping: 'kdlokasi'
			},{
				name: 'nmlokasi',
				mapping: 'nmlokasi'
			}]
		});
		return master;
	}
	
//=========================================================
	function dm_jhirarki(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'jhirarki_controller/gridM_hierarki',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [
			{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},
			{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},
			{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_pelayanan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'pelayanan_controller/get_pelayanan',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'kdpelayanan',
				mapping: 'kdpelayanan'
			},{
				name: 'nourut',
				mapping: 'nourut'
			},{
				name: 'nmpelayanan',
				mapping: 'nmpelayanan'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			},{
				name: 'pel_kdpelayanan',
				mapping: 'pel_kdpelayanan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_kdpelayanan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'pelayanan_controller/get_pelayanantotpumum_nonumum',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'kdpelayanan',
				mapping: 'kdpelayanan'
			},{
				name: 'nmpelayanan',
				mapping: 'nmpelayanan'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idjnshirarki',
				mapping: 'idjnshirarki'
			},{
				name: 'nmjnshirarki',
				mapping: 'nmjnshirarki'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_tpumum(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'tpumum_controller/get_tpumum',
				method: 'POST'
			}),
			baseParams:{
				key:'0'
			},
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'tarif.idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'tarif.kdpelayanan',
				mapping: 'zzz'
			},{
				name: 'nmpelayanan',
				mapping: 'nmpelayanan'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'tarif.idklstarif',
				mapping: 'xxx'
			},{
				name: 'nmklstarif',
				mapping: 'nmklstarif'
			},{
				name: 'tarifjs',
				mapping: 'tarifjs'
			},{
				name: 'tarifjm',
				mapping: 'tarifjm'
			},{
				name: 'tarifjp',
				mapping: 'tarifjp'
			},{
				name: 'tarifbhp',
				mapping: 'tarifbhp'
			},{
				name: 'total',
				mapping: 'total'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_tpnonumum(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'tpnonumum_controller/get_tpnonumum',
				method: 'POST'
			}),
			baseParams:{
				key:'0'
			},
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'tarif.idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'tarif.kdpelayanan',
				mapping: 'zzz'
			},{
				name: 'nmpelayanan',
				mapping: 'nmpelayanan'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'tarif.idklstarif',
				mapping: 'xxx'
			},{
				name: 'nmklstarif',
				mapping: 'nmklstarif'
			},{
				name: 'tarifjs',
				mapping: 'tarifjs'
			},{
				name: 'tarifjm',
				mapping: 'tarifjm'
			},{
				name: 'tarifjp',
				mapping: 'tarifjp'
			},{
				name: 'tarifbhp',
				mapping: 'tarifbhp'
			},{
				name: 'total',
				mapping: 'total'
			}]
		});
		return master;
	}
	
//===========================================================
	function dm_idpenjamin(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'penjamin_controller/get_idpenjamin',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'kdpenjamin',
				mapping: 'kdpenjamin'
			},{
				name: 'nmpenjamin',
				mapping: 'nmpenjamin'
			}]
		});
		return master;
	}
	
//=======================================================	
	function dm_masterpaket(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'masterpaket_controller/get_masterpaket', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idtarifpaket',
				mapping: 'idtarifpaket'
			},{
				name: 'kdpaket',
				mapping: 'kdpaket'
			},{
				name: 'namapaket',
				mapping: 'namapaket'
			},{
				name: 'idklstarif',
				mapping: 'idklstarif'
			},{
				name: 'nmklstarif',
				mapping: 'nmklstarif'
			},{
				name: 'nmpaket',
				mapping: 'nmpaket'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_tppelayanan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'tppelayanan_controller/get_tppelayanan',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idtarifpaketdet',
				mapping: 'idtarifpaketdet'
			},{
				name: 'kdtarif',
				mapping: 'kdtarif'
			},{
				name: 'idjnstarif',
				mapping: 'idjnstarif'
			},{
				name: 'kdjnstarif',
				mapping: 'kdjnstarif'
			},{
				name: 'idtarifpaket',
				mapping: 'idtarifpaket'
			},{
				name: 'nmpaket',
				mapping: 'nmpaket'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'qty',
				mapping: 'qty'
			},{
				name: 'tarifjs',
				mapping: 'tarifjs'
			},{
				name: 'tarifjm',
				mapping: 'tarifjm'
			},{
				name: 'tarifjp',
				mapping: 'tarifjp'
			},{
				name: 'tarifbhp',
				mapping: 'tarifbhp'
			},{
				name: 'total',
				mapping: 'total'
			}]
		});
		return master;
	}
	
//=======================================================	
	function dm_tarifpaketdet(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'tarifpaketdet_controller/get_tarifpaketdet', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idtarifpaketdet',
				mapping: 'idtarifpaketdet'
			},{
				name: 'nmitem',
				mapping: 'nmitem'
			},{
				name: 'kdtarif',
				mapping: 'kdtarif'
			},{
				name: 'idjnstarif',
				mapping: 'idjnstarif'
			},{
				name: 'idtarifpaket',
				mapping: 'idtarifpaket'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'qty',
				mapping: 'qty'
			},{
				name: 'tarifjs',
				mapping: 'tarifjs'
			},{
				name: 'tarifjm',
				mapping: 'tarifjm'
			},{
				name: 'tarifjp',
				mapping: 'tarifjp'
			},{
				name: 'tarifbhp',
				mapping: 'tarifbhp'
			},{
				name: 'ttltarif',
				mapping: 'ttltarif'
			}]
		});
		return master;
	}
	
//=======================================================	
	function dm_nota(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'nota_controller/get_nota', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nonota',
				mapping: 'nonota'
			},{
				name: 'nmitem',
				mapping: 'nmitem'
			},{
				name: 'nona',
				mapping: 'nona'
			},{
				name: 'tglnota',
				mapping: 'tglnota'
			},{
				name: 'jamnota',
				mapping: 'jamnota'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'idsttransaksi',
				mapping: 'idsttransaksi'
			},{
				name: 'nokuitansi',
				mapping: 'nokuitansi'
			},{
				name: 'idregdet',
				mapping: 'idregdet'
			},{
				name: 'noorder',
				mapping: 'noorder'
			},{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'noresep',
				mapping: 'noresep'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'diskon',
				mapping: 'diskon'
			},{
				name: 'uangr',
				mapping: 'uangr'
			},{
				name: 'userinput',
				mapping: 'userinput'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			},{
				name: 'idregdettransfer',
				mapping: 'idregdettransfer'
			},{
				name: 'idnotadet',
				mapping: 'idnotadet'
			},{
				name: 'kditem',
				mapping: 'kditem'
			},{
				name: 'idjnstarif',
				mapping: 'idjnstarif'
			},{
				name: 'kdresep',
				mapping: 'kdresep'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'qty',
				mapping: 'qty'
			},{
				name: 'tarifjs',
				mapping: 'tarifjs'
			},{
				name: 'tarifjm',
				mapping: 'tarifjm'
			},{
				name: 'tarifjp',
				mapping: 'tarifjp'
			},{
				name: 'tarifbhp',
				mapping: 'tarifbhp'
			},{
				name: 'diskonjs',
				mapping: 'diskonjs'
			},{
				name: 'diskonjm',
				mapping: 'diskonjm'
			},{
				name: 'diskonjp',
				mapping: 'diskonjp'
			},{
				name: 'diskonbhp',
				mapping: 'diskonbhp'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'idperawat',
				mapping: 'idperawat'
			},{
				name: 'nmperawat',
				mapping: 'nmperawat'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'idstbypass',
				mapping: 'idstbypass'
			},{
				name: 'tarif',
				mapping: 'tarif'
			},{
				name: 'total',
				mapping: 'total'
			},{
				name: 'ctotal',
				mapping: 'ctotal'
			},{
				name: 'idtarifpaketdet',
				mapping: 'idtarifpaketdet'
			}]
		});
		return master;
	}
	
//=======================================================	
	function dm_notax(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'nota_controller/get_notax', 
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nonota',
				mapping: 'nonota'
			},{
				name: 'nona',
				mapping: 'nona'
			},{
				name: 'tglnota',
				mapping: 'tglnota'
			},{
				name: 'jamnota',
				mapping: 'jamnota'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'idsttransaksi',
				mapping: 'idsttransaksi'
			},{
				name: 'nokuitansi',
				mapping: 'nokuitansi'
			},{
				name: 'idregdet',
				mapping: 'idregdet'
			},{
				name: 'noorder',
				mapping: 'noorder'
			},{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'noresep',
				mapping: 'noresep'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'diskon',
				mapping: 'diskon'
			},{
				name: 'uangr',
				mapping: 'uangr'
			},{
				name: 'userinput',
				mapping: 'userinput'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			},{
				name: 'idregdettransfer',
				mapping: 'idregdettransfer'
			},{
				name: 'norm',
				mapping: 'norm'
			},{
				name: 'noreg',
				mapping: 'noreg'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'nmpenjamin',
				mapping: 'nmpenjamin'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			}]
		});
		return master;
	}
		
//=======================================================
	function dm_supplier(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'supplier_controller/get_supplier',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'tgldaftar',
				mapping: 'tgldaftar'
			},{
				name: 'nmsupplier',
				mapping: 'nmsupplier'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nofax',
				mapping: 'nofax'
			},{
				name: 'email',
				mapping: 'email'
			},{
				name: 'website',
				mapping: 'website'
			},{
				name: 'kontakperson',
				mapping: 'kontakperson'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'npwp',
				mapping: 'npwp'
			},{
				name: 'idbank',
				mapping: 'idbank'
			},{
				name: 'nmbank',
				mapping: 'nmbank'
			},{
				name: 'norek',
				mapping: 'norek'
			},{
				name: 'atasnama',
				mapping: 'atasnama'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			},{
				name: 'idstatus',
				mapping: 'idstatus'
			},{
				name: 'nmstatus',
				mapping: 'nmstatus'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			}]
		});
		return master;
	}
	
//Master Pengaturan
//=======================================================
	function dm_brgbagian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'brgbagian_controller/get_brgbagian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'stoknowbagian',
				mapping: 'stoknowbagian'
			},{
				name: 'stokminbagian',
				mapping: 'stokminbagian'
			},{
				name: 'stokmaxbagian',
				mapping: 'stokmaxbagian'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_hlibur(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'hlibur_controller/get_hlibur',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idlibur',
				mapping: 'idlibur'
			},{
				name: 'idjnslibur',
				mapping: 'idjnslibur'
			},{
				name: 'nmjnslibur',
				mapping: 'nmjnslibur'
			},{
				name: 'tgllibur',
				mapping: 'tgllibur'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jadwalpraktek(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'jadwalpraktek_controller/get_jadwalpraktek',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjadwalpraktek',
				mapping: 'idjadwalpraktek'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'idhari',
				mapping: 'idhari'
			},{
				name: 'nmhari',
				mapping: 'nmhari'
			},{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'nmshift',
				mapping: 'nmshift'
			},{
				name: 'jampraktek',
				mapping: 'jampraktek'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jadwalprakteknow(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'jadwalpraktek_controller/getNmHari',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjadwalpraktek',
				mapping: 'idjadwalpraktek'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'idhari',
				mapping: 'idhari'
			},{
				name: 'nmhari',
				mapping: 'nmhari'
			},{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'jampraktek',
				mapping: 'jampraktek'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			}]
		});
		return master;
	}

//Pusat Informasi
//=======================================================
	function dm_inputinformasi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'inputinformasi_controller/get_inputinformasi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idinfo',
				mapping: 'idinfo'
			},{
				name: 'tglinfo',
				mapping: 'tglinfo'
			},{
				name: 'judul',
				mapping: 'judul'
			},{
				name: 'deskripsi',
				mapping: 'deskripsi'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'nmlengkap',
				mapping: 'nmlengkap'
			},{
				name: 'idstpublish',
				mapping: 'idstpublish'
			},{
				name: 'nmstpublish',
				mapping: 'nmstpublish'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_infojpraktekdokter(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'infojpraktekdokter_controller/get_infojpraktekdokter',
				method: 'POST'
			}),
			baseParams:{
				key:'0'
			},
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjadwalpraktek',
				mapping: 'idjadwalpraktek'
			},{
				name: 'idshift',
				mapping: 'idshift'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'iddokter',
				mapping: 'iddokter'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'senin',
				mapping: 'senin'
			},{
				name: 'selasa',
				mapping: 'selasa'
			},{
				name: 'rabu',
				mapping: 'rabu'
			},{
				name: 'kamis',
				mapping: 'kamis'
			},{
				name: 'jumat',
				mapping: 'jumat'
			},{
				name: 'sabtu',
				mapping: 'sabtu'
			},{
				name: 'minggu',
				mapping: 'minggu'
			},{
				name: 'catatan',
				mapping: 'catatan'
			}]
		});
		return master;
	}

//=======================================================
	var reader = new Ext.data.JsonReader({
		root:'data',
		idProperty: '',
		totalProperty: 'results',
		remoteGroup: true,
		fields: [ 
		{ name: 'nmbagian' }
		, { name: 'nmkamar' } 
		, { name: 'nmbed' }
		, { name: 'nmstbed' }
		, { name: 'noreg' }
		, { name: 'tglmasuk' }
		, { name: 'jammasuk' }
		, { name: 'norm' }
		, { name: 'nmpasien' }
		, { name: 'kdjnskelamin' }
		, { name: 'Umur' }
		]
	});
	
	function dm_infobed(){
		var master = new Ext.data.GroupingStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'infobed_controller/get_infobed',
				method: 'POST',
			}),
			baseParams:{
				key:'0'
			},			
			reader: reader,
			groupField:'nmbagian',		
			remoteSort: true,
		});
		return master;
	}
	
//=======================================================
	var arr_cari = [
		['nmbagian', 'Ruangan'],
		['nmkamar', 'Kamar'],
		['nmbed', 'Bed'],
		['nmstbed', 'Status Bed'],
		['noreg', 'No. Registrasi (REG)'],
		['tglmasuk', 'Tanggal Masuk'],
		['jammasuk', 'Jam Masuk'],
		['norm', 'No. Rekam Medis (RM)'],
		['nmpasien', 'Nama Pasien'],
		['kdjnskelamin', 'Jenis Kelamin'],
		['Umur', 'Umur'],
	];
	
	function dm_cmbinfobed(){
		var master = new Ext.data.ArrayStore({
			fields: ['id', 'name'],
			data : arr_cari 
		});
		return master;
	}

//Transaksi
//=======================================================
	function dm_pasien(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'pasien_controller/get_pasien',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'norm',
				mapping: 'norm'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'idstkawin',
				mapping: 'idstkawin'
			},{
				name: 'alamat',
				mapping: 'alamat'
			},{
				name: 'idwn',
				mapping: 'idwn'
			},{
				name: 'iddaerah',
				mapping: 'iddaerah'
			},{
				name: 'nmdaerah',
				mapping: 'nmdaerah'
			},{
				name: 'notelp',
				mapping: 'notelp'
			},{
				name: 'nohp',
				mapping: 'nohp'
			},{
				name: 'tptlahir',
				mapping: 'tptlahir'
			},{
				name: 'tgllahir',
				mapping: 'tgllahir'
			},{
				name: 'nmibu',
				mapping: 'nmibu'
			},{
				name: 'idpekerjaan',
				mapping: 'idpekerjaan'
			},{
				name: 'idagama',
				mapping: 'idagama'
			},{
				name: 'noidentitas',
				mapping: 'noidentitas'
			},{
				name: 'idgoldarah',
				mapping: 'idgoldarah'
			},{
				name: 'idpendidikan',
				mapping: 'idpendidikan'
			},{
				name: 'idsukubangsa',
				mapping: 'idsukubangsa'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'negara',
				mapping: 'negara'
			},{
				name: 'alergi',
				mapping: 'alergi'
			},{
				name: 'idstpelayanan',
				mapping: 'idstpelayanan'
			},{
				name: 'tgldaftar',
				mapping: 'tgldaftar'
			}]
		});
		return master;
	}
	
//======================================================= 
	function dm_registrasi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'registrasi_controller/get_registrasi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'registrasi.noreg',
				mapping: 'zzz'
			},{
				name: 'registrasi.idregdet',
				mapping: 'idregdet'
			},{
				name: 'norm',
				mapping: 'norm'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'pasien.alamat',
				mapping: 'xxx'
			},{
				name: 'idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'idstpasien',
				mapping: 'idstpasien'
			},{
				name: 'keluhan',
				mapping: 'keluhan'
			},{
				name: 'tglrencanakeluar',
				mapping: 'tglrencanakeluar'
			},{
				name: 'catatanrencanakeluar',
				mapping: 'catatanrencanakeluar'
			},{
				name: 'nmkerabat',
				mapping: 'nmkerabat'
			},{
				name: 'notelpkerabat',
				mapping: 'notelpkerabat'
			},{
				name: 'umurtahun',
				mapping: 'umurtahun'
			},{
				name: 'umurbulan',
				mapping: 'umurbulan'
			},{
				name: 'umurhari',
				mapping: 'umurhari'
			},{
				name: 'idcaradatang',
				mapping: 'idcaradatang'
			},{
				name: 'nmpenjamin',
				mapping: 'nmpenjamin'
			},{
				name: 'idbagiankirim',
				mapping: 'idbagiankirim'
			},{
				name: 'nmdokterkirim',
				mapping: 'nmdokterkirim'
			},{
				name: 'keluhan',
				mapping: 'keluhan'
			},{
				name: 'nmklsrawat',
				mapping: 'nmklsrawat'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'nmkamar',
				mapping: 'nmkamar'
			},{
				name: 'kdkamar',
				mapping: 'kdkamar'
			},{
				name: 'idkamar',
				mapping: 'idkamar'
			},{
				name: 'nmbed',
				mapping: 'nmbed'
			},{
				name: 'idstbed',
				mapping: 'idstbed'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'nmkerabat',
				mapping: 'nmkerabat'
			},{
				name: 'notelpkerabat',
				mapping: 'notelpkerabat'
			},{
				name: 'idhubkeluarga',
				mapping: 'idhubkeluarga'
			},{
				name: 'catatanreg',
				mapping: 'catatanreg'
			},{
				name:'klsrawat.kdklsrawat',
				mapping:'kelastarif'

			},{
				name:'idklsrawat',
				mapping: 'idklsrawat'
			},{
				name: 'idklstarif',
				mapping: 'idklstarif'
			},{
				name:'idregdet',
				mapping: 'idregdet'
			}]
		});
		return master;
	}
	
//=======================================================

	function dm_po(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'purchaseorder_controller/get_po',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nopo',
				mapping: 'nopo',
			},{
				name: 'tglpo',
				mapping: 'tglpo'
			},{
				name: 'idjnspp',
				mapping: 'idjnspp'
			},{
				name: 'nopp',
				mapping: 'nopp'
			},{
				name: 'tglpp',
				mapping: 'tglpp'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'idsypembayaran',
				mapping: 'idsypembayaran'
			},{
				name: 'idjnspembayaran',
				mapping: 'idjnspembayaran'
			},{
				name: 'tglpengiriman',
				mapping: 'tglpengiriman'
			},{
				name: 'idstpo',
				mapping: 'idstpo'
			},{
				name: 'idstsetuju',
				mapping: 'idstsetuju'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'bpb',
				mapping: 'bpb'
			},{
				name: 'ketpo',
				mapping: 'ketpo'
			},{
				name: 'iddiskon',
				mapping: 'iddiskon'
			},{
				name: 'diskon',
				mapping: 'diskon'
			},{
				name: 'ppnrp',
				mapping: 'ppnrp'
			},{
				name: 'totalpo',
				mapping: 'totalpo'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			},{
				name: 'approval1',
				mapping: 'approval1'
			},{
				name: 'approval2',
				mapping: 'approval2'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'qty',
				mapping: 'qty'
			},{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			}]
			});
		return master;
	}
	
//=======================================================


//======================================================= 
	function dm_vregistrasi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url : BASE_URL + 'vregistrasi_controller/get_vregistrasi',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'noreg',
				mapping: 'noreg'
			},{
				name: 'idregdet',
				mapping: 'idregdet'
			},{
				name: 'tglreg',
				mapping: 'tglreg'
			},{
				name: 'jamreg',
				mapping: 'jamreg'
			},{
				name: 'norm',
				mapping: 'norm'
			},{
				name: 'nmpasien',
				mapping: 'nmpasien'
			},{
				name: 'nmjnskelamin',
				mapping: 'nmjnskelamin'
			},{
				name: 'alamatp',
				mapping: 'alamatp'
			},{
				name: 'idpenjamin',
				mapping: 'idpenjamin'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'idjnspelayanan',
				mapping: 'idjnspelayanan'
			},{
				name: 'nmjnspelayanan',
				mapping: 'nmjnspelayanan'
			},{
				name: 'idstpasien',
				mapping: 'idstpasien'
			},{
				name: 'keluhan',
				mapping: 'keluhan'
			},{
				name: 'tglrencanakeluar',
				mapping: 'tglrencanakeluar'
			},{
				name: 'catatanrencanakeluar',
				mapping: 'catatanrencanakeluar'
			},{
				name: 'catatanr',
				mapping: 'catatanr'
			},{
				name: 'nmkerabat',
				mapping: 'nmkerabat'
			},{
				name: 'notelpkerabat',
				mapping: 'notelpkerabat'
			},{
				name: 'umurtahun',
				mapping: 'umurtahun'
			},{
				name: 'umurbulan',
				mapping: 'umurbulan'
			},{
				name: 'umurhari',
				mapping: 'umurhari'
			},{
				name: 'idcaradatang',
				mapping: 'idcaradatang'
			},{
				name: 'nmpenjamin',
				mapping: 'nmpenjamin'
			},{
				name: 'idbagiankirim',
				mapping: 'idbagiankirim'
			},{
				name: 'nmbagiankirim',
				mapping: 'nmbagiankirim'
			},{
				name: 'nmdokterkirim',
				mapping: 'nmdokterkirim'
			},{
				name: 'nmdokterkirimdlm',
				mapping: 'nmdokterkirimdlm'
			},{
				name: 'nmklsrawat',
				mapping: 'nmklsrawat'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'nmkamar',
				mapping: 'nmkamar'
			},{
				name: 'kdkamar',
				mapping: 'kdkamar'
			},{
				name: 'idkamar',
				mapping: 'idkamar'
			},{
				name: 'nmbed',
				mapping: 'nmbed'
			},{
				name: 'idstbed',
				mapping: 'idstbed'
			},{
				name: 'nmdokter',
				mapping: 'nmdokter'
			},{
				name: 'nmdoktergelar',
				mapping: 'nmdoktergelar'
			},{
				name: 'idhubkeluarga',
				mapping: 'idhubkeluarga'
			},{
				name:'idklsrawat',
				mapping: 'idklsrawat'
			},{
				name:'nonota',
				mapping: 'nonota'
			},{
				name: 'idklstarif',
				mapping: 'idklstarif'
			},{
				name: 'nmdaerah',
				mapping: 'nmdaerah'
			},{
				name: 'noantrian',
				mapping: 'noantrian'
			},{
				name: 'nmcaradatang',
				mapping: 'nmcaradatang'
			},{
				name: 'nmstposisipasien',
				mapping: 'nmstposisipasien'
			}]
		});
		return master;
	}


//=======================================================
	function dm_grid(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'c_utility/g_MN',
				method: 'POST'
			}),
			root: 'data',
			totalProperty: 'results',
			autoLoad: true,
			fields: [{
				name: "idmenu",
				mapping: "idmenu"
			},{
				name: "kdmenu",
				mapping: "kdmenu"
			},
			{
				name: "nmmenu",
				mapping: "nmmenu"
			},
			{
				name: "deskripsi",
				mapping: "deskripsi"
			},
			{
				name: "nmjnshirarki",
				mapping: "nmjnshirarki"
			},
			{
				name: "nmstatus",
				mapping: "nmstatus"
			},
			{
				name: "nmsubmenu",
				mapping: "nmsubmenu"
			}, //
			{
				name: "url",
				mapping: "url"
			}, //
			{
				name: "gambar",
				mapping: "gambar"
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_gridotoritas(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'menu_controller/g_OT',
				method: 'POST'
			}),
			root: 'data',
			totalProperty: 'results',
			autoLoad: true,
			fields: [{
				name: "kdmenu",
				mapping: "kdmenu"
			},
			{
				name: "nmmenu",
				mapping: "nmmenu"
			},
			{
				name: "deskripsi",
				mapping: "deskripsi"
			},
			{
				name: "idjnshirarki",
				mapping: "idjnshirarki"
			},
			{
				name: "idstatus",
				mapping: "idstatus"
			},
			{
				name: "men_idmenu",
				mapping: "men_idmenu"
			},
			{
				name: "user_aktif",
				mapping: "user_aktif",
				type: 'bool'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jdashboard(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'jdashboard_controller/gridM_dash',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnsdashboard',
				mapping: 'idjnsdashboard'
			},{
				name: 'kdjnsdashboard',
				mapping: 'kdjnsdashboard'
			},
			{
				name: 'nmjnsdashboard',
				mapping: 'nmjnsdashboard'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_klppengguna(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'klppengguna_controller/g_JKP',
				method: 'POST'
			}),
			root: 'data',
			totalProperty: 'results',
			autoLoad: true,
			fields: [{
				name: "idklppengguna",
				mapping: "idklppengguna"
			},{
				name: "kdklppengguna",
				mapping: "kdklppengguna"
			},
			{
				name: "nmklppengguna",
				mapping: "nmklppengguna"
			},
			{
				name: "deskripsi",
				mapping: "deskripsi"
			},
			{
				name: "idjnsdashboard",
				mapping: "idjnsdashboard"
			},
			{
				name: "idstatus",
				mapping: "idstatus"
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jpengguna(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'jpengguna_controller/grid_jpengguna',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idjnspengguna',
				mapping: 'idjnspengguna'
			},
			{
				name: 'kdjnspengguna',
				mapping: 'kdjnspengguna'
			},
			{
				name: 'nmjnspengguna',
				mapping: 'nmjnspengguna'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_pengguna(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'pengguna_controller/get_pengguna',
				method: 'POST'
			}),
			root: 'data',
			totalProperty: 'results',
			autoLoad: true,
			fields: [{
				name: "userid",
				mapping: "userid"
			},
			{
				name: "password",
				mapping: "password"
			},
			{
				name: "nmlengkap",
				mapping: "nmlengkap"
			},
			{
				name: "email",
				mapping: "email"
			},
			{
				name: "nohp",
				mapping: "nohp"
			},
			{
				name: "noref",
				mapping: "noref"
			},
			{
				name: "idklppengguna",
				mapping: "idklppengguna"
			},
			{
				name: "nmklppengguna",
				mapping: "nmklppengguna"
			},
			{
				name: "idjnspengguna",
				mapping: "idjnspengguna"
			},
			{
				name: "nmjnspengguna",
				mapping: "nmjnspengguna"
			},
			{
				name: "foto",
				mapping: "foto"
			},
			{
				name: "idstatus",
				mapping: "idstatus"
			},
			{
				name: "nmstatus",
				mapping: "nmstatus"
			},
			{
				name: "tgldaftar",
				mapping: "tgldaftar"
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_logpengguna(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'loguser_controller/gridL_user',
				method: 'POST'
			}),
			baseParams: {},
			root: 'data',
			totalProperty: 'results',
			remoteSort: true,
			autoLoad: true,
			loadonce: false,
			fields: [{
				name: "idlog",
				mapping: "idlog"
			},
			{
				name: "userid",
				mapping: "userid"
			},
			{
				name: "tglmasuk",
				mapping: "tglmasuk"
			},
			{
				name: "tglkeluar",
				mapping: "tglkeluar"
			},
			{
				name: "ipaddress",
				mapping: "ipaddress"
			},
			{
				name: "idstatus",
				mapping: "idstatus"
			}]
		});
		return master;
	}
	
//=======================================================
function dm_carakeluar(){
	var master = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'jcarakeluar_controller/get_jcarakeluar',
				method: 'POST'
		}),
			baseParams: {},
			root: 'data',
			totalProperty: 'results',
			remoteSort: true,
			autoLoad: true,
			loadonce: false,
			fields: [{
				name: "idcarakeluar",
				mapping: 'idcarakeluar'
			},{
				name: "kdcarakeluar",
				mapping: 'kdcarakeluar'
			},{
				name: "nmcarakeluar",
				mapping: "nmcarakeluar",
			}]
	});
	return master;
}


//=======================================================

	function dm_stkeluar(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'stkeluar_controller/get_stkeluar',
				method: 'POST'
			}),
			baseParams: {},
			root: 'data',
			totalProperty: 'results',
			remoteSort: true,
			autoLoad: true,
			loadonce: false,
			fields: [{
				name: "idstkeluar",
				mapping: "idstkeluar"
			},{
				name: "kdstkeluar",
				mapping: "kdstkeluar"
			},{
				name: "nmstkeluar",
				mapping: "nmstkeluar"
			}]
		});
		return master;
	}
//=======================================================

	function dm_reservasi(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'reservasiRJ_controller/get_reservasi',
				method: 'POST'
			}),
			baseParams: {},
			root: 'data',
			totalProperty: 'results',
			remoteSort: true,
			autoLoad: true,
			loadonce: false,
			fields: [{
				name: "idreservasi",
				mapping: "idreservasi"
			},{
				name: "tglreservasi",
				mapping: "tglreservasi"
			},{
				name: "jamreservasi",
				mapping: "jamreservasi"
			},{
				name: "idshift",
				mapping: "idshift"
			},{
				name: "norm",
				mapping: "norm"
			},{
				name: "nmpasien",
				mapping: "nmpasien"
			},{
				name: "nohp",
				mapping: "nohp"
			},{
				name: "notelp",
				mapping: "notelp"
			},{
				name: "email",
				mapping : "email"
			},{
				name: "iddokter",
				mapping: "iddokter",
			},{
				name: "idbagian",
				mapping: "idbagian"
			},{
				name: "idstreservasi",
				mapping: "idstreservasi"
			},{
				name: "idregdet",
				mapping: "idregdet"
			},{
				name: "noantrian",
				mapping: "noantrian"
			},{
				name: "userinput",
				mapping: "userinput"
			},{
				name: "tglinput",
				mapping: "tglinput"
			},{
				name: "idstposisipasien",
				mapping: "idstposisipasien"
			},{
				name: "nmstreservasi",
				mapping: "nmstreservasi"
			},{
				name: 'namaposisipasien',
				mapping: 'namaposisipasien'
			}]
		});
		return master;
	}

//=======================================================
	function dm_dokterrawat(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'dokterygmerawat_controller/get_dokterrawat',
				method: 'POST'
			}),
			baseParams: {},
			root: 'data',
			totalProperty: 'results',
			remoteSort: true,
			autoLoad: true,
			loadonce: false,
			fields: [{
				name: "iddokterrawat",
				mapping: "iddokterrawat"
			},{
				name: "idregdet",
				mapping: "idregdet"
			},{
				name: "idstdokterrawat",
				mapping: "idstdokterrawat"
			},{
				name: "tglmulai",
				mapping: "tglmulai"
			},{
				name: "jammulai",
				mapping: "tglakhir"
			},{
				name: "tglakhir",
				mapping: "jamakhir"
			},{
				name: "diagnosa",
				mapping: "diagnosa"
			}]
		});
		return master;
	}
//=======================================================
	function dm_orderruangan(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'orderruangan_controller/get_orderRuangan',
				method: 'POST'
			}),
			baseParams: {},
			root: 'data',
			totalProperty: 'results',
			remoteSort: true,
			autoLoad: true,
			loadonce: false,
			fields: [{
				name: "nooruangan",
				mapping: "nooruangan"
			},
			{
				name: "tgloruangan",
				mapping: "tgloruangan"
			},
			{
				name: "jamoruangan",
				mapping: "jamoruangan"
			},
			{
				name: "idklsrawat",
				mapping: "idklsrawat"
			},
			{
				name: "idregdet",
				mapping: "idregdet"
			},
			{
				name: "userid",
				mapping: "userid"
			},
			{
				name: "idbagian",
				mapping: "idbagian"
			},
			{
				name: "idkamar",
				mapping: "idkamar"
			},
			{
				name: "idbed",
				mapping: "idbed"
			},
			{
				name: "idhubkeluarga",
				mapping: "idhubkeluarga"
			},
			{
				name: "idklstarif",
				mapping: "idklstarif"
			},
			{
				name: "tglrencanamasuk",
				mapping: "tglrencanamasuk"
			},
			{
				name: "jamrencanamasuk",
				mapping: "jamrencanamasuk"
			},
			{
				name: "nmkerabat",
				mapping: "nmkerabat"
			},
			{
				name: "alasanpindah",
				mapping: "alasanpindah"
			},
			{
				name: "catatan",
				mapping: "catatan"
			}]
		});
		return master;
	}
	
// Kasir
//=======================================================
	function dm_bukakasir(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bukakasir_controller/get_bukakasir',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nokasir',
				mapping: 'nokasir'
			},{
				name: 'idstkasir',
				mapping: 'idstkasir'
			},{
				name: 'nmstkasir',
				mapping: 'nmstkasir'
			},{
				name: 'idshiftbuka',
				mapping: 'idshiftbuka'
			},{
				name: 'nmshiftbuka',
				mapping: 'nmshiftbuka'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'tglbuka',
				mapping: 'tglbuka'
			},{
				name: 'jambuka',
				mapping: 'jambuka'
			},{
				name: 'saldoawal',
				mapping: 'saldoawal'
			},{
				name: 'catatanbuka',
				mapping: 'catatanbuka'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'nmlengkap',
				mapping: 'nmlengkap'
			}]
		});
		return master;
	}
	
	function dm_cbbagiandikasir(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'bukakasir_controller/get_cbbagiandikasir',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			}]
		});
		return master;
	}
	
// Persediaan pembelian
//=======================================================
	function dm_hbrgsupplier(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'hbrgsupplier_controller/get_hbrgsupplier',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'nmsupplier',
				mapping: 'nmsupplier'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'nmmatauang',
				mapping: 'nmmatauang'
			},{
				name: 'harga',
				mapping: 'harga'
			},{
				name: 'tglefektif',
				mapping: 'tglefektif'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'nmlengkap',
				mapping: 'nmlengkap'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			}]
		});
		return master;
	}
	
//=======================================================
function dm_hbrgsupplierx(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'hbrgsupplier_controller/get_hargabrng',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'nmsupplier',
				mapping: 'nmsupplier'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'nmmatauang',
				mapping: 'nmmatauang'
			},{
				name: 'harga',
				mapping: 'harga'
			},{
				name: 'tglefektif',
				mapping: 'tglefektif'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'nmlengkap',
				mapping: 'nmlengkap'
			},{
				name: 'tglinput',
				mapping: 'tglinput'
			}]
		});
		return master;
	}
//=======================================================
	function dm_pensupplier(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'pensupplier_controller/get_pensupplier',
				method: 'POST'
			}),
			baseParams:{
				key:'0'
			},
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nopp',
				mapping: 'nopp'
			},{
				name: 'tglpp',
				mapping: 'tglpp'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'idstsetuju',
				mapping: 'idstsetuju'
			},{
				name: 'nmstsetuju',
				mapping: 'nmstsetuju'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			}/* ,{
				name: 'keterangan',
				mapping: 'keterangan'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'nmlengkap',
				mapping: 'nmlengkap'
			} */]
		});
		return master;
	}
	
	function dm_pensupplierdet(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'pensupplier_controller/get_pensupplierdet',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nopp',
				mapping: 'nopp'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'qty',
				mapping: 'qty'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},,{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'nmsupplier',
				mapping: 'nmsupplier'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'nmmatauang',
				mapping: 'nmmatauang'
			},{
				name: 'harga',
				mapping: 'harga'
			}]
		});
		return master;
	}
	
	function dm_carihrgbrgsup(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'pensupplier_controller/get_carihrgbrgsup',
				method: 'POST'
			}),
			baseParams:{
				key:'0'
			},
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'nmsupplier',
				mapping: 'nmsupplier'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'nmmatauang',
				mapping: 'nmmatauang'
			},{
				name: 'harga',
				mapping: 'harga'
			},{
				name: 'tglefektif',
				mapping: 'tglefektif'
			},{
				name: 'nopp',
				mapping: 'nopp'
			}]
		});
		return master;
	}
	
// Persediaan logistik
//=======================================================
	function dm_perpembelian(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'perpembelian_controller/get_perpembelian',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nopp',
				mapping: 'nopp'
			},{
				name: 'tglpp',
				mapping: 'tglpp'
			},{
				name: 'idbagian',
				mapping: 'idbagian'
			},{
				name: 'nmbagian',
				mapping: 'nmbagian'
			},{
				name: 'idstsetuju',
				mapping: 'idstsetuju'
			},{
				name: 'nmstsetuju',
				mapping: 'nmstsetuju'
			},{
				name: 'keterangan',
				mapping: 'keterangan'
			},{
				name: 'userid',
				mapping: 'userid'
			},{
				name: 'nmlengkap',
				mapping: 'nmlengkap'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_perpembeliandet(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'perpembelian_controller/get_perpembeliandet',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'nopp',
				mapping: 'nopp'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'nmbrg',
				mapping: 'nmbrg'
			},{
				name: 'idsatuan',
				mapping: 'idsatuan'
			},{
				name: 'nmsatuan',
				mapping: 'nmsatuan'
			},{
				name: 'qty',
				mapping: 'qty'
			},{
				name: 'catatan',
				mapping: 'catatan'
			},{
				name: 'harga',
				mapping: 'harga'
			},{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'idstpp',
				mapping: 'idstpp'
			},{
				name: 'nmstpp',
				mapping: 'nmstpp'
			},{
				name: 'nopo',
				mapping: 'nopo'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_vtarifall(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'vtarifall_controller/get_vtarifall',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'kditem',
				mapping: 'kditem'
			},{
				name: 'nmitem',
				mapping: 'nmitem'
			},{
				name: 'klstarif',
				mapping: 'klstarif'
			},{
				name: 'satuankcl',
				mapping: 'satuankcl'
			},{
				name: 'satuanbsr',
				mapping: 'satuanbsr'
			},{
				name: 'harga',
				mapping: 'harga'
			},{
				name: 'tarifjs',
				mapping: 'tarifjs'
			},{
				name: 'tarifjm',
				mapping: 'tarifjm'
			},{
				name: 'tarifjp',
				mapping: 'tarifjp'
			},{
				name: 'tarifbhp',
				mapping: 'tarifbhp'
			},{
				name: 'ttltarif',
				mapping: 'ttltarif'
			}]
		});
		return master;
	}

//====================================================
	function dm_idhrgbrgsup(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'perpembelian_controller/get_idhrgbrgsup',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'h_termurah',
				mapping: 'h_termurah'
			},{
				name: 'tgl_muda',
				mapping: 'tgl_muda'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_idhrgbrgsup2(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'perpembelian_controller/get_idhrgbrgsup2',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idhrgbrgsup',
				mapping: 'idhrgbrgsup'
			},{
				name: 'kdsupplier',
				mapping: 'kdsupplier'
			},{
				name: 'kdbrg',
				mapping: 'kdbrg'
			},{
				name: 'idmatauang',
				mapping: 'idmatauang'
			},{
				name: 'harga',
				mapping: 'harga'
			},{
				name: 'tglefektif',
				mapping: 'tglefektif'
			}]
		});
		return master;
	}
	
//=======================================================
	function dm_jsbtnm(){
		var master = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
			url : BASE_URL + 'jsbtnm_controller/get_jsbtnm',
				method: 'POST'
			}),
			totalProperty: 'results',
			root: 'data',
			autoLoad: true,
			fields: [{
				name: 'idsbtnm',
				mapping: 'idsbtnm'
			},{
				name: 'idjnskelamin',
				mapping: 'idjnskelamin'
			},{
				name: 'kdsbtnm',
				mapping: 'kdsbtnm'
			},{
				name: 'nmsbtnm',
				mapping: 'nmsbtnm'
			},{
				name: 'dariumur',
				mapping: 'sampaiumur'
			}]
		});
		return master;
	}

	function dm_history(){
		var master = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'rekammedis_controller/getHistory',
			method: 'POST'
		}),
		params: {
			start: 0,
			limit: 50
		},
		root: 'data', 
		totalProperty: 'results',
		autoLoad: true,
		fields: [{
				name: "norm", mapping: "norm"
			},{
				name: "nmbagian", mapping: "nmbagian"
			},{
				name: "tglminta", mapping: "tglminta"
			},{
				name: "jamminta", mapping: "jamminta"
			},{
				name: "tglkeluar", mapping: "tglkeluar"
			},{
				name: "jamkeluar", mapping: "jamkeluar"
			},{
				name: "useridkeluar", mapping: "useridkeluar"
			},{
				name: "tglkembali", mapping: "tglkembali"
			},{
				name: "jamkembali", mapping: "jamkembali"
			},{
				name: "useridkembali", mapping: "useridkembali"
			}]
		});	
		return master;
	}
//=======================================================

	var data, x;
	var p;
	var tpl;
 
    function user_foto_thumbs(x){
           //    alert(x);
              tpl = new Ext.Template(
                                            "<img src='"+ BASE_PATH +"/resources/img/thumbs/t_user/"+ x + "' width='110' height='125'/>"
                                        );
                                        tpl.overwrite(p.body, data);
                                        p.body.highlight('#c3daf9', {block:true});
           
         //   return tpl; 
         }
	
	function user_foto_ori(x){
           //    alert(x);
              tpl = new Ext.Template(
                                            "<img src='"+ BASE_PATH +"/resources/img/ori/o_user/"+ x + "' width='110' height='125'/>"
                                        );
                                        tpl.overwrite(p.body, data);
                                        p.body.highlight('#c3daf9', {block:true});
           
         //   return tpl; 
         }
		 
	function isi_foto_icons(x){
           //    alert(x);
              tpl = new Ext.Template(
                                            "<img src='"+ BASE_PATH +"/resources/img/icons/"+ x + "' width='110' height='125'/>"
                                        );
                                        tpl.overwrite(p.body, data);
                                        p.body.highlight('#c3daf9', {block:true});
           
         //   return tpl; 
         }