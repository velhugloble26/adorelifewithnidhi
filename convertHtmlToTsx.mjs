import fs from 'fs';
import path from 'path';

function convertStyleStringToObject(styleStr) {
    if (!styleStr) return '{}';
    const styleObj = {};
    styleStr.split(';').forEach(rule => {
        const parts = rule.split(':');
        if (parts.length >= 2) {
            let key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            // Convert kebab-case to camelCase
            key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[key] = value;
        }
    });
    return JSON.stringify(styleObj);
}

function processHtmlContent(html) {
    let jsx = html;
    
    // Extract everything inside <body> if present
    const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        jsx = bodyMatch[1];
    }

    // Strip Nav and Footer if they exist (assuming the user wants core components)
    // Actually, maybe keep them just in case, or comment them out?
    // The user wants them as components. So we'll keep the full body just in case, they can clean up later.
    
    // Replace class=" with className="
    jsx = jsx.replace(/\bclass="/g, 'className="');
    
    // Replace for=" with htmlFor="
    jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
    
    // Fix styles
    jsx = jsx.replace(/\bstyle="([^"]*)"/g, (match, styleStr) => {
        return `style={${convertStyleStringToObject(styleStr)}}`;
    });
    jsx = jsx.replace(/\bstyle='([^']*)'/g, (match, styleStr) => {
        return `style={${convertStyleStringToObject(styleStr)}}`;
    });

    // Close self-closing tags
    jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');

    // Replace <!-- --> with {/* */}
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    
    // Ensure properly escaped entities or ignore them. We can wrap in <> </>
    return `<>\n${jsx}\n</>`;
}

const sourceDir = 'src/componentes';
const targetDir = 'src/components';

if (fs.existsSync(sourceDir)) {
    const folders = fs.readdirSync(sourceDir);
    for (const folder of folders) {
        const folderPath = path.join(sourceDir, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const htmlFile = path.join(folderPath, 'code.html');
            if (fs.existsSync(htmlFile)) {
                const htmlContent = fs.readFileSync(htmlFile, 'utf8');
                const jsxContent = processHtmlContent(htmlContent);
                
                const componentName = folder.charAt(0).toUpperCase() + folder.slice(1);
                const componentCode = `export default function ${componentName}() {\n  return (\n    ${jsxContent}\n  );\n}\n`;
                
                const targetFile = path.join(targetDir, `${componentName}.tsx`);
                fs.writeFileSync(targetFile, componentCode, 'utf8');
                console.log(`Converted ${htmlFile} to ${targetFile}`);
            }
        }
    }
}
