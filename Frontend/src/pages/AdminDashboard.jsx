import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, Plus } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAstrologers: 0,
    totalConsultations: 0,
    activeConsultations: 0
  });
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }
      
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      try {
        // In a real app, verify the admin token
        await axios.get('http://localhost:8000/api/admin/verify/');
        fetchDashboardData();
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const fetchDashboardData = async () => {
    try {
      // In a real app, this would be an actual API call
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 156,
        totalAstrologers: 12,
        totalConsultations: 438,
        activeConsultations: 8
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightOrange"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-darkBlue">
      {/* Admin Header */}
      <header className="bg-darkBlue-light border-b border-darkBlue-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">FutureTalk Admin</h1>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-400">Manage your FutureTalk platform</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Total Users</h3>
              <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-lightOrange" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-sm text-gray-400 mt-1">Registered accounts</p>
          </div>
          
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Astrologers</h3>
              <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-lightOrange" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.totalAstrologers}</p>
            <p className="text-sm text-gray-400 mt-1">Active astrologers</p>
          </div>
          
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Total Consultations</h3>
              <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-lightOrange" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.totalConsultations}</p>
            <p className="text-sm text-gray-400 mt-1">All time</p>
          </div>
          
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Active Sessions</h3>
              <div className="w-10 h-10 bg-lightOrange/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-lightOrange" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.activeConsultations}</p>
            <p className="text-sm text-gray-400 mt-1">Currently active</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => navigate('/admin/astrologers')}
            className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 hover:bg-darkBlue-lighter transition-colors text-left"
          >
            <h3 className="text-lg font-medium mb-2">Manage Astrologers</h3>
            <p className="text-sm text-gray-400">Add, edit, or remove astrologers</p>
          </button>
          
          <button 
            onClick={() => navigate('/admin/users')}
            className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 hover:bg-darkBlue-lighter transition-colors text-left"
          >
            <h3 className="text-lg font-medium mb-2">Manage Users</h3>
            <p className="text-sm text-gray-400">View and manage user accounts</p>
          </button>
          
          <button 
            onClick={() => navigate('/admin/consultations')}
            className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 hover:bg-darkBlue-lighter transition-colors text-left"
          >
            <h3 className="text-lg font-medium mb-2">View Consultations</h3>
            <p className="text-sm text-gray-400">Monitor ongoing and past consultations</p>
          </button>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-darkBlue rounded-lg border border-darkBlue-lighter">
              <p className="text-sm">New user registered: <span className="text-lightOrange">john_doe</span></p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
            
            <div className="p-4 bg-darkBlue rounded-lg border border-darkBlue-lighter">
              <p className="text-sm">Consultation completed: <span className="text-lightOrange">Tarot Reading with Maya Stargazer</span></p>
              <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
            </div>
            
            <div className="p-4 bg-darkBlue rounded-lg border border-darkBlue-lighter">
              <p className="text-sm">New consultation booked: <span className="text-lightOrange">Birth Chart Analysis</span></p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
