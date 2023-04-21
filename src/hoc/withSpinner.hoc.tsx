import React from "react";
import Spinner from "../components/spinner/spinner.component";

interface WithSpinnerProps {
  loading: boolean;
}

const WithSpinner = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithSpinnerProps> => {
  return ({ loading, ...otherProps }: WithSpinnerProps) => {
    return loading ? <Spinner /> : <WrappedComponent {...(otherProps as P)} />;
  };
};

export default WithSpinner;
