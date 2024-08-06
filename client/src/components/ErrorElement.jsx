import { useRouteError } from 'react-router-dom';

const ErrorElements = () => {
  const error = useRouteError();
  console.log(error);
  return <h4>There was an error...</h4>;
};
export default ErrorElements;