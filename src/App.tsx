import styles from './App.module';
import SamplePage from '@pages/Sample';
import './main.css';

const App: React.FC = () => {
  return (
    <div>
      <div className={styles.title}>CSS module works!</div>
      <div className={styles.subtitle}>CSS module + Tailwind works!</div>
      <div
        className={
          'border-[10px] border-solid border-red-800 rounded-full w-[200px] h-[200px] flex items-center justify-center text-center'
        }
      >
        Tailwind works!
      </div>
      <SamplePage />
    </div>
  );
};

export default App;
