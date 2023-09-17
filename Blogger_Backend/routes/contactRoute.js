import express from 'express';
const router = express.Router();
import { saveContactDetails } from '../controllers';

router.post('/contactus', saveContactDetails);

export default router; 