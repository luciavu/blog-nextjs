import Link from 'next/link';
import './Form.scss';

type FormField = {
  type: string;
  placeholder: string;
  value: string;
  autocomplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type FormProps = {
  title: string;
  errorMessage: string;
  submit: () => void;
  fields: FormField[];
};

const Form = ({ title, errorMessage, submit, fields }: FormProps) => {
  return (
    <div className="form-wrapper">
      <Link href="/" className="nav-link">
        Back
      </Link>
      <div className="flex-container">
        <h1>{title}</h1>
        <p className="error-message">{errorMessage}</p>
        <div className="fields">
          {fields.map((field, index) => (
            <input
              id={field.placeholder}
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              autoComplete={field.autocomplete}
            />
          ))}

          <button onClick={submit}>{title}</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
