function dashboard_mhs(){
	/** COMMON STORE*/
	var ds_stsmt = store_stsmt();
	/**===================*/
	//var fields_Tkehadiran = RH.storeFields('nim','kdprodi','kdstsemester','H','T','S','I','A','K');
	
	//FOR PANEL KEHADIRAN MHS
	var fields_kehadiran = RH.storeFields('nim','kdprodi','kdstsemester','nmstsmt','pkehadiran');
	var ds_kehadiran = RH.JsonStore({	
        url : BASE_URL + 'dashboard_controller/getS_kehadiranMhs', 
		fields : fields_kehadiran,
		params: [{key:'nim', id:'lu.nim-dashboard'}]
	});	
	
	//FOR PANEL KEHADIRAN per SEMESTER
	var fields_stabsensi_smt = RH.storeFields('nim','kdprodi','kdstsemester','kdstabsensimhs','nmstabsensimhs','jum');
	var ds_stabsensi_smt = RH.JsonStore({	
        url : BASE_URL + 'dashboard_controller/getS_stabsensiMhsSmt', //'dashboard_controller/getTableKehadiranMhs', 
		fields : fields_stabsensi_smt,
		params: [{key:'kdstsemester', id:'cb.stsemester'},{key:'nim', id:'lu.nim-dashboard'}]
	});	
	
	
	Ext.chart.Chart.CHART_URL = BASE_URL + 'resources/js/ext/resources/charts.swf';
	//RH.warning(BASE_URL + 'resources/js/ext/resources/charts.swf');return;
	/*
	var panel1 = new Ext.Panel({
        title: 'Grafik',
        width:400,
        height:300,
        layout:'fit',
        items: {
            xtype: 'linechart',
            store: ds_stabsensi_smt,
            xField: 'nmstabsensimhs',
            yField: 'jum',
			listeners: {
				itemclick: function(o){
					var rec = ds_stabsensi_smt.getAt(o.index);
					Ext.example.msg('Item Selected', 'You chose {0}.', rec.get('kdstabsensimhs'));
				}
			}
        }	
    });
	*/
	var panel3 = new Ext.Panel({
        width: 500,
        height: 300,
        title: 'Kehadiran Mahasiswa',
        tbar: [{
            text: 'Reload',
            handler: function(){
                ds_kehadiran.reload();
            }
        }],
        items: {
            xtype: 'columnchart',
            store: ds_kehadiran,
            yField: 'pkehadiran',
			//url: '../../resources/charts.swf',
            xField: 'nmstsmt',
            xAxis: new Ext.chart.CategoryAxis({
                title: 'Semester Akademik'
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: 'Persentase Kehadiran',
				orientation:'vertical'
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: -90
                }
            }
        }
    });
	var panel4 = new Ext.Panel({
        title: 'Kehadiran per Semester',
        width:400,
        height:300,
        layout:'fit',
        items: {
			xtype: 'piechart',
            store: ds_stabsensi_smt,
            dataField: 'jum',
			categoryField: 'nmstabsensimhs',
            //extra styles get applied to the chart defaults
            extraStyle:
            {
                legend:
                {
                    display: 'right',
                    padding: 5,
                    font:
                    {
                        family: 'Tahoma',
                        size: 13
                    }
                }
            }
		},
		tbar:[{
			xtype:'container', layout:'form', labelAlign:'right',labelWidth:50,
			items:[
				RH.ActionCombo({
					id: 'cb.stsemester', label: 'Semester', width: 150,
					data: ds_stsmt, key: 'kdstsemester', display: 'nmsmt',
					fnSelect: function(){ ds_stabsensi_smt.reload()}			
				})
			]
		}]
	});
	/*
	var panel_main = new Ext.Panel({
        title: 'Dashboard Mahasiswa',
        layout:'hbox',
		items:[panel3,panel4]
	});
	*/
	var panel_main = new Ext.Panel({
        title: 'Dashboard Mahasiswa',
        layout:'border',
		items:[{
			region:'north', xtype:'fieldset', height:45, layout:'form', 
			items:[			
				RH.Lookup2Field({
					label: 'Mahasiswa', codeId:'lu.nim-dashboard', nameId:'lu.nmmhs',
					codeVisible: true, widths: [120,250], 
					fnLookup: function(){wLookup(lu_mhs, 'Mahasiswa','lu.nim-dashboard','lu.nmmhs',500,350,
											function(){ds_kehadiran.reload(), ds_stabsensi_smt.reload()}) 
										}
				}),
			]
		},{
			region:'center', layout:'hbox', autoScroll:true,
			items:[panel3]
		}]
	});
	//var lu_nim = Ext.getCmp('lu.nim-dashboard');
	//lu_nim.on('change', function(){ ds_kehadiran.reload(), ds_stabsensi_smt.reload()});
	
	SET_PAGE_CONTENT(panel_main);
	
	
}