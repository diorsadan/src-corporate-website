/**
 * Form Validation Utilities
 * Provides regex patterns and validation functions for form fields
 * Used with debounced validation for real-time user feedback
 */

export interface ValidationError {
  field: string;
  message: string;
  isValid: boolean;
}

/**
 * Email validation regex (RFC 5322 simplified)
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (international format)
 * Accepts formats: +63 912 345 6789, 0912-345-6789, +639123456789, etc.
 */
export const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

/**
 * Validate email address
 * @param email - Email string to validate
 * @returns Object with validation result
 */
export function validateEmail(email: string): ValidationError {
  if (!email.trim()) {
    return {
      field: "email",
      message: "Email is required",
      isValid: false,
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      field: "email",
      message: "Please enter a valid email address",
      isValid: false,
    };
  }

  return {
    field: "email",
    message: "",
    isValid: true,
  };
}

/**
 * Validate phone number
 * @param phone - Phone string to validate
 * @returns Object with validation result
 */
export function validatePhone(phone: string): ValidationError {
  if (!phone.trim()) {
    return {
      field: "phone",
      message: "Phone number is required",
      isValid: false,
    };
  }

  if (!PHONE_REGEX.test(phone)) {
    return {
      field: "phone",
      message: "Please enter a valid phone number (e.g., +63 912 345 6789)",
      isValid: false,
    };
  }

  return {
    field: "phone",
    message: "",
    isValid: true,
  };
}

/**
 * Validate required field
 * @param value - Field value to validate
 * @param fieldName - Human-readable field name
 * @returns Object with validation result
 */
export function validateRequired(
  value: string,
  fieldName: string,
  /** DOM `name` / error map key — defaults to lowercased label */
  fieldKey?: string,
): ValidationError {
  const field = fieldKey ?? fieldName.toLowerCase().replace(/\s+/g, "");

  if (!value.trim()) {
    return {
      field,
      message: `${fieldName} is required`,
      isValid: false,
    };
  }

  return {
    field,
    message: "",
    isValid: true,
  };
}

/**
 * Batch validate form data
 * @param formData - Object containing all form fields
 * @returns Array of validation errors
 */
export function validateFormData(formData: {
  fullName: string;
  companyName: string;
  email: string;
  contactNumber: string;
  inquiryType: string;
  message: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  errors.push(validateRequired(formData.fullName, "Full Name"));
  errors.push(validateRequired(formData.companyName, "Company Name"));
  errors.push(validateRequired(formData.inquiryType, "Inquiry Type"));
  errors.push(validateRequired(formData.message, "Message"));
  errors.push(validateEmail(formData.email));
  errors.push(validatePhone(formData.contactNumber));

  return errors.filter((error) => !error.isValid);
}

export interface ConsultationFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Batch validate consultation modal form fields
 */
export function validateConsultationFormData(
  formData: ConsultationFormData,
): ValidationError[] {
  const errors: ValidationError[] = [];

  errors.push(validateRequired(formData.name, "Full Name", "name"));
  errors.push(validateEmail(formData.email));
  errors.push(validateRequired(formData.message, "Message", "message"));

  return errors.filter((error) => !error.isValid);
}

/**
 * Get first error message for a specific field
 * @param errors - Array of validation errors
 * @param fieldName - Field name to get error for
 * @returns Error message or empty string if no error
 */
export function getFieldError(
  errors: ValidationError[],
  fieldName: string,
): string {
  const error = errors.find((e) => e.field === fieldName);
  return error?.message || "";
}

/**
 * Check if field has error
 * @param errors - Array of validation errors
 * @param fieldName - Field name to check
 * @returns True if field has error
 */
export function hasFieldError(
  errors: ValidationError[],
  fieldName: string,
): boolean {
  return errors.some((e) => e.field === fieldName && !e.isValid);
}
