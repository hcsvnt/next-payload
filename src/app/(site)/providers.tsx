import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Theme accentColor='mint' appearance='light' radius='none'>
            {children}
        </Theme>
    );
}
