function UGDhasil(){
		var structure = {
			Asia: ['Beijing', 'Tokyo'],
			Europe: ['Berlin', 'London', 'Paris']
		},
		products = ['ProductX', 'ProductY'],
		fields = [],
		columns = [],
		data = [],
		continentGroupRow = [],
		cityGroupRow = [];
		
		var group = new Ext.ux.grid.ColumnHeaderGroup({
			rows: [continentGroupRow, cityGroupRow]
		});
		
		function generateConfig(){
			var arr,
				numProducts = products.length;
				
			Ext.iterate(structure, function(continent, cities){
				continentGroupRow.push({
					header: continent,
					align: 'center',
					colspan: cities.length * numProducts
				});
				Ext.each(cities, function(city){
					cityGroupRow.push({
						header: city,
						colspan: numProducts,
						align: 'center'
					});
					Ext.each(products, function(product){
						fields.push({
							type: 'int',
							name: city + product
						});
						columns.push({
							dataIndex: city + product,
							header: product,
							renderer: Ext.util.Format.usMoney
						});
					});
					arr = [];
					for(var i = 0; i < 20; ++i){
						arr.push((Math.floor(Math.random()*11) + 1) * 100000);
					}
					data.push(arr);
				});
			})
		}
		generateConfig();
		
		var grid = new Ext.grid.GridPanel({
			title: 'Sales By Location',
			width: 1000,
			height: 400,
			store: new Ext.data.ArrayStore({
				fields: fields,
				data: data
			}),
			columns: columns,
			viewConfig: {
				forceFit: true
			},
			plugins: group
		});
		
		/* var pasienri_form = new Ext.form.FormPanel({ 
			id: 'fp.pasienri',
			title: 'Pasien',
			width: 900, Height: 1000,
			layout: {
				type: 'form',
				pack: 'center',
				align: 'center'
			},
			frame: true,
			autoScroll: true,
			items: [{
				xtype: 'fieldset', layout: 'form',
				title: 'Riwayat Kedatangan Pasien',
				items: [grid]
			}]
		}); SET_PAGE_CONTENT(pasienri_form); */
}