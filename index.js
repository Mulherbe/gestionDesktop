
    fetch('https://gestion.fred-dev.fr/api/getUserById', {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({
          id_user : 1
          })
        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
      }).catch((error) => {
          console.log(error);
      });
  
      console.log(1)