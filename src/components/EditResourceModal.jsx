import React, { useState, useEffect } from 'react';
import { X, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from './FormFields';
import { updateResource } from '../api/resources';

export function EditResourceModal({ isOpen, resource, onClose, onResourceUpdated }) {
  const [formData, setFormData] = useState({
    name: '',
    resourceCode: '',
    category: 'AUDIO',
    status: 'AVAILABLE',
    location: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (resource && isOpen) {
      setFormData({
        name: resource.name || '',
        resourceCode: resource.resourceCode || '',
        category: resource.category || 'AUDIO',
        status: resource.status || 'AVAILABLE',
        location: resource.location || '',
        description: resource.description || '',
      });
      setErrors({});
      setApiError(null);
      setIsSuccess(false);
    }
  }, [resource, isOpen]);

  if (!isOpen || !resource) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Resource name is required';
    if (!formData.resourceCode.trim()) newErrors.resourceCode = 'Resource Code is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        resourceCode: formData.resourceCode,
        category: formData.category,
        status: formData.status,
        location: formData.location,
        description: formData.description,
      };

      const result = await updateResource(resource._id || resource.id, payload);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onResourceUpdated) onResourceUpdated(result.data);
        setIsSuccess(false);
        onClose();
      }, 600);
    } catch (err) {
      setIsSubmitting(false);
      setApiError(err.message || 'Failed to update resource on backend server.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div 
        className="relative w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border border-slate-100 max-h-[85vh] md:max-h-[90vh] overflow-y-auto z-50 animate-slideUp md:animate-scaleUp mb-14 md:mb-0"
        role="dialog"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                Edit Resource
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                Update equipment status & specifications in MongoDB
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {apiError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <FormInput
                label="Resource Name"
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                className="col-span-2"
              />
              <FormInput
                label="Code/ID"
                id="edit-code"
                value={formData.resourceCode}
                onChange={(e) => setFormData({ ...formData, resourceCode: e.target.value })}
                error={errors.resourceCode}
                className="col-span-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormSelect
                label="Category"
                id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  'AUDIO',
                  'DISPLAY',
                  'HARDWARE',
                  'SPACES',
                ]}
              />
              <FormSelect
                label="Status"
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  'AVAILABLE',
                  'IN_USE',
                  'MAINTENANCE',
                ]}
              />
            </div>

            <FormInput
              label="Location Placement"
              id="edit-location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              error={errors.location}
              icon={<MapPin className="w-4 h-4" />}
            />

            <FormTextarea
              label="Description & Specs"
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 shadow-emerald-600/20'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Updated Successfully!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
