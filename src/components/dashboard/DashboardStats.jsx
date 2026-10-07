import React from 'react';
import { StatCard } from './StatCard';
import { CheckCircle2, Clock, TrendingUp, Users } from 'lucide-react';

export function DashboardStats({ resources = [], bookings = [], isLoading = false }) {
  const availableCount = resources.filter((r) => r.status === 'AVAILABLE').length;
  const activeBookings = bookings.filter((b) => b.status === 'ACTIVE').length;
  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const inUseCount = resources.filter((r) => r.status === 'IN_USE').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Available Resources"
        value={isLoading ? null : availableCount}
        icon={CheckCircle2}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        sub="Ready to book"
        subColor="text-emerald-600 font-medium"
      />
      <StatCard
        label="Upcoming Bookings"
        value={isLoading ? null : upcomingBookings}
        icon={Clock}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
        sub={upcomingBookings > 0 ? "Next reservation scheduled" : "No upcoming reservations"}
        subColor="text-indigo-600 font-medium"
      />
      <StatCard
        label="Active Bookings"
        value={isLoading ? null : activeBookings}
        icon={TrendingUp}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        sub={activeBookings > 0 ? "In progress right now" : "Nothing currently active"}
        subColor="text-blue-600 font-medium"
      />
      <StatCard
        label="Resources In Use"
        value={isLoading ? null : inUseCount}
        icon={Users}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
        sub={`of ${resources.length} total office assets`}
        subColor="text-slate-400"
      />
    </div>
  );
}
