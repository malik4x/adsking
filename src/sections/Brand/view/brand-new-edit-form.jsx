import { useMemo, useState, useEffect } from 'react';
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

const BrandSchema = zod.object({
  avatarUrl: schemaHelper.file({
    message: { required_error: 'Logo is required!' },
  }),
  name: zod.string().min(1, { message: 'Brand name is required!' }),
  description: zod.string().min(1, { message: 'Brand description is required!' }),
  colors: zod.array(zod.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color hex code')).optional(),
});

export function BrandNewEditForm({ brand }) {
  const [websiteDetails, setWebsiteDetails] = useState(null);
  const [colors, setColors] = useState([]);
  const [scanResponse, setScanResponse] = useState('');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [editingColorIndex, setEditingColorIndex] = useState(-1); // Track the index of the color being edited

  useEffect(() => {
    if (brand?.url) {
      axios
        .get(`http://127.0.0.1:8000/fetch-website-details/${brand.url}`)
        .then((response) => {
          setWebsiteDetails(response.data);
          setColors(response.data.brand_colors || []);
        })
        .catch((error) => {
          toast.error('Error fetching website details');
          console.error(error);
        });
    }
  }, [brand?.url]);

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

  const onSubmit = handleSubmit(async (data) => {
    data.colors = colors;
    try {
      const response = await axios.post('http://127.0.0.1:8000/send-website-url/', {
        url: brand.url,
        colors: data.colors,
      });
      setScanResponse(response.data.message);
      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error('Error submitting website URL');
      console.error(error);
    }
  });

  const handleColorChange = (color) => {
    const updatedColors = [...colors];
    updatedColors[editingColorIndex] = color.hex; // Update the selected color
    setColors(updatedColors);
  };

  const handleColorPickerOpen = (index) => {
    setEditingColorIndex(index); // Set the index of the color being edited
    setColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setColorPickerOpen(false);
  };

  const addColor = () => {
    const newColor = '#FFFFFF';
    const newColors = [...colors, newColor];
    setColors(newColors);
    setEditingColorIndex(newColors.length - 1); // Set the index for the new color
    setColorPickerOpen(true);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
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
                  <br /> max size of 3MB
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Field.Text name="name" label="Brand Name" />
              <TextField
                id="outlined-multiline-static"
                label="Brand Description"
                multiline
                rows={4}
                {...register('description')}
              />
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
                {!brand ? 'Create Brand' : 'Save changes'}
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
