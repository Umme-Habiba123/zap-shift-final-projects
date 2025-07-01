import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const TrackParcel = () => {
  const { parcelId } = useParams();
  const [searchId, setSearchId] = useState(parcelId || '');
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // ✅ fetchTracking function
  const fetchTracking = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/trackings?parcelId=${id}`);
      setTrackingData(res.data);
    } catch (error) {
      console.error("Failed to fetch tracking data:", error);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  // ✅ Optional testing: Add dummy tracking update
  const handleAddTracking = async () => {
    try {
      const response = await axiosSecure.post('/tracking', {
        parcelId: '685d115c265a285dc1b849d2',
        status: 'Picked up from sender',
        location: 'Dhaka Hub',
        updatedBy: 'Admin'
      });
      console.log('Tracking added:', response.data);
    } catch (error) {
      console.error('Error adding tracking:', error);
    }
  };

  // Fetch when URL param is available
  useEffect(() => {
    if (parcelId) {
      fetchTracking(parcelId);
    }
  }, [parcelId, fetchTracking]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      fetchTracking(searchId.trim());
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Track Your Parcel</h2>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2 items-center justify-center">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Parcel ID"
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn bg-[#CAEB66] hover:bg-[#b0d95c] border-none text-black font-semibold text-lg">
          Track
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading tracking updates...</p>
      ) : trackingData.length > 0 ? (
        <div className="space-y-4">
          {trackingData.map((track, index) => (
            <div key={track._id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
              <p className="font-semibold text-lg">#{index + 1} – {track.status}</p>
              <p><span className="font-medium">Location:</span> {track.location}</p>
              <p><span className="font-medium">Updated:</span> {formatDate(track.updatedAt)}</p>
              <p><span className="font-medium">Updated By:</span> {track.updatedBy}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tracking updates available for this ID.</p>
      )}

      {/* Optional Button to Test Adding Tracking */}
      <div className="text-center mt-6">
        <button onClick={handleAddTracking} className="btn btn-outline btn-info">
          Add Dummy Tracking
        </button>
      </div>
    </div>
  );
};

export default TrackParcel;
