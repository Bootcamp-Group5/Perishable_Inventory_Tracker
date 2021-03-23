async function logout(event) {
    event.preventDefault();
    
      const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
  
    
      if (response.ok) {
        //console.log("response of function log out good")
        alert("Logging you out")
       // document.location.replace('/login');
        document.location.replace('/');
      } else {
        //console.log("response of function log out bad")
        //document.location.replace('/');
        //document.location.replace('/login');
        alert("You are already logged out")
        //alert(response.statusText);
      }
    }
    
    document.querySelector('#logout').addEventListener('click', logout);