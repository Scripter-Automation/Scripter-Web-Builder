import fs from 'fs';
import path from 'path';
import { fail } from '@sveltejs/kit';

export async function load() {
    const basePath = path.resolve('.'); // Use project root instead of src
    const tree: Record<string, any> = {};

    function buildTree(dir: string, treeNode: Record<string, any>) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            // Skip certain directories and files that shouldn't be shown
            if (entry.name === 'node_modules' || 
                entry.name === '.git' || 
                entry.name === '.svelte-kit' ||
                entry.name === 'dist' ||
                entry.name === 'build' ||
                entry.name.startsWith('.') ||
                entry.name === 'package-lock.json' ||
                entry.name === 'yarn.lock' ||
                entry.name === 'pnpm-lock.yaml') {
                continue;
            }
            
            if (entry.isDirectory()) {
                const folderPath = path.join(dir, entry.name);
                treeNode[entry.name] = {};
                buildTree(folderPath, treeNode[entry.name]); // Recursively build subfolders
            } else {
                treeNode[entry.name] = null; // Files are leaf nodes
            }
        }
    }

    buildTree(basePath, tree);

    console.log('Tree:', JSON.stringify(tree, null, 2));

    return {
        tree
    };
}


