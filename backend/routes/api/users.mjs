import express from "express";
const router = express.Router();
import {
  getAllUsers,
  deleteUser,
  getUser,
} from "../../controllers/usersController.mjs";
import ROLES_LIST from "../../config/rolesList.mjs";
import verifyRoles from "../../middleware/verifyRoles.mjs";

router
  .route("/")
  .get(
    verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User]),
    getAllUsers
  )
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

export default router;
