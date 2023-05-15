import winston from 'winston';
import path from 'path'

export default class Logger {
    
	logFileName = path.join(__dirname, '../../', 'logs/dummy-project.app.log');
	errorLogFileName = path.join(__dirname, '../../', 'logs/dummy-project.error.log');
	logger = null;
    
	async init() {
		try {
			this.logger = await winston.createLogger({
				format: winston.format.json(),
				exceptionHandlers: [
					new winston.transports.Console(),
					new winston.transports.File({
						filename: this.errorLogFileName,
						level: 'error',
					})
				],

				transports: [
					new winston.transports.Console(),
					new winston.transports.File({
						filename: this.logFileName,
					})
				]
			});

		}
		catch(err) {
			throw err;
		}
	}

	logInfo( message, data) {
		this.logger.log('info', message, data);
	}

	logError( message, data) {
		this.logger.log('error', message, data);
	}

	logWarn( message, data) {
		this.logger.log('warn', message, data);
	}

	logDebug( message, data) {
		this.logger.log('debug', message, data);
	}

	logSilly( message, data) {
		this.logger.log('silly', message, data);
	}
}