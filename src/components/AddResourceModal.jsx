import React, { useState, useEffect } from 'react';
import { X, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea, FormCheckbox } from './FormFields';
import { createResource } from '../api/resources';

export function AddResourceModal({ isOpen, onClose, onResourceAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    resourceCode: '',
    category: 'Audio & Mic',
    status: 'Available',
    location: '',
    description: '',
    requiresBadgeSignout: true,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      const randomId = Math.floor(10 + Math.random() * 90);
      setFormData({
        name: 'Sony FX3 Cinema Camera',
        resourceCode: `CAM-${randomId}`,
        category: 'Audio & Mic',
        status: 'Available',
        location: 'Studio Booth C / Shelf 4B',
        description: '4K 120fps, XLR handle, 2x 160GB CFexpress-A cards included',
        requiresBadgeSignout: true,
      });
      setErrors({});
      setApiError(null);
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Resource name is required';
    if (!formData.resourceCode.trim()) newErrors.resourceCode = 'Resource ID/Code is required';
    if (!formData.location.trim()) newErrors.location = 'Location placement is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Map UI values to backend Mongoose Schema parameters
      const payload = {
        name: formData.name,
        resourceCode: formData.resourceCode,
        category: formData.category === 'Audio & Mic' ? 'AUDIO' : formData.category.toUpperCase().replace(/\s+/g, '_'),
        status: formData.status.toUpperCase().replace(/\s+/g, '_'),
        location: formData.location,
        description: formData.description,
        requiresBadgeSignout: formData.requiresBadgeSignout,
      };

      const result = await createResource(payload);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onResourceAdded) onResourceAdded(result.data);
        setIsSuccess(false);
        onClose();
      }, 800);
    } catch (err) {
      setIsSubmitting(false);
      setApiError(err.message || 'Failed to create resource on backend server.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Blurred Dimmed Background Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Bottom Sheet on Mobile / Centered Modal on Desktop */}
      <div 
        className="relative w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border border-slate-100 max-h-[85vh] md:max-h-[90vh] overflow-y-auto z-50 animate-slideUp md:animate-scaleUp mb-14 md:mb-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Drag Handle for Mobile */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-3 mb-1 md:hidden"></div>

        <div className="p-5 sm:p-6">
          {/* Modal Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-slate-900 leading-snug">
                Add New Resource
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                Register equipment or workspace asset in MongoDB
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* API Error Warning */}
          {apiError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Resource Name + Resource Code */}
            <div className="grid grid-cols-3 gap-3">
              <FormInput
                label="Resource Name"
                id="name"
                placeholder="e.g., Sony FX3 Cinema Camera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                className="col-span-2"
              />
              <FormInput
                label="Code/ID"
                id="resourceCode"
                placeholder="CAM-04"
                value={formData.resourceCode}
                onChange={(e) => setFormData({ ...formData, resourceCode: e.target.value })}
                error={errors.resourceCode}
                className="col-span-1"
              />
            </div>

            {/* Row 2: Category + Initial Status */}
            <div className="grid grid-cols-2 gap-3">
              <FormSelect
                label="Category"
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  'Spaces',
                  'Audio & Mic',
                  'Testing Hardware',
                  'Displays',
                ]}
              />
              <FormSelect
                label="Initial Status"
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  'Available',
                  'In Use',
                  'Maintenance',
                ]}
              />
            </div>

            {/* Row 3: Location Placement */}
            <FormInput
              label="Location Placement"
              id="location"
              placeholder="e.g., Studio Booth C / Shelf 4B"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              error={errors.location}
              icon={<MapPin className="w-4 h-4" />}
            />

            {/* Row 4: Description & Specifications */}
            <FormTextarea
              label="Description & Specifications"
              id="description"
              placeholder="4K 120fps, XLR handle, 2x 160GB CFexpress-A cards included"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />

            {/* Row 5: Badge Sign-out Checkbox */}
            <FormCheckbox
              label="Require physical badge sign-out"
              subtitle="System generates verification token upon reservation start"
              checked={formData.requiresBadgeSignout}
              onChange={(e) => setFormData({ ...formData, requiresBadgeSignout: e.target.checked })}
            />

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 shadow-emerald-600/20'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25 active:scale-[0.99]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Resource...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resource Created!</span>
                  </>
                ) : (
                  <span>Create Resource</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
