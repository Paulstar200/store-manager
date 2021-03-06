let salesUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/sales';
const userUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';

const salesRecords = () => {
    fetch(salesUrl, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Successfully retrieved the sales records"){
            let i;
            console.log(data);
            let output = `<tr>
                <th>Sale id</th>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total price</th>
                <th>Sold by</th>
            </tr>`;

            let myArray = data['Sales'];
            myArray.forEach(sale => {
            let sale_id = sale["sale id"];
            output += `
            <tr>
                <td>${sale_id}</td>
                <td>${sale.product_name}</td>
                <td>${sale.quantity}</td>
                <td>${sale.price}</td>
                <td>${sale.total_price}</td>
                <td>${sale.attendant_name}</td>
            </tr>
        ` 
            document.getElementById("adminview").innerHTML = output;
        }) 
            localStorage.setItem("allsales", JSON.stringify(data['Sales']));
            var elem = document.getElementById("nosales");
            elem.remove();
    }
        else{
            console.log(data);
        }
        
    })
    .then(
        fetch(userUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type' : 'application/json'
            }
        })
            .then(res => res.json())
            .then(respdata => {
                let thediv = document.getElementById('description');
                let i = 0;
                for (i; i < respdata['users'].length; i++) {
                    let username = localStorage.getItem('username');
                    if (username == respdata['users'][i].username) {
                        thediv.innerHTML = `<p class="subdescription">Logged in as: ${respdata['users'][i].username} (${respdata['users'][i].role})</p>`
                    }
                    console.log(respdata['users'][i].username);
                }
                
            }
            )
    )
  }
