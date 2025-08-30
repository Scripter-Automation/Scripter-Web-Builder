import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { filePath } = await request.json();
        
        if (!filePath) {
            return json({ error: 'File path is required' }, { status: 400 });
        }

        // Construct the full path relative to project root
        const fullPath = path.resolve('.', filePath);
        
        console.log('API: Requested file path:', filePath);
        console.log('API: Full resolved path:', fullPath);
        console.log('API: Project root:', path.resolve('.'));
        
        // Security check: ensure the path is within the project root
        const projectRoot = path.resolve('.');
        if (!fullPath.startsWith(projectRoot)) {
            console.log('API: Access denied - path outside project root');
            return json({ error: 'Access denied: path outside project root' }, { status: 403 });
        }

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            console.log('API: File not found:', fullPath);
            return json({ error: 'File not found' }, { status: 404 });
        }

        // Read file content
        const content = fs.readFileSync(fullPath, 'utf-8');
        console.log('API: Content:', content);
        console.log('API: Loaded file:', filePath, 'Content length:', content.length);
        
        return json({
            success: true,
            content,
            filePath
        });
    } catch (error) {
        console.error('API: Error loading file:', error);
        return json({ error: 'Failed to load file' }, { status: 500 });
    }
};
