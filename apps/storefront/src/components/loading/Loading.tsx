import { Box, Typography } from '@mui/material';

interface LoadingProps {
  backColor?: string;
}

function Loading({ backColor }: LoadingProps) {

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: backColor || 'background.default',
        zIndex: 99999999995,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        role="progressbar"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          color: '#004270',
        }}
      >
        {/* {b3Lang('global.tips.loading')} */}
        <img
          src="https://k097otgk.myexperro.com/mm-images/main-logo-c-and-b-19ygjry4.png"
          alt=""
          width={200}
          height={80}
        />
      </Typography>
    </Box>
  );
}

export default Loading;
