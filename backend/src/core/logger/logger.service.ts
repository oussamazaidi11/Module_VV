import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const { combine, timestamp, printf, colorize, json } = winston.format;

    // Determine if the application is running in development mode
    const isDevelopment =
      this.configService.get(`environment`) === 'development';

    // Choose a format based on the environment
    const logFormat = isDevelopment
      ? combine(
          colorize(),
          timestamp(),
          printf((info: Record<string, any>) => {
            const { level, message, timestamp, context, meta, trace } = info;
            return `${timestamp} ${level}: [${context ?? ''}] ${message ?? ''} ${
              meta ? JSON.stringify(meta) : ''
            } ${trace ? JSON.stringify(trace) : ''}`;
          }),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        new winston.transports.Console(),
        // Add other transports like file or cloud-based logging solutions
      ],
    });
  }

  log(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.info(message, {
      context,
      meta,
    });
  }

  error(
    message: string,
    trace?: string,
    context?: string,
    meta?: Record<string, unknown>,
  ) {
    this.logger.error(message, {
      context,
      trace,
      meta,
    });
  }

  warn(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.warn(message, {
      context,
      meta,
    });
  }

  debug(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.debug(message, {
      context,
      meta,
    });
  }

  verbose(message: string, context?: string, meta?: Record<string, unknown>) {
    this.logger.verbose(message, {
      context,
      meta,
    });
  }
}
