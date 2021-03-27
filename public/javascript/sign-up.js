async function signupFormHandler(event) {
    event.preventDefault();
    console.log("button clicked")
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    let phone_number = document.querySelector('#phone_number-signup').value.trim();
  
  
    // When the user does not provide a phone number.
    if (username !== "" && password !== "") {
      
      if (username && password && phone_number) { // phone number provided

        
        phone_number = phone_number.split("");
        phone_number.splice(3, 1);
        phone_number.splice(6, 1);
        phone_number.unshift("1");
        phone_number = phone_number.join("");
        console.log(phone_number);


        if (isNaN(phone_number)) { // Not a phone number

          alert("Please enter a valid phone number")

        } else { // good phone number provided

          const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
              username,
              password,
              phone_number
            }),
            headers: { 'Content-Type': 'application/json' }
          });
        // console.log(response);.
            // check the response status
          if (response.ok) {
              //console.log(`this is the response ${response}`)
              
              console.log('success');
              document.location.replace('/');
          } else {
              alert(response.statusText);
          }

        }

      }
    }  else if (username && password) { // No phone number provided

        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
      // console.log(response);.
          // check the response status
        if (response.ok) {
            //console.log(`this is the response ${response}`)
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }

    } else {
  
      if (username === "" && password === "") {
        alert("Please enter a username and password, then submit")
      } else if (username === "") {
        alert("Please enter a username, then submit")
      } else if (password === "") {
        alert("Please enter a password, then submit")
      } else {
        // Do nothing
      }
  
    } // Outer If ends here 









    
  }
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);