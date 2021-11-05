
//Simple JS to call the backend API ###


function extractAPI(api) {
    fetch(api)
    .then((response)=> {
    return response.json();
    })
    .then((data)=> {
        const userDetails = data.map(user => {
        return `
            <li> ID : ${user.id}</li>
            <li> Name : ${user.name} </li>
            <li> Username : ${user.username} </li>
            <li> Email : ${user.email} </li>
            <li> Address : Street: ${user.address.street}, 
                Suite: ${user.address.suite}, 
                City: ${user.address.city}, 
                Zipcode: ${user.address.zipcode}
            </li>
            <li> Phone: ${user.phone} </li>
            <li> Website : ${user.website} </li>
            <li> Company : ${user.company.name} </li>
            `
        })
        document.getElementById("userDetails").innerHTML = userDetails

    })
   .catch((error)=>{
     console.log(error)
    })
}

extractAPI('https://jsonplaceholder.typicode.com/users')
