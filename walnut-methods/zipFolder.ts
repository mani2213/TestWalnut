import type { WalnutContext } from './walnut';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

/** @walnut_method
 * name: Zip Folder
 * description: Creates a zip archive from a specified folder
 * actionType: custom_zip_folder
 * context: shared
 * needsLocator: false
 * category: Data Processing
 */
export async function zipFolder(ctx: WalnutContext) {
  const sourceFolderPath = ctx.params.sourcePath;
  const outputZipPath = ctx.params.outputPath || ctx.params.sourcePath + '.zip';
  
  ctx.log(`Starting to zip folder: ${sourceFolderPath}`);
  
  return new Promise<void>((resolve, reject) => {
    // Create output stream
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });
    
    // Listen for completion
    output.on('close', () => {
      const totalBytes = archive.pointer();
      ctx.log(`Zip archive created successfully: ${outputZipPath} (${totalBytes} bytes)`);
      ctx.setVariable('zipPath', outputZipPath);
      ctx.setVariable('zipSize', totalBytes);
      resolve();
    });
    
    // Handle errors
    archive.on('error', (err: Error) => {
      ctx.warn(`Error creating zip archive: ${err.message}`);
      reject(err);
    });
    
    // Pipe archive data to the output file
    archive.pipe(output);
    
    // Add the folder to the archive
    archive.directory(sourceFolderPath, false);
    
    // Finalize the archive
    archive.finalize();
  });
}
