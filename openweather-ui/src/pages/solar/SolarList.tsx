import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {
  deleteSolarPanel,
  getSolarPanel,
  getSolarPanels
} from '../../api/solarApi';
import SolarFormDialog from './SolarFormDialog';
import { SolarPanel, SolarStatus } from '../../types/solar';

const statusColor: Record<SolarStatus, 'success' | 'warning' | 'error'> = {
  [SolarStatus.NORMAL]: 'success',
  [SolarStatus.WARNING]: 'warning',
  [SolarStatus.ERROR]: 'error'
};

const SolarList: React.FC = () => {
  const [panels, setPanels] = useState<SolarPanel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPanel, setEditingPanel] = useState<SolarPanel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SolarPanel | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPanels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSolarPanels();
      setPanels(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load solar panels');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPanels();
  }, [fetchPanels]);

  const handleAdd = () => {
    setEditingPanel(null);
    setDialogOpen(true);
  };

  const handleEdit = async (panelId: number) => {
    try {
      const data = await getSolarPanel(panelId);
      setEditingPanel(data);
      setDialogOpen(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to load solar panel');
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = (panel: SolarPanel) => {
    setDeleteTarget(panel);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSolarPanel(deleteTarget.id);
      setDeleteTarget(null);
      fetchPanels();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete solar panel');
    } finally {
      setDeleting(false);
    }
  };

  const handleSaved = () => {
    fetchPanels();
  };

  const formattedRows = useMemo(
    () =>
      panels.map(panel => ({
        ...panel,
        lastUpdatedDisplay: new Date(panel.lastUpdated).toLocaleString()
      })),
    [panels]
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardHeader
          title="Solar Panels"
          action={
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              New Panel
            </Button>
          }
        />
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : formattedRows.length === 0 ? (
            <Typography color="text.secondary">No solar panels available.</Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Voltage (V)</TableCell>
                  <TableCell>Current (A)</TableCell>
                  <TableCell>Watt (W)</TableCell>
                  <TableCell>Temperature (°C)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedRows.map(panel => (
                  <TableRow key={panel.id} hover>
                    <TableCell>{panel.name}</TableCell>
                    <TableCell>{panel.voltage}</TableCell>
                    <TableCell>{panel.current}</TableCell>
                    <TableCell>{panel.watt}</TableCell>
                    <TableCell>{panel.temperature}</TableCell>
                    <TableCell>
                      <Chip label={panel.status} color={statusColor[panel.status]} size="small" />
                    </TableCell>
                    <TableCell>{panel.lastUpdatedDisplay}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton color="primary" onClick={() => handleEdit(panel.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(panel)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <SolarFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSaved={handleSaved}
        panel={editingPanel}
      />

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Solar Panel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {deleteTarget?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={deleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SolarList;
