import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getQuote, updateQuote } from '@/services';
import { useForm } from 'react-hook-form';

const useEditQuote = (
  whichQuote: number,
  setWhichQuote: Function,
  quoteData: {
    bodyEn: string;
    bodyKa: string;
    avatar?: string;
  }
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageToDisplay, setUploadedImageToDisplay] = useState('');

  const queryClient = useQueryClient();

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
      bodyEn: quoteData?.bodyEn,
      bodyKa: quoteData?.bodyKa,
      image: quoteData?.avatar,
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
    const formData = new FormData();
    if (selectedFile) {
      formData.append('image', selectedFile, selectedFile.name);
    }

    formData.append(
      'body',
      JSON.stringify({
        en: data.bodyEn,
        ka: data.bodyKa,
      })
    );

    try {
      const response = await updateQuote(formData, quote.id);
      console.log(4444, response);
      queryClient.invalidateQueries('movie').then(() => {
        setWhichQuote(null);
      });
    } catch (error: any) {
      console.log(error);
    }
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
