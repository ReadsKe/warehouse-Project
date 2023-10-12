document.addEventListener('DOMContentLoaded', function () {
    const warehouseForm = document.getElementById('warehouseForm');
    const warehouseList = document.getElementById('warehouseList');

    // Function to fetch and display warehouse advertisements
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
                        <button data-id="${ad.id}" class="deleteBtn">Delete Advertisement</button>
                        </div>`
                        console.log(ad)
                })
            })

    // Event listener for form submission to add a warehouse advertisement
    warehouseForm.addEventListener('submit', function (e) {
            e.preventDefault(); //Prevents resubmissions 
    
            const image = document.getElementById('image').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const availabilityDate = document.getElementById('availabilityDate').value;
            
            const warehouseData = {
                image: image,
                description: description,
                price: parseFloat(price),
                availabilityDate: availabilityDate,
            };
        // POST request
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
            warehouseList.innerHTML = ''; // Clears the existing list
            fetchWarehouseAdvertisements();
        });
    })

    // Event listener for a delete button
    warehouseList.addEventListener('click', function (e) {
        if (e.target.classList.contains('deleteBtn')) {
            const adId = e.target.getAttribute('data-id');
            deleteAdvertisement(adId);
        }
    });

    // Function to delete a warehouse advertisement
    function deleteAdvertisement(adId) {
        // Delete Request
        fetch(`http://localhost:3000/warehouses/${adId}`, {
            method: 'DELETE',
        })
        .then(() => {
            //  list Refreshes after deleting advertisement
            warehouseList.innerHTML = ''; 
            fetchWarehouseAdvertisements();
        })
    }



});
