import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
	if (browser) {
		const saved = localStorage.getItem('theme');
		
		if (saved && (saved === 'light' || saved === 'dark')) {
			return saved;
		}
		
		// Check system preference
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		if (prefersDark) {
			return 'dark';
		}
	}
	
	return 'light';
};

const initialTheme = getInitialTheme();

export const theme = writable<'light' | 'dark'>(initialTheme);

// Subscribe to theme changes and save to localStorage
if (browser) {
	// Set initial theme on document
	document.documentElement.setAttribute('data-theme', initialTheme);
	
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});
}

// Toggle theme function
export const toggleTheme = () => {
	theme.update(current => current === 'light' ? 'dark' : 'light');
};
