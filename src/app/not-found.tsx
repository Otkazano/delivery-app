'use client';

import React from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => router.push('/')}
        sx={{ marginBottom: 2 }}
      >
        Назад
      </Button>
      <Typography>not found</Typography>
    </>
  );
};

export default Home;
