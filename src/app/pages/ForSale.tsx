"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Trash2,
  Plus,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/supabaseClient";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface PropertyListing {
  id: string;
  title: string;
  price: number;
  location: string;
  area_size: number;
  property_type: string;
  description: string;
  status: "Active" | "Sold";
  image_urls: string[];
  created_at: string;
}

interface LoginFormState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

interface AdminFormState {
  title: string;
  location: string;
  area_size: string;
  price: string;
  description: string;
  property_type: string;
  images: File[];
}

type FilterCategory =
  | "All Properties"
  | "Lots & Land"
  | "Residential"
  | "Commercial & Industrial"
  | "Sold Assets";

const PROPERTY_TYPES = [
  "Raw Lot",
  "Residential Lot",
  "Commercial Lot",
  "Agricultural Land",
  "House and Lot",
  "Townhouse",
  "Condominium",
  "Apartment Building",
  "Commercial Building",
  "Office Space",
  "Warehouse",
  "Resort Property",
  "Farm Property",
  "Mixed-Use Property",
];

const getPropertyCategory = (type: string, status: string): string[] => {
  const categories: string[] = [];

  const lotsAndLand = [
    "Raw Lot",
    "Residential Lot",
    "Commercial Lot",
    "Agricultural Land",
  ];
  const residential = [
    "House and Lot",
    "Townhouse",
    "Condominium",
    "Apartment Building",
  ];
  const commercialIndustrial = [
    "Commercial Building",
    "Office Space",
    "Warehouse",
    "Resort Property",
    "Farm Property",
    "Mixed-Use Property",
  ];

  if (lotsAndLand.includes(type)) categories.push("Lots & Land");
  if (residential.includes(type)) categories.push("Residential");
  if (commercialIndustrial.includes(type))
    categories.push("Commercial & Industrial");
  if (status === "Sold") categories.push("Sold Assets");

  return categories;
};

const sortProperties = (properties: PropertyListing[]): PropertyListing[] => {
  const active = properties
    .filter((p) => p.status === "Active")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  const sold = properties
    .filter((p) => p.status === "Sold")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return [...active, ...sold];
};

const PropertyImageCarousel = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 bg-slate-200 rounded-lg overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SoldPropertyPlaceholder = () => (
  <div className="w-full h-64 sm:h-72 md:h-80 bg-slate-300 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="text-5xl font-black text-slate-400 opacity-40">SOLD</div>
      <p className="text-slate-500 text-sm mt-2">This property has been sold</p>
    </div>
  </div>
);

const LoginModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => Promise<void>;
}) => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      await onSubmit(formState.email, formState.password);
      setFormState({
        email: "",
        password: "",
        error: "",
        loading: false,
      });
      onClose();
    } catch (error: any) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Authentication failed",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
      >
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Staff Login</h2>
          <button
            onClick={onClose}
            disabled={formState.loading}
            className="text-slate-500 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {formState.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{formState.error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={formState.loading}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formState.password}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={formState.loading}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={formState.loading || !formState.email || !formState.password}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formState.loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const AdminModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminFormState) => Promise<void>;
  isLoading: boolean;
}) => {
  const [formState, setFormState] = useState<AdminFormState>({
    title: "",
    location: "",
    area_size: "",
    price: "",
    description: "",
    property_type: "",
    images: [],
  });

  const [error, setError] = useState<string>("");
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormState((prev) => ({ ...prev, images: files }));
    if (files.length !== 5) {
      setError("Layout Safeguard: You must select exactly 5 images.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.images.length !== 5) {
      setError("Layout Safeguard: You must select exactly 5 images.");
      return;
    }

    if (
      !formState.title ||
      !formState.location ||
      !formState.area_size ||
      !formState.price ||
      !formState.property_type
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setUploadingImages(true);
    try {
      await onSubmit(formState);
      setFormState({
        title: "",
        location: "",
        area_size: "",
        price: "",
        description: "",
        property_type: "",
        images: [],
      });
      setError("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create listing");
    } finally {
      setUploadingImages(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8"
      >
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">
            Add Property Listing
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading || uploadingImages}
            className="text-slate-500 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Property Title *
            </label>
            <input
              type="text"
              value={formState.title}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="e.g., Beautiful Residential Lot"
              disabled={isLoading || uploadingImages}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="e.g., Polomolok"
                disabled={isLoading || uploadingImages}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Area Size (sqm) *
              </label>
              <input
                type="number"
                value={formState.area_size}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    area_size: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="e.g., 500"
                disabled={isLoading || uploadingImages}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Price (PHP) *
              </label>
              <input
                type="number"
                value={formState.price}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="e.g., 500000"
                disabled={isLoading || uploadingImages}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Property Type *
              </label>
              <select
                value={formState.property_type}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    property_type: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                disabled={isLoading || uploadingImages}
              >
                <option value="">Select type...</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={formState.description}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
              rows={3}
              placeholder="Property details and features..."
              disabled={isLoading || uploadingImages}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Images (Exactly 5 Required) *
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              disabled={isLoading || uploadingImages}
            />
            <p className="text-xs text-slate-600 mt-1">
              Selected: {formState.images.length} image(s)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading || uploadingImages}
              className="flex-1 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isLoading ||
                uploadingImages ||
                formState.images.length !== 5
              }
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploadingImages ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Create Listing"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const PropertyCard = ({
  property,
  isAdmin,
  onDelete,
  onMarkAsSold,
  isDeleting,
}: {
  property: PropertyListing;
  isAdmin: boolean;
  onDelete: (id: string) => Promise<void>;
  onMarkAsSold: (id: string) => Promise<void>;
  isDeleting: string | null;
}) => {
  const formattedPrice = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(property.price);

  const isSold = property.status === "Sold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
        isSold ? "opacity-75" : ""
      }`}
    >
      <div className="bg-white">
        {isSold ? (
          <SoldPropertyPlaceholder />
        ) : (
          <PropertyImageCarousel images={property.image_urls} title={property.title} />
        )}

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-xl font-extrabold ${
              isSold ? "text-slate-500" : "text-slate-900"
            }`}>
              {property.title}
            </h3>
            {property.status === "Active" && (
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
                Active
              </span>
            )}
          </div>

          <p className={`text-sm mb-1 ${
            isSold ? "text-slate-400" : "text-slate-600"
          }`}>
            📍 {property.location}
          </p>

          <div className="flex gap-2 mb-3 flex-wrap">
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              isSold
                ? "bg-slate-200 text-slate-500"
                : "bg-slate-100 text-slate-700"
            }`}>
              {property.property_type}
            </span>
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              isSold
                ? "bg-slate-200 text-slate-500"
                : "bg-slate-100 text-slate-700"
            }`}>
              {property.area_size} sqm
            </span>
          </div>

          <p className={`text-sm mb-4 line-clamp-2 ${
            isSold ? "text-slate-400" : "text-slate-600"
          }`}>
            {property.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className={`text-lg font-bold ${
              isSold ? "text-slate-500" : "text-emerald-600"
            }`}>
              {formattedPrice}
            </span>
          </div>

          {isAdmin && (
            <div className="flex gap-2">
              {property.status === "Active" && (
                <button
                  onClick={() => onMarkAsSold(property.id)}
                  disabled={isDeleting === property.id}
                  className="flex-1 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
                >
                  {isDeleting === property.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Mark as Sold"
                  )}
                </button>
              )}
              <button
                onClick={() => onDelete(property.id)}
                disabled={isDeleting === property.id}
                className="flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-800 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-sm"
              >
                {isDeleting === property.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ForSale() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyListing[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>(
    "All Properties"
  );
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isCreatingListing, setIsCreatingListing] = useState(false);

  const filterCategories: FilterCategory[] = [
    "All Properties",
    "Lots & Land",
    "Residential",
    "Commercial & Industrial",
    "Sold Assets",
  ];

  const checkAdminStatus = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getSession();
      setIsAdmin(!!data?.session);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("sale_properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const typedData = (data || []) as PropertyListing[];
      const sorted = sortProperties(typedData);
      setProperties(sorted);
      applyFilter("All Properties", sorted);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilter = (category: FilterCategory, propertiesToFilter: PropertyListing[]) => {
    let filtered: PropertyListing[] = [];

    switch (category) {
      case "All Properties":
        filtered = propertiesToFilter;
        break;
      case "Lots & Land":
        filtered = propertiesToFilter.filter((p) =>
          getPropertyCategory(p.property_type, p.status).includes("Lots & Land")
        );
        break;
      case "Residential":
        filtered = propertiesToFilter.filter((p) =>
          getPropertyCategory(p.property_type, p.status).includes("Residential")
        );
        break;
      case "Commercial & Industrial":
        filtered = propertiesToFilter.filter((p) =>
          getPropertyCategory(p.property_type, p.status).includes("Commercial & Industrial")
        );
        break;
      case "Sold Assets":
        filtered = propertiesToFilter.filter((p) => p.status === "Sold");
        break;
    }

    setFilteredProperties(sortProperties(filtered));
  };

  const handleFilterChange = (category: FilterCategory) => {
    setSelectedFilter(category);
    applyFilter(category, properties);
  };

  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (data.session) {
      setIsAdmin(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property? This action cannot be undone."))
      return;

    try {
      setDeleting(id);

      const property = properties.find((p) => p.id === id);
      
      // Step A: If the listing is Active and has images, delete them from storage
      if (property && property.image_urls && property.image_urls.length > 0) {
        try {
          const filePaths = property.image_urls
            .map((url) => {
              try {
                const urlObj = new URL(url);
                const pathname = urlObj.pathname;
                // Extract filename from storage path
                const parts = pathname.split("/");
                return parts[parts.length - 1] || "";
              } catch {
                return "";
              }
            })
            .filter((p) => p.length > 0);

          if (filePaths.length > 0) {
            const { error: storageError } = await supabase.storage
              .from("property-images")
              .remove(filePaths);

            if (storageError) {
              console.warn("Warning deleting storage files:", storageError);
              // Continue with DB deletion even if storage cleanup fails
            }
          }
        } catch (storageErr) {
          console.warn("Error processing storage cleanup:", storageErr);
        }
      }

      // Step B: Delete the property row from the database
      const { error: deleteError } = await supabase
        .from("sale_properties")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Step C: Refresh the UI
      const updatedProperties = properties.filter((p) => p.id !== id);
      setProperties(updatedProperties);
      applyFilter(selectedFilter, updatedProperties);
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    } finally {
      setDeleting(null);
    }
  };

  const handleMarkAsSold = async (id: string) => {
    try {
      setDeleting(id);

      const property = properties.find((p) => p.id === id);
      
      // Extract and delete image files from storage
      if (property && property.image_urls && property.image_urls.length > 0) {
        try {
          const filePaths = property.image_urls
            .map((url) => {
              try {
                const urlObj = new URL(url);
                const pathname = urlObj.pathname;
                // Extract filename from storage path
                const parts = pathname.split("/");
                return parts[parts.length - 1] || "";
              } catch {
                return "";
              }
            })
            .filter((p) => p.length > 0);

          if (filePaths.length > 0) {
            const { error: storageError } = await supabase.storage
              .from("property-images")
              .remove(filePaths);

            if (storageError) {
              console.warn("Warning deleting storage files:", storageError);
              // Continue with DB update even if storage cleanup fails
            }
          }
        } catch (storageErr) {
          console.warn("Error processing storage cleanup:", storageErr);
        }
      }

      // Update database: set status to Sold and clear image_urls
      const { error: updateError } = await supabase
        .from("sale_properties")
        .update({ status: "Sold", image_urls: [] })
        .eq("id", id);

      if (updateError) throw updateError;

      // Update local state
      const updatedProperty = {
        ...property!,
        status: "Sold" as const,
        image_urls: [],
      };
      
      const updatedProperties = properties.map((p) =>
        p.id === id ? updatedProperty : p
      );

      const sorted = sortProperties(updatedProperties);
      setProperties(sorted);
      applyFilter(selectedFilter, sorted);
    } catch (error) {
      console.error("Error marking property as sold:", error);
      alert("Failed to update property status");
    } finally {
      setDeleting(null);
    }
  };

  const handleCreateListing = async (formData: AdminFormState) => {
    try {
      setIsCreatingListing(true);

      const compressedImages: string[] = [];

      // Sequentially compress and upload each of the 5 images
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];
        
        try {
          // Compress the image
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
          });

          // Generate unique filename
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
          
          // Upload to Supabase storage
          const { data, error: uploadError } = await supabase.storage
            .from("property-images")
            .upload(fileName, compressedFile);

          if (uploadError) {
            throw new Error(`Failed to upload image ${i + 1}: ${uploadError.message}`);
          }

          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from("property-images")
            .getPublicUrl(fileName);

          compressedImages.push(publicUrlData.publicUrl);
        } catch (imgError) {
          console.error(`Error processing image ${i + 1}:`, imgError);
          throw imgError;
        }
      }

      // Insert the property record with all 5 compressed image URLs
      const { error: insertError } = await supabase
        .from("sale_properties")
        .insert({
          title: formData.title,
          location: formData.location,
          area_size: parseFloat(formData.area_size),
          price: parseFloat(formData.price),
          description: formData.description,
          property_type: formData.property_type,
          status: "Active",
          image_urls: compressedImages,
        });

      if (insertError) throw insertError;

      // Refresh the properties list
      await fetchProperties();
    } catch (error) {
      console.error("Error creating listing:", error);
      throw error;
    } finally {
      setIsCreatingListing(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
    fetchProperties();
  }, [checkAdminStatus, fetchProperties]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="flex justify-between items-start sm:items-center mb-8 gap-4 flex-col sm:flex-row">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                Properties for Sale
              </h1>
              <p className="text-slate-600">
                Discover premium real estate opportunities in SOCCSKSARGEN
              </p>
            </div>

            <div className="flex gap-3 flex-wrap justify-end">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Property
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Staff Login
                </button>
              )}
            </div>
          </div>
        </FadeIn>

        <StaggerContainer staggerChildren={0.1} delayChildren={0.3}>
          <StaggerItem>
            <div className="mb-8">
              <div className="flex gap-2 flex-wrap">
                {filterCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedFilter === category
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-white text-slate-700 border-2 border-slate-300 hover:border-emerald-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {loading ? (
            <StaggerItem>
              <div className="text-center py-12">
                <div className="inline-block animate-spin">
                  <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full" />
                </div>
                <p className="mt-4 text-slate-600">Loading properties...</p>
              </div>
            </StaggerItem>
          ) : filteredProperties.length === 0 ? (
            <StaggerItem>
              <div className="text-center py-12">
                <p className="text-xl text-slate-600">
                  No properties found in this category.
                </p>
              </div>
            </StaggerItem>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isAdmin={isAdmin}
                  onDelete={handleDeleteProperty}
                  onMarkAsSold={handleMarkAsSold}
                  isDeleting={deleting}
                />
              ))}
            </div>
          )}
        </StaggerContainer>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSubmit={handleLogin}
      />

      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSubmit={handleCreateListing}
        isLoading={isCreatingListing}
      />
    </div>
  );
}
