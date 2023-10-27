// Rutas de Acceso para Convenios

import { Router } from 'express';

import {
    getAgreements,
    createAgreement,
    getAgreementByID,
    updateAgreementByID,
    deleteAgreementByID,
    getAgreementsByRegion,
    getAgreementsByRegionAndCommune,
} from '../controller/agreement.controller.js';

const router = Router();

router.get('/', getAgreements);
router.get('/:agreementId', getAgreementByID);
router.post('/', createAgreement);
router.put('/:agreementId', updateAgreementByID);
router.delete('/:agreementId', deleteAgreementByID);
router.get('/region/:regionId', getAgreementsByRegion);
router.get('/region/:regionId/commune/:communeId', getAgreementsByRegionAndCommune);

export default router;