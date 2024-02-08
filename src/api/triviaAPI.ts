import axios, { AxiosError } from 'axios';

export const fetchQuestion = async (): Promise<any> => {
    let retries = 3;
    let delay = 1000;

    const exponentialBackoff = async (retriesLeft: number, delay: number): Promise<any> => {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
            return response.data.results;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 429 && retriesLeft > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return exponentialBackoff(retriesLeft - 1, delay * 2);
            } else if (retriesLeft === 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return exponentialBackoff(retriesLeft - 1, delay * 2);
            } 
        }
    };

    return exponentialBackoff(retries, delay);
};
