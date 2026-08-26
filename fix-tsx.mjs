import fs from 'fs';
import path from 'path';

const targetDir = 'src/components';
const files = fs.readdirSync(targetDir);

for (const file of files) {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(targetDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove <script> ... </script> entirely, even across multiple lines
        content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned scripts from ${file}`);
    }
}
