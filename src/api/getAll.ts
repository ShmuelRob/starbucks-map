import axios from 'axios';
import Branch from '../models/branch.model';

const url = import.meta.env.VITE_API_URL;

async function getAll(): Promise<Branch[]> {
    try {
        const response = await axios.get(url);
        return response.data as Branch[];
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}

export default getAll;