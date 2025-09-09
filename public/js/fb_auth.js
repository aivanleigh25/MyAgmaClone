  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      window.setFbAct(response.authResponse.accessToken);
      //console.log('user is logged in');
      //testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      alert('You must press "Continue as..." on the popup so you can successfully login with facebook');
    }
  }

  function checkLoginState() {
    //not used?
    console.log('checkLoginState');
   FB.getLoginStatus(function(response) {
     statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '406997236873611',
      cookie     : true,
      xfbml      : true,
      version    : 'v5.0'
    });
    //check if user is already logged in with facebook:
    /*
    //Commented out because this is run automatically as user lands on page
    FB.getLoginStatus(function(response) {
      console.log('fb got login status');
      console.log(response);
      //window.setFbAct(response.authResponse.accessToken);
      console.log('UID for the record'+response.authResponse.userID);
      //user ID = response.authResponse.userID;
      statusChangeCallback(response);
    });*/

    FB.AppEvents.logPageView();   
    var finished_rendering = function() {
      //var spinner = document.getElementById("spinner");
      //spinner.removeAttribute("style");
      //spinner.removeChild(spinner.childNodes[0]);
    }
    FB.Event.subscribe('xfbml.render', finished_rendering);
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      console.log('full response', response);
    });
  }

   /* response looks like:
    //status: connected = logged in, not_authorized is logged into fb but not into app, and unknown is not logged in to fb. Might have Fb.logout();
    //authResponse is only included is status is 'connected'. 
    //expiresIn -> unix time for token expiration
    //signedRequest -> signedParam that contains info about the person using the app
    //userId of the person using the app
    //if status is unknown or not authorized, prompt them with login dialog Fb.login()
{
    status: 'connected',
    authResponse: { 
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}*/