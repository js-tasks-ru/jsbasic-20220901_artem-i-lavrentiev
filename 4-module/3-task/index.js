function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let tableRow = table.rows[i];
    for (let j = 0; j < tableRow.cells.length; j++) {
      let tableCell = tableRow.cells[j];
      if (j == 1) {
        if (tableCell.innerHTML < 18) {
          tableRow.style.textDecoration = 'line-through';
        }
      }
      if (j == 2) {
        tableRow.classList.add(tableCell.innerHTML == 'm' ? 'male' : 'female');
      }
      if (j == 3) {
        if (tableCell.hasAttribute('data-available')) {
          let attrAvailable = tableCell.dataset.available;
          tableRow.classList.add(attrAvailable == 'true' ? 'available' : 'unavailable');
        }
        else {
          tableRow.hidden = true;
        }
      }
    }
  };
}