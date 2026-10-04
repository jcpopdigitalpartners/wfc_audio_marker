import type { Metadata } from 'next';
import './globals.css';
import {publicAsset} from '../lib/assets';
export const metadata: Metadata = {title:'Webflow Cloud — From code to capability',description:'A narrated developer field guide to Webflow Cloud. Listen through the story, or jump between content and the matching narration.',icons:{icon:publicAsset('favicon.svg')}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
