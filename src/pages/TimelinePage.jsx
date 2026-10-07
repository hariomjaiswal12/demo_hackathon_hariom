import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { TimelineHeader } from '../components/TimelineHeader';
import { TimelineDateSelector } from '../components/TimelineDateSelector';
import { ResourceFilter } from '../components/ResourceFilter';
import { AvailabilityLegend } from '../components/AvailabilityLegend';
import { TimelineRow } from '../components/TimelineRow';
import { CurrentTimeIndicator } from '../components/CurrentTimeIndicator';
import { ResourceSummaryCard } from '../components/ResourceSummaryCard';
import { fetchResources, fetchResourceAvailability } from '../api/resources';
import { createBooking } from '../api/bookings';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function TimelinePage({ onBookingSuccess, onNavigateToBookings, onNavTabChange, currentUser, onLogout }) {
  const [selectedDate, setSelectedDate] = useState('23');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [conflictError, setConflictError] = useState(null);
  const [isReserving, setIsReserving] = useState(false);

  // Selected slot state for booking
  const [selectedSlot, setSelectedSlot] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load resources and availability from Express/MongoDB API
  const loadTimelineData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchResources();
      const dbResources = res.data || [];

      // Map DB resources into timeline rows with availability queries
      const timelineRows = await Promise.all(
        dbResources.map(async (r) => {
          let availBookings = [];
          try {
            const availRes = await fetchResourceAvailability(r._id);
            availBookings = availRes.data?.bookings || [];
          } catch (e) {
            console.error(`Failed to fetch availability for ${r.name}`, e);
          }

          // Build timeline blocks based on DB bookings
          const blocks = [];
          if (r.status === 'MAINTENANCE') {
            blocks.push({ id: `${r._id}-maint`, status: 'MAINTENANCE', label: 'Maint', widthPercent: 100 });
          } else if (availBookings.length === 0) {
            blocks.push({
              id: `${r._id}-open`,
              status: 'AVAILABLE',
              widthPercent: 100,
              timeRange: '3:00 PM – 4:30 PM',
              duration: '1h 30m',
            });
          } else {
            // Render booked block + remaining available block
            blocks.push({
              id: `${r._id}-b1`,
              status: 'BOOKED',
              label: availBookings[0].purpose ? availBookings[0].purpose.substring(0, 8) + '...' : 'Booked',
              sublabel: 'Booked',
              widthPercent: 40,
            });
            blocks.push({
              id: `${r._id}-open`,
              status: 'AVAILABLE',
              widthPercent: 60,
              timeRange: '4:30 PM – 6:00 PM',
              duration: '1h 30m',
            });
          }

          return {
            id: r._id,
            mongoId: r._id,
            name: r.name,
            code: r.resourceCode,
            location: r.location,
            category: r.category ? r.category.toLowerCase() : 'mics',
            blocks,
          };
        })
      );

      setResources(timelineRows);

      // Default select the first available resource slot with dynamic ISO times
      if (timelineRows.length > 0) {
        const first = timelineRows[0];
        const now = new Date();
        const startISO = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
        const endISO = new Date(now.getTime() + 150 * 60 * 1000).toISOString();

        setSelectedSlot({
          resourceId: first.mongoId,
          resourceName: first.name,
          location: first.location,
          timeRange: '3:00 PM – 4:30 PM',
          duration: '1h 30m',
          startTime: startISO,
          endTime: endISO,
          zone: `Audio ${first.location}`,
          interface: 'USB-C / XLR Dual',
          status: 'Available',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load timeline availability from backend');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTimelineData();
  }, []);

  // Filter resources by category
  const filteredResources = resources.filter((r) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'mics') return r.category.includes('audio') || r.name.toLowerCase().includes('mic');
    if (selectedCategory === 'displays') return r.category.includes('display') || r.name.toLowerCase().includes('display');
    if (selectedCategory === 'vr') return r.category.includes('hardware') || r.name.toLowerCase().includes('vr');
    return true;
  });

  // Handle Reserve Slot submit to POST /api/bookings
  const handleReserveSlotSubmit = async () => {
    if (!selectedSlot || !selectedSlot.resourceId) return;

    setConflictError(null);
    setIsReserving(true);

    try {
      const now = new Date();
      const defaultStart = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
      const defaultEnd = new Date(now.getTime() + 150 * 60 * 1000).toISOString();

      const payload = {
        resourceId: selectedSlot.resourceId,
        startTime: selectedSlot.startTime || defaultStart,
        endTime: selectedSlot.endTime || defaultEnd,
        purpose: 'Sprint 24 Audio Recording & Voiceover',
      };

      const result = await createBooking(payload);
      setIsReserving(false);

      if (onBookingSuccess) {
        onBookingSuccess(result.data);
      }
    } catch (err) {
      setIsReserving(false);
      // Phase 7: Handle HTTP 409 Conflict Error
      if (err.conflict || err.status === 409) {
        setConflictError('This resource is already booked for the requested time.');
      } else {
        showToast(err.message || 'Booking failed. Please try again.');
      }
    }
  };


  return (
    <AppShell activeTab="Calendar" onTabChange={(tab) => onNavTabChange && onNavTabChange(tab)} currentUser={currentUser} onLogout={onLogout}>
      <div className="w-full pb-20">
        {/* Header */}
        <TimelineHeader
          onFilterClick={() => showToast('Filter settings panel opened.')}
        />

        {/* Date Selector */}
        <TimelineDateSelector
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Resource Category Filter Chips */}
        <ResourceFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Availability Legend */}
        <AvailabilityLegend />

        {/* 409 Conflict State Warning Box */}
        {conflictError && (
          <div className="w-full px-4 sm:px-6 mb-4">
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-4 sm:p-5 shadow-sm text-rose-800 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <h4 className="font-bold text-sm sm:text-base">Booking Conflict (HTTP 409)</h4>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed mb-3">
                {conflictError}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConflictError(null)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Choose Another Slot
                </button>
                <button
                  onClick={loadTimelineData}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
                >
                  Refresh Schedule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="w-full px-4 sm:px-6 my-6">
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Loading live availability from MongoDB...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="w-full px-4 sm:px-6 my-6">
            <div className="bg-rose-50 dark:bg-rose-950/40 rounded-3xl p-6 text-center border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 shadow-sm">
              <AlertCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto mb-2" />
              <p className="text-sm font-bold">{error}</p>
              <button
                onClick={loadTimelineData}
                className="mt-3 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700"
              >
                Retry API
              </button>
            </div>
          </div>
        )}

        {/* Main Multi-Resource Timeline Card */}
        {!isLoading && !error && (
          <div className="w-full px-4 sm:px-6 mb-6">
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800 relative">
              {/* Time Header Labels */}
              <div className="flex justify-between pl-32 sm:pl-40 pr-2 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
              </div>

              {/* Main Multi-Row Timeline */}
              <div className="relative">
                {/* Current Time Red Line (2:15 PM) */}
                <CurrentTimeIndicator timeLabel="2:15 PM" positionPercent={64} />

                {/* Resource Rows */}
                {filteredResources.map((resource) => (
                  <TimelineRow
                    key={resource.id}
                    resource={resource}
                    selectedSlot={selectedSlot}
                    onSelectSlot={(s) => {
                      setConflictError(null);
                      setSelectedSlot(s);
                    }}
                    onUnavailableClick={() => setConflictError('This resource is already booked for the requested time.')}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resource Summary Card (Bottom Card) */}
        {!isLoading && !error && (
          <div className="w-full px-4 sm:px-6">
            <ResourceSummaryCard
              selectedSlot={selectedSlot}
              onReserveSlot={handleReserveSlotSubmit}
            />
          </div>
        )}
      </div>

      {/* Conflict Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 animate-fadeIn flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </AppShell>
  );
}
