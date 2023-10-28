"use strict";

const express = require("express");

import { isAdmin } from "../middlewares/authorization.middleware";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";

import {
  getAgreements,
  getAgreementById,
  getAgreementsByRegion,
  getAgreementsByRegionAndCommune,
  createAgreement,
  updateAgreement,
  deleteAgreement,
} from "../controllers/agreement.controller";

const router = express.Router();

router.use(authenticationMiddleware);

// accesibles por todos los usuarios
router.get("/", getAgreements);
router.get("/:id", getAgreementById);
router.get("/region/:region", getAgreementsByRegion);
router.get("/region/:region/commune/:commune", getAgreementsByRegionAndCommune);

// accesibles solo por administradores
router.post("/", isAdmin, createAgreement);
router.put("/:id", isAdmin, updateAgreement);
router.delete("/:id", isAdmin, deleteAgreement);
