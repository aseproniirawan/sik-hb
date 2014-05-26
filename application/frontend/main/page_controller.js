function page_controller(idPage){
	Ext.Ajax.request({
		url:BASE_URL + 'menu_controller/getMenuAll',
		params:{
			id : idPage
		},
		method:'POST',
		success: function(response){
			var r = Ext.decode(response.responseText);
		}
	});
}