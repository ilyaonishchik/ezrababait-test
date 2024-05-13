import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { Input, Loader, Modal, Stack } from '../../ui';
import { useUpdateDeedMutation } from '../../../services/api';
import { Deed } from '../../../types/entities';
import { useFormik } from 'formik';

type UpdateDeedButtonProps = {
  userId: number;
  deed: Deed;
};

export default function UpdateDeedButton({ userId, deed }: UpdateDeedButtonProps) {
  const [updateDeed, { isLoading: isUpdateDeedLoading }] = useUpdateDeedMutation();

  const [opened, { open, close }] = useDisclosure(false);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: deed.title,
      description: deed.description,
      points: deed.points,
    },
    onSubmit: async (values) => {
      await updateDeed({ userId, deedId: deed.id, body: values });
      close();
    },
  });

  return (
    <>
      <Modal title='Edit deed' opened={opened} onClose={close}>
        <Stack>
          <Input
            type='text'
            label='Title'
            name='title'
            placeholder='title'
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            touched={touched.title}
          />
          <Input
            label='Description'
            name='description'
            placeholder='description'
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            touched={touched.description}
          />
          <Input
            type='number'
            label='Points'
            name='points'
            placeholder='points'
            value={values.points}
            onChange={handleChange}
            error={errors.points}
            touched={touched.points}
          />
          <button type='button' className='btn btn-primary self-end' onClick={() => handleSubmit()}>
            {isUpdateDeedLoading ? <Loader /> : 'Save'}
          </button>
        </Stack>
      </Modal>
      <button className='btn btn-square  btn-sm'>
        <IconEdit className='h-4 w-4' onClick={open} />
      </button>
    </>
  );
}
