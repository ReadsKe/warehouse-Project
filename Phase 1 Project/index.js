document.addEventListener('DOMContentLoaded', function () {
    const warehouseForm = document.getElementById('warehouseForm');
    const warehouseList = document.getElementById('warehouseList');

    // Function to fetch and display warehouse advertisements
    // function fetchWarehouseAdvertisements() {
        fetch('http://localhost:3000/warehouses')
            .then(response => response.json())
            .then(data => {
                const warehouseList = document.getElementById("warehouseList")
                
                data.map((ad)=> {
                        warehouseList.innerHTML += `<div id="adpost">
                        <strong><p>Warehouse Name: ${ad.warehouseName}</p></strong>
                        <img src="${ad.image}" alt="Warehouse Image" width="500">
                         <p>Description: ${ad.description}</p>
                        <p>Price: $${ad.price}</p>
                        <p>Availability Date: ${ad.availabilityDate}</p>
                        <button data-id="${ad.id}" class="deleteBtn">Delete</button></br>
                        </div>`
                        console.log(ad)
                })
            })

    // 
    


});