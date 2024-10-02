import axios from 'axios';

export class GeoipSDK {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async getGeoInfo(ip: string) {
		try {
			const response = await axios.get(`${this.baseUrl}/geoip?ip=${ip}`);
			return response.data;
		} catch (error) {
			if (error.response) {
				return { code: error.response.status, message: error.response.data.message };
			}
			return { code: 500, message: 'Ошибка сервера' };
		}
	}
}