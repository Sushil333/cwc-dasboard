import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import PropTypes from 'prop-types';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Snackbar } from '@mui/material';
import { deactivateUser } from '../../../api/index';
// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, status }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    msg: ''
  });

  const { vertical, horizontal, open, msg } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  async function handleDeactivate(id) {
    console.log(id);
    try {
      const res = await deactivateUser({ id, active: !status });
      console.log(res);
      setState({ ...state, open: true, msg: res.data.message });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={msg}
        key={vertical + horizontal}
      />
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => handleDeactivate(id)}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

UserMoreMenu.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired
};
