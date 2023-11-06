import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const CONFIG = {
    PORT: process.env.PORT || 5001
};

export default CONFIG;
