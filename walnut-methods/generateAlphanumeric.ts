import type { WalnutContext } from './walnut';
import * as crypto from 'crypto';

/** @walnut_method
 * name: Generate Alphanumeric String
 * description: Generate alphanumeric string of length ${length} and store in $[alphanumeric]
 * actionType: custom_generate_alphanumeric
 * context: shared
 * needsLocator: false
 * category: Data Processing
 */
export async function generateAlphanumeric(ctx: WalnutContext) {
  // ctx.args[0] = length value from ${length}
  // ctx.args[1] = variable name "alphanumeric" from $[alphanumeric]
  
  const length = parseInt(ctx.args[0] as string) || 8;  // Default to 8 if not provided or invalid
  const outputVar = ctx.args[1];
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Generate random alphanumeric string using crypto for better randomness
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomBytes[i] % characters.length);
  }
  
  ctx.log(`Generated alphanumeric string: ${result} (length: ${length})`);
  ctx.setVariable(outputVar, result);
}
