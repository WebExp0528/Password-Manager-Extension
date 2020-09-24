"use strict";

import express from "express";
import controller from "./accounts.controller";

import auth from "../../_common/auth/auth.middleware";

let router = express.Router();

export default router;
