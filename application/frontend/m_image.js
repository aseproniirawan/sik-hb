function m_imagex() {
	var ds_gambar = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'get_images/get_photo',
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
	var tpl = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{name}">', '<div class="thumb"><img src="../../{thumb_url}" title="{name}"></div>', '<span class="x-editable">{nama_produk}</span></div>', '</tpl>', '<div class="x-clear"></div>');
	var tplDetail = new Ext.XTemplate('<div class="details">', '<tpl for=".">', '<img src="../../{thumb_url}" align="right"><div class="details-info">', '<b>Image Name:</b> <br>', '<span>{name}</span> <br>', '<b>Size:</b> <br>', '<span>{size}</span> <br>', '<b>Last Modified:</b> <br>', '<span>{lastmod}</span> <br>', '<b>Harga:</b> <br>', '<span>{harga}</span> ', '<span><a href="../../{url}" target="_blank">view original</a></span></div>', '</tpl>', '</div>');
	var tbar = new Ext.Toolbar({
		style: 'border:1px solid #99BBE8;'
	});
	tbar.add('->', {
		text: 'Delete',
		icon: '../../img/delete.png',
		handler: function() {
			var records = datav.getSelectedRecords();
			if (records.length != 0) {
				var imgName = '';
				for (var i = 0; i < records.length; i++) {
					imgName = imgName + records[i].data.name + ';';
				}
				Ext.Ajax.request({
					url: BASE_URL + 'delete/del_photo',
					method: 'post',
					params: {
						images: imgName
					},
					success: function() {
						ds_gambar.load();
					}
				});
			}
		}
	});
	var datav = new Ext.DataView({
		autoScroll: true,
		store: ds_gambar,
		tpl: tpl,
		autoHeight: false,
		height: 410,
		multiSelect: true,
		overClass: 'x-view-over',
		itemSelector: 'div.thumb-wrap',
		emptyText: 'No images to display',
		style: 'border:1px solid #99BBE8; border-top-width: 0',
		plugins: [new Ext.DataView.DragSelector(), new Ext.DataView.LabelEditor({
			dataIndex: 'name'
		})],
		prepareData: function(data) {
			data.shortName = Ext.util.Format.ellipsis(data.name, 15);
			data.sizeString = Ext.util.Format.fileSize(data.size);
			data.dateString = data.lastmod.format("m/d/Y g:i a");
			return data;
		},
		listeners: {
			click: {
				fn: function() {
					var selNode = datav.getSelectedRecords();
					if (selNode.length != 0) {
						var imgName = '';
						for (var i = 0; i < selNode.length; i++) {
							imgName = imgName + selNode[i].data.name;
						}
						tplDetail.overwrite(panelRightBottom.body, selNode[0].data);
					}
				}
			},
			selectionchange: {
				fn: function(dv, nodes) {
					var l = nodes.length;
					var s = l != 1 ? 's' : '';
					panelLeft.setTitle('Data Produk (' + l + ' item' + s + ' terpilih)');
				}
			}
		}
	});
        var panelLeft = new Ext.Panel({
		id: 'images-view',
		frame: true,
		Height: 500,
		title: 'Data Produk',
		items: [tbar, datav]
	});
	var panelRightTop = new Ext.FormPanel({
		title: 'Upload Images',
		width: 270,
		autoWidth: true,
		buttonAlign: 'center',
		labelWidth: 50,
		fileUpload: true,
		frame: true,
		items: [{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 1',
			buttonText: 'Select a File',
			width: 200,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 2',
			buttonText: 'Select a File',
			width: 200,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 3',
			buttonText: 'Select a File',
			width: 200,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 4',
			buttonText: 'Select a File',
			width: 200,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 5',
			buttonText: 'Select a File',
			width: 200,
			name: 'img[]'
		}],
		buttons: [{
			text: 'Upload',
			id: 'btn_upload',
			handler: function() {
				upload();
			}
		},
		{
			text: 'Reset',
			handler: function() {
				panelRightTop.getForm().reset();
			}
		}]
	});
	var panelRightBottom = new Ext.Panel({
		title: 'Image Detail',
		frame: true,
		width: 280,
		height: 255,
		id: 'panelDetail',
		tpl: tplDetail
	});
	function upload() {
		panelRightTop.getForm().submit({
			url: BASE_URL + 'upload/up_photo',
			waitMsg: 'Uploading ....',
			success: function(form, o) {
				obj = Ext.util.JSON.decode(o.response.responseText);
				if (obj.failed == '0' && obj.uploaded != '0') {
					Ext.Msg.alert('Success', 'All files uploaded');
				} else if (obj.uploaded == '0') {
					Ext.Msg.alert('Success', 'Nothing Uploaded');
				} else {
					Ext.Msg.alert('Success', obj.uploaded + ' files uploaded <br/>' + obj.failed + ' files failed to upload');
				}
				panelRightTop.getForm().reset();
				ds_gambar.load();
			}
		});
	}
	var o_m_product = new Ext.Panel({
		title: 'Form Product',
		margins: '0 0 5 0',
		layout: 'column',
		defaults: {
			split: true,
			bodyStyle: 'padding:5px'
		},
		items: [{
			region: 'center',
			margins: '35 5 5 0',
			layout: 'column',
			autoScroll: true,
			columnWidth: .76,
			baseCls: 'x-plain',
			bodyStyle: 'padding:5px 0 5px 5px',
			items: [panelLeft]
		},
		{
			collapsible: true,
			region: 'east',
			margins: '35 5 5 0',
			layout: 'column',
			autoScroll: true,
			columnWidth: .24,
			baseCls: 'x-plain',
			bodyStyle: 'padding:5px 0 5px 5px',
			items: [panelRightBottom]
		},
		{
			region: 'center',
			columnWidth: .24,
			autoScroll: true,
			margins: '5 0 0 0',
			cmargins: '5 5 0 0',
			items: [panelRightTop]
		}]
	});
	get_content(o_m_product);
}