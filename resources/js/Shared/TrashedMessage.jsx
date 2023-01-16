import AlertDialog from '@/Shared/AlertDialog';
import Button from '@/Shared/Button';
import React from 'react';
import Icon from '@/Shared/Icon';

export default ({ onRestore, children }) => {
  return (
    <div className="max-w-3xl mb-6 p-4 bg-yellow-400 rounded border border-yellow-500 flex items-center justify-between">
      <div className="flex items-center">
        <Icon
          name="trash"
          className="flex-shrink-0 w-4 h-4 fill-current text-yellow-800 mr-2"
        />
        <div className="text-yellow-800">{children}</div>
      </div>
        <AlertDialog onConfirm={onRestore} type={"warning"}
                     trigger={<Button className={'text-yellow-800 focus:outline-none text-sm hover:underline'}>Restore</Button>}
                     title={'Restore'}
                     description={'Are you sure you want to restore this register?'} />
    </div>
  );
};
