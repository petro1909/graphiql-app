import { __Type } from '@app_types/graphql';
import { ReturnType } from '../complexReturnType/complexReturnType';

type SingleTypeProps = {
  type: __Type;
  onClick: (typeName: string) => void;
};

export function SingleType({ type, onClick }: SingleTypeProps) {
  return (
    <section>
      <h3>{type.name}</h3>
      <div>
        <p>{type.description}</p>
      </div>
      {type.interfaces && (
        <div>
          {type.interfaces.map((iface) => (
            <p key={iface.name}>{iface.name}</p>
          ))}
        </div>
      )}
      {type.fields && (
        <section>
          <h4>Fields</h4>
          {type.fields.map((field) => (
            <div key={field.name}>
              <span>{field.name}</span>
              {field.args.length !== 0 && (
                <>
                  <span>{'('}</span>
                  {field.args.map((arg) => (
                    <p key={arg.name}>
                      <span>{arg.name}: </span>
                      <ReturnType type={arg.type} onClick={onClick} />
                    </p>
                  ))}
                  <span>{')'}</span>
                </>
              )}
              : <ReturnType type={field.type} onClick={onClick} />
              <p>{field.description}</p>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
