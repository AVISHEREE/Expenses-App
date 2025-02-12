/** @type {import('tailwindcss').Config} */

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'chakra-petch': [
  				'Chakra Petch',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'heading-color': '#27283B',
  			'child-bg-color': '#EEEEEE',
  			'table-bg-color': '#EEEEEE',
  			'head-bg-color': '#ffff',
  			'data-bg-color': '#27283B',
  			'primary-bg-color': '#EEEEEE',
  			'new-text-color': '#393E46',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
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
  		cursor: {
  			'custom-pointer': 'url("../src/assets/images/coinsCursor.png"), auto'
  		},
  		animation: {
  			fadeInOut: 'fadeInOut 5s ease-in-out',
  			bounceSlow: 'bounceSlow 3s infinite',
  			blink: 'blink 1.5s infinite'
  		},
  		keyframes: {
  			fadeInOut: {
  				'0%': {
  					opacity: 0
  				},
  				'10%, 90%': {
  					opacity: 1
  				},
  				'100%': {
  					opacity: 0
  				}
  			},
  			bounceSlow: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			blink: {
  				'0%, 100%': {
  					opacity: 1
  				},
  				'50%': {
  					opacity: 0.5
  				}
  			},
  			animation: {
  				fadeInOut: 'fadeInOut 5s ease-in-out'
  			},
  			keyframes: {
  				fadeInOut: {
  					'0%, 100%': {
  						opacity: 0,
  						transform: 'translateY(-10px)'
  					},
  					'50%': {
  						opacity: 1,
  						transform: 'translateY(0)'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  
  plugins: [require("tailwindcss-animate")],
}
