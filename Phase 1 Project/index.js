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

    // Event listener for form submission to add a warehouse advertisement
    warehouseForm.addEventListener('submit', function (e) {
            e.preventDefault();
    
            const image = document.getElementById('image').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const availabilityDate = document.getElementById('availabilityDate').value;
            // Simulated JSON object
            const warehouseData = {
                image: image,
                description: description,
                price: parseFloat(price),
                availabilityDate: availabilityDate,
            };
            // Simulated POST request (replace with actual API POST request)
            fetch('http://localhost:3000/warehouses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(warehouseData),
            })
                .then(response => response.json())
                .then(() => {
                    // Clear the form and refresh the list
                    warehouseForm.reset();
                    warehouseList.innerHTML = ''; // Clear the existing list
                    fetchWarehouseAdvertisements();
                });
     })
    


});