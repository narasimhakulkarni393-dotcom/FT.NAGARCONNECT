import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { CityScene } from '../components/3d/CityScene';
import { ArrowRight, MapPin, CheckCircle, TrendingUp } from 'lucide-react';

export const Landing: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Report it. Track it. Improve your city.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            NagaraConnect empowers citizens to report civic issues and track progress in real-time.
          </p>
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <CityScene />
        </motion.div>
      </div>
    </div>

    {/* How It Works */}
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: 'Report', description: 'Submit civic issues with location and photos' },
            { icon: CheckCircle, title: 'Submit', description: 'Track your report in real-time' },
            { icon: TrendingUp, title: 'Impact', description: 'See your city improve' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-blue-100 rounded-full">
                  <item.icon size={32} className="text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-blue-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Make a Difference Today</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of citizens improving their cities through real reporting.
        </p>
        <Link to="/register">
          <Button variant="secondary" size="lg" className="inline-flex items-center gap-2">
            Report an Issue <ArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
