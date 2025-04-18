'use client';
import { store } from '@/lib/app/store';
import React from 'react';
import { Provider } from 'react-redux';

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ru">
      <head>
        <title>Delivery App</title>
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
