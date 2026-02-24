import type { WalnutContext } from './walnut';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

/** @walnut_method
 * name: Zip Folder
 * description: Creates a zip archive from ${folderPath} to ${outputPath}
 * actionType: custom_zip_folder
 * context: shared
 * needsLocator: false
 * category: Data Processing
 */
export async function zipFolder(ctx: WalnutContext) {
  // ctx.args contains resolved values from ${...} placeholders in the step description
  // e.g. step description "${folderPath}" with test data { folderPath: "/tmp/data" } → ctx.args[0] = "/tmp/data"
  const sourcePath = ctx.args[0];
  const outputPath = ctx.args[1] || sourcePath + '.zip';

  ctx.log('Zipping folder: ' + sourcePath);

  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      ctx.log('Created ' + outputPath + ' (' + archive.pointer() + ' bytes)');
      ctx.setVariable('zipPath', outputPath);
      resolve();
    });
    
    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(sourcePath, false);
    archive.finalize();
  });
}
