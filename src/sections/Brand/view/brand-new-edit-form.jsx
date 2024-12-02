import { useMemo, useState, useEffect, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
import { ChromePicker } from 'react-color';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { z as zod } from 'zod';
import { AuthContext } from '/Users/malik/Downloads/next-js/src/auth/context/auth-context.jsx'; // Adjust path as needed

const BrandSchema = zod.object({
  avatarUrl: schemaHelper.file({
    message: { required_error: 'Logo is required!' },
  }),
  name: zod.string().min(1, { message: 'Brand name is required!' }),
  description: zod.string().min(1, { message: 'Brand description is required!' }),
  colors: zod.array(zod.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color hex code')).optional(),
});

export function BrandNewEditForm({ fetchTrigger }) {
  const { user, authenticated } = useContext(AuthContext);
  const [websiteDetails, setWebsiteDetails] = useState(null);
  const [colors, setColors] = useState([]);
  const [scanResponse, setScanResponse] = useState('');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [editingColorIndex, setEditingColorIndex] = useState(-1);

  useEffect(() => {
    if (fetchTrigger) {
      axios
        .get('http://127.0.0.1:8000/website-data/', { params: { url: fetchTrigger } })
        .then((response) => {
          setWebsiteDetails(response.data);
          setColors(response.data.brand_colors ? response.data.brand_colors.split(', ') : []);
        })
        .catch((error) => {
          toast.error('Error fetching website details');
          console.error(error);
        });
    }
  }, [fetchTrigger]);

  const defaultValues = useMemo(
    () => ({
      avatarUrl: websiteDetails?.logo_url || null,
      name: websiteDetails?.brand_name || '',
      description: websiteDetails?.brand_description || '',
    }),
    [websiteDetails]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(BrandSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (!authenticated) {
      toast.error('User not authenticated');
      return;
    }
    data.colors = colors;
    try {
      const response = await axios.post('http://127.0.0.1:8000/brands/', {
        user_id: user.uid,
        avatarUrl: data.avatarUrl,
        name: data.name,
        description: data.description,
        colors: data.colors,
      });
      setScanResponse(response.data.message);
      toast.success('Brand saved successfully!');
      reset();
    } catch (error) {
      toast.error('Error saving brand');
      console.error(error);
    }
  });

  const handleColorChange = (color) => {
    const updatedColors = [...colors];
    updatedColors[editingColorIndex] = color.hex;
    setColors(updatedColors);
  };

  const handleColorPickerOpen = (index) => {
    setEditingColorIndex(index);
    setColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setColorPickerOpen(false);
  };

  const addColor = () => {
    setColorPickerOpen(true);
    setEditingColorIndex(colors.length);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {`${(3145728 / 1024 / 1024).toFixed(2)} MB`}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Field.Text name="name" label="Brand Name" />
              <TextField
                {...register('description')}
                label="Brand Description"
                multiline
                rows={4}
              />
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Brand Colors
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {colors.map((color, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'center', width: 'calc(50% - 8px)' }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ flexGrow: 1, textTransform: 'none' }}
                      onClick={() => handleColorPickerOpen(index)}
                    >
                      Brand Color {index + 1}: {color}
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: color,
                          marginLeft: 1,
                          border: '1px solid #ddd',
                        }}
                      />
                    </Button>
                    <IconButton onClick={() => removeColor(index)} color="error">
                      <RemoveCircleIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddCircleIcon />}
                  onClick={addColor}
                  sx={{ width: 'calc(50% - 8px)' }}
                >
                  Add Color
                </Button>
              </Box>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {scanResponse && (
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center', color: 'green' }}>
          {scanResponse}
        </Typography>
      )}

      {/* Color Picker Dialog */}
      <Dialog open={colorPickerOpen} onClose={handleColorPickerClose}>
        <DialogTitle>Choose Color</DialogTitle>
        <DialogContent>
          <ChromePicker
            color={colors[editingColorIndex] || '#FFFFFF'}
            onChangeComplete={handleColorChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColorPickerClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
}
