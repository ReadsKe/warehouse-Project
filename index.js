document.addEventListener('DOMContentLoaded', function () {
    const warehouseForm = document.getElementById('warehouseForm');
    const warehouseList = document.getElementById('warehouseList');

    // Function to fetch and display warehouse advertisements
        fetch('https://truckspaceke.onrender.com/warehouses')
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
                        <button data-id="${ad.id}" class="BookBtn"> Request more details</button> 
                        <button data-id="${ad.id}" class="deleteBtn" >Delete Advertisement</button>
                        </div>`
                        console.log(ad)
                        // Changed the BookBtn to have details Request more details as its functionality is not yet available 
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
                price: price,
                availabilityDate: availabilityDate,
            };
        fetch('https://truckspaceke.onrender.com/warehouses', {
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
            warehouseList.innerHTML = ''; 
            fetchWarehouseAdvertisements();
        });

        alert('Advertisement added successfully.');

    })

    // Event listener for a delete button
    warehouseList.addEventListener('click', function (e) {
        if (e.target.classList.contains('deleteBtn')) {
            const adId = e.target.getAttribute('data-id');
            deleteAdvertisement(adId);

            alert('Advertisement deleted successfully.');
        }
    });

    // Function to delete a warehouse advertisement
    function deleteAdvertisement(adId) {
        // Delete Request
        fetch(`https://truckspaceke.onrender.com/warehouses/${adId}`, {
            method: 'DELETE',
        })
        .then(() => {
            warehouseList.innerHTML = ''; 
            fetchWarehouseAdvertisements();
        })
    }
    



});
