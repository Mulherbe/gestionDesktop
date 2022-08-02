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

function getAllUser (){
    var access_token = localStorage.getItem('acces_token');
    fetch('https://gestion.fred-dev.fr/api/users', {
        method: 'GET',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': 'Bearer ' +  access_token},
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            responseData.forEach(              
                user => createTab(user)
                );

      }).catch((error) => {
          console.log(error);
      });
}


function createTab (user){ 
    console.log(user)
    maDiv = document.createElement("div");
    maDiv.id = user.id;
    maDiv.innerHTML = '<div>'+ user.firstName + user.name + user.email + '</div>';
    document.getElementById('containerTab').append(maDiv);
}
