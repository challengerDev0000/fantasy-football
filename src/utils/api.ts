import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export async function getOperators() {
    try {
        const response = await axios.get(`${baseUrl}/operators`);
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}

export async function getGameTypes(operator: string) {
    try {
        const response = await axios.get(`${baseUrl}/gameTypes`, {
            params: { operator },  // Using params for query parameters
        });
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}

export async function getOperatorNames(operator: string, operatorGameType: string) {
    try {
        const response = await axios.get(`${baseUrl}/operatorNames`, {
            params: { operator, operatorGameType }
        });
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}

export async function getPlayersData(operator: string, operatorGameType: string, operatorName: string, page: number = 1, offset: number = 10) {
    try {
        const response = await axios.get(`${baseUrl}/players`, {
            params: { operator, operatorGameType, operatorName, page, offset }
        });
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}