'use client';
import { useEffect, useRef } from 'react';
import { mountKzLogo } from './kz-logo-3d';

// npm i three
export default function KzLogo3D({ className, style, ...options }) {
  const ref = useRef(null);
  useEffect(() => {
    const logo = mountKzLogo(ref.current, options);
    return () => logo.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={ref} className={className} style={{ width: '100%', height: 480, ...style }} />;
}
