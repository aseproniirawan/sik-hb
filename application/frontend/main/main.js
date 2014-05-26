
var USERNAME='';
var L_MEMBER='';
function toMoney(v) {
	return formatmoney(v);
}

function jumlah(a, b, c) {
		var tmpsatu1, tmpsatu2, tmpdua1, tmpdua2;
		tmpsatu1 = Ext.getCmp(a).getValue();
		tmpdua1 = Ext.getCmp(b).getValue();
		for (var r = 1; r < 10; r++) {
			tmpsatu1 = tmpsatu1.replace('.', '');
			tmpdua1 = tmpdua1.replace('.', '');
		}
		tmpsatu2 = tmpsatu1;
		tmpdua2 = tmpdua1;
		var hasil = Ext.getCmp(c);
		var tiga;
		tiga = parseInt(tmpsatu2) + parseInt(tmpdua2);
		hasil.setValue(tiga.toString());
	}

function kurang(a, b, c) {
		var tmpsatu1, tmpsatu2, tmpdua1, tmpdua2;
		tmpsatu1 = Ext.getCmp(a).getValue();
		tmpdua1 = Ext.getCmp(b).getValue();
		for (var r = 1; r < 10; r++) {
			tmpsatu1 = tmpsatu1.replace('.', '');
			tmpdua1 = tmpdua1.replace('.', '');
		}
		tmpsatu2 = tmpsatu1;
		tmpdua2 = tmpdua1;
		var hasil = Ext.getCmp(c);
		var tiga;
		tiga = parseInt(tmpsatu2) - parseInt(tmpdua2);
		hasil.setValue(tiga.toString());
	}
        
function cek_input_number(component_id) {
        var id = Ext.getCmp(component_id);
        if (isNaN(id.getValue()) && id.getValue() != '') {
                Ext.Msg.alert('Validasi Input', 'Input Harus Bilangan atau Numeric');
                id.setValue('');
        } else {
                id.setValue(formatmoney(id.getValue()));
        }
}

function formatmoney(v){
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v + "" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.'+ ps[1] : '';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
            whole = whole.replace(r, '$1' + '.' + '$2');
    }
    v = whole + sub;
    if(v.charAt(0) == '-'){
        return  '-'+v.substr(1);
    }
    return  v;
}

////////ITEMS MENU FOR TOOL-BAR MENU (ALTERNATIF STYLE) --REPLACED BY TREE-VIEW
var mnUtility = new Ext.menu.Menu({
    id: 'mnUtilityx',
        style: {
            overflow: 'visible'     // For the Combo popup
        },
        items: [
                /* {
               text: 'Menu',
               handler: u1_menu 
                },{
               text: 'Jenis Dashboard',
               handler: u2_jdashboard
                },{
               text: 'Kelompok Pengguna',
               handler: u3_usergroup 
                },{
               text: 'Otoritas',
               handler: u4_otority 
                },{
               text: 'Pengguna',
               handler: u5_user 
                },{
               text: 'Log Pengguna',
               handler: u6_userlog 
                },{
               text: 'Pengguna Program',
               handler: u8_proguser 
                }  */               
    ]
});

var mnMahasiswa_x = new Ext.menu.Menu({
    id: 'mnMhs',
    style: {
		overflow: 'visible'     // For the Combo popup
    },
    items: [{
        text: 'Mahasiswa',
		iconCls: 'silk-group-add',
        //handler: pMahasiswa, //Mahasiswa 
    }]
});

 function onItemClick(item){
        Ext.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }

////////TOOL-BAR MENU (ALTERNATIF STYLE) --REPLACED BY TREE-VIEW
var tbMenu = new Ext.Toolbar({
    items: [{
        text:'Utility',
        iconCls: 'silk-wrench',  // <-- icon
        menu: mnUtility  // assign menu by instance
    },
	{
		text:'Data Master',
        iconCls: 'silk-report',  // <-- icon
		menu: mnMahasiswa_x 
	}
	/*
	,{
        text:'Tentang',
        iconCls: 'silk-about', handler: function(){
             //      Ext.Msg.alert("Info Pembuat", "<center>Software ini dibuat oleh RH <br> Untuk pengembangan selanjutnya, silahkan hubungi 08987070737 atau <br> email ke zetxxx@gmail.com /rerezaza@facebook.com </center>");
		}
    }*/
	]
});


/** MENU TREE-VIEW =======================================================*/ 
var Tree = Ext.tree;
var menuTreeLoader=new Ext.tree.TreeLoader({
    //dataUrl:BASE_URL+'c_mutama/getTree',//site_url+'admin/tools/module_roles',
    dataUrl: BASE_URL + 'menu_controller/getMenuTree',
	baseParams:{id:"1"}
});

var menuTree=new Ext.tree.TreePanel({
    id:'menu-tree',
    region:'west',
    title:'Menu',
	iconCls:'silk-sitemap',
    split:true,
    width:200,
    height:600,
    minSize:175,
    maxSize:400,
    collapsed: false,
	collapsible: true, collapseMode: 'header',//'mini',
	titleCollapse: true,
    //header:true, headerPosition: 'right',
	margins:'0 0 5 5',
    loader:menuTreeLoader,
    rootVisible:false,
    lines:false,
    autoScroll:true,
    root:new Ext.tree.AsyncTreeNode({
        expanded:false
    }),
    listeners:{
        'click':function(n){
            var sn=this.selModel.selNode||{};
            var id_menu,url;
            if(n.leaf){
               id_menu=n.attributes.kode;
               page_controller(id_menu);
            } 
          
        }
    }
});

var pPageContainer = new Ext.Panel({
	xtype  : 'container',
	id     : 'pageContainer',
    region : 'center',
    layout : 'fit',
    margins: '0 0 5px 0',
    split  :true,
    autoEl : {},
    items  : []
                         
});

function load_url(id,url){
    var pageContainer=new Ext.Updater("pageContainer");
    var mask = new Ext.LoadMask(Ext.getCmp("pageContainer").el, {msg:"Please wait..."});
    mask.show();
    pageContainer.update({
        url:BASE_URL+url,scripts:true
    });
    pageContainer.on("update",callbackPerform);
    function callbackPerform(){
        mask.hide();
    }
}
//==============================================================================
var layout_main = new Ext.Viewport({
	layout: 'border', 
    renderTo: Ext.getBody(),        
	defaults: {
            collapsible: true,
            split: true,
            frame : false,
            bodyStyle: 'padding:5px'
            }, 
            items: [{
                collapsible: false,
                region: 'north', margins: '0 0 0 0', cmargins: '0 0 0 0',
				//items:[{
				//height: 80, 
				bodyStyle: 'padding:0px;background:#eee;font-family:"Lucida Grande";height: 62px;-moz-box-shadow:0px 0px 3px 1px rgba(0,0,0,0.3);-webkit-box-shadow:0px 0px 3px 1px rgba(0,0,0,0.3);box-shadow:0px 0px 3px 1px rgba(0,0,0,0.3);background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#8fc33a),color-stop(100%,#739b2e));background-image:-webkit-linear-gradient(top,#8fc33a,#739b2e);background-image:-moz-linear-gradient(top,#8fc33a,#739b2e);background-image:-o-linear-gradient(top,#8fc33a,#739b2e);background-image:linear-gradient(top,#8fc33a,#739b2e);border-bottom:1px solid #567422',
				//bodyStyle: 'padding:0px;background:#eee;font-family:"Lucida Grande"',
                //html: '<div id="header"> <span style="font-size:20px;">Siak-Unla-Private</span></div>',
                
				items: [new Ext.Toolbar({
                        height : 62,
						//html:'<img src="application/backend/views/auth/images/logo-header-front.png" />',
						items : [
							{
							xtype:'tbtext',
							text: '<img src="application/backend/views/auth/images/logo-header-front.png" />',
							},'->',
                            {xtype :'tbfill'},
                            {text : 'Dashboard', id : 'st_dsh',iconCls : 'silk-dash', 
								handler : function(){
											//dashboard(ROLE_ID);
											dashboard_index();
										}},'|',
                            {text : 'Status Logout', id:'sts_logout_id',iconCls : 'silk-user'
                               // menu end
                            },'|',
							{text : 'Logout', id:'id_pengguna_',
									handler: do_logout
                                // menu end
                            }
                             ],
						
						style: 'padding:0px;background:#eee;font-family:"Lucida Grande";height: 62px;-moz-box-shadow:0px 0px 3px 1px rgba(0,0,0,0.3);-webkit-box-shadow:0px 0px 3px 1px rgba(0,0,0,0.3);box-shadow:0px 0px 3px 1px rgba(0,0,0,0.3);background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#8fc33a),color-stop(100%,#739b2e));background-image:-webkit-linear-gradient(top,#8fc33a,#739b2e);background-image:-moz-linear-gradient(top,#8fc33a,#739b2e);background-image:-o-linear-gradient(top,#8fc33a,#739b2e);background-image:linear-gradient(top,#8fc33a,#739b2e);border-bottom:1px solid #567422;background-image: url(application/backend/views/auth/images/logo-header.png) no-repeat top left; font-color:#FDFDFF',	
                })]
            },
             menuTree
            ,
             { 
                collapsible: false,
                id: 'content-panel',
                bodyStyle: 'padding:0px',            
                region: 'center', 
                layout: 'card', 
                margins: '0 0 0 0',
                activeItem: 0, 
                border: true, 
                //width: 1000, 
                //tbar: tbMenu,	//ToolBar Menu (alternatif) 
                items: [pPageContainer]
                
            }]
});

function do_home() {
    Ext.Ajax.request({
        url: BASE_URL + 'auth/index',
        method: 'POST',
        success: function(xhr) {
            window.location = BASE_URL + 'auth/index';
        }
    });
}

function do_logout() {
    Ext.Ajax.request({
        url: BASE_URL + 'auth/ext_logout',
        method: 'POST',
        success: function(xhr) {
            window.location = BASE_URL + 'auth/login';
        }
    });
}

function SET_PAGE_CONTENT(content){
   var pageContainer = Ext.getCmp('pageContainer');
    pageContainer.removeAll();
    pageContainer.add(content);
    pageContainer.doLayout();
}

layout_main.show();

var USERID = '';
Ext.Ajax.request({
        url:BASE_URL + 'c_tools/get_user',
        method:'POST',
        success: function(response){
            var r = Ext.decode(response.responseText);
			USERID = r.userid;
            USERNAME = r.username;
            L_MEMBER = r.level_member;
			NM_KLP = r.nm_klp;
         Ext.getCmp("sts_logout_id").setText("Pengguna: "+NM_KLP);
         Ext.getCmp("id_pengguna_").setText("Logout ("+USERNAME+ ")");
	}
});

dashboard_index();
