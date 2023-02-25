import { storage } from '../storage.js';


export const initialStage = {
  exec({ from }) {
    storage[from].stage = 1;

    return process.env.WELCOME + process.env.YOUR_NAME;
  },
};