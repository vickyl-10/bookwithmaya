import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const logVisit = async (url) => {
      try {
        await fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: url,
            query: Object.fromEntries(new URLSearchParams(window.location.search)),
            userAgent: navigator.userAgent,
          }),
        });
      } catch (err) {
        console.error('Logging error:', err);
      }
    };

    logVisit(router.asPath);
    router.events.on('routeChangeComplete', logVisit);
    return () => router.events.off('routeChangeComplete', logVisit);
  }, [router]);

  return <Component {...pageProps} />;
}
