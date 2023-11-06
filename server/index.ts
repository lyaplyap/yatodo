import app from './app';
import CONFIG from './config';

// App start
const start = async () => {
    try {
        app.listen(CONFIG.PORT, () => console.log(`[server]: App is running at http://localhost:${CONFIG.PORT}`));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`[server]: ${error.message}`);
        }

        process.exit(1);
    }
};
  
start();
