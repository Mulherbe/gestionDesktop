function getUser(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('https://gestion.fred-dev.fr/api/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({ email :  'email@email.fr' , password : 'password',})
        // body: JSON.stringify({ email :  email , password : password,})
        }).then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
            if(responseData.access_token){
                localStorage.setItem('acces_token', responseData.access_token);
                window.location.href = "dashboard.html";
            }
          else {
            alert('Erreur dans le mail ou le mot de passe')
        }
      }).catch((error) => {
          console.log(error);
      });

}

async function getAllUser (){
    var access_token = localStorage.getItem('acces_token');
    console.log(access_token)

    fetch('https://gestion.fred-dev.fr/api/getUserByTrash', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': 'Bearer ' +  access_token},
        }).then((response) => response.json())
        .then((responseData) => {
            responseData.forEach(        
                user =>(createTab(user) )
                );

      }).catch((error) => {
          console.log(error);
      });
}


async function createTab (user){ 
    maDiv = document.createElement("tr");
    maDiv.id = user.id;
    // console.log(user)
    if(user.deleted_at){
        softDelete = '<button type="button" class="btn btn-outline-danger mr-2" data-toggle="modal" data-target=".bd-example-modal-sm" onclick="getIdUser('+user.id+',' +1+')" id="'+user.id+'" ><i class="material-icons">delete</i></button><button type="button" class="btn btn-outline-success" data-toggle="modal" data-target=".bd-example-modal-sm" onclick="getIdUser('+user.id+','+2+')" id="'+user.id+'" ><i class="material-icons">update</i></button> '
    }
    else{
        softDelete = '<button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target=".bd-example-modal-sm" onclick="getIdUser('+user.id+','+3+')" id="'+user.id+'" ><i class="material-icons">delete</i></button>'

    }
    maDiv.innerHTML = '<tr><th scope="row"> ' + user.id + '</td><td>' +user.name + '</td><td>' + user.firstName + '</td><td>' + user.email+'</td> <td>'+softDelete+'</td></tr> '
    document.getElementById('containerTab').append(maDiv);
    if(user.deleted_at){
        element = document.getElementById(user.id)
        element.classList.add("backgroundSoftDelete");
    }
}



function softDeleteUser(){
    var access_token = localStorage.getItem('acces_token');

    console.log(deleteId)
    console.log(idSelect)

     if (deleteId == 1){
        fetch('https://gestion.fred-dev.fr/api/permanentlyDeleted' ,{
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': 'Bearer ' +  access_token},
        body: JSON.stringify({
            id : idSelect,
            })
        }).then((response) => response.json() )
        .then((responseData) => {
            history.go(0)
        }).catch((error) => {
            console.log(error);
        })
    }
    else if (deleteId == 2){
        fetch('https://gestion.fred-dev.fr/api/restoreUser' ,{
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': 'Bearer ' +  access_token},
        body: JSON.stringify({
            id : idSelect,
            })
        }).then((response) => response.json() )
        .then((responseData) => {
            history.go(0)
        }).catch((error) => {
            console.log(error);
        })
    }
    
 else   if(deleteId == 3){
        fetch('https://gestion.fred-dev.fr/api/deleteUser' ,{
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': 'Bearer ' +  access_token},
            body: JSON.stringify({
                id : idSelect,
                })
            }).then((response) => response.json() )
            .then((responseData) => {
                history.go(0)
            }).catch((error) => {
                console.log(error);
            })
        }
    }

let idSelect = 0;
let deleteId = 0;

function getIdUser(id,deleteId2){
    idSelect = id;
    deleteId = deleteId2;
     if (deleteId == 1){
        element = document.getElementById('textModal')
        element.innerHTML ='Voulez vous supprimer definitivement cette utilisateur ?';
     }
    else if (deleteId == 2){
        element = document.getElementById('textModal')
        element.innerHTML ='Voulez vous restorer cette utilisateur ??';
     }
    else if (deleteId == 3){
        element = document.getElementById('textModal')
        element.innerHTML ='Voulez vous soft delete cette utilisateur ?';
     }

}