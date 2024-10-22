import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { deleteWorkShops, workshop, getAllWorkShops, updateWorkShops, getAllHomeWorkShops } from "../controllers/workshopController.js";
const router = express.Router();
router.post("/workshop", protectRoute, workshop)
router.get("/workshops", protectRoute, getAllWorkShops)
router.get("/homepageworkshops", getAllHomeWorkShops)
router.delete("/workshop/:id", protectRoute, deleteWorkShops)
router.put("/workshop/:id", protectRoute, updateWorkShops)
export default router;