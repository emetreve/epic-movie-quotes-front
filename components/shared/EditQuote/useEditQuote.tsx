import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getQuote, updateQuote, deleteQuote } from '@/services';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { editQuote, EditQuoteProperties } from '@/types';
import { useTranslation } from 'next-i18next';

const useEditQuote = (
  whichQuote: number,
  setWhichQuote: Function,
  quoteData: EditQuoteProperties
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageToDisplay, setUploadedImageToDisplay] = useState('');

  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { t } = useTranslation(['movies', 'newsfeed', 'profile']);

  const fetchQuote = async () => {
    try {
      const response = await getQuote(whichQuote);
      return response.data;
    } catch {
      push('/404');
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

  const handleDelete = async (id: number) => {
    await deleteQuote(id);
    queryClient.invalidateQueries('movie').then(() => {
      setWhichQuote(null);
    });
  };

  const onSubmit = async (data: editQuote) => {
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
      await updateQuote(formData, quote.id);
      queryClient.invalidateQueries('movie').then(() => {
        setWhichQuote(null);
      });
    } catch (error) {}
  };

  return {
    quote,
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleUpload,
    uploadedImageToDisplay,
    handleDelete,
    t,
  };
};
export default useEditQuote;
