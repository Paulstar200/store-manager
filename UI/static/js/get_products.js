let allProductsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/products';
const userUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';


const getProducts = () => {
    fetch(allProductsUrl, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data['Products']){
            var myArray = data['Products'];
            
            for (let num = 0; num < myArray.length; num++) {
                let item = myArray[num];
                console.log(item);
                let ul = document.getElementById("myproducts");
                let li = document.createElement('li');
                let pn = document.createElement('p');
                let pr = document.createElement('p');
                let pc = document.createElement('p');
                let pq = document.createElement('p');
                let bt = document.createElement('button');
                
                pn.innerHTML = "".concat("Product: ", item.name);
                pc.innerHTML = "".concat("Category: ", item.category);
                pr.innerHTML = "".concat("Price: Ksh. ", item.price);
                pq.innerHTML = "".concat("Available stock: ", item.inventory);

                
                pr.classList.add("productdescription");
                pn.classList.add("productdescription");
                pc.classList.add("productdescription");
                pq.classList.add("productdescription");
                
                bt.classList.add('add-cart');
                li.append(pn);
                li.append(pc);
                li.append(pr);
                li.append(pq);
                
                ul.append(li);
            }
 
        } else{
            document.getElementById('error-prod').innerHTML = "No products at the moment";
        }
        
    }).catch( (err) => {
        console.log('ERROR:', err.message);
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


function searchInput() {
    var input, filter, ul, li, p, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myproducts");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("p")[0];
        if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}