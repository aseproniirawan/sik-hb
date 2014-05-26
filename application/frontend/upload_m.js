function upload_x() {
	var ds_gambar = new Ext.data.JsonStore({
		proxy: new Ext.data.HttpProxy({
			url: BASE_URL + 'get_images/get_Photox',
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
	//  ds_gambar.load();
	var tpl = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{name}">', '<div class="thumb"><img src="../{thumb_url}" title="{name}"></div>', '<span class="x-editable">{shortName}</span></div>',
	//        '<span class="x-editable">{name}</span></div>',
	'</tpl>', '<div class="x-clear"></div>');
	var tbar = new Ext.Toolbar({
		style: 'border:1px solid #99BBE8;'
	});
	tbar.add('->', {
		text: 'Delete',
		icon: '../../img/delete.png',
		handler: function() {
			Ext.MessageBox.show({
				title: "Konfirmasi",
				msg: "Anda Yakin Untuk menghapus Data ini?",
				buttons: Ext.MessageBox.YESNO,
				fn: function(btn) {
					if (btn == 'yes') {
						var records = datav.getSelectedRecords();
						if (records.length != 0) {
							var imgName = '';
							for (var i = 0; i < records.length; i++) {
								imgName = imgName + records[i].data.name + ';';
							}
							Ext.Ajax.request({
								url: BASE_URL + 'delete/del_photo',
								//delete.php
								method: 'post',
								params: {
									images: imgName
								},
								success: function() {
									Ext.MessageBox.alert("Informasi", "Hapus Data Berhasil");
									ds_gambar.load();
								},
								failure: function() {
									Ext.MessageBox.alert("Informasi", "Hapus Data Gagal");
								}
							});
						}
					}
				}
			})
			// function end
		}
	});
	var datav = new Ext.DataView({
		bodyBorder:false,
                autoScroll: true,
		store: ds_gambar,
		tpl: tpl,
		//autoHeight: true, 
		height: 460,
		autoWidth: true,
		multiSelect: true,
		overClass: 'x-view-over',
		itemSelector: 'div.thumb-wrap',
		emptyText: 'No images to display',
		style: 'border:1px solid #99BBE8; border-top-width: 0',
		//title:'Data Produk',
		plugins: [
		new Ext.DataView.DragSelector(), new Ext.DataView.LabelEditor({
			dataIndex: 'name'
		})],
		prepareData: function(data) {
			data.shortName = Ext.util.Format.ellipsis(data.name, 15);
			data.sizeString = Ext.util.Format.fileSize(data.size);
			//data.dateString = data.lastmod.format("m/d/Y g:i a");
			return data;
		},
		listeners: {
			click: {
				fn: function() {
					var selNode = datav.getSelectedRecords();
					//tplDetail.overwrite(panelRightBottom.body, selNode[0].data);
					//awal ==============================
					if (selNode.length != 0) {
						var imgName = '';
						for (var i = 0; i < selNode.length; i++) {
							imgName = imgName + selNode[i].data.name;
						}
						// tplDetail.overwrite(panelRightBottom.body, selNode[0].data);
					}
					//akhir============================
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
	})
	var panelLeft = new Ext.Panel({
		id: 'images-view',
		frame: true,
		// autoHeight: true,
		//autoWidth: true,
		height: 520,
		width: 515,
		title: 'Data Produk',
		items: [tbar, datav]
	});
	//   panelLeft.render('left');
	var panelRightTop = new Ext.FormPanel({
		title: 'Upload Images (Maks 500Kb)',
		//width: 370,
		//height:370,
		//  renderTo: 'right-top',
		autoWidth: true,
		autoHeight: true,
		buttonAlign: 'center',
		labelWidth: 60,
		fileUpload: true,
		frame: true,
		//border:false,
		items: [{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 1',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 2',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 3',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 4',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 5',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 6',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 7',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 8',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 9',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 10',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 11',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 12',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 13',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 14',
			buttonText: 'Select a File',
			width: 210,
			name: 'img[]'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: '',
			fieldLabel: 'Image 15',
			buttonText: 'Select a File',
			width: 210,
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
	//=================================================== AWAL
	var o_m_product = new Ext.Panel({
		// title : 'Form Product',
		margins: '0 0 5 0',
		layout: 'column',
		defaults: {
			// collapsible: true,
			split: true,
			bodyStyle: 'padding:5px'
		},
		items: [{
			region: 'center',
			margins: '35 5 5 0',
			layout: 'column',
			autoScroll: true,
			columnWidth: .63,
			baseCls: 'x-plain',
			bodyStyle: 'padding:5px 0 5px 5px',
			items: [ //
			panelLeft]
		},
		{
			region: 'center',
			columnWidth: .37,
			autoScroll: true,
			margins: '5 10 10 0',
			cmargins: '5 5 0 0',
			bodyStyle: 'padding:5px 0 5px 5px',
			items: [panelRightTop]
		}]
	});
	var win_find = new Ext.Window({
		title: "Data File Gambar",
		modal: true,
		height: 560,
		//atas bawah
		width: 850,
		// kanan kiri
		items: [o_m_product]
	}).show();
}