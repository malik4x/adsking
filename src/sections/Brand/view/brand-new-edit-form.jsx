import { z as zod } from 'zod';
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
import { fData } from 'src/utils/format-number';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import axios from 'axios';

// ----------------------------------------------------------------------

export const BrandSchema = zod.object({
  avatarUrl: schemaHelper.file({
    message: { required_error: 'Logo is required!' },
  }),
  name: zod.string().min(1, { message: 'Brand name is required!' }),
  description: zod.string().min(1, { message: 'Brand description is required!' }),
});

// ----------------------------------------------------------------------

export function BrandNewEditForm({ brand }) {
  const [websiteDetails, setWebsiteDetails] = useState(null);
  const [scanResponse, setScanResponse] = useState('');

  // Fetch website details once the brand URL is sent for scanning
  useEffect(() => {
    if (brand?.url) {
      axios
        .get(`http://127.0.0.1:8000/fetch-website-details/${brand.url}`)
        .then((response) => {
          if (response.data.logo_url) {
            setWebsiteDetails(response.data);
          } else {
            toast.error('Website details are not ready yet.');
          }
        })
        .catch((error) => {
          toast.error('Error fetching website details');
          console.error(error);
        });
    }
  }, [brand?.url]); // Refetch details when `brand.url` changes

  const defaultValues = useMemo(
    () => ({
      avatarUrl: websiteDetails?.logo_url || null,
      name: websiteDetails?.brand_name || '',
      description: websiteDetails?.brand_description || '',
      color1: websiteDetails?.brand_colors ? websiteDetails.brand_colors[0] : '',
      color2: websiteDetails?.brand_colors ? websiteDetails.brand_colors[1] : '',
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
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Send the website URL to backend for scanning
      const response = await axios.post('http://127.0.0.1:8000/send-website-url/', {
        url: brand.url,
      });

      // Display the backend response message
      setScanResponse(response.data.message);
      toast.success(response.data.message);

      // Reset the form after successful submission
      reset();
    } catch (error) {
      toast.error('Error submitting website URL');
      console.error(error);
    }
  });

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
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Text name="name" label="Brand Name" />
              <TextField
                id="outlined-multiline-static"
                label="Brand Description"
                multiline
                rows={4}
                {...methods.register('description')}
                value={methods.getValues('description')}
                onChange={methods.handleChange}
              />
              <Field.Text name="color1" label="Brand Color 1" />
              <Field.Text name="color2" label="Brand Color 2" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!brand ? 'Create Brand' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Display response message */}
      {scanResponse && (
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center', color: 'green' }}>
          {scanResponse}
        </Typography>
      )}
    </Form>
  );
}
