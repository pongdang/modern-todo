import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createTodoItem } from "../api/todos";
import { useTokenContext } from "../contexts/TokenContext";
import { useFormField } from "../hooks/useFormField";
import { Button } from "./Button";

export function TodoForm() {
  const navigate = useNavigate();
  const { accessToken } = useTokenContext();
  const [content, onChangeContent, contentErrorMessage] = useFormField({
    validators: [{ ok: (value) => value !== "", message: "오늘의 할 일을 입력해주세요!" }],
  });

  const handleTodoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (contentErrorMessage != null) {
      return;
    }

    e.preventDefault();

    await createTodoItem(content, accessToken);

    navigate(0);
  };

  return (
    <Form onSubmit={handleTodoSubmit}>
      <Input type='text' onChange={onChangeContent} />
      <SubmitButton type='submit' disabled={contentErrorMessage != null}>
        추가
      </SubmitButton>
      <ErrorMessage>{contentErrorMessage}</ErrorMessage>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 60px;
  gap: 0px 10px;
`;

const Input = styled.input`
  padding-left: 8px;
`;

const SubmitButton = styled(Button)`
  padding: 8px 0;
  border-radius: 12px;

  &:disabled {
    background-color: #c1c1c199;
    cursor: not-allowed;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  height: 16px;
  font-size: 1.3rem;
  text-align: center;
`;
