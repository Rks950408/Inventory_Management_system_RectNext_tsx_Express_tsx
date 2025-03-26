import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Sliders } from 'lucide-react';
import AstrologerCard from '../components/AstrologerCard';
import axios from 'axios';

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [filteredAstrologers, setFilteredAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialties: [],
    priceRange: [0, 100],
    rating: 0
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAstrologers();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, astrologers]);
  
  const fetchAstrologers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      // In a real app, this would be an actual API call
      // For now, we'll use the mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await axios.get('http://localhost:8000/api/consultations/astrologers/');
      setAstrologers(response.data);
      setFilteredAstrologers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching astrologers:', error);
      // If we're using mock data, still populate with some data
      const mockAstrologers = [
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
      ];
      
      setAstrologers(mockAstrologers);
      setFilteredAstrologers(mockAstrologers);
      setLoading(false);
    }
  };
  
  const applyFilters = () => {
    let result = [...astrologers];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        astrologer => 
          astrologer.name.toLowerCase().includes(term) || 
          astrologer.bio.toLowerCase().includes(term) ||
          astrologer.specialties.some(specialty => 
            specialty.toLowerCase().includes(term)
          )
      );
    }
    
    // Apply specialty filter
    if (filters.specialties.length > 0) {
      result = result.filter(astrologer => 
        filters.specialties.some(specialty => 
          astrologer.specialties.includes(specialty)
        )
      );
    }
    
    // Apply price range filter
    result = result.filter(astrologer => 
      astrologer.price_per_minute >= filters.priceRange[0] && 
      astrologer.price_per_minute <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(astrologer => 
        astrologer.rating >= filters.rating
      );
    }
    
    setFilteredAstrologers(result);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSpecialtyChange = (specialty) => {
    setFilters(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
      
      return { ...prev, specialties };
    });
  };
  
  const handlePriceRangeChange = (index, value) => {
    setFilters(prev => {
      const priceRange = [...prev.priceRange];
      priceRange[index] = value;
      return { ...prev, priceRange };
    });
  };
  
  const handleRatingChange = (rating) => {
    setFilters(prev => ({ ...prev, rating }));
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      specialties: [],
      priceRange: [0, 100],
      rating: 0
    });
  };
  
  // Get all unique specialties from astrologers
  const allSpecialties = [...new Set(astrologers.flatMap(a => a.specialties))];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find Your Astrologer</h1>
        <p className="text-gray-400 mt-2">Connect with expert astrologers for personalized readings</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search by name, specialty, or keywords..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center justify-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 bg-darkBlue-light p-6 rounded-xl border border-darkBlue-lighter">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-lightOrange hover:text-lightOrange/80 text-sm"
              >
                Reset All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Specialties */}
              <div>
                <h4 className="font-medium mb-3">Specialties</h4>
                <div className="space-y-2">
                  {allSpecialties.map((specialty, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 bg-darkBlue-lighter border-darkBlue-lighter rounded focus:ring-lightOrange"
                        checked={filters.specialties.includes(specialty)}
                        onChange={() => handleSpecialtyChange(specialty)}
                      />
                      <span className="ml-2 text-sm">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range (per minute)</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.5"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.5"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating <= filters.rating
                            ? 'text-lightOrange fill-lightOrange'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  ))}
                  {filters.rating > 0 && (
                    <button
                      onClick={() => handleRatingChange(0)}
                      className="ml-2 text-xs text-gray-400 hover:text-lightOrange"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Astrologers List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightOrange"></div>
        </div>
      ) : filteredAstrologers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAstrologers.map((astrologer) => (
            <AstrologerCard key={astrologer.id} astrologer={astrologer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Sliders className="h-12 w-12 text-lightOrange mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No astrologers found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters or search term</p>
          <button onClick={resetFilters} className="btn-primary">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Astrologers;