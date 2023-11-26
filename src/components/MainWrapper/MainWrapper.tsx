import { QueryParams } from '@/types/general';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
}

export const MainWrapper: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const backgroundClickHandler = () => {
    const newQuery: QueryParams = { ...router.query };
    delete newQuery.details;

    router.push({
      pathname: '/',
      query: newQuery,
    });
  };

  return (
    <main data-testid="main" className={styles.main} onClick={backgroundClickHandler}>
      {children}
    </main>
  );
};
