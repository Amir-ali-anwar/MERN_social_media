import express from "express";
const router = express.Router();


router.get('/:id',getUser)
router.get('/:id/friends',getUserFriends)
router.patch('/:id/:friendId',addRemoveFriend)

export default router