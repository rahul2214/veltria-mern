import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { deleteEmployee, employee, getAllEmployees, updateEmployee } from "../controllers/employeeController.js";
const router = express.Router();
router.post("/employee", protectRoute,  employee)
router.get("/employees", protectRoute, getAllEmployees)
router.delete("/employee/:id", protectRoute,  deleteEmployee)
router.put("/employee/:id", protectRoute,  updateEmployee)




export default router;