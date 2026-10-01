import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CityScene } from '../components/3d/CityScene';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user?.displayName}
          </h1>
          <p className="text-xl text-gray-600">
            You're part of a community making cities better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CityScene />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Report a Civic Issue</h2>
              <p className="text-gray-600 mb-4">
                Found a pothole, garbage, broken streetlight, or other civic problem? Report it now with your location and photos.
              </p>
              <Link to="/report">
                <Button size="lg">Report an Issue</Button>
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Track Your Reports</h3>
              <p className="text-gray-600 text-sm mb-4">
                Monitor the status of your submitted complaints in real-time.
              </p>
              <Link to="/my-complaints">
                <Button variant="outline">View My Complaints</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
