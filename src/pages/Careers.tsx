import { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, Calendar, Users, Heart, TrendingUp, Award } from 'lucide-react';
import { supabase, Career } from '../lib/supabase';

export default function Careers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setCareers(data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            Be part of a company that's committed to making a difference in healthcare
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a team of passionate professionals dedicated to improving global health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: 'Meaningful Work',
                desc: 'Make a real impact on patients\' lives every day',
              },
              {
                icon: TrendingUp,
                title: 'Career Growth',
                desc: 'Continuous learning and advancement opportunities',
              },
              {
                icon: Users,
                title: 'Collaborative Culture',
                desc: 'Work with talented, supportive team members',
              },
              {
                icon: Award,
                title: 'Competitive Benefits',
                desc: 'Comprehensive compensation and benefits package',
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore exciting career opportunities across various departments
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading positions...</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">No current openings at the moment</p>
              <p className="text-gray-500">Please check back later or contact us about future opportunities</p>
            </div>
          ) : (
            <div className="space-y-6">
              {careers.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-teal-600" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-teal-600" />
                          <span>{job.employment_type}</span>
                        </div>
                        {job.application_deadline && (
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                            <span>
                              Apply by {new Date(job.application_deadline).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="mt-4 lg:mt-0 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedJob && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-4">{selectedJob.title}</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>{selectedJob.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{selectedJob.employment_type}</span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
              </div>

              {selectedJob.responsibilities && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Responsibilities</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedJob.responsibilities}</p>
                </div>
              )}

              {selectedJob.requirements && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedJob.requirements}</p>
                </div>
              )}

              {selectedJob.application_deadline && (
                <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded">
                  <p className="text-teal-800">
                    <strong>Application Deadline:</strong>{' '}
                    {new Date(selectedJob.application_deadline).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
                  Apply Now
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-gradient-to-r from-teal-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See the Right Role?</h2>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed mb-8">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="px-8 py-4 bg-white text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition transform hover:scale-105">
            Submit Your Resume
          </button>
        </div>
      </section>
    </div>
  );
}
