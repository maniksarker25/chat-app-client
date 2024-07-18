import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
};

const CForm = ({ children, onSubmit }: TFormProps) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CForm;
