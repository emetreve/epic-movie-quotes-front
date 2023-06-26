import { useState } from 'react';
import { useQuery } from 'react-query';
import { getQuote } from '@/services';
import { useForm } from 'react-hook-form';

const useEditQuote = (whichQuote: number) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageToDisplay, setUploadedImageToDisplay] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await getQuote(whichQuote);
      return response.data;
    } catch {
      // router.push('/404');
    }
  };

  const { data: quote } = useQuery('editquote', fetchQuote, {
    enabled: !!whichQuote,
  });

  const methods = useForm({
    defaultValues: {
      bodyEn: quote?.body?.en || '',
      bodyKa: quote?.body?.ka || '',
      image: null,
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);

    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = function (event) {
      const binaryData = event.target?.result;
      setUploadedImageToDisplay(binaryData as string);
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return {
    quote,
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleUpload,
    uploadedImageToDisplay,
  };
};
export default useEditQuote;
