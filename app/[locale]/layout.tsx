import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Main from './main';
import "./globals.css";

// Import theme overrides 
// TODO move to other file when it's bigger
import "@/styles/default.css";
import "@/styles/brann.css";
import "@/styles/vif.css";
import "@/styles/shl.css";
import ReactQueryProvider from '@/lib/reactQueryProvider';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const theme = process.env.NEXT_PUBLIC_TARGET || 'default';
 
  return (
    <html data-theme={theme} lang={locale}>
      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider>
            <Main>
              {children}
            </Main>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}