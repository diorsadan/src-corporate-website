import { motion } from "framer-motion";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/animations";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <FadeIn className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1
            className="text-9xl text-[#059669] mb-4"
            style={{ fontWeight: 900 }}
          >
            404
          </h1>
          <h2
            className="text-4xl mb-4 text-gray-900"
            style={{ fontWeight: 700 }}
          >
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It may have
            been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 350,
              damping: 35,
            }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg"
              style={{ fontWeight: 600 }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>
          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#059669] text-[#059669] hover:bg-gray-50 px-8 py-4 rounded-lg transition-colors duration-300"
            style={{ fontWeight: 600 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 350,
              damping: 35,
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </div>
      </FadeIn>
    </div>
  );
}
