import { PlatformLimit } from './types';
import { Linkedin, Facebook } from 'lucide-react';

export const PLATFORM_LIMITS: PlatformLimit[] = [
  {
    id: 'meta',
    name: 'Facebook Primary Text',
    limit: 125,
    description: 'Visible text before "See More" usually appears',
    icon: Facebook,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Intro',
    limit: 140,
    description: 'Visible characters on mobile feed before truncation',
    icon: Linkedin,
  },
];