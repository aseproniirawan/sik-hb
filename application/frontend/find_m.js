function find_x(vtitle, jab, i_mx) {
	if (jab == 1) {
		var ds_1 = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
				url: BASE_URL + 'get_images/get_photox ',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'images',
			fields: ['name', 'url',
			{
				name: 'size',
				type: 'float'
			},
			{
				name: 'lastmod',
				type: 'date',
				dateFormat: 'timestamp'
			}, 'thumb_url', 'nama_produk', 'harga', 'deskripsi']
		});
		var cm_1 = new Ext.grid.ColumnModel([{
			header: 'Nama',
			dataIndex: 'name',
			width: 300
		}, ]);
		var sm_1 = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_1 = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_1 = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_1,
			displayInfo: true,
			displayMsg: 'Data Gambar Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_1 = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_1 = new Ext.grid.GridPanel({
			ds: ds_1,
			cm: cm_1,
			sm: sm_1,
			view: vw_1,
			height: 350,
			width: 400,
			plugins: cari_1,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			buttonAlign: 'left',
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: paging_1,
			listeners: {
				rowdblclick: klik2kali
			}
		});
		var win_find_1 = new Ext.Window({
			title: vtitle,
			modal: true,
			items: [grid_find_1]
		}).show();
	} else if (jab == 2) {
		var ds_2 = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
                                url: BASE_URL + 'menu_controller/gridS_menu',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'data',
			fields: [{
                                name: 'kdmenu',
                                mapping: 'kdmenu'
                        },
                        {
                                name: 'nmmenu',
                                mapping: 'nmmenu'
                        }]
		});
		var cm_2 = new Ext.grid.ColumnModel([
                    {
                        hidden:true,
			header: 'Kode Menu',
			dataIndex: 'kdmenu',
			width: 30
                    },{
			header: 'Nama Menu',
			dataIndex: 'nmmenu',
			width: 300
                    }
                ]);
		var sm_2 = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_2 = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_2 = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_2,
			displayInfo: true,
			displayMsg: 'Data Menu Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_2 = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_2 = new Ext.grid.GridPanel({
			ds: ds_2,
			cm: cm_2,
			sm: sm_2,
			view: vw_2,
			height: 350,
			width: 400,
			plugins: cari_2,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			buttonAlign: 'left',
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: paging_2,
			listeners: {
				rowdblclick: klik2kali
			}
		});
		var win_find_2 = new Ext.Window({
			title: vtitle,
			modal: true,
			items: [grid_find_2]
		}).show();
	} 
	else if (jab == 3) {
		var ds_3 = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
                                url: BASE_URL + 'c_utility/g_PG',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'data',
			fields: [{
                                name: 'userid',
                                mapping: 'userid'
                        },
                        {
                                name: 'nmlengkap',
                                mapping: 'nmlengkap'
                        },
                        {
                                name: 'idstatus',
                                mapping: 'idstatus'
                        }]
		});
		var cm_3 = new Ext.grid.ColumnModel([
                    {
                      //  hidden:true,
			header: 'User ID',
			dataIndex: 'userid',
			width: 115
                    },{
			header: 'Nama Lengkap',
			dataIndex: 'nmlengkap',
			width: 200
                    },{
			header: 'Status',
			dataIndex: 'idstatus',
			width: 80
                    }
                ]);
		var sm_3 = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_3 = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_3 = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_3,
			displayInfo: true,
			displayMsg: 'Data Pengguna Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_3 = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_3 = new Ext.grid.GridPanel({
			ds: ds_3,
			cm: cm_3,
			sm: sm_3,
			view: vw_3,
			height: 350,
			width: 400,
			plugins: cari_3,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			buttonAlign: 'left',
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: paging_3,
			listeners: {
				rowdblclick: klik2kali
			}
		});
		var win_find_3 = new Ext.Window({
			title: vtitle,
			modal: true,
			items: [grid_find_3]
		}).show();
	}else if (jab == 4) {
		var ds_4 = new Ext.data.JsonStore({
			proxy: new Ext.data.HttpProxy({
                                url: BASE_URL + 'brgmedis_controller/get_brgmedis',
				method: 'POST'
			}),
			autoLoad: true,
			root: 'data',
			fields: [{
                                name: 'kdbrg',
                                mapping: 'kdbrg'
                        },
                        {
                                name: 'nmbrg',
                                mapping: 'nmbrg'
                        }]
		});
		var cm_4 = new Ext.grid.ColumnModel([
                    {
                      //  hidden:true,
			header: 'Kode Barang',
			dataIndex: 'kdbrg',
			width: 115
                    },{
			header: 'Nama Barang',
			dataIndex: 'nmbrg',
			width: 200
                    }
                ]);
		var sm_4 = new Ext.grid.RowSelectionModel({
			singleSelect: true
		});
		var vw_4 = new Ext.grid.GridView({
			emptyText: '< Belum ada Data >'
		});
		var paging_4 = new Ext.PagingToolbar({
			pageSize: 50,
			store: ds_4,
			displayInfo: true,
			displayMsg: 'Data Barang Dari {0} - {1} of {2}',
			emptyMsg: 'No data to display'
		});
		var cari_4 = [new Ext.ux.grid.Search({
			iconCls: 'btn_search',
			minChars: 1,
			autoFocus: true,
			position: 'top',
			mode: 'local',
			width: 200
		})];
		var grid_find_4 = new Ext.grid.GridPanel({
			ds: ds_4,
			cm: cm_4,
			sm: sm_4,
			view: vw_4,
			height: 350,
			width: 400,
			plugins: cari_4,
			autoSizeColumns: true,
			enableColumnResize: true,
			enableColumnHide: false,
			enableColumnMove: false,
			enableHdaccess: false,
			columnLines: true,
			loadMask: true,
			buttonAlign: 'left',
			layout: 'anchor',
			anchorSize: {
				width: 400,
				height: 400
			},
			tbar: [],
			bbar: paging_4,
			listeners: {
				rowdblclick: klik2kali
			}
		});
		var win_find_4 = new Ext.Window({
			title: vtitle,
			modal: true,
			items: [grid_find_4]
		}).show();
	}
        
	function klik2kali(grid, rowIdx) {
		                
		switch (jab) {
		case 1:
                        var rec_1 = ds_1.getAt(rowIdx);
			var var_1 = rec_1.data["name"];
			Ext.getCmp('file_gambar').focus()
			Ext.getCmp("file_gambar").setValue(var_1);
                        win_find_1.close();
			break;
                case 2:
                        var rec_2 = ds_2.getAt(rowIdx);
			//var var_21 = rec_2.data["kdmenu"];
			var var_22 = rec_2.data["nmmenu"];
                        
			Ext.getCmp('submenu').focus()
			Ext.getCmp("submenu").setValue(var_22);
                        win_find_2.close();
			break;
                case 3:
                        var rec_3 = ds_3.getAt(rowIdx);
			var var_31 = rec_3.data["nmlengkap"];
			
			Ext.getCmp('pengguna').focus()
			Ext.getCmp("pengguna").setValue(var_31);
                        win_find_3.close();
			break;
				case 4:
                        var rec_4 = ds_4.getAt(rowIdx);
			var var_41 = rec_4.data["kdbrg"];
			var var_42 = rec_4.data["nmbrg"];
			
			//Ext.getCmp('pengguna').focus()
			Ext.getCmp("kdbrg").setValue(var_41);
			Ext.getCmp("nmbrg").setValue(var_42);
                        win_find_4.close();
			break;
		
      		default:
			break;
		}
		
//                if (jab == 6) {
//			win_find6.close();
//		} 
	}
}