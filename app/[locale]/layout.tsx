import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Main from './main';
import AOSWrapper from '@/components/aosWrapper/aosWrapper';
import { fonts } from '@/lib/fonts';
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
  params: {locale: string};
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const theme = process.env.NEXT_PUBLIC_TARGET || 'default';
  const messages = await getMessages();
 
  return (
    <html data-theme={theme} lang={locale} className={fonts}>
      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <AOSWrapper />
            <Main>
              {children}
            </Main>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}