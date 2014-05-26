var msgSaveSuccess='Simpan data berhasil';var msgSaveFail='Simpan data gagal';var msgSaveInvalid='Data belum valid (data primer belum terisi)!';RH={version:"1.0.0",versionDetail:{major:1,minor:1,patch:0}};RH.getVersion=function(){return'RH.version: 1.0.0 [Developed by RH]';}
RH.h3=function(text,align){var hAlign='center';if(align=='c')hAlign='center';if(align=='l')hAlign='left';if(align=='r')hAlign='right';return"<H3 align='"+hAlign+"'>"+text+"</H3>";}
RH.center=function(text){return"<center>"+text+"<center>";}
RH.space=function(size){var ret='';for(var i=0;i<size;i++){ret+='&nbsp;';}
return ret;}
RH.tbspacerCM=function(columnModel){return{xtype:'tbspacer',width:columnModel.getTotalWidth()-500};}
RH.startTimer=function(idComp){setInterval(function(){var d=new Date();var t=d.toLocaleTimeString();if(Ext.getCmp(idComp))
RH.setCompValue(idComp,t);},1000);};RH.freezeTimer=function(idComp){clearInterval(RH.startTimer);}
RH.convertToDate=function(value){if(!value.getMonth){value=Date.parse(value,'dmY');}
return value;}
RH.vSpacer=function(space){return{xtype:'panel',height:space}}
RH.storeFields=function(){var fArray=[];for(var i=0;i<arguments.length;i++){fArray.push({name:arguments[i]});}
fArray.push({});fArray.push({});return new Object(fArray);}
RH.JsonStore=function(arg){var root=(arg.root)?arg.root:'data';var totalProperty=(arg.totalProperty)?arg.totalProperty:'results';var ds=new Ext.data.JsonStore({autoLoad:true,proxy:new Ext.data.HttpProxy({method:'POST',url:arg.url}),totalProperty:totalProperty,root:root,fields:arg.fields});ds.on('beforeload',function(store){if(arg.limit){var start=(arg.start)?arg.start:0;store.setBaseParam('start',start);store.setBaseParam('limit',arg.limit);}
if(arg.params){arrayPars=arg.params;if(arrayPars.length>0)
for(var i=0;i<arrayPars.length;i++){if(arrayPars[i].key){var value='';if(arrayPars[i].id)value=RH.getCompValue(arrayPars[i].id,true);if(arrayPars[i].value)value=arrayPars[i].value;store.setBaseParam(arrayPars[i].key,value);}}}
if(arg.enableSearch){store.setBaseParam('key',RH.getKeyPar());store.setBaseParam('value',RH.getValPar());}});return ds;};RH.getCommonJsonStore=function(fieldsObj,dsUrl){var jsonStore=new Ext.data.JsonStore({proxy:new Ext.data.HttpProxy({url:dsUrl,method:'POST'}),autoLoad:true,root:'data',fields:fieldsObj,});return jsonStore;}
RH.FTextField=function(arg){var tf=new Ext.form.TextField({id:arg.id,fieldLabel:arg.label,submitValue:true,width:arg.width,allowBlank:false});var lb=new Ext.form.Label({id:'lb.'+arg.id,text:arg.mark,style:'color:red',margins:'0 0 0 5'});var c={xtype:'container',fieldLabel:arg.label,layout:'hbox',items:[tf,lb]};return c;}
RH.ActionCombo=function(arg){var cannotEmpty=(arg.cannotEmpty)?arg.cannotEmpty:false;var cb=new Ext.form.ComboBox({xtype:'combo',id:arg.id,fieldLabel:arg.label,editable:false,allowBlank:!cannotEmpty,store:arg.data,valueField:arg.key,displayField:arg.display,triggerAction:'all',forceSelection:true,submitValue:true,mode:'local',emptyText:'Pilih...',listeners:{scope:this,select:arg.fnSelect}});if(arg.width)cb.width=arg.width;return cb;}
RH.TimeRangeCombos=function(arg){var comp=new Object({xtype:'container',layout:'hbox',fieldLabel:arg.labels[0],defaultType:'textfield',items:[{xtype:'combo',id:arg.ids[0],allowBlank:false,width:60,store:arg.store,valueField:arg.valueField,displayField:arg.displayField,mode:'local',submitValue:true,editable:true},{xtype:'label',margins:'0 0 0 6',text:arg.labels[1],width:arg.space,},{xtype:'combo',id:arg.ids[1],allowBlank:false,margins:'0 0 0 6',width:60,store:arg.store,valueField:arg.valueField,displayField:arg.displayField,mode:'local',submitValue:true,editable:true}]});return comp;}
RH.h3ColumnHeader=function(cm){for(var i=0;i<cm.getColumnCount();i++){var header=RH.h3(cm.getColumnHeader(i));cm.setColumnHeader(i,header);}}
RH.GridPanel_T1=function(arg){RH.h3ColumnHeader(arg.cm);var sm=new Ext.grid.RowSelectionModel({singleSelect:arg.singleSelect});var gv=new Ext.grid.GridView({emptyText:'< Belum ada Data >'});var gp=new Ext.grid.GridPanel({ds:arg.ds,cm:arg.cm,sm:sm,view:gv,forceFit:true,autoSizeColumns:true,autoScroll:true,enableColumnResize:true,enableColumnHide:false,enableColumnMove:false,enableHdaccess:false,columnLines:true,loadMask:true,tbar:getToolBar(),bbar:new Ext.PagingToolbar({store:arg.ds,displayInfo:true,pageSize:arg.pageSize,mode:'local',displayMsg:'Data {0} - {1} dari {2}',emptyMsg:"Belum ada data"}),listeners:{cellclick:arg.cellclick}});function getToolBar(){if(arg.allowAdd){return[{text:'Tambah',iconCls:'silk-add',handler:arg.fnAdd},getCustomButton(),getSpacer(),arg.searchComp];}
else{return[getCustomButton(),getSpacer(),arg.searchComp];}}
function getSpacer(){var sWidth=arg.cm.getTotalWidth()-(RH.searchObj.comboWidth+RH.searchObj.textWidth);var spacer={xtype:'tbspacer',width:sWidth,hidden:true};if(arg.allowAdd){sWidth=sWidth-100;spacer.width=sWidth;spacer.hidden=false;}
if(arg.customButton){sWidth=sWidth-(arg.customButton.text.length*4);spacer.width=sWidth;spacer.hidden=false;}
return spacer;}
function getCustomButton(){var button={};button.hidden=true;if(arg.customButton){button=arg.customButton;button.hidden=false;}
return button;}
if(arg.id)
gp.id=arg.id;return gp;}
RH.EditorGridPanel_T1=function(arg){RH.h3ColumnHeader(arg.cm);var sm=new Ext.grid.RowSelectionModel({singleSelect:arg.singleSelect});var gv=new Ext.grid.GridView({emptyText:'< Belum ada Data >'});var gp=new Ext.grid.EditorGridPanel({ds:arg.ds,cm:arg.cm,sm:sm,view:gv,clicksToEdit:arg.clicksToEdit,forceFit:true,autoSizeColumns:true,autoScroll:true,enableColumnResize:true,enableColumnHide:true,enableColumnMove:false,enableHdaccess:false,columnLines:true,loadMask:true,tbar:getToolBar(),bbar:new Ext.PagingToolbar({store:arg.ds,displayInfo:true,pageSize:arg.pageSize,mode:'local',displayMsg:'Data {0} - {1} dari {2}',emptyMsg:"Belum ada data"}),listeners:{cellclick:arg.cellclick}});function getToolBar(){if(arg.allowAdd){return[{text:RH.h3('Tambah'),iconCls:'silk-add',handler:arg.fnAdd},getCustomButton(),getSpacer(),getSearchComp()];}
else{return[getCustomButton(),getSpacer(),getSearchComp()];}}
function getSearchComp(){if(arg.searchComp)return arg.searchComp;else return{xtype:'tbspacer',hidden:true};}
function getSpacer(){var sWidth=arg.cm.getTotalWidth()-(RH.searchObj.comboWidth+RH.searchObj.textWidth);var spacer={xtype:'tbspacer',width:sWidth,hidden:true};if(arg.allowAdd){sWidth=sWidth-100;spacer.width=sWidth;spacer.hidden=false;}
if(arg.customButton){sWidth=sWidth-(arg.customButton.text.length*4);spacer.width=sWidth;spacer.hidden=false;if(!arg.allowAdd&&arg.customButton.hidden){spacer.hidden=true;spacer.width=0;}}
return spacer;}
function getCustomButton(){var button={};button.hidden=true;if(arg.customButton){var text=RH.h3(arg.customButton.text);arg.customButton.text=text;button=arg.customButton;button.hidden=arg.customButton.hidden;}
return button;}
if(arg.id)
gp.id=arg.id;return gp;}
RH.GPContainer1=function(arg){var panel=new Ext.Panel({title:arg.title,iconCls:arg.iconCls,buttonAlign:'left',bodyStyle:'padding: 5px',border:false,layout:'fit',waitMsg:'Waiting...',maskDisabled:false,monitorValid:true,frame:true,items:[{xtype:'panel',layout:'fit',items:[arg.gridPanel],}],});return panel;}
RH.GPContainer1_wHeaders=function(arg){var panel=new Ext.Panel({title:arg.title,iconCls:arg.iconCls,buttonAlign:'left',bodyStyle:'padding: 5px',border:false,layout:'border',waitMsg:'Waiting...',maskDisabled:false,monitorValid:true,frame:true,items:[{xtype:'fieldset',flex:1,region:'north',layout:'form',autoHeight:true,labelWidth:arg.headerLabelWidth,labelAlign:'right',items:arg.headers,},{xtype:'panel',layout:'fit',region:'center',items:[arg.gridPanel],}],});return panel;}
RH.warning=function(msg){Ext.Msg.alert("Warning",msg);}
RH.getCompValue=function(idComp,forceEmpty){if(Ext.getCmp(idComp))
return Ext.getCmp(idComp).getValue();else{if(forceEmpty)return'';else
RH.warning('GET value error: component id: '+idComp+' not found');}}
RH.setCompValue=function(idComp,val){if(Ext.getCmp(idComp))
Ext.getCmp(idComp).setValue(val);else
RH.warning('SET value error: component id: '+idComp+' not found');}
RH.compRecField=function(idComp,record,field){RH.setCompValue(idComp,record.data[field]);}
RH.disableComp=function(idcomp){Ext.getCmp(idcomp).disable();}
RH.enableComp=function(idcomp){Ext.getCmp(idcomp).enable();}
RH.getNameWTitle=function(frontT,name,backT){var nameWTitle=name;if(frontT!=null&&frontT!='')
nameWTitle=frontT+' '+nameWTitle;if(backT!=null&&backT!='')
nameWTitle+=' '+backT;return nameWTitle;}
RH.setNameWTitle=function(idFrontT,idBackT,idName,idNameWT){var name='';var frontT='';var backT='';if(Ext.getCmp(idFrontT))
frontT=RH.getCompValue(idFrontT);if(Ext.getCmp(idBackT))
backT=RH.getCompValue(idBackT);if(Ext.getCmp(idName))
name=RH.getCompValue(idName);var nameWT=RH.getNameWTitle(frontT,name,backT);RH.setCompValue(idNameWT,nameWT);}
RH.isEmpty=function(idKey){var key='';if(Ext.getCmp(idKey))
key=Ext.getCmp(idKey).getValue();return((key=='')||(key==null));}
RH.getRecAtVal=function(store,field,value){var record=null;var index=store.find(field,value);if(index!=-1)
{record=store.getAt(index);}
return record;}
RH.getFieldValue=function(idComp,valueField,findField){var fieldValue='';var store=Ext.getCmp(idComp).getStore();var index=store.find(valueField,Ext.getCmp(idComp).getValue());if(index!=-1)
{var record=store.getAt(index);fieldValue=record.data[findField];}
return fieldValue;}
RH.getRecordFieldValue=function(store,field,key,value){var fValue='';var index=store.find(key,value);if(index!=-1)
{var record=store.getAt(index);fValue=record.data[field];}
return fValue;}
RH.sumRecVal=function(store,colField){var sum=0;store.each(function(rec){sum+=parseFloat(rec.data[colField]);});return sum;}
RH.getForm=function(idform){var form;if(Ext.getCmp(idform)){var comp=Ext.getCmp(idform);if(comp.getForm()){return comp.getForm();}
else RH.warning('Component with id: '+idform+' is Not a Form');}
else RH.warning('Component with id: '+idform+' Not Found');}
RH.resetForm=function(idform){Ext.getCmp(idform).getForm().reset();}
RH.submitForm=function(idForm,sUrl,sParams,fnAfterSuccess,msgWait,msgSuccess,msgFail,msgInvalid)
{var form=RH.getForm(idForm);if(form.isValid()){form.submit({url:sUrl,method:'POST',params:sParams,waitMsg:msgWait,success:function(){Ext.Msg.alert("Info:",msgSuccess);fnAfterSuccess;},failure:function(){Ext.Msg.alert("Info:",msgFail);},});}else{Ext.Msg.alert("Info:",msgInvalid);}}
RH.submitGridForm=function(idForm,sUrl,sParams,grid,win,msgWait,msgSuccess,msgFail,msgInvalid)
{var form=RH.getForm(idForm);if(form.isValid()){form.submit({url:sUrl,method:'POST',params:sParams,waitMsg:msgWait,success:function(){Ext.Msg.alert("Info:",msgSuccess);grid.getStore().reload();win.close();},failure:function(){Ext.Msg.alert("Info:",msgFail);}});}else{Ext.Msg.alert("Info:",msgInvalid);}}
RH.InsertToGrid=function(arg){if(!arg.formId){RH.warning('formId tidak terdefinisi');return;}
if(!arg.url){RH.warning('url tidak terdefinisi');return;}
if(!arg.params){RH.warning('params tidak terdefinisi');return;}
if(!arg.grid){RH.warning('grid tidak terdefinisi');return;}
if(!arg.window){RH.warning('window tidak terdefinisi');return;}
var msgWait='Tunggu, sedang proses menyimpan...';var msgSuccess='Tambah data berhasil';var msgFail='Tambah data gagal';var msgInvalid='Data belum valid (data primer belum terisi)!';RH.submitGridForm(arg.formId,arg.url,arg.params,arg.grid,arg.window,msgWait,msgSuccess,msgFail,msgInvalid);}
RH.deleteGridRecord=function(url,params,grid){Ext.Msg.show({title:'Konfirmasi',msg:'Hapus data yang dipilih?',buttons:Ext.Msg.YESNO,icon:Ext.MessageBox.QUESTION,fn:function(response){if('yes'!==response){return;}
Ext.Ajax.request({url:url,method:'POST',params:params,success:function(){Ext.Msg.alert("Info","Hapus Data Berhasil");grid.getStore().reload();},failure:function(result){Ext.MessageBox.alert("Info","Hapus Data Gagal");}});}});}
RH.deleteAllRecords=function(url,params,grid,msgKonfirm){Ext.Msg.show({title:'Konfirmasi',msg:msgKonfirm,buttons:Ext.Msg.YESNO,icon:Ext.MessageBox.QUESTION,fn:function(response){if('yes'!==response){return;}
Ext.Ajax.request({url:url,method:'POST',params:params,success:function(){Ext.Msg.alert("Info","Hapus Data Berhasil");grid.getStore().reload();},failure:function(result){Ext.MessageBox.alert("Info","Hapus Data Gagal");}});}});}
RH.loadDetail=function(idPanel,gridPanelDet){var panelDetail=Ext.getCmp(idPanel);if(panelDetail){panelDetail.removeAll();panelDetail.add(gridPanelDet);panelDetail.doLayout();}}
RH.removeDetail=function(idPanel){var panelDetail=Ext.getCmp(idPanel);if(panelDetail){panelDetail.removeAll();}}
RH.showDetail=function(idPanel,gridPanelDet){var panelDetail=Ext.getCmp(idPanel);if(panelDetail){panelDetail.removeAll();panelDetail.add(gridPanelDet);panelDetail.doLayout();panelDetail.show();}}
RH.hideDetail=function(idPanel){var panelDetail=Ext.getCmp(idPanel);if(panelDetail){panelDetail.removeAll();panelDetail.hide();}}
RH.keyAndName=function(){var sArray=[];for(var i=0;i<arguments.length;i++){var fArray=arguments[i];sArray.push({key:fArray[0],name:fArray[1]});}
return new Object(sArray);}
RH.searchObj=new Object({idCombo:'cb.src',idText:'tf.src',idButton:'bt.src',store:new Ext.data.JsonStore(),params:new Object(),comboWidth:150,textWidth:150,selected:0,});RH.searchObj_init=function(){RH.searchObj.idCombo='cb.src';RH.searchObj.idText='tf.src';RH.searchObj.idButton='bt.src';RH.searchObj.store=new Ext.data.JsonStore();RH.searchObj.params=new Object();RH.searchObj.comboWidth=150;RH.searchObj.textWidth=150;}
RH.getKeyPar=function(){idKey=RH.searchObj.idCombo;var keyPar='';if(Ext.getCmp(idKey))
keyPar=RH.getCompValue(idKey);return keyPar}
RH.getValPar=function(){idVal=RH.searchObj.idText;var valPar='';if(Ext.getCmp(idVal))
valPar=RH.getCompValue(idVal);return valPar}
RH.searchBar=function(){var idCombo=RH.searchObj.idCombo;var idText=RH.searchObj.idText;var idButton=RH.searchObj.idButton;var comboWidth=RH.searchObj.comboWidth;var textWidth=RH.searchObj.textWidth;var containerWidth=comboWidth+textWidth+50;var comboData=RH.searchObj.params;var store=RH.searchObj.store;var comboStore=new Ext.data.JsonStore({autoDestroy:true,fields:['key','name'],data:comboData,});var searchBar={xtype:'form',border:false,frame:false,bodyStyle:'background:transparent; padding:1px;',defaults:{labelAlign:'right',lebelWidth:100},items:[{xtype:'container',layout:'hbox',width:containerWidth,items:[{xtype:'combo',id:idCombo,width:comboWidth,emptyText:'Cari berdasarkan ...',store:comboStore,valueField:'key',displayField:'name',editable:false,triggerAction:'all',forceSelection:true,submitValue:true,mode:'local',},{xtype:'textfield',id:idText,margins:'0 0 0 5',width:textWidth,},{xtype:'button',iconCls:'silk-zoom',margins:'0 0 0 5',id:idButton,handler:function(){reloadGridStore()}}]}]};function reloadGridStore(){if(RH.isEmpty(idCombo))return;store.reload({params:{key:RH.getCompValue(idCombo),value:RH.getCompValue(idText),},});}
return searchBar;}
RH.searchComp=function(arg){var pars=[];if(arg.fields){var fArray=arg.fields;for(var i=0;i<fArray.length;i++){var arr=fArray[i].split(':');pars.push({key:arr[0],name:arr[1]});}}
RH.searchObj_init();RH.searchObj.store=arg.store;RH.searchObj.params=new Object(pars);if(arg.selected)
RH.searchObj.selected=arg.selected;if(arg.id){RH.searchObj.idCombo+=arg.id;RH.searchObj.idText+=arg.id;RH.searchObj.idButton+=arg.id;}
if(arg.comboWidth)
RH.searchObj.comboWidth=arg.comboWidth;if(arg.textWidth)
RH.searchObj.textWidth=arg.textWidth;return RH.searchBar();}
RH.keyToDetil=function(value){Ext.QuickTips.init();return'<div class="keyMasterDetail" ext:qtip="Lihat detail" style="cursor:pointer;color:#000099;font-size:12px;">'
+value+'</div>';}
RH.qtip=function(value,qtip,color){var fontColor=(color)?color:'black';Ext.QuickTips.init();return'<div ext:qtip="'+qtip+'" style="cursor:pointer;color:'+color+';">'
+value+'</div>';}
RH.qtipEdit=function(value,fontSize){var fontsize=(fontSize)?fontSize:'10px';Ext.QuickTips.init();return'<div ext:qtip="Klik untuk edit" style="cursor:pointer;color:#0000aa;font-size:'+fontsize+';">'
+value+'</div>';}
RH.EditColumn=function(){function getImg(){Ext.QuickTips.init();return'<img class="imgEdit" ext:qtip="Edit record" style="cursor:pointer;"'+' src="application/framework/img/rh_edit.png" />';};var cObj={header:RH.h3('Edit'),width:40,sortable:false,align:'center',renderer:getImg};return cObj;}
RH.DeleteColumn=function(){function getImg(){Ext.QuickTips.init();return'<img class="imgDelete" ext:qtip="Hapus record" style="cursor:pointer;"'+' src="application/framework/img/rh_delete.gif" />';};var cObj={header:RH.h3('Hapus'),width:45,sortable:false,align:'center',renderer:getImg};return cObj;}
RH.PrintColumn=function(){function getImg(){Ext.QuickTips.init();return'<img class="imgPrint" ext:qtip="Cetak record" style="cursor:pointer;"'+' src="application/framework/img/rh_print.gif" />';};var cObj={header:RH.h3('Cetak'),width:45,sortable:false,align:'center',renderer:getImg};return cObj;}
RH.PrintClick=function(event,fnPrint){var t=event.getTarget();if(t.className=='imgPrint')fnPrint();return;}
RH.EditClick=function(event,fnEdit){var t=event.getTarget();if(t.className=='imgEdit')fnEdit();return;}
RH.DeleteClick=function(event,fnDelete){var t=event.getTarget();var isDelete=false;if(t.className=='imgDelete')fnDelete();return;}
RH.column_edit=function(){Ext.QuickTips.init();return'<img class="imgEdit" ext:qtip="Edit record" style="cursor:pointer;"'+' src="application/framework/img/rh_edit.png" />';}
RH.column_delete=function(){Ext.QuickTips.init();return'<img class="imgDelete" ext:qtip="Hapus record" style="cursor:pointer;"'+' src="application/framework/img/rh_delete.gif" />';}
RH.column_edit_delete=function(){var strRender='';strRender=RH.column_edit()+'&nbsp;'+RH.column_delete();return strRender;}
RH.getNumEditor=function(id,type,minValue,maxValue,isAllowBlank,fnChange){var isAllowNegative=(minValue>=0)?false:true;var isAllowDecimals=(type=='DECIMALS')?true:false;var numEditor=new Ext.form.NumberField({id:id,minValue:minValue,maxValue:maxValue,allowBlank:isAllowBlank,allowNegative:isAllowNegative,allowDecimals:isAllowDecimals,listeners:{change:fnChange,}});return numEditor;}
RH.getComboEditor=function(idCombo,isEditable,store,valKey,dispKey,fnSelect){var isTypeAhead=(isEditable)?true:false;var hiddenName='h.'+idCombo;var comboEditor=new Ext.form.ComboBox({id:idCombo,name:idCombo,hiddenName:hiddenName,store:store,valueField:valKey,displayField:dispKey,editable:isEditable,forceSelection:true,submitValue:true,typeAhead:isTypeAhead,mode:'local',emptyText:'Pilih...',selectOnFocus:true,triggerAction:'all',listeners:{select:fnSelect}});return comboEditor;}
RH.Lookup2Field=function(arg){var codeId=arg.codeId;var nameId=arg.nameId;var codeWidth=arg.widths[0];var nameWidth=arg.widths[1];var comp={xtype:'container',fieldLabel:arg.label,id:arg.id,layout:'hbox',width:codeWidth+nameWidth+40,defaultType:'textfield',defaults:{hideLabel:true},items:[{id:codeId,width:codeWidth,readOnly:true,hidden:!arg.codeVisible,margins:'0 6 0 0'},{id:nameId,width:nameWidth,readOnly:true},{xtype:'button',iconCls:'silk-find',margins:'0 0 0 6',width:25,handler:arg.fnLookup}]};return comp;}
RH.CodeNameField=function(arg){var codeId=arg.ids[0];var nameId=arg.ids[1];var codeWidth=arg.widths[0];var nameWidth=arg.widths[1];var comp={layout:'form',items:[{xtype:'container',fieldLabel:arg.label,id:arg.id,layout:'hbox',width:codeWidth+nameWidth+40,defaultType:'textfield',defaults:{hideLabel:true},items:[{id:codeId,width:codeWidth,disabled:arg.disabled,margins:'0 6 0 0'},{id:nameId,width:nameWidth,disabled:arg.disabled}]}]};return comp;}
RH.PhotoPicker=function(arg){var pWidth=(arg.width)?arg.width:200;var pHeight=(arg.height)?arg.height:200;var pStyle=(arg.style)?arg.style:'margin-left: 0px;margin-right: 0px; margin-top: 0px;margin-bottom: 0px';Ext.QuickTips.init();var fpn=new Ext.Panel({id:arg.id,style:pStyle,frame:true,height:pHeight,width:pWidth,border:true,bodyStyle:'background:#ffc; padding:0px;',});var tip=new Ext.ToolTip({target:arg.id,html:'A very simple tooltip'});Ext.QuickTips.init();return fpn;}
RH.ShowReport=function(rpt_url){var win=window.open();win.location.reload();win.location=rpt_url;}
RH.combo=function(cId,cLabel,cDS,cVal,cDisp,cWidth,cEditable,cAllowBlank)
{var c={xtype:'combo',id:cId,fieldLabel:cLabel,store:cDS,triggerAction:'all',valueField:cVal,displayField:cDisp,forceSelection:true,submitValue:true,mode:'local',emptyText:'Pilih...',selectOnFocus:false,width:cWidth,editable:cEditable,allowBlank:cAllowBlank,}
return c;}
function terbilang(bilangan){bilangan=String(bilangan);var angka=new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');var kata=new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');var tingkat=new Array('','Ribu','Juta','Milyar','Triliun');var panjang_bilangan=bilangan.length;if(panjang_bilangan>15){kaLimat="Diluar Batas";return kaLimat;}
for(i=1;i<=panjang_bilangan;i++){angka[i]=bilangan.substr(-(i),1);}
i=1;j=0;kaLimat="";while(i<=panjang_bilangan){subkaLimat="";kata1="";kata2="";kata3="";if(angka[i+2]!="0"){if(angka[i+2]=="1"){kata1="Seratus";}else{kata1=kata[angka[i+2]]+" Ratus";}}
if(angka[i+1]!="0"){if(angka[i+1]=="1"){if(angka[i]=="0"){kata2="Sepuluh";}else if(angka[i]=="1"){kata2="Sebelas";}else{kata2=kata[angka[i]]+" Belas";}}else{kata2=kata[angka[i+1]]+" Puluh";}}
if(angka[i]!="0"){if(angka[i+1]!="1"){kata3=kata[angka[i]];}}
if((angka[i]!="0")||(angka[i+1]!="0")||(angka[i+2]!="0")){subkaLimat=kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";}
kaLimat=subkaLimat+kaLimat;i=i+3;j=j+1;}
if((angka[5]=="0")&&(angka[6]=="0")){kaLimat=kaLimat.replace("Satu Ribu","Seribu");}
return kaLimat+"Rupiah";}