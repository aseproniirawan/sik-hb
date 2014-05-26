function onCellJnsRuanganClick(grid, rowIndex, columnIndex, e) {
		var t = e.getTarget();
        var record = grid.getStore().getAt(rowIndex);  // Get the Record
        //var columnId = grid.getColumnModel().getId(columnIndex); // Get column id
        var sm = grid.getSelectionModel();
        var sel = sm.getSelected();

        if (t.className == 'imgEdit') {
			fnEditJnsRuangan(grid, record);
			return true;
        }
        if (t.className == 'imgDelete') {
			fnDeleteJnsRuangan(grid, record);            
            return true;
        }
			
        return false;
    }