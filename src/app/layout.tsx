import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";
import AsciiCursor from "@/components/AsciiCursor";

import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  SpacingToken,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { baseURL, effects, fonts, style, dataStyle, home, person } from "@/resources";

import { BlackCatEntity } from "@/components/BlackCatEntity";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

import { SmoothScroll } from "@/components/SmoothScroll";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={person.locale ?? "en"}
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const savedTheme = localStorage.getItem('data-theme') || 'dark';
                  root.setAttribute('data-theme', savedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh", backgroundColor: "var(--bg-main)" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <BlackCatEntity />
          
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <SmoothScroll>
                  <RouteGuard>{children}</RouteGuard>
              </SmoothScroll>
            </Flex>
          </Flex>
          <Footer />
          <AsciiCursor />
        </Column>
      </Providers>
    </Flex>
  );
}
