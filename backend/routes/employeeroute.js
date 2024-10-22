import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { deleteEmployee, employee, getAllEmployees, updateEmployee, getAllJobs } from "../controllers/employeeController.js";
const router = express.Router();
router.post("/employee", employee)
router.get("/employees", protectRoute, getAllEmployees)
router.get("/jobs", getAllJobs)
router.delete("/employee/:id", protectRoute,  deleteEmployee)
router.put("/employee/:id", protectRoute,  updateEmployee)
export default router;