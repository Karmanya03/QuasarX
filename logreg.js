const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

//-----------------------------------------

// Import necessary dependencies
const { useEffect, useState } = require("react");
const { makeRequest } = require("../util/backend");
const { useAuthContext } = require("../util/auth");
const { useNavigate } = require("react-router-dom");
const SpinnerLoader = require("../components/SpinnerLoader");

// Define the OAuth function component
function OAuth() {
  // Retrieve necessary hooks and variables
  const authContext = useAuthContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define the loginHandler function
  const loginHandler = async (oauthCode) => {
    // Assuming type is already set when login is started
    const userType = authContext.userData.type;
    try {
      const authRes = await makeRequest("oauth", "post", {
        code: oauthCode,
        type: userType,
      });

      if (!authRes.is_ok) {
        setError(authRes.response.message);
      } else {
        const auth = authRes.response;

        authContext.onLogin({
          jwt: auth.jwt,
          isRegistered: !auth.is_new_user,
          userData: {
            username: auth.username,
            name: auth.name,
            email: auth.email,
            type: auth.type,
            college: auth.college,
          },
        });

        navigate(
          auth.is_new_user ? authContext.formLink : authContext.dashboardLink
        );
      }
    } catch (e) {
      setError("Error connecting to the server. Please try again later.");
      console.log(e);
    }
  };

  // Implement the useEffect hook
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.get("code") === null) {
      setError("No OAuth code found. Redirecting to home page.");
      navigate("/");
    } else {
      loginHandler(urlParams.get("code"));
    }
  });

  // Render the component
  return (
    // JSX for rendering the component
    <div className="pt-32 flex justify-center">
      {error === null ? (
        <SpinnerLoader />
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}

// Export the OAuth component
module.exports = OAuth;





function onSignIn(googleUser) {
  // Handle the sign-in logic here

  // Redirect to user.html after a short delay
  setTimeout(function() {
    window.location.href = 'user.html';
  }, 1000); // Adjust the delay as needed (in milliseconds)
}