import settings from '../config/index';
import { NodeEnv } from '../config/constants/node.env';

export const isDevelopment = (): boolean => settings.NODE_ENV === NodeEnv.DEV;

export const isProduction = (): boolean => settings.NODE_ENV === NodeEnv.PROD;

export const isTest = (): boolean => settings.NODE_ENV === NodeEnv.TEST;

export const isStaging = (): boolean => settings.NODE_ENV === NodeEnv.STAGING;
