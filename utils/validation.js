const weakPasswords = [
    "123456",
    "password",
    "12345678",
    "qwerty",
    "abc123",
    "111111",
    "123123",
    "12345",
    "123456789",
    "password1",
    "admin",
    "letmein",
    "welcome",
    "monkey",
    "1234",
    "iloveyou",
    "000000",
    "qwerty123",
    "1q2w3e4r",
    "zaq12wsx"
  ];

  export function validateForm(companyName, crNumber, email, phone, password, confirmPassword, city, region, zip, businessType, terms) {
    let errors = {};
    
    //Company Name Validation
    if (!companyName) {
        errors.companyName = "Company name is required.";
    }

    //Commercial Registration Number Validation
    if (!crNumber) {
        errors.crNumber = "Commercial registration number is required.";
    } else if (crNumber.length != 10) {
        errors.crNumber = "Commercial registration number must be 10 digits.";
    }

    //Address Validation (City, Region, Zip Code)
    if (!city) {
        errors.city = "City is required.";
    }
    if (!region) {
        errors.region = "Region is required.";
    }
    if (!zip) {
        errors.zip = "Zip code is required.";
    } else if (zip.length != 5) {
        errors.zip = "Zip Code must be 5 digit.";
    }

     //Business Type Validation
    if (!businessType) {
        errors.businessType = "Business type is required.";
    }

     //Terms Validation
    if (terms == false) {
        errors.terms = "Agreeing to the terms is required.";
    }

     //Phone Number Validation
    if (!phone) {
        errors.phone = "Phone number is required.";
    }

    //Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
    }

    //Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        errors.password = "Password must have uppercase, lowercase, number, and special character."
    } else if (weakPasswords.includes(password.toLowerCase())) {
        errors.password = "This password is too common.";
    } if (confirmPassword != password) {
        errors.confirmPassword = "The password must be matched.";
    }

    return errors
}