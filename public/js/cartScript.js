Payfields.config.apiKey = "init";  
  Payfields.config.merchant = "init";  
/*Payfields.config.apiKey = "ab5e7c1e7486577a183541f1edad0875";  
  Payfields.config.merchant = "t1_mer_5a945029eb68bfc3898dc08";  */
  Payfields.config.amount = 0;
  console.log("amount to pay is",Payfields.config.amount);
  // Fields that will be used, each field will be passed as an object
  // the type of field and element needs to be passed. Values are optional
  // and those inputs will be filled with the values, they will be
  // disabled
  /*Payfields.fields = [
    {
      type: "number",
      element: "#number",
    },
    {
      type: "cvv",
      element: "#cvv",
    },
    {
      type: "name",
      element: "#name",
    },
    {
      type: "address",
      element: "#address",
    },
    {
      type: "expiration",
      element: "#expiration",
    }
  ];  
  Payfields.customizations = {
    style: {
      // All address fields class.
      ".address-input": {
        borderColor: "rgb(119,136,153)",
        borderStyle: "solid",
        borderBottomWidth: "1px"
      },
      // All fields
      ".input": {
        borderColor: "rgb(69,67,67)",
        borderStyle: "solid",
        borderBottomWidth: "1px"
      },
      // All error spans
      ".form-error": {
        color: "rgb(255, 0, 128)"
      },
      // Address error spans
      ".address-form-error": {
        color: "rgb(0,139,139)"
      }
    }
  };  */
  /*$("#button").on("click", function(){
    // Disable the button to avoid multiple calls
    $(this).prop("disabled", true);
    // Submit
    Payfields.submit();
  });*/
  // On validation error(s), this would handled automatically if an button
  // element is passed to Payfields.button
  Payfields.onValidationFailure = function(response) {
    // Enable the button to resubmit
	console.log(response);
    $("#button").prop("disabled", false);
  }

  // On API error(s), this would handled automatically if an button element is
  // passed to Payfields.button
  Payfields.onFailure = function() {
    // We will flash error response on button
    $("#button").text("Error");
    $("#button").css(
      {"backgroundColor": "rgb(138,15,15)", "transition": "2s"}
    );
    // Fields are automatically cleared on success. However, We may
    // clear all fields, or specific field(s) manually. To clear all fields
    // we need to call clearFields without passing any parameter.
    //Payfields.clearFields();
    // To clear one or more fields we need to pass an array to clearfields.
    // Possible fields to clear are: number, cvv, expiration, name, and address. 
    // Payfields.clearFields(['number', 'cvv', 'expiration']);

    setTimeout(function() {
      $("#button").text("Submit");
      $("#button").css(
        {"backgroundColor": ""}
      );
      // Enable button to resubmit
      $("#button").prop("disabled", false);
    }, 2000);
  }

  // On Success, display Success and re-enable button
  // This would handled automatically if an button element is passed to
  // Payfields.button
  Payfields.onSuccess = function(response) {
    // We will flash success response on button and clear the iframe
    // inputs
    $("#button").text("Success");
    $("#button").css(
      {"backgroundColor": "rgb(79,138,16)", "transition": "2s"}
    );
    setTimeout(function() {
      $("#button").text("Submit");
      $("#button").css(
        {"backgroundColor": ""}
      );
      $("#button").prop("disabled", false);
    }, 2000);
    console.log("it was successful");
    console.log(response)
  } 