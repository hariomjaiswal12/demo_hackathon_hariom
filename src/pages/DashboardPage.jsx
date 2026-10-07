import React, { useState, useEffect, useCallback } from 'react';
import { AppShell } from '../components/AppShell';
import { fetchResources } from '../api/resources';
import { fetchBookings } from '../api/bookings';

import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { NextBookingCard } from '../components/dashboard/NextBookingCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { FeaturedResources } from '../components/dashboard/FeaturedResources';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton';
import { DashboardErrorState } from '../components/dashboard/DashboardErrorState';

export function DashboardPage({ currentUser, onNavigate, onNavTabChange, onLogout }) {
  const [resources, setResources] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const [resData, bookingData] = await Promise.all([
        fetchResources().catch(() => ({ data: [] })),
        fetchBookings().catch(() => ({ data: [] })),
      ]);
      setResources(resData.data || []);
      setBookings(bookingData.data || []);
    } catch (err) {
      console.error('Dashboard data load failure:', err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleTabChange = (tabId) => {
    if (onNavTabChange) onNavTabChange(tabId);
  };

  return (
    <AppShell activeTab="Dashboard" onTabChange={handleTabChange} currentUser={currentUser} onLogout={onLogout}>
      <div className="w-full pb-12">
        {/* ===== TOP HEADER ===== */}
        <DashboardHeader currentUser={currentUser} />

        {/* ===== MAIN DASHBOARD CONTAINER (MAX-WIDTH 1400PX) ===== */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-8 space-y-6">
          {hasError ? (
            <DashboardErrorState onRetry={loadData} />
          ) : isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* ===== STATS ROW (4 COLUMNS) ===== */}
              <DashboardStats resources={resources} bookings={bookings} isLoading={isLoading} />

              {/* ===== 2-COLUMN SECTION: NEXT BOOKING & QUICK ACTIONS ===== */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <NextBookingCard
                  bookings={bookings}
                  currentUser={currentUser}
                  onNavigate={onNavigate}
                />
                <QuickActions
                  onNavigate={onNavigate}
                  currentUser={currentUser}
                />
              </div>

              {/* ===== FEATURED RESOURCES (4 COLUMNS) ===== */}
              <FeaturedResources
                resources={resources}
                isLoading={isLoading}
                onNavigate={onNavigate}
              />

              {/* ===== RECENT ACTIVITY ===== */}
              <RecentActivity
                bookings={bookings}
                currentUser={currentUser}
                isLoading={isLoading}
                onNavigate={onNavigate}
              />
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
