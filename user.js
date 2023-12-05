document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profileForm');
  
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Get form values
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const bio = document.getElementById('bio').value;
      const age = document.getElementById('age').value;
      const favspc = document.getElementById('favspc').value;
  
      // Save data to the server (you will need server-side code for this)
      saveUserData({ username, email, bio });
    });
  
    function saveUserData(userData) {
      // This is where you would send the data to your server
      // For simplicity, let's just log the data to the console
      console.log('User data:', userData);
      alert('Profile saved successfully!');
    }
  });
  


  function saveUserData() {
    // Get values from the form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Create an object with user data
    const userData = {
      username,
      email,
    };

    // Convert the object to a JSON string
    const userDataJSON = JSON.stringify(userData);

    // Save the JSON string to localStorage
    localStorage.setItem('userData', userDataJSON);

    // Display a message
    alert('User data saved successfully!');
    
    // Display the saved user data
    displayUserData();
  }

  function displayUserData() {
    // Get the JSON string from localStorage
    const userDataJSON = localStorage.getItem('userData');

    // Parse the JSON string into an object
    const userData = JSON.parse(userDataJSON);

    // Display the user data
    const userDataDisplay = document.getElementById('userDataDisplay');
    userDataDisplay.innerHTML = `<h2>Saved User Data:</h2>
                                 <p>Username: ${userData.username}</p>
                                 <p>Email: ${userData.email}</p>`;
  }

  // Display any existing user data when the page loads
  window.onload = displayUserData;

  let Username = [];
  // example {id:1592304983049, title: 'Deadpool', year: 2015}
  const addUsername = (ev)=>{
      ev.preventDefault();  //to stop the form submitting
      let Username = {
          id: Date.now(),
          Username: document.getElementById('username').value,
          email: document.getElementById('email').value,
          age: document.getElementById('age').value,
          favspc: document.getElementById('favspc').value,
          bio: document.getElementById('bio').value,
      }
      movies.push(movie);
      document.forms[0].reset(); // to clear the form for the next entries
      //document.querySelector('form').reset();

      //for display purposes only
      console.warn('added' , {Username} );
      let pre = document.querySelector('#msg pre');
      pre.textContent = '\n' + JSON.stringify(Username, '\t', 2);

      //saving to localStorage
      localStorage.setItem('UserList', JSON.stringify(Username) );
  }
  document.addEventListener('DOMContentLoaded', ()=>{
      document.getElementById('btn').addEventListener('click', addMovie);
  });