import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ConsultationFormSuccessViewProps {
  email: string;
}

export function ConsultationFormSuccessView({
  email,
}: ConsultationFormSuccessViewProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Check className="w-8 h-8 text-green-600" />
      </motion.div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">Request Sent!</h3>
      <p className="text-gray-600 mb-2">
        Thank you for your interest in scheduling a consultation.
      </p>
      <p className="text-sm text-gray-500">
        Our team will get back to you shortly at {email}
      </p>
    </motion.div>
  );
}
