import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material';
import { createSolarPanel, updateSolarPanel } from '../../api/solarApi';
import { SolarPanel, SolarStatus } from '../../types/solar';

type SolarFormState = Omit<SolarPanel, 'id' | 'lastUpdated'>;

interface SolarFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  panel?: SolarPanel | null;
}

const defaultState: SolarFormState = {
  name: '',
  voltage: 0,
  current: 0,
  watt: 0,
  temperature: 0,
  status: SolarStatus.NORMAL,
  location: ''
};

const statusOptions = [
  { value: SolarStatus.NORMAL, label: 'Normal' },
  { value: SolarStatus.WARNING, label: 'Warning' },
  { value: SolarStatus.ERROR, label: 'Error' }
];

const SolarFormDialog: React.FC<SolarFormDialogProps> = ({ open, onClose, onSaved, panel }) => {
  const [formState, setFormState] = useState<SolarFormState>(defaultState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = useMemo(() => Boolean(panel), [panel]);

  useEffect(() => {
    if (panel) {
      const { id: _, lastUpdated: __, ...rest } = panel;
      setFormState(rest);
    } else {
      setFormState(defaultState);
    }
    setError(null);
  }, [panel, open]);

  const handleNumberChange = (key: keyof SolarFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, [key]: Number(event.target.value) }));
  };

  const handleTextChange = (key: keyof SolarFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, [key]: event.target.value }));
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setFormState(prev => ({ ...prev, status: event.target.value as SolarStatus }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEditMode && panel) {
        await updateSolarPanel(panel.id, formState);
      } else {
        await createSolarPanel(formState);
      }
      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save solar panel');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Solar Panel' : 'Create Solar Panel'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent dividers>
          <Stack spacing={2}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label="Name"
              value={formState.name}
              onChange={handleTextChange('name')}
              fullWidth
              required
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Voltage (V)"
                type="number"
                value={formState.voltage}
                onChange={handleNumberChange('voltage')}
                fullWidth
                required
              />
              <TextField
                label="Current (A)"
                type="number"
                value={formState.current}
                onChange={handleNumberChange('current')}
                fullWidth
                required
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Watt (W)"
                type="number"
                value={formState.watt}
                onChange={handleNumberChange('watt')}
                fullWidth
                required
              />
              <TextField
                label="Temperature (°C)"
                type="number"
                value={formState.temperature}
                onChange={handleNumberChange('temperature')}
                fullWidth
                required
              />
            </Stack>
            <FormControl fullWidth required>
              <InputLabel id="solar-status-label">Status</InputLabel>
              <Select
                labelId="solar-status-label"
                label="Status"
                value={formState.status}
                onChange={handleStatusChange}
              >
                {statusOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Location"
              value={formState.location}
              onChange={handleTextChange('location')}
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="secondary" disabled={submitting}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={submitting}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SolarFormDialog;
