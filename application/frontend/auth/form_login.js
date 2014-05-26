Ext.onReady(function() {
	//winRegister.show();
	/* 02. Start The Form Login Component */
	// 02. Form Login
	var formLogin = new Ext.FormPanel({
		frame: false,
		border: false,
		//buttonAlign: 'center',
		url: BASE_URL + 'auth/ext_login',
		method: 'POST',
		id: 'frmLogin',
		bodyStyle: 'padding:10px 10px 15px 15px;background:#dfe8f6;',
		width: 310,               
		height: 260,
		labelWidth: 100,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Username',
			name: 'username',
			id: 'logUsername',
			allowBlank: false,
			width: 200
		}, {
			xtype: 'textfield',
			fieldLabel: 'Password',
			name: 'password',
			id: 'logPassword',
			allowBlank: false,
			inputType: 'password',
			width: 200
		}],
		buttons: [
//		{
//			text: 'Reset',
//			handler: function() {
//				formLogin.getForm().reset();
//			}
//		},
		'->',
		{
			text: 'Login',
			handler: fnLogin
		}],
		keys: [{
			key: [Ext.EventObject.ENTER],
			handler:
			//   Ext.Msg.alert("Alert","Enter Key Event !");
			fnLogin
		}]
	});

	function fnLogin() {
		Ext.getCmp('frmLogin').on({
			beforeaction: function() {
				if (formLogin.getForm().isValid()) {
					//    Ext.getCmp('winRegister').body.mask();
					Ext.getCmp('winLogin').body.mask();
					Ext.getCmp('sbWinLogin').showBusy();
				}
			}
		});
		formLogin.getForm().submit({
			success: function() {
				window.location = BASE_URL ;//+ 'auth/login';
			},
			failure: function(form, action) {
				//  Ext.getCmp('winRegister').body.unmask();
				Ext.getCmp('winLogin').body.unmask();
				if (action.failureType == 'server') {
					obj = Ext.util.JSON.decode(action.response.responseText);
					Ext.getCmp('sbWinLogin').setStatus({
						text: obj.errors.reason,
						iconCls: 'x-status-error'
					});
				} else {
					if (formLogin.getForm().isValid()) {
						Ext.getCmp('sbWinLogin').setStatus({
							text: 'Authentication server is unreachable',
							iconCls: 'x-status-error'
						});
					} else {
						Ext.getCmp('sbWinLogin').setStatus({
							text: 'User dan password tidak boleh kosong !',
							iconCls: 'x-status-error'
						});
					}
				}
			}
		});
	}
	// 02. Window Login
	var winLogin = new Ext.Window({
		title: 'LOGIN',
		id: 'winLogin',
		layout: 'fit',
		width: 350,
		height: 160,
		y: 150,
		resizable: false,
		closable: false,
		draggable: false,
		items: [formLogin],
		bbar: new Ext.ux.StatusBar({
			text: 'Ready',
			id: 'sbWinLogin'
		})
	});
	winLogin.show();
});