import { useCallback, useState } from "react";
import {
  validateConsultationFormData,
  type ConsultationFormData,
  type ValidationError,
} from "@/utils/formValidation";

const INITIAL_CONSULTATION_DATA: ConsultationFormData = {
  name: "",
  email: "",
  message: "",
};

/**
 * Validation state and field handlers for the consultation modal form.
 */
export function useConsultationFormValidation() {
  const [formData, setFormData] = useState<ConsultationFormData>(
    INITIAL_CONSULTATION_DATA,
  );
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );

  const getFieldError = useCallback(
    (field: keyof ConsultationFormData) =>
      validationErrors.find((e) => e.field === field)?.message,
    [validationErrors],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setValidationErrors((prev) => prev.filter((err) => err.field !== name));
    },
    [],
  );

  const validate = useCallback((): ValidationError[] => {
    const errors = validateConsultationFormData(formData);
    setValidationErrors(errors);
    return errors;
  }, [formData]);

  const reset = useCallback(() => {
    setFormData(INITIAL_CONSULTATION_DATA);
    setValidationErrors([]);
  }, []);

  return {
    formData,
    getFieldError,
    handleChange,
    validate,
    reset,
    validationErrors,
  };
}
