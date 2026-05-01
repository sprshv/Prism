import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, MapPin } from 'lucide-react';
import * as applicationApi from './applicationApi';

export const TrackApplicationPage = () => {
  const [token, setToken] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // Get token from URL parameters
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    const trackToken = params.get('token');
    if (trackToken) {
      setToken(trackToken);
      handleTrack(trackToken);
    }
  }, []);

  const handleTrack = async (trackToken) => {
    if (!trackToken) {
      setError('Please enter a tracking token');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const data = await applicationApi.trackApplication(trackToken);
      setApplication(data);
    } catch (err) {
      setError(err.message || 'Application not found. Please check your tracking token.');
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTrack(token);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'rejected':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-6 h-6" />;
      case 'rejected':
        return <AlertCircle className="w-6 h-6" />;
      case 'pending':
      default:
        return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'accepted':
        return 'Congratulations! Your application has been accepted. Check your email for login credentials.';
      case 'rejected':
        return 'Thank you for applying. Unfortunately, your application was not accepted at this time.';
      case 'pending':
      default:
        return 'Your application is being reviewed. We will notify you soon.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Track Your <span className="text-yellow-500">PRISM</span> Application
          </h1>
          <p className="text-xl text-slate-600">
            Check the status of your application using your tracking token
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Tracking Token <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your tracking token from your confirmation email"
              />
              <p className="text-xs text-slate-500 mt-2">
                You received this token in the email confirmation after submitting your application.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Track Application'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-lg mb-8 flex items-start">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {/* Application Status */}
        {application && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Status Header */}
            <div className={`${getStatusColor(application.status)} border-l-4 p-6 flex items-start justify-between`}>
              <div className="flex items-start space-x-4">
                {getStatusIcon(application.status)}
                <div>
                  <h2 className="text-2xl font-bold mb-2 capitalize">
                    Application {application.status}
                  </h2>
                  <p className="text-sm opacity-90">
                    {getStatusMessage(application.status)}
                  </p>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Applicant Info */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Applicant Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Name</p>
                      <p className="font-semibold text-blue-900">
                        {application.firstName} {application.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-semibold text-blue-900">{application.email}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Timeline</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Submitted</p>
                      <p className="font-semibold text-blue-900">
                        {new Date(application.submittedAt).toLocaleDateString('en-US', {
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
                </div>
              </div>

              {/* What Happens Next */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">What Happens Next?</h3>
                
                {application.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-green-900">Your account has been created</p>
                          <p className="text-sm text-green-800 mt-1">
                            Check your email for your login credentials. You can now access the PRISM dashboard to see events, log service hours, and more.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-green-900">Join our community</p>
                          <p className="text-sm text-green-800 mt-1">
                            Welcome to PRISM! You're now part of our mission to inspire elementary students in STEM. Check out our upcoming workshops and community events.
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      href="#/auth"
                      className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      Go to Sign In →
                    </a>
                  </div>
                )}

                {application.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="space-y-3">
                      <p className="text-red-900">
                        Thank you for your interest in PRISM. While we were impressed by your application, we were unable to offer you a position at this time.
                      </p>
                      <p className="text-sm text-red-800">
                        We encourage you to apply again in the future. You can also reach out to us if you have any questions.
                      </p>
                    </div>
                    <a
                      href="#/contact"
                      className="mt-6 inline-block px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
                    >
                      Contact Us →
                    </a>
                  </div>
                )}

                {application.status === 'pending' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-yellow-900">Your application is under review</p>
                          <p className="text-sm text-yellow-800 mt-1">
                            We're carefully reviewing your application. Most decisions are made within 1-2 weeks.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-yellow-900">Stay in touch</p>
                          <p className="text-sm text-yellow-800 mt-1">
                            Make sure to check your email regularly for updates. You can also check back here to see your application status.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Have Questions?</h3>
                <p className="text-slate-600 mb-4">
                  Feel free to reach out to us if you have any questions about your application or PRISM.
                </p>
                <a
                  href="#/contact"
                  className="inline-block px-6 py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {searched && !application && !loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Application Found</h3>
            <p className="text-gray-500">
              We couldn't find an application with that tracking token. Please double-check and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
