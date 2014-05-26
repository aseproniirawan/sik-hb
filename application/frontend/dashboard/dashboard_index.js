function dashboard_index() {
//Data Store Traffict
	var ds_tahun = dm_tahun();
/*	var ds = new Ext.data.Store({
        proxy: new Ext.data.ScriptTagProxy({
            url: 'http://extjs.com/forum/topics-remote.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'topics',
            totalProperty: 'totalCount',
            id: 'post_id'
        }, [
            {name: 'postId', mapping: 'post_id'},
            {name: 'title', mapping: 'topic_title'},
            {name: 'topicId', mapping: 'topic_id'},
            {name: 'author', mapping: 'author'},
            {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
            {name: 'excerpt', mapping: 'post_text'}
        ]),

        baseParams: {limit:20, forumId: 4}
    });
	
	// Custom rendering Template for the View
    var resultTpl = new Ext.XTemplate(
        '<tpl for=".">',
        '<div class="search-item">',
            '<h3><span>{lastPost:date("M j, Y")}<br />by {author}</span>',
            '<a href="http://extjs.com/forum/showthread.php?t={topicId}&p={postId}" target="_blank">{title}</a></h3>',
            '<p>{excerpt}</p>',
        '</div></tpl>'
    );
*/
/*
	var panel7 = new Ext.Panel({
    //    applyTo: 'search-panel',
        title:'Forum Search',
        height:300,
        autoScroll:true,

        items: new Ext.DataView({
            tpl: resultTpl,
            store: ds,
            itemSelector: 'div.search-item'
        }),

        tbar: [
            'Search: ', ' ',
        //    new Ext.ux.grid.Search({
          //      store: ds,
           //     width:320
           // })
        ],

        bbar: new Ext.PagingToolbar({
            store: ds,
            pageSize: 20,
            displayInfo: true,
            displayMsg: 'Topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        })
    });

    ds.load({params:{start:0, limit:20, forumId: 4}});
	
	
*/
    Ext.Ajax.request({
        url: BASE_URL + 'dashboard_controller/count_pasien',
        method: 'POST',
        success: function(response) {
            obj = Ext.util.JSON.decode(response.responseText);
            Ext.getCmp("tf.norm").setValue(obj.norm);
        }
    });
    Ext.Ajax.request({
        url: BASE_URL + 'dashboard_controller/count_dokter',
        method: 'POST',
        success: function(response) {
            obj = Ext.util.JSON.decode(response.responseText);
            Ext.getCmp("tf.iddokter").setValue(obj.iddokter);
        }
    });
    Ext.Ajax.request({
        url: BASE_URL + 'dashboard_controller/count_perawat',
        method: 'POST',
        success: function(response) {
            obj = Ext.util.JSON.decode(response.responseText);
            Ext.getCmp("tf.idperawat").setValue(obj.idperawat);
        }
    });
    Ext.Ajax.request({
        url: BASE_URL + 'dashboard_controller/count_bed',
        method: 'POST',
        success: function(response) {
            obj = Ext.util.JSON.decode(response.responseText);
            Ext.getCmp("tf.idbed").setValue(obj.idbed);
        }
    });
	Ext.Ajax.request({
        url: BASE_URL + 'dashboard_controller/Informasi',
        method: 'POST',
        success: function(response) {
            obj = Ext.util.JSON.decode(response.responseText);
			console.log(obj.data);
            Ext.getCmp("ta.liburan").setValue(obj.data.deskripsi);
        }
    });

//
//==============diagram=================

	 var store2 = RH.JsonStore({
		url : BASE_URL + 'dashboard_controller/chart_pasien',
		fields: ['tahunreg','pasienlama','pasienbaru']
	}); 
	
    // COLUMN
   var panel3 = new Ext.Panel({
    title: 'Grafik Kunjungan Pasien Baru & Lama Ke Rumah Sakit',
        frame:true,
    //    renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',             
        items: {
            xtype: 'columnchart',
            store: store2,
            stacked:true,
            xField: 'tahunreg',
             yAxis: new Ext.chart.NumericAxis({
                displayName: 'Pasien Baru',
                labelRenderer : Ext.util.Format.numberRenderer('0')
            }),
             tipRenderer : function(chart, record, index, series){
                if(series.yField == 'pasienbaru'){
                    return Ext.util.Format.number(record.data.pasienbaru, '0,0') + ' pasien baru ' + record.data.tahunreg;
                }else{
                    return Ext.util.Format.number(record.data.pasienlama, '0,0') + ' pasien laru ' + record.data.tahunreg;
                }
            },
            chartStyle: {
                padding: 10,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }
            },
            series: [{
                type: 'column',
                displayName: 'Pasien Baru',
                yField: 'pasienbaru',
				style: {color: 0xCC3333}
            },{
                type:'column',
                displayName: 'Pasien Lama',
                yField: 'pasienlama',
				style: {color: 0x3333FF}
            }]
        }
    });
 


    var store = RH.JsonStore({
        url: BASE_URL + 'dashboard_controller/pie_pasien',
        fields: ['tahundaftar', 'norm'],
        //params: [{key:'norm', id:'tahundaftar'}]
    });
    var panel1 = new Ext.Panel({
		
        width: 400,
        height: 400,
        border: false,
        bodyStyle:{"background-color":"#F6F6F9"}, 
        items: {
            store: store,
            xtype: 'piechart',
            dataField: 'norm',
            categoryField: 'tahundaftar',
            //extra styles get applied to the chart defaults
            extraStyle:
                    {
                        legend:
                                {
                                    display: 'bottom',
                                    padding: 5,
                                    font:
                                            {
                                                family: 'Tahoma',
                                                size: 13
                                            }
                                }
                    }
        }
    });
    
	var store3 = RH.JsonStore({
		url : BASE_URL + 'dashboard_controller/count_poli',
		fields: ['nmbagian','polilama','polibaru']
	}); 
    var panel2 = new Ext.Panel({
        title: 'Grafik kunjungan Pasien Baru & Lama Unit/Ruang Pelayanan',
        frame:true,
		id: 'gf.kunjungan',
	 	tbar : [{
			xtype: 'combo', fieldLabel: 'Years',
			id: 'cb.tahun', width: 100,
			store: ds_tahun, valueField: 'tahun', displayField: 'tahun',
			editable: false, triggerAction: 'all',
			forceSelection: true, submitValue: true, mode: 'local',
			listeners: {
							select: function() {
								var isi = Ext.getCmp('cb.tahun').getValue();
								if (isi){
									Ext.getCmp("tf.tahun").setValue(isi);
								}
							}
						}
		},{
			xtype: 'textfield', id: 'tf.tahun', width: 300,hidden: true,
			validator: function() {
							store3.setBaseParam('tahun', Ext.getCmp('tf.tahun').getValue());
							Ext.getCmp('gf.kunjungan').store.reload();
						
						}
		}], 
    //    renderTo: 'container',
        width:400,
        height:300,
        layout:'fit',
        items: {
            xtype: 'barchart',
            store: store3,
            stacked:true,
            yField: 'nmbagian',
          /*   xAxis: new Ext.chart.NumericAxis({
                displayName: 'Visits',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }), */
            tipRenderer : function(chart, record, index, series){
                if(series.xField == 'polibaru'){
                    return Ext.util.Format.number(record.data.polibaru, '0,0') + ' Pasien Baru ' + record.data.nmbagian;
                }else{
                    return Ext.util.Format.number(record.data.polilama, '0,0') + ' Pasien Lama ' + record.data.nmbagian;
                }
            },
            chartStyle: {
                padding: 10,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }
            },
            series: [{
                type: 'bar',
                displayName: 'Pasien Baru',
                xField: 'polibaru',
				style: {color: 0xCC3333}
            },{
                type:'bar',
                displayName: 'Pasien Lama',
                xField: 'polilama',
				style: {color: 0x3333FF}
            }]
        }
    });
    
//
    Ext.chart.Chart.CHART_URL = BASE_URL + 'resources/js/ext/resources/charts.swf';

//=================================================================
/*
    Setting Panel
*/
    var traffict_main = new Ext.Panel({
        title: 'Dashboard',
        layout: 'column',
        autoScroll: true,
        bodyStyle:{"background-color":"#F6F6F9"}, 
        items: [{
                xtype: 'container',
                style: 'padding: 25px',
                columnWidth: 0.23,
                items: [{
                        xtype: 'fieldset', title: 'Total Pasien',
                        height: 70,
                        boxMaxHeight: 70,
                        layout: 'vbox',
                        items: [{
                                xtype: 'textfield', id: 'tf.norm', width: 90, height: 30,
                                disabled: true
                            }]

                    }]
            }, {
                xtype: 'container',
                style: 'padding: 25px;',
                columnWidth: 0.23,
                items: [{
                        xtype: 'fieldset', title: 'Total Dokter',
                        height: 70,
                        boxMaxHeight: 70,
                        layout: 'vbox',
                        width: 180,
                        items: [{
                                xtype: 'textfield', id: 'tf.iddokter', width: 90, height: 30,
                                disabled: true
                            }]
                    }]
            }, {
                xtype: 'container',
                style: 'padding: 25px;',
                columnWidth: 0.23,
                items: [{
                        xtype: 'fieldset', title: 'Total Perawat',
                        height: 70,
                        boxMaxHeight: 70,
                        width: 180,
                        layout: 'vbox',
                        items: [{
                                xtype: 'textfield', id: 'tf.idperawat', width: 90, height: 30,
                                disabled: true,
                            }]
                    }]
            }, {
                xtype: 'container',
                style: 'padding: 25px;',
                columnWidth: 0.23,
                items: [{
                        xtype: 'fieldset', title: 'Total Bed',
                        height: 70,
                        boxMaxHeight: 70,
                        width: 180,
                        layout: 'vbox',
                        items: [{
                                xtype: 'textfield', id: 'tf.idbed', width: 90, height: 30,
                                disabled: true
                            }]
                    }]
            },
            // column bawah
            {
                xtype: 'container',
                style: 'padding-left: 25px;',
                columnWidth: 0.4,
                border: false,
                items: [{
                        xtype: 'fieldset', title: '',
                        height: 600,
                        boxMaxHeight: 700,
                        width: 400,
                        border: false,
                        layout: 'vbox',
                        items: [panel1]
                    }]
            }, {
                xtype: 'container',
                style: 'margin-left: 0px;',
                columnWidth: 0.6,
                items: [{
                        xtype: 'fieldset', title: '',
                        height: 300,
                        boxMaxHeight: 300,
                        width: 600,
                        border: false,
                        layout: 'vbox',
                        items: [{
                                xtype: 'label', id: 'lb.info', text: 'INFORMASI', style: 'font-size: 30px'
                            }, {
                                xtype: 'htmleditor',
                				fieldLabel: 'Deskripsi',
                                enableLinks : false,
                                enableLists : false,
                                enableSourceEdit : false,
                                enableColors : true,
                                enableFontSize : true,
                                enableFormat : false,
                				anchor:'97% 55%',
                				name:'deskripsiind',
                				id: 'ta.liburan',
                				readOnly: true,
                                }]
                    }]
            }, {
                xtype: 'container',
                style: 'margin-top: -100px; padding-left: -520px',
                columnWidth: 1,
				layout: 'column',
				items: [{
					xtype: 'fieldset', title: '',
					border: false,
					columnWidth: 0.5,
					items: [{
                        xtype: 'fieldset', title: '',
                        height: 400,
                        boxMaxHeight: 400,
                        width: 600,
                        border: false,
                        layout: 'vbox',
                        items: [panel3]
                    }]  
				},{
					xtype: 'container',
                style: 'margin-top: 0px; padding-left: 20px;',
                columnWidth: 0.5,
               
                     items: [{
                        xtype: 'fieldset', title: '',
                        height: 400,
                        boxMaxHeight: 400,
                        width: 500,
                        border: false,
                        layout: 'vbox',
                        items: [panel2]
                    }]
				}]
				
				
                      
             },{
				xtype: 'container',
				style: 'margin-top: 0px; padding-left: 20px;',
                columnWidth: 1,
			//	items: [panel7]
			 }]
    });
    SET_PAGE_CONTENT(traffict_main);
	Ext.getCmp('ta.liburan').getToolbar().hide();
}