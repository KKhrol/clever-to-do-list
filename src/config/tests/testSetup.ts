import '@testing-library/jest-dom';
import type React from 'react';

if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (global as any).TextEncoder = class {
    encoding = 'utf-8';
    encode(text: string): Uint8Array {
      const arr = new Uint8Array(text.length);
      for (const [i, char] of [...text].entries()) {
        arr[i] = char.charCodeAt(0);
      }
      return arr;
    }
    encodeInto(): { read: number; written: number } {
      return { read: 0, written: 0 };
    }
  };
}

if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (global as any).TextDecoder = class {
    encoding = 'utf-8';
    fatal = false;
    ignoreBOM = false;
    decode(arr: Uint8Array): string {
      return Array.from(arr, byte => String.fromCharCode(byte)).join('');
    }
  };
}

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

jest.mock('../firebaseConfig', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    currentUser: null,
  },
  db: {},
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});
