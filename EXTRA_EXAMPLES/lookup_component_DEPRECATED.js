{
				xtype: 'container',
				fieldLabel: 'Kota/Kabupaten',
				layout: 'hbox', defaultType: 'textfield', width: 350,
				defaults: { hideLabel: 'true'},
                items: [
				{	id: 'tf.kdkotaortu', width: 80, readOnly: true, hidden: true }
				,
				{ 	id: 'tf.kotaortu', width: 300, readOnly: true }
				,
				{ 	xtype: 'button', id: 'btn.kotaortu', iconCls: 'silk-find',
                    margins: '0 0 0 6', width: 30,
					handler: function() { wLookup(lu_kota, 'Kota/Kabupaten','tf.kdkotaortu','tf.kotaortu');}
				}]		
			}