import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Eye, AlertCircle, Filter, ChevronDown } from 'lucide-react';
import * as applicationApi from './applicationApi';

export const ApplicationsTab = ({ user, token }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [processAction, setProcessAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Check if user can access this tab
  const canAccessApplications = ['admin', 'executive', 'president'].includes(user?.role);

  // Fetch applications
  const fetchApplications = async () => {
    if (!canAccessApplications) {
      console.log('User cannot access applications:', user?.role);
      return;
    }

    console.log('Fetching applications... Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
    console.log('User role:', user?.role);

    setLoading(true);
    setError('');

    try {
      const data = await applicationApi.getApplications(token);
      console.log('Applications fetched:', data);
      console.log('Number of applications:', data?.length || 0);
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      console.error('Error details:', err.message);
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle accept application
  const handleAccept = async (appId) => {
    if (!window.confirm('Accept this application and create user account?')) return;

    setActionLoading(true);
    try {
      await applicationApi.acceptApplication(appId, token);
      alert('Application accepted! User account has been created and email sent.');
      await fetchApplications();
      setShowDetailModal(false);
    } catch (err) {
      alert('Error accepting application: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle reject application
  const handleReject = async (appId) => {
    if (!window.confirm('Reject this application?')) return;

    setActionLoading(true);
    try {
      await applicationApi.rejectApplication(appId, token);
      alert('Application rejected. Rejection email has been sent.');
      await fetchApplications();
      setShowDetailModal(false);
    } catch (err) {
      alert('Error rejecting application: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete application
  const handleDelete = async (appId) => {
    setActionLoading(true);
    try {
      await applicationApi.deleteApplication(appId, token);
      alert('Application deleted successfully.');
      await fetchApplications();
      setShowDetailModal(false);
    } catch (err) {
      alert('Error deleting application: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filter applications based on user role and filters
  let filteredApplications = applications;

  // If president, only show team's applications
  if (user?.role === 'president') {
    filteredApplications = filteredApplications.filter(app => app.team === user?.team);
  }

  // Apply status filter
  if (filterStatus !== 'all') {
    filteredApplications = filteredApplications.filter(app => app.status === filterStatus);
  }

  // Apply team filter
  if (filterTeam !== 'all') {
    filteredApplications = filteredApplications.filter(app => app.team === filterTeam);
  }

  // Get unique teams
  const teams = [...new Set(applications.map(app => app.team))].sort();

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-300';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  if (!canAccessApplications) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <p className="text-yellow-800 font-semibold">Access Denied</p>
        <p className="text-yellow-700 text-sm">Only admin, executives, and presidents can view applications.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Applications Dashboard</h2>
            <p className="text-slate-600">
              Review and manage membership applications
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-900">{filteredApplications.length}</p>
            <p className="text-sm text-slate-600">Applications</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {user?.role === 'admin' && teams.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Team</label>
              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-end">
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-50 border border-blue-200 text-blue-900 rounded-md hover:bg-blue-100 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            <p className="text-slate-600 mt-4">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">No applications found</p>
            <p className="text-gray-500 text-sm mt-1">There are no applications matching your filters.</p>
          </div>
        ) : (
          filteredApplications.map(app => (
            <div
              key={app.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-all ${
                app.status === 'accepted'
                  ? 'border-green-200'
                  : app.status === 'rejected'
                  ? 'border-red-200'
                  : 'border-yellow-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-blue-900">
                      {app.firstName} {app.lastName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(app.status)} flex items-center gap-1`}>
                      {getStatusIcon(app.status)}
                      {app.status === 'pending' ? 'Pending' : app.status === 'accepted' ? 'Accepted' : 'Rejected'}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Email</p>
                      <p className="font-medium text-blue-900">{app.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Team</p>
                      <p className="font-medium text-blue-900">{app.team}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Location</p>
                      <p className="font-medium text-blue-900">{app.location}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Applied</p>
                      <p className="font-medium text-blue-900">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setShowDetailModal(true);
                  }}
                  className="ml-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this application? This cannot be undone.')) {
                      handleDelete(app.id);
                    }
                  }}
                  className="ml-2 px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center gap-2 whitespace-nowrap"
                  title="Delete application"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`${
              selectedApplication.status === 'accepted'
                ? 'bg-green-50 border-b border-green-200'
                : selectedApplication.status === 'rejected'
                ? 'bg-red-50 border-b border-red-200'
                : 'bg-yellow-50 border-b border-yellow-200'
            } p-6 flex justify-between items-start`}>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h2>
                <p className="text-slate-600">{selectedApplication.email}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Name</p>
                    <p className="font-medium text-blue-900">
                      {selectedApplication.firstName} {selectedApplication.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-blue-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="font-medium text-blue-900">{selectedApplication.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium text-blue-900">{selectedApplication.location}</p>
                  </div>
                </div>
              </div>

              {/* School Info */}
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-4">School Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">School/University</p>
                    <p className="font-medium text-blue-900">{selectedApplication.school}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Grade/Year</p>
                    <p className="font-medium text-blue-900">{selectedApplication.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Weighted GPA</p>
                    <p className="font-medium text-blue-900">{selectedApplication.weightedGPA || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Unweighted GPA</p>
                    <p className="font-medium text-blue-900">{selectedApplication.unweightedGPA || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* STEM Info */}
              {(selectedApplication.stemClasses || selectedApplication.programInterests) && (
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4">STEM Background</h3>
                  {selectedApplication.stemClasses && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-600 mb-1">STEM Classes</p>
                      <p className="text-blue-900 bg-blue-50 p-3 rounded-md text-sm">
                        {selectedApplication.stemClasses}
                      </p>
                    </div>
                  )}
                  {selectedApplication.programInterests && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Program Interests</p>
                      <p className="text-blue-900 bg-blue-50 p-3 rounded-md text-sm">
                        {selectedApplication.programInterests}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Application Info */}
              {(selectedApplication.whyJoin || selectedApplication.experience || selectedApplication.availability) && (
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Application Details</h3>
                  {selectedApplication.whyJoin && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-600 mb-1">Why PRISM?</p>
                      <p className="text-blue-900 bg-blue-50 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {selectedApplication.whyJoin}
                      </p>
                    </div>
                  )}
                  {selectedApplication.experience && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-600 mb-1">Experience</p>
                      <p className="text-blue-900 bg-blue-50 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {selectedApplication.experience}
                      </p>
                    </div>
                  )}
                  {selectedApplication.availability && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Availability</p>
                      <p className="text-blue-900 bg-blue-50 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {selectedApplication.availability}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Officer Interest */}
              {selectedApplication.interestedInOfficer && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-3">Officer Position Interest</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Preferred Role</p>
                      <p className="font-medium text-blue-900">{selectedApplication.officerRole}</p>
                    </div>
                    {selectedApplication.leadershipExperience && (
                      <div>
                        <p className="text-sm text-slate-600">Leadership Experience</p>
                        <p className="text-blue-900 text-sm whitespace-pre-wrap">
                          {selectedApplication.leadershipExperience}
                        </p>
                      </div>
                    )}
                    {selectedApplication.whyOfficerRole && (
                      <div>
                        <p className="text-sm text-slate-600">Why This Role?</p>
                        <p className="text-blue-900 text-sm whitespace-pre-wrap">
                          {selectedApplication.whyOfficerRole}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Software Dev Interest */}
              {selectedApplication.interestedInSoftwareDev && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-3">Software Development Interest</h4>
                  {selectedApplication.softwareDevExperience && (
                    <div>
                      <p className="text-sm text-slate-600">Development Experience</p>
                      <p className="text-green-900 text-sm whitespace-pre-wrap">
                        {selectedApplication.softwareDevExperience}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-slate-500">
                  Applied: {new Date(selectedApplication.submittedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Modal Footer - Actions */}
            {selectedApplication.status === 'pending' && (
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-6 flex gap-4 justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleReject(selectedApplication.id)}
                  disabled={actionLoading}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
                >
                  {actionLoading ? 'Processing...' : 'Reject'}
                </button>
                <button
                  onClick={() => handleAccept(selectedApplication.id)}
                  disabled={actionLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {actionLoading ? 'Processing...' : 'Accept'}
                </button>
              </div>
            )}

            {selectedApplication.status !== 'pending' && (
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-6 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
