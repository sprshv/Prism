import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Users, FileText, GraduationCap, FolderOpen, Award, Newspaper, Mail, LogIn, Check, AlertCircle, Calendar, Lightbulb, MapPin } from 'lucide-react';
import { API_URL } from './config';

// Schools Page
const SchoolsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-blue-900">Bring </span>
            <span className="text-yellow-500">PRISM</span>
            <span className="text-blue-900"> to Your School</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Inspire your elementary students with engaging, hands-on STEM workshops led by passionate high school and college mentors
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Classroom Visits</h3>
              <p className="text-slate-600 mb-4">Interactive presentations for individual classes</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 30-45 minute sessions</li>
                <li>• 20-30 students per session</li>
                <li>• Hands-on experiments</li>
                <li>• Age-appropriate content</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">School Assemblies</h3>
              <p className="text-slate-600 mb-4">Large-scale presentations for multiple grades</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 45-60 minute presentations</li>
                <li>• Multiple classes together</li>
                <li>• Interactive demonstrations</li>
                <li>• Q&A sessions</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">After-School Programs</h3>
              <p className="text-slate-600 mb-4">Extended workshops for deeper learning</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 60-90 minute sessions</li>
                <li>• Smaller group sizes</li>
                <li>• Multi-session programs</li>
                <li>• Project-based learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Popular Workshop Topics</h2>
          <div className="bg-white rounded-2xl p-10 border border-gray-200">
            <p className="text-center text-slate-600 mb-10">Our most requested STEM subjects and activities</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4">Space & Astronomy</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Solar system exploration</li>
                  <li>• Rocket building</li>
                  <li>• Star observation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4">Engineering</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Bridge building challenges</li>
                  <li>• Simple machines</li>
                  <li>• Robotics basics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4">Life Sciences</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Human body systems</li>
                  <li>• Plant biology</li>
                  <li>• Animal adaptations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4">Chemistry</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Safe chemical reactions</li>
                  <li>• States of matter</li>
                  <li>• pH and acids/bases</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4">Technology</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Basic coding concepts</li>
                  <li>• Computer science intro</li>
                  <li>• Digital creativity</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-600 mb-4">Mathematics</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Math puzzles and games</li>
                  <li>• Pattern recognition</li>
                  <li>• Real-world applications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-2xl p-10 text-center border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Schedule a Workshop</h2>
            <p className="text-slate-600 mb-8">
              Ready to bring the excitement of STEM to your students? Contact us to discuss scheduling and program options.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#/contact"
                className="px-6 py-3 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#/programs"
                className="px-6 py-3 bg-white border-2 border-gray-300 text-blue-800 rounded-md font-medium hover:border-gray-400 transition-colors"
              >
                View All Programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Resources Page
const ResourcesPage = () => {
  const resources = [
    { type: 'PDF', title: 'STEM at Home Activity Book', desc: 'A comprehensive collection of 50+ hands-on STEM activities that families can do together using common household items.', badge: 'New', link: '#' },
    { type: 'Video', title: 'Virtual Lab Tours', desc: 'Take virtual tours of real science labs and research facilities to see STEM careers in action.', badge: 'Popular', link: '#' },
    { type: 'Printable', title: 'STEM Challenge Cards', desc: 'Printable challenge cards with engineering design problems perfect for classroom or home use.', badge: 'Teacher Favorite', link: '#' }
  ];

  const studentResources = [
    { title: 'NASA Kids Club', desc: 'Interactive games and activities about space exploration', type: 'Website' },
    { title: 'Code.org Hour of Code', desc: 'One-hour coding tutorials for beginners', type: 'Interactive' },
    { title: 'Mystery Science', desc: 'Hands-on science lessons for elementary students', type: 'Video Lessons' },
    { title: 'National Geographic Kids', desc: 'Science articles, games, and videos', type: 'Website' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-blue-900">STEM Learning </span>
            <span className="text-yellow-500">Resources</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover curated resources to support STEM learning at home, in the classroom, and beyond
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <BookOpen className="w-8 h-8 text-blue-900" />
            <h2 className="text-3xl font-bold text-blue-900">Featured Resources</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-yellow-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                    {resource.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{resource.title}</h3>
                <p className="text-slate-600 mb-6">{resource.desc}</p>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-gray-100 text-blue-800 rounded text-sm">{resource.type}</span>
                  <a href={resource.link} className="text-blue-900 font-medium hover:text-blue-700 inline-flex items-center">
                    Access →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <BookOpen className="w-8 h-8 text-yellow-600" />
            <h2 className="text-3xl font-bold text-blue-900">For Students</h2>
          </div>
          <p className="text-slate-600 mb-8">Fun STEM learning resources for elementary students</p>
          <div className="grid md:grid-cols-2 gap-6">
            {studentResources.map((resource, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-blue-900">{resource.title}</h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{resource.type}</span>
                </div>
                <p className="text-slate-600">{resource.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Leadership Page
const LeadershipPage = () => {
  const philosophy = [
    { icon: '👥', title: 'Student-Centered', desc: 'Every decision prioritizes the learning experience and growth of the elementary students we serve.' },
    { icon: '🤝', title: 'Collaborative', desc: 'We work together as a team, valuing diverse perspectives and shared decision-making.' },
    { icon: '💡', title: 'Innovative', desc: 'We continuously seek new ways to make STEM education more engaging and accessible.' },
    { icon: '🎯', title: 'Responsible', desc: 'We take ownership of our commitments and maintain high standards of professionalism.' }
  ];

  const positions = [
    { icon: '👑', title: 'President', desc: 'Oversees all PRISM operations and strategic direction', responsibilities: ['Lead leadership meetings', 'Manage organizational vision', 'Represent PRISM externally', 'Coordinate with mentors'], color: 'bg-purple-50 border-purple-200' },
    { icon: '📢', title: 'PR & Communications', desc: 'Manages public relations and program promotion', responsibilities: ['Social media management', 'Marketing materials', 'School outreach', 'Event promotion'], color: 'bg-green-50 border-green-200' },
    { icon: '📅', title: 'VP of Activities', desc: 'Coordinates workshops and educational activities', responsibilities: ['Schedule workshops with partner elementary schools', 'Develop age-appropriate STEM curriculum and activities', 'Train mentors on presentation and teaching techniques', 'Evaluate program effectiveness and student engagement'], color: 'bg-red-50 border-red-200' },
    { icon: '🎯', title: 'Events Manager', desc: 'Manages event logistics, resources, and coordination', responsibilities: ['Coordinate transportation and materials for workshops', 'Maintain inventory of educational supplies and equipment', 'Handle event planning and execution logistics', 'Manage event budgets and resource allocation'], color: 'bg-blue-50 border-blue-200' },
    { icon: '💛', title: 'VP of Community Services', desc: 'Leads community outreach and service initiatives', responsibilities: ['Develop community service projects and partnerships', 'Coordinate volunteer opportunities for mentors', 'Engage with local organizations and nonprofits', 'Organize community impact events and initiatives'], color: 'bg-yellow-50 border-yellow-200' },
    { icon: '🌐', title: 'Director of Outreach', desc: 'Expands program reach and builds external partnerships', responsibilities: ['Identify and connect with new partner schools', 'Build relationships with STEM organizations', 'Coordinate with college mentor programs', 'Develop strategies for program expansion'], color: 'bg-orange-50 border-orange-200' },
    { icon: '👥', title: 'Membership Director', desc: 'Manages mentor recruitment and membership engagement', responsibilities: ['Recruit and onboard new high school and college mentors', 'Coordinate mentor training and development programs', 'Maintain mentor database and participation records', 'Plan team building and member appreciation events'], color: 'bg-pink-50 border-pink-200' },
    { icon: '💬', title: 'Communications Officer', desc: 'Writers and makers of website, digital communications', responsibilities: ['Maintain and update the PRISM website', 'Create digital content and newsletters', 'Manage internal team communications', 'Document program activities and create reports'], color: 'bg-indigo-50 border-indigo-200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-yellow-500">PRISM</span>
            <span className="text-blue-900"> Leadership</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Meet the dedicated high school student leaders who make <span className="text-yellow-500">PRISM</span>'s mission possible
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 rounded-2xl p-10 border-2 border-yellow-200">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Our Leadership Philosophy</h2>
            <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
              <span className="text-yellow-500">PRISM</span> is built on the belief that students can effectively teach and inspire other students. Our leadership
              structure empowers high school and college students to take ownership of their learning while developing real-world
              leadership skills.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {philosophy.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-12">
            <Award className="w-8 h-8 text-yellow-600" />
            <h2 className="text-3xl font-bold text-blue-900">Leadership Positions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {positions.map((position, i) => (
              <div key={i} className={`bg-white rounded-xl p-8 border-2 ${position.color}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center text-3xl">
                    {position.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{position.title}</h3>
                    <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: position.desc }}></p>
                  </div>
                </div>
                <h4 className="font-semibold text-blue-900 mb-3">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  {position.responsibilities.map((resp, j) => (
                    <li key={j} className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-slate-600">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <Lightbulb className="w-8 h-8 text-yellow-600" />
            <h2 className="text-3xl font-bold text-blue-900">Leadership Development</h2>
          </div>
          <p className="text-slate-600 mb-8">How PRISM develops future leaders</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-yellow-50 rounded-xl p-8 border-2 border-yellow-200">
              <h3 className="text-2xl font-bold text-yellow-600 mb-6">Training & Support</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Monthly leadership workshops on communication and management</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Mentorship from college students and STEM professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Public speaking and presentation skills development</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Project management and organizational skills training</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-600 mb-6">Growth Opportunities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Leadership conferences and student government participation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Collaboration with district administrators and educators</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Community event planning and execution experience</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-slate-600">Letters of recommendation and leadership certificates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Interested in Leadership?</h2>
          <p className="text-lg text-slate-600 mb-8">
            PRISM leadership positions are filled through an application and interview process. We look for
            students who are passionate about STEM education and committed to serving their community.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Applications open each fall semester
            </button>
            <button className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              One year terms with renewal opportunity
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// News Page
const NewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-blue-900">Latest </span>
            <span className="text-yellow-500">News</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with <span className="text-yellow-500">PRISM</span>'s latest announcements, achievements, and upcoming events
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <p className="text-lg">No news articles at this time. Check back soon!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Page with Working Form
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/email/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Message Sent!</h2>
          <p className="text-slate-600">Thank you for contacting <span className="text-yellow-500">PRISM</span>. We'll get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">Contact Us</h1>
          <p className="text-xl text-slate-600">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Email</h3>
                  <p className="text-slate-600">prismprogramscv@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">For Schools</h3>
                  <p className="text-slate-600">Interested in bringing <span className="text-yellow-500">PRISM</span> to your school? Contact us to schedule a workshop.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">For Students</h3>
                  <p className="text-slate-600">Want to become a <span className="text-yellow-500">PRISM</span> mentor? Apply through our application page or reach out with questions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us more..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = ({ user, logout }) => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [registerForm, setRegisterForm] = useState({ firstName: '', lastName: '', email: '', role: 'member', teamId: '' });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Calendar and events state
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' });
  const [showEventForm, setShowEventForm] = useState(false);

  // Service hours state
  const [serviceHours, setServiceHours] = useState([]);
  const [newServiceHour, setNewServiceHour] = useState({ hours: '', date: '', activity: '', description: '' });
  const [showServiceHourForm, setShowServiceHourForm] = useState(false);

  // User management state (admin/president only)
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  // Team management state (admin only)
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamError, setTeamError] = useState('');
  const [teamSuccess, setTeamSuccess] = useState('');

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/events/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  // Fetch service hours from backend
  const fetchServiceHours = async () => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/service-hours/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setServiceHours(data);
      }
    } catch (err) {
      console.error('Error fetching service hours:', err);
    }
  };

  // Fetch all users (admin/president only)
  const fetchUsers = async () => {
    if (user.role !== 'admin' && user.role !== 'president') return;
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/teams/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
    }
  };

  // Refetch current user data to get updated team_id
  const refetchUserData = async () => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        // Update user object if team_id changed
        if (userData.team_id !== user.team_id) {
          sessionStorage.setItem('prism_user', JSON.stringify(userData));
          window.location.reload(); // Reload to update user state
        }
      }
    } catch (err) {
      console.error('Error refetching user data:', err);
    }
  };

  // Fetch events on mount and poll every 5 seconds for updates
  useEffect(() => {
    fetchEvents();
    fetchServiceHours();
    fetchUsers();
    fetchTeams();
    const interval = setInterval(() => {
      fetchEvents();
      fetchServiceHours();
      refetchUserData(); // Check for user updates
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setRegisterError('');
    setRegisterSuccess('');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerForm.firstName.trim() || !registerForm.lastName.trim() || !registerForm.email.trim()) {
      setRegisterError('First name, last name, and email are required');
      return;
    }

    if (!registerForm.teamId && user.role !== 'admin') {
      setRegisterError('Please select a team');
      return;
    }

    setLoading(true);
    setRegisterError('');
    setRegisterSuccess('');

    try {
      const token = sessionStorage.getItem('prism_token');
      const requestBody = {
        first_name: registerForm.firstName,
        last_name: registerForm.lastName,
        email: registerForm.email,
        role: registerForm.role,
      };
      
      if (registerForm.teamId) {
        requestBody.team_id = registerForm.teamId;
      }

      const response = await fetch(`${API_URL}/auth/register-member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = typeof errorData.detail === 'string' 
          ? errorData.detail 
          : (Array.isArray(errorData.detail) 
            ? errorData.detail.map(e => e.msg || e).join(', ')
            : 'Registration failed');
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setRegisterSuccess(`${data.role === 'officer' ? 'Officer' : 'Member'} registered successfully! Email: ${data.email}, Default Password: ${data.default_password}`);
      setRegisterForm({ firstName: '', lastName: '', email: '', role: 'member', teamId: '' });
      fetchUsers(); // Refresh user list
    } catch (err) {
      setRegisterError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/events/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
        setShowEventForm(false);
        await fetchEvents(); // Refresh events list
      } else {
        const error = await response.json();
        alert('Error creating event: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error creating event:', err);
      alert('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchEvents(); // Refresh events list
      } else {
        const error = await response.json();
        alert('Error deleting event: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Error deleting event');
    }
  };

  // Service hours handlers
  const handleServiceHourChange = (e) => {
    setNewServiceHour({ ...newServiceHour, [e.target.name]: e.target.value });
  };

  const handleServiceHourSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/service-hours/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newServiceHour),
      });

      if (response.ok) {
        setNewServiceHour({ hours: '', date: '', activity: '', description: '' });
        setShowServiceHourForm(false);
        await fetchServiceHours();
      } else {
        const error = await response.json();
        alert('Error logging service hours: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error logging service hours:', err);
      alert('Error logging service hours');
    } finally {
      setLoading(false);
    }
  };

  const approveServiceHour = async (id, status, rejectionReason = null) => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/service-hours/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status, rejection_reason: rejectionReason }),
      });

      if (response.ok) {
        await fetchServiceHours();
      } else {
        const error = await response.json();
        alert('Error updating service hours: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error updating service hours:', err);
      alert('Error updating service hours');
    }
  };

  const deleteServiceHour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }
    
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/service-hours/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchServiceHours();
      } else {
        const error = await response.json();
        alert('Error deleting service hours: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting service hours:', err);
      alert('Error deleting service hours');
    }
  };

  // Team management handlers
  const handleTeamChange = (e) => {
    setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
    setTeamError('');
    setTeamSuccess('');
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    if (!newTeam.name.trim()) {
      setTeamError('Team name is required');
      return;
    }

    setLoading(true);
    setTeamError('');
    setTeamSuccess('');

    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/teams/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newTeam),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create team');
      }

      const data = await response.json();
      setTeamSuccess(`Team "${data.name}" created successfully!`);
      setNewTeam({ name: '', description: '' });
      setShowTeamForm(false);
      await fetchTeams(); // Refresh teams list
    } catch (err) {
      setTeamError(err.message || 'An error occurred while creating the team');
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team? Users in this team will have their team_id removed.')) {
      return;
    }

    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchTeams();
        await fetchUsers(); // Refresh users as their team associations may have changed
      } else {
        const error = await response.json();
        alert('Error deleting team: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting team:', err);
      alert('Error deleting team');
    }
  };

  // User management handlers
  const updateUserRole = async (userId, newRole) => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        await fetchUsers();
        setEditingUserId(null);
        setNewRole('');
        alert('User role updated successfully');
      } else {
        const error = await response.json();
        const errorMessage = typeof error.detail === 'string' 
          ? error.detail 
          : (typeof error.detail === 'object' && error.detail.message 
            ? error.detail.message 
            : JSON.stringify(error.detail || 'Unknown error'));
        alert('Error updating user role: ' + errorMessage);
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('Error updating user role: ' + err.message);
    }
  };

  const updateUserTeam = async (userId, teamId) => {
    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/users/${userId}/team`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ team_id: teamId || null }),
      });

      if (response.ok) {
        await fetchUsers();
      } else {
        const error = await response.json();
        alert('Error updating user team: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error updating user team:', err);
      alert('Error updating user team');
    }
  };

  const deleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = sessionStorage.getItem('prism_token');
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchUsers();
        alert('User deleted successfully');
      } else {
        const error = await response.json();
        alert('Error deleting user: ' + (error.detail || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Error deleting user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">
                Welcome, {user.name}!
              </h1>
              <p className="text-slate-600">
                Role: <span className="font-semibold capitalize">{user.role}</span>
                {' | '}
                Team: <span className="font-semibold">
                  {!user.team_id 
                    ? 'No team'
                    : teams.length === 0
                      ? 'Loading...'
                      : (teams.find(t => t.id === user.team_id)?.name || 'Unknown team')}
                </span>
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-200 text-blue-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calendar'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-blue-800 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('serviceHours')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'serviceHours'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-blue-800 hover:border-gray-300'
              }`}
            >
              <Award className="w-5 h-5 inline mr-2" />
              Service Hours
            </button>
            {(user.role === 'officer' || user.role === 'president' || user.role === 'admin') && (
              <button
                onClick={() => setActiveTab('register')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'register'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-blue-800 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Register Users
              </button>
            )}
            {(user.role === 'admin' || user.role === 'president') && (
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-blue-800 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Manage Users
              </button>
            )}
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-blue-800 hover:border-gray-300'
              }`}
            >
              <BookOpen className="w-5 h-5 inline mr-2" />
              Resources
            </button>
          </nav>
        </div>

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Upcoming Events</h2>
                  <p className="text-slate-600">
                    {(user.role === 'officer' || user.role === 'president' || user.role === 'admin') ? (
                      <>Schedule and manage <span className="text-yellow-500">PRISM</span> workshops and events</>
                    ) : (
                      <>View scheduled <span className="text-yellow-500">PRISM</span> workshops and events</>
                    )}
                  </p>
                </div>
                {(user.role === 'officer' || user.role === 'president' || user.role === 'admin') && (
                  <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {showEventForm ? 'Cancel' : 'Schedule Event'}
                  </button>
                )}
              </div>

              {showEventForm && (user.role === 'officer' || user.role === 'president' || user.role === 'admin') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Schedule New Event</h3>
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleEventChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Space Exploration Workshop"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={newEvent.date}
                          onChange={handleEventChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Time <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={newEvent.time}
                          onChange={handleEventChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={newEvent.location}
                        onChange={handleEventChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Lincoln Elementary School"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleEventChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of the event"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
                    >
                      Schedule Event
                    </button>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {events.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No events scheduled yet</p>
                  </div>
                ) : (
                  events
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(event => (
                      <div key={event.id} className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h3>
                            <div className="space-y-2">
                              <div className="flex items-center text-slate-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center text-slate-600">
                                <span className="mr-2">🕐</span>
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center text-slate-600">
                                <span className="mr-2">📍</span>
                                <span>{event.location}</span>
                              </div>
                              {event.team_id && (
                                <div className="flex items-center text-slate-600">
                                  <Users className="w-4 h-4 mr-2" />
                                  <span className="font-medium">Team: {teams.find(t => t.id === event.team_id)?.name || 'Unknown'}</span>
                                </div>
                              )}
                              {event.description && (
                                <p className="text-slate-600 mt-2">{event.description}</p>
                              )}
                            </div>
                          </div>
                          {(user.role === 'officer' || user.role === 'president' || user.role === 'admin') && (
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className="ml-4 px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Register Tab (Officers, President, Admin) */}
        {activeTab === 'register' && (user.role === 'officer' || user.role === 'president' || user.role === 'admin') && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Register New User</h2>
              <p className="text-slate-600">
                Create a new member or officer account. A default password will be generated based on their first name.
              </p>
            </div>

            {registerSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                <div className="font-semibold mb-1">Success!</div>
                <div className="text-sm">{registerSuccess}</div>
              </div>
            )}

            {registerError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {registerError}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={registerForm.firstName}
                    onChange={handleRegisterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={registerForm.lastName}
                    onChange={handleRegisterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={registerForm.role}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="member">Member</option>
                  <option value="officer">Officer</option>
                  {user.role === 'admin' && (
                    <>
                      <option value="president">President</option>
                      <option value="admin">Admin</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Team {user.role !== 'admin' && <span className="text-red-500">*</span>}
                </label>
                <select
                  name="teamId"
                  value={registerForm.teamId}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={user.role !== 'admin'}
                >
                  <option value="">
                    {user.role === 'admin' ? 'No Team (Admin only)' : 'Select a team'}
                  </option>
                  {teams
                    .filter(team => user.role === 'admin' || team.id === user.team_id)
                    .map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  {user.role === 'admin' 
                    ? 'Admins can assign members to any team or leave unassigned' 
                    : 'You can only register members to your own team'}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Register Member'}
              </button>
            </form>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Resources & Materials</h2>
            <p className="text-slate-600 mb-6">
              {user.role === 'officer' ? 'Workshop materials, presentation templates, and planning resources' : 'Access workshop materials and educational resources'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Workshop Templates</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">Ready-to-use presentation templates and activity guides</p>
                <button className="text-blue-900 font-medium text-sm hover:underline">Browse Templates →</button>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">🔬</span>
                  <h3 className="text-lg font-semibold text-blue-900">Experiment Guides</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">Step-by-step guides for hands-on activities</p>
                <button className="text-yellow-700 font-medium text-sm hover:underline">View Guides →</button>
              </div>
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">📊</span>
                  <h3 className="text-lg font-semibold text-blue-900">Planning Tools</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">Checklists and planning resources for workshops</p>
                <button className="text-green-700 font-medium text-sm hover:underline">Access Tools →</button>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">💡</span>
                  <h3 className="text-lg font-semibold text-blue-900">Training Materials</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">Guides for mentors and presenters</p>
                <button className="text-purple-700 font-medium text-sm hover:underline">Start Learning →</button>
              </div>
            </div>
          </div>
        )}

        {/* Service Hours Tab */}
        {activeTab === 'serviceHours' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Service Hours</h2>
                  <p className="text-slate-600">
                    {user.role === 'admin' ? 'Review and approve service hour submissions' : 'Log your volunteer hours'}
                  </p>
                </div>
                {(user.role === 'member' || user.role === 'officer' || user.role === 'president') && (
                  <button
                    onClick={() => setShowServiceHourForm(!showServiceHourForm)}
                    className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    {showServiceHourForm ? 'Cancel' : 'Log Hours'}
                  </button>
                )}
              </div>

              {showServiceHourForm && (user.role === 'member' || user.role === 'officer' || user.role === 'president') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Log Service Hours</h3>
                  <form onSubmit={handleServiceHourSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Hours <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          name="hours"
                          value={newServiceHour.hours}
                          onChange={handleServiceHourChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 2.5"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={newServiceHour.date}
                          onChange={handleServiceHourChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Activity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="activity"
                        value={newServiceHour.activity}
                        onChange={handleServiceHourChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Space Workshop at Lincoln Elementary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={newServiceHour.description}
                        onChange={handleServiceHourChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Describe what you did..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400"
                    >
                      {loading ? 'Submitting...' : 'Submit Hours'}
                    </button>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {serviceHours.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-slate-600">No service hours logged yet</p>
                  </div>
                ) : (
                  serviceHours.map((hour) => (
                    <div key={hour.id} className={`bg-gray-50 border rounded-lg p-6 ${
                      hour.status === 'pending' ? 'border-yellow-300' :
                      hour.status === 'approved' ? 'border-green-300' :
                      'border-red-300'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-blue-900">{hour.activity}</h3>
                          <p className="text-sm text-slate-600">{hour.user_name} • {hour.date}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            hour.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            hour.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {hour.status === 'pending' ? 'Pending' : hour.status === 'approved' ? 'Approved' : 'Rejected'}
                          </span>
                          <span className="text-xl font-bold text-blue-900">{hour.hours}h</span>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-4">{hour.description}</p>
                      
                      {((user.role === 'admin') || (user.role === 'president' && hour.user_id !== user.id)) && hour.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => approveServiceHour(hour.id, 'approved')}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Rejection reason:');
                              if (reason) approveServiceHour(hour.id, 'rejected', reason);
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      
                      {hour.status === 'rejected' && hour.rejection_reason && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm text-red-800"><strong>Rejection reason:</strong> {hour.rejection_reason}</p>
                        </div>
                      )}
                      
                      {(hour.user_id === user.id || user.role === 'admin' || user.role === 'president') && (
                        <button
                          onClick={() => deleteServiceHour(hour.id)}
                          className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Delete Entry
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab (Admin/President Only) */}
        {activeTab === 'users' && (user.role === 'admin' || user.role === 'president') && (
          <div className="space-y-6">
            {/* Team Management Section (Admin Only) */}
            {user.role === 'admin' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Team Management</h2>
                    <p className="text-slate-600">Create and manage teams for organizing members</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowTeamForm(!showTeamForm);
                      setTeamError('');
                      setTeamSuccess('');
                    }}
                    className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {showTeamForm ? 'Cancel' : 'Create Team'}
                  </button>
                </div>

                {teamSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    {teamSuccess}
                  </div>
                )}

                {teamError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {teamError}
                  </div>
                )}

                {showTeamForm && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Create New Team</h3>
                    <form onSubmit={handleTeamSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Team Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={newTeam.name}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Silicon Valley Team"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Description (Optional)
                        </label>
                        <textarea
                          name="description"
                          value={newTeam.description}
                          onChange={handleTeamChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Brief description of this team..."
                          rows="3"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400"
                        >
                          {loading ? 'Creating...' : 'Create Team'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowTeamForm(false);
                            setNewTeam({ name: '', description: '' });
                            setTeamError('');
                          }}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  {teams.map((team) => (
                    <div key={team.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-blue-900">{team.name}</h3>
                        <button
                          onClick={() => deleteTeam(team.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{team.description || 'No description'}</p>
                      <p className="text-xs text-slate-500">
                        {users.filter(u => u.team_id === team.id).length} members
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Management Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Users by Team</h2>
              <p className="text-slate-600 mb-6">View and manage users organized by their teams</p>
              
              {/* Unassigned Users (Admin Only) */}
              {user.role === 'admin' && users.filter(u => !u.team_id).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Unassigned Users ({users.filter(u => !u.team_id).length})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.filter(u => !u.team_id).map((u) => (
                          <tr key={u.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{u.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{u.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingUserId === u.id ? (
                                <select
                                  value={newRole}
                                  onChange={(e) => setNewRole(e.target.value)}
                                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                                >
                                  <option value="">Select role...</option>
                                  <option value="member">Member</option>
                                  <option value="officer">Officer</option>
                                  {user.role === 'admin' && (
                                    <>
                                      <option value="president">President</option>
                                      <option value="admin">Admin</option>
                                    </>
                                  )}
                                </select>
                              ) : (
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                                  u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                  u.role === 'president' ? 'bg-blue-100 text-blue-800' :
                                  u.role === 'officer' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {u.role}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value=""
                                onChange={(e) => updateUserTeam(u.id, e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500"
                              >
                                <option value="">No team</option>
                                {teams.map((t) => (
                                  <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {editingUserId === u.id ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => updateUserRole(u.id, newRole)}
                                    disabled={!newRole}
                                    className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingUserId(null);
                                      setNewRole('');
                                    }}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => {
                                      setEditingUserId(u.id);
                                      setNewRole(u.role);
                                    }}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Edit
                                  </button>
                                  {user.role === 'admin' && u.id !== user.id && (
                                    <button
                                      onClick={() => deleteUser(u.id, u.name)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Users grouped by teams */}
              {teams.filter(team => user.role === 'admin' || team.id === user.team_id).map((team) => (
                <div key={team.id} className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {team.name} ({users.filter(u => u.team_id === team.id).length} members)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          {user.role === 'admin' && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                          )}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.filter(u => u.team_id === team.id).map((u) => (
                          <tr key={u.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{u.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{u.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingUserId === u.id ? (
                                <select
                                  value={newRole}
                                  onChange={(e) => setNewRole(e.target.value)}
                                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                                >
                                  <option value="">Select role...</option>
                                  <option value="member">Member</option>
                                  <option value="officer">Officer</option>
                                  {user.role === 'admin' && (
                                    <>
                                      <option value="president">President</option>
                                      <option value="admin">Admin</option>
                                    </>
                                  )}  
                                </select>
                              ) : (
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                                  u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                  u.role === 'president' ? 'bg-blue-100 text-blue-800' :
                                  u.role === 'officer' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {u.role}
                                </span>
                              )}
                            </td>
                            {user.role === 'admin' && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  value={u.team_id || ''}
                                  onChange={(e) => updateUserTeam(u.id, e.target.value)}
                                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                                >
                                  <option value="">No team</option>
                                  {teams.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                  ))}
                                </select>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {editingUserId === u.id ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => updateUserRole(u.id, newRole)}
                                    disabled={!newRole}
                                    className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingUserId(null);
                                      setNewRole('');
                                    }}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => {
                                      setEditingUserId(u.id);
                                      setNewRole(u.role);
                                    }}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Edit
                                  </button>
                                  {user.role === 'admin' && u.id !== user.id && (
                                    <button
                                      onClick={() => deleteUser(u.id, u.name)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teams Tab (Admin Only) - Remove this section since it's now in Users tab */}
        {activeTab === 'teams' && user.role === 'admin' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <p className="text-center text-gray-500">Team management has been moved to the "Manage Users" tab</p>
          </div>
        )}

        {/* Teams Tab (Admin Only) */}
        {activeTab === 'teams' && user.role === 'admin' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Team Management</h2>
                  <p className="text-slate-600">
                    Create and manage teams for organizing members, officers, and presidents
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowTeamForm(!showTeamForm);
                    setTeamError('');
                    setTeamSuccess('');
                  }}
                  className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {showTeamForm ? 'Cancel' : 'Create Team'}
                </button>
              </div>

              {teamSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {teamSuccess}
                </div>
              )}

              {teamError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {teamError}
                </div>
              )}

              {showTeamForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Create New Team</h3>
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Team Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newTeam.name}
                        onChange={handleTeamChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Silicon Valley Team"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        name="description"
                        value={newTeam.description}
                        onChange={handleTeamChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of this team..."
                        rows="3"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400"
                      >
                        {loading ? 'Creating...' : 'Create Team'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowTeamForm(false);
                          setNewTeam({ name: '', description: '' });
                          setTeamError('');
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {teams.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No teams created yet</p>
                  <p className="text-sm text-gray-400 mt-2">Create your first team to start organizing members</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Members
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teams.map((team) => (
                        <tr key={team.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{team.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{team.description || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {users.filter(u => u.team_id === team.id).length} members
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(team.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => deleteTeam(team.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Auth Page - Sign In Only
const AuthPage = ({ login }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      window.location.hash = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');
    setForgotPasswordMessage('');
    
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setForgotPasswordMessage('If your email is registered, you will receive a password reset link shortly.');
        setForgotPasswordEmail('');
      } else {
        // Handle both string and object error formats
        const errorMessage = typeof data.detail === 'string' 
          ? data.detail 
          : (Array.isArray(data.detail) ? data.detail[0]?.msg : 'Failed to send reset email');
        setError(errorMessage || 'Failed to send reset email');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-slate-600">Enter your email to receive a reset link</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {forgotPasswordMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                {forgotPasswordMessage}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setError('');
                  setForgotPasswordMessage('');
                }}
                className="text-blue-900 hover:text-blue-700 text-sm font-medium"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-4rem)]">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to <span className="text-yellow-500">PRISM</span></h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-900 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-600">
            <p>Don't have an account? Contact an officer to get registered.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-4 text-yellow-500">
              PRISM
            </div>
            <p className="text-sm">Promoting Research, Innovation, Science & Math</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/about" className="hover:text-white">About</a></li>
              <li><a href="#/programs" className="hover:text-white">Programs</a></li>
              <li><a href="#/application" className="hover:text-white">Application</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Schools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/schools" className="hover:text-white">Workshop Options</a></li>
              <li><a href="#/contact" className="hover:text-white">Book a Visit</a></li>
              <li><a href="#/resources" className="hover:text-white">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/news" className="hover:text-white">News</a></li>
              <li><a href="#/contact" className="hover:text-white">Contact</a></li>
              <li><a href="#/leadership" className="hover:text-white">Leadership</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 <span className="text-yellow-500">PRISM</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Reset Password Page
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get token from URL
  const getTokenFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    return params.get('token');
  };

  const token = getTokenFromUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token: token,
          new_password: newPassword 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.hash = '/auth';
        }, 3000);
      } else {
        setError(data.detail || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Invalid Reset Link</h1>
            <p className="text-slate-600 mb-6">This password reset link is invalid or has expired.</p>
            <a
              href="#/auth"
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors"
            >
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Password Reset Successful!</h1>
            <p className="text-slate-600 mb-6">You can now sign in with your new password.</p>
            <p className="text-sm text-slate-500">Redirecting to sign in...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4 min-h-[calc(100vh-4rem)]">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Set New Password</h1>
            <p className="text-slate-600">Enter your new password below</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const { user, login, logout } = useAuth();

  return (
    <Router>
      {({ currentPath }) => (
        <div className="min-h-screen flex flex-col">
          <Navigation currentPath={currentPath} user={user} logout={logout} />
          <div className="flex-grow">
            {currentPath === '/' && <HomePage />}
            {currentPath === '/about' && <AboutPage />}
            {currentPath === '/programs' && <ProgramsPage />}
            {currentPath === '/application' && <ApplicationPage />}
            {currentPath === '/schools' && <SchoolsPage />}
            {currentPath === '/resources' && <ResourcesPage />}
            {currentPath === '/leadership' && <LeadershipPage />}
            {currentPath === '/news' && <NewsPage />}
            {currentPath === '/contact' && <ContactPage />}
            {currentPath === '/auth' && !user && <AuthPage login={login} />}
            {currentPath === '/reset-password' && <ResetPasswordPage />}
            {currentPath === '/dashboard' && user && <DashboardPage user={user} logout={logout} />}
            {currentPath === '/auth' && user && (window.location.hash = '/dashboard', null)}
            {currentPath === '/dashboard' && !user && (window.location.hash = '/auth', null)}
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
}

// Router simulation
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.slice(1) || '/';
    return hash.split('?')[0]; // Strip query parameters from path
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentPath(hash.split('?')[0]); // Strip query parameters from path
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return children({ currentPath, navigate: (path) => window.location.hash = path });
};

// Auth Context (Simple in-memory auth)
const useAuth = () => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('prism_user');
    const token = sessionStorage.getItem('prism_token');
    return saved && token ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Store token
      sessionStorage.setItem('prism_token', data.access_token);
      
      // Fetch user info
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        sessionStorage.setItem('prism_user', JSON.stringify(userData));
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('prism_user');
    sessionStorage.removeItem('prism_token');
    window.location.hash = '/auth';
  };

  return { user, login, logout };
};

// Navigation Component
const Navigation = ({ currentPath, user, logout }) => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/application', label: 'Application' },
    { path: '/schools', label: 'Schools' },
    { path: '/resources', label: 'Resources' },
    { path: '/leadership', label: 'Leadership' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#/" className="flex items-center space-x-2">
            <img 
              src={require('./logo.png')} 
              alt="PRISM Logo" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <div className="text-lg font-bold tracking-tight leading-tight text-yellow-500">
                PRISM
              </div>
              <div className="text-[9px] text-blue-900 leading-tight">Research • Innovation • Science • Math</div>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-1 mr-8">
            {navItems.map(item => (
              <a
                key={item.path}
                href={`#${item.path}`}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPath === item.path
                    ? 'text-white bg-blue-900 rounded-md'
                    : 'text-blue-900 hover:text-blue-800'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#/application"
              className="px-3 py-2 bg-yellow-400 text-blue-900 rounded-md text-sm font-semibold hover:bg-yellow-500 transition-colors"
            >
              Apply Now
            </a>
            {user ? (
              <div className="flex items-center space-x-2">
                <a
                  href="#/dashboard"
                  className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-semibold hover:bg-blue-800 transition-colors"
                >
                  Dashboard
                </a>
                <span className="text-sm text-blue-800">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm text-blue-900 hover:text-blue-800 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="#/auth"
                className="px-4 py-2 text-sm text-blue-900 hover:text-blue-800 font-semibold"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Home Page
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-blue-900">Inspiring</span>
                <br />
                <span className="text-blue-900">Young Minds in</span>
                <br />
                <span className="bg-gradient-to-br from-red-500 to-red-600 bg-clip-text text-transparent">S</span>
                <span className="bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent">T</span>
                <span className="bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent">E</span>
                <span className="bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">M</span>
              </h1>
              <p className="text-xl text-blue-900 font-semibold mb-4">
                Promoting Research, Innovation, Science & Math
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Empowering elementary students to discover the wonders of STEM through hands-on workshops,
                engaging presentations, and mentorship from passionate high school leaders.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#/application" className="px-6 py-3 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition-colors inline-flex items-center">
                  Apply Now →
                </a>
                <a href="#/schools" className="px-6 py-3 bg-white border-2 border-gray-300 text-blue-800 rounded-md font-medium hover:border-gray-400 transition-colors">
                  Book a Workshop
                </a>
                <a href="#/contact" className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-md font-medium hover:bg-yellow-500 transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                  <img 
                    src="/prism-workshop.png" 
                    alt="PRISM students learning STEM through hands-on activities" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className="text-xs text-slate-600">Locations</div>
                      <div className="text-sm font-semibold">Serving parts of LA and San Diego</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-blue-900" />
                    <div>
                      <div className="text-xs text-slate-600">Student-Led</div>
                      <div className="text-sm font-semibold">High school and college mentors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-blue-900">
            Our Mission
          </h2>
          <p className="text-center text-slate-600 max-w-4xl mx-auto text-lg leading-relaxed">
            <span className="text-yellow-500">PRISM</span> is dedicated to inspiring elementary students to explore STEM careers through engaging
            workshops and presentations led by passionate high school and college mentors. We believe every child deserves
            the opportunity to discover the wonder and possibility within science, technology, engineering, and
            mathematics.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose <span className="text-yellow-500">PRISM</span>?</h2>
          <p className="text-center text-slate-600 mb-12">What makes our approach to STEM education unique</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">Student-Led Approach</h3>
              <p className="text-slate-600 leading-relaxed">
                High school and college students serve as relatable mentors, making STEM feel accessible and exciting for
                younger learners through peer-to-peer connections.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">Hands-On Learning</h3>
              <p className="text-slate-600 leading-relaxed">
                Interactive workshops and experiments that bring STEM concepts to life, encouraging curiosity
                and critical thinking through engaging activities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">Proven Impact</h3>
              <p className="text-slate-600 leading-relaxed">
                Evidence-based programs with measurable results, helping students develop confidence in STEM
                subjects and consider future career possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're a school looking to inspire your students, a high school student wanting to make a
              difference, or a parent interested in STEM education, we're here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#/programs" className="px-6 py-3 bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                View Our Programs →
              </a>
              <a href="#/application" className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-blue-900 transition-colors">
                Apply to Join
              </a>
              <a href="#/contact" className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-md font-medium hover:bg-yellow-500 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-6">
            <span className="text-blue-900">About </span>
            <span className="text-yellow-500">PRISM</span>
          </h1>
          <p className="text-xl text-center text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We're a passionate community of high school and college students dedicated to igniting curiosity and
            fostering a love for STEM in the next generation of innovators.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="w-10 h-10 border-4 border-blue-900 rounded-full"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed">
                To inspire and educate elementary students about STEM careers through engaging, hands-on
                workshops and presentations led by passionate high school and college mentors, fostering early interest in
                science, technology, engineering, and mathematics.
              </p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-3xl">💡</div>
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                A future where every child has the opportunity to explore STEM fields, discover their
                potential, and pursue careers that will shape tomorrow's world. We envision communities where
                learning is exciting and accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-red-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h2 className="text-3xl font-bold text-blue-900">Our Story</h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                <span className="text-yellow-500">PRISM</span> began with a simple observation: many elementary students have never been exposed to the
                incredible possibilities that STEM careers offer. Our founding members, a group of passionate
                high school and college students, recognized the need to bridge this gap early in a child's educational
                journey.
              </p>
              <p>
                What started as a small initiative has grown into a comprehensive program that brings the
                excitement of scientific discovery directly to young learners. We believe that when children see
                STEM through the eyes of relatable mentors—high school and college students who remember what it's like to
                be their age—the impact is profound.
              </p>
              <p>
                Our student-led approach ensures authenticity and relatability. We're not just teachers; we're
                older peers who share our genuine passion for discovery, innovation, and learning. This
                peer-to-peer connection helps break down barriers and makes STEM feel accessible and exciting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 rounded-2xl p-10 mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-10 h-10 text-yellow-600" />
              <h2 className="text-3xl font-bold text-blue-900">Why STEM Education Matters Early</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Critical Window</h3>
              <p className="text-slate-600 leading-relaxed">
                Research shows that children's interest in STEM subjects is largely formed by middle school. By
                introducing STEM concepts early, we help students develop confidence and curiosity before
                stereotypes and misconceptions take hold.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Future Opportunities</h3>
              <p className="text-slate-600 leading-relaxed">
                STEM careers are among the fastest-growing fields, offering excellent opportunities for
                innovation, problem-solving, and making a positive impact on the world. Early exposure helps
                students see these paths as achievable.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Building Confidence</h3>
              <p className="text-slate-600 leading-relaxed">
                Hands-on STEM activities build critical thinking, creativity, and problem-solving skills. When
                children succeed in these activities, they develop confidence that serves them across all
                subjects.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-yellow-300 transition-all">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Inclusive Learning</h3>
              <p className="text-slate-600 leading-relaxed">
                By reaching students early, we can help ensure that STEM fields become more diverse and
                inclusive, welcoming students from all backgrounds and perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Programs Page
const ProgramsPage = () => {
  const programs = [
    { icon: '🚀', title: 'Space Exploration Adventures', description: 'Journey through the solar system, build model rockets, and learn about space missions.', color: 'blue' },
    { icon: '💻', title: 'Coding for Kids', description: 'Introduction to programming concepts through fun games and visual coding platforms.', color: 'yellow' },
    { icon: '🔧', title: 'Engineering Challenges', description: 'Hands-on building activities that teach engineering principles through play.', color: 'red' },
    { icon: '🧪', title: 'Amazing Science Experiments', description: 'Interactive experiments that bring chemistry and physics concepts to life.', color: 'yellow' },
    { icon: '🧮', title: 'Math Magic', description: 'Making mathematics fun through puzzles, games, and real-world applications.', color: 'blue' },
    { icon: '🩺', title: 'Medical Science Exploration', description: 'Discover the human body and medical technology through interactive activities.', color: 'yellow' }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 hover:border-blue-200',
    yellow: 'bg-yellow-50 border-yellow-100 hover:border-yellow-200',
    red: 'bg-red-50 border-red-100 hover:border-red-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Our Programs
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Engaging, hands-on workshops designed to spark curiosity and inspire the next generation of STEM leaders.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div key={index} className={`${colorClasses[program.color]} rounded-xl p-8 border-2 transition-all hover:shadow-md`}>
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{program.title}</h3>
                <p className="text-slate-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">College Student Mentorship</h2>
            <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
              Our high school presenters are supported by college students studying STEM fields in various universities such as UCLA and UCSD, providing
              additional expertise and real-world insights into STEM careers.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">What Mentors Provide:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Advanced STEM knowledge and expertise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">College and career guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Real-world application examples</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Support for high school presenters</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Student Benefits:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Leadership development opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Volunteer hours for college applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Public speaking and presentation skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-600">Community service experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 rounded-2xl p-10 text-center border-2 border-yellow-200">
            <h2 className="text-3xl font-bold mb-4">Ready to Bring <span className="text-yellow-500">PRISM</span> to Your School?</h2>
            <p className="text-slate-600 mb-8">Contact us to schedule a workshop or learn more about our programs.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#/schools" className="px-6 py-3 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition-colors inline-flex items-center">
                Request a Workshop →
              </a>
              <a href="#/contact" className="px-6 py-3 bg-white border-2 border-gray-300 text-blue-800 rounded-md font-medium hover:border-gray-400 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Application Page with Working Form
const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    schoolType: '',
    school: '',
    grade: '',
    weightedGPA: '',
    unweightedGPA: '',
    stemClasses: '',
    programInterests: '',
    whyJoin: '',
    experience: '',
    availability: '',
    interestedInOfficer: false,
    interestedInSoftwareDev: false,
    understandsCommitment: false,
    agreeToContact: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.school.trim()) newErrors.school = 'School/University is required';
    if (!formData.schoolType) newErrors.schoolType = 'Please select if you are in high school or college';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.understandsCommitment) newErrors.understandsCommitment = 'You must acknowledge the commitment required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/email/application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          schoolType: '',
          school: '',
          grade: '',
          weightedGPA: '',
          unweightedGPA: '',
          stemClasses: '',
          programInterests: '',
          whyJoin: '',
          experience: '',
          availability: '',
          interestedInOfficer: false,
          interestedInSoftwareDev: false,
          understandsCommitment: false,
          agreeToContact: false
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Application Submitted!</h2>
          <p className="text-slate-600">Thank you for applying to join <span className="text-yellow-500">PRISM</span>. We'll review your application and get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-blue-900">Join the </span>
            <span className="text-yellow-500">PRISM</span>
            <span className="text-blue-900"> Team</span>
          </h1>
          <p className="text-xl text-slate-600">
            Become a high school or college mentor and help inspire the next generation of STEM leaders
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '👥', title: 'Leadership Experience', desc: 'Develop leadership skills by mentoring elementary students' },
            { icon: '⏰', title: 'Volunteer Hours', desc: 'Earn meaningful community service hours' },
            { icon: '🎓', title: 'College Prep', desc: 'Strengthen college applications with real leadership experience' },
            { icon: '🏆', title: 'Recognition', desc: 'Official recognition and certificates' }
          ].map((benefit, i) => (
            <div key={i} className="bg-white rounded-lg p-6 text-center border border-gray-200">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="font-semibold text-blue-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Requirements</h2>
          <p className="text-slate-600 mb-6">What we're looking for in <span className="text-yellow-500">PRISM</span> mentors</p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <Check className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">High School or College Student</h3>
                <p className="text-slate-600 text-sm">Currently enrolled in high school (grades 9-12) or college</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">STEM Interest</h3>
                <p className="text-slate-600 text-sm">Passion for science, technology, engineering, or math</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">Communication Skills</h3>
                <p className="text-slate-600 text-sm">Comfortable presenting to young students</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">Commitment</h3>
                <p className="text-slate-600 text-sm">Available to participate in workshops regularly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Application Form</h2>
          <p className="text-slate-600 mb-8">Tell us about yourself and why you want to join <span className="text-yellow-500">PRISM</span></p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                I am currently a <span className="text-red-500">*</span>
              </label>
              <select
                name="schoolType"
                value={formData.schoolType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select one</option>
                <option value="highschool">High School Student</option>
                <option value="college">College Student</option>
              </select>
              {errors.schoolType && <p className="text-red-500 text-sm mt-1">{errors.schoolType}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  {formData.schoolType === 'college' ? 'University Name' : 'High School Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={formData.schoolType === 'college' ? 'Enter your university name' : 'Enter your high school name'}
                />
                {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  {formData.schoolType === 'college' ? 'Year' : 'Grade'} <span className="text-red-500">*</span>
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your {formData.schoolType === 'college' ? 'year' : 'grade'}</option>
                  {formData.schoolType === 'college' ? (
                    <>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate Student</option>
                    </>
                  ) : (
                    <>
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                    </>
                  )}
                </select>
                {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Weighted GPA</label>
                <input
                  type="text"
                  name="weightedGPA"
                  value={formData.weightedGPA}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4.2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Unweighted GPA</label>
                <input
                  type="text"
                  name="unweightedGPA"
                  value={formData.unweightedGPA}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 3.8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Current STEM Classes</label>
              <textarea
                name="stemClasses"
                value={formData.stemClasses}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List the STEM classes you're currently taking (e.g., AP Chemistry, Calculus, Computer Science, Physics, etc.)"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Program Interests</label>
              <textarea
                name="programInterests"
                value={formData.programInterests}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Which programs interest you most? (Space Exploration, Coding for Kids, Engineering Challenges, Science Experiments, Math Magic, Medical Science)"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Why do you want to join <span className="text-yellow-500">PRISM</span>?</label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your passion for STEM and why you want to inspire elementary students..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Relevant Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share any teaching, tutoring, mentoring, or leadership experience you have..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Availability</label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="When are you typically available for workshops? (after school, weekends, etc.)"
              ></textarea>
            </div>

            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="interestedInOfficer"
                  checked={formData.interestedInOfficer}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I'm also interested in applying for an officer position<br />
                  <span className="text-xs text-gray-500">Officer positions involve additional leadership responsibilities and commitment</span>
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="interestedInSoftwareDev"
                  checked={formData.interestedInSoftwareDev}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I'm interested in applying for a software development role<br />
                  <span className="text-xs text-gray-500">Help develop and maintain the PRISM website and digital tools</span>
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="understandsCommitment"
                  checked={formData.understandsCommitment}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I understand the commitment required and am excited to be a <span className="text-yellow-500">PRISM</span> mentor *
                </span>
              </label>
              {errors.understandsCommitment && (
                <p className="text-red-500 text-sm ml-6">{errors.understandsCommitment}</p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToContact"
                  checked={formData.agreeToContact}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I agree to be contacted regarding my application
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white px-6 py-4 rounded-md font-medium hover:bg-blue-800 transition-colors text-lg"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
