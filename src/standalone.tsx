import {createRoot} from 'react-dom/client';
import {Converter} from './Converter';
import './converter.css';
createRoot(document.getElementById('converter')!).render(<Converter/>);
