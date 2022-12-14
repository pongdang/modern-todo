import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButton, Title, UserForm } from '../components';
import { useJoin, useLogin } from '../hooks/user';
import { User } from '../models/User';

export function Join() {
  const navigate = useNavigate();
  const { join } = useJoin();
  const { login } = useLogin();

  const handleJoin = useCallback(
    async (user: User) => {
      await join(user);
      await login(user);

      navigate('/todo');
    },
    [join, login, navigate]
  );

  return (
    <Section>
      <Title>회원가입</Title>

      <UserForm onSubmit={handleJoin} />

      <LinkButton to="/">로그인 할래요!</LinkButton>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
