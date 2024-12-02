import React from 'react';
import { Card, Avatar, Typography, IconButton, MenuList, MenuItem } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import axios from 'axios';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export function BrandItem({ brand, onDeleteSuccess }) {
  const popover = usePopover();

  const handleDelete = () => {
    console.log('Brand prop in BrandItem:', brand);

    if (!brand.id) {
      console.error('Brand ID is undefined');
      return;
    }

    axios
      .delete(`http://localhost:8000/brands/${brand.id}`)
      .then(() => {
        onDeleteSuccess(brand.id); // Notify parent component to update the list
        popover.onClose(); // Close the popover after deletion
      })
      .catch((error) => console.error('Failed to delete brand:', error));
  };

  return (
    <Card sx={{ p: 3, position: 'relative' }}>
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Avatar
        alt={brand.name}
        src={brand.avatarUrl}
        variant="rounded"
        sx={{ width: 48, height: 48, mb: 2 }}
      />
      <Typography variant="subtitle1">{brand.name}</Typography>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </Card>
  );
}
