import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";
import { Flex, Meta } from "@once-ui-system/core";
import { Providers } from "@/components";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { baseURL, fonts, home, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={person.locale ?? "en"}
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
      data-theme="dark"
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--surface-ground)] text-[var(--text-primary)] min-h-screen antialiased selection:bg-[var(--text-accent)] selection:text-[var(--surface-ground)]">
        <Providers>
          <Navigation />
          <SmoothScroll>
          <main id="top" className="relative z-10">{children}</main>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
