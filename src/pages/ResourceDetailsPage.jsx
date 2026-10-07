import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { ResourceHeader } from '../components/ResourceHeader';
import { ResourceHero } from '../components/ResourceHero';
import { AvailabilityTimeline } from '../components/AvailabilityTimeline';
import { BookingBottomBar } from '../components/BookingBottomBar';
import { fetchResources } from '../api/resources';
import { createBooking } from '../api/bookings';

export function ResourceDetailsPage({ onBackToBookings, onReserveSlot, onNavTabChange, currentUser, onLogout }) {
  const [selectedDate, setSelectedDate] = useState('today');
  const [realResource, setRealResource] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState({
    bookingId: 'BOOK-9042',
    resourceId: '',
    resourceName: 'Shure SM7B Studio Mic #2',
    category: 'AUDIO GEAR',
    resourceModel: 'Shure SM7B • Pro Broadcast Kit',
    location: 'Hardware Hub, Studio Booth B, Locker 04',
    boothLocation: 'Studio Booth B • Floor 4 (West Wing)',
    date: 'Mon, Oct 23',
    startTime: '3:00 PM',
    endTime: '4:30 PM',
    timeRange: '3:00 PM – 4:30 PM',
    duration: '1h 30m',
    purpose: 'Sprint 24 Audio Recording & Voiceover',
    passcode: '9042-888',
    status: 'CONFIRMED',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
  });

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadResource = async () => {
      try {
        const res = await fetchResources();
        const list = res.data || [];
        if (list.length > 0) {
          const first = list[0];
          setRealResource(first);
          setSelectedSlot((prev) => ({
            ...prev,
            resourceId: first._id,
            resourceName: first.name,
            location: first.location,
          }));
        }
      } catch (err) {
        console.error('Failed to load resource details:', err);
      }
    };
    loadResource();
  }, []);

  const handleAdjustSlot = () => {
    alert('Adjusting slot window: Select a different open time block on the timeline or choose a suggested window below.');
  };

  const handleContinueToBooking = async () => {
    if (!selectedSlot) return;
    setErrorMsg(null);

    // Compute future dates for reservation
    const now = new Date();
    const start = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    const end = new Date(now.getTime() + 150 * 60 * 1000).toISOString();

    if (selectedSlot.resourceId) {
      setIsSubmitting(true);
      try {
        const res = await createBooking({
          resourceId: selectedSlot.resourceId,
          startTime: start,
          endTime: end,
          purpose: selectedSlot.purpose || 'Sprint 24 Audio Recording & Voiceover',
        });
        setIsSubmitting(false);
        if (onReserveSlot) onReserveSlot(res.data);
      } catch (err) {
        setIsSubmitting(false);
        setErrorMsg(err.message || 'Failed to create booking.');
      }
    } else {
      if (onReserveSlot) onReserveSlot(selectedSlot);
    }
  };

  return (
    <AppShell activeTab="Resources" onTabChange={(tab) => onNavTabChange && onNavTabChange(tab)} currentUser={currentUser} onLogout={onLogout}>
      <div className="w-full pb-28">
        {/* Page Top Header */}
        <ResourceHeader
          title="New Reservation"
          onBack={onBackToBookings}
        />

        {errorMsg && (
          <div className="mx-4 sm:mx-6 my-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold">
            {errorMsg}
          </div>
        )}

        {/* Resource Hero Section */}
        <ResourceHero
          title={realResource ? realResource.name : "Shure SM7B Studio Mic #2"}
          id="#2"
          serialNumber={realResource ? `SN: ${realResource.resourceCode}` : "SN: MIC-7B-094"}
          status={realResource ? realResource.status : "Available Now"}
          category={realResource ? realResource.category : "Audio & Podcast"}
          location={realResource ? realResource.location : "Studio Booth B • Floor 4 (West Wing)"}
          imageUrl={realResource?.image || '/resources/microphone.jpg'}
          initialBookmarked={isBookmarked}
          onBookmarkToggle={setIsBookmarked}
        />

        {/* Availability Timeline Section */}
        <AvailabilityTimeline
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
          onAdjustSlot={handleAdjustSlot}
        />

        {/* Sticky Bottom Booking Bar */}
        <BookingBottomBar
          selectedSlot={selectedSlot}
          onContinue={handleContinueToBooking}
        />
      </div>
    </AppShell>
  );
}

