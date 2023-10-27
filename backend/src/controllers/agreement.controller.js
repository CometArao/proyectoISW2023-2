// operaciones CRUD de Convenios

import Agreement from '../../models/agreement.model.js';

export const getAgreements = async (req, res) => {
    const agreements = await Agreement.find();
    res.json(agreements);
};

export const createAgreement = async (req, res) => {
    const newAgreement = new Agreement(req.body);
    const agreementSaved = await newAgreement.save();
    res.status(201).json(agreementSaved);
};

export const getAgreementByID = async (req, res) => {
    const agreement = await Agreement.findById(req.params.agreementId);
    res.status(200).json(agreement);
};

export const updateAgreementByID = async (req, res) => {
    const updatedAgreement = await Agreement.findByIdAndUpdate(
        req.params.agreementId,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedAgreement);
};

export const deleteAgreementByID = async (req, res) => {
    await Agreement.findByIdAndDelete(req.params.agreementId);
    // code 200 is ok too
    res.status(204).json();
};

export const getAgreementsByRegion = async (req, res) => {
    const agreements = await Agreement.find({ region: req.params.regionId });
    res.json(agreements);
};

export const getAgreementsByRegionAndCommune = async (req, res) => {
    const agreements = await Agreement.find({
        region: req.params.regionId,
        commune: req.params.communeId,
    });
    res.json(agreements);
}