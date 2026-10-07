import React, { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { Header } from './components/Header';
import { BookingTabs } from './components/BookingTabs';
import { BookingCard } from './components/BookingCard';
import { EmptyState } from './components/EmptyState';
import { ExtendModal, CancelModal, EndEarlyModal, InfoModal } from './components/BookingModals';
import { DashboardPage } from './pages/DashboardPage';
import { ResourceDetailsPage } from './pages/ResourceDetailsPage';
import { TimelinePage } from './pages/TimelinePage';
import { ResourceRegistryPage } from './pages/ResourceRegistryPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { fetchBookings } from './api/bookings';
import { checkInBookingApi, endBookingApi, cancelBookingApi, extendBookingApi } from './api/bookings';
import { loginUserApi, registerUserApi, fetchMeApi } from './api/auth';
import { Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('deskdrop_token') || null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  // Initial view from window.location.hash or fallback to dashboard
  const getInitialState = () => {
    const hash = window.location.hash.replace('#', '');
    const viewMap = {
      dashboard: { view: 'dashboard', tab: 'Dashboard' },
      resources: { view: 'resource-details', tab: 'Resources' },
      'resource-details': { view: 'resource-details', tab: 'Resources' },
      timeline: { view: 'timeline', tab: 'Calendar' },
      admin: { view: 'admin', tab: 'Admin' },
      'booking-success': { view: 'booking-success', tab: 'Bookings' },
      bookings: { view: 'bookings', tab: 'Bookings' },
    };
    return viewMap[hash] || { view: 'dashboard', tab: 'Dashboard' };
  };

  const initialState = getInitialState();
  const [currentView, setCurrentView] = useState(initialState.view);
  const [activeNavTab, setActiveNavTab] = useState(initialState.tab);
  const [activeBookingTab, setActiveBookingTab] = useState('upcoming');
  
  // Bookings API state
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);

  // Active Unified Selected Booking Slot across screens
  const [latestBookingData, setLatestBookingData] = useState(null);

  // Modal States
  const [extendTarget, setExtendTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [endEarlyTarget, setEndEarlyTarget] = useState(null);
  const [infoTarget, setInfoTarget] = useState(null);

  // Helper to change view and sync hash for browser back/refresh support
  const navigateToView = (viewName, navTab = null) => {
    // Map internal view names → canonical URL hashes
    const hashMap = {
      'dashboard': 'dashboard',
      'resource-details': 'resources',
      'timeline': 'timeline',
      'admin': 'admin',
      'booking-success': 'booking-success',
      'bookings': 'bookings',
    };
    const tabMap = {
      'dashboard': 'Dashboard',
      'resource-details': 'Resources',
      'timeline': 'Calendar',
      'admin': 'Admin',
      'booking-success': 'Bookings',
      'bookings': 'Bookings',
    };
    setCurrentView(viewName);
    window.location.hash = hashMap[viewName] || viewName;
    setActiveNavTab(navTab || tabMap[viewName] || 'Dashboard');
  };

  // Sync state on hash change / browser back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const viewMap = {
        dashboard: { view: 'dashboard', tab: 'Dashboard' },
        resources: { view: 'resource-details', tab: 'Resources' },
        'resource-details': { view: 'resource-details', tab: 'Resources' },
        timeline: { view: 'timeline', tab: 'Calendar' },
        admin: { view: 'admin', tab: 'Admin' },
        'booking-success': { view: 'booking-success', tab: 'Bookings' },
        bookings: { view: 'bookings', tab: 'Bookings' },
      };
      const match = viewMap[hash];
      if (match) {
        setCurrentView(match.view);
        setActiveNavTab(match.tab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Verify JWT & load user profile on app mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('deskdrop_token');
      if (!storedToken) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const meRes = await fetchMeApi();
        setCurrentUser(meRes.data.user);
        setToken(storedToken);
      } catch (err) {
        console.error('JWT Session expired or invalid:', err);
        localStorage.removeItem('deskdrop_token');
        setToken(null);
        setCurrentUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fetch bookings when user becomes authenticated
  const loadBookingsFromAPI = async () => {
    if (!token) return;
    setIsLoadingBookings(true);
    setBookingsError(null);
    try {
      const res = await fetchBookings();
      const rawBookings = res.data || [];

      // Map MongoDB Booking models to UI card structure
      const formatted = rawBookings.map((b) => {
        const resourceObj = b.resource || {};
        const isUpcoming = b.status === 'CONFIRMED';
        const isActive = b.status === 'ACTIVE';
        const isCompleted = b.status === 'COMPLETED';
        const isCancelled = b.status === 'CANCELLED' || b.status === 'AUTO_RELEASED';

        const startTimeFormatted = b.startTime ? new Date(b.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '3:00 PM';
        const endTimeFormatted = b.endTime ? new Date(b.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '4:30 PM';

        let category = 'upcoming';
        if (isActive) category = 'active';
        if (isCompleted) category = 'completed';
        if (isCancelled) category = 'cancelled';

        return {
          id: b._id,
          mongoId: b._id,
          bookingId: b.passcode ? `MIC-${b.passcode.split('-')[0]}` : `MIC-${(b._id || '').substring(18, 22).toUpperCase()}`,
          title: resourceObj.name || 'DeskDrop Reserved Asset',
          location: resourceObj.location || 'Studio Booth 04, Floor 4',
          time: `${startTimeFormatted} – ${endTimeFormatted}`,
          duration: '1h 30m',
          purpose: b.purpose || 'Sprint 24 Audio Recording & Voiceover',
          status: b.status ? b.status.toLowerCase() : 'confirmed',
          thumbnailType: resourceObj.category === 'TESTING_HARDWARE' ? 'vr' : resourceObj.category === 'DISPLAY' ? 'monitor' : 'mic',
          category,
          section: 'today',
          raw: b,
        };
      });

      setBookings(formatted);
    } catch (err) {
      setBookingsError(err.message || 'Failed to fetch bookings from backend API');
    } finally {
      setIsLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadBookingsFromAPI();
    }
  }, [currentUser]);

  // Auth Handlers
  const handleLogin = async ({ email, password }) => {
    const res = await loginUserApi({ email, password });
    const { user: userObj, token: jwtToken } = res.data;
    localStorage.setItem('deskdrop_token', jwtToken);
    setToken(jwtToken);
    setCurrentUser(userObj);
    navigateToView('dashboard', 'Dashboard');
  };

  const handleRegister = async ({ name, email, password }) => {
    const res = await registerUserApi({ name, email, password });
    const { user: userObj, token: jwtToken } = res.data;
    localStorage.setItem('deskdrop_token', jwtToken);
    setToken(jwtToken);
    setCurrentUser(userObj);
    navigateToView('dashboard', 'Dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('deskdrop_token');
    setToken(null);
    setCurrentUser(null);
  };

  // Handle Bottom / Sidebar Nav Changes with RBAC Guard
  const handleNavTabChange = (tabId) => {
    if (tabId === 'Admin' && currentUser?.role !== 'ADMIN') {
      alert('Access Denied: Admin role required for Resource Registry management.');
      return;
    }

    if (tabId === 'Dashboard') {
      navigateToView('dashboard', 'Dashboard');
    } else if (tabId === 'Resources') {
      navigateToView('resource-details', 'Resources');
    } else if (tabId === 'Calendar') {
      navigateToView('timeline', 'Calendar');
    } else if (tabId === 'Admin') {
      navigateToView('admin', 'Admin');
    } else {
      navigateToView('bookings', 'Bookings');
    }
  };

  // Check In Mutation
  const handleCheckIn = async (target) => {
    try {
      await checkInBookingApi(target.mongoId || target.id);
      await loadBookingsFromAPI();
    } catch (err) {
      alert(err.message || 'Failed to check in');
    }
  };

  // Extend Session Mutation
  const handleConfirmExtend = async (target, addedMins) => {
    try {
      const currentEnd = target.raw?.endTime ? new Date(target.raw.endTime) : new Date();
      const newEnd = new Date(currentEnd.getTime() + parseInt(addedMins) * 60000);
      await extendBookingApi(target.mongoId || target.id, newEnd.toISOString());
      setExtendTarget(null);
      await loadBookingsFromAPI();
    } catch (err) {
      alert(err.message || 'Failed to extend booking duration');
    }
  };

  // Cancel Booking Mutation
  const handleConfirmCancel = async (target) => {
    try {
      await cancelBookingApi(target.mongoId || target.id);
      setCancelTarget(null);
      await loadBookingsFromAPI();
    } catch (err) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  // End Early Mutation
  const handleConfirmEndEarly = async (target) => {
    try {
      await endBookingApi(target.mongoId || target.id);
      setEndEarlyTarget(null);
      await loadBookingsFromAPI();
    } catch (err) {
      alert(err.message || 'Failed to end booking early');
    }
  };

  // Loading Session Screen
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white"/>
            </svg>
          </div>
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600 mx-auto mb-2" />
          <p className="text-[13px] font-medium text-slate-500">Loading DeskDrop...</p>
        </div>
      </div>
    );
  }

  // Render Login / Register Screens when Unauthenticated
  if (!currentUser) {
    if (authView === 'register') {
      return (
        <RegisterPage
          onRegisterSuccess={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
    return (
      <LoginPage
        onLoginSuccess={handleLogin}
        onSwitchToRegister={() => setAuthView('register')}
      />
    );
  }

  // View: Dashboard
  if (currentView === 'dashboard') {
    return (
      <DashboardPage
        currentUser={currentUser}
        onNavigate={(view) => {
          if (view === 'resources') navigateToView('resource-details', 'Resources');
          else if (view === 'timeline') navigateToView('timeline', 'Calendar');
          else if (view === 'admin') navigateToView('admin', 'Admin');
          else if (view === 'resource-details') navigateToView('resource-details', 'Resources');
          else if (view === 'bookings') navigateToView('bookings', 'Bookings');
          else navigateToView(view);
        }}
        onNavTabChange={handleNavTabChange}
        onLogout={handleLogout}
      />
    );
  }

  // Compute counts for the booking tab pills
  const counts = {
    upcoming: bookings.filter((b) => b.category === 'upcoming' && !b.isTopHighlight).length,
    active: bookings.filter((b) => b.category === 'active').length,
    completed: bookings.filter((b) => b.category === 'completed').length,
    cancelled: bookings.filter((b) => b.category === 'cancelled').length,
  };

  // Filter bookings based on active booking tab selection
  const filteredBookings = bookings.filter((b) => {
    if (b.isTopHighlight) return false;
    return b.category === activeBookingTab;
  });

  const todayReservations = filteredBookings.filter((b) => b.section === 'today' || b.category === activeBookingTab);

  // Top highlight booking item (Only pick upcoming/active bookings)
  const topBooking = bookings.find((b) => b.category === 'upcoming') || null;

  // View 5: Booking Success Screen
  if (currentView === 'booking-success') {
    return (
      <BookingSuccessPage
        bookingData={latestBookingData}
        onNavTabChange={handleNavTabChange}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateToBookings={() => {
          loadBookingsFromAPI();
          navigateToView('bookings', 'Bookings');
        }}
        onNavigateToDashboard={() => {
          loadBookingsFromAPI();
          navigateToView('dashboard', 'Dashboard');
        }}
      />
    );
  }

  // View 4: Admin Resource Registry + Add Resource Modal (Protected by RBAC)
  if (currentView === 'admin') {
    if (currentUser.role !== 'ADMIN') {
      return (
        <AppShell activeTab="Bookings" onTabChange={handleNavTabChange} currentUser={currentUser} onLogout={handleLogout}>
          <div className="px-4 sm:px-6 my-10 text-center">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Access Denied (403 Forbidden)</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mt-1 mb-6">
              Only DeskDrop Administrators can access the Resource Registry management console.
            </p>
            <button
              onClick={() => navigateToView('bookings', 'Bookings')}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              Back to My Bookings
            </button>
          </div>
        </AppShell>
      );
    }

    return (
      <ResourceRegistryPage
        onNavTabChange={handleNavTabChange}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateToBookings={() => {
          loadBookingsFromAPI();
          navigateToView('bookings', 'Bookings');
        }}
      />
    );
  }

  // View 3: Timeline Availability Screen
  if (currentView === 'timeline') {
    return (
      <TimelinePage
        onNavTabChange={handleNavTabChange}
        currentUser={currentUser}
        onLogout={handleLogout}
        onBookingSuccess={(createdBooking) => {
          setLatestBookingData(createdBooking);
          navigateToView('booking-success', 'Bookings');
        }}
        onNavigateToBooking={() => {
          navigateToView('bookings', 'Bookings');
        }}
      />
    );
  }

  // View 2: Resource Details Screen
  if (currentView === 'resource-details') {
    return (
      <ResourceDetailsPage
        onNavTabChange={handleNavTabChange}
        currentUser={currentUser}
        onLogout={handleLogout}
        onReserveSlot={(createdBooking) => {
          setLatestBookingData(createdBooking);
          navigateToView('booking-success', 'Bookings');
        }}
        onBackToBookings={() => {
          navigateToView('bookings', 'Bookings');
        }}
      />
    );
  }

  // View 1: My Bookings Screen
  const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <AppShell activeTab={activeNavTab} onTabChange={handleNavTabChange} currentUser={currentUser} onLogout={handleLogout}>
      <div className="w-full">
        {/* Header */}
        <Header
          title="My Bookings"
          subtitle="Review, check-in, and manage your reservations"
          onFilterClick={() => navigateToView('timeline', 'Calendar')}
        />

        {/* Booking Tabs */}
        <div className="bg-white border-b border-slate-200 px-5 pt-4 pb-0">
          <BookingTabs
            activeTab={activeBookingTab}
            onTabChange={setActiveBookingTab}
            counts={counts}
          />
        </div>

        {/* Loading State */}
        {isLoadingBookings && (
          <div className="p-5 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-32 rounded-xl" />
            ))}
          </div>
        )}

        {/* Error State */}
        {bookingsError && !isLoadingBookings && (
          <div className="p-5">
            <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-[14px] font-semibold text-red-700 mb-3">{bookingsError}</p>
              <button
                onClick={loadBookingsFromAPI}
                className="btn btn-secondary btn-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!isLoadingBookings && !bookingsError && (
          <div className="p-5">
            {/* Today section label */}
            {activeBookingTab === 'upcoming' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[15px] font-semibold text-slate-900">Upcoming</h2>
                    <p className="text-[12px] text-slate-400">{todayLabel}</p>
                  </div>
                  <span className="text-[12px] text-slate-400">{todayReservations.length} reservation{todayReservations.length !== 1 ? 's' : ''}</span>
                </div>
                {todayReservations.length > 0 ? (
                  todayReservations.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCheckIn={handleCheckIn}
                      onExtend={(b) => setExtendTarget(b)}
                      onCancel={(b) => setCancelTarget(b)}
                      onEndEarly={(b) => setEndEarlyTarget(b)}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No upcoming reservations"
                    description="Reserve a resource from the timeline to see your bookings here."
                    actionLabel="View Timeline"
                    onReset={() => navigateToView('timeline', 'Calendar')}
                  />
                )}
              </>
            )}

            {activeBookingTab === 'active' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] font-semibold text-slate-900">Active Sessions</h2>
                  <span className="text-[12px] text-slate-400">{filteredBookings.length} active</span>
                </div>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onExtend={(b) => setExtendTarget(b)}
                      onEndEarly={(b) => setEndEarlyTarget(b)}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No active sessions"
                    description="Check in to a confirmed booking to start an active session."
                    actionLabel="View Upcoming"
                    onReset={() => setActiveBookingTab('upcoming')}
                  />
                )}
              </>
            )}

            {activeBookingTab === 'completed' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] font-semibold text-slate-900">Completed</h2>
                  <span className="text-[12px] text-slate-400">{filteredBookings.length} total</span>
                </div>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState
                    title="No completed bookings"
                    description="Reservations you've checked out will appear here."
                    actionLabel="View Upcoming"
                    onReset={() => setActiveBookingTab('upcoming')}
                  />
                )}
              </>
            )}

            {activeBookingTab === 'cancelled' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] font-semibold text-slate-900">Cancelled</h2>
                </div>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState
                    title="No cancelled bookings"
                    description="You have no cancelled reservations."
                    actionLabel="View Upcoming"
                    onReset={() => setActiveBookingTab('upcoming')}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Interactive Modals */}
      <ExtendModal
        booking={extendTarget}
        isOpen={Boolean(extendTarget)}
        onClose={() => setExtendTarget(null)}
        onConfirm={handleConfirmExtend}
      />
      <CancelModal
        booking={cancelTarget}
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
      />
      <EndEarlyModal
        booking={endEarlyTarget}
        isOpen={Boolean(endEarlyTarget)}
        onClose={() => setEndEarlyTarget(null)}
        onConfirm={handleConfirmEndEarly}
      />
      <InfoModal
        booking={infoTarget}
        isOpen={Boolean(infoTarget)}
        onClose={() => setInfoTarget(null)}
      />
    </AppShell>
  );
}
