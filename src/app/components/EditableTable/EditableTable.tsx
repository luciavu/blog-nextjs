import './EditableTable.scss';

type EditableTableProps<T extends { id: number }> = {
  fields: (keyof T)[];
  values: T[];
  typeName: string;
  updatable: boolean;
  deletable: boolean;
  handleDelete?: (value: T) => void;
  handleInputChange?: (id: number, field: keyof T, value: string | boolean) => void;
  handleSave?: (value: T) => void;
  handleCreate?: () => void;
};

export const EditableTable = <T extends { id: number }>({
  fields,
  values,
  typeName,
  updatable,
  deletable,
  handleDelete,
  handleInputChange,
  handleSave,
  handleCreate,
}: EditableTableProps<T>) => {
  return (
    <div className={`${typeName}-summary table-summary`}>
      <h1>
        {typeName} ({values.length})
      </h1>
      <table>
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th key={index}>{String(field)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((value) => (
            <tr key={value.id}>
              {fields.map((field, index) => (
                <td key={index}>
                  {field === 'published' ? (
                    <input
                      id={`${value.id}${String(field)}`}
                      type="checkbox"
                      checked={Boolean(value[field])}
                      onChange={(e) => handleInputChange?.(value.id, field, e.target.checked)}
                    />
                  ) : field === 'id' ? (
                    <div>{value.id > 0 ? value.id : ''}</div>
                  ) : !updatable ? (
                    <div className={String(value[field]) === 'true' ? 'true' : ''}>
                      {String(value[field])}
                    </div>
                  ) : field === 'content' ? (
                    <textarea
                      id={`${value.id}${String(field)}`}
                      rows={4}
                      cols={100}
                      value={String(value[field])}
                      onChange={(e) => handleInputChange?.(value.id, field, e.target.value)}
                    />
                  ) : (
                    <textarea
                      rows={4}
                      cols={100}
                      id={`${value.id}${String(field)}`}
                      value={String(value[field])}
                      onChange={(e) => handleInputChange?.(value.id, field, e.target.value)}
                    />
                  )}
                </td>
              ))}
              {value.id > 0 ? (
                <>
                  <td>{updatable && <button onClick={() => handleSave?.(value)}>Save</button>}</td>
                  <td>
                    {deletable && (
                      <button className="delete" onClick={() => handleDelete?.(value)}>
                        Delete
                      </button>
                    )}
                  </td>
                </>
              ) : (
                <td colSpan={2}>
                  <button onClick={() => handleCreate?.()}>Create Post</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
