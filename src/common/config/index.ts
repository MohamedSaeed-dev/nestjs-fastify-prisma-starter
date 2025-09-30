import { z } from 'zod';
import { configurationSchema } from './schema';
import { environmentVariables } from './env';

export type ApplicationConfiguration = z.infer<typeof configurationSchema>;

const validateEnvironmentVariables = (): ApplicationConfiguration => {
  try {
    return configurationSchema.parse(environmentVariables);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('\n❌ Environment variables validation failed:');
      console.error('━'.repeat(50));
      error.issues.forEach(issue => {
        console.error(`\n🔸 Variable: ${issue.path.join('.')}`);
        console.error(`   Error: ${issue.message}`);
      });
      console.error('━'.repeat(50));
      process.exit(1);
    }
    throw error;
  }
};

const config = validateEnvironmentVariables();

export default config;
export { config as settings };
