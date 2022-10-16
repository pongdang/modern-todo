import { useEffect, useState } from 'react';

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Validator {
  ok: (value: string) => boolean;
  message: string;
}

export function useFormField({
  initialValue,
  validators,
}: {
  initialValue?: string;
  validators: Validator[];
}) {
  const [value, setValue] = useState(initialValue ?? '');
  const [errorMessage, setErrorMessage] = useState<string>();

  const onChange = (e: OnChangeEvent) => setValue(e.target.value);

  useEffect(() => {
    for (const validator of validators) {
      if (!validator.ok(value)) {
        setErrorMessage(validator.message);
        return;
      }
    }
    setErrorMessage(undefined);
  }, [value, validators]);

  const clearValue = () => setValue('');

  return {
    value,
    onChange,
    errorMessage,
    setValue,
    clearValue,
  } as const;
}
