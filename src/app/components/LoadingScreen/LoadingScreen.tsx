import { CgSpinner } from 'react-icons/cg';
import './LoadingScreen.scss';

type LoadingProps = {
  subject: string;
};
const LoadingScreen: React.FC<LoadingProps> = ({ subject }) => {
  return (
    <>
      <div className="loading-screen flex-container">
        <h2>Loading {subject}...</h2>
        <CgSpinner size={40} className="spin" />
      </div>
    </>
  );
};

export default LoadingScreen;
