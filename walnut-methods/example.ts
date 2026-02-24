import type { WalnutContext } from './walnut';

/** @walnut_method
 * name: Login to Application
 * description: Login with username and password using test data
 * actionType: custom_login
 * context: web
 * needsLocator: false
 * category: Authentication
 */
export async function login(ctx: WalnutContext) {
  await ctx.navigate(ctx.testBaseUrl + '/login');
  await ctx.type('[data-testid="username"]', ctx.params.username);
  await ctx.type('[data-testid="password"]', ctx.params.password);
  await ctx.click('[data-testid="submit"]');
  await ctx.verifyTextVisible('Dashboard');
}
