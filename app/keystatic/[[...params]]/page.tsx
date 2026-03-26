'use client'

import { makePage } from '@keystatic/next/ui/app'
import config from '../../../keystatic.config'

// Only render in development — protected from public access in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Keystatic is not available in production')
}

export default makePage(config)
