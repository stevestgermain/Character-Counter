import React from 'react';

export interface PlatformLimit {
  id: string;
  name: string;
  limit: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ProgressProps {
  current: number;
  max: number;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export interface NavItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  count?: number;
  href?: string;
}