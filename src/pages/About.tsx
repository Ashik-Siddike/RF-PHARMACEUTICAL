import { Target, Eye, Heart, Shield, Users, Award, Building, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About RF PHARMACEUTICAL</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            A trusted name in pharmaceutical excellence, dedicated to improving lives through quality healthcare solutions.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to make quality healthcare accessible to all, RF PHARMACEUTICAL LTD. has grown to become a leading pharmaceutical company with over 25 years of experience in manufacturing and distributing life-saving medications.
                </p>
                <p>
                  Our journey began with a simple mission: to provide high-quality, affordable pharmaceutical products that meet international standards. Today, we serve millions of patients across multiple countries, maintaining our commitment to excellence in every tablet, capsule, and injection we produce.
                </p>
                <p>
                  With state-of-the-art manufacturing facilities, a dedicated team of healthcare professionals, and an unwavering commitment to research and development, we continue to push the boundaries of pharmaceutical innovation.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '25+', label: 'Years Experience' },
                { number: '100+', label: 'Products' },
                { number: '5M+', label: 'Patients Served' },
                { number: '15+', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Committed to Care: Our mission is to provide high-quality, accessible, and life-saving pharmaceutical products to improve the health and well-being of the community. We strive to deliver excellence in healthcare through continuous innovation, ethical practices, and a patient-first approach.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a globally recognized pharmaceutical company, known for our commitment to quality, innovation, and patient care. We envision a world where everyone has access to safe, effective, and affordable medications that improve quality of life and promote wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do at RF PHARMACEUTICAL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Patient Care',
                desc: 'Putting patients first in every decision we make',
              },
              {
                icon: Shield,
                title: 'Quality & Safety',
                desc: 'Uncompromising standards in manufacturing and testing',
              },
              {
                icon: Award,
                title: 'Excellence',
                desc: 'Continuous improvement in all aspects of our work',
              },
              {
                icon: Users,
                title: 'Integrity',
                desc: 'Ethical practices and transparent operations',
              },
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Corporate Governance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings decades of pharmaceutical and healthcare expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: 'Manufacturing Excellence',
                desc: 'WHO-GMP certified facilities with cutting-edge technology',
              },
              {
                icon: Globe,
                title: 'Global Standards',
                desc: 'Compliance with international pharmaceutical regulations',
              },
              {
                icon: Award,
                title: 'Quality Certifications',
                desc: 'ISO certified and regularly audited for quality assurance',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl mb-6">
                  <item.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-teal-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment</h2>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed">
            At RF PHARMACEUTICAL LTD., we are more than just a pharmaceutical company. We are partners in health, committed to making a positive impact on the lives of millions through quality healthcare solutions, ethical business practices, and continuous innovation.
          </p>
        </div>
      </section>
    </div>
  );
}
