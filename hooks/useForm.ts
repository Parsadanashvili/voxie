import Joi from "joi";
import { ChangeEvent, useEffect, useState } from "react";

interface FormInterfaceItem {
  name: string;
  value?: string | number | undefined;
  validation?: Joi.StringSchema;
}
interface FormInterface extends Array<FormInterfaceItem> {}

interface ErrorInterface {
  [key: string]: string | undefined;
}

interface ValidationObjectInterface {
  [key: string]: Joi.StringSchema;
}

interface ValuesObjectInterface {
  [key: string]: string | number | undefined;
}

const useForm = (
  form: FormInterface,
  customHandler?: (event: ChangeEvent<HTMLInputElement>) => {}
) => {
  let valuesObject: ValuesObjectInterface = {};
  form.map((item) => {
    valuesObject[item.name] = item.value || "";
  });

  const [values, setValues] = useState<ValuesObjectInterface>(valuesObject);
  const [validation, setValiadtion] = useState<Joi.ObjectSchema>(Joi.object());
  const [errors, setErrors] = useState<ErrorInterface>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let validationObject: ValidationObjectInterface = {};
    form
      .filter((item) => Boolean(item.validation))
      .map((item) => {
        if (item.validation) {
          validationObject[item.name] = item.validation;
        }
      });
    setValiadtion(Joi.object(validationObject));

    setTimeout(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    validate();
  }, [values]);

  const validate = () => {
    const { value, error } = validation.validate(values, {
      abortEarly: false,
      errors: {
        wrap: {
          label: false,
        },
      },
    });

    if (error && error?.details?.length > 0) {
      setErrors(
        error.details.reduce((acc: { [key: string]: string }, curr) => {
          if (curr.context && curr.context.key) {
            acc[curr.context.key] = curr.message;
          }
          return acc;
        }, {})
      );

      return;
    }

    setErrors({});
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (customHandler) customHandler(e);
  };

  return {
    values,
    errors,
    validate,
    inputHandler,
    setErrors,
  };
};

export default useForm;
