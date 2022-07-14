/*import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.tokenDeAcceso);
            return { ...prev, tokenDeAcceso: response.data.tokenDeAcceso }
        });
        return response.data.tokenDeAcceso;
    }
    return refresh;
};

export default useRefreshToken;
*/
