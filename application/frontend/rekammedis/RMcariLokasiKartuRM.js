/**
 * @author RONI
 */
function RMcariLokasiKartuRM(){
	
	//Main Form
	var main_form = new Ext.form.FormPanel({		
		id: 'formRMpengirimanKartuRM', region: 'center', bodyStyle: 'padding: 5px;', border: false,
		title: 'CARI LOKASI KARTU RM', autoScroll: true, 		
		items: [{
			xtype: 'container',	style: 'padding: 5px', defaults: { labelAlign: 'right'},
			items: [{
				xtype: 'fieldset', border: false, labelWidth: 170,
				items: [{
					xtype: 'compositefield', fieldLabel: 'No. RM',
					items: [{
						xtype: 'textfield', id: 'tf.ruangann', width: 120
					},{
						xtype: 'button', text: ' ... ',	id: 'btn.ruangan', width: 30,
						handler: function() {
							alert('No. Registrasi');
						}
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Nama Pasien',
					id: 'tf.nmpasien', disabled: true, width: 355	
				},{
					xtype: 'compositefield', name: 'comp2', id: 'comp2', fieldLabel: 'Jenis Kelamin',
					items:[{
						xtype: 'textfield', id: 'tf.noregis', width: 100
					},{
						xtype: 'label', id: 'lb.tgllahir', text: 'Tgl. Lahir', margins: '2 10 0 90',
					},{
						xtype: 'datefield', id: 'df.tglrencanamsk', width: 100, value: new Date()
					}]
				},{
					xtype: 'textfield', fieldLabel: 'Alamat',
					id: 'tAlamat', disabled: true, width: 355
				},{
					xtype: 'textfield', fieldLabel: 'Lokasi Kartu RM Saat ini',
					id: 'tLokasiRM', disabled: true, width: 355
				},{
					xtype: 'textfield', fieldLabel: 'Lokasi Kartu RM Sebelumnya',
					id: 'tLokasiRMSebelumnya', disabled: true, width: 355
				}]
			}]
		}]		
	});
	//Main Layout
	SET_PAGE_CONTENT(main_form);
}
