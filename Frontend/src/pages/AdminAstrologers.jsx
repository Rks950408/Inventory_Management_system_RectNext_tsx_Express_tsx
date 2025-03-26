import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowLeft, Star, DollarSign, X } from 'lucide-react';
import axios from 'axios';

const AdminAstrologers = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAstrologer, setCurrentAstrologer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialties: '',
    price_per_minute: '',
    avatar: null,
    is_available: true
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }
      
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      fetchAstrologers();
    };
    
    checkAuth();
  }, [navigate]);
  
  const fetchAstrologers = async () => {
    try {
      // In a real app, this would be an actual API call
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAstrologers([
        {
          id: 1,
          name: 'Maya Stargazer',
          bio: 'Expert in tarot reading with 10 years of experience.',
          specialties: ['Tarot', 'Palmistry', 'Numerology'],
          rating: 4.8,
          price_per_minute: 2.5,
          avatar: null,
          is_available: true
        },
        {
          id: 2,
          name: 'Raj Cosmos',
          bio: 'Specializes in birth chart analysis and compatibility.',
          specialties: ['Birth Chart', 'Compatibility', 'Horoscope'],
          rating: 4.6,
          price_per_minute: 3.0,
          avatar: null,
          is_available: true
        },
        {
          id: 3,
          name: 'Luna Moonchild',
          bio: 'Intuitive reader focusing on spiritual guidance.',
          specialties: ['Spiritual Guidance', 'Meditation', 'Energy Reading'],
          rating: 4.9,
          price_per_minute: 3.5,
          avatar: null,
          is_available: true
        }
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching astrologers:', error);
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleAddAstrologer = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, this would be an actual API call
      // Mock implementation for demonstration
      const newAstrologer = {
        id: astrologers.length + 1,
        name: formData.name,
        bio: formData.bio,
        specialties: formData.specialties.split(',').map(s => s.trim()),
        rating: 5.0,
        price_per_minute: parseFloat(formData.price_per_minute),
        avatar: null,
        is_available: formData.is_available
      };
      
      setAstrologers([...astrologers, newAstrologer]);
      setShowAddModal(false);
      resetForm();
      
      // Show success message
      alert('Astrologer added successfully!');
    } catch (error) {
      console.error('Error adding astrologer:', error);
      alert('Failed to add astrologer. Please try again.');
    }
  };
  
  const handleEditAstrologer = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, this would be an actual API call
      // Mock implementation for demonstration
      const updatedAstrologers = astrologers.map(astrologer => {
        if (astrologer.id === currentAstrologer.id) {
          return {
            ...astrologer,
            name: formData.name,
            bio: formData.bio,
            specialties: formData.specialties.split(',').map(s => s.trim()),
            price_per_minute: parseFloat(formData.price_per_minute),
            is_available: formData.is_available
          };
        }
        return astrologer;
      });
      
      setAstrologers(updatedAstrologers);
      setShowEditModal(false);
      resetForm();
      
      // Show success message
      alert('Astrologer updated successfully!');
    } catch (error) {
      console.error('Error updating astrologer:', error);
      alert('Failed to update astrologer. Please try again.');
    }
  };
  
  const handleDeleteAstrologer = async () => {
    try {
      // In a real app, this would be an actual API call
      // Mock implementation for demonstration
      const updatedAstrologers = astrologers.filter(
        astrologer => astrologer.id !== currentAstrologer.id
      );
      
      setAstrologers(updatedAstrologers);
      setShowDeleteModal(false);
      setCurrentAstrologer(null);
      
      // Show success message
      alert('Astrologer deleted successfully!');
    } catch (error) {
      console.error('Error deleting astrologer:', error);
      alert('Failed to delete astrologer. Please try again.');
    }
  };
  
  const openEditModal = (astrologer) => {
    setCurrentAstrologer(astrologer);
    setFormData({
      name: astrologer.name,
      bio: astrologer.bio,
      specialties: astrologer.specialties.join(', '),
      price_per_minute: astrologer.price_per_minute.toString(),
      avatar: null,
      is_available: astrologer.is_available
    });
    setShowEditModal(true);
  };
  
  const openDeleteModal = (astrologer) => {
    setCurrentAstrologer(astrologer);
    setShowDeleteModal(true);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      specialties: '',
      price_per_minute: '',
      avatar: null,
      is_available: true
    });
    setCurrentAstrologer(null);
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
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Dashboard</span>
            </button>
            
            <h2 className="text-2xl font-bold">Manage Astrologers</h2>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Astrologer</span>
          </button>
        </div>
        
        {/* Astrologers List */}
        <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-darkBlue-lighter">
              <thead className="bg-darkBlue">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-darkBlue-lighter">
                {astrologers.map((astrologer) => (
                  <tr key={astrologer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-lightOrange/20 flex items-center justify-center">
                          <span className="text-lightOrange font-bold">
                            {astrologer.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{astrologer.name}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">{astrologer.bio}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {astrologer.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-darkBlue text-gray-300"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-lightOrange mr-1" />
                        <span>{astrologer.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-lightOrange mr-1" />
                        <span>{astrologer.price_per_minute.toFixed(2)}/min</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        astrologer.is_available 
                          ? 'bg-green-900/20 text-green-400' 
                          : 'bg-red-900/20 text-red-400'
                      }`}>
                        {astrologer.is_available ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(astrologer)}
                        className="text-lightOrange hover:text-lightOrange/80 mr-3"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(astrologer)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add Astrologer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add New Astrologer</h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddAstrologer}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="input"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="specialties" className="block text-sm font-medium mb-1">
                    Specialties (comma separated)
                  </label>
                  <input
                    type="text"
                    id="specialties"
                    name="specialties"
                    value={formData.specialties}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="Tarot, Palmistry, Horoscope"
                  />
                </div>
                
                <div>
                  <label htmlFor="price_per_minute" className="block text-sm font-medium mb-1">
                    Price per Minute ($)
                  </label>
                  <input
                    type="number"
                    id="price_per_minute"
                    name="price_per_minute"
                    value={formData.price_per_minute}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="avatar" className="block text-sm font-medium mb-1">
                    Avatar (optional)
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="input"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_available"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleInputChange}
                    className="h-4 w-4 bg-darkBlue-lighter border-darkBlue-lighter rounded focus:ring-lightOrange"
                  />
                  <label htmlFor="is_available" className="ml-2 block text-sm">
                    Available for consultations
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Astrologer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Astrologer Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edit Astrologer</h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditAstrologer}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-bio" className="block text-sm font-medium mb-1">
                    Bio
                  </label>
                  <textarea
                    id="edit-bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="input"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="edit-specialties" className="block text-sm font-medium mb-1">
                    Specialties (comma separated)
                  </label>
                  <input
                    type="text"
                    id="edit-specialties"
                    name="specialties"
                    value={formData.specialties}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-price_per_minute" className="block text-sm font-medium mb-1">
                    Price per Minute ($)
                  </label>
                  <input
                    type="number"
                    id="edit-price_per_minute"
                    name="price_per_minute"
                    value={formData.price_per_minute}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-avatar" className="block text-sm font-medium mb-1">
                    Avatar (optional)
                  </label>
                  <input
                    type="file"
                    id="edit-avatar"
                    name="avatar"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="input"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edit-is_available"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleInputChange}
                    className="h-4 w-4 bg-darkBlue-lighter border-darkBlue-lighter rounded focus:ring-lightOrange"
                  />
                  <label htmlFor="edit-is_available" className="ml-2 block text-sm">
                    Available for consultations
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-darkBlue-light rounded-xl border border-darkBlue-lighter p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Delete Astrologer</h3>
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  setCurrentAstrologer(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="mb-6">
              Are you sure you want to delete <span className="font-semibold text-lightOrange">{currentAstrologer?.name}</span>? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCurrentAstrologer(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAstrologer}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAstrologers;
