import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useTrackingLogger = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const logTracking = async (parcelId, status, description = '') => {
    try {
      await axiosSecure.post('/trackings', {
        parcelId,
        status,
        description,
        timestamp: new Date().toISOString(),
        actor: user?.email || 'system'
      });
    } catch (error) {
      console.error('❌ Failed to log tracking:', error);
    }
  };

  return logTracking;
};

export default useTrackingLogger;
