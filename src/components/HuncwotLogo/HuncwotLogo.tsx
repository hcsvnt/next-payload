import Image from 'next/image';

import hunctwotLogo from '@/assets/images/huncwot_logo.png';

export default function HuncwotLogo({ isAvatar = true }: { isAvatar?: boolean }) {
    return (
        <Image
            alt='huncwot logo'
            src={hunctwotLogo}
            style={isAvatar ? { width: '25px', height: '25px' } : {}}
        />
    );
}
