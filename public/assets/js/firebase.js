$(document).ready(function() {

    const firebaseConfig = {
        apiKey: "AIzaSyD8IIaCtUO_TlEWMV-XB_vWvVcDg7d7MMc",
        authDomain: "otpapp-ff12f.firebaseapp.com",
        projectId: "otpapp-ff12f",
        storageBucket: "otpapp-ff12f.appspot.com",
        messagingSenderId: "462569869291",
        appId: "1:462569869291:web:ba7e976d1fc89802eb53ae",
        measurementId: "G-6PJMF5RMDX"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log('recaptcha resolved');
        }
    });
    onSignInSubmit();
});



function onSignInSubmit() {
    $('#verifPhNum').on('click', function() {
        let phoneNo = '';
        var code = $('#codeToVerify').val();
        console.log(code);
        $(this).attr('disabled', 'disabled');
        $(this).text('Processing..');
        confirmationResult.confirm(code).then(function (result) {
                    alert('Succecss');
            var user = result.user;
            console.log(user);


            // ...
        }.bind($(this))).catch(function (error) {

            // User couldn't sign in (bad verification code?)
            // ...
            $(this).removeAttr('disabled');
            $(this).text('Invalid Code');
            setTimeout(() => {
                $(this).text('Verify Phone No');
            }, 2000);
        }.bind($(this)));

    });


    $('#getcode').on('click', function () {
        var phoneNo = $('#number').val();
        console.log(phoneNo);
        // getCode(phoneNo);
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNo, appVerifier)
        .then(function (confirmationResult) {

            window.confirmationResult=confirmationResult;
            coderesult=confirmationResult;
            console.log(coderesult);
        }).catch(function (error) {
            console.log(error.message);

        });
    });
}



function getCode(phoneNumber) {
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            console.log(confirmationResult);
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            $('#getcode').removeAttr('disabled');
            $('#getcode').text('RESEND');
        }).catch(function (error) {

            console.log(error);
            console.log(error.code);
            // Error; SMS not sent
            // ...
        });
  }
