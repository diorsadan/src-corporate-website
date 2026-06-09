"use client";

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { PropertyCardSkeleton } from "@/components/ui/PropertyCardSkeleton";
import {
  LogOut,
  Trash2,
  Plus,
  X,
  AlertCircle,
  Loader2,
  MapPin,
  Mail,
  Ruler,
  ExternalLink,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { supabase } from "@/supabaseClient";
import { PropertyImageCarousel } from "@/components/common/PropertyImageCarousel";
import { FADE_IN_UP, VIEWPORT_ONCE } from "@/constants/animations";

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

type PendingAdminAction = {
  type: "delete" | "mark-sold";
  propertyId: string;
  propertyTitle: string;
};

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
] as const;

const FILTER_CATEGORIES: FilterCategory[] = [
  "All Properties",
  "Lots & Land",
  "Residential",
  "Commercial & Industrial",
  "Sold Assets",
];

const LOTS_AND_LAND_TYPES = new Set([
  "Raw Lot",
  "Residential Lot",
  "Commercial Lot",
  "Agricultural Land",
]);

const RESIDENTIAL_TYPES = new Set([
  "House and Lot",
  "Townhouse",
  "Condominium",
  "Apartment Building",
]);

const COMMERCIAL_INDUSTRIAL_TYPES = new Set([
  "Commercial Building",
  "Office Space",
  "Warehouse",
  "Resort Property",
  "Farm Property",
  "Mixed-Use Property",
]);

const MODAL_SPRING = { type: "spring" as const, stiffness: 300, damping: 22 };

const GRID_WRAPPER =
  "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12";

const GRID_COLUMNS =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

const CARD_SHELL =
  "bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden";

const IMAGE_FRAME = "aspect-[4/3] w-full overflow-hidden relative";

const SUPABASE_CONFIGURED = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function sortProperties(properties: PropertyListing[]): PropertyListing[] {
  const active = properties
    .filter((p) => p.status === "Active")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  const sold = properties
    .filter((p) => p.status === "Sold")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  return [...active, ...sold];
}

function matchesFilter(
  property: PropertyListing,
  category: FilterCategory,
): boolean {
  switch (category) {
    case "All Properties":
      return property.status !== "Sold";
    case "Lots & Land":
      return LOTS_AND_LAND_TYPES.has(property.property_type);
    case "Residential":
      return RESIDENTIAL_TYPES.has(property.property_type);
    case "Commercial & Industrial":
      return COMMERCIAL_INDUSTRIAL_TYPES.has(property.property_type);
    case "Sold Assets":
      return property.status === "Sold";
    default:
      return true;
  }
}

function extractStoragePaths(imageUrls: string[]): string[] {
  return imageUrls
    .map((url) => {
      try {
        const pathname = new URL(url).pathname;
        const bucketMarker = "/property-images/";
        const bucketIndex = pathname.indexOf(bucketMarker);
        if (bucketIndex !== -1) {
          return decodeURIComponent(
            pathname.slice(bucketIndex + bucketMarker.length),
          );
        }
        const segments = pathname.split("/").filter(Boolean);
        return segments.length > 0
          ? decodeURIComponent(segments[segments.length - 1])
          : "";
      } catch {
        return "";
      }
    })
    .filter((path) => path.length > 0);
}

async function purgePropertyImages(imageUrls: string[]): Promise<void> {
  const paths = extractStoragePaths(imageUrls);
  if (paths.length === 0) return;

  const { error } = await supabase.storage.from("property-images").remove(paths);
  if (error) {
    console.warn("Warning deleting storage files:", error);
  }
}

function formatPhpPrice(price: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(price);
}

const SoldPropertyPlaceholder = ({ compact }: { compact?: boolean }) => {
  const label = (
    <div className="text-center">
      <div
        className={`font-black text-slate-400 tracking-widest ${
          compact ? "text-3xl" : "text-4xl"
        }`}
      >
        SOLD
      </div>
      {!compact && (
        <p className="text-slate-500 text-sm mt-2">This property has been sold</p>
      )}
    </div>
  );

  if (compact) return label;

  return (
    <div
      className={`${IMAGE_FRAME} flex items-center justify-center bg-slate-200`}
    >
      {label}
    </div>
  );
};

const ConfirmActionModal = ({
  action,
  isLoading,
  onClose,
  onConfirm,
}: {
  action: PendingAdminAction;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const isDelete = action.type === "delete";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-action-title"
        aria-describedby="confirm-action-description"
      >
        <div className="p-6">
          <h2
            id="confirm-action-title"
            className="text-xl font-bold text-slate-900"
          >
            {isDelete ? "Delete listing?" : "Mark as sold?"}
          </h2>
          <p
            id="confirm-action-description"
            className="mt-3 text-sm leading-relaxed text-slate-600"
          >
            {isDelete ? (
              <>
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-900">
                  {action.propertyTitle}
                </span>
                ? This action cannot be undone.
              </>
            ) : (
              <>
                Are you sure you want to mark{" "}
                <span className="font-semibold text-slate-900">
                  {action.propertyTitle}
                </span>{" "}
                as sold? Listing images will be removed.
              </>
            )}
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                isDelete
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isDelete ? "Delete listing" : "Mark as sold"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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

  useEffect(() => {
    if (isOpen) {
      setFormState({
        email: "",
        password: "",
        error: "",
        loading: false,
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!SUPABASE_CONFIGURED) return;

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
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Authentication failed";
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: message,
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
            type="button"
            onClick={onClose}
            disabled={formState.loading}
            className="text-slate-500 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!SUPABASE_CONFIGURED && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-700 text-sm">Supabase not configured</p>
            </div>
          )}

          {formState.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{formState.error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="staff-email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              id="staff-email"
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={formState.loading || !SUPABASE_CONFIGURED}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="staff-password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>
            <input
              id="staff-password"
              type="password"
              value={formState.password}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              disabled={formState.loading || !SUPABASE_CONFIGURED}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={
              formState.loading ||
              !formState.email ||
              !formState.password ||
              !SUPABASE_CONFIGURED
            }
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

  const [error, setError] = useState("");
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (isOpen) {
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
      setUploadingImages(false);
    }
  }, [isOpen]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    setFormState((prev) => {
      const combined = [...prev.images];
      newFiles.forEach((newFile) => {
        const exists = combined.some(
          (f) => f.name === newFile.name && f.size === newFile.size,
        );
        if (!exists) {
          combined.push(newFile);
        }
      });
      return { ...prev, images: combined.slice(0, 5) };
    });

    e.currentTarget.value = "";
  };

  const getImageCountColor = () => {
    if (formState.images.length === 5) return "text-emerald-600";
    if (formState.images.length > 0) return "text-orange-600";
    return "text-slate-600";
  };

  const removeImage = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create listing";
      setError(message);
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
            type="button"
            onClick={onClose}
            disabled={isLoading || uploadingImages}
            className="text-slate-500 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close add property form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
        >
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              multiple={true}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              disabled={isLoading || uploadingImages}
            />
            <p className={`text-sm mt-2 font-semibold ${getImageCountColor()}`}>
              Images chosen: {formState.images.length} / 5
            </p>

            {formState.images.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-slate-600 font-semibold">
                  Selected files:
                </p>
                <div className="space-y-2">
                  {formState.images.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <span className="text-sm text-slate-700 truncate">
                        {index + 1}. {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={isLoading || uploadingImages}
                        className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                isLoading || uploadingImages || formState.images.length !== 5
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

const PropertyDetailModal = ({
  property,
  onClose,
  onInquire,
}: {
  property: PropertyListing;
  onClose: () => void;
  onInquire: () => void;
}) => {
  const isSold = property.status === "Sold";
  const galleryImages = property.image_urls.length > 0 ? property.image_urls : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.div
      key="property-detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        key={property.id}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={MODAL_SPRING}
        className="relative bg-white w-full max-w-6xl h-[min(92vh,900px)] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="for-sale-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg hover:bg-white hover:text-slate-900 transition-colors"
          aria-label="Close property details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-full min-h-[280px] lg:min-h-0 bg-slate-900">
          {isSold || galleryImages.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
              <SoldPropertyPlaceholder compact />
            </div>
          ) : (
            <div className="absolute inset-0">
              <PropertyImageCarousel
                images={galleryImages}
                alt={property.title}
                heightClass="h-full"
                autoPlay
                autoPlayIntervalMs={3500}
                enableLightbox={false}
                enablePauseControl={true}
              />
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex flex-col max-h-[50vh] md:max-h-[85vh]">
          <span
            className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit ${
              isSold
                ? "bg-slate-200 text-slate-600"
                : "bg-primary/10 text-primary"
            }`}
          >
            {property.property_type}
          </span>

          <h2
            id="for-sale-modal-title"
            className="text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight pr-10"
          >
            {property.title}
          </h2>

          <p className="text-2xl md:text-3xl font-extrabold text-[#2e7d5c] mb-4">
            {formatPhpPrice(property.price)}
          </p>

          <div className="flex items-start gap-2 mb-6 text-gray-600">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="font-semibold text-gray-900">{property.location}</p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 mb-6">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Ruler className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Area Size
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {property.area_size} sqm
            </p>
          </div>

          <div className="mb-6 flex-1 min-h-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
              Technical Description
            </h3>
            <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-gray-700 leading-relaxed">
              {property.description?.trim()
                ? property.description
                : "No detailed description provided for this listing."}
            </div>
          </div>

          <div className="pt-4 mt-auto border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onInquire}
              className="w-full bg-[#2e7d5c] hover:bg-[#256b4d] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Send Inquiry
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PropertyCard = ({
  property,
  isAdmin,
  onDelete,
  onMarkAsSold,
  isDeleting,
  onOpenDetails,
}: {
  property: PropertyListing;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onMarkAsSold: (id: string) => void;
  isDeleting: string | null;
  onOpenDetails: (property: PropertyListing) => void;
}) => {
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const isSold = property.status === "Sold";
  const hasImages = property.image_urls.length > 0;

  return (
    <article
      className={`group/card ${CARD_SHELL} ${isSold ? "opacity-95" : ""}`}
      onMouseEnter={() => setIsCarouselPaused(true)}
      onMouseLeave={() => setIsCarouselPaused(false)}
    >
      <div className={`${IMAGE_FRAME} bg-gray-100 shrink-0`}>
        {isSold || !hasImages ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <span className="text-3xl font-black text-slate-400 tracking-widest">
              SOLD
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 [&_img]:object-cover [&_img]:w-full [&_img]:h-full">
            <PropertyImageCarousel
              images={property.image_urls}
              alt={property.title}
              heightClass="h-full"
              isolateControls
              parentGroupName="card"
              autoPlay={!isCarouselPaused}
              autoPlayIntervalMs={3500}
              enableLightbox={false}
              enablePauseControl={false}
            />
          </div>
        )}
        <div
          className={`absolute top-3 left-3 z-20 pointer-events-none px-2.5 py-1 text-xs font-bold rounded-md text-white shadow-sm ${
            isSold ? "bg-slate-500" : "bg-[#2e7d5c]"
          }`}
        >
          {isSold ? "Sold" : "Active"}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
          {property.property_type}
        </span>

        <h3
          className={`text-xl font-bold line-clamp-1 mb-1 ${
            isSold ? "text-slate-500" : "text-slate-900"
          }`}
        >
          {property.title}
        </h3>

        <p
          className={`text-sm text-slate-500 flex items-center gap-1 mb-4 ${
            isSold ? "opacity-80" : ""
          }`}
        >
          <MapPin className="w-4 h-4 shrink-0 text-[#2e7d5c]" aria-hidden />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <div className="mb-3">
          <p
            className={`text-xl font-extrabold ${
              isSold ? "text-slate-400" : "text-[#2e7d5c]"
            }`}
          >
            {formatPhpPrice(property.price)}
          </p>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            {property.area_size.toLocaleString()} sqm
          </p>
        </div>

        <p
          className={`text-sm text-slate-600 line-clamp-2 mb-4 flex-grow ${
            isSold ? "text-slate-400" : ""
          }`}
        >
          {property.description?.trim()
            ? property.description
            : "No description available for this listing."}
        </p>

        <div className="mt-auto">
          <button
            type="button"
            onClick={() => onOpenDetails(property)}
            className="w-full border border-slate-200 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm"
          >
            View Details
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {isAdmin && (
            <div
              className="mt-4 pt-4 border-t border-slate-50 flex gap-2"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
            >
              {property.status === "Active" && (
                <button
                  type="button"
                  onClick={() => onMarkAsSold(property.id)}
                  disabled={isDeleting === property.id}
                  className="flex-1 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {isDeleting === property.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : null}
                  Mark as Sold
                </button>
              )}
              <button
                type="button"
                onClick={() => onDelete(property.id)}
                disabled={isDeleting === property.id}
                className="flex-1 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {isDeleting === property.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Delete Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default function ForSale() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [selectedFilter, setSelectedFilter] =
    useState<FilterCategory>("All Properties");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isCreatingListing, setIsCreatingListing] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyListing | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAdminAction | null>(
    null,
  );

  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((p) => matchesFilter(p, selectedFilter));
    return sortProperties(filtered);
  }, [properties, selectedFilter]);

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
      setProperties(sortProperties(typedData));
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const requestDeleteProperty = (id: string) => {
    const property = properties.find((p) => p.id === id);
    if (!property) return;

    setPendingAction({
      type: "delete",
      propertyId: id,
      propertyTitle: property.title,
    });
  };

  const requestMarkAsSold = (id: string) => {
    const property = properties.find((p) => p.id === id);
    if (!property) return;

    setPendingAction({
      type: "mark-sold",
      propertyId: id,
      propertyTitle: property.title,
    });
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      setDeleting(id);

      const property = properties.find((p) => p.id === id);

      if (property && property.image_urls.length > 0) {
        await purgePropertyImages(property.image_urls);
      }

      const { error: deleteError } = await supabase
        .from("sale_properties")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setProperties((prev) => prev.filter((p) => p.id !== id));
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
      if (!property) return;

      if (property.image_urls.length > 0) {
        await purgePropertyImages(property.image_urls);
      }

      const { error: updateError } = await supabase
        .from("sale_properties")
        .update({ status: "Sold", image_urls: [] })
        .eq("id", id);

      if (updateError) throw updateError;

      setProperties((prev) =>
        sortProperties(
          prev.map((p) =>
            p.id === id
              ? { ...p, status: "Sold" as const, image_urls: [] }
              : p,
          ),
        ),
      );
    } catch (error) {
      console.error("Error marking property as sold:", error);
      alert("Failed to update property status");
    } finally {
      setDeleting(null);
    }
  };

  const handleConfirmPendingAction = async () => {
    if (!pendingAction) return;

    const { type, propertyId } = pendingAction;
    setPendingAction(null);

    if (type === "delete") {
      await handleDeleteProperty(propertyId);
    } else {
      await handleMarkAsSold(propertyId);
    }
  };

  const handleCreateListing = async (formData: AdminFormState) => {
    try {
      setIsCreatingListing(true);

      const compressedImages: string[] = [];

      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];

        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
        });

        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, compressedFile);

        if (uploadError) {
          throw new Error(
            `Failed to upload image ${i + 1}: ${uploadError.message}`,
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(fileName);

        compressedImages.push(publicUrlData.publicUrl);
      }

      const { error: insertError } = await supabase.from("sale_properties").insert({
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

      await fetchProperties();
    } catch (error) {
      console.error("Error creating listing:", error);
      throw error;
    } finally {
      setIsCreatingListing(false);
    }
  };

  const handleInquire = () => {
    setSelectedProperty(null);
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    checkAdminStatus();
    fetchProperties();
  }, [checkAdminStatus, fetchProperties]);

  return (
    <div>
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[22rem] sm:min-h-[26rem] md:min-h-[28rem] pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src="/videos/for-sale.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-emerald-950/60 backdrop-brightness-[0.8]"
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            Properties for Sale
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto font-light">
            Discover premium real estate opportunities across SOCCSKSARGEN
          </p>
        </motion.div>
      </section>

      <section className="bg-white">
        <div className={GRID_WRAPPER}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={FADE_IN_UP}
            className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Available Listings
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                Browse lots, residential, and commercial assets across
                SOCCSKSARGEN. Active listings appear first; sold assets are
                grouped at the bottom of each view.
              </p>
            </div>

            <div className="flex flex-row items-center justify-end gap-3 shrink-0">
              {isAdmin ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2e7d5c] hover:bg-[#256b4d] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Property
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="px-5 py-2.5 bg-[#2e7d5c] hover:bg-[#256b4d] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Staff Login
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={FADE_IN_UP}
            className="mb-12 flex flex-wrap gap-3"
          >
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedFilter === category
                    ? "bg-[#059669] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <PropertyCardSkeleton count={6} columnsClassName={GRID_COLUMNS} />
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600">
                No properties found in this category.
              </p>
            </div>
          ) : (
            <div className={GRID_COLUMNS}>
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isAdmin={isAdmin}
                  onDelete={requestDeleteProperty}
                  onMarkAsSold={requestMarkAsSold}
                  isDeleting={deleting}
                  onOpenDetails={setSelectedProperty}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {pendingAction && (
          <ConfirmActionModal
            action={pendingAction}
            isLoading={deleting !== null}
            onClose={() => setPendingAction(null)}
            onConfirm={() => {
              void handleConfirmPendingAction();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSubmit={handleLogin}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdminModal && (
          <AdminModal
            isOpen={showAdminModal}
            onClose={() => setShowAdminModal(false)}
            onSubmit={handleCreateListing}
            isLoading={isCreatingListing}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            onInquire={handleInquire}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
