export interface ErrorType {
  [key: string]: string,
}

export const validateEmail = (email: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!email) {
    errors.email = '* Email is required';
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = '* Please enter a valid email address';
    }
  }
  return errors;
};

export const validatePassword = (password: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!password) {
    errors.password = '* Password is required';
  }
  return errors;
};

export const validateImage = (image: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!image) {
    errors.image = '* Image is required';
  }
  return errors;
};

export const validateTitle = (title: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!title.trim()) {
    errors.title = '* Title is required';
  }
  return errors;
};

export const validateDescription = (description: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!description.trim()) {
    errors.description = '* Description is required';
  }
  return errors;
};

export const validatePrice = (price: number) : ErrorType => {
  const errors: ErrorType = {};
  if (!price) {
    errors.price = '* Price is required';
  } else if (isNaN(price) || price <= 0) {
    errors.price = '* Price must be a positive number';
  }
  return errors;
};

export const validateCategory = (category: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!category.trim()) {
    errors.category = '* Category is required';
  }
  return errors;
};

export const validateName = (name: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!name.trim()) {
    errors.fullName = '* FullName is required';
  }
  return errors;
};

export const validatePhoneNumber = (phoneNumber: string) : ErrorType => {
  const errors: ErrorType = {};
  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumber) {
    errors.phoneNumber = '* Phone number is required';
  } else if (!phoneNumberPattern.test(phoneNumber)) {
    errors.phoneNumber = '* Please enter a valid 10-digit phone number';
  }
  return errors;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!confirmPassword) {
    errors.cpassword = '* Confirm password is required';
  } else if (password !== confirmPassword) {
    errors.cpassword = '* Passwords do not match';
  }
  return errors;
};

export const validateAddress = (address: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!address.trim()) {
    errors.address = '* Address is required';
  }
  return errors;
};

export const validateCity = (city: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!city.trim()) {
    errors.city = '* City is required';
  }
  return errors;
};

export const validatePostalCode = (postalCode: string) : ErrorType => {
  const errors: ErrorType = {};
  const postalCodePattern = /^\d{6}$/;
  if (!postalCode) {
    errors.postalCode = '* Postal code is required';
  } else if (!postalCodePattern.test(postalCode)) {
    errors.postalCode = '* Please enter a valid 6-digit postal code';
  }
  return errors;
};

export const validateCountry = (country: string) : ErrorType => {
  const errors: ErrorType = {};
  if (!country.trim()) {
    errors.country = '* Country is required';
  }
  return errors;
};
