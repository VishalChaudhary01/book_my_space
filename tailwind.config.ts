import type { Config } from "tailwindcss";
import svgToDataUri from "mini-svg-data-uri";

const {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	default: flattenColorPalette,
   // eslint-disable-next-line @typescript-eslint/no-require-imports
   } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			black: '#1E1E1E',
			dark: {
				1: '#d7d4db',
				2: '#443F4A',
				3: '#241F29',
				4: '#151119'
			},
  			purple: {
  				1: '#F9F5FD',
				2: '#ece0f9',
				3: '#ab72e3',
				4: '#3F1D60',
				5: '#32174c',
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  animation: {
			spotlight: "spotlight 2s ease .75s 1 forwards",
			scroll:
          		"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
		   },
		   keyframes: {
			spotlight: {
			  "0%": {
			    opacity: '0',
			    transform: "translate(-72%, -62%) scale(0.5)",
			  },
			  "100%": {
			    opacity: '1',
			    transform: "translate(-50%,-40%) scale(1)",
			  },
			},
			scroll: {
				to: {
				  transform: "translate(calc(-50% - 0.5rem))",
				},
			},
		},
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), addVariablesForColors, gridBackground],
};

function addVariablesForColors({ addBase, theme }: any) {
	// eslint-disable-next-line prefer-const
	let allColors = flattenColorPalette(theme("colors"));
	// eslint-disable-next-line prefer-const
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
    
	addBase({
	  ":root": newVars,
	});
}

function gridBackground({ matchUtilities, theme }: any) {
	matchUtilities(
	  {
	    "bg-grid": (value: any) => ({
		 backgroundImage: `url("${svgToDataUri(
		   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
		 )}")`,
	    }),
	    "bg-grid-small": (value: any) => ({
		 backgroundImage: `url("${svgToDataUri(
		   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
		 )}")`,
	    }),
	    "bg-dot": (value: any) => ({
		 backgroundImage: `url("${svgToDataUri(
		   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
		 )}")`,
	    }),
	  },
	  { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
	);
}

export default config;
