import { useEffect, useState } from 'react';

export const useDisclosure = (
  initialOpened: boolean,
): [boolean, { open: () => void; close: () => void; toggle: () => void }] => {
  const [opened, setOpened] = useState(initialOpened);

  const open = () => setOpened(true);
  const close = () => setOpened(false);
  const toggle = () => setOpened((prev) => !prev);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden');
  }, [opened]);

  return [opened, { open, close, toggle }];
};
