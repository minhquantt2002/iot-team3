import { merge } from 'lodash';
import { Theme } from '@mui/material';

// project import
import Button from './Button';
import CardContent from './CardContent';
import Checkbox from './Checkbox';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import Link from './Link';
import ListItemIcon from './ListItemIcon';
import OutlinedInput from './OutlinedInput';
import TableCell from './TableCell';

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Button(theme),
    CardContent(),
    Checkbox(theme),
    IconButton(theme),
    InputLabel(theme),
    Link(),
    ListItemIcon(),
    OutlinedInput(theme),
    TableCell(theme),
  );
}
