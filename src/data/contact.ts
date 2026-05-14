export const contactInfo = {
  officeAddress:
    "Cannery Housing Subdivision, Cannery Site, Polomolok, 9504 South Cotabato",
  officePhone: "(083) 500 3112",
  primaryEmail: "nico_led@yahoo.com",
} as const;

export const generateMailtoLink = (
  formData: {
    fullName: string;
    companyName: string;
    email: string;
    contactNumber: string;
    inquiryType: string;
    message: string;
  },
  inquiryTypeLabel: string,
): string => {
  const subject = encodeURIComponent(
    `Inquiry from ${formData.companyName} - ${inquiryTypeLabel}`,
  );

  const body = encodeURIComponent(
    `Hello,\n\n` +
      `I would like to submit the following inquiry:\n\n` +
      `--- INQUIRY DETAILS ---\n` +
      `Full Name: ${formData.fullName}\n` +
      `Company Name: ${formData.companyName}\n` +
      `Email: ${formData.email}\n` +
      `Contact Number: ${formData.contactNumber}\n` +
      `Nature of Inquiry: ${inquiryTypeLabel}\n\n` +
      `--- MESSAGE ---\n` +
      `${formData.message}\n\n` +
      `Thank you for your time. I look forward to hearing from you.\n\n` +
      `Best regards,\n` +
      `${formData.fullName}`,
  );

  return `mailto:${contactInfo.primaryEmail}?subject=${subject}&body=${body}`;
};
