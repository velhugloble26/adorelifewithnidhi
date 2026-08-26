import fs from 'fs';
import path from 'path';

const targetDir = 'src/components';
// Only our converted components, not Navbar.tsx or Footer.tsx
const skipFiles = new Set(['Navbar.tsx', 'Footer.tsx']);

const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.tsx') && !skipFiles.has(f));

for (const file of files) {
    const filePath = path.join(targetDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove <style> blocks (with or without content)
    content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Remove <link> tags 
    content = content.replace(/<link\b[^>]*\/>/gi, '');
    content = content.replace(/<link\b[^>]*>[^<]*<\/link>/gi, '');
    
    // Remove <meta> tags
    content = content.replace(/<meta\b[^>]*\/>/gi, '');
    
    // Remove <title> tags
    content = content.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
    
    // Remove <!DOCTYPE ...>  
    content = content.replace(/<!DOCTYPE[^>]*>/gi, '');
    
    // Remove <html ...> and </html>
    content = content.replace(/<html\b[^>]*>/gi, '');
    content = content.replace(/<\/html>/gi, '');
    
    // Remove <head> and </head>
    content = content.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, '');
    
    // Remove <body ...> and </body>
    content = content.replace(/<body\b[^>]*>/gi, '');
    content = content.replace(/<\/body>/gi, '');
    
    // Collapse multiple blank lines into one
    content = content.replace(/\n{3,}/g, '\n\n');
    
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
    console.log(`Cleaned ${file}`);
}
console.log('Done!');
