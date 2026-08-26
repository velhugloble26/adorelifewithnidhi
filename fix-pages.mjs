import fs from 'fs';
import path from 'path';

function processPath(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            processPath(path.join(dir, entry.name));
        } else if (entry.name === 'page.tsx') {
            const pagePath = path.join(dir, entry.name);
            let content = fs.readFileSync(pagePath, 'utf-8');
            
            const needsClient = /onMouse|onClick|onChange|onSubmit|useRef|useState|useEffect/g.test(content);
            const hasMetadata = /export const metadata\s*(?::\s*Metadata)?\s*=\s*{[\s\S]*?};/.test(content);
            
            if (needsClient) {
                if (!content.includes('"use client"')) {
                    content = '"use client";\n\n' + content;
                }
                
                if (hasMetadata) {
                    const match = content.match(/export const metadata\s*(?::\s*Metadata)?\s*=\s*{[\s\S]*?};/);
                    if (match) {
                        const metadataBlock = match[0];
                        // Remove from page
                        content = content.replace(metadataBlock, '');
                        // Also remove import type { Metadata } if present
                        content = content.replace(/import\s+type\s+{\s*Metadata\s*}\s+from\s+['"]next['"];?\s*\n*/, '');
                        
                        // Create layout.tsx
                        const layoutPath = path.join(dir, 'layout.tsx');
                        if (!fs.existsSync(layoutPath)) {
                            const layoutContent = `import type { Metadata } from "next";

${metadataBlock}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
`;
                            fs.writeFileSync(layoutPath, layoutContent, 'utf-8');
                            console.log(`Created ${layoutPath}`);
                        }
                    }
                }
                fs.writeFileSync(pagePath, content, 'utf-8');
                console.log(`Updated ${pagePath}`);
            }
        }
    }
}

processPath('src/app');
console.log('Done!');
