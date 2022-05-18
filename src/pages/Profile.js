import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { red } from '@mui/material/colors';

export default function Profile() {
  const user = useSelector((state) => state.userLogin);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Container>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        R
      </Avatar>
      <h1>{user.userInfo.name}</h1>
    </Container>
  );
}
