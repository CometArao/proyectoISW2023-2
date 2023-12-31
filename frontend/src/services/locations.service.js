import axios from "../services/root.service.js"

export const getAgreementsByRegion = async (region) => {
    try {
        const response = await axios.get(`/convenios/region/${region}`);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAgreementsByRegionAndCommune = async (region, commune) => {
    try {
        const response = await axios.get(`/convenios/region/${region}/comuna/${commune}`);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
}