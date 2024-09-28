const data = [
  { "id": 1, "chemicalName": "Ammonium Persulfate", "vendor": "LG Chem", "density": 3525.92, "viscosity": 60.631, "packaging": "Bag", "packSize": 100, "unit": "kg", "quantity": 6495.18 },
  { "id": 2, "chemicalName": "Caustic Potash", "vendor": "Formosa", "density": 3172.15, "viscosity": 48.22, "packaging": "Bag", "packSize": 100, "unit": "kg", "quantity": 8751.90 },
  { "id": 3, "chemicalName": "Dimethylaminopropylamine", "vendor": "LG Chem", "density": 8453.37, "viscosity": 12.62, "packaging": "Barrel", "packSize": 75, "unit": "L", "quantity": 5964.61 },
  { "id": 4, "chemicalName": "Mono Ammonium Phosphate", "vendor": "Sinopec", "density": 1597.65, "viscosity": 76.51, "packaging": "Bag", "packSize": 105, "unit": "kg", "quantity": 8183.73 },
  { "id": 5, "chemicalName": "Ferric Nitrate", "vendor": "DowDupont", "density": 364.04, "viscosity": 14.90, "packaging": "Bag", "packSize": 105, "unit": "kg", "quantity": 4154.33 },
  { "id": 6, "chemicalName": "n-Pentane", "vendor": "Sinopec", "density": 4535.26, "viscosity": 66.76, "packaging": "N/A", "packSize": "N/A", "unit": "L", "quantity": 6272.34 },
  { "id": 7, "chemicalName": "Glycol Ether PM", "vendor": "LG Chem", "density": 6495.18, "viscosity": 72.12, "packaging": "Bag", "packSize": 250, "unit": "kg", "quantity": 8749.54 },
  { "id": 8, "chemicalName": "Sodium Chloride", "vendor": "Formosa", "density": 2162.31, "viscosity": 55.45, "packaging": "Bag", "packSize": 50, "unit": "kg", "quantity": 9152.72 },
  { "id": 9, "chemicalName": "Sulfuric Acid", "vendor": "BASF", "density": 2341.67, "viscosity": 85.32, "packaging": "Barrel", "packSize": 200, "unit": "L", "quantity": 7561.25 },
  { "id": 10, "chemicalName": "Acetone", "vendor": "DowDupont", "density": 1264.78, "viscosity": 25.47, "packaging": "Barrel", "packSize": 150, "unit": "L", "quantity": 4872.96 },
  { "id": 11, "chemicalName": "Hydrochloric Acid", "vendor": "Sinopec", "density": 1725.84, "viscosity": 63.12, "packaging": "Bag", "packSize": 100, "unit": "kg", "quantity": 6981.35 },
  { "id": 12, "chemicalName": "Sodium Bicarbonate", "vendor": "LG Chem", "density": 2736.23, "viscosity": 34.58, "packaging": "Bag", "packSize": 75, "unit": "kg", "quantity": 9284.72 },
  { "id": 13, "chemicalName": "Ethanol", "vendor": "BASF", "density": 789.45, "viscosity": 1.2, "packaging": "Barrel", "packSize": 200, "unit": "L", "quantity": 6205.56 },
  { "id": 14, "chemicalName": "Sodium Hydroxide", "vendor": "Formosa", "density": 2152.62, "viscosity": 78.96, "packaging": "Bag", "packSize": 100, "unit": "kg", "quantity": 9056.28 },
  { "id": 15, "chemicalName": "Toluene", "vendor": "DowDupont", "density": 867.32, "viscosity": 29.83, "packaging": "Barrel", "packSize": 250, "unit": "L", "quantity": 4823.45 }

];

const originalData = [...data];
const stateStack = [];
var selectedRowIndex = null;
let currentPage = 1;
const recordsPerPage = 4;
let editingRowId = null;


function populateTable() {

  const currentState = structuredClone(data);
  stateStack.push(currentState);
  stateStack.push(JSON.parse(JSON.stringify(data)));

  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  const start = (currentPage - 1) * recordsPerPage;
  const end = Math.min(start + recordsPerPage, data.length);

  for (let i = start; i < end; i++) {
    const row = data[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" onclick="selectRow(${i}, this)"></td>
      <td>${row.id}</td>
      <td>${row.chemicalName}</td>
      <td>${row.vendor}</td>
      <td>${row.density}</td>
      <td>${row.viscosity}</td>
      <td>${row.packaging}</td>
      <td>${row.packSize}</td>
      <td>${row.unit}</td>
      <td>${row.quantity}</td>
      <td><button id="edit-button"  onclick="editRow(${i},this)"><i class="fa-solid fa-pen-to-square"></i></button></td>
    `;
    tr.addEventListener('click', () => selectRow(i));
    tableBody.appendChild(tr);
  }

  updatePaginationButtons();
}

function pushState() {
  stateStack.push(structuredClone(data));
}


let sortDirection = {};

function sortTable(column, type) {
  pushState();
  const direction = sortDirection[column] === 'asc' ? 'desc' : 'asc';
  sortDirection[column] = direction;

  data.sort((a, b) => {
    let aValue = a[column];
    let bValue = b[column];

    if (type === 'string') {
      return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (type === 'number') {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  populateTable();
}

document.querySelectorAll('th').forEach((th, index) => {
  th.addEventListener('click', () => {
    switch (index) {
      case 1:
        sortTable('id', 'number');
        break;
      case 2:
        sortTable('chemicalName', 'string');
        break;

      case 3:
        sortTable('vendor', 'string');
        break;
      case 4:
        sortTable('density', 'number');
        break;
      case 5:
        sortTable('viscosity', 'number');
        break;
      case 6:
        sortTable('packaging', 'string');
        break;
      case 7:
        sortTable('packSize', 'number');
        break;
      case 8:
        sortTable('unit', 'string');
        break;
      case 9:
        sortTable('quantity', 'number');
        break;
      default:
        break;

    }
  });
});

function editRow(index) {
  const rowData = data[index];
 // selectedRowIndex = index;
  editingRowId = rowData.id;
  console.log("Selected row inside edit row:"+selectedRowIndex);
  pushState(); 
  document.getElementById('editId').value = rowData.id;
  document.getElementById('editChemicalName').value = rowData.chemicalName;
  document.getElementById('editVendor').value = rowData.vendor;
  document.getElementById('editDensity').value = rowData.density;
  document.getElementById('editViscosity').value = rowData.viscosity;
  document.getElementById('editPackaging').value = rowData.packaging;
  document.getElementById('editPackSize').value = rowData.packSize;
  document.getElementById('editUnit').value = rowData.unit;
  document.getElementById('editQuantity').value = rowData.quantity;

  document.getElementById('editModal').style.display = 'block';
}


function selectRow(index) {
  if (selectedRowIndex === index) {
    selectedRowIndex = null;
  } else {
    selectedRowIndex = index;

  }

  document.getElementById('upButton').disabled = selectedRowIndex === null || selectedRowIndex === 0;
  document.getElementById('downButton').disabled = selectedRowIndex === null || selectedRowIndex === data.length - 1;
  document.getElementById('deleteButton').disabled = selectedRowIndex === null;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, idx) => {
    checkbox.checked = idx === selectedRowIndex;
    const row = checkbox.closest('tr'); 
    if (idx === selectedRowIndex) {
      checkbox.checked = true; 
      row.classList.add('highlighted'); 
    } else {
      checkbox.checked = false; 
      row.classList.remove('highlighted'); 
    }

  });
}


function saveChanges() {
  pushState(); 
  const editedRow = {
    id: parseInt(document.getElementById('editId').value),
    chemicalName: document.getElementById('editChemicalName').value,
    vendor: document.getElementById('editVendor').value,
    density: parseFloat(document.getElementById('editDensity').value),
    viscosity: parseFloat(document.getElementById('editViscosity').value),
    packaging: document.getElementById('editPackaging').value,
    packSize: parseFloat(document.getElementById('editPackSize').value),
    unit: document.getElementById('editUnit').value,
    quantity: parseFloat(document.getElementById('editQuantity').value),
  };

    console.log("selected index"+ selectedRowIndex);
  if (editingRowId !== null ) {
   
    data[selectedRowIndex] = editedRow; 
    swal("", "Data Edited Successfully", "success")
    editingRowId = null;
  } else if(selectedRowIndex == null){
    data.unshift(editedRow); 
    swal("", "Data Added Successfully", "success")
  }

  closeModal();
  populateTable();
}


document.getElementById('addRowButton').addEventListener('click', function () {
  pushState(); 
  selectedRowIndex = null;  
  const newId = data.length ? Math.max(...data.map(row => row.id)) + 1 : 1;

  document.getElementById('editId').value = newId;
  document.getElementById('editChemicalName').value = '';
  document.getElementById('editVendor').value = '';
  document.getElementById('editDensity').value = '';
  document.getElementById('editViscosity').value = '';
  document.getElementById('editPackaging').value = '';
  document.getElementById('editPackSize').value = '';
  document.getElementById('editUnit').value = '';
  document.getElementById('editQuantity').value = '';

  document.getElementById('editModal').style.display = 'block'; 
});


function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

document.getElementById('upButton').addEventListener('click', function () {
  if (selectedRowIndex > 0) {
    pushState(); 
    [data[selectedRowIndex - 1], data[selectedRowIndex]] = [data[selectedRowIndex], data[selectedRowIndex - 1]];
    populateTable();
    selectedRowIndex--;
  }
});

document.getElementById('downButton').addEventListener('click', function () {
  if (selectedRowIndex < data.length - 1) {
    pushState(); 
    [data[selectedRowIndex], data[selectedRowIndex + 1]] = [data[selectedRowIndex + 1], data[selectedRowIndex]];
    populateTable();
    selectedRowIndex++;
  }
});

document.getElementById('deleteButton').addEventListener('click', function () {
  if (selectedRowIndex !== null) {
    pushState(); 
    data.splice(selectedRowIndex, 1);
    selectedRowIndex = null;
    populateTable();
    document.getElementById('upButton').disabled = true;
    document.getElementById('downButton').disabled = true;
    document.getElementById('deleteButton').disabled = true;
  }
});

function updatePaginationButtons() {
  const totalPages = Math.ceil(data.length / recordsPerPage);
  document.getElementById('pagination').innerHTML = `
    <button onclick="prevPage()" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;
}

function nextPage() {
  const totalPages = Math.ceil(data.length / recordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    populateTable();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    populateTable();
  }
}

document.getElementById('saveButton').addEventListener('click', saveChanges);
document.getElementById('cancelButton').addEventListener('click', closeModal);
document.querySelector('.close').addEventListener('click', closeModal);

populateTable();

function undo() {
  if (stateStack.length > 1) {
    stateStack.pop(); 
    data = structuredClone(stateStack[stateStack.length - 1]); 
    populateTable(); 
  } else {
    console.log("No more actions to undo");
  }
}


document.getElementById('saveButton1').addEventListener('click', function () {

  const printWindow = window.open('', '_blank');


  printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Chemical Supplies Table</h2>
        <table>
          <thead>
            <tr>
              
              <th>ID</th>
              <th>Chemical Name</th>
              <th>Vendor</th>
              <th>Density</th>
              <th>Viscosity</th>
              <th>Packaging</th>
              <th>Pack Size</th>
              <th>Unit</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${generateTableRows()}
          </tbody>
        </table>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close();
  };
});


function generateTableRows() {
  return data.map(row => `
    <tr>
      <td>${row.id}</td>
      <td>${row.chemicalName}</td>
      <td>${row.vendor}</td>
      <td>${row.density}</td>
      <td>${row.viscosity}</td>
      <td>${row.packaging}</td>
      <td>${row.packSize}</td>
      <td>${row.unit}</td>
      <td>${row.quantity}</td>
    </tr>
  `).join('');
}

