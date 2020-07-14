import React from 'react';

import { Modal } from './Modal';
import { Button } from '../Button';
import { TextField } from '../TextField';

export default {
  title: 'Modal',
  components: Modal,
};

export const Basic = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        aria-labelledby="login-title"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="w-64">
          <h1 className="prose prose-2xl" id="login-title">
            Login
          </h1>

          <div className="h-5" />

          <TextField id="email" label="Email" type="email" />

          <div className="h-5" />

          <TextField id="password" label="Password" type="password" />

          <div className="h-5" />

          <Button type="submit" colorScheme="primary">
            Login
          </Button>
        </div>
      </Modal>
    </>
  );
};
